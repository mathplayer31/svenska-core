-- SvenskaCore : schéma du projet Supabase Cloud (comptes + progression synchronisée), issue #8.
-- À coller une seule fois dans Supabase Cloud > SQL Editor. Appliqué aussi à la base locale pour les tests.
-- Le contenu (cartes, decks, sections) n'est PAS en ligne : il est embarqué dans l'app (src/content.json).
-- Seule la progression de chaque utilisateur est stockée ici, et chacun ne voit que la sienne (RLS).

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

-- Accès API explicite : nécessaire si « Grant API access to new tables automatically » est décoché
grant select, insert, update, delete on public.progress_cards, public.progress_sections to authenticated;

-- Chaque utilisateur connecté ne lit et n'écrit que ses propres lignes. Les visiteurs anonymes n'ont aucun accès.
drop policy if exists "progression personnelle" on public.progress_cards;
create policy "progression personnelle" on public.progress_cards
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "progression personnelle" on public.progress_sections;
create policy "progression personnelle" on public.progress_sections
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
