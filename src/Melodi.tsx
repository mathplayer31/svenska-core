// Éléments visuels de la direction Melodi (issue #10) : drapeaux, pochettes, égaliseur,
// barre de progression en forme d'onde, bascule de thème et panneau de choix du cours.
import { useEffect, useRef } from 'react';
import { Moon, Sun, X } from 'lucide-react';
import { COURSE_LANGS, useI18n, type Course, type Lang } from './i18n';
import type { ThemeChoice } from './theme';

export function Flag({ course, size = 24, className = '' }: { course: Course; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 overflow-hidden ring-1 ring-line ${className}`}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.28) }}
    >
      <svg width={size} height={size} viewBox="0 0 52 52" className="block">
        {course === 'sv' ? (
          <>
            <rect width="52" height="52" fill="#006AA7" />
            <rect x="15" width="9" height="52" fill="#FECC00" />
            <rect y="21.5" width="52" height="9" fill="#FECC00" />
          </>
        ) : (
          <>
            <rect width="18" height="52" fill="#000091" />
            <rect x="17" width="18" height="52" fill="#FFFFFF" />
            <rect x="34" width="18" height="52" fill="#E1000F" />
          </>
        )}
      </svg>
    </span>
  );
}

export const COURSE_NAME: Record<Course, string> = { sv: 'SvenskaCore', fr: 'FranceCore' };

// Petites courbes de mélodie des pochettes, une par album (purement décoratives)
const COVER_CURVES = [
  'M4 22c8 0 10-14 18-14s10 12 18 12 10-16 18-16 8 10 14 10',
  'M4 18c8 0 12-12 20-12s8 16 18 16 10-14 18-14 8 6 12 6',
  'M4 20c10 0 12-16 22-16s8 18 20 18 8-10 14-10 6 4 12 4',
  'M4 16c6 0 10-10 18-10s10 18 20 18 12-18 20-18 6 8 10 8',
];

export function AlbumCover({ n, size = 76, dim = false }: { n: number; size?: number; dim?: boolean }) {
  return (
    <span
      aria-hidden
      className={`relative shrink-0 overflow-hidden ${dim ? 'bg-surface-2 text-muted' : 'bg-cover text-white'}`}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.24) }}
    >
      <span className="absolute left-[13%] top-[9%] font-display font-extrabold" style={{ fontSize: size * 0.34 }}>
        {String(n).padStart(2, '0')}
      </span>
      <svg className="absolute left-0 bottom-[10%]" width={size} height={size * 0.37} viewBox="0 0 76 28" fill="none">
        <path
          d={COVER_CURVES[(n - 1) % COVER_CURVES.length]}
          stroke={dim ? 'var(--faint)' : 'var(--gold)'}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** Égaliseur de la piste en cours */
export function Equalizer({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-flex items-end gap-0.5 h-4 ${className}`}>
      {[9, 16, 12].map((h, i) => (
        <span key={i} className="eq-bar w-[3px] rounded-sm bg-accent" style={{ height: h, animationDelay: `${i * 0.18}s` }} />
      ))}
    </span>
  );
}

// Hauteurs fixes des barres : une forme d'onde stylisée, pas un vrai signal audio
const WAVE = [10, 18, 26, 14, 30, 22, 12, 20, 28, 16, 24, 10, 18, 30, 14, 22, 8, 20, 26, 12, 18, 10, 24, 16, 28, 12, 20, 14, 22, 10];

/** Progression de l'unité dessinée comme une forme d'onde, avec le pourcentage à droite */
export function WaveProgress({ value, label }: { value: number; label: string }) {
  const pct = Math.round(value * 100);
  const filled = Math.round(value * WAVE.length);
  return (
    <div className="flex items-center gap-3" role="img" aria-label={label}>
      <div aria-hidden className="flex-1 min-w-0 flex items-center gap-[3px] h-8 overflow-hidden">
        {WAVE.map((h, i) => (
          <span key={i} className={`w-1 shrink-0 rounded-sm ${i < filled ? 'bg-white' : 'bg-strong-dim'}`} style={{ height: h }} />
        ))}
      </div>
      <span aria-hidden className="font-display font-extrabold text-2xl leading-none tabular-nums whitespace-nowrap">
        {pct} %
      </span>
    </div>
  );
}

/** Forme d'onde décorative du mini-lecteur */
/** Onde du lecteur : les barres se remplissent pendant la lecture (progress de 0 à 1, null à l'arrêt) */
export function PlayerWave({ progress = null, className = '' }: { progress?: number | null; className?: string }) {
  const bars = WAVE.slice(0, 22);
  const filled = progress === null ? 0 : Math.ceil(progress * bars.length);
  return (
    <span aria-hidden className={`flex items-center gap-[2px] h-8 overflow-hidden ${className}`}>
      {bars.map((h, i) => (
        <span
          key={i}
          className={`w-[3px] shrink-0 rounded-sm transition-[transform,background-color] duration-150 ${i < filled ? 'bg-accent' : 'bg-line'}`}
          // La barre en cours de lecture grandit un peu : l'onde « bat » avec le son
          style={{ height: Math.max(6, h), transform: progress !== null && i === filled - 1 ? 'scaleY(1.25)' : undefined }}
        />
      ))}
    </span>
  );
}

