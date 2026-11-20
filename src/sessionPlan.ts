// Plan d'une séance d'unité (issue #10), sans dépendance d'interface : testé par scripts/check-session.ts.
// Ordre : 2 nouvelles cartes, un exercice sur chacune, 1 rappel ; puis les rappels restants,
// et pour finir des paires avec les mots appris pendant la séance.
import type { StudyCardData } from './StudyCard';
import type { Exercise, PracticeCard } from './UnitPractice';

export interface SessionItem {
  study: StudyCardData;
  practice: PracticeCard;
  /** Unité d'origine, affichée sur les rappels (« Rappel · Unité 1 ») */
  unitLabel: string;
}

export type Step =
  | { type: 'learn'; item: SessionItem }
  | { type: 'practice'; ex: Exercise }
  | { type: 'recall'; item: SessionItem; ex: Exercise | null };

export interface Factory {
  makeMatch: (cards: PracticeCard[]) => Exercise | null;
  makeBuild: (card: PracticeCard) => Exercise;
  makeMcq: (card: PracticeCard, listen: boolean) => Exercise;
  makeWrite: (card: PracticeCard, dictation: boolean) => Exercise;
}

export const MAX_NEW = 8;
export const MAX_RECALL = 10;

/** Exercice juste après une nouvelle carte (non noté) ; null pour la grammaire et les paires minimales */
export function practiceExercise(item: SessionItem, f: Factory, k: number): Exercise | null {
  const c = item.practice;
  if (c.cardType === 'phrase') return f.makeBuild(c);
  if (c.cardType !== 'vocab') return null;
  return f.makeMcq(c, k % 2 === 1);
}

/** Exercice de rappel (noté) ; null = carte retournée et notée à la main */
export function recallExercise(item: SessionItem, f: Factory, k: number): Exercise | null {
  const c = item.practice;
  if (c.cardType === 'phrase') return f.makeBuild(c);
  if (c.cardType !== 'vocab') return null;
  const kind = k % 3;
  return kind === 2 ? f.makeWrite(c, false) : f.makeMcq(c, kind === 1);
}

export function planSession(newItems: SessionItem[], recallItems: SessionItem[], f: Factory): Step[] {
  const news = newItems.slice(0, MAX_NEW);
  const recalls = recallItems.slice(0, MAX_RECALL);
  const steps: Step[] = [];
  let r = 0;
  for (let i = 0; i < news.length; i += 2) {
    const chunk = news.slice(i, i + 2);
    for (const item of chunk) steps.push({ type: 'learn', item });
    chunk.forEach((item, j) => {
      const ex = practiceExercise(item, f, i + j);
      if (ex) steps.push({ type: 'practice', ex });
    });
    if (r < recalls.length) {
      steps.push({ type: 'recall', item: recalls[r], ex: recallExercise(recalls[r], f, r) });
      r++;
    }
  }
  for (; r < recalls.length; r++) steps.push({ type: 'recall', item: recalls[r], ex: recallExercise(recalls[r], f, r) });

  const learnedVocab = news.filter((x) => x.practice.cardType === 'vocab').map((x) => x.practice);
  const match = learnedVocab.length >= 3 ? f.makeMatch(learnedVocab.slice(0, 5)) : null;
  if (match) steps.push({ type: 'practice', ex: match });
  return steps;
}
