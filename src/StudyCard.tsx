// Carte d'étude retournable, notée avec FSRS (issue #10) : nouvelles cartes de la séance d'unité,
// rappels sans exercice adapté (grammaire, paires minimales) et séances des fondations.
import { useEffect } from 'react';
import { Rating, type Grade } from 'ts-fsrs';
import { BookOpen, Ear, MessageCircle, Play, Sparkles } from 'lucide-react';
import { useI18n } from './i18n';
import { PlayerWave } from './Melodi';
import ToneCurve, { type Tone } from './ToneCurve';

export interface StudyCardData {
  id: string;
  cardType: string;
  prompt: string;
  target: string;
  translation: string;
  ipa: string;
  note: string;
  gloss: { sv: string; fr: string }[] | null;
  audioUrl?: string;
  /** Accent tonal en texte (ancienne saisie), affiché quand il n'y a pas de courbe */
  accentLabel?: string;
  tone?: Tone | null;
}

export function playUrl(url: string, rate = 1): Promise<void> {
  return new Promise((resolve) => {
    const audio = new Audio(url.trim());
    audio.playbackRate = rate;
    audio.preservesPitch = true;
    audio.onended = () => resolve();
    audio.onerror = () => resolve();
    audio.play().catch(() => resolve());
  });
}

export async function playAll(audioUrl: string | undefined, rate = 1) {
  const urls = (audioUrl ?? '').split('|').map((u) => u.trim()).filter(Boolean);
  for (let i = 0; i < urls.length; i++) {
    await playUrl(urls[i], rate);
    if (i < urls.length - 1) await new Promise((r) => setTimeout(r, 350));
  }
}

// Mini-rendu markdown des notes (**gras**, *italique*, ~~barré~~), sans dépendance
// L'italique peut contenir du gras : « *att hon **inte har*** » (rendu récursif)
export function renderInlineMd(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|~~[^~]+~~|\*(?:[^*]|\*\*[^*]+\*\*)+\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && !part.slice(2, -2).includes('*'))
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    if (part.startsWith('~~') && part.endsWith('~~'))
      return <s key={i} className="text-danger">{renderInlineMd(part.slice(2, -2))}</s>;
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*'))
      return <em key={i} className="text-accent">{renderInlineMd(part.slice(1, -1))}</em>;
    return part;
  });
}

const RATINGS = [
  { grade: Rating.Again, key: '1', style: 'bg-danger-soft text-danger' },
  { grade: Rating.Hard, key: '2', style: 'bg-gold-soft text-gold-ink' },
  { grade: Rating.Good, key: '3', style: 'bg-strong text-strong-ink' },
  { grade: Rating.Easy, key: '4', style: 'bg-success-soft text-success' },
] as const;

