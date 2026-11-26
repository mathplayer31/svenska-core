// XP, streak and rewards (issue #15), no dependency: tested by scripts/check-xp.ts.
// A day counts toward the streak as soon as a session is finished on it, in the device's local time.

export type XpKind = 'new' | 'ok' | 'miss' | 'session';

/** New card learned, review or exercise passed, mistake, session finished (same values in leaderboard(), migration_classement.sql) */
export const XP: Record<XpKind, number> = { new: 10, ok: 5, miss: 1, session: 20 };

/** Streak milestones (days) that give an icon next to the username */
export const REWARDS = [7, 30, 100, 365] as const;

/** Username: 3 to 20 unaccented letters, digits or _ (same rule as the SQL constraint) */
export const PSEUDO_RE = /^[A-Za-z0-9_]{3,20}$/;

const pad = (n: number) => String(n).padStart(2, '0');

/** Device local day, as YYYY-MM-DD */
export const dayKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** Day shifted by n days (computed in UTC to avoid DST changes) */
export function addDays(day: string, n: number) {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Current streak (run ending today, or yesterday if today is not validated yet) and best */
export function streaks(days: Iterable<string>, today: string) {
  const set = new Set(days);
  let best = 0;
  for (const day of set) {
    if (set.has(addDays(day, -1))) continue; // not the start of a run
    let len = 1;
    while (set.has(addDays(day, len))) len++;
    best = Math.max(best, len);
  }
  let current = 0;
  let cursor = set.has(today) ? today : addDays(today, -1);
  while (set.has(cursor)) {
    current++;
    cursor = addDays(cursor, -1);
  }
  return { current, best };
}

/** Milestones reached by the best streak */
export const rewardsFor = (best: number) => REWARDS.filter((r) => best >= r);

/** Start of the local week (Monday 0:00) and local month, leaderboard bounds */
export function periodStarts(now: Date) {
  const week = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
  const month = new Date(now.getFullYear(), now.getMonth(), 1);
  return { week, month };
}
