import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Lance avec : node --env-file=.env.local seed-human-audio.mjs');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const WIKI_HEADERS = {
  'User-Agent': 'SvenskaCore/1.0 (https://localhost:5173; dev@svenskacore.local) Mozilla/5.0',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const HUMAN_CARDS = [
  {
    card_type: 'minimal_pair',
    swedish_prompt: 'Voyelles postérieures : "mål" (å) vs "sol" (o)',
    swedish_target: 'ett mål — en sol',
    english_translation: 'un but/repas — un soleil',
    ipa_transcription: '/moːl/ (å = "eau" fermé) vs /suːl/ (o = "ou" très reculé)',
    pitch_accent: 'Accent 1 (Aigu)',
    explanation_md: 'En suédois, le "å" long (/oː/) ressemble au "eau" français très arrondi. À l’inverse, le "o" long (/uː/ dans sol) se prononce comme un "ou" français avec les lèvres très projetées en avant.',
    wikimedia_files: ['File:Sv-mål.ogg', 'File:Sv-sol.ogg'],
  },
  {
    card_type: 'minimal_pair',
    swedish_prompt: 'Longueur de la voyelle "u" : "ful" vs "full"',
    swedish_target: 'ful — full',
    english_translation: 'moche — bourré / plein',
    ipa_transcription: '/fʉːl/ (u long comprimé) vs /fɵlː/ (u court relâché)',
    pitch_accent: 'Accent 1 (Aigu)',
    explanation_md: 'Devant une seule consonne ("ful"), le "u" (/ʉː/) est long avec les lèvres très pincées vers l’intérieur. Devant deux consonnes ("full"), la voyelle devient courte (/ɵ/) et beaucoup plus ouverte.',
    wikimedia_files: ['File:Sv-ful.ogg', 'File:Sv-full.ogg'],
  },
  {
    card_type: 'minimal_pair',
    swedish_prompt: 'Longueur de la voyelle "ä" : "väg" vs "vägg"',
    swedish_target: 'en väg — en vägg',
    english_translation: 'une route — un mur',
    ipa_transcription: '/vɛːɡ/ (ä long + g court) vs /vɛɡː/ (ä court + g long)',
    pitch_accent: 'Accent 1 (Aigu)',
    explanation_md: 'En suédois, une syllabe accentuée est toujours longue : soit la voyelle est longue (väääg), soit la consonne qui suit est longue (väggg). Ne raccourcis jamais les deux en même temps !',
    wikimedia_files: ['File:Sv-väg.ogg', 'File:Sv-vägg.ogg'],
  },
  {
    card_type: 'minimal_pair',
    swedish_prompt: 'La voyelle "ö" normale vs devant un R : "öl" vs "öra"',
    swedish_target: 'en öl — ett öra',
    english_translation: 'une bière — une oreille',
    ipa_transcription: '/øːl/ (eu fermé) vs /ˈœːra/ (eu très ouvert devant r)',
    pitch_accent: 'Accent 1 vs Accent 2',
    explanation_md: 'Les voyelles "ä" et "ö" changent de son lorsqu’elles précèdent un "r" : dans "öl", le "ö" (/øː/) est fermé (comme dans "peu"), mais devant le "r" de "öra", la bouche s’ouvre grand (/œː/, comme dans "peur").',
    wikimedia_files: ['File:Sv-öl.ogg', 'File:Sv-öra.ogg'],
  },
  {
    card_type: 'minimal_pair',
    swedish_prompt: 'Accent tonal (Pitch Accent) : "anden" (1) vs "anden" (2)',
    swedish_target: 'anden (le canard) — anden (l’esprit)',
    english_translation: 'the duck (and + en) vs the spirit (ande + n)',
    ipa_transcription: '/¹anːdɛn/ (1 pic mélodique) vs /²anːdɛn/ (2 pics mélodiques)',
    pitch_accent: 'Accent 1 vs Accent 2',
    explanation_md: 'Les deux mots s’écrivent exactement pareil ! "Anden" (de "and", canard) utilise l’Accent 1 (descendant simple), tandis que "anden" (de "ande", esprit) utilise l’Accent 2 (mélodie qui descend puis remonte sur la 2e syllabe).',
    wikimedia_files: ['File:Sv-anden anden.ogg'],
  },
  {
    card_type: 'minimal_pair',
    swedish_prompt: 'Le fameux son "sj" suédois (Sj-ljudet) : "sju"',
    swedish_target: 'sju',
    english_translation: 'sept (7)',
    ipa_transcription: '/ɧʉː/',
    pitch_accent: 'Accent 1 (Aigu)',
    explanation_md: 'Le son /ɧ/ (écrit sj, sk, stj, skj) n’est pas un "ch" français : recule le dos de la langue vers le voile du palais (comme un souffle rauque doux) tout en arrondissant les lèvres pour enchaîner sur le "u" (/ʉː/).',
    wikimedia_files: ['File:Sv-sju.ogg'],
  },
];

