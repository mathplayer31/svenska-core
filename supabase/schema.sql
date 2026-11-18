-- SvenskaCore : schéma complet de la base (public), exporté de Supabase local le 18/11/2026.
-- Pour une base neuve : coller dans Supabase Studio > SQL Editor, puis lancer
--   npm run content   pour remplir sections, decks et cartes.
-- RLS : policies de dev permissives, à restreindre avant toute mise en ligne.

CREATE TABLE public.cards (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    deck_id uuid NOT NULL,
    card_type text NOT NULL,
    swedish_prompt text NOT NULL,
    swedish_target text NOT NULL,
    english_translation text NOT NULL,
    ipa_transcription text,
    pitch_accent text,
    audio_url text,
    explanation_md text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    slug text,
    gloss jsonb,
    french_translation text,
    prompt_en text,
    explanation_en text,
    ipa_en text,
    CONSTRAINT cards_card_type_check CHECK ((card_type = ANY (ARRAY['minimal_pair'::text, 'vocab'::text, 'cloze_grammar'::text, 'listening'::text, 'phrase'::text])))
);

CREATE TABLE public.decks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    category text NOT NULL,
    cefr_level text DEFAULT 'A1'::text NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    track text DEFAULT 'foundation'::text NOT NULL,
    unit_number integer,
    prerequisite_deck_id uuid,
    section_id uuid,
    title_en text,
    CONSTRAINT decks_category_check CHECK ((category = ANY (ARRAY['phonetics'::text, 'grammar'::text, 'vocabulary'::text]))),
    CONSTRAINT decks_track_check CHECK ((track = ANY (ARRAY['foundation'::text, 'thematic'::text])))
);

CREATE TABLE public.sections (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text,
    sort_order integer DEFAULT 0 NOT NULL,
    pass_score integer DEFAULT 80 NOT NULL,
    title_en text,
    description_en text,
    CONSTRAINT sections_pass_score_check CHECK (((pass_score >= 1) AND (pass_score <= 100)))
);

CREATE TABLE public.user_card_progress (
    user_id uuid NOT NULL,
    card_id uuid NOT NULL,
    state smallint DEFAULT 0 NOT NULL,
    due timestamp with time zone DEFAULT now() NOT NULL,
    stability double precision DEFAULT 0 NOT NULL,
    difficulty double precision DEFAULT 0 NOT NULL,
    elapsed_days integer DEFAULT 0 NOT NULL,
    scheduled_days integer DEFAULT 0 NOT NULL,
    reps integer DEFAULT 0 NOT NULL,
    lapses integer DEFAULT 0 NOT NULL,
    last_review timestamp with time zone
);

CREATE TABLE public.user_section_progress (
    user_id uuid NOT NULL,
    section_id uuid NOT NULL,
    best_score integer DEFAULT 0 NOT NULL,
    passed boolean DEFAULT false NOT NULL,
    attempts integer DEFAULT 0 NOT NULL,
    last_attempt timestamp with time zone
);

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_slug_key UNIQUE (slug);

ALTER TABLE ONLY public.decks
    ADD CONSTRAINT decks_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.decks
    ADD CONSTRAINT decks_slug_key UNIQUE (slug);

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_slug_key UNIQUE (slug);

ALTER TABLE ONLY public.user_card_progress
    ADD CONSTRAINT user_card_progress_pkey PRIMARY KEY (user_id, card_id);

ALTER TABLE ONLY public.user_section_progress
    ADD CONSTRAINT user_section_progress_pkey PRIMARY KEY (user_id, section_id);

CREATE INDEX decks_section_idx ON public.decks USING btree (section_id);

CREATE INDEX decks_track_unit_idx ON public.decks USING btree (track, unit_number, sort_order);

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_deck_id_fkey FOREIGN KEY (deck_id) REFERENCES public.decks(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.decks
    ADD CONSTRAINT decks_prerequisite_deck_id_fkey FOREIGN KEY (prerequisite_deck_id) REFERENCES public.decks(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.decks
    ADD CONSTRAINT decks_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.sections(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.user_card_progress
    ADD CONSTRAINT user_card_progress_card_id_fkey FOREIGN KEY (card_id) REFERENCES public.cards(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.user_section_progress
    ADD CONSTRAINT user_section_progress_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.sections(id) ON DELETE CASCADE;

CREATE POLICY "Local dev access cards" ON public.cards USING (true) WITH CHECK (true);

CREATE POLICY "Local dev access decks" ON public.decks USING (true) WITH CHECK (true);

CREATE POLICY "Local dev access progress" ON public.user_card_progress USING (true) WITH CHECK (true);

CREATE POLICY "Local dev access section progress" ON public.user_section_progress USING (true) WITH CHECK (true);

CREATE POLICY "Local dev access sections" ON public.sections USING (true) WITH CHECK (true);

ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.decks ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.user_card_progress ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.user_section_progress ENABLE ROW LEVEL SECURITY;

