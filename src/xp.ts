// XP, streak et récompenses (issue #15), sans dépendance : testé par scripts/check-xp.ts.
// Une journée compte dans le streak dès qu'une séance y est terminée, selon l'heure locale de l'appareil.

export type XpKind = 'new' | 'ok' | 'miss' | 'session';

/** Nouvelle carte apprise, rappel ou exercice réussi, erreur, séance terminée (mêmes valeurs dans leaderboard(), migration_classement.sql) */
export const XP: Record<XpKind, number> = { new: 10, ok: 5, miss: 1, session: 20 };

/** Paliers de streak (jours) qui donnent une icône à côté du pseudo */
export const REWARDS = [7, 30, 100, 365] as const;

/** Pseudo : 3 à 20 lettres non accentuées, chiffres ou _ (même règle que la contrainte SQL) */
export const PSEUDO_RE = /^[A-Za-z0-9_]{3,20}$/;

const pad = (n: number) => String(n).padStart(2, '0');

/** Jour local de l'appareil, au format AAAA-MM-JJ */
export const dayKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** Jour décalé de n jours (calcul en UTC pour éviter les changements d'heure) */
export function addDays(day: string, n: number) {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Streak courant (série qui finit aujourd'hui, ou hier si aujourd'hui n'est pas encore validé) et record */
export function streaks(days: Iterable<string>, today: string) {
  const set = new Set(days);
  let best = 0;
  for (const day of set) {
    if (set.has(addDays(day, -1))) continue; // pas le début d'une série
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

/** Paliers atteints par le record */
export const rewardsFor = (best: number) => REWARDS.filter((r) => best >= r);

/** Début de la semaine locale (lundi 0 h) et du mois local, bornes des classements */
export function periodStarts(now: Date) {
  const week = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
  const month = new Date(now.getFullYear(), now.getMonth(), 1);
  return { week, month };
}
