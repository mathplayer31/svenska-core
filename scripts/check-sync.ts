// Vérifie les règles de fusion de la progression (issue #8).
// Lancer : node --experimental-strip-types scripts/check-sync.ts
import assert from 'node:assert/strict';
import { mergeCard, mergeSection, sameRow, isoOrNull } from '../src/syncMerge.ts';

const older = { card_id: 'u1-hej', reps: 1, last_review: '2026-11-18T08:00:00.000Z' };
const newer = { card_id: 'u1-hej', reps: 2, last_review: '2026-11-19T08:00:00.000Z' };

// La révision la plus récente gagne, quel que soit l'appareil
assert.equal(mergeCard(older, newer), newer);
assert.equal(mergeCard(newer, older), newer);
// Une carte présente d'un seul côté est gardée
assert.equal(mergeCard(older, undefined), older);
assert.equal(mergeCard(undefined, newer), newer);
// À égalité, la version du compte (rien à renvoyer)
const sameTimeCloud = { ...older };
assert.equal(mergeCard(older, sameTimeCloud), sameTimeCloud);

// Sections : meilleur score, validé si validé quelque part, tentatives max
const s = mergeSection(
  { section_id: 's1', best_score: 90, passed: true, attempts: 1, last_attempt: '2026-11-18T08:00:00.000Z' },
  { section_id: 's1', best_score: 70, passed: false, attempts: 3, last_attempt: '2026-11-19T08:00:00.000Z' }
)!;
assert.deepEqual(s, { section_id: 's1', best_score: 90, passed: true, attempts: 3, last_attempt: '2026-11-19T08:00:00.000Z' });

// Comparaison : ordre des clés, null et ancien user_id ignorés
assert.ok(sameRow({ a: 1, b: null, user_id: 'x' }, { a: 1 }));
assert.ok(!sameRow({ a: 1 }, { a: 2 }));
// Dates Postgres remises au format de l'appareil
assert.equal(isoOrNull('2026-11-19 08:00:00+00'), '2026-11-19T08:00:00.000Z');
assert.equal(isoOrNull(null), null);

console.log('check-sync : 11 vérifications OK');
