// Importe dans ton compte la progression faite sur le PC avant l'issue #8 (tables user_card_progress /
// user_section_progress de la base Supabase locale). Fusion sans perte : à chaque carte, la révision
// la plus récente gagne ; ce qui est déjà plus récent dans le compte n'est pas écrasé.
//
// Lancer (une seule fois) depuis la racine du projet, Supabase local démarré :
//   SVENSKA_EMAIL=... SVENSKA_PASSWORD=... node --experimental-strip-types --env-file=.env.local \
//     --env-file=.env.production scripts/import-progress.ts
// Source : base locale (LOCAL_SUPABASE_URL / LOCAL_SUPABASE_ANON_KEY, sinon les valeurs de .env.local).
// Cible : le projet du compte (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY de .env.production).
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { mergeCard, mergeSection, sameRow, isoOrNull } from '../src/syncMerge.ts';

const LEGACY_USER_ID = '00000000-0000-0000-0000-000000000001';

// .env.local et .env.production définissent les mêmes noms : on relit .env.local explicitement pour la source
const envLocal = Object.fromEntries(
  readFileSync('.env.local', 'utf8').split('\n').map((l) => l.trim().split('=')).filter(([k, v]) => k && v)
);
const sourceUrl = process.env.LOCAL_SUPABASE_URL ?? envLocal.VITE_SUPABASE_URL;
const sourceKey = process.env.LOCAL_SUPABASE_ANON_KEY ?? envLocal.VITE_SUPABASE_ANON_KEY;
const targetUrl = process.env.VITE_SUPABASE_URL;
const targetKey = process.env.VITE_SUPABASE_ANON_KEY;
const { SVENSKA_EMAIL: email, SVENSKA_PASSWORD: password } = process.env;

if (!sourceUrl || !sourceKey || !targetUrl || !targetKey || !email || !password) {
  console.error('Variables manquantes : voir l’en-tête du script (SVENSKA_EMAIL, SVENSKA_PASSWORD, .env.production rempli).');
  process.exit(1);
}

const source = createClient(sourceUrl, sourceKey);
const target = createClient(targetUrl, targetKey, { auth: { persistSession: false } });

const fail = (what: string, error: unknown) => {
  console.error(`Échec (${what}) :`, error);
  process.exit(1);
};

// 1. Progression locale + correspondance uuid -> slug
const [progress, sectionProgress, cards, sections] = await Promise.all([
  source.from('user_card_progress').select('*').eq('user_id', LEGACY_USER_ID),
  source.from('user_section_progress').select('*').eq('user_id', LEGACY_USER_ID),
  source.from('cards').select('id, slug'),
  source.from('sections').select('id, slug'),
]);
for (const [name, res] of Object.entries({ progress, sectionProgress, cards, sections })) if (res.error) fail(name, res.error);
const cardSlug = new Map(cards.data!.map((c) => [c.id, c.slug]));
const sectionSlug = new Map(sections.data!.map((s) => [s.id, s.slug]));

// 2. Connexion au compte cible
const { error: authError } = await target.auth.signInWithPassword({ email, password });
if (authError) fail('connexion', authError);

// 3. Fusion avec ce que le compte contient déjà
const [cloudCards, cloudSections] = await Promise.all([
  target.from('progress_cards').select('*'),
  target.from('progress_sections').select('*'),
]);
if (cloudCards.error) fail('lecture du compte', cloudCards.error);
if (cloudSections.error) fail('lecture du compte', cloudSections.error);
const cloudCardBySlug = new Map(cloudCards.data!.map((r) => [r.card_slug, { ...r, last_review: isoOrNull(r.last_review) }]));
const cloudSectionBySlug = new Map(cloudSections.data!.map((r) => [r.section_slug, { ...r, section_id: r.section_slug, last_attempt: isoOrNull(r.last_attempt) }]));

const cardRows = progress.data!
  .filter((p) => cardSlug.has(p.card_id))
  .map((p) => {
    const slug = cardSlug.get(p.card_id)!;
    const local = {
      card_slug: slug, state: p.state, due: isoOrNull(p.due), stability: p.stability, difficulty: p.difficulty,
      elapsed_days: p.elapsed_days, scheduled_days: p.scheduled_days, learning_steps: 0,
      reps: p.reps, lapses: p.lapses, last_review: isoOrNull(p.last_review),
    };
    return mergeCard(local, cloudCardBySlug.get(slug)) === local ? local : null;
  })
  .filter((r) => r !== null);

const sectionRows = sectionProgress.data!
  .filter((p) => sectionSlug.has(p.section_id))
  .map((p) => {
    const slug = sectionSlug.get(p.section_id)!;
    const local = { section_id: slug, best_score: p.best_score, passed: p.passed, attempts: p.attempts, last_attempt: isoOrNull(p.last_attempt) };
    const cloud = cloudSectionBySlug.get(slug);
    const merged = mergeSection(local, cloud)!;
    return sameRow(merged, cloud && { section_id: slug, best_score: cloud.best_score, passed: cloud.passed, attempts: cloud.attempts, last_attempt: cloud.last_attempt })
      ? null
      : { section_slug: slug, best_score: merged.best_score, passed: merged.passed, attempts: merged.attempts, last_attempt: merged.last_attempt };
  })
  .filter((r) => r !== null);

// 4. Envoi
if (cardRows.length) {
  const { error } = await target.from('progress_cards').upsert(cardRows);
  if (error) fail('envoi des cartes', error);
}
if (sectionRows.length) {
  const { error } = await target.from('progress_sections').upsert(sectionRows);
  if (error) fail('envoi des sections', error);
}
const skipped = progress.data!.length - cardRows.length;
console.log(`Importé : ${cardRows.length} carte(s), ${sectionRows.length} test(s) de section. Ignoré : ${skipped} carte(s) déjà à jour dans le compte ou absente(s) du contenu.`);
