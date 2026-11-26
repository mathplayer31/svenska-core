// Tonal accent check (issue #10): node scripts/check-tones.mjs
// Each entry in content/sv/tones.mjs must point to a Swedish vocabulary card and
// match its IPA (number of syllables, position of the stress). Fails at the first doubt.
import { readFileSync } from 'node:fs';
import { TONES } from '../content/sv/tones.mjs';
import { toneFor } from './tones-lib.mjs';

const content = JSON.parse(readFileSync(new URL('../src/content.json', import.meta.url), 'utf8'));
const svDecks = new Set(content.decks.filter((d) => (d.course ?? 'sv') === 'sv').map((d) => d.id));
const bySlug = new Map(content.cards.map((c) => [c.id, c]));

const errors = [];
let n1 = 0;
let n2 = 0;
for (const [slug, accent] of Object.entries(TONES)) {
  const card = bySlug.get(slug);
  if (!card) { errors.push(`${slug}: card not found`); continue; }
  if (!svDecks.has(card.deck_id) || card.card_type !== 'vocab') { errors.push(`${slug}: not a Swedish vocabulary card`); continue; }
  try {
    toneFor(card, accent);
    if (accent === 1) n1++; else n2++;
  } catch (e) {
    errors.push(`${slug}: ${e.message}`);
  }
}

// Checks of the tool itself on known cases
const probe = (target, ipa, accent) => toneFor({ swedish_target: target, ipa_transcription: ipa }, accent);
const k = probe('en kanelbulle', '/ɛn kaˈneːlˌbɵlːɛ/', 2);
if (k.s !== 1 || k.p !== 2 || k.v.length !== 4) errors.push('tool: kanelbulle split incorrectly');
const refuses = (target, ipa, accent) => { try { probe(target, ipa, accent); return false; } catch { return true; } };
// "snöar": ö and a are adjacent in writing, two syllables in the IPA; the doubt rules the word out
if (!refuses('snöar', '/ˈsnøːar/', 2)) errors.push('tool: snöar should be ruled out');
if (!refuses('mjölk', '/mjœlk/', 2)) errors.push('tool: a one-syllable word with accent 2 should be rejected');
if (!refuses('en kopp kaffe', '/ɛn kɔpː ˈkafːɛ/', 1)) errors.push('tool: several words should be rejected');

if (errors.length) {
  console.error(`${errors.length} error(s):\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`Tonal accents OK: ${n1 + n2} words (accent 1: ${n1}, accent 2: ${n2}).`);
