// Session plan check (issues #10 and #13): node --experimental-strip-types scripts/check-session.ts
import assert from 'node:assert/strict';
import { BLOCK, MAX_NEW, MAX_RECALL, isMatchWord, planSession, reviewSteps, type Factory, type SessionItem } from '../src/sessionPlan.ts';

const item = (id: string, cardType = 'vocab'): SessionItem => ({
  study: { id, cardType, prompt: id, target: id, translation: id, ipa: '', note: '', gloss: null },
  practice: { id, cardType, swedishTarget: id, english: id, gloss: null },
  unitLabel: 'Unité 1',
});
// Fake factory: each exercise carries its type and card, to follow the order
const f: Factory = {
  makeMatch: (cards) => ({ kind: 'match', key: 'm', pairs: cards.map((c) => ({ id: c.id, sv: c.swedishTarget, fr: c.english })) }),
  makeBuild: (card) => ({ kind: 'build', key: `b-${card.id}`, card, tokens: [], answer: [] }),
  makeMcq: (card, listen) => ({ kind: listen ? 'mcq_listen' : 'mcq_sv', key: `q-${card.id}`, card, options: [] }),
  makeWrite: (card) => ({ kind: 'write', key: `w-${card.id}`, card, dictation: false }),
};
const cardOf = (s: ReturnType<typeof planSession>[number]) =>
  s.type === 'practice' ? (s.ex.kind === 'match' ? 'match' : s.ex.card.id) : s.item.study.id;

// 1. A block of new cards, then the pairs on its words and the sentence in blocks, then 2 reviews
const news = ['n1', 'n2', 'n3', 'p1'].map((id) => item(id, id.startsWith('p') ? 'phrase' : 'vocab'));
const recalls = ['r1', 'r2', 'r3'].map((id) => item(id));
const plan = planSession(news, recalls, f);
assert.deepEqual(
  plan.map((s) => `${s.type}:${cardOf(s)}`),
  [
    'learn:n1', 'learn:n2', 'learn:n3', 'learn:p1',
    'practice:match', 'practice:p1',
    'recall:r1', 'recall:r2', 'recall:r3',
  ]
);
const p1 = plan.find((s) => s.type === 'practice' && s.ex.kind !== 'match' && s.ex.card.id === 'p1');
assert.equal(p1?.type === 'practice' && p1.ex.kind, 'build');
assert.equal(p1?.type === 'practice' && p1.item?.study.id, 'p1');
// Word reviews alternate multiple choice, listening and writing
assert.deepEqual(
  plan.filter((s) => s.type === 'recall').map((s) => (s.type === 'recall' ? s.ex?.kind : null)),
  ['mcq_sv', 'mcq_listen', 'write']
);

// 2. No exercise before a block of BLOCK new cards has been seen
const long = planSession(Array.from({ length: 14 }, (_, i) => item(`n${i}`)), [], f);
assert.equal(long.findIndex((s) => s.type !== 'learn'), BLOCK);
assert.deepEqual(long.slice(0, BLOCK).map((s) => s.type), Array(BLOCK).fill('learn'));

// 3. Pairs: words only (article allowed), never a sentence or a 3-word expression
const vocab = (target: string, cardType = 'vocab') => ({ id: target, cardType, swedishTarget: target, english: target, gloss: null });
assert.equal(isMatchWord(vocab('tack')), true);
assert.equal(isMatchWord(vocab('en kanelbulle')), true);
assert.equal(isMatchWord(vocab('un chocolat chaud')), true);
assert.equal(isMatchWord(vocab('tack så mycket')), false);
assert.equal(isMatchWord(vocab('Hur mår du?')), false);
assert.equal(isMatchWord(vocab('Jag heter Anna.', 'phrase')), false);
const phrasesOnly = planSession(['a', 'b', 'c'].map((id) => item(id, 'phrase')), [], f);
assert.ok(!phrasesOnly.some((s) => s.type === 'practice' && s.ex.kind === 'match'));

// 4. End-of-session review: one graded review per hard card, marked as a review
const review = reviewSteps([item('d1'), item('d2', 'phrase')], f);
assert.deepEqual(review.map((s) => (s.type === 'recall' ? `${s.review}:${s.ex?.kind}` : s.type)), ['true:mcq_listen', 'true:build']);

// 5. Caps: at most MAX_NEW new cards and MAX_RECALL reviews per session
const many = planSession(
  Array.from({ length: 20 }, (_, i) => item(`n${i}`)),
  Array.from({ length: 30 }, (_, i) => item(`r${i}`)),
  f
);
assert.equal(many.filter((s) => s.type === 'learn').length, MAX_NEW);
assert.equal(many.filter((s) => s.type === 'recall').length, MAX_RECALL);

// 6. Reviews only, and grammar without an exercise: flipped card (ex null), no pairs
const only = planSession([], [item('g1', 'cloze_grammar'), item('r1')], f);
assert.deepEqual(only.map((s) => s.type), ['recall', 'recall']);
assert.equal(only[0].type === 'recall' && only[0].ex, null);

// 7. Nothing to do: empty session
assert.equal(planSession([], [], f).length, 0);

console.log('Session plan OK.');
