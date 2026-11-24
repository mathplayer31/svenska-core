// Comptage du vocabulaire de SvenskaCore (issue #18) : node scripts/count-vocab.mjs
// Un mot ou une expression = une carte `vocab` du cours de suédois, comptée par sa 1re forme
// (« en bok / böcker » compte pour un), sans article en / ett / att, sans casse ni ponctuation finale.
// Sort en erreur si une carte des decks thématiques (issue #18) reprend une forme déjà présente ailleurs.
import { SV_CARDS, SV_DECKS } from '../content/sv/index.mjs';

export const norm = (s) =>
  s.toLowerCase().replace(/\(.*?\)/g, '').replace(/[?!.,…]+$/g, '').trim().replace(/^(en|ett|att)\s+/, '').trim();
const forms = (c) => c.swedish_target.split(' / ').map(norm);

const level = new Map(SV_DECKS.map((d) => [d.slug, d.cefr_level]));
const themed = new Set(SV_DECKS.filter((d) => d.slug.startsWith('swedish-theme-')).map((d) => d.slug));
const vocab = SV_CARDS.filter((c) => c.card_type === 'vocab');

// Compte distinct par 1re forme, et par niveau (niveau de la 1re carte qui l'introduit)
const first = new Map();
for (const c of vocab) if (!first.has(norm(forms(c)[0]))) first.set(norm(forms(c)[0]), c);
const byLevel = {};
for (const c of first.values()) {
  const key = `${level.get(c.deck_slug)}${themed.has(c.deck_slug) ? ' (decks)' : ''}`;
  byLevel[key] = (byLevel[key] ?? 0) + 1;
}

// Doublons : toute forme d'une carte de deck thématique déjà vue sur une autre carte
const owner = new Map();
const errors = [];
// (les paires minimales de phonétique comptent aussi : « ett öra » y est déjà)
const pairs = SV_CARDS.filter((c) => c.card_type === 'minimal_pair');
for (const c of [...pairs, ...vocab.filter((x) => !themed.has(x.deck_slug)), ...vocab.filter((x) => themed.has(x.deck_slug))]) {
  for (const f of new Set(forms(c))) {
    const prev = owner.get(f);
    if (prev && themed.has(c.deck_slug)) errors.push(`${c.slug} : « ${f} » déjà dans ${prev}`);
    if (!prev) owner.set(f, c.slug);
  }
}

console.log(`Vocabulaire SvenskaCore : ${first.size} mots ou expressions distincts (${vocab.length} cartes vocab).`);
for (const k of Object.keys(byLevel).sort()) console.log(`  ${k} : ${byLevel[k]}`);
if (errors.length) {
  console.error(`${errors.length} doublon(s) :\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
