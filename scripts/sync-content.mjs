import { createClient } from '@supabase/supabase-js';
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, statSync, rmSync, writeFileSync } from 'node:fs';
import { TONES } from '../content/sv/tones.mjs';
import { withTone } from './tones-lib.mjs';
import { SECTIONS } from '../content/sv/sections.mjs';
import { SV_DECKS, SV_CARDS } from '../content/sv/index.mjs';
import { CARDS_EN, DECKS_EN, SECTIONS_EN } from '../content/sv/a1/en.mjs';
import { NOTES_EN_A1, IPA_EN } from '../content/sv/a1/notes-en.mjs';
import { NOTES_EN_A2 } from '../content/sv/a2/notes-en.mjs';
import { NOTES_EN_B1 } from '../content/sv/b1/notes-en.mjs';
import { NOTES_EN_B2 } from '../content/sv/b2/notes-en.mjs';
import { FR_SECTIONS, FR_DECKS, FR_CARDS } from '../content/fr/index.mjs';

// English grammar notes, by slug (issue #5)
const NOTES_EN = { ...NOTES_EN_A1, ...NOTES_EN_A2, ...NOTES_EN_B1, ...NOTES_EN_B2 };

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Run with: npm run content');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);


const ALL_DECKS = [...SV_DECKS, ...FR_DECKS];
const ALL_CARDS = [...SV_CARDS, ...FR_CARDS];
const ALL_SECTIONS = [...SECTIONS, ...FR_SECTIONS];

// Course of each deck (sv by default) and edge-tts voice of the language being learned
const deckCourse = new Map(ALL_DECKS.map((d) => [d.slug, d.course ?? 'sv']));
const VOICES = { sv: 'sv-SE-SofieNeural', fr: 'fr-FR-DeniseNeural' };
const courseOf = (card) => deckCourse.get(card.deck_slug);
// English note: inline (French course) or in content/sv/*/notes-en.mjs (Swedish course)
const noteEn = (c) => c.note_en ?? NOTES_EN[c.slug];

// English content check before any database write: each card, deck and section must have
// its English version, and each English gloss must have as many words as the French gloss.
// English for a card, deck or section: inline (units A2+) or in content/sv/a1/en.mjs (A1)
const enCard = (c) => c.en ?? CARDS_EN[c.slug];
const enDeckTitle = (d) => d.title_en ?? DECKS_EN[d.slug];
const enSection = (s) => (s.title_en ? { title: s.title_en, description: s.description_en } : SECTIONS_EN[s.slug]);

function checkEnglish() {
  const errors = [];
  for (const c of ALL_CARDS) {
    const en = enCard(c);
    if (!en?.prompt || !en?.translation) errors.push(`${c.slug}: missing English instruction or translation`);
    else if (c.gloss && en.gloss?.length !== c.gloss.length)
      errors.push(`${c.slug}: English gloss of ${en.gloss?.length ?? 0} word(s) instead of ${c.gloss.length}`);
    else if (!c.gloss && en.gloss) errors.push(`${c.slug}: English gloss without a French gloss`);
  }
  // A card without a note (word of a thematic deck, issue #18) has no English note either
  for (const c of ALL_CARDS) if (c.explanation_md && !noteEn(c)) errors.push(`${c.slug} : note anglaise manquante`);
  // French course: the base language is Swedish, each card must have it too
  for (const c of ALL_CARDS.filter((x) => courseOf(x) === 'fr')) {
    if (!c.slug.startsWith('fr-')) errors.push(`${c.slug}: French course slugs start with fr-`);
    if (!c.swedish_prompt || !c.english_translation || !c.explanation_md || !c.swedish_target)
      errors.push(`${c.slug}: missing French, Swedish instruction, translation or note`);
    if (c.gloss?.some((g) => !g.sv || !g.fr)) errors.push(`${c.slug}: incomplete Swedish gloss`);
  }
  for (const c of ALL_CARDS) if (!deckCourse.has(c.deck_slug)) errors.push(`${c.slug} : deck ${c.deck_slug} inconnu`);
  const seen = new Set();
  for (const c of ALL_CARDS) {
    if (seen.has(c.slug)) errors.push(`${c.slug}: duplicate slug`);
    seen.add(c.slug);
  }
  const cardSlugs = new Set(ALL_CARDS.map((c) => c.slug));
  for (const slug of Object.keys(NOTES_EN)) if (!cardSlugs.has(slug)) errors.push(`${slug}: English note without a card`);
  for (const slug of Object.keys(CARDS_EN)) if (!cardSlugs.has(slug)) errors.push(`${slug}: translation without a card`);
  for (const d of ALL_DECKS) if (!enDeckTitle(d)) errors.push(`deck ${d.slug} : titre anglais manquant`);
  for (const s of ALL_SECTIONS) if (!enSection(s)?.title || !enSection(s)?.description) errors.push(`section ${s.slug} : titre anglais manquant`);
  if (errors.length > 0) throw new Error(`Incomplete content (content/):\n- ${errors.join('\n- ')}`);
}

