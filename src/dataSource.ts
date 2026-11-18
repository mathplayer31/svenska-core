// Couche d'accès aux données (issue #8).
//  - Le contenu (sections, decks, cartes) est toujours embarqué : src/content.json, exporté par
//    scripts/sync-content.mjs. Identifiants = slugs, donc la progression survit à un re-seed.
//  - La progression est toujours enregistrée sur l'appareil d'abord (marche hors ligne et sans compte).
//  - Connecté à un compte, elle est fusionnée avec Supabase : à chaque carte, la révision la plus récente gagne.
import { supabase } from './supabaseClient';
import { mergeCard, mergeSection, sameRow, isoOrNull } from './syncMerge';

type Row = Record<string, any>;

export interface LoadedData {
  decks: Row[];
  cards: Row[];
  sections: Row[];
  progress: Row[];
  sectionProgress: Row[];
}

// Clés locales inchangées depuis l'APK hors ligne : la progression déjà sur le téléphone est conservée.
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
    // stockage indisponible : la progression de cette session ne sera pas conservée sur l'appareil
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
// Conversion local <-> base
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
// Enregistrement : d'abord l'appareil, puis le compte si connecté (un échec réseau sera rattrapé à la synchro)
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
// Compte
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

/** Renvoie true si un e-mail de confirmation doit être validé avant la connexion. */
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase!.auth.signUp({ email, password });
  if (error) throw error;
  return !data.session;
}

export async function signOut() {
  // shortcut: la progression locale reste sur l'appareil après déconnexion ; un autre compte connecté
  // ensuite sur le même appareil la récupérerait. Acceptable pour un usage personnel.
  await supabase?.auth.signOut();
}

/**
 * Synchronisation bidirectionnelle : récupère la progression du compte, la fusionne avec celle de
 * l'appareil, enregistre le résultat sur l'appareil, puis renvoie au compte ce qui y manque ou y est plus ancien.
 * Ne fait rien sans compte connecté. Lève une erreur si le réseau échoue (la progression locale reste intacte).
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
  return { pulled, pushed: cardsToPush.length + sectionsToPush.length };
}
