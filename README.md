# SvenskaCore

App d'apprentissage du suédois (A1) pour francophones : cartes audio avec répétition espacée FSRS, parcours thématique en sections et unités, exercices interactifs et test de fin de section. Cible : PC (web) et Android (Capacitor).

## Stack
- React 19 + TypeScript + Vite + Tailwind CSS v4
- `ts-fsrs` pour la répétition espacée
- Supabase local (Docker) pour le contenu et la progression en mode web
- `edge-tts` (`sv-SE-SofieNeural`) pour l'audio
- Capacitor pour l'APK Android

## Organisation
```
content/            source de vérité du contenu (A1 à B2)
  sections.mjs      sections du parcours
  helpers.mjs       écriture compacte des cartes (vocab, phrase, cloze, unitDeck)
  a1/               foundations.mjs (phonétique, vocab), grammar.mjs, unit01 à unit07,
                    en.mjs (anglais A1), notes-en.mjs
  a2/ b1/ b2/       grammar.mjs, unités du niveau, notes-en.mjs
scripts/
  sync-content.mjs  synchro base + MP3 + export src/content.json (npm run content)
  build-android.mjs APK adapté à la charge du PC (npm run apk)
src/                application React
docs/               PROGRAMME.md (programme A1 à B2), HANDOFF.md (décisions et reste à faire)
supabase/           schema.sql, migrations-manuelles/
```

## Démarrer (web)
```bash
npm install
supabase start                 # Supabase local (Docker)
# Base neuve : coller supabase/schema.sql dans Studio > SQL Editor (http://127.0.0.1:54323)
python -m pip install edge-tts
npm run content   # sections, decks, cartes + MP3 dans public/audio
npm run dev
```

`.env.local` (non versionné) :
```
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=<clé anon affichée par `supabase status`>
```

## Suivi du projet
Décisions, schéma et reste à faire : [docs/HANDOFF.md](docs/HANDOFF.md).
