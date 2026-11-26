-- SvenskaCore: grammar notes and pronunciation hints in English (issue #5). Applied on 2026-11-19.
-- Paste into Supabase Studio > SQL Editor. Adds columns, deletes nothing.
-- Next: npm run content (fills the columns from the content/*/notes-en.mjs files).
alter table public.cards add column if not exists explanation_en text;
alter table public.cards add column if not exists ipa_en text;
