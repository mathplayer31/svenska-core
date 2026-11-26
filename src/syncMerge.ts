// Rules for merging progress between the device and the account (issue #8). No dependency,
// so they can be tested alone: node --experimental-strip-types scripts/check-sync.ts
type Row = Record<string, any>;

const time = (iso: string | null | undefined) => (iso ? new Date(iso).getTime() : -Infinity);

/** Card: the most recent review wins; on a tie, the account's version (nothing to send back). */
export function mergeCard(local: Row | undefined, cloud: Row | undefined): Row | undefined {
  if (!local) return cloud;
  if (!cloud) return local;
  return time(cloud.last_review) >= time(local.last_review) ? cloud : local;
}

/** Section test: best score, passed if passed on any device, max attempts, latest date. */
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

/** Equality regardless of key order, null / missing fields and the old user_id field. */
export function sameRow(a: Row | undefined, b: Row | undefined) {
  const canon = (o: Row | undefined) =>
    JSON.stringify(
      Object.entries(o ?? {})
        .filter(([k, v]) => k !== 'user_id' && v !== null && v !== undefined)
        .sort(([x], [y]) => x.localeCompare(y))
    );
  return canon(a) === canon(b);
}

/** Database date (Postgres format) converted to the device format (toISOString). */
export const isoOrNull = (v: string | null | undefined) => (v ? new Date(v).toISOString() : null);
