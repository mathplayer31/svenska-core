// Contrôle des accents tonals (issue #10) : node scripts/check-tones.mjs
// Chaque saisie de content/sv/tones.mjs doit désigner une carte de vocabulaire suédoise et
// concorder avec son IPA (nombre de syllabes, place de l'accent). Sort en erreur au premier doute.
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
  if (!card) { errors.push(`${slug} : carte introuvable`); continue; }
  if (!svDecks.has(card.deck_id) || card.card_type !== 'vocab') { errors.push(`${slug} : pas une carte de vocabulaire suédoise`); continue; }
  try {
    toneFor(card, accent);
    if (accent === 1) n1++; else n2++;
  } catch (e) {
    errors.push(`${slug} : ${e.message}`);
  }
}

// Vérifications de l'outil lui-même sur des cas connus
const probe = (target, ipa, accent) => toneFor({ swedish_target: target, ipa_transcription: ipa }, accent);
const k = probe('en kanelbulle', '/ɛn kaˈneːlˌbɵlːɛ/', 2);
if (k.s !== 1 || k.p !== 2 || k.v.length !== 4) errors.push('outil : kanelbulle mal découpé');
const refuses = (target, ipa, accent) => { try { probe(target, ipa, accent); return false; } catch { return true; } };
// « snöar » : ö et a se suivent à l'écrit, deux syllabes dans l'IPA ; le doute écarte le mot
if (!refuses('snöar', '/ˈsnøːar/', 2)) errors.push('outil : snöar devrait être écarté');
if (!refuses('mjölk', '/mjœlk/', 2)) errors.push('outil : un monosyllabe à accent 2 devrait être refusé');
if (!refuses('en kopp kaffe', '/ɛn kɔpː ˈkafːɛ/', 1)) errors.push('outil : plusieurs mots devraient être refusés');

if (errors.length) {
  console.error(`${errors.length} erreur(s) :\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`Accents tonals OK : ${n1 + n2} mots (accent 1 : ${n1}, accent 2 : ${n2}).`);
