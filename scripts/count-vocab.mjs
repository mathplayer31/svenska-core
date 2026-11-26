// SvenskaCore vocabulary count (issue #18): node scripts/count-vocab.mjs
// A word or expression = one `vocab` card of the Swedish course, counted by its 1st form
// ("en bok / böcker" counts as one), without the article en / ett / att, ignoring case and final punctuation.
// Fails if a card of the thematic decks (issue #18) repeats a form already present elsewhere.
import { SV_CARDS, SV_DECKS } from '../content/sv/index.mjs';

export const norm = (s) =>
  s.toLowerCase().replace(/\(.*?\)/g, '').replace(/[?!.,…]+$/g, '').trim().replace(/^(en|ett|att)\s+/, '').trim();
const forms = (c) => c.swedish_target.split(' / ').map(norm);

const level = new Map(SV_DECKS.map((d) => [d.slug, d.cefr_level]));
const themed = new Set(SV_DECKS.filter((d) => d.slug.startsWith('swedish-theme-')).map((d) => d.slug));
const vocab = SV_CARDS.filter((c) => c.card_type === 'vocab');

// Distinct count by 1st form, and by level (level of the 1st card that introduces it)
const first = new Map();
for (const c of vocab) if (!first.has(norm(forms(c)[0]))) first.set(norm(forms(c)[0]), c);
const byLevel = {};
for (const c of first.values()) {
  const key = `${level.get(c.deck_slug)}${themed.has(c.deck_slug) ? ' (decks)' : ''}`;
  byLevel[key] = (byLevel[key] ?? 0) + 1;
}

// Duplicates: any form of a thematic deck card already seen on another card
const owner = new Map();
const errors = [];
// (phonetics minimal pairs count too: "ett öra" is already there)
const pairs = SV_CARDS.filter((c) => c.card_type === 'minimal_pair');
for (const c of [...pairs, ...vocab.filter((x) => !themed.has(x.deck_slug)), ...vocab.filter((x) => themed.has(x.deck_slug))]) {
  for (const f of new Set(forms(c))) {
    const prev = owner.get(f);
    if (prev && themed.has(c.deck_slug)) errors.push(`${c.slug}: "${f}" already in ${prev}`);
    if (!prev) owner.set(f, c.slug);
  }
}

console.log(`SvenskaCore vocabulary: ${first.size} distinct words or expressions (${vocab.length} vocab cards).`);
for (const k of Object.keys(byLevel).sort()) console.log(`  ${k}: ${byLevel[k]}`);
if (errors.length) {
  console.error(`${errors.length} duplicate(s):\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
