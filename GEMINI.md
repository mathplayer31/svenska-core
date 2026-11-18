# SvenskaCore : Project Context & Architecture

## Goal
Build a local-first, Mjølnir-style Swedish learning app (Phonetics/Vowels, Grammar/V2 word order, en/ett Vocabulary) targeting **PC Web** and **Android APK**.

## Tech Stack
- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4 (`@tailwindcss/vite`)
- **Mobile Wrapper:** Capacitor (`@capacitor/core`, `@capacitor/android`)
- **SRS Algorithm:** `ts-fsrs` (Free Spaced Repetition Scheduler)
- **Backend & DB:** Local Supabase (Docker) -> PostgreSQL + Supabase Storage (`card-audio` public bucket)
- **Audio Pipeline:** `edge-tts` (`sv-SE-SofieNeural`) via `generate-audio.mjs`

## Local Environment
- **Supabase API URL:** `http://127.0.0.1:54321`
- **Supabase Studio:** `http://127.0.0.1:54323`
- **Postgres URL:** `postgresql://postgres:postgres@127.0.0.1:54322/postgres`
- **Env File:** `.env.local` contains `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## Database Schema (Already Seeded in `public`)
- `decks`: `id`, `slug`, `title`, `category` ('phonetics' | 'grammar' | 'vocabulary'), `cefr_level`, `sort_order`
- `cards`: `id`, `deck_id`, `card_type` ('minimal_pair' | 'vocab' | 'cloze_grammar' | 'listening'), `swedish_prompt`, `swedish_target`, `english_translation`, `ipa_transcription`, `pitch_accent`, `audio_url`, `explanation_md`
- `user_card_progress`: `user_id`, `card_id`, `state`, `due`, `stability`, `difficulty`, `elapsed_days`, `scheduled_days`, `reps`, `lapses`, `last_review`

## Current Status & Next Steps
1. React frontend (`src/App.tsx`) is connected to local PostgreSQL and saving FSRS reviews.
2. Next: Run `generate-audio.mjs` with `edge-tts` to populate `card-audio` bucket with `.mp3` files.
3. Next: Expand A1 curriculum decks, add offline IndexedDB caching (`dexie`), and compile Android APK via Capacitor.