export default function StudyCard({
  card,
  chip,
  flipped,
  onFlip,
  onRate,
  intervals,
}: {
  card: StudyCardData;
  chip?: string;
  flipped: boolean;
  onFlip: () => void;
  onRate: (grade: Grade) => void;
  intervals: Record<number, string>;
}) {
  const { t } = useI18n();
  const urls = (card.audioUrl ?? '').split('|').map((u) => u.trim()).filter(Boolean);
  const parts = card.target.split(' / ').map((s) => s.trim());
  const ratingLabel: Record<number, string> = {
    [Rating.Again]: t.rateAgain,
    [Rating.Hard]: t.rateHard,
    [Rating.Good]: t.rateGood,
    [Rating.Easy]: t.rateEasy,
  };
  const TypeIcon =
    card.cardType === 'minimal_pair' ? Ear : card.cardType === 'cloze_grammar' ? BookOpen : card.cardType === 'phrase' ? MessageCircle : Sparkles;

  const flip = () => {
    onFlip();
    playAll(card.audioUrl);
  };

  // Clavier : Espace retourne, 1 à 4 notent, R réécoute, S ralentit
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (!flipped && e.code === 'Space') {
        e.preventDefault();
        flip();
      } else if (flipped) {
        const r = RATINGS.find((x) => x.key === e.key);
        if (r) onRate(r.grade);
        if (e.key.toLowerCase() === 'r') playAll(card.audioUrl);
        if (e.key.toLowerCase() === 's') playAll(card.audioUrl, 0.7);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <>
      <article className="rounded-[28px] bg-surface shadow-card p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-accent">
            <TypeIcon className="w-3.5 h-3.5" aria-hidden />
            {t.cardType[card.cardType] ?? card.cardType}
          </span>
          {chip && <span className="px-2.5 py-1 rounded-full bg-gold-soft text-gold-ink text-xs font-bold">{chip}</span>}
          {!card.tone && card.accentLabel && <span className="ml-auto text-xs text-faint">{card.accentLabel}</span>}
        </div>

        <h1 className="text-lg md:text-xl text-muted leading-snug mt-4">{card.prompt}</h1>

        {flipped ? (
          <div className="mt-6 space-y-6">
            <div>
              {card.tone ? (
                <>
                  <ToneCurve tone={card.tone} />
                  {card.target !== card.tone.w && <p className="mt-3 text-lg font-semibold text-ink">{card.target}</p>}
                </>
              ) : (
                <p className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-tight">{card.target}</p>
              )}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {card.tone && (
                  <span className="px-3 py-1 rounded-full bg-gold-soft text-gold-ink text-xs font-bold">{t.toneChip(card.tone.a)}</span>
                )}
                {card.ipa && <span className="font-mono text-sm text-muted">{card.ipa}</span>}
              </div>
              <p className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink mt-4">{card.translation}</p>
            </div>

            {urls.length === 1 && (
              <div className="flex items-center gap-3 p-2.5 pr-3 rounded-full bg-bg">
                <button
                  onClick={() => playUrl(urls[0])}
                  aria-label={t.listen}
                  className="grid place-items-center w-12 h-12 rounded-full bg-strong text-strong-ink shrink-0 cursor-pointer hover:opacity-90"
                >
                  <Play className="w-5 h-5 fill-current" aria-hidden />
                </button>
                <PlayerWave className="flex-1 min-w-0" />
                <button
                  onClick={() => playUrl(urls[0], 0.7)}
                  aria-label={t.listenSlowly}
                  className="h-10 px-3 rounded-full bg-surface text-ink text-sm font-semibold cursor-pointer hover:bg-surface-2"
                >
                  {t.slow}
                </button>
              </div>
            )}
            {urls.length > 1 && (
              <ul className="space-y-2">
                {urls.map((url, i) => (
                  <li key={url} className="flex items-center gap-3 p-2 pr-3 rounded-full bg-bg">
                    <button
                      onClick={() => playUrl(url)}
                      aria-label={`${t.listen} ${parts[i] ?? ''}`}
                      className="grid place-items-center w-11 h-11 rounded-full bg-strong text-strong-ink shrink-0 cursor-pointer hover:opacity-90"
                    >
                      <Play className="w-4 h-4 fill-current" aria-hidden />
                    </button>
                    <span className="flex-1 min-w-0 truncate font-semibold text-ink">{parts[i] || t.audioN(i + 1)}</span>
                    <button
                      onClick={() => playUrl(url, 0.7)}
                      aria-label={`${t.listenSlowly} ${parts[i] ?? ''}`}
                      className="h-10 px-3 rounded-full bg-surface text-ink text-sm font-semibold cursor-pointer hover:bg-surface-2"
                    >
                      {t.slow}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {card.gloss && card.gloss.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {card.gloss.map((g, i) => (
                  <span key={`${g.sv}-${i}`} className="px-3 py-1.5 rounded-xl bg-bg text-center">
                    <span className="block text-sm font-semibold text-ink">{g.sv}</span>
                    <span className="block text-xs text-muted">{g.fr}</span>
                  </span>
                ))}
              </div>
            )}

            {card.note && (
              <div className="rounded-3xl bg-accent-soft p-4 md:p-5 text-[15px] leading-relaxed text-ink">{renderInlineMd(card.note)}</div>
            )}
          </div>
        ) : (
          <p className="mt-10 mb-2 text-center text-muted">{t.sayItFirst}</p>
        )}
      </article>

      <div className="sticky bottom-0 mt-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] bg-bg/90 backdrop-blur">
        {!flipped ? (
          <button
            onClick={flip}
            className="w-full py-4 rounded-full bg-accent hover:bg-accent-hover text-accent-ink font-semibold transition cursor-pointer"
          >
            {t.showAnswer} <span className="hidden md:inline opacity-70 font-normal">{t.spaceKey}</span>
          </button>
        ) : (
          <div className="grid grid-cols-4 gap-1.5 md:gap-2 p-1.5 rounded-[26px] bg-surface">
            {RATINGS.map((r) => (
              <button
                key={r.key}
                onClick={() => onRate(r.grade)}
                className={`flex flex-col items-center justify-center min-h-[58px] px-1 rounded-[20px] transition cursor-pointer hover:opacity-90 ${r.style}`}
              >
                <span className="font-bold text-sm">{ratingLabel[r.grade]}</span>
                <span className="text-xs tabular-nums">
                  {intervals[r.grade]}
                  <span className="hidden md:inline"> · {r.key}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
