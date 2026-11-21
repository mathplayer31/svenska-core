// Rappel quotidien à l'heure choisie (issue #16).
// APK : notification locale répétée chaque jour, sans serveur (le plugin la reprogramme après un redémarrage).
// Web (PWA) : abonnement push enregistré dans Supabase (table push_subscriptions) ; la fonction
// send-reminders, lancée toutes les 5 minutes, l'envoie à l'heure choisie dans le fuseau de l'utilisateur.
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { supabase } from './supabaseClient';

export interface Reminder {
  on: boolean;
  /** Heure locale, 'HH:MM' */
  time: string;
}
/** Texte de la notification, dans la langue de l'interface */
export interface ReminderText {
  title: string;
  body: string;
}

const KEY = 'svenska.reminder';
const NOTIF_ID = 1;
const VAPID_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;

export function loadReminder(): Reminder {
  try {
    const r = JSON.parse(localStorage.getItem(KEY) ?? '');
    if (typeof r?.time === 'string' && /^\d\d:\d\d$/.test(r.time)) return { on: r.on === true, time: r.time };
  } catch {
    // rien d'enregistré
  }
  return { on: false, time: '19:00' };
}

function saveReminder(r: Reminder) {
  try {
    localStorage.setItem(KEY, JSON.stringify(r));
  } catch {
    // stockage indisponible : le réglage ne survivra pas au rechargement
  }
}

/** native : APK ; web : push possible ; ios-install : iPhone sans la PWA installée ; unsupported : rien de possible */
export type ReminderSupport = 'native' | 'web' | 'ios-install' | 'unsupported';

export function reminderSupport(): ReminderSupport {
  if (Capacitor.isNativePlatform()) return 'native';
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const installed =
    matchMedia('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true;
  if (ios && !installed) return 'ios-install';
  // Le service worker n'existe qu'en production web (src/main.tsx)
  const push = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  return push && import.meta.env.PROD && VAPID_KEY && supabase ? 'web' : 'unsupported';
}

/** Erreurs affichées par le réglage */
export class ReminderError extends Error {
  code: 'denied' | 'signin';
  constructor(code: 'denied' | 'signin') {
    super(code);
    this.code = code;
  }
}

/** Clé VAPID publique (base64url) au format attendu par pushManager.subscribe */
function vapidBytes(key: string) {
  const b64 = (key + '='.repeat((4 - (key.length % 4)) % 4)).replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

/** Date et heure locales 'YYYY-MM-DD' et 'HH:MM' */
function localNow() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return { date: `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`, time: `${p(d.getHours())}:${p(d.getMinutes())}` };
}

async function scheduleNative(r: Reminder, text: ReminderText) {
  await LocalNotifications.cancel({ notifications: [{ id: NOTIF_ID }] });
  if (!r.on) return;
  const [hour, minute] = r.time.split(':').map(Number);
  await LocalNotifications.schedule({
    // Alarme exacte (par défaut) : le plugin ouvre l'écran « Alarmes et rappels » s'il le faut. Refusée, Android
    // tolère jusqu'à une heure de retard (alarme non exacte).
    notifications: [{ id: NOTIF_ID, ...text, schedule: { on: { hour, minute }, allowWhileIdle: true } }],
  });
}

async function webSubscription(create: boolean) {
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  if (sub || !create) return sub;
  return reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: vapidBytes(VAPID_KEY!) });
}

async function saveWeb(r: Reminder, text: ReminderText) {
  const { data } = await supabase!.auth.getSession();
  if (!data.session) throw new ReminderError('signin');
  const sub = (await webSubscription(true))!.toJSON();
  const now = localNow();
  const { error } = await supabase!.from('push_subscriptions').upsert({
    endpoint: sub.endpoint,
    p256dh: sub.keys!.p256dh,
    auth: sub.keys!.auth,
    remind_at: r.time,
    time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ...text,
    // Heure déjà passée aujourd'hui : premier rappel demain, pas tout de suite
    last_sent: now.time >= r.time ? now.date : null,
  });
  if (error) throw new Error(error.message);
}

async function removeWeb() {
  const sub = await webSubscription(false);
  if (!sub) return;
  if (supabase) await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
  await sub.unsubscribe();
}

/** Active, change l'heure ou coupe le rappel. La permission n'est demandée qu'à l'activation. */
export async function setReminder(r: Reminder, text: ReminderText) {
  const support = reminderSupport();
  if (support === 'native') {
    if (r.on && (await LocalNotifications.requestPermissions()).display !== 'granted') throw new ReminderError('denied');
    await scheduleNative(r, text);
  } else if (support === 'web') {
    if (r.on) {
      // Connexion d'abord : inutile de demander la permission si le rappel ne peut pas être enregistré
      if (!(await supabase!.auth.getSession()).data.session) throw new ReminderError('signin');
      if ((await Notification.requestPermission()) !== 'granted') throw new ReminderError('denied');
      await saveWeb(r, text);
    } else await removeWeb();
  }
  saveReminder(r);
}

/** À l'ouverture et au changement de langue : remet à jour le texte (et le fuseau) sans rien demander */
export async function refreshReminder(text: ReminderText) {
  const r = loadReminder();
  if (!r.on) return;
  const support = reminderSupport();
  try {
    if (support === 'native' && (await LocalNotifications.checkPermissions()).display === 'granted') await scheduleNative(r, text);
    if (support === 'web' && Notification.permission === 'granted') await saveWeb(r, text);
  } catch {
    // hors ligne ou déconnecté : le rappel déjà enregistré reste valable
  }
}

/** Avant la déconnexion : sur le web, le rappel est lié au compte, on le retire */
export async function forgetWebReminder() {
  if (reminderSupport() !== 'web' || !loadReminder().on) return;
  try {
    await removeWeb();
  } finally {
    saveReminder({ ...loadReminder(), on: false });
  }
}
