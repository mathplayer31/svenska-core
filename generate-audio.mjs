import { createClient } from '@supabase/supabase-js';
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, statSync, rmSync } from 'node:fs';
import { UNIT1_DECK, UNIT1_CARDS } from './unit1-data.mjs';
import { UNIT2_DECK, UNIT2_CARDS } from './unit2-data.mjs';
import { UNIT3_DECK, UNIT3_CARDS } from './unit3-data.mjs';
import { UNIT4_DECK, UNIT4_CARDS } from './unit4-data.mjs';
import { UNIT5_DECK, UNIT5_CARDS } from './unit5-data.mjs';
import { UNIT6_DECK, UNIT6_CARDS } from './unit6-data.mjs';
import { UNIT7_DECK, UNIT7_CARDS } from './unit7-data.mjs';
import { GRAMMAR_CARDS } from './grammar-data.mjs';
import { SECTIONS } from './sections-data.mjs';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Lance avec : node --env-file=.env.local generate-audio.mjs');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const DECKS_DATA = [
  { slug: 'swedish-core-a1', title: '1. Phonétique & Voyelles', category: 'phonetics', cefr_level: 'A1', sort_order: 1 },
  // Prérequis (prerequisite_slug -> prerequisite_deck_id) : vocab/genres après l'Unité 1,
  // grammaire après l'Unité 7 (ses phrases utilisent le vocabulaire des unités 1 à 7)
  { slug: 'swedish-grammar-a1', title: '2. Grammaire & Syntaxe V2', category: 'grammar', cefr_level: 'A1', sort_order: 2, prerequisite_slug: 'swedish-unit-7-weather' },
  { slug: 'swedish-vocab-a1', title: '3. Vocabulaire & Genres (en/ett)', category: 'vocabulary', cefr_level: 'A1', sort_order: 3, prerequisite_slug: 'swedish-unit-1-greetings' },
];

