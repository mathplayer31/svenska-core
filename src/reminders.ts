// Daily reminder at the chosen time (issue #16).
// APK: local notification repeated every day, no server (the plugin reschedules it after a reboot).
// Web (PWA): push subscription stored in Supabase (push_subscriptions table); the send-reminders
// function, run every 5 minutes, sends it at the chosen time in the user's time zone.
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { supabase } from './supabaseClient';

export interface Reminder {
  on: boolean;
  /** Local time, 'HH:MM' */
  time: string;
}
/** Notification text, in the interface language */
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
    // nothing saved
  }
  return { on: false, time: '19:00' };
}

function saveReminder(r: Reminder) {
  try {
    localStorage.setItem(KEY, JSON.stringify(r));
  } catch {
    // storage unavailable: the setting will not survive a reload
  }
}

/** native: APK; web: push possible; ios-install: iPhone without the PWA installed; unsupported: nothing possible */
export type ReminderSupport = 'native' | 'web' | 'ios-install' | 'unsupported';

export function reminderSupport(): ReminderSupport {
  if (Capacitor.isNativePlatform()) return 'native';
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const installed =
    matchMedia('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true;
  if (ios && !installed) return 'ios-install';
  // The service worker only exists in the web production build (src/main.tsx)
  const push = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  return push && import.meta.env.PROD && VAPID_KEY && supabase ? 'web' : 'unsupported';
}

/** Errors shown by the setting */
export class ReminderError extends Error {
  code: 'denied' | 'signin';
  constructor(code: 'denied' | 'signin') {
    super(code);
    this.code = code;
  }
}

/** Public VAPID key (base64url) in the format expected by pushManager.subscribe */
function vapidBytes(key: string) {
  const b64 = (key + '='.repeat((4 - (key.length % 4)) % 4)).replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

/** Local date and time 'YYYY-MM-DD' and 'HH:MM' */
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
    // Exact alarm (default): the plugin opens the "Alarms & reminders" screen if needed. If refused, Android
    // allows up to one hour of delay (inexact alarm).
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
    // Time already passed today: first reminder tomorrow, not right away
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

/** Turns on, changes the time of or turns off the reminder. Permission is only asked when turning it on. */
export async function setReminder(r: Reminder, text: ReminderText) {
  const support = reminderSupport();
  if (support === 'native') {
    if (r.on && (await LocalNotifications.requestPermissions()).display !== 'granted') throw new ReminderError('denied');
    await scheduleNative(r, text);
  } else if (support === 'web') {
    if (r.on) {
      // Sign-in first: no point asking for permission if the reminder cannot be saved
      if (!(await supabase!.auth.getSession()).data.session) throw new ReminderError('signin');
      if ((await Notification.requestPermission()) !== 'granted') throw new ReminderError('denied');
      await saveWeb(r, text);
    } else await removeWeb();
  }
  saveReminder(r);
}

/** On launch and on language change: updates the text (and the time zone) without asking anything */
export async function refreshReminder(text: ReminderText) {
  const r = loadReminder();
  if (!r.on) return;
  const support = reminderSupport();
  try {
    if (support === 'native' && (await LocalNotifications.checkPermissions()).display === 'granted') await scheduleNative(r, text);
    if (support === 'web' && Notification.permission === 'granted') await saveWeb(r, text);
  } catch {
    // offline or signed out: the reminder already saved stays valid
  }
}

/** Before sign-out: on the web, the reminder is tied to the account, so it is removed */
export async function forgetWebReminder() {
  if (reminderSupport() !== 'web' || !loadReminder().on) return;
  try {
    await removeWeb();
  } finally {
    saveReminder({ ...loadReminder(), on: false });
  }
}
