-- SvenskaCore : XP, streak et classement entre comptes (issue #15).
-- À coller une fois dans Supabase Cloud > SQL Editor, après supabase/cloud-schema.sql. Relancer ne change rien.
--
-- profiles  : le pseudo choisi (sans pseudo, pas de ligne, donc absent du classement).
-- xp_events : une ligne par réponse ou séance terminée. L'identifiant est créé sur l'appareil :
--             un envoi répété après une coupure réseau ne crée pas de doublon.
-- leaderboard() : seule porte d'accès aux données des autres comptes ; elle ne renvoie que
--             pseudo, XP, streak et record (les récompenses se déduisent du record).

create table if not exists public.profiles (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  pseudo text not null check (pseudo ~ '^[A-Za-z0-9_]{3,20}$'),
  updated_at timestamptz not null default now()
);
-- Unique sans tenir compte de la casse : « Anna » et « anna » ne peuvent pas coexister
create unique index if not exists profiles_pseudo_unique on public.profiles (lower(pseudo));

create table if not exists public.xp_events (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id text not null check (length(id) between 8 and 64),
  -- new : nouvelle carte (10), ok : rappel ou exercice réussi (5), miss : erreur (1), session : séance terminée (20)
  kind text not null check (kind in ('new', 'ok', 'miss', 'session')),
  at timestamptz not null,
  -- jour local de l'appareil au moment de l'événement : base du streak
  day date not null,
  primary key (user_id, id)
);
create index if not exists xp_events_at on public.xp_events (at);
create index if not exists xp_events_sessions on public.xp_events (user_id, day) where kind = 'session';

alter table public.profiles enable row level security;
alter table public.xp_events enable row level security;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert on public.xp_events to authenticated;

-- Chacun ne lit et n'écrit que ses propres lignes ; les autres comptes passent par leaderboard()
drop policy if exists "profil personnel" on public.profiles;
create policy "profil personnel" on public.profiles
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "xp personnelle lecture" on public.xp_events;
create policy "xp personnelle lecture" on public.xp_events
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "xp personnelle ajout" on public.xp_events;
create policy "xp personnelle ajout" on public.xp_events
  for insert to authenticated with check (auth.uid() = user_id);

-- Classement : comptes avec pseudo, XP depuis le début de la semaine et du mois (bornes locales
-- calculées par l'appareil), streak courant (série finie aujourd'hui ou hier) et record.
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
    -- jours consécutifs : day moins son rang est constant sur une série
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
