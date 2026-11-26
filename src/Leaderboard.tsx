// Leaderboard tab (issue #15): the user's streak and XP (on the device, works without an account),
// then the ranking of accounts with a username: XP this week, this month, day streak.
import { useEffect, useState } from 'react';
import { Crown, Flame, Medal, Trophy, type LucideIcon } from 'lucide-react';
import * as data from './dataSource';
import { useI18n } from './i18n';
import { REWARDS, rewardsFor } from './xp';

const BOARDS = [
  { id: 'week', labelKey: 'tabWeek', value: (r: data.BoardRow) => r.xp_week, unit: 'XP' },
  { id: 'month', labelKey: 'tabMonth', value: (r: data.BoardRow) => r.xp_month, unit: 'XP' },
  { id: 'streak', labelKey: 'tabStreak', value: (r: data.BoardRow) => r.streak, unit: null },
] as const;

const REWARD_ICONS: Record<(typeof REWARDS)[number], LucideIcon> = { 7: Flame, 30: Medal, 100: Trophy, 365: Crown };
// shortcut: the whole leaderboard is loaded then cut here; move to an SQL-side limit beyond a few thousand accounts
const TOP = 50;

export default function Leaderboard({ signedIn, onOpenAccount }: { signedIn: boolean; onOpenAccount: () => void }) {
  const { t } = useI18n();
  const [board, setBoard] = useState<(typeof BOARDS)[number]['id']>('week');
  const [rows, setRows] = useState<data.BoardRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const local = data.localStats();

  useEffect(() => {
    if (!signedIn) return;
    data
      .leaderboard()
      .then((r) => (setRows(r), setError(null)))
      .catch((e) => setError(e instanceof Error ? e.message : String(e)));
  }, [signedIn]);

  const spec = BOARDS.find((b) => b.id === board)!;
  const me = rows?.find((r) => r.is_me);
  const ranked = (rows ?? [])
    .filter((r) => spec.value(r) > 0 || r.is_me)
    .sort((a, b) => spec.value(b) - spec.value(a) || b.best_streak - a.best_streak || a.pseudo.localeCompare(b.pseudo));
  const myRank = ranked.findIndex((r) => r.is_me);

  const stats = [
    { label: t.currentStreak, value: t.dayCount(local.current) },
    { label: t.bestStreak, value: t.dayCount(Math.max(local.best, me?.best_streak ?? 0)) },
    { label: t.xpWeek, value: `${me?.xp_week ?? local.week}` },
  ];

  const row = (r: data.BoardRow, rank: number) => (
    <li
      key={r.pseudo}
      aria-current={r.is_me ? 'true' : undefined}
      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl ${r.is_me ? 'bg-accent-soft ring-2 ring-accent' : ''}`}
    >
      <span className="w-7 text-right text-sm font-bold text-muted tabular-nums">{rank + 1}</span>
      <span className={`min-w-0 truncate ${r.is_me ? 'font-bold text-ink' : 'font-semibold text-ink'}`}>
        {r.pseudo}
        {r.is_me && <span className="font-medium text-muted"> ({t.you})</span>}
      </span>
      <span className="flex items-center gap-0.5 text-gold shrink-0">
        {rewardsFor(r.best_streak).map((n) => {
          const Icon = REWARD_ICONS[n];
          return <Icon key={n} className="w-4 h-4" role="img" aria-label={t.rewardLabel(n)} />;
        })}
      </span>
      <span className="ml-auto font-bold text-ink tabular-nums shrink-0">
        {spec.unit ? `${spec.value(r)} ${spec.unit}` : t.dayCount(spec.value(r))}
      </span>
    </li>
  );

  const button = (label: string) => (
    <button
      onClick={onOpenAccount}
      className="mt-4 w-full py-3 rounded-full bg-accent hover:bg-accent-hover text-accent-ink font-semibold transition cursor-pointer"
    >
      {label}
    </button>
  );

  return (
    <div>
      <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-ink">{t.navClassement}</h1>
      <p className="text-muted mt-3 max-w-prose">{t.boardIntro}</p>

      <dl className="mt-6 grid grid-cols-3 gap-2 rounded-[24px] bg-strong text-strong-ink p-4 md:p-5">
        {stats.map((s) => (
          <div key={s.label} className="min-w-0">
            <dt className="text-xs md:text-sm font-semibold text-strong-muted">{s.label}</dt>
            <dd className="font-display text-2xl md:text-3xl font-extrabold tracking-tight mt-1">{s.value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-6 rounded-[24px] bg-surface shadow-card p-4 md:p-5">
        {!signedIn ? (
          <>
            <p className="text-muted">{t.boardSignIn}</p>
            {data.accountsAvailable && button(t.signIn)}
          </>
        ) : (
          <>
            <div role="tablist" aria-label={t.navClassement} className="grid grid-cols-3 gap-1 p-1 rounded-full bg-bg">
              {BOARDS.map((b) => (
                <button
                  key={b.id}
                  role="tab"
                  aria-selected={board === b.id}
                  onClick={() => setBoard(b.id)}
                  className={`h-10 rounded-full text-sm transition cursor-pointer ${
                    board === b.id ? 'bg-surface text-ink font-bold shadow-card' : 'text-muted font-semibold hover:text-ink'
                  }`}
                >
                  {t[b.labelKey]}
                </button>
              ))}
            </div>
            {error && <p className="mt-4 text-sm text-danger">{t.boardError(error)}</p>}
            {rows && !me && (
              <div className="mt-4">
                <p className="text-muted">{t.boardNoPseudo}</p>
                {button(t.choosePseudo)}
              </div>
            )}
            {rows && (
              <ol role="tabpanel" className="mt-3 space-y-1">
                {ranked.length === 0 && <li className="px-3.5 py-2.5 text-muted">{t.boardEmpty}</li>}
                {ranked.slice(0, TOP).map(row)}
                {myRank >= TOP && (
                  <>
                    <li aria-hidden className="text-center text-muted">...</li>
                    {row(ranked[myRank], myRank)}
                  </>
                )}
              </ol>
            )}
          </>
        )}
      </section>
    </div>
  );
}
