// Checks the XP, streak and reward rules (issue #15).
// Run: node --experimental-strip-types scripts/check-xp.ts
import assert from 'node:assert/strict';
import { XP, PSEUDO_RE, addDays, dayKey, periodStarts, rewardsFor, streaks } from '../src/xp.ts';

assert.deepEqual(XP, { new: 10, ok: 5, miss: 1, session: 20 });

// Local day, and date maths unaffected by DST changes or month ends
assert.equal(dayKey(new Date(2026, 0, 5, 23, 59)), '2026-01-05');
assert.equal(addDays('2026-03-01', -1), '2026-02-28');
assert.equal(addDays('2026-10-25', 1), '2026-10-26');
assert.equal(addDays('2026-12-31', 1), '2027-01-01');

// Streak: the run ends today, or yesterday as long as today is not validated
const today = '2026-11-21';
assert.deepEqual(streaks([], today), { current: 0, best: 0 });
assert.deepEqual(streaks(['2026-11-19', '2026-11-20', '2026-11-21'], today), { current: 3, best: 3 });
assert.deepEqual(streaks(['2026-11-19', '2026-11-20'], today), { current: 2, best: 2 });
// A missed day breaks the run, the best stays
assert.deepEqual(streaks(['2026-11-10', '2026-11-11', '2026-11-12', '2026-11-13', '2026-11-19'], today), { current: 0, best: 4 });
// Duplicates and any order have no effect
assert.deepEqual(streaks(['2026-11-21', '2026-11-20', '2026-11-21'], today), { current: 2, best: 2 });
// Run spanning two months
assert.deepEqual(streaks(['2026-10-31', '2026-11-01'], '2026-11-01'), { current: 2, best: 2 });

// Rewards at the 7, 30, 100, 365 milestones
assert.deepEqual(rewardsFor(6), []);
assert.deepEqual(rewardsFor(7), [7]);
assert.deepEqual(rewardsFor(100), [7, 30, 100]);
assert.deepEqual(rewardsFor(400), [7, 30, 100, 365]);

// Week from Monday 0:00 (local time), month from the 1st
const { week, month } = periodStarts(new Date(2026, 10, 22, 15)); // Sunday 22 Nov 2026
assert.equal(dayKey(week), '2026-11-16');
assert.equal(week.getHours(), 0);
assert.equal(dayKey(month), '2026-11-01');
assert.equal(dayKey(periodStarts(new Date(2026, 10, 16, 8)).week), '2026-11-16'); // a Monday

// Username: length and characters checked
for (const ok of ['Anna', 'sven_42', 'abc', 'a'.repeat(20)]) assert.ok(PSEUDO_RE.test(ok), ok);
for (const bad of ['ab', 'a'.repeat(21), 'Åsa', 'jean pierre', 'x<y>', '']) assert.ok(!PSEUDO_RE.test(bad), bad);

console.log('check-xp: OK');
