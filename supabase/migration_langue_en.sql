-- SvenskaCore : contenu anglais (issue #1, sélecteur FR / EN). Appliquée le 18/11/2026.
-- À coller dans Supabase Studio > SQL Editor. Ajoute des colonnes, ne supprime rien.
-- Ensuite : node --env-file=.env.local generate-audio.mjs (remplit les colonnes depuis content-en.mjs).

-- Cartes : consigne en anglais. La traduction anglaise va dans english_translation
-- (qui contenait jusqu'ici le français, désormais dans french_translation),
-- et la glose anglaise dans gloss : [{"sv":"jag","fr":"je","en":"I"}, ...]
alter table public.cards add column if not exists prompt_en text;

-- Titres et descriptions en anglais
alter table public.decks add column if not exists title_en text;
alter table public.sections add column if not exists title_en text;
alter table public.sections add column if not exists description_en text;
