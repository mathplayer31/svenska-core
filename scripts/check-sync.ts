// Checks the progress merge rules (issue #8).
// Run: node --experimental-strip-types scripts/check-sync.ts
import assert from 'node:assert/strict';
import { mergeCard, mergeSection, sameRow, isoOrNull } from '../src/syncMerge.ts';

const older = { card_id: 'u1-hej', reps: 1, last_review: '2026-11-18T08:00:00.000Z' };
const newer = { card_id: 'u1-hej', reps: 2, last_review: '2026-11-19T08:00:00.000Z' };

// The most recent review wins, whatever the device
assert.equal(mergeCard(older, newer), newer);
assert.equal(mergeCard(newer, older), newer);
// A card present on one side only is kept
assert.equal(mergeCard(older, undefined), older);
assert.equal(mergeCard(undefined, newer), newer);
// On a tie, the account's version (nothing to send back)
const sameTimeCloud = { ...older };
assert.equal(mergeCard(older, sameTimeCloud), sameTimeCloud);

// Sections: best score, passed if passed anywhere, max attempts
const s = mergeSection(
  { section_id: 's1', best_score: 90, passed: true, attempts: 1, last_attempt: '2026-11-18T08:00:00.000Z' },
  { section_id: 's1', best_score: 70, passed: false, attempts: 3, last_attempt: '2026-11-19T08:00:00.000Z' }
)!;
assert.deepEqual(s, { section_id: 's1', best_score: 90, passed: true, attempts: 3, last_attempt: '2026-11-19T08:00:00.000Z' });

// Comparison: key order, null and old user_id ignored
assert.ok(sameRow({ a: 1, b: null, user_id: 'x' }, { a: 1 }));
assert.ok(!sameRow({ a: 1 }, { a: 2 }));
// Postgres dates converted back to the device format
assert.equal(isoOrNull('2026-11-19 08:00:00+00'), '2026-11-19T08:00:00.000Z');
assert.equal(isoOrNull(null), null);

console.log('check-sync: 11 checks OK');
