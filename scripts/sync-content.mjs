import { createClient } from '@supabase/supabase-js';
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, statSync, rmSync, writeFileSync } from 'node:fs';
import { UNIT1_DECK, UNIT1_CARDS } from '../content/a1/unit01-greetings.mjs';
import { UNIT2_DECK, UNIT2_CARDS } from '../content/a1/unit02-cafe.mjs';
import { UNIT3_DECK, UNIT3_CARDS } from '../content/a1/unit03-family.mjs';
import { UNIT4_DECK, UNIT4_CARDS } from '../content/a1/unit04-shopping.mjs';
import { UNIT5_DECK, UNIT5_CARDS } from '../content/a1/unit05-restaurant.mjs';
import { UNIT6_DECK, UNIT6_CARDS } from '../content/a1/unit06-transport.mjs';
import { UNIT7_DECK, UNIT7_CARDS } from '../content/a1/unit07-weather.mjs';
import { UNIT8_DECK, UNIT8_CARDS } from '../content/a2/unit08-home.mjs';
import { UNIT9_DECK, UNIT9_CARDS } from '../content/a2/unit09-day.mjs';
import { UNIT10_DECK, UNIT10_CARDS } from '../content/a2/unit10-work.mjs';
import { UNIT11_DECK, UNIT11_CARDS } from '../content/a2/unit11-free-time.mjs';
import { UNIT12_DECK, UNIT12_CARDS } from '../content/a2/unit12-health.mjs';
import { UNIT13_DECK, UNIT13_CARDS } from '../content/a2/unit13-clothes.mjs';
import { UNIT14_DECK, UNIT14_CARDS } from '../content/a2/unit14-traditions.mjs';
import { UNIT15_DECK, UNIT15_CARDS } from '../content/a2/unit15-plans.mjs';
import { GRAMMAR_A2_DECK, GRAMMAR_A2_CARDS } from '../content/a2/grammar.mjs';
import { UNIT16_DECK, UNIT16_CARDS } from '../content/b1/unit16-paperwork.mjs';
import { UNIT17_DECK, UNIT17_CARDS } from '../content/b1/unit17-neighbours.mjs';
import { UNIT18_DECK, UNIT18_CARDS } from '../content/b1/unit18-job-hunting.mjs';
import { UNIT19_DECK, UNIT19_CARDS } from '../content/b1/unit19-opinions.mjs';
import { UNIT20_DECK, UNIT20_CARDS } from '../content/b1/unit20-nature.mjs';
import { UNIT21_DECK, UNIT21_CARDS } from '../content/b1/unit21-news.mjs';
import { UNIT22_DECK, UNIT22_CARDS } from '../content/b1/unit22-emotions.mjs';
import { UNIT23_DECK, UNIT23_CARDS } from '../content/b1/unit23-stories.mjs';
import { GRAMMAR_B1_DECK, GRAMMAR_B1_CARDS } from '../content/b1/grammar.mjs';
import { UNIT24_DECK, UNIT24_CARDS } from '../content/b2/unit24-professional.mjs';
import { UNIT25_DECK, UNIT25_CARDS } from '../content/b2/unit25-economy.mjs';
import { UNIT26_DECK, UNIT26_CARDS } from '../content/b2/unit26-welfare.mjs';
import { UNIT27_DECK, UNIT27_CARDS } from '../content/b2/unit27-climate.mjs';
import { UNIT28_DECK, UNIT28_CARDS } from '../content/b2/unit28-idioms.mjs';
import { UNIT29_DECK, UNIT29_CARDS } from '../content/b2/unit29-arguing.mjs';
import { UNIT30_DECK, UNIT30_CARDS } from '../content/b2/unit30-registers.mjs';
import { UNIT31_DECK, UNIT31_CARDS } from '../content/b2/unit31-history.mjs';
import { GRAMMAR_B2_DECK, GRAMMAR_B2_CARDS } from '../content/b2/grammar.mjs';
import { GRAMMAR_CARDS } from '../content/a1/grammar.mjs';
import { SECTIONS } from '../content/sections.mjs';
import { FOUNDATION_DECKS, FOUNDATION_CARDS } from '../content/a1/foundations.mjs';
import { CARDS_EN, DECKS_EN, SECTIONS_EN } from '../content/a1/en.mjs';
import { NOTES_EN_A1, IPA_EN } from '../content/a1/notes-en.mjs';
import { NOTES_EN_A2 } from '../content/a2/notes-en.mjs';
import { NOTES_EN_B1 } from '../content/b1/notes-en.mjs';
import { NOTES_EN_B2 } from '../content/b2/notes-en.mjs';

// Notes de grammaire en anglais, par slug (issue #5)
const NOTES_EN = { ...NOTES_EN_A1, ...NOTES_EN_A2, ...NOTES_EN_B1, ...NOTES_EN_B2 };

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Lance avec : npm run content');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);


