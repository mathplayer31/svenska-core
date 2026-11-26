// Unit session (issues #10 and #13): blocks of new cards, exercises after each block, reviews of words already seen.
// A review is an exercise whose result grades the card in FSRS. At the end of the session, each card found
// hard (graded Again or Hard, failed exercise) comes back once for review.
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Rating, type Grade } from 'ts-fsrs';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useI18n } from './i18n';
import StudyCard, { type StudyCardData } from './StudyCard';
import {
  ExerciseView,
  VerdictPanel,
  exerciseFactory,
  kindLabels,
  useEnterToContinue,
  withoutAudio,
  type Exercise,
  type PracticeCard,
  type Verdict,
} from './UnitPractice';
import { planSession, reviewSteps, type SessionItem, type Step } from './sessionPlan';
import { awardXp } from './dataSource';
import { XP, type XpKind } from './xp';

export { type SessionItem } from './sessionPlan';

/** FSRS grade of a review: correct = Good, correct with a warning = Hard, wrong = Again */
export function gradeFromVerdict(v: Verdict): Grade {
  if (!v.ok) return Rating.Again;
  return v.message ? Rating.Hard : Rating.Good;
}

export default function UnitSession({
  title,
  newItems,
  recallItems,
  poolCards,
  extraWords,
  onRate,
  intervals,
  onExit,
  onAgain,
  onFreePractice,
}: {
  title: string;
  newItems: SessionItem[];
  recallItems: SessionItem[];
  /** Unlocked cards of the course, for distractors */
  poolCards: PracticeCard[];
  extraWords: string[];
  onRate: (cardId: string, grade: Grade) => void;
  intervals: (cardId: string) => Record<number, string>;
  onExit: () => void;
  onAgain: () => void;
  onFreePractice?: () => void;
}) {
  const { t } = useI18n();
  const KIND = kindLabels(t);
  const [factory] = useState(() => exerciseFactory(poolCards, extraWords, 'se'));
  const [steps, setSteps] = useState<Step[]>(() => planSession(newItems, recallItems, factory));
  const [index, setIndex] = useState(0);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [difficult, setDifficult] = useState<Map<string, SessionItem>>(new Map());
  const [reviewAdded, setReviewAdded] = useState(false);
  const [stats, setStats] = useState({ learned: 0, recalls: 0, recallOk: 0 });
  const [xp, setXp] = useState(0);
  const gain = (kind: XpKind) => {
    setXp((n) => n + XP[kind]);
    awardXp(kind);
  };

  const step = steps[index] as Step | undefined;
  const finished = steps.length > 0 && index >= steps.length;
  const inReview = step?.type === 'recall' && !!step.review;

  // Card found hard during the session (not during the review itself: it only comes back once)
  const markDifficult = (item: SessionItem) => {
    if (inReview) return;
    setDifficult((m) => (m.has(item.study.id) ? m : new Map(m).set(item.study.id, item)));
  };

  // Plan finished: the review of hard cards is added before the end screen shows
  useLayoutEffect(() => {
    if (!finished || reviewAdded || difficult.size === 0) return;
    setReviewAdded(true);
    setSteps((list) => [...list, ...reviewSteps([...difficult.values()], factory)]);
  }, [finished, reviewAdded, difficult, factory]);

  // Session finished (review of hard cards included): bonus and day validated for the streak, only once
  const done = finished && (reviewAdded || difficult.size === 0);
  const rewarded = useRef(false);
  useEffect(() => {
    if (!done || rewarded.current) return;
    rewarded.current = true;
    awardXp('session');
  }, [done]);

  const next = useCallback(() => {
    setVerdict(null);
    setFlipped(false);
    setIndex((i) => i + 1);
  }, []);

  useEnterToContinue(!!verdict, next);

  const onExerciseResult = (v: Verdict) => {
    setVerdict(v);
    if (step) gain(v.ok ? 'ok' : 'miss');
    if (step?.type === 'practice') {
      if (step.item && !v.ok) markDifficult(step.item);
      return;
    }
    if (step?.type !== 'recall' || !step.ex) return;
    const grade = gradeFromVerdict(v);
    onRate(step.item.study.id, grade);
    setStats((s) => ({ ...s, recalls: s.recalls + 1, recallOk: s.recallOk + (v.ok ? 1 : 0) }));
    if (grade !== Rating.Good) markDifficult(step.item);
  };

  // "I can't listen": the current exercise and the next ones run without sound
  const noAudio = () =>
    setSteps((list) =>
      list.map((s, i) => (i < index || s.type === 'learn' || !s.ex ? s : { ...s, ex: withoutAudio(s.ex, factory) }))
    );

  const onCardRate = (grade: Grade) => {
    if (!step || step.type === 'practice') return;
    onRate(step.item.study.id, grade);
    gain(step.type === 'learn' ? 'new' : grade === Rating.Again ? 'miss' : 'ok');
    if (step.type === 'learn') setStats((s) => ({ ...s, learned: s.learned + 1 }));
    else setStats((s) => ({ ...s, recalls: s.recalls + 1, recallOk: s.recallOk + (grade === Rating.Again ? 0 : 1) }));
    if (grade === Rating.Again || grade === Rating.Hard) markDifficult(step.item);
    next();
  };

  const shell = (children: React.ReactNode) => (
    <div className="min-h-dvh px-4 md:px-8 pt-5 md:pt-8 pb-8">
      <div className="mx-auto w-full max-w-xl">
        <header className="flex items-center gap-3 mb-5">
          <button
            onClick={onExit}
            aria-label={t.quit}
            title={t.quit}
            className="grid place-items-center w-11 h-11 rounded-full bg-surface text-ink hover:bg-surface-2 transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-muted truncate">{title}</p>
            {!finished && steps.length > 0 && (
              <div
                className="mt-1.5 h-2 rounded-full bg-surface-2 overflow-hidden"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={steps.length}
                aria-valuenow={index}
              >
                <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(index / steps.length) * 100}%` }} />
              </div>
            )}
          </div>
          {!finished && steps.length > 0 && (
            <span className="text-sm font-semibold text-muted tabular-nums shrink-0">{t.stepOf(index + 1, steps.length)}</span>
          )}
        </header>
        {children}
      </div>
    </div>
  );

  if (steps.length === 0) {
    return shell(
      <EndCard title={t.allCaughtUp} text={t.sessionEmpty}>
        {onFreePractice && (
          <button onClick={onFreePractice} className="w-full py-3.5 rounded-full bg-accent hover:bg-accent-hover text-accent-ink font-semibold cursor-pointer">
            {t.freePractice}
          </button>
        )}
        <button onClick={onExit} className="w-full py-3 rounded-full bg-surface-2 hover:bg-line text-ink font-medium cursor-pointer">
          {t.back}
        </button>
      </EndCard>
    );
  }

  if (finished || !step) {
    return shell(
      <EndCard title={t.sessionFinished} text={`${t.sessionSummary(stats.learned, stats.recalls, stats.recallOk)} ${t.xpGained(xp + (done ? XP.session : 0))}`}>
        <button onClick={onAgain} className="w-full py-3.5 rounded-full bg-accent hover:bg-accent-hover text-accent-ink font-semibold cursor-pointer inline-flex items-center justify-center gap-2">
          {t.nextSession} <ArrowRight className="w-4 h-4" aria-hidden />
        </button>
        <button onClick={onExit} className="w-full py-3 rounded-full bg-surface-2 hover:bg-line text-ink font-medium cursor-pointer">
          {t.back}
        </button>
      </EndCard>
    );
  }

  if (step.type === 'learn' || (step.type === 'recall' && !step.ex)) {
    return shell(
      <StudyCard
        key={`${index}-${step.item.study.id}`}
        card={step.item.study}
        chip={step.type === 'learn' ? t.newCard : step.review ? t.reviewChip : t.recallChip(step.item.unitLabel)}
        flipped={flipped}
        onFlip={() => setFlipped(true)}
        onRate={onCardRate}
        intervals={intervals(step.item.study.id)}
      />
    );
  }

  const ex = step.ex as Exercise;
  const answerCard = ex.kind === 'match' ? null : ex.card;
  return shell(
    <>
      <ExerciseView
        key={`${index}-${ex.key}`}
        exercise={ex}
        locked={!!verdict}
        onResult={onExerciseResult}
        label={KIND[ex.kind]}
        chip={step.type === 'recall' ? (step.review ? t.reviewChip : t.recallChip(step.item.unitLabel)) : undefined}
        onNoAudio={noAudio}
      />
      {verdict && <VerdictPanel verdict={verdict} card={answerCard} onContinue={next} />}
    </>
  );
}

function EndCard({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[28px] bg-surface shadow-card p-8 text-center space-y-4 mt-8">
      <span className="grid place-items-center w-16 h-16 mx-auto rounded-full bg-success-soft text-success">
        <CheckCircle2 className="w-8 h-8" aria-hidden />
      </span>
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">{title}</h1>
      <p className="text-muted">{text}</p>
      <div className="flex flex-col gap-3 pt-2">{children}</div>
    </div>
  );
}

export type { StudyCardData };
