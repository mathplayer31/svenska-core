-- SvenskaCore : notes de grammaire et indications de prononciation en anglais (issue #5). Appliquée le 19/11/2026.
-- À coller dans Supabase Studio > SQL Editor. Ajoute des colonnes, ne supprime rien.
-- Ensuite : node --env-file=.env.local generate-audio.mjs (remplit les colonnes depuis les fichiers notes-en-*.mjs).
alter table public.cards add column if not exists explanation_en text;
alter table public.cards add column if not exists ipa_en text;
