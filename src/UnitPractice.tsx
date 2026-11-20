import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  Volume2,
  Trophy,
  RotateCcw,
  Snail,
  AlertTriangle,
} from 'lucide-react';
import { useI18n, type Course, type Strings } from './i18n';

// ============================================================================
// Types
// ============================================================================
export interface PracticeCard {
  id: string;
  cardType: string;
  swedishTarget: string;
  english: string; // traduction dans la langue choisie
  audioUrl?: string;
  gloss: { sv: string; fr: string }[] | null;
}

export type Exercise =
  | { kind: 'match'; key: string; pairs: { id: string; sv: string; fr: string; audio?: string }[] }
  | { kind: 'mcq_sv'; key: string; card: PracticeCard; options: string[] }
  | { kind: 'mcq_listen'; key: string; card: PracticeCard; options: string[] }
  | { kind: 'build'; key: string; card: PracticeCard; tokens: { id: number; text: string }[]; answer: string[] }
  | { kind: 'write'; key: string; card: PracticeCard; dictation: boolean };

export type Verdict = { ok: boolean; message?: string };

interface Props {
  unitTitle: string;
  cards: PracticeCard[];
  /** Textes suédois des unités précédentes, découpés en mots pour les distracteurs des blocs */
  extraWords: string[];
  bestScore: number;
  onFinish: (score: number) => void;
  onExit: () => void;
}

