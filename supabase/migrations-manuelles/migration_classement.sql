-- SvenskaCore: XP, streak and leaderboard between accounts (issue #15).
-- Paste once into Supabase Cloud > SQL Editor, after supabase/cloud-schema.sql. Running it again changes nothing.
--
-- profiles  : the chosen username (no username, no row, so not on the leaderboard).
-- xp_events : one row per answer or finished session. The id is created on the device:
--             a send repeated after a network drop does not create a duplicate.
-- leaderboard() : the only way into other accounts' data; it only returns
--             username, XP, streak and best (rewards are derived from the best).

create table if not exists public.profiles (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  pseudo text not null check (pseudo ~ '^[A-Za-z0-9_]{3,20}$'),
  updated_at timestamptz not null default now()
);
-- Case-insensitive unique: "Anna" and "anna" cannot coexist
create unique index if not exists profiles_pseudo_unique on public.profiles (lower(pseudo));

create table if not exists public.xp_events (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id text not null check (length(id) between 8 and 64),
  -- new: new card (10), ok: review or exercise passed (5), miss: mistake (1), session: finished session (20)
  kind text not null check (kind in ('new', 'ok', 'miss', 'session')),
  at timestamptz not null,
  -- device local day at the time of the event: basis of the streak
  day date not null,
  primary key (user_id, id)
);
create index if not exists xp_events_at on public.xp_events (at);
create index if not exists xp_events_sessions on public.xp_events (user_id, day) where kind = 'session';

alter table public.profiles enable row level security;
alter table public.xp_events enable row level security;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert on public.xp_events to authenticated;

-- Everyone only reads and writes their own rows; other accounts go through leaderboard()
drop policy if exists "profil personnel" on public.profiles;
create policy "profil personnel" on public.profiles
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "xp personnelle lecture" on public.xp_events;
create policy "xp personnelle lecture" on public.xp_events
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "xp personnelle ajout" on public.xp_events;
create policy "xp personnelle ajout" on public.xp_events
  for insert to authenticated with check (auth.uid() = user_id);

-- Leaderboard: accounts with a username, XP since the start of the week and of the month (local bounds
-- computed by the device), current streak (run ending today or yesterday) and best.
create or replace function public.leaderboard(since_week timestamptz, since_month timestamptz, today date)
returns table (pseudo text, xp_week int, xp_month int, streak int, best_streak int, is_me boolean)
language sql stable security definer set search_path = '' as $$
  with points as (
    select user_id,
      sum(case kind when 'new' then 10 when 'ok' then 5 when 'miss' then 1 else 20 end) filter (where at >= since_week) as w,
      sum(case kind when 'new' then 10 when 'ok' then 5 when 'miss' then 1 else 20 end) filter (where at >= since_month) as m
    from public.xp_events
    where at >= least(since_week, since_month)
    group by user_id
  ), days as (
    select distinct user_id, day from public.xp_events where kind = 'session'
  ), islands as (
    -- consecutive days: day minus its rank is constant over a run
    select user_id, count(*) as len, max(day) as last_day
    from (select user_id, day, day - (row_number() over (partition by user_id order by day))::int as grp from days) d
    group by user_id, grp
  ), runs as (
    select user_id, max(len) as best, coalesce(max(len) filter (where last_day >= today - 1), 0) as cur
    from islands group by user_id
  )
  select p.pseudo, coalesce(x.w, 0)::int, coalesce(x.m, 0)::int, coalesce(r.cur, 0)::int, coalesce(r.best, 0)::int,
    p.user_id = auth.uid()
  from public.profiles p
  left join points x on x.user_id = p.user_id
  left join runs r on r.user_id = p.user_id
$$;

revoke execute on function public.leaderboard(timestamptz, timestamptz, date) from public, anon;
grant execute on function public.leaderboard(timestamptz, timestamptz, date) to authenticated;
