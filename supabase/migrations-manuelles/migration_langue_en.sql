-- SvenskaCore: English content (issue #1, FR / EN switch). Applied on 2026-11-18.
-- Paste into Supabase Studio > SQL Editor. Adds columns, deletes nothing.
-- Next: npm run content (fills the columns from content/a1/en.mjs).

-- Cards: instruction in English. The English translation goes into english_translation
-- (which held the French until now, now in french_translation),
-- and the English gloss into gloss: [{"sv":"jag","fr":"je","en":"I"}, ...]
alter table public.cards add column if not exists prompt_en text;

-- English titles and descriptions
alter table public.decks add column if not exists title_en text;
alter table public.sections add column if not exists title_en text;
alter table public.sections add column if not exists description_en text;
