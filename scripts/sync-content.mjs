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

// Notes de grammaire en anglais, par slug (issue #5)
const NOTES_EN = { ...NOTES_EN_A1, ...NOTES_EN_A2, ...NOTES_EN_B1, ...NOTES_EN_B2 };

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Lance avec : npm run content');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);


const ALL_DECKS = [...SV_DECKS, ...FR_DECKS];
const ALL_CARDS = [...SV_CARDS, ...FR_CARDS];
const ALL_SECTIONS = [...SECTIONS, ...FR_SECTIONS];

// Cours de chaque deck (sv par défaut) et voix edge-tts de la langue étudiée
const deckCourse = new Map(ALL_DECKS.map((d) => [d.slug, d.course ?? 'sv']));
const VOICES = { sv: 'sv-SE-SofieNeural', fr: 'fr-FR-DeniseNeural' };
const courseOf = (card) => deckCourse.get(card.deck_slug);
// Note anglaise : inline (cours de français) ou dans content/sv/*/notes-en.mjs (cours de suédois)
const noteEn = (c) => c.note_en ?? NOTES_EN[c.slug];

// Contrôle du contenu anglais avant toute écriture en base : chaque carte, deck et section doit avoir
// sa version anglaise, et chaque glose anglaise doit avoir autant de mots que la glose française.
// Anglais d'une carte, d'un deck ou d'une section : inline (unités A2+) ou dans content/sv/a1/en.mjs (A1)
const enCard = (c) => c.en ?? CARDS_EN[c.slug];
const enDeckTitle = (d) => d.title_en ?? DECKS_EN[d.slug];
const enSection = (s) => (s.title_en ? { title: s.title_en, description: s.description_en } : SECTIONS_EN[s.slug]);

function checkEnglish() {
  const errors = [];
  for (const c of ALL_CARDS) {
    const en = enCard(c);
    if (!en?.prompt || !en?.translation) errors.push(`${c.slug} : consigne ou traduction anglaise manquante`);
    else if (c.gloss && en.gloss?.length !== c.gloss.length)
      errors.push(`${c.slug} : glose anglaise de ${en.gloss?.length ?? 0} mot(s) au lieu de ${c.gloss.length}`);
    else if (!c.gloss && en.gloss) errors.push(`${c.slug} : glose anglaise sans glose française`);
  }
  // Une carte sans note (mot d'un deck thématique, issue #18) n'a pas de note anglaise non plus
  for (const c of ALL_CARDS) if (c.explanation_md && !noteEn(c)) errors.push(`${c.slug} : note anglaise manquante`);
  // Cours de français : la langue de base est le suédois, chaque carte doit l'avoir aussi
  for (const c of ALL_CARDS.filter((x) => courseOf(x) === 'fr')) {
    if (!c.slug.startsWith('fr-')) errors.push(`${c.slug} : les slugs du cours de français commencent par fr-`);
    if (!c.swedish_prompt || !c.english_translation || !c.explanation_md || !c.swedish_target)
      errors.push(`${c.slug} : français, consigne, traduction ou note suédoise manquante`);
    if (c.gloss?.some((g) => !g.sv || !g.fr)) errors.push(`${c.slug} : glose suédoise incomplète`);
  }
  for (const c of ALL_CARDS) if (!deckCourse.has(c.deck_slug)) errors.push(`${c.slug} : deck ${c.deck_slug} inconnu`);
  const seen = new Set();
  for (const c of ALL_CARDS) {
    if (seen.has(c.slug)) errors.push(`${c.slug} : slug en double`);
    seen.add(c.slug);
  }
  const cardSlugs = new Set(ALL_CARDS.map((c) => c.slug));
  for (const slug of Object.keys(NOTES_EN)) if (!cardSlugs.has(slug)) errors.push(`${slug} : note anglaise sans carte`);
  for (const slug of Object.keys(CARDS_EN)) if (!cardSlugs.has(slug)) errors.push(`${slug} : traduction sans carte`);
  for (const d of ALL_DECKS) if (!enDeckTitle(d)) errors.push(`deck ${d.slug} : titre anglais manquant`);
  for (const s of ALL_SECTIONS) if (!enSection(s)?.title || !enSection(s)?.description) errors.push(`section ${s.slug} : titre anglais manquant`);
  if (errors.length > 0) throw new Error(`Contenu incomplet (content/) :\n- ${errors.join('\n- ')}`);
}