// edge-tts can hang: 30 s timeout, 3 attempts, and truncated MP3 files are deleted.
function generateMp3(pythonCmd, text, filePath, voice) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      execFileSync(
        pythonCmd,
        ['-m', 'edge_tts', '--voice', voice, '--rate=-10%', '--text', text, '--write-media', filePath],
        { stdio: 'inherit', timeout: 30_000 }
      );
      if (existsSync(filePath) && statSync(filePath).size > 0) return;
    } catch (err) {
      console.warn(`  Attempt ${attempt}/3 failed for "${text}": ${err.message}`);
    }
    rmSync(filePath, { force: true });
  }
  throw new Error(`Could not generate the MP3 for "${text}"`);
}

function getPythonCmd() {
  for (const cmd of ['python', 'py', 'python3']) {
    try {
      execFileSync(cmd, ['-m', 'edge_tts', '--version'], { stdio: 'ignore' });
      return cmd;
    } catch {
      // Try the next one
    }
  }
  throw new Error('edge_tts not found. Run: python -m pip install edge-tts');
}

async function run() {
  checkEnglish();
  const pythonCmd = getPythonCmd();
  mkdirSync('./public/audio', { recursive: true });

  // 1. Upsert sections then decks
const sectionMap = new Map();
for (const s of ALL_SECTIONS) {
  const { data, error } = await supabase
    .from('sections')
    .upsert(
      { ...s, title_en: enSection(s).title, description_en: enSection(s).description },
      { onConflict: 'slug' }
    )
    .select()
    .single();
  if (error) throw error;
  sectionMap.set(s.slug, data.id);
}

const deckMap = new Map();
for (const d of ALL_DECKS) {
  const { section_slug, prerequisite_slug: _prereq, ...row } = d;
  const payload = {
    ...row,
    title_en: enDeckTitle(d),
    ...(section_slug ? { section_id: sectionMap.get(section_slug) } : {}),
  };
  const { data, error } = await supabase
    .from('decks').upsert(payload, { onConflict: 'slug' }).select().single();
  if (error) throw error;
  deckMap.set(d.slug, data.id);
}

// Prerequisites: resolved afterwards, once all decks are known
for (const d of ALL_DECKS) {
  const prereqId = d.prerequisite_slug ? deckMap.get(d.prerequisite_slug) : null;
  const { error } = await supabase
    .from('decks').update({ prerequisite_deck_id: prereqId ?? null }).eq('slug', d.slug);
  if (error) throw error;
}

  // 2. Cleanup: cards without a slug, and cards removed from the data files
  //    (the content/ files are the source of truth; the progress of these cards goes with them)
  await supabase.from('cards').delete().is('slug', null);
  const keep = new Set(ALL_CARDS.map((c) => c.slug));
  const { data: existing, error: listErr } = await selectAll(() => supabase.from('cards').select('slug').order('slug'));
  if (listErr) throw listErr;
  const obsolete = existing.map((c) => c.slug).filter((slug) => slug && !keep.has(slug));
  if (obsolete.length > 0) {
    console.log(`Deleting ${obsolete.length} obsolete card(s): ${obsolete.join(', ')}`);
    const { error: delErr } = await supabase.from('cards').delete().in('slug', obsolete);
    if (delErr) throw delErr;
  }

  // 3. Upsert cards (never deleting your FSRS progress)
  for (const item of ALL_CARDS) {
    const localUrls = [];

    for (let i = 0; i < item.words.length; i++) {
      const word = item.words[i];
      const fileName = `${item.slug}_${i + 1}.mp3`;
      const filePath = `./public/audio/${fileName}`;

      // Only generates the MP3 if it does not already exist on disk!
      if (!existsSync(filePath) || statSync(filePath).size === 0) {
        console.log(`Generating MP3: "${word}" -> ${fileName}`);
        generateMp3(pythonCmd, word, filePath, VOICES[courseOf(item)]);
      } else {
        console.log(`MP3 cache OK: ${fileName}`);
      }

      localUrls.push(`/audio/${fileName}`);
    }

    const { error: upsertErr } = await supabase.from('cards').upsert(
      {
        slug: item.slug,
        deck_id: deckMap.get(item.deck_slug),
        card_type: item.card_type,
        swedish_prompt: item.swedish_prompt,
        prompt_en: enCard(item).prompt,
        swedish_target: item.swedish_target,
        // In the content/ files, `english_translation` holds the French (historical name)
        english_translation: enCard(item).translation,
        ipa_transcription: item.ipa_transcription,
        pitch_accent: item.pitch_accent,
        explanation_md: item.explanation_md,
        explanation_en: noteEn(item),
        ipa_en: IPA_EN[item.slug] ?? null,
        audio_url: localUrls.join('|'),
        gloss: item.gloss?.map((g, i) => ({ ...g, en: enCard(item).gloss[i] })) ?? null,
        french_translation: item.french_translation ?? item.english_translation,
      },
      { onConflict: 'slug' }
    );

    if (upsertErr) throw upsertErr;
  }

  console.log(`\nDone! ${ALL_CARDS.length} cards are synced in PostgreSQL.`);

  await exportContent();
}

