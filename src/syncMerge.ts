// Règles de fusion de la progression entre l'appareil et le compte (issue #8). Sans dépendance,
// pour être testées seules : node --experimental-strip-types scripts/check-sync.ts
type Row = Record<string, any>;

const time = (iso: string | null | undefined) => (iso ? new Date(iso).getTime() : -Infinity);

/** Carte : la révision la plus récente gagne ; à égalité, la version du compte (rien à renvoyer). */
export function mergeCard(local: Row | undefined, cloud: Row | undefined): Row | undefined {
  if (!local) return cloud;
  if (!cloud) return local;
  return time(cloud.last_review) >= time(local.last_review) ? cloud : local;
}

/** Test de section : meilleur score, validé s'il l'a été sur un appareil, tentatives max, dernière date. */
export function mergeSection(local: Row | undefined, cloud: Row | undefined): Row | undefined {
  if (!local || !cloud) return local ?? cloud;
  return {
    section_id: local.section_id,
    best_score: Math.max(local.best_score ?? 0, cloud.best_score ?? 0),
    passed: Boolean(local.passed || cloud.passed),
    attempts: Math.max(local.attempts ?? 0, cloud.attempts ?? 0),
    last_attempt: time(cloud.last_attempt) >= time(local.last_attempt) ? cloud.last_attempt : local.last_attempt,
  };
}

/** Égalité indépendante de l'ordre des clés, des champs à null / absents et de l'ancien champ user_id. */
export function sameRow(a: Row | undefined, b: Row | undefined) {
  const canon = (o: Row | undefined) =>
    JSON.stringify(
      Object.entries(o ?? {})
        .filter(([k, v]) => k !== 'user_id' && v !== null && v !== undefined)
        .sort(([x], [y]) => x.localeCompare(y))
    );
  return canon(a) === canon(b);
}

/** Date de la base (format Postgres) remise au format de l'appareil (toISOString). */
export const isoOrNull = (v: string | null | undefined) => (v ? new Date(v).toISOString() : null);
