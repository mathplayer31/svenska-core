// Vérifie les règles d'XP, de streak et de récompenses (issue #15).
// Lancer : node --experimental-strip-types scripts/check-xp.ts
import assert from 'node:assert/strict';
import { XP, PSEUDO_RE, addDays, dayKey, periodStarts, rewardsFor, streaks } from '../src/xp.ts';

assert.deepEqual(XP, { new: 10, ok: 5, miss: 1, session: 20 });

// Jour local, et calcul de dates sans effet du changement d'heure ni des fins de mois
assert.equal(dayKey(new Date(2026, 0, 5, 23, 59)), '2026-01-05');
assert.equal(addDays('2026-03-01', -1), '2026-02-28');
assert.equal(addDays('2026-10-25', 1), '2026-10-26');
assert.equal(addDays('2026-12-31', 1), '2027-01-01');

// Streak : la série finit aujourd'hui, ou hier tant qu'aujourd'hui n'est pas validé
const today = '2026-11-21';
assert.deepEqual(streaks([], today), { current: 0, best: 0 });
assert.deepEqual(streaks(['2026-11-19', '2026-11-20', '2026-11-21'], today), { current: 3, best: 3 });
assert.deepEqual(streaks(['2026-11-19', '2026-11-20'], today), { current: 2, best: 2 });
// Un jour manqué casse la série, le record reste
assert.deepEqual(streaks(['2026-11-10', '2026-11-11', '2026-11-12', '2026-11-13', '2026-11-19'], today), { current: 0, best: 4 });
// Doublons et ordre quelconque sans effet
assert.deepEqual(streaks(['2026-11-21', '2026-11-20', '2026-11-21'], today), { current: 2, best: 2 });
// Série à cheval sur deux mois
assert.deepEqual(streaks(['2026-10-31', '2026-11-01'], '2026-11-01'), { current: 2, best: 2 });

// Récompenses aux paliers 7, 30, 100, 365
assert.deepEqual(rewardsFor(6), []);
assert.deepEqual(rewardsFor(7), [7]);
assert.deepEqual(rewardsFor(100), [7, 30, 100]);
assert.deepEqual(rewardsFor(400), [7, 30, 100, 365]);

// Semaine du lundi 0 h (heure locale), mois du 1er
const { week, month } = periodStarts(new Date(2026, 10, 22, 15)); // dimanche 22 nov 2026
assert.equal(dayKey(week), '2026-11-16');
assert.equal(week.getHours(), 0);
assert.equal(dayKey(month), '2026-11-01');
assert.equal(dayKey(periodStarts(new Date(2026, 10, 16, 8)).week), '2026-11-16'); // un lundi

// Pseudo : longueur et caractères contrôlés
for (const ok of ['Anna', 'sven_42', 'abc', 'a'.repeat(20)]) assert.ok(PSEUDO_RE.test(ok), ok);
for (const bad of ['ab', 'a'.repeat(21), 'Åsa', 'jean pierre', 'x<y>', '']) assert.ok(!PSEUDO_RE.test(bad), bad);

console.log('check-xp : OK');
