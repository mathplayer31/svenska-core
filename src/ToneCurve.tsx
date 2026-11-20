// Courbe de l'accent tonal dessinée au-dessus du mot (issue #10).
// Les données viennent de content/sv/tones.mjs, vérifiées contre l'IPA (scripts/check-tones.mjs).
// Accent 1 : un sommet sur la syllabe accentuée. Accent 2 : sommet, creux, puis 2e sommet.
import { useLayoutEffect, useRef, useState } from 'react';
import { useI18n } from './i18n';

export interface Tone {
  a: 1 | 2;
  /** mot dessiné */
  w: string;
  /** noyaux vocaliques [début, fin) dans le mot */
  v: [number, number][];
  /** syllabe accentuée (index) */
  s: number;
  /** 2e sommet de l'accent 2 (index), null pour l'accent 1 */
  p: number | null;
}

const H = 72;
const HIGH = 14;
const LOW = 56;
const MID = 44;
// La courbe déborde du mot de chaque côté (dans la marge de la carte) : elle monte avant et redescend après
const PAD = 22;

/** Tracé lissé passant par les points (Catmull-Rom converti en courbes de Bézier) */
function smoothPath(pts: { x: number; y: number }[]) {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export function tonePoints(tone: Tone, xs: number[], width: number) {
  const first = xs[0];
  const last = xs[xs.length - 1];
  const pts: { x: number; y: number }[] = [{ x: Math.max(-PAD, first - 30), y: LOW }];
  xs.forEach((x, i) => {
    if (tone.a === 2 && tone.p !== null && i === tone.p) {
      // Creux entre deux sommets voisins ; s'il y a des syllabes entre eux, elles forment déjà le creux
      if (tone.p === tone.s + 1) pts.push({ x: (xs[tone.s] + x) / 2, y: LOW });
      pts.push({ x, y: HIGH + 6 });
    } else if (i === tone.s) {
      pts.push({ x, y: HIGH });
    } else {
      pts.push({ x, y: i < tone.s ? MID : LOW });
    }
  });
  pts.push({ x: Math.min(width + PAD, last + 30), y: LOW + 4 });
  return pts;
}

export default function ToneCurve({ tone, className = '' }: { tone: Tone; className?: string }) {
  const { t } = useI18n();
  const fig = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLParagraphElement>(null);
  const nuclei = useRef<(HTMLSpanElement | null)[]>([]);
  const [geo, setGeo] = useState<{ w: number; xs: number[] } | null>(null);
  const [size, setSize] = useState<number | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const f = fig.current;
      const p = word.current;
      const box = wrap.current?.getBoundingClientRect();
      if (!f || !p || !box || box.width === 0) return;
      // Le mot reste sur une ligne : s'il déborde, la taille baisse jusqu'à tenir (sinon la courbe se décale)
      const avail = f.clientWidth;
      const cur = parseFloat(getComputedStyle(p).fontSize);
      const fit = Math.max(22, Math.min(avail >= 480 ? 64 : 48, Math.floor((cur * avail) / p.scrollWidth)));
      if (p.scrollWidth > avail + 0.5 || fit >= cur + 2) {
        setSize(fit);
        return;
      }
      const xs = tone.v.map((_, i) => {
        const r = nuclei.current[i]?.getBoundingClientRect();
        return r ? r.left - box.left + r.width / 2 : 0;
      });
      setGeo({ w: box.width, xs });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (fig.current) ro.observe(fig.current);
    if (wrap.current) ro.observe(wrap.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [tone, size]);

  // Mot découpé en morceaux : consonnes, puis noyaux mesurés pour placer la courbe
  const parts: { text: string; i: number | null }[] = [];
  let at = 0;
  tone.v.forEach(([a, b], i) => {
    if (a > at) parts.push({ text: tone.w.slice(at, a), i: null });
    parts.push({ text: tone.w.slice(a, b), i });
    at = b;
  });
  if (at < tone.w.length) parts.push({ text: tone.w.slice(at), i: null });

  const peaks = tone.a === 2 && tone.p !== null ? [tone.s, tone.p] : [tone.s];

  return (
    <figure ref={fig} role="img" aria-label={t.toneLabel(tone.w, tone.a)} className={`m-0 ${className}`}>
      <div ref={wrap} className="inline-block" aria-hidden>
        <svg
          width={(geo?.w ?? 0) + 2 * PAD}
          height={H}
          viewBox={`${-PAD} 0 ${(geo?.w ?? 1) + 2 * PAD} ${H}`}
          style={{ marginLeft: -PAD, marginRight: -PAD }}
          className="block overflow-visible"
          fill="none"
        >
          {geo && (
            <>
              <path d={smoothPath(tonePoints(tone, geo.xs, geo.w))} stroke="var(--gold)" strokeWidth={6} strokeLinecap="round" />
              {peaks.map((i, k) => (
                <circle key={i} cx={geo.xs[i]} cy={k === 0 ? HIGH : HIGH + 6} r={k === 0 ? 7 : 6} fill="var(--ink)" />
              ))}
            </>
          )}
        </svg>
        <p
          ref={word}
          style={{ fontSize: size ?? 48 }}
          className="font-display font-extrabold tracking-tight text-ink leading-none whitespace-nowrap"
        >
          {parts.map((part, k) =>
            part.i === null ? (
              <span key={k}>{part.text}</span>
            ) : (
              <span key={k} ref={(el) => { nuclei.current[part.i as number] = el; }}>
                {part.text}
              </span>
            )
          )}
        </p>
      </div>
    </figure>
  );
}