// ============================================================================
// Utilitaires
// ============================================================================
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PUNCT = /[.,!?;:¿¡"“”«»]/g;

/** Mots d'une phrase sans ponctuation : "Det är bra, tack." -> ["Det","är","bra","tack"] */
function tokenize(text: string): string[] {
  return text.replace(PUNCT, ' ').split(/\s+/).filter(Boolean);
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(PUNCT, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// å ä ö é è ç... sans leurs signes diacritiques
function stripAccents(text: string): string {
  return text.normalize('NFD').replace(/\p{M}/gu, '');
}

// Paires d'articles qui portent le genre : oublier l'article ou prendre l'autre est signalé
const ARTICLE_PAIRS: Record<Course, [string, string][]> = {
  sv: [['en', 'ett']],
  fr: [['un', 'une'], ['le', 'la']],
};

function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
}

/** Correction tolérante d'une réponse écrite */
function checkWritten(input: string, target: string, t: Strings, course: Course = 'sv'): Verdict {
  const got = normalize(input);
  const want = normalize(target);
  if (!got) return { ok: false };
  if (got === want) return { ok: true };

  for (const [a, b] of ARTICLE_PAIRS[course]) {
    const article = want.match(new RegExp(`^(${a}|${b}) (.+)$`));
    if (!article) continue;
    if (got === article[2]) return { ok: false, message: t.missingArticle(article[1]) };
    if (got === `${article[1] === a ? b : a} ${article[2]}`) {
      return { ok: false, message: t.wrongGender(`${article[1]} ${article[2]}`) };
    }
  }
  if (stripAccents(got) === stripAccents(want)) {
    return { ok: true, message: t.accentsWarning };
  }
  if (want.length >= 6 && levenshtein(got, want) === 1) {
    return { ok: true, message: t.typoAccepted };
  }
  return { ok: false };
}

function firstAudio(card: PracticeCard): string | undefined {
  return card.audioUrl?.split('|')[0]?.trim() || undefined;
}

function playUrl(url: string | undefined, rate = 1) {
  if (!url) return;
  const audio = new Audio(url);
  audio.playbackRate = rate;
  audio.preservesPitch = true;
  audio.play().catch(() => {});
}

function pickDistinct(pool: string[], exclude: string, n: number): string[] {
  const ex = normalize(exclude);
  const seen = new Set<string>([ex]);
  const out: string[] = [];
  for (const t of shuffle(pool)) {
    const k = normalize(t);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(t);
    if (out.length === n) break;
  }
  return out;
}

// ============================================================================
// Génération de la série d'exercices
// ============================================================================
/**
 * Fabrique d'exercices sur un ensemble de cartes (distracteurs pris dans `cards` et `extraWords`).
 * Partagée par l'entraînement libre et la séance d'unité (issue #10).
 */
export function exerciseFactory(cards: PracticeCard[], extraWords: string[], prefix = 'ex') {
  // Distracteurs des QCM : d'abord des cartes du même type (mot vs phrase), sinon on complète
  const pool = (field: 'swedishTarget' | 'english', card: PracticeCard) => {
    const same = cards.filter((c) => c.cardType === card.cardType && c.id !== card.id).map((c) => c[field]);
    const picked = pickDistinct(same, card[field], 3);
    if (picked.length >= 3) return picked;
    const others = cards.filter((c) => c.cardType !== card.cardType).map((c) => c[field]);
    return [...picked, ...pickDistinct(others, card[field], 3 - picked.length)];
  };
  // Mots-blocs distracteurs : 1er mot de phrase en minuscule, noms propres conservés (Anna, Frankrike)
  const wordPool = Array.from(
    new Map(
      [...cards.map((c) => c.swedishTarget), ...extraWords]
        .flatMap((text) => tokenize(text).map((w, i) => (i === 0 ? w.toLowerCase() : w)))
        .map((w) => [w.toLowerCase(), w] as const)
    ).values()
  );
  let n = 0;
  const key = () => `${prefix}-${n++}`;

  const makeMatch = (subset: PracticeCard[]): Exercise | null =>
    subset.length >= 3
      ? {
          kind: 'match',
          key: key(),
          pairs: subset.map((c) => ({ id: c.id, sv: c.swedishTarget, fr: c.english, audio: firstAudio(c) })),
        }
      : null;

  const makeBuild = (card: PracticeCard): Exercise => {
    const answer = tokenize(card.swedishTarget);
    const lowered = new Set(answer.map((w) => w.toLowerCase()));
    const distractors = shuffle(wordPool.filter((w) => !lowered.has(w.toLowerCase()))).slice(0, Math.min(4, Math.max(2, answer.length - 2)));
    return {
      kind: 'build',
      key: key(),
      card,
      answer,
      tokens: shuffle([...answer, ...distractors]).map((text, id) => ({ id, text })),
    };
  };

  // QCM : traduction vers la langue étudiée, ou écoute vers la traduction (si audio)
  const makeMcq = (card: PracticeCard, listen: boolean): Exercise =>
    listen && firstAudio(card)
      ? { kind: 'mcq_listen', key: key(), card, options: shuffle([card.english, ...pool('english', card)]) }
      : { kind: 'mcq_sv', key: key(), card, options: shuffle([card.swedishTarget, ...pool('swedishTarget', card)]) };

  const makeWrite = (card: PracticeCard, dictation: boolean): Exercise => ({
    kind: 'write',
    key: key(),
    card,
    dictation: dictation && !!firstAudio(card),
  });

  return { makeMatch, makeBuild, makeMcq, makeWrite };
}

function buildExercises(cards: PracticeCard[], extraWords: string[]): Exercise[] {
  const vocab = shuffle(cards.filter((c) => c.cardType === 'vocab'));
  const phrases = shuffle(cards.filter((c) => c.cardType === 'phrase'));
  const { makeMatch, makeBuild, makeMcq, makeWrite } = exerciseFactory(cards, extraWords);
  const out: Exercise[] = [];

  // 1. Échauffement : associer les paires
  const m1 = makeMatch(vocab.slice(0, 5));
  if (m1) out.push(m1);

  // 2. QCM (alternance FR -> SV et écoute -> FR)
  vocab.slice(0, 6).forEach((card, i) => out.push(makeMcq(card, i % 2 === 1)));

  // 3. Phrases à reconstruire avec des blocs
  phrases.slice(0, 4).forEach((card) => out.push(makeBuild(card)));

  // 4. Écriture libre : 2 mots (dont une dictée) + 1 phrase courte
  vocab.slice(0, 2).forEach((card, i) => out.push(makeWrite(card, i === 0)));
  const shortPhrase = [...phrases].sort((a, b) => a.swedishTarget.length - b.swedishTarget.length)[0];
  if (shortPhrase) out.push(makeWrite(shortPhrase, false));

  // 5. Retour au calme : nouvelles paires
  const m2 = makeMatch(shuffle([...vocab.slice(5), ...vocab.slice(0, 2)]).slice(0, 5));
  if (m2) out.push(m2);

  return out;
}

/** Recrée un exercice raté pour le reproposer en fin de série (avec de nouvelles options) */
function regenerate(ex: Exercise, cards: PracticeCard[], extraWords: string[], suffix: string): Exercise {
  const fresh = { ...ex, key: `${ex.key}-${suffix}` } as Exercise;
  if (fresh.kind === 'match') return { ...fresh, pairs: shuffle(fresh.pairs) };
  if (fresh.kind === 'mcq_sv' || fresh.kind === 'mcq_listen') return { ...fresh, options: shuffle(fresh.options) };
  if (fresh.kind === 'build') {
    const rebuilt = buildExercises([fresh.card], extraWords.concat(cards.map((c) => c.swedishTarget)))
      .find((e) => e.kind === 'build');
    return rebuilt ? { ...rebuilt, key: fresh.key } : fresh;
  }
  return fresh;
}

// ============================================================================
// Composant principal
// ============================================================================
export default function UnitPractice({ unitTitle, cards, extraWords, bestScore, onFinish, onExit }: Props) {
  const { t } = useI18n();
  const KIND_LABEL = kindLabels(t);
  const [queue, setQueue] = useState<Exercise[]>(() => buildExercises(cards, extraWords));
  const [baseCount, setBaseCount] = useState(() => queue.length);
  const [index, setIndex] = useState(0);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [retried, setRetried] = useState<Set<string>>(new Set());
  const [finished, setFinished] = useState(false);
  const reported = useRef(false);

  const exercise = queue[index];
  const isRetry = index >= baseCount;

  const handleResult = useCallback(
    (v: Verdict) => {
      setVerdict(v);
      const audio = exercise && exercise.kind !== 'match' ? firstAudio(exercise.card) : undefined;
      if (exercise?.kind === 'build' || exercise?.kind === 'write' || exercise?.kind === 'mcq_sv') playUrl(audio);
      if (!exercise) return;
      if (v.ok && !isRetry) setFirstTryCorrect((c) => c + 1);
      // Un exercice raté est reproposé une seule fois en fin de série (pas de boucle infinie)
      if (!v.ok && !isRetry && !retried.has(exercise.key)) {
        setRetried((s) => new Set(s).add(exercise.key));
        setQueue((q) => [...q, regenerate(exercise, cards, extraWords, 'retry')]);
      }
    },
    [exercise, isRetry, retried, cards, extraWords]
  );

  const handleContinue = useCallback(() => {
    if (index + 1 < queue.length) {
      setIndex(index + 1);
      setVerdict(null);
      return;
    }
    setFinished(true);
    if (!reported.current) {
      reported.current = true;
      onFinish(Math.round((firstTryCorrect / baseCount) * 100));
    }
  }, [index, queue.length, firstTryCorrect, baseCount, onFinish]);

  const handleRestart = () => {
    const fresh = buildExercises(cards, extraWords);
    setQueue(fresh);
    setBaseCount(fresh.length);
    setIndex(0);
    setVerdict(null);
    setFirstTryCorrect(0);
    setRetried(new Set());
    setFinished(false);
    reported.current = false;
  };

  useEnterToContinue(!!verdict, handleContinue);

  if (queue.length === 0) {
    return (
      <Shell onExit={onExit} title={unitTitle} quitLabel={t.quit}>
        <p className="text-muted text-center py-10">{t.notEnoughCards}</p>
      </Shell>
    );
  }

  // ===================== RÉSULTAT =====================
  if (finished) {
    const score = Math.round((firstTryCorrect / baseCount) * 100);
    return (
      <div className="min-h-dvh bg-bg text-ink flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md bg-surface border border-line rounded-2xl p-8 space-y-5 shadow-card">
          <Trophy className={`w-14 h-14 mx-auto ${score >= 80 ? 'text-gold' : 'text-faint'}`} />
          <h2 className="font-display text-3xl text-ink">{t.practiceDone}</h2>
          <p className="font-display text-6xl text-accent tabular-nums">{score}%</p>
          <p className="text-sm text-muted leading-relaxed">
            {t.firstTry(firstTryCorrect, baseCount)}
            {retried.size > 0 && t.retriedInfo(retried.size)}
            {score > bestScore && bestScore > 0 && t.newRecord}
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={onExit}
              className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-accent-ink font-semibold text-sm transition cursor-pointer"
            >
              {t.backToUnit}
            </button>
            <button
              onClick={handleRestart}
              className="w-full py-3 rounded-xl border border-line hover:bg-surface-2 text-ink font-medium text-sm inline-flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> {t.newSeries}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===================== EXERCICE =====================
  const progress = Math.min(index, baseCount) / baseCount;
  const answerCard = exercise.kind === 'match' ? null : exercise.card;

  return (
    <Shell onExit={onExit} title={`${unitTitle} • ${Math.min(index + 1, baseCount)}/${baseCount}${isRetry ? ` • ${t.retry}` : ''}`}
      quitLabel={t.quit}
    >
      <div className="w-full h-2 bg-surface-2 rounded-full mb-5 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
        <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${progress * 100}%` }} />
      </div>

      <ExerciseView exercise={exercise} locked={!!verdict} onResult={handleResult} label={KIND_LABEL[exercise.kind]} />

      {verdict && <VerdictPanel verdict={verdict} card={answerCard} onContinue={handleContinue} />}
    </Shell>
  );
}

export const kindLabels = (t: Strings): Record<Exercise['kind'], string> => ({
  match: t.kindMatch,
  mcq_sv: t.kindMcqSv,
  mcq_listen: t.kindMcqListen,
  build: t.kindBuild,
  write: t.kindWrite,
});

/** Carte d'un exercice : consigne et zone de réponse */
export function ExerciseView({
  exercise,
  locked,
  onResult,
  label,
  chip,
}: {
  exercise: Exercise;
  locked: boolean;
  onResult: (v: Verdict) => void;
  label: string;
  /** Étiquette en plus de la consigne (ex. « Rappel · Unité 1 ») */
  chip?: string;
}) {
  return (
    <div className="bg-surface rounded-3xl p-6 md:p-8 shadow-card space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-ink">{label}</h2>
        {chip && <span className="px-2.5 py-1 rounded-full bg-gold-soft text-gold-ink text-xs font-bold">{chip}</span>}
      </div>
      {exercise.kind === 'match' && <MatchExercise key={exercise.key} ex={exercise} onDone={onResult} />}
      {(exercise.kind === 'mcq_sv' || exercise.kind === 'mcq_listen') && (
        <McqExercise key={exercise.key} ex={exercise} locked={locked} onAnswer={onResult} />
      )}
      {exercise.kind === 'build' && <BuildExercise key={exercise.key} ex={exercise} locked={locked} onCheck={onResult} />}
      {exercise.kind === 'write' && <WriteExercise key={exercise.key} ex={exercise} locked={locked} onCheck={onResult} />}
    </div>
  );
}

/** Correction affichée sous l'exercice, avec la bonne réponse et le bouton Continuer */
export function VerdictPanel({ verdict, card, onContinue }: { verdict: Verdict; card: PracticeCard | null; onContinue: () => void }) {
  const { t } = useI18n();
  return (
    <div className={`mt-4 rounded-3xl p-5 space-y-3 ${verdict.ok ? 'bg-success-soft' : 'bg-danger-soft'}`} role="status">
      <div className={`flex items-center gap-2 font-semibold ${verdict.ok ? 'text-success' : 'text-danger'}`}>
        {verdict.ok ? <CheckCircle2 className="w-5 h-5" aria-hidden /> : <XCircle className="w-5 h-5" aria-hidden />}
        {verdict.ok ? t.wellDone : t.notQuite}
      </div>
      {verdict.message && (
        <p className="text-sm text-gold-ink flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden /> {verdict.message}
        </p>
      )}
      {card && (
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-semibold text-ink">{card.swedishTarget}</p>
            <p className="text-sm text-muted">{card.english}</p>
          </div>
          {firstAudio(card) && (
            <button
              onClick={() => playUrl(firstAudio(card))}
              className="grid place-items-center w-11 h-11 rounded-full bg-surface hover:bg-surface-2 text-accent cursor-pointer shrink-0"
              aria-label={t.listenAgain}
            >
              <Volume2 className="w-5 h-5" aria-hidden />
            </button>
          )}
        </div>
      )}
      {card?.gloss && card.gloss.length > 1 && (
        <div className="flex flex-wrap gap-1.5">
          {card.gloss.map((g, i) => (
            <span key={`${g.sv}-${i}`} className="px-2 py-1 rounded-lg bg-surface text-xs">
              <span className="text-accent font-semibold">{g.sv}</span> <span className="text-muted">{g.fr}</span>
            </span>
          ))}
        </div>
      )}
      <button
        onClick={onContinue}
        className={`w-full py-3.5 rounded-full font-semibold text-sm transition cursor-pointer text-accent-ink ${
          verdict.ok ? 'bg-success hover:opacity-90' : 'bg-danger hover:opacity-90'
        }`}
      >
        {t.continueEnter}
      </button>
    </div>
  );
}

/** Entrée = continuer, une fois la correction affichée */
export function useEnterToContinue(active: boolean, onContinue: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onContinue();
      }
    };
    // Laisse passer l'Entrée qui vient de valider la réponse
    const timer = setTimeout(() => window.addEventListener('keydown', onKey), 50);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [active, onContinue]);
}

function Shell({ onExit, title, quitLabel, children }: { onExit: () => void; title: string; quitLabel: string; children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg text-ink flex flex-col items-center p-4 pt-8 select-none">
      <div className="w-full max-w-xl">
        <div className="mb-5 flex items-center gap-3 text-sm text-muted">
          <button
            onClick={onExit}
            aria-label={quitLabel}
            title={quitLabel}
            className="grid place-items-center w-11 h-11 rounded-full bg-surface text-ink hover:bg-surface-2 transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
          <span className="truncate font-semibold">{title}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

// ============================================================================
// 1. Associer les paires
// ============================================================================
function MatchExercise({
  ex,
  onDone,
}: {
  ex: Extract<Exercise, { kind: 'match' }>;
  onDone: (v: Verdict) => void;
}) {
  const { t } = useI18n();
  const left = useMemo(() => shuffle(ex.pairs), [ex]);
  const right = useMemo(() => shuffle(ex.pairs), [ex]);
  const [pickedLeft, setPickedLeft] = useState<string | null>(null);
  const [pickedRight, setPickedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<[string, string] | null>(null);
  const mistakes = useRef(0);
  const wrongTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (wrongTimer.current) clearTimeout(wrongTimer.current);
  }, []);

  const tryPair = (l: string | null, r: string | null) => {
    if (!l || !r) return;
    if (l === r) {
      const next = new Set(matched).add(l);
      setMatched(next);
      setPickedLeft(null);
      setPickedRight(null);
      if (next.size === ex.pairs.length) {
        const n = mistakes.current;
        // Une erreur d'association est tolérée (clic malheureux), au-delà l'exercice est à refaire
        onDone(
          n === 0
            ? { ok: true }
            : n === 1
              ? { ok: true, message: t.matchOneError }
              : { ok: false, message: t.matchErrors(n) }
        );
      }
      return;
    }
    mistakes.current += 1;
    setWrong([l, r]);
    wrongTimer.current = setTimeout(() => {
      setWrong(null);
      setPickedLeft(null);
      setPickedRight(null);
    }, 600);
  };

  const pick = (side: 'l' | 'r', id: string) => {
    if (wrong || matched.has(id)) return;
    if (side === 'l') {
      setPickedLeft(id);
      playUrl(ex.pairs.find((p) => p.id === id)?.audio);
      tryPair(id, pickedRight);
    } else {
      setPickedRight(id);
      tryPair(pickedLeft, id);
    }
  };

  const cell = (id: string, side: 'l' | 'r') => {
    const isMatched = matched.has(id);
    const isPicked = side === 'l' ? pickedLeft === id : pickedRight === id;
    const isWrong = wrong && (side === 'l' ? wrong[0] === id : wrong[1] === id);
    if (isMatched) return 'bg-success-soft border-transparent text-success opacity-60 cursor-default';
    if (isWrong) return 'bg-danger-soft border-danger text-danger';
    if (isPicked) return 'bg-accent-soft border-accent text-accent';
    return 'bg-surface border-line hover:bg-surface-2 text-ink';
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-2.5">
        {left.map((p) => (
          <button
            key={p.id}
            disabled={matched.has(p.id) || !!wrong}
            onClick={() => pick('l', p.id)}
            className={`w-full px-3 py-3 rounded-xl border text-sm font-semibold transition cursor-pointer ${cell(p.id, 'l')}`}
          >
            {p.sv}
          </button>
        ))}
      </div>
      <div className="space-y-2.5">
        {right.map((p) => (
          <button
            key={p.id}
            disabled={matched.has(p.id) || !!wrong}
            onClick={() => pick('r', p.id)}
            className={`w-full px-3 py-3 rounded-xl border text-sm transition cursor-pointer ${cell(p.id, 'r')}`}
          >
            {p.fr}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 2 & 3. QCM (traduction FR -> SV, ou écoute -> FR)
// ============================================================================
function McqExercise({
  ex,
  locked,
  onAnswer,
}: {
  ex: Extract<Exercise, { kind: 'mcq_sv' | 'mcq_listen' }>;
  locked: boolean;
  onAnswer: (v: Verdict) => void;
}) {
  const { t } = useI18n();
  const [selected, setSelected] = useState<string | null>(null);
  const listen = ex.kind === 'mcq_listen';
  const answer = listen ? ex.card.english : ex.card.swedishTarget;
  const audio = firstAudio(ex.card);

  useEffect(() => {
    if (listen) playUrl(audio);
  }, [listen, audio]);

  const choose = (opt: string) => {
    if (locked || selected) return;
    setSelected(opt);
    onAnswer({ ok: opt === answer });
  };

  // Raccourcis 1-4
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const i = Number(e.key) - 1;
      if (i >= 0 && i < ex.options.length) choose(ex.options[i]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className="space-y-6">
      {listen ? (
        <div className="flex items-center gap-3">
          <button
            onClick={() => playUrl(audio)}
            className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-accent hover:bg-accent-hover text-accent-ink font-semibold transition cursor-pointer"
          >
            <Volume2 className="w-6 h-6" /> {t.listen}
          </button>
          <button
            onClick={() => playUrl(audio, 0.65)}
            className="p-4 rounded-2xl bg-surface-2 hover:bg-line text-accent transition cursor-pointer"
            aria-label={t.listenSlowly}
          >
            <Snail className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <h2 className="font-display text-2xl md:text-3xl text-ink leading-snug">{t.quote(ex.card.english)}</h2>
      )}

      <div className="space-y-3">
        {ex.options.map((opt, i) => {
          const isAnswer = opt === answer;
          const isSelected = opt === selected;
          let style = 'bg-surface border-line hover:bg-surface-2 text-ink';
          if (selected) {
            if (isAnswer) style = 'bg-success-soft border-success text-success';
            else if (isSelected) style = 'bg-danger-soft border-danger text-danger';
            else style = 'bg-surface border-line text-faint';
          }
          return (
            <button
              key={opt}
              onClick={() => choose(opt)}
              disabled={!!selected}
              className={`w-full text-left px-4 py-3.5 rounded-xl border font-medium transition cursor-pointer disabled:cursor-default flex items-center gap-3 ${style}`}
            >
              <span className="text-xs font-mono text-faint hidden md:inline">{i + 1}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// 4. Composer la phrase avec des blocs de mots
// ============================================================================
function BuildExercise({
  ex,
  locked,
  onCheck,
}: {
  ex: Extract<Exercise, { kind: 'build' }>;
  locked: boolean;
  onCheck: (v: Verdict) => void;
}) {
  const { t } = useI18n();
  const [chosen, setChosen] = useState<number[]>([]);
  const glossMap = useMemo(
    () => new Map((ex.card.gloss ?? []).map((g) => [g.sv.toLowerCase(), g.fr])),
    [ex.card.gloss]
  );

  const check = useCallback(() => {
    if (locked || chosen.length === 0) return;
    const built = chosen.map((id) => ex.tokens[id].text.toLowerCase()).join(' ');
    onCheck({ ok: built === ex.answer.map((w) => w.toLowerCase()).join(' ') });
  }, [locked, chosen, ex, onCheck]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') check();
      if (e.key === 'Backspace' && !locked) setChosen((c) => c.slice(0, -1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [check, locked]);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl md:text-3xl text-ink leading-snug">{t.quote(ex.card.english)}</h2>

      <div className="min-h-[64px] border-b-2 border-line pb-3 flex flex-wrap gap-2 items-end">
        {chosen.length === 0 && <span className="text-sm text-faint">{t.tapWords}</span>}
        {chosen.map((id) => (
          <button
            key={id}
            disabled={locked}
            onClick={() => setChosen((c) => c.filter((x) => x !== id))}
            className="px-3.5 py-2 rounded-xl bg-surface-2 border border-line text-ink font-semibold text-base cursor-pointer disabled:cursor-default"
          >
            {ex.tokens[id].text}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {ex.tokens.map((t) => {
          const used = chosen.includes(t.id);
          const hint = glossMap.get(t.text.toLowerCase());
          return (
            <button
              key={t.id}
              disabled={used || locked}
              onClick={() => setChosen((c) => [...c, t.id])}
              title={hint}
              className={`px-3.5 py-2 rounded-xl border font-semibold text-base transition cursor-pointer ${
                used
                  ? 'bg-surface border-line text-transparent cursor-default'
                  : 'bg-surface border-line hover:bg-surface-2 text-ink'
              }`}
            >
              {t.text}
            </button>
          );
        })}
      </div>

      {!locked && (
        <button
          onClick={check}
          disabled={chosen.length === 0}
          className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-hover disabled:bg-surface-2 disabled:text-faint text-accent-ink font-semibold text-sm transition cursor-pointer disabled:cursor-not-allowed"
        >
          {t.checkEnter}
        </button>
      )}
    </div>
  );
}

// ============================================================================
// 5. Écrire à la main (traduction ou dictée)
// ============================================================================
// Lettres difficiles à taper selon la langue étudiée
const SPECIAL_CHARS: Record<Course, string[]> = { sv: ['å', 'ä', 'ö'], fr: ['é', 'è', 'à', 'ç', 'ê'] };

function WriteExercise({
  ex,
  locked,
  onCheck,
}: {
  ex: Extract<Exercise, { kind: 'write' }>;
  locked: boolean;
  onCheck: (v: Verdict) => void;
}) {
  const { t, course } = useI18n();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const audio = firstAudio(ex.card);

  useEffect(() => {
    inputRef.current?.focus();
    if (ex.dictation) playUrl(audio);
  }, [ex.dictation, audio]);

  const check = () => {
    if (locked || !value.trim()) return;
    onCheck(checkWritten(value, ex.card.swedishTarget, t, course));
  };

  const insert = (ch: string) => {
    const el = inputRef.current;
    if (!el) return setValue((v) => v + ch);
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;
    const next = value.slice(0, start) + ch + value.slice(end);
    setValue(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + 1, start + 1);
    });
  };

  return (
    <div className="space-y-5">
      {ex.dictation ? (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-ink">{t.writeWhatYouHear}</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => playUrl(audio)}
              className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-accent hover:bg-accent-hover text-accent-ink font-semibold transition cursor-pointer"
            >
              <Volume2 className="w-6 h-6" /> {t.listen}
            </button>
            <button
              onClick={() => playUrl(audio, 0.65)}
              className="p-4 rounded-2xl bg-surface-2 hover:bg-line text-accent transition cursor-pointer"
              aria-label={t.listenSlowly}
            >
              <Snail className="w-6 h-6" />
            </button>
          </div>
        </div>
      ) : (
        <h2 className="font-display text-2xl md:text-3xl text-ink leading-snug">{t.quote(ex.card.english)}</h2>
      )}

      <input
        ref={inputRef}
        value={value}
        disabled={locked}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            check();
          }
        }}
        placeholder={t.typePlaceholder}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        className="w-full px-4 py-3.5 rounded-xl bg-surface border border-line focus:border-accent outline-none text-lg text-ink placeholder:text-faint select-text"
      />

      <div className="flex items-center gap-2">
        {SPECIAL_CHARS[course].map((ch) => (
          <button
            key={ch}
            disabled={locked}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => insert(ch)}
            className="w-11 h-11 rounded-xl bg-surface-2 hover:bg-line text-accent font-semibold text-lg transition cursor-pointer"
          >
            {ch}
          </button>
        ))}
        <span className="text-xs text-faint ml-2">{t.caseIgnored}</span>
      </div>

      {!locked && (
        <button
          onClick={check}
          disabled={!value.trim()}
          className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-hover disabled:bg-surface-2 disabled:text-faint text-accent-ink font-semibold text-sm transition cursor-pointer disabled:cursor-not-allowed"
        >
          {t.checkEnter}
        </button>
      )}
    </div>
  );
}