// edge-tts peut se figer : timeout de 30 s, 3 tentatives, et suppression des MP3 tronqués.
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
      console.warn(`  Tentative ${attempt}/3 échouée pour "${text}" : ${err.message}`);
    }
    rmSync(filePath, { force: true });
  }
  throw new Error(`Impossible de générer le MP3 pour "${text}"`);
}

function getPythonCmd() {
  for (const cmd of ['python', 'py', 'python3']) {
    try {
      execFileSync(cmd, ['-m', 'edge_tts', '--version'], { stdio: 'ignore' });
      return cmd;
    } catch {
      // Test suivant
    }
  }
  throw new Error('edge_tts introuvable. Lance : python -m pip install edge-tts');
}

async function run() {
  checkEnglish();
  const pythonCmd = getPythonCmd();
  mkdirSync('./public/audio', { recursive: true });

  // 1. Upsert des sections puis des decks
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

// Prérequis : résolus après coup, une fois tous les decks connus
for (const d of ALL_DECKS) {
  const prereqId = d.prerequisite_slug ? deckMap.get(d.prerequisite_slug) : null;
  const { error } = await supabase
    .from('decks').update({ prerequisite_deck_id: prereqId ?? null }).eq('slug', d.slug);
  if (error) throw error;
}

  // 2. Nettoyage : cartes sans slug, et cartes retirées des fichiers de données
  //    (les fichiers content/ sont la source de vérité ; la progression de ces cartes part avec elles)
  await supabase.from('cards').delete().is('slug', null);
  const keep = new Set(ALL_CARDS.map((c) => c.slug));
  const { data: existing, error: listErr } = await selectAll(() => supabase.from('cards').select('slug').order('slug'));
  if (listErr) throw listErr;
  const obsolete = existing.map((c) => c.slug).filter((slug) => slug && !keep.has(slug));
  if (obsolete.length > 0) {
    console.log(`Suppression de ${obsolete.length} carte(s) obsolète(s) : ${obsolete.join(', ')}`);
    const { error: delErr } = await supabase.from('cards').delete().in('slug', obsolete);
    if (delErr) throw delErr;
  }

  // 3. Upsert des cartes (sans jamais supprimer ta progression FSRS)
  for (const item of ALL_CARDS) {
    const localUrls = [];

    for (let i = 0; i < item.words.length; i++) {
      const word = item.words[i];
      const fileName = `${item.slug}_${i + 1}.mp3`;
      const filePath = `./public/audio/${fileName}`;

      // Ne génère le MP3 que s'il n'existe pas déjà sur le disque !
      if (!existsSync(filePath) || statSync(filePath).size === 0) {
        console.log(`Génération MP3 : "${word}" -> ${fileName}`);
        generateMp3(pythonCmd, word, filePath, VOICES[courseOf(item)]);
      } else {
        console.log(`Cache MP3 OK : ${fileName}`);
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
        // Dans les fichiers content/, `english_translation` contient le français (nom historique)
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

  console.log(`\nTerminé ! ${ALL_CARDS.length} cartes sont synchronisées dans PostgreSQL.`);

  await exportContent();
}

// Supabase renvoie au plus 1 000 lignes par requête : on lit par pages jusqu'à la dernière
async function selectAll(query, pageSize = 1000) {
  const data = [];
  for (let from = 0; ; from += pageSize) {
    const res = await query().range(from, from + pageSize - 1);
    if (res.error) return res;
    data.push(...res.data);
    if (res.data.length < pageSize) return { data, error: null };
  }
}

// Export du contenu pour le mode hors ligne (APK Android) : src/content.json, embarqué au build.
// Les uuid sont remplacés par les slugs pour que la progression locale survive à un re-seed.
async function exportContent() {
  const [sections, decks, cards] = await Promise.all([
    supabase.from('sections').select('*').order('sort_order', { ascending: true }),
    // Tri secondaire par slug : plusieurs decks ont sort_order 0, l'export doit être déterministe
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
    // Courbe d'accent tonal (issue #10) : seulement pour les mots saisis dans content/sv/tones.mjs
    cards: cards.data.map(({ created_at: _c, ...c }) => withTone({ ...c, id: c.slug, deck_id: deckSlug.get(c.deck_id) }, TONES)),
  };
  writeFileSync('./src/content.json', JSON.stringify(content) + '\n');
  console.log(`Contenu hors ligne exporté : src/content.json (${content.cards.length} cartes).`);
}

run();