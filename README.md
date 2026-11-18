# SvenskaCore

App d'apprentissage du suédois (A1) pour francophones : cartes audio avec répétition espacée FSRS, parcours thématique en sections et unités, exercices interactifs et test de fin de section. Cible : PC (web) et Android (Capacitor).

## Stack
- React 19 + TypeScript + Vite + Tailwind CSS v4
- `ts-fsrs` pour la répétition espacée
- Supabase local (Docker) pour le contenu et la progression en mode web
- `edge-tts` (`sv-SE-SofieNeural`) pour l'audio
- Capacitor pour l'APK Android

## Contenu
Les fichiers `*-data.mjs` sont la **source de vérité** du contenu :
- `sections-data.mjs` : sections du parcours
- `unit1-data.mjs` à `unit7-data.mjs` : unités thématiques (mots + phrases glosées)
- `grammar-data.mjs` : fondation Grammaire & Syntaxe V2
- `generate-audio.mjs` : fondations phonétique et vocab/genres, puis synchronisation de tout le contenu

## Démarrer (web)
```bash
npm install
supabase start                 # Supabase local (Docker)
# Base neuve : coller supabase/schema.sql dans Studio > SQL Editor (http://127.0.0.1:54323)
python -m pip install edge-tts
node --env-file=.env.local generate-audio.mjs   # sections, decks, cartes + MP3 dans public/audio
npm run dev
```

`.env.local` (non versionné) :
```
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=<clé anon affichée par `supabase status`>
```

## Suivi du projet
Décisions, schéma et reste à faire : [SvenskaCore_handoff.md](SvenskaCore_handoff.md).
