-- SvenskaCore: two courses in the same database (issue #9). Applied on 2026-11-18.
-- sv = learn Swedish, fr = learn French. Adds a column, deletes nothing.
-- Ensuite : npm run content.
alter table public.decks add column if not exists course text not null default 'sv';
alter table public.sections add column if not exists course text not null default 'sv';