async function resolveAndStoreAudio(fileTitle, storagePath) {
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(
    fileTitle
  )}&prop=imageinfo&iiprop=url&format=json`;

  const res = await fetch(apiUrl, { headers: WIKI_HEADERS });
  const data = await res.json();
  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];
  const rawUrl = pages[pageId]?.imageinfo?.[0]?.url;

  if (!rawUrl) {
    throw new Error(`Fichier introuvable sur Wikimedia: ${fileTitle}`);
  }

  // On supprime les paramètres ?utm_source=... qui déclenchent l'erreur 429
  const cleanUrl = rawUrl.split('?')[0];

  try {
    await sleep(600);
    const audioRes = await fetch(cleanUrl, { headers: WIKI_HEADERS });

    if (audioRes.ok) {
      const arrayBuffer = await audioRes.arrayBuffer();
      const oggBuffer = Buffer.from(arrayBuffer);

      const { error: upErr } = await supabase.storage
        .from('card-audio')
        .upload(storagePath, oggBuffer, {
          contentType: 'audio/ogg',
          upsert: true,
        });

      if (!upErr) {
        const { data: pubUrl } = supabase.storage
          .from('card-audio')
          .getPublicUrl(storagePath);
        return pubUrl.publicUrl;
      }
    }
  } catch {
    // Repli automatique sur l'URL directe du CDN Wikimedia
  }

  console.log(`  -> Utilisation directe du CDN Wikimedia pour ${fileTitle}`);
  return cleanUrl;
}

async function run() {
  const { data: deck, error: deckErr } = await supabase
    .from('decks')
    .upsert(
      {
        slug: 'swedish-core-a1',
        title: 'Swedish Core Foundations',
        category: 'phonetics',
        cefr_level: 'A1',
        sort_order: 1,
      },
      { onConflict: 'slug' }
    )
    .select()
    .single();

  if (deckErr) throw deckErr;

  await supabase.from('cards').delete().eq('deck_id', deck.id);

  for (let i = 0; i < HUMAN_CARDS.length; i++) {
    const item = HUMAN_CARDS[i];
    const finalUrls = [];

    for (let j = 0; j < item.wikimedia_files.length; j++) {
      const wikiTitle = item.wikimedia_files[j];
      console.log(`Récupération voix humaine : ${wikiTitle}...`);
      const storagePath = `human_card_${i + 1}_part_${j + 1}.ogg`;
      const url = await resolveAndStoreAudio(wikiTitle, storagePath);
      finalUrls.push(url);
    }

    const { error: insertErr } = await supabase.from('cards').insert({
      deck_id: deck.id,
      card_type: item.card_type,
      swedish_prompt: item.swedish_prompt,
      swedish_target: item.swedish_target,
      english_translation: item.english_translation,
      ipa_transcription: item.ipa_transcription,
      pitch_accent: item.pitch_accent,
      explanation_md: item.explanation_md,
      audio_url: finalUrls.join('|'),
    });

    if (insertErr) throw insertErr;
    console.log(`Carte prête : ${item.swedish_target}`);
  }

  console.log('\nTerminé ! Rafraîchis ton navigateur (F5) pour écouter les vraies voix.');
}

run();