const ALL_DECKS = [
  ...FOUNDATION_DECKS, UNIT1_DECK, UNIT2_DECK, UNIT3_DECK, UNIT4_DECK, UNIT5_DECK, UNIT6_DECK, UNIT7_DECK,
  // A2
  UNIT8_DECK, UNIT9_DECK, UNIT10_DECK, UNIT11_DECK, UNIT12_DECK, UNIT13_DECK, UNIT14_DECK, UNIT15_DECK, GRAMMAR_A2_DECK,
  // B1
  UNIT16_DECK, UNIT17_DECK, UNIT18_DECK, UNIT19_DECK, UNIT20_DECK, UNIT21_DECK, UNIT22_DECK, UNIT23_DECK, GRAMMAR_B1_DECK,
  // B2
  UNIT24_DECK, UNIT25_DECK, UNIT26_DECK, UNIT27_DECK, UNIT28_DECK, UNIT29_DECK, UNIT30_DECK, UNIT31_DECK, GRAMMAR_B2_DECK,
];
const ALL_CARDS = [
  ...FOUNDATION_CARDS, ...GRAMMAR_CARDS, ...UNIT1_CARDS, ...UNIT2_CARDS, ...UNIT3_CARDS,
  ...UNIT4_CARDS, ...UNIT5_CARDS, ...UNIT6_CARDS, ...UNIT7_CARDS,
  // A2
  ...UNIT8_CARDS, ...UNIT9_CARDS, ...UNIT10_CARDS, ...UNIT11_CARDS,
  ...UNIT12_CARDS, ...UNIT13_CARDS, ...UNIT14_CARDS, ...UNIT15_CARDS, ...GRAMMAR_A2_CARDS,
  // B1
  ...UNIT16_CARDS, ...UNIT17_CARDS, ...UNIT18_CARDS, ...UNIT19_CARDS,
  ...UNIT20_CARDS, ...UNIT21_CARDS, ...UNIT22_CARDS, ...UNIT23_CARDS, ...GRAMMAR_B1_CARDS,
  // B2
  ...UNIT24_CARDS, ...UNIT25_CARDS, ...UNIT26_CARDS, ...UNIT27_CARDS,
  ...UNIT28_CARDS, ...UNIT29_CARDS, ...UNIT30_CARDS, ...UNIT31_CARDS, ...GRAMMAR_B2_CARDS,
];

// Contrôle du contenu anglais avant toute écriture en base : chaque carte, deck et section doit avoir
// sa version anglaise, et chaque glose anglaise doit avoir autant de mots que la glose française.
// Anglais d'une carte, d'un deck ou d'une section : inline (unités A2+) ou dans content/a1/en.mjs (A1)
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
  for (const c of ALL_CARDS) if (!NOTES_EN[c.slug]) errors.push(`${c.slug} : note anglaise manquante`);
  const cardSlugs = new Set(ALL_CARDS.map((c) => c.slug));
  for (const slug of Object.keys(NOTES_EN)) if (!cardSlugs.has(slug)) errors.push(`${slug} : note anglaise sans carte`);
  for (const slug of Object.keys(CARDS_EN)) if (!cardSlugs.has(slug)) errors.push(`${slug} : traduction sans carte`);
  for (const d of ALL_DECKS) if (!enDeckTitle(d)) errors.push(`deck ${d.slug} : titre anglais manquant`);
  for (const s of SECTIONS) if (!enSection(s)?.title || !enSection(s)?.description) errors.push(`section ${s.slug} : titre anglais manquant`);
  if (errors.length > 0) throw new Error(`Contenu anglais incomplet (content/a1/en.mjs) :\n- ${errors.join('\n- ')}`);
}

// edge-tts peut se figer : timeout de 30 s, 3 tentatives, et suppression des MP3 tronqués.
function generateMp3(pythonCmd, text, filePath) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      execFileSync(
        pythonCmd,
        ['-m', 'edge_tts', '--voice', 'sv-SE-SofieNeural', '--rate=-10%', '--text', text, '--write-media', filePath],
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
for (const s of SECTIONS) {
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
  const { data: existing, error: listErr } = await supabase.from('cards').select('slug');
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
        generateMp3(pythonCmd, word, filePath);
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
        explanation_en: NOTES_EN[item.slug],
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

// Export du contenu pour le mode hors ligne (APK Android) : src/content.json, embarqué au build.
// Les uuid sont remplacés par les slugs pour que la progression locale survive à un re-seed.
async function exportContent() {
  const [sections, decks, cards] = await Promise.all([
    supabase.from('sections').select('*').order('sort_order', { ascending: true }),
    // Tri secondaire par slug : plusieurs decks ont sort_order 0, l'export doit être déterministe
    supabase.from('decks').select('*').order('sort_order', { ascending: true }).order('slug', { ascending: true }),
    supabase.from('cards').select('*').order('created_at', { ascending: true }),
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
    cards: cards.data.map(({ created_at: _c, ...c }) => ({ ...c, id: c.slug, deck_id: deckSlug.get(c.deck_id) })),
  };
  writeFileSync('./src/content.json', JSON.stringify(content) + '\n');
  console.log(`Contenu hors ligne exporté : src/content.json (${content.cards.length} cartes).`);
}

run();