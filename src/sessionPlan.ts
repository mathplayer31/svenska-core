// Plan of a unit session (issues #10 and #13), with no UI dependency: tested by scripts/check-session.ts.
// Order: a block of 6 new cards, then exercises on that block (word pairs, sentences to
// rebuild...), then 2 reviews of words already seen; and so on. Remaining reviews come
// at the end; the review of what was hard is added by the session once the plan is finished.
import type { StudyCardData } from './StudyCard';
import type { Exercise, PracticeCard } from './UnitPractice';

export interface SessionItem {
  study: StudyCardData;
  practice: PracticeCard;
  /** Source unit, shown on reviews ("Review · Unit 1") */
  unitLabel: string;
}

export type Step =
  | { type: 'learn'; item: SessionItem }
  /** item: the card being worked on (absent for pairs, which mix several) */
  | { type: 'practice'; ex: Exercise; item?: SessionItem }
  /** review: end-of-session review of a card found hard */
  | { type: 'recall'; item: SessionItem; ex: Exercise | null; review?: boolean };

export interface Factory {
  makeMatch: (cards: PracticeCard[]) => Exercise | null;
  makeBuild: (card: PracticeCard) => Exercise;
  makeMcq: (card: PracticeCard, listen: boolean) => Exercise;
  makeWrite: (card: PracticeCard, dictation: boolean) => Exercise;
}

export const BLOCK = 6;
export const MAX_NEW = 12;
export const MAX_RECALL = 10;
const RECALLS_PER_BLOCK = 2;
const EXERCISES_PER_BLOCK = 3;

const ARTICLE = /^(en|ett|un|une|le|la|les|l['’])\s*/i;

/** One word (or noun with article, or two-word compound), never a sentence: the only kind allowed in pairs */
export function isMatchWord(c: PracticeCard): boolean {
  if (c.cardType !== 'vocab') return false;
  const main = c.swedishTarget.split(' / ')[0].trim();
  if (/[?!.]/.test(main)) return false;
  return main.replace(ARTICLE, '').split(/\s+/).filter(Boolean).length <= 2;
}

/** Exercise on one card (not graded); null for grammar and minimal pairs */
export function practiceExercise(item: SessionItem, f: Factory, k: number): Exercise | null {
  const c = item.practice;
  if (c.cardType === 'phrase') return f.makeBuild(c);
  if (c.cardType !== 'vocab') return null;
  return k % 2 === 0 ? f.makeMcq(c, k % 4 === 2) : f.makeWrite(c, false);
}

/** Review exercise (graded); null = card flipped and graded by hand */
export function recallExercise(item: SessionItem, f: Factory, k: number): Exercise | null {
  const c = item.practice;
  if (c.cardType === 'phrase') return f.makeBuild(c);
  if (c.cardType !== 'vocab') return null;
  const kind = k % 3;
  return kind === 2 ? f.makeWrite(c, false) : f.makeMcq(c, kind === 1);
}

/** Exercises after a block: pairs on the block's words, then sentences and the other words */
export function blockExercises(block: SessionItem[], f: Factory, k: number): Step[] {
  const steps: Step[] = [];
  const words = block.filter((x) => isMatchWord(x.practice));
  const match = words.length >= 3 ? f.makeMatch(words.slice(0, 5).map((x) => x.practice)) : null;
  if (match) steps.push({ type: 'practice', ex: match });
  const inMatch = new Set(match ? words.slice(0, 5).map((x) => x.study.id) : []);
  const rest = block
    .filter((x) => !inMatch.has(x.study.id))
    .sort((a, b) => Number(b.practice.cardType === 'phrase') - Number(a.practice.cardType === 'phrase'));
  for (const [j, item] of rest.entries()) {
    if (steps.length >= EXERCISES_PER_BLOCK) break;
    const ex = practiceExercise(item, f, k + j);
    if (ex) steps.push({ type: 'practice', ex, item });
  }
  return steps;
}

export function planSession(newItems: SessionItem[], recallItems: SessionItem[], f: Factory): Step[] {
  const news = newItems.slice(0, MAX_NEW);
  const recalls = recallItems.slice(0, MAX_RECALL);
  const steps: Step[] = [];
  let r = 0;
  const recall = () => {
    steps.push({ type: 'recall', item: recalls[r], ex: recallExercise(recalls[r], f, r) });
    r++;
  };
  for (let i = 0; i < news.length; i += BLOCK) {
    const block = news.slice(i, i + BLOCK);
    for (const item of block) steps.push({ type: 'learn', item });
    steps.push(...blockExercises(block, f, i));
    for (let j = 0; j < RECALLS_PER_BLOCK && r < recalls.length; j++) recall();
  }
  while (r < recalls.length) recall();
  return steps;
}

/** End-of-session review: one graded exercise per card found hard (only once each) */
export function reviewSteps(items: SessionItem[], f: Factory): Step[] {
  return items.map((item, k) => ({ type: 'recall', item, ex: recallExercise(item, f, k + 1), review: true }));
}