// Supabase returns at most 1,000 rows per request: read page by page until the last one
async function selectAll(query, pageSize = 1000) {
  const data = [];
  for (let from = 0; ; from += pageSize) {
    const res = await query().range(from, from + pageSize - 1);
    if (res.error) return res;
    data.push(...res.data);
    if (res.data.length < pageSize) return { data, error: null };
  }
}

// Content export for offline mode (Android APK): src/content.json, bundled at build time.
// The uuids are replaced by slugs so that local progress survives a re-seed.
async function exportContent() {
  const [sections, decks, cards] = await Promise.all([
    supabase.from('sections').select('*').order('sort_order', { ascending: true }),
    // Secondary sort by slug: several decks have sort_order 0, the export must be deterministic
    supabase.from('decks').select('*').order('sort_order', { ascending: true }).order('slug', { ascending: true }),
    selectAll(() => supabase.from('cards').select('*').order('created_at', { ascending: true }).order('slug', { ascending: true })),
  ]);
  for (const res of [sections, decks, cards]) if (res.error) throw res.error;

  const sectionSlug = new Map(sections.data.map((s) => [s.id, s.slug]));
  const deckSlug = new Map(decks.data.map((d) => [d.id, d.slug]));

  const content = {
    sections: sections.data.map((s) => ({ ...s, id: s.slug })),
    decks: decks.data.map((d) => ({
      ...d,
      id: d.slug,
      section_id: d.section_id ? sectionSlug.get(d.section_id) : null,
      prerequisite_deck_id: d.prerequisite_deck_id ? deckSlug.get(d.prerequisite_deck_id) : null,
    })),
    // Tonal accent curve (issue #10): only for the words entered in content/sv/tones.mjs
    cards: cards.data.map(({ created_at: _c, ...c }) => withTone({ ...c, id: c.slug, deck_id: deckSlug.get(c.deck_id) }, TONES)),
  };
  writeFileSync('./src/content.json', JSON.stringify(content) + '\n');
  console.log(`Offline content exported: src/content.json (${content.cards.length} cards).`);
}

run();