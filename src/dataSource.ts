// Data access layer (issue #8).
//  - The content (sections, decks, cards) is always bundled: src/content.json, exported by
//    scripts/sync-content.mjs. Ids = slugs, so progress survives a re-seed.
//  - Progress is always saved on the device first (works offline and without an account).
//  - When signed in, it is merged with Supabase: for each card, the most recent review wins.
import { supabase } from './supabaseClient';
import { mergeCard, mergeSection, sameRow, isoOrNull } from './syncMerge';
import { XP, dayKey, periodStarts, streaks, type XpKind } from './xp';

type Row = Record<string, any>;

export interface LoadedData {
  decks: Row[];
  cards: Row[];
  sections: Row[];
  progress: Row[];
  sectionProgress: Row[];
}

// Local keys unchanged since the offline APK: progress already on the phone is kept.
const CARD_KEY = 'svenska.cardProgress';
const SECTION_KEY = 'svenska.sectionProgress';

function readMap(key: string): Record<string, Row> {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
}

function writeMap(key: string, map: Record<string, Row>) {
  try {
    localStorage.setItem(key, JSON.stringify(map));
  } catch {
    // storage unavailable: this session's progress will not be kept on the device
  }
}

let contentPromise: Promise<{ sections: Row[]; decks: Row[]; cards: Row[] }> | null = null;
const loadContent = () => (contentPromise ??= import('./content.json').then((m) => m.default as never));

export async function load(): Promise<LoadedData> {
  const content = await loadContent();
  return {
    decks: content.decks,
    cards: content.cards,
    sections: content.sections,
    progress: Object.values(readMap(CARD_KEY)),
    sectionProgress: Object.values(readMap(SECTION_KEY)),
  };
}

// ---------------------------------------------------------------------------
// Local <-> database conversion
// ---------------------------------------------------------------------------
const CARD_FIELDS = ['state', 'due', 'stability', 'difficulty', 'elapsed_days', 'scheduled_days', 'learning_steps', 'reps', 'lapses', 'last_review'] as const;

const cardToCloud = (r: Row) => ({ card_slug: r.card_id, ...Object.fromEntries(CARD_FIELDS.map((f) => [f, r[f] ?? null])), learning_steps: r.learning_steps ?? 0 });
const cardFromCloud = (r: Row) => ({
  card_id: r.card_slug,
  ...Object.fromEntries(CARD_FIELDS.map((f) => [f, r[f]])),
  due: isoOrNull(r.due),
  last_review: isoOrNull(r.last_review),
});
const sectionToCloud = (r: Row) => ({ section_slug: r.section_id, best_score: r.best_score, passed: r.passed, attempts: r.attempts, last_attempt: r.last_attempt ?? null });
const sectionFromCloud = (r: Row) => ({
  section_id: r.section_slug,
  best_score: r.best_score,
  passed: r.passed,
  attempts: r.attempts,
  last_attempt: isoOrNull(r.last_attempt),
});


// ---------------------------------------------------------------------------
// Saving: first the device, then the account if signed in (a network failure is caught up at the next sync)
// ---------------------------------------------------------------------------
export async function saveCardProgress(row: Row) {
  const map = readMap(CARD_KEY);
  map[row.card_id] = row;
  writeMap(CARD_KEY, map);
  if (await currentUser()) await supabase!.from('progress_cards').upsert(cardToCloud(row));
}

export async function saveSectionProgress(row: Row) {
  const map = readMap(SECTION_KEY);
  map[row.section_id] = row;
  writeMap(SECTION_KEY, map);
  if (await currentUser()) await supabase!.from('progress_sections').upsert(sectionToCloud(row));
}

// ---------------------------------------------------------------------------
// Account
// ---------------------------------------------------------------------------
export const accountsAvailable = supabase !== null;

export async function currentUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase!.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

/** Returns true if a confirmation email must be validated before signing in. */
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase!.auth.signUp({ email, password });
  if (error) throw error;
  return !data.session;
}

export async function signOut() {
  // shortcut: local progress stays on the device after sign-out; another account signed in
  // later on the same device would pick it up. Acceptable for personal use.
  await supabase?.auth.signOut();
}

/**
 * Two-way sync: fetches the account's progress, merges it with the device's,
 * saves the result on the device, then sends back to the account what is missing or older there.
 * Does nothing without a signed-in account. Throws if the network fails (local progress stays intact).
 */
