// Plan d'une séance d'unité (issues #10 et #13), sans dépendance d'interface : testé par scripts/check-session.ts.
// Ordre : un bloc de 6 nouvelles cartes, puis des exercices sur ce bloc (paires de mots, phrases à
// reconstruire...), puis 2 rappels de mots déjà vus ; et ainsi de suite. Les rappels restants viennent
// à la fin ; la révision de ce qui a été difficile est ajoutée par la séance une fois le plan terminé.
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
  /** item : la carte travaillée (absente pour les paires, qui en mêlent plusieurs) */
  | { type: 'practice'; ex: Exercise; item?: SessionItem }
  /** review : révision de fin de séance d'une carte trouvée difficile */
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

/** Un mot (ou nom avec article, ou mot composé de deux mots), jamais une phrase : seul admis dans les paires */
export function isMatchWord(c: PracticeCard): boolean {
  if (c.cardType !== 'vocab') return false;
  const main = c.swedishTarget.split(' / ')[0].trim();
  if (/[?!.]/.test(main)) return false;
  return main.replace(ARTICLE, '').split(/\s+/).filter(Boolean).length <= 2;
}

/** Exercice sur une carte (non noté) ; null pour la grammaire et les paires minimales */
export function practiceExercise(item: SessionItem, f: Factory, k: number): Exercise | null {
  const c = item.practice;
  if (c.cardType === 'phrase') return f.makeBuild(c);
  if (c.cardType !== 'vocab') return null;
  return k % 2 === 0 ? f.makeMcq(c, k % 4 === 2) : f.makeWrite(c, false);
}

/** Exercice de rappel (noté) ; null = carte retournée et notée à la main */
export function recallExercise(item: SessionItem, f: Factory, k: number): Exercise | null {
  const c = item.practice;
  if (c.cardType === 'phrase') return f.makeBuild(c);
  if (c.cardType !== 'vocab') return null;
  const kind = k % 3;
  return kind === 2 ? f.makeWrite(c, false) : f.makeMcq(c, kind === 1);
}

/** Exercices après un bloc : les paires sur les mots du bloc, puis les phrases et les autres mots */
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

/** Révision de fin de séance : un exercice noté par carte trouvée difficile (une seule fois chacune) */
export function reviewSteps(items: SessionItem[], f: Factory): Step[] {
  return items.map((item, k) => ({ type: 'recall', item, ex: recallExercise(item, f, k + 1), review: true }));
}
