-- SvenskaCore: Supabase Cloud project schema (accounts + synced progress), issue #8.
-- Paste once into Supabase Cloud > SQL Editor. Also applied to the local database for tests.
-- The content (cards, decks, sections) is NOT online: it is bundled in the app (src/content.json).
-- Only each user's progress is stored here, and everyone only sees their own (RLS).
-- Next: migrations-manuelles/migration_classement.sql (XP, streak and leaderboard, issue #15).

create table if not exists public.progress_cards (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  card_slug text not null,
  state int2 not null default 0,
  due timestamptz not null,
  stability float8 not null default 0,
  difficulty float8 not null default 0,
  elapsed_days int4 not null default 0,
  scheduled_days int4 not null default 0,
  learning_steps int4 not null default 0,
  reps int4 not null default 0,
  lapses int4 not null default 0,
  last_review timestamptz,
  primary key (user_id, card_slug)
);

create table if not exists public.progress_sections (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  section_slug text not null,
  best_score int not null default 0,
  passed boolean not null default false,
  attempts int not null default 0,
  last_attempt timestamptz,
  primary key (user_id, section_slug)
);

alter table public.progress_cards enable row level security;
alter table public.progress_sections enable row level security;

-- Explicit API access: needed if "Grant API access to new tables automatically" is unchecked
grant select, insert, update, delete on public.progress_cards, public.progress_sections to authenticated;

-- Each signed-in user only reads and writes their own rows. Anonymous visitors have no access.
drop policy if exists "progression personnelle" on public.progress_cards;
create policy "progression personnelle" on public.progress_cards
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "progression personnelle" on public.progress_sections;
create policy "progression personnelle" on public.progress_sections
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
