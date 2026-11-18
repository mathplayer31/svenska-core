import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Volume2, Trophy, RotateCcw } from 'lucide-react';

export interface TestCard {
  id: string;
  cardType: string;
  swedishTarget: string;
  english: string; // traduction française
  audioUrl?: string;
}

interface Question {
  id: string;
  kind: 'listen' | 'translate';
  prompt: string;
  audio?: string;
  options: string[];
  answer: string;
}

interface Props {
  sectionTitle: string;
  passScore: number;
  cards: TestCard[];
  bestScore: number;
  onFinish: (score: number) => void;
  onExit: () => void;
}

const QUESTIONS_PER_TEST = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(cards: TestCard[]): Question[] {
  const pool = cards.filter((c) => c.cardType === 'vocab' || c.cardType === 'phrase');
  return shuffle(pool)
    .slice(0, QUESTIONS_PER_TEST)
    .map((card, i) => {
      const listen = i % 2 === 0 && !!card.audioUrl;
      const answer = listen ? card.english : card.swedishTarget;
      const distractors = Array.from(
        new Set(
          shuffle(pool.filter((c) => c.id !== card.id)).map((c) =>
            listen ? c.english : c.swedishTarget
          )
        )
      )
        .filter((t) => t !== answer)
        .slice(0, 3);

      return {
        id: card.id,
        kind: listen ? 'listen' : 'translate',
        prompt: listen ? 'Écoute, puis choisis la bonne traduction' : card.english,
        audio: listen ? card.audioUrl!.split('|')[0].trim() : undefined,
        options: shuffle([answer, ...distractors]),
        answer,
      } as Question;
    });
}

function playUrl(url: string) {
  const audio = new Audio(url);
  audio.play().catch(() => {});
}

export default function SectionTest({
  sectionTitle,
  passScore,
  cards,
  bestScore,
  onFinish,
  onExit,
}: Props) {
  const [questions, setQuestions] = useState<Question[]>(() => buildQuestions(cards));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const reported = useRef(false);

  const question = questions[index];

  // Joue automatiquement l'audio des questions d'écoute
  useEffect(() => {
    if (!finished && question?.audio) playUrl(question.audio);
  }, [index, finished, question]);

  const handleAnswer = (option: string) => {
    if (selected !== null) return;
    setSelected(option);
    if (option === question.answer) setCorrect((c) => c + 1);
  };

  const handleNext = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
      return;
    }
    const score = Math.round((correct / questions.length) * 100);
    setFinalScore(score);
    setFinished(true);
    if (!reported.current) {
      reported.current = true;
      onFinish(score);
    }
  };

  const handleRetry = () => {
    setQuestions(buildQuestions(cards));
    setIndex(0);
    setSelected(null);
    setCorrect(0);
    setFinished(false);
    reported.current = false;
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-dvh bg-bg text-ink flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <p className="text-muted">Pas assez de cartes (mots ou phrases) pour générer un test.</p>
          <button
            onClick={onExit}
            className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-accent-ink font-semibold text-sm cursor-pointer"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  // ===================== RÉSULTAT =====================
  if (finished) {
    const passed = finalScore >= passScore;
    return (
      <div className="min-h-dvh bg-bg text-ink flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md bg-surface border border-line rounded-2xl p-8 space-y-5 shadow-card">
          {passed ? (
            <Trophy className="w-14 h-14 text-gold mx-auto" />
          ) : (
            <XCircle className="w-14 h-14 text-danger mx-auto" />
          )}
          <h2 className="font-serif text-3xl text-ink">
            {passed ? 'Section validée !' : 'Pas encore…'}
          </h2>
          <p className="font-serif text-6xl text-accent tabular-nums">{finalScore}%</p>
          <p className="text-sm text-muted leading-relaxed">
            {correct} bonne{correct > 1 ? 's' : ''} réponse{correct > 1 ? 's' : ''} sur {questions.length}.{' '}
            {passed
              ? 'La section suivante est débloquée.'
              : `Il faut ${passScore}% pour valider. Révise les cartes et réessaie.`}
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={onExit}
              className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-accent-ink font-semibold text-sm transition cursor-pointer"
            >
              Retour au Tableau de Bord
            </button>
            <button
              onClick={handleRetry}
              className="w-full py-3 rounded-xl border border-line hover:bg-surface-2 text-ink font-medium text-sm inline-flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Refaire le test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===================== QUESTION =====================
  return (
    <div className="min-h-dvh bg-bg text-ink flex flex-col items-center justify-center p-4 select-none">
      <div className="w-full max-w-xl mb-6 flex items-center justify-between gap-3 text-sm text-muted">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1.5 font-semibold text-muted hover:text-accent transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Quitter le test
        </button>
        <span>
          {sectionTitle} • Question {index + 1}/{questions.length}
          {bestScore > 0 ? ` • Meilleur : ${bestScore}%` : ''}
        </span>
      </div>

      <div className="w-full max-w-xl h-1.5 bg-surface-2 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${(index / questions.length) * 100}%` }}
        />
      </div>

      <div className="w-full max-w-xl bg-surface border border-line rounded-2xl p-6 md:p-8 shadow-card space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {question.kind === 'listen' ? 'Compréhension orale' : 'Traduction'}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug">{question.prompt}</h2>
          {question.audio && (
            <button
              onClick={() => playUrl(question.audio!)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-line text-accent text-sm font-semibold transition cursor-pointer"
            >
              <Volume2 className="w-5 h-5" /> Réécouter
            </button>
          )}
        </div>

        <div className="space-y-3">
          {question.options.map((option) => {
            const isAnswer = option === question.answer;
            const isSelected = option === selected;
            let style = 'bg-surface border-line hover:bg-surface-2 text-ink';
            if (selected !== null) {
              if (isAnswer) style = 'bg-success-soft border-success text-success';
              else if (isSelected) style = 'bg-danger-soft border-danger text-danger';
              else style = 'bg-surface border-line text-faint';
            }
            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={selected !== null}
                className={`w-full text-left px-4 py-3.5 rounded-xl border font-medium transition cursor-pointer disabled:cursor-default flex items-center justify-between gap-3 ${style}`}
              >
                <span>{option}</span>
                {selected !== null && isAnswer && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                {selected !== null && isSelected && !isAnswer && <XCircle className="w-5 h-5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-xl mt-6">
        <button
          onClick={handleNext}
          disabled={selected === null}
          className="w-full py-4 rounded-xl bg-accent hover:bg-accent-hover disabled:bg-surface-2 disabled:text-faint text-accent-ink font-semibold text-base transition  cursor-pointer disabled:cursor-not-allowed"
        >
          {index + 1 < questions.length ? 'Suivant' : 'Voir le résultat'}
        </button>
      </div>
    </div>
  );
}
