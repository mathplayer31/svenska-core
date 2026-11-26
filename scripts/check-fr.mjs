// Offline check of the FranceCore content (issue #9), with no database or audio.
// Run: node scripts/check-fr.mjs            (the whole course)
//      node scripts/check-fr.mjs a2         (one level)
import { FR_SECTIONS, FR_DECKS, FR_CARDS } from '../content/fr/index.mjs';

const level = process.argv[2]?.toUpperCase();
const errors = [];
const decks = new Map(FR_DECKS.map((d) => [d.slug, d]));
const sections = new Set(FR_SECTIONS.map((s) => s.slug));
const bad = /[—\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u; // em dash and emojis are not allowed

const seen = new Set();
for (const d of FR_DECKS) {
  if (seen.has(d.slug)) errors.push(`deck ${d.slug} duplicated`);
  seen.add(d.slug);
  if (!d.slug.startsWith('fr-') || d.course !== 'fr') errors.push(`deck ${d.slug}: fr- slug and course 'fr' expected`);
  if (!d.title || !d.title_en) errors.push(`deck ${d.slug}: missing Swedish or English title`);
  if (d.section_slug && !sections.has(d.section_slug)) errors.push(`deck ${d.slug}: unknown section ${d.section_slug}`);
  if (d.prerequisite_slug && !FR_DECKS.some((x) => x.slug === d.prerequisite_slug))
    errors.push(`deck ${d.slug}: unknown prerequisite ${d.prerequisite_slug}`);
}

const cardSlugs = new Set();
for (const c of FR_CARDS) {
  const where = `${c.slug}`;
  if (cardSlugs.has(c.slug)) errors.push(`${where}: duplicate slug`);
  cardSlugs.add(c.slug);
  const deck = decks.get(c.deck_slug);
  if (!deck) { errors.push(`${where}: unknown deck ${c.deck_slug}`); continue; }
  if (level && deck.cefr_level !== level) continue;
  if (!c.slug.startsWith('fr-')) errors.push(`${where}: the slug must start with fr-`);
  for (const [k, v] of Object.entries({
    fr: c.swedish_target, sv: c.english_translation, prompt: c.swedish_prompt, note: c.explanation_md,
    promptEn: c.en.prompt, en: c.en.translation, noteEn: c.note_en, ipa: c.ipa_transcription,
  })) if (!v || !String(v).trim()) errors.push(`${where}: missing field ${k}`);
  if (c.card_type === 'phrase' && !c.gloss?.length) errors.push(`${where}: sentence without a gloss`);
  if (c.gloss) {
    if (c.gloss.some((g) => !g.sv || !g.fr)) errors.push(`${where}: incomplete gloss (French or Swedish)`);
    if (c.en.gloss?.length !== c.gloss.length || c.en.gloss.some((g) => !g)) errors.push(`${where}: incomplete English gloss`);
  }
  if (c.card_type === 'minimal_pair' && c.words.length !== 2) errors.push(`${where}: a minimal pair has 2 audio words`);
  if (c.card_type === 'cloze_grammar' && !c.swedish_prompt.includes('___')) errors.push(`${where}: grammar instruction without ___`);
  if (bad.test(JSON.stringify(c))) errors.push(`${where}: em dash or emoji`);
}

// Each unit: 12 words, 5 to 8 added words (issue #14), then 8 sentences
for (const d of FR_DECKS.filter((x) => x.track === 'thematic' && (!level || x.cefr_level === level))) {
  const cards = FR_CARDS.filter((c) => c.deck_slug === d.slug);
  const v = cards.filter((c) => c.card_type === 'vocab').length;
  const p = cards.filter((c) => c.card_type === 'phrase').length;
  if (v < 17 || v > 20 || p !== 8) errors.push(`unit ${d.slug}: ${v} words and ${p} sentences instead of 17 to 20 and 8`);
}

const scope = level ?? 'A1 to B2';
if (errors.length) {
  console.error(`check-fr ${scope}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
const count = FR_CARDS.filter((c) => !level || decks.get(c.deck_slug)?.cefr_level === level).length;
console.log(`check-fr ${scope}: OK, ${count} cards`);
