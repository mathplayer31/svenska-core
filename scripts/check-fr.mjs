// Contrôle hors ligne du contenu FranceCore (issue #9), sans base ni audio.
// Lancer : node scripts/check-fr.mjs            (tout le cours)
//          node scripts/check-fr.mjs a2         (un niveau)
import { FR_SECTIONS, FR_DECKS, FR_CARDS } from '../content/fr/index.mjs';

const level = process.argv[2]?.toUpperCase();
const errors = [];
const decks = new Map(FR_DECKS.map((d) => [d.slug, d]));
const sections = new Set(FR_SECTIONS.map((s) => s.slug));
const bad = /[—\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u; // tiret cadratin et emojis interdits

const seen = new Set();
for (const d of FR_DECKS) {
  if (seen.has(d.slug)) errors.push(`deck ${d.slug} en double`);
  seen.add(d.slug);
  if (!d.slug.startsWith('fr-') || d.course !== 'fr') errors.push(`deck ${d.slug} : slug fr- et course 'fr' attendus`);
  if (!d.title || !d.title_en) errors.push(`deck ${d.slug} : titre suédois ou anglais manquant`);
  if (d.section_slug && !sections.has(d.section_slug)) errors.push(`deck ${d.slug} : section ${d.section_slug} inconnue`);
  if (d.prerequisite_slug && !FR_DECKS.some((x) => x.slug === d.prerequisite_slug))
    errors.push(`deck ${d.slug} : prérequis ${d.prerequisite_slug} inconnu`);
}

const cardSlugs = new Set();
for (const c of FR_CARDS) {
  const where = `${c.slug}`;
  if (cardSlugs.has(c.slug)) errors.push(`${where} : slug en double`);
  cardSlugs.add(c.slug);
  const deck = decks.get(c.deck_slug);
  if (!deck) { errors.push(`${where} : deck ${c.deck_slug} inconnu`); continue; }
  if (level && deck.cefr_level !== level) continue;
  if (!c.slug.startsWith('fr-')) errors.push(`${where} : le slug doit commencer par fr-`);
  for (const [k, v] of Object.entries({
    fr: c.swedish_target, sv: c.english_translation, prompt: c.swedish_prompt, note: c.explanation_md,
    promptEn: c.en.prompt, en: c.en.translation, noteEn: c.note_en, ipa: c.ipa_transcription,
  })) if (!v || !String(v).trim()) errors.push(`${where} : champ ${k} manquant`);
  if (c.card_type === 'phrase' && !c.gloss?.length) errors.push(`${where} : phrase sans glose`);
  if (c.gloss) {
    if (c.gloss.some((g) => !g.sv || !g.fr)) errors.push(`${where} : glose incomplète (français ou suédois)`);
    if (c.en.gloss?.length !== c.gloss.length || c.en.gloss.some((g) => !g)) errors.push(`${where} : glose anglaise incomplète`);
  }
  if (c.card_type === 'minimal_pair' && c.words.length !== 2) errors.push(`${where} : une paire minimale a 2 mots audio`);
  if (c.card_type === 'cloze_grammar' && !c.swedish_prompt.includes('___')) errors.push(`${where} : consigne de grammaire sans ___`);
  if (bad.test(JSON.stringify(c))) errors.push(`${where} : tiret cadratin ou emoji`);
}

// Chaque unité : 12 mots puis 8 phrases
for (const d of FR_DECKS.filter((x) => x.track === 'thematic' && (!level || x.cefr_level === level))) {
  const cards = FR_CARDS.filter((c) => c.deck_slug === d.slug);
  const v = cards.filter((c) => c.card_type === 'vocab').length;
  const p = cards.filter((c) => c.card_type === 'phrase').length;
  if (v !== 12 || p !== 8) errors.push(`unité ${d.slug} : ${v} mots et ${p} phrases au lieu de 12 et 8`);
}

const scope = level ?? 'A1 à B2';
if (errors.length) {
  console.error(`check-fr ${scope} : ${errors.length} erreur(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
const count = FR_CARDS.filter((c) => !level || decks.get(c.deck_slug)?.cefr_level === level).length;
console.log(`check-fr ${scope} : OK, ${count} cartes`);
