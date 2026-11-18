# SvenskaCore

App d'apprentissage des langues avec deux cours : le suédois pour francophones (SvenskaCore) et le français pour suédophones et anglophones (FranceCore). Cartes audio avec répétition espacée FSRS, parcours thématique en sections et unités, exercices interactifs et test de fin de section. Cible : PC (web) et Android (Capacitor).

## Stack
- React 19 + TypeScript + Vite + Tailwind CSS v4
- `ts-fsrs` pour la répétition espacée
- Supabase local (Docker) pour le pipeline de contenu, Supabase Cloud pour les comptes (synchro de progression)
- `edge-tts` pour l'audio (`sv-SE-SofieNeural` en suédois, `fr-FR-DeniseNeural` en français)
- Capacitor pour l'APK Android

## Organisation
```
content/            source de vérité du contenu
  sv/               SvenskaCore, apprendre le suédois (A1 à B2)
    sections.mjs    sections du parcours
    helpers.mjs     écriture compacte des cartes (vocab, phrase, cloze, unitDeck)
    a1/             foundations.mjs (phonétique, vocab), grammar.mjs, unit01 à unit07,
                    en.mjs (anglais A1), notes-en.mjs
    a2/ b1/ b2/     grammar.mjs, unités du niveau, notes-en.mjs
  fr/               FranceCore, apprendre le français en suédois ou en anglais (A1 à B2)
    sections.mjs, helpers.mjs, index.mjs
    a1/ a2/ b1/ b2/ index.mjs du niveau, unités, grammar.mjs (et foundations.mjs en A1)
scripts/
  sync-content.mjs  synchro base + MP3 + export src/content.json (npm run content)
  build-android.mjs APK adapté à la charge du PC (npm run apk)
  check-fr.mjs      contrôle hors ligne du contenu FranceCore (node scripts/check-fr.mjs [niveau])
src/                application React
docs/               PROGRAMME.md (suédois A1 à B2), PROGRAMME-FR.md (français A1 à B2), HANDOFF.md (décisions et reste à faire)
supabase/           schema.sql (contenu), cloud-schema.sql (comptes), migrations-manuelles/
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

Comptes : `.env.production` (build web) et `.env.android` (APK) contiennent l'URL et la clé anon du projet Supabase Cloud. Vides, l'app marche sans compte.

## Déployer (web)
Cloudflare Pages relié au dépôt GitHub : commande `npm run build`, dossier `dist` (Node 22, `.node-version`).

## Suivi du projet
Décisions, schéma et reste à faire : [docs/HANDOFF.md](docs/HANDOFF.md).