const CARDS_DATA = [
  // ================= 1. PHONÉTIQUE & VOYELLES (8 CARTES) =================
  {
    slug: 'phon-mal-sol',
    deck_slug: 'swedish-core-a1',
    card_type: 'minimal_pair',
    swedish_prompt: 'Voyelles postérieures : "mål" (å) vs "sol" (o)',
    swedish_target: 'ett mål — en sol',
    english_translation: 'un but/repas — un soleil',
    ipa_transcription: '/moːl/ (å = "eau" fermé) vs /suːl/ (o = "ou" très reculé)',
    pitch_accent: 'Accent 1 (Aigu)',
    explanation_md: 'Le "å" long (/oː/) ressemble au "eau" français très arrondi. Le "o" long (/uː/ dans sol) se prononce comme un "ou" français avec les lèvres très projetées.',
    words: ['ett mål', 'en sol'],
  },
  {
    slug: 'phon-ful-full',
    deck_slug: 'swedish-core-a1',
    card_type: 'minimal_pair',
    swedish_prompt: 'Longueur de la voyelle "u" : "ful" vs "full"',
    swedish_target: 'ful — full',
    english_translation: 'moche — bourré / plein',
    ipa_transcription: '/fʉːl/ (u long pincé) vs /fɵlː/ (u court relâché)',
    pitch_accent: 'Accent 1 (Aigu)',
    explanation_md: 'Devant une seule consonne ("ful"), le "u" (/ʉː/) est long avec les lèvres très pincées vers l’intérieur. Devant deux consonnes ("full"), la voyelle devient courte (/ɵ/).',
    words: ['ful', 'full'],
  },
  {
    slug: 'phon-vag-vagg',
    deck_slug: 'swedish-core-a1',
    card_type: 'minimal_pair',
    swedish_prompt: 'Longueur de la voyelle "ä" : "väg" vs "vägg"',
    swedish_target: 'en väg — en vägg',
    english_translation: 'une route — un mur',
    ipa_transcription: '/vɛːɡ/ (ä long + g court) vs /vɛɡː/ (ä court + g long)',
    pitch_accent: 'Accent 1 (Aigu)',
    explanation_md: 'Une syllabe accentuée est toujours longue : soit la voyelle est longue (väääg), soit la consonne qui suit est longue (väggg).',
    words: ['en väg', 'en vägg'],
  },
  {
    slug: 'phon-ol-ora',
    deck_slug: 'swedish-core-a1',
    card_type: 'minimal_pair',
    swedish_prompt: 'La voyelle "ö" normale vs devant R : "öl" vs "öra"',
    swedish_target: 'en öl — ett öra',
    english_translation: 'une bière — une oreille',
    ipa_transcription: '/øːl/ (eu fermé) vs /ˈœːra/ (eu très ouvert devant r)',
    pitch_accent: 'Accent 1 vs Accent 2',
    explanation_md: 'Dans "öl", le "ö" (/øː/) est fermé (comme dans "peu"), mais devant le "r" de "öra", la bouche s’ouvre grand (/œː/, comme dans "peur").',
    words: ['en öl', 'ett öra'],
  },
  {
    slug: 'phon-ny-nu',
    deck_slug: 'swedish-core-a1',
    card_type: 'minimal_pair',
    swedish_prompt: 'Voyelles arrondies "y" vs "u" : "ny" vs "nu"',
    swedish_target: 'ny — nu',
    english_translation: 'nouveau — maintenant',
    ipa_transcription: '/nyː/ (lèvres évasées) vs /nʉː/ (lèvres comprimées)',
    pitch_accent: 'Accent 1 (Aigu)',
    explanation_md: 'Pour "y" (/yː/), dis "i" en projetant les lèvres vers l’extérieur (en trompette). Pour "u" (/ʉː/), resserre les lèvres à plat comme pour souffler une bougie.',
    words: ['ny', 'nu'],
  },
  {
    slug: 'phon-tak-tack',
    deck_slug: 'swedish-core-a1',
    card_type: 'minimal_pair',
    swedish_prompt: 'Les deux sons du "a" suédois : "tak" vs "tack"',
    swedish_target: 'ett tak — tack',
    english_translation: 'un toit — merci',
    ipa_transcription: '/tɑːk/ (a long sombre/reculé) vs /takː/ (a court clair)',
    pitch_accent: 'Accent 1 (Aigu)',
    explanation_md: 'Le "a" long suédois (/ɑː/ dans tak) est très grave et reculé dans la gorge (presque vers le "å"), tandis que le "a" court (/a/ dans tack) est très clair, comme en français.',
    words: ['ett tak', 'tack'],
  },
  {
    slug: 'phon-kopa-kaka',
    deck_slug: 'swedish-core-a1',
    card_type: 'minimal_pair',
    swedish_prompt: 'Consonne "k" douce vs dure : "köpa" vs "kaka"',
    swedish_target: 'att köpa — en kaka',
    english_translation: 'acheter — un gâteau / biscuit',
    ipa_transcription: '/ˈɕøːpa/ (k doux = tj) vs /ˈkɑːka/ (k dur)',
    pitch_accent: 'Accent 2 (Grave)',
    explanation_md: 'Devant les voyelles antérieures (e, i, y, ä, ö), la lettre "k" devient douce (/ɕ/, proche de "ch" très sifflé sur le palais). Devant (a, o, u, å), le "k" reste dur (/k/).',
    words: ['att köpa', 'en kaka'],
  },
  {
    slug: 'phon-sju-kors',
    deck_slug: 'swedish-core-a1',
    card_type: 'minimal_pair',
    swedish_prompt: 'Son "sj" (/ɧ/) vs Rétroflexe "rs" (/ʂ/) : "sju" vs "kors"',
    swedish_target: 'sju — ett kors',
    english_translation: 'sept (7) — une croix',
    ipa_transcription: '/ɧʉː/ (souffle vélaire) vs /kɔʂː/ (langue recourbée)',
    pitch_accent: 'Accent 1 (Aigu)',
    explanation_md: 'Quand un "r" précède s, t, d, n, l (comme dans "kors" ou "kort"), le "r" fusionne avec la consonne en recourbant la pointe de la langue vers le haut du palais (/ʂ/).',
    words: ['sju', 'ett kors'],
  },

  // ================= 2. GRAMMAIRE & SYNTAXE V2 : voir grammar-data.mjs =================

  // ================= 3. VOCABULAIRE & GENRES EN/ETT (8 CARTES) =================
  {
    slug: 'vocab-bok-bocker',
    deck_slug: 'swedish-vocab-a1',
    card_type: 'vocab',
    swedish_prompt: 'Déclinaison complète (Genre + Pluriel) : "un livre / le livre / les livres"',
    swedish_target: 'en bok — boken — böckerna',
    english_translation: 'a book — the book — the books',
    ipa_transcription: '/ɛn buːk/ — /ˈbuːkɛn/ — /ˈbœkːɛɳa/',
    pitch_accent: 'Accent 1 -> Accent 2',
    explanation_md: 'Pluriel du 3e groupe (-er) avec inflexion de la voyelle (Umlaut : o -> ö) et raccourcissement vocalique : "bok" (/uː/ long) devient "böcker" (/œ/ court).',
    words: ['en bok', 'boken', 'böckerna'],
  },
  {
    slug: 'vocab-flicka-or',
    deck_slug: 'swedish-vocab-a1',
    card_type: 'vocab',
    swedish_prompt: 'Pluriel du 1er groupe (-or) : "une fille / la fille / des filles"',
    swedish_target: 'en flicka — flickan — flickor',
    english_translation: 'a girl — the girl — girls',
    ipa_transcription: '/ɛn ˈflɪkːa/ — /ˈflɪkːan/ — /ˈflɪkːʊr/',
    pitch_accent: 'Accent 2 (Grave)',
    explanation_md: '1er groupe : Tous les noms en "-a" de genre commun ("en") perdent leur "-a" et prennent "-or" au pluriel indéfini ("flickor") et "-orna" au défini ("flickorna").',
    words: ['en flicka', 'flickan', 'flickor'],
  },
  {
    slug: 'vocab-pojke-ar',
    deck_slug: 'swedish-vocab-a1',
    card_type: 'vocab',
    swedish_prompt: 'Pluriel du 2e groupe (-ar) : "un garçon / le garçon / des garçons"',
    swedish_target: 'en pojke — pojken — pojkar',
    english_translation: 'a boy — the boy — boys',
    ipa_transcription: '/ɛn ˈpɔjːkɛ/ — /ˈpɔjːkɛn/ — /ˈpɔjːkar/',
    pitch_accent: 'Accent 2 (Grave)',
    explanation_md: '2e groupe : Les noms communs ("en") courts ou terminés par un "-e" non accentué remplacent le "-e" par "-ar" au pluriel ("pojkar", défini "pojkarna").',
    words: ['en pojke', 'pojken', 'pojkar'],
  },
  {
    slug: 'vocab-apple-n',
    deck_slug: 'swedish-vocab-a1',
    card_type: 'vocab',
    swedish_prompt: 'Pluriel du 4e groupe (-n) : "une pomme / la pomme / des pommes"',
    swedish_target: 'ett äpple — äpplet — äpplen',
    english_translation: 'an apple — the apple — apples',
    ipa_transcription: '/ɛtː ˈɛpːlɛ/ — /ˈɛpːlɛt/ — /ˈɛpːlɛn/',
    pitch_accent: 'Accent 2 (Grave)',
    explanation_md: '4e groupe : Les noms neutres ("ett") qui se terminent par une voyelle prennent simplement "-n" au pluriel indéfini ("äpplen") et "-na" au pluriel défini ("äpplena").',
    words: ['ett äpple', 'äpplet', 'äpplen'],
  },
  {
    slug: 'vocab-hus-zero',
    deck_slug: 'swedish-vocab-a1',
    card_type: 'vocab',
    swedish_prompt: 'Pluriel du 5e groupe (invariable) : "une maison / la maison / les maisons"',
    swedish_target: 'ett hus — huset — husen',
    english_translation: 'a house — the house — the houses',
    ipa_transcription: '/ɛtː hʉːs/ — /ˈhʉːsɛt/ — /ˈhʉːsɛn/',
    pitch_accent: 'Accent 1 (Aigu)',
    explanation_md: '5e groupe : Les noms neutres ("ett") terminés par une consonne ne changent pas au pluriel indéfini ("ett hus -> flera hus") et prennent "-en" au pluriel défini ("husen").',
    words: ['ett hus', 'huset', 'husen'],
  },
  {
    slug: 'vocab-vatten-kaffe',
    deck_slug: 'swedish-vocab-a1',
    card_type: 'vocab',
    swedish_prompt: 'Genres au quotidien : "l’eau" vs "le café"',
    swedish_target: 'vattnet (ett vatten) — kaffet (ett kaffe)',
    english_translation: 'the water — the coffee',
    ipa_transcription: '/ˈvatːnɛt/ — /ˈkafːɛt/',
    pitch_accent: 'Accent 1 (Aigu)',
    explanation_md: 'Attention : "vatten" et "kaffe" sont tous les deux de genre neutre ("ett") ! Au défini, "vatten" perd son "e" muet ("vattnet").',
    words: ['vattnet', 'kaffet'],
  },
  {
    slug: 'vocab-tala-prata',
    deck_slug: 'swedish-vocab-a1',
    card_type: 'vocab',
    swedish_prompt: 'Verbes du 1er groupe (-ar) : "parler / discuter" (infinitif — présent — passé)',
    swedish_target: 'att prata — pratar — pratade',
    english_translation: 'to talk/chat — talks — talked',
    ipa_transcription: '/atː ˈprɑːta/ — /ˈprɑːtar/ — /ˈprɑːtadɛ/',
    pitch_accent: 'Accent 2 (Grave)',
    explanation_md: 'Le groupe 1 (verbes en -ar au présent) représente 80% des nouveaux verbes suédois. Le prétérit se forme toujours en "-ade" et le supin en "-at" (har pratat).',
    words: ['att prata', 'pratar', 'pratade'],
  },
  {
    slug: 'vocab-dricka-starka',
    deck_slug: 'swedish-vocab-a1',
    card_type: 'vocab',
    swedish_prompt: 'Verbe fort (4e groupe) : "boire" (infinitif — présent — passé — supin)',
    swedish_target: 'att dricka — dricker — drack — har druckit',
    english_translation: 'to drink — drinks — drank — has drunk',
    ipa_transcription: '/ˈdrɪkːa/ — /ˈdrɪkːɛr/ — /drakː/ — /ˈdrɵkːɪt/',
    pitch_accent: 'Accent 2 / Accent 1',
    explanation_md: 'Comme en anglais (drink / drank / drunk), les verbes forts suédois changent de voyelle interne (i -> a -> u) au passé sans prendre de terminaison au prétérit ("jag drack").',
    words: ['att dricka', 'dricker', 'drack', 'har druckit'],
  },
];