export async function sync(): Promise<{ pulled: number; pushed: number } | null> {
  if (!(await currentUser())) return null;
  const [cardsRes, sectionsRes] = await Promise.all([
    supabase!.from('progress_cards').select('*'),
    supabase!.from('progress_sections').select('*'),
  ]);
  if (cardsRes.error) throw cardsRes.error;
  if (sectionsRes.error) throw sectionsRes.error;

  let pulled = 0;
  const cardsToPush: Row[] = [];
  const localCards = readMap(CARD_KEY);
  const cloudCards = new Map(cardsRes.data.map((r) => [r.card_slug as string, cardFromCloud(r)]));
  for (const slug of new Set([...Object.keys(localCards), ...cloudCards.keys()])) {
    const merged = mergeCard(localCards[slug], cloudCards.get(slug))!;
    if (!sameRow(merged, localCards[slug])) pulled++;
    if (!sameRow(merged, cloudCards.get(slug))) cardsToPush.push(cardToCloud(merged));
    localCards[slug] = merged;
  }
  writeMap(CARD_KEY, localCards);

  const sectionsToPush: Row[] = [];
  const localSections = readMap(SECTION_KEY);
  const cloudSections = new Map(sectionsRes.data.map((r) => [r.section_slug as string, sectionFromCloud(r)]));
  for (const slug of new Set([...Object.keys(localSections), ...cloudSections.keys()])) {
    const merged = mergeSection(localSections[slug], cloudSections.get(slug))!;
    if (!sameRow(merged, localSections[slug])) pulled++;
    if (!sameRow(merged, cloudSections.get(slug))) sectionsToPush.push(sectionToCloud(merged));
    localSections[slug] = merged;
  }
  writeMap(SECTION_KEY, localSections);

  if (cardsToPush.length) {
    const { error } = await supabase!.from('progress_cards').upsert(cardsToPush);
    if (error) throw error;
  }
  if (sectionsToPush.length) {
    const { error } = await supabase!.from('progress_sections').upsert(sectionsToPush);
    if (error) throw error;
  }
  await flushXp();
  const { data: sessionDays, error } = await supabase!.from('xp_events').select('day').eq('kind', 'session');
  if (error) throw error;
  const store = readXp();
  store.days = [...new Set([...store.days, ...sessionDays.map((r) => r.day as string)])];
  writeXp(store);
  return { pulled, pushed: cardsToPush.length + sectionsToPush.length };
}

// ---------------------------------------------------------------------------
// XP and streak (issue #15): everything is recorded on the device; when signed in, each event is sent to the account.
// A failed send stays pending and goes out at the next sync, with the same id (no duplicate).
// ---------------------------------------------------------------------------
interface XpEvent { id: string; kind: XpKind; at: string; day: string }
interface XpStore {
  /** XP earned on this device, per local day */
  log: Record<string, number>;
  /** Days with a finished session (this device and, when signed in, the account) */
  days: string[];
  /** Events not yet received by the account */
  pending: XpEvent[];
}
const XP_KEY = 'svenska.xp';

function readXp(): XpStore {
  const s = readMap(XP_KEY) as Partial<XpStore>;
  return { log: s.log ?? {}, days: s.days ?? [], pending: s.pending ?? [] };
}
const writeXp = (s: XpStore) => writeMap(XP_KEY, s as never);
const newId = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export async function awardXp(kind: XpKind) {
  const now = new Date();
  const day = dayKey(now);
  const store = readXp();
  store.log[day] = (store.log[day] ?? 0) + XP[kind];
  if (kind === 'session' && !store.days.includes(day)) store.days.push(day);
  store.pending.push({ id: newId(), kind, at: now.toISOString(), day });
  writeXp(store);
  try {
    await flushXp();
  } catch {
    // offline: the event stays pending
  }
}

async function flushXp() {
  const sent = readXp().pending;
  if (!sent.length || !(await currentUser())) return;
  const { error } = await supabase!.from('xp_events').upsert(sent, { onConflict: 'user_id,id', ignoreDuplicates: true });
  if (error) throw error;
  const done = new Set(sent.map((e) => e.id));
  const store = readXp(); // read again: other events may have arrived during the send
  store.pending = store.pending.filter((e) => !done.has(e.id));
  writeXp(store);
}

/** XP of the week and month earned on this device, current streak and best */
export function localStats() {
  const now = new Date();
  const { week, month } = periodStarts(now);
  const store = readXp();
  const since = (d: Date) => Object.entries(store.log).reduce((sum, [day, xp]) => (day >= dayKey(d) ? sum + xp : sum), 0);
  return { week: since(week), month: since(month), ...streaks(store.days, dayKey(now)) };
}

export interface BoardRow { pseudo: string; xp_week: number; xp_month: number; streak: number; best_streak: number; is_me: boolean }

export async function leaderboard(): Promise<BoardRow[]> {
  const now = new Date();
  const { week, month } = periodStarts(now);
  const { data, error } = await supabase!.rpc('leaderboard', {
    since_week: week.toISOString(),
    since_month: month.toISOString(),
    today: dayKey(now),
  });
  if (error) throw error;
  return data;
}

export async function getPseudo(): Promise<string | null> {
  const user = await currentUser();
  if (!user) return null;
  const { data, error } = await supabase!.from('profiles').select('pseudo').eq('user_id', user.id).maybeSingle();
  if (error) throw error;
  return data?.pseudo ?? null;
}

/** Saves the username; 'taken' if it is already in use (case-insensitive uniqueness) */
export async function setPseudo(pseudo: string): Promise<'ok' | 'taken'> {
  const { error } = await supabase!.from('profiles').upsert({ pseudo, updated_at: new Date().toISOString() });
  if (error?.code === '23505') return 'taken';
  if (error) throw error;
  return 'ok';
}
