-- SvenskaCore : deux cours dans la même base (issue #9). Appliquée le 18/11/2026.
-- sv = apprendre le suédois, fr = apprendre le français. Ajoute une colonne, ne supprime rien.
-- Ensuite : npm run content.
alter table public.decks add column if not exists course text not null default 'sv';
alter table public.sections add column if not exists course text not null default 'sv';