const ALL_DECKS = [...DECKS_DATA, UNIT1_DECK, UNIT2_DECK, UNIT3_DECK, UNIT4_DECK, UNIT5_DECK, UNIT6_DECK, UNIT7_DECK];
const ALL_CARDS = [
  ...CARDS_DATA, ...GRAMMAR_CARDS, ...UNIT1_CARDS, ...UNIT2_CARDS, ...UNIT3_CARDS,
  ...UNIT4_CARDS, ...UNIT5_CARDS, ...UNIT6_CARDS, ...UNIT7_CARDS,
];

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
  const pythonCmd = getPythonCmd();
  mkdirSync('./public/audio', { recursive: true });

  // 1. Upsert des sections puis des decks
const sectionMap = new Map();
for (const s of SECTIONS) {
  const { data, error } = await supabase
    .from('sections').upsert(s, { onConflict: 'slug' }).select().single();
  if (error) throw error;
  sectionMap.set(s.slug, data.id);
}

const deckMap = new Map();
for (const d of ALL_DECKS) {
  const { section_slug, prerequisite_slug: _prereq, ...row } = d;
  const payload = section_slug
    ? { ...row, section_id: sectionMap.get(section_slug) }
    : row;
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
  //    (les fichiers *-data.mjs sont la source de vérité ; la progression de ces cartes part avec elles)
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
        swedish_target: item.swedish_target,
        english_translation: item.english_translation,
        ipa_transcription: item.ipa_transcription,
        pitch_accent: item.pitch_accent,
        explanation_md: item.explanation_md,
        audio_url: localUrls.join('|'),
        gloss: item.gloss ?? null,
        french_translation: item.french_translation ?? item.english_translation,
      },
      { onConflict: 'slug' }
    );

    if (upsertErr) throw upsertErr;
  }

  console.log(`\nTerminé ! ${ALL_CARDS.length} cartes A1 sont synchronisées dans PostgreSQL.`);
}

run();