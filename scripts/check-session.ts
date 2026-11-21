// Contrôle du plan de séance (issues #10 et #13) : node --experimental-strip-types scripts/check-session.ts
import assert from 'node:assert/strict';
import { BLOCK, MAX_NEW, MAX_RECALL, isMatchWord, planSession, reviewSteps, type Factory, type SessionItem } from '../src/sessionPlan.ts';

const item = (id: string, cardType = 'vocab'): SessionItem => ({
  study: { id, cardType, prompt: id, target: id, translation: id, ipa: '', note: '', gloss: null },
  practice: { id, cardType, swedishTarget: id, english: id, gloss: null },
  unitLabel: 'Unité 1',
});
// Fabrique factice : chaque exercice porte le type et la carte, pour suivre l'ordre
const f: Factory = {
  makeMatch: (cards) => ({ kind: 'match', key: 'm', pairs: cards.map((c) => ({ id: c.id, sv: c.swedishTarget, fr: c.english })) }),
  makeBuild: (card) => ({ kind: 'build', key: `b-${card.id}`, card, tokens: [], answer: [] }),
  makeMcq: (card, listen) => ({ kind: listen ? 'mcq_listen' : 'mcq_sv', key: `q-${card.id}`, card, options: [] }),
  makeWrite: (card) => ({ kind: 'write', key: `w-${card.id}`, card, dictation: false }),
};
const cardOf = (s: ReturnType<typeof planSession>[number]) =>
  s.type === 'practice' ? (s.ex.kind === 'match' ? 'match' : s.ex.card.id) : s.item.study.id;

// 1. Un bloc de nouvelles cartes, puis les paires sur ses mots et la phrase en blocs, puis 2 rappels
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
// Les rappels de mots alternent QCM, écoute et écriture
assert.deepEqual(
  plan.filter((s) => s.type === 'recall').map((s) => (s.type === 'recall' ? s.ex?.kind : null)),
  ['mcq_sv', 'mcq_listen', 'write']
);

// 2. Pas d'exercice avant d'avoir vu un bloc de BLOCK nouvelles cartes
const long = planSession(Array.from({ length: 14 }, (_, i) => item(`n${i}`)), [], f);
assert.equal(long.findIndex((s) => s.type !== 'learn'), BLOCK);
assert.deepEqual(long.slice(0, BLOCK).map((s) => s.type), Array(BLOCK).fill('learn'));

// 3. Paires : des mots seulement (article admis), jamais une phrase ni une expression de 3 mots
const vocab = (target: string, cardType = 'vocab') => ({ id: target, cardType, swedishTarget: target, english: target, gloss: null });
assert.equal(isMatchWord(vocab('tack')), true);
assert.equal(isMatchWord(vocab('en kanelbulle')), true);
assert.equal(isMatchWord(vocab('un chocolat chaud')), true);
assert.equal(isMatchWord(vocab('tack så mycket')), false);
assert.equal(isMatchWord(vocab('Hur mår du?')), false);
assert.equal(isMatchWord(vocab('Jag heter Anna.', 'phrase')), false);
const phrasesOnly = planSession(['a', 'b', 'c'].map((id) => item(id, 'phrase')), [], f);
assert.ok(!phrasesOnly.some((s) => s.type === 'practice' && s.ex.kind === 'match'));

// 4. Révision de fin de séance : un rappel noté par carte difficile, marqué comme révision
const review = reviewSteps([item('d1'), item('d2', 'phrase')], f);
assert.deepEqual(review.map((s) => (s.type === 'recall' ? `${s.review}:${s.ex?.kind}` : s.type)), ['true:mcq_listen', 'true:build']);

// 5. Plafonds : au plus MAX_NEW nouvelles cartes et MAX_RECALL rappels par séance
const many = planSession(
  Array.from({ length: 20 }, (_, i) => item(`n${i}`)),
  Array.from({ length: 30 }, (_, i) => item(`r${i}`)),
  f
);
assert.equal(many.filter((s) => s.type === 'learn').length, MAX_NEW);
assert.equal(many.filter((s) => s.type === 'recall').length, MAX_RECALL);

// 6. Rappels seuls, et grammaire sans exercice : carte retournée (ex null), pas de paires
const only = planSession([], [item('g1', 'cloze_grammar'), item('r1')], f);
assert.deepEqual(only.map((s) => s.type), ['recall', 'recall']);
assert.equal(only[0].type === 'recall' && only[0].ex, null);

// 7. Rien à faire : séance vide
assert.equal(planSession([], [], f).length, 0);

console.log('Plan de séance OK.');