export function ThemeToggle({ isDark, onToggle, className = '' }: { isDark: boolean; onToggle: () => void; className?: string }) {
  const { t } = useI18n();
  const label = isDark ? t.toLight : t.toDark;
  return (
    <button
      onClick={onToggle}
      aria-label={label}
      title={label}
      className={`grid place-items-center w-11 h-11 rounded-full bg-surface text-ink hover:bg-surface-2 transition cursor-pointer ${className}`}
    >
      {isDark ? <Sun className="w-5 h-5" aria-hidden /> : <Moon className="w-5 h-5" aria-hidden />}
    </button>
  );
}

const LANG_NAME: Record<Lang, string> = { fr: 'Français', en: 'English', sv: 'Svenska' };

/** Panneau de choix du cours, de la langue de l'interface et du thème */
export function CourseSheet({
  onClose,
  onPickCourse,
  theme,
  onTheme,
}: {
  onClose: () => void;
  onPickCourse: (c: Course) => void;
  theme: ThemeChoice;
  onTheme: (c: ThemeChoice) => void;
}) {
  const { t, course, lang, setLang } = useI18n();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panel.current?.querySelector<HTMLElement>('button')?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const courseBtn = (c: Course, desc: string) => (
    <button
      key={c}
      onClick={() => onPickCourse(c)}
      aria-pressed={course === c}
      className={`w-full min-h-[76px] flex items-center gap-3.5 p-3 rounded-2xl text-left border-[3px] transition cursor-pointer ${
        course === c ? 'bg-accent-soft border-accent' : 'bg-bg border-transparent hover:bg-surface-2'
      }`}
    >
      <Flag course={c} size={52} />
      <span className="min-w-0">
        <span className="block font-bold text-ink">{COURSE_NAME[c]}</span>
        <span className="block text-sm text-muted">{desc}</span>
      </span>
    </button>
  );

  const seg = <T extends string>(items: { id: T; label: string; lang?: string }[], value: T, set: (v: T) => void, label: string) => (
    <div role="group" aria-label={label} className="grid gap-1 p-1 rounded-2xl bg-bg" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => set(it.id)}
          aria-pressed={value === it.id}
          lang={it.lang}
          className={`h-11 rounded-xl text-sm transition cursor-pointer ${
            value === it.id ? 'bg-surface text-ink font-bold shadow-card' : 'text-muted font-semibold hover:text-ink'
          }`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-30 flex items-end md:items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="course-sheet-title">
      <button aria-label={t.close} onClick={onClose} className="absolute inset-0 bg-[#0d1220]/50 cursor-default" tabIndex={-1} />
      <div
        ref={panel}
        className="relative w-full md:max-w-md bg-surface rounded-t-[32px] md:rounded-[32px] p-4 pt-3 md:p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] space-y-5"
      >
        <div aria-hidden className="mx-auto w-11 h-1.5 rounded-full bg-surface-2 md:hidden" />
        <div className="flex items-center justify-between gap-3">
          <h2 id="course-sheet-title" className="font-display text-2xl font-extrabold tracking-tight text-ink px-1">
            {t.courseTitle}
          </h2>
          <button onClick={onClose} aria-label={t.close} className="grid place-items-center w-11 h-11 rounded-full bg-bg text-ink hover:bg-surface-2 cursor-pointer">
            <X className="w-5 h-5" aria-hidden />
          </button>
        </div>
        <div className="space-y-2">
          {courseBtn('sv', t.courseSvDesc)}
          {courseBtn('fr', t.courseFrDesc)}
          <p className="px-1 text-sm text-muted">{t.courseOwnProgress}</p>
        </div>
        <div className="space-y-2">
          <h3 className="px-1 text-sm font-bold text-ink">{t.interfaceLang}</h3>
          {seg(
            COURSE_LANGS[course].map((l) => ({ id: l, label: LANG_NAME[l], lang: l })),
            lang,
            setLang,
            t.interfaceLang
          )}
        </div>
        <div className="space-y-2">
          <h3 className="px-1 text-sm font-bold text-ink">{t.display}</h3>
          {seg<ThemeChoice>(
            [
              { id: 'light', label: t.themeLight },
              { id: 'dark', label: t.themeDark },
              { id: 'system', label: t.themeSystem },
            ],
            theme,
            onTheme,
            t.display
          )}
        </div>
      </div>
    </div>
  );
}
