# SvenskaCore : consignes projet

- Identité git (config locale du dépôt) : `Mathéo`, e-mail de la config git globale.
- Plateforme git : aucun remote pour l'instant (dépôt GitHub privé à créer).
- Contexte complet, décisions et reste à faire : `SvenskaCore_handoff.md`.
- Contenu : les fichiers `*-data.mjs` sont la source de vérité. Après modification, lancer `node --env-file=.env.local generate-audio.mjs` (synchro base + MP3 + export `src/content.json`).
- APK Android : `npm run apk` (build adapté à la charge du PC).
- Pas de tiret cadratin (U+2014) ni d'emoji dans le code, le contenu et la doc : titres au format `Unité 1 : Salutations`, formes multiples séparées par ` / `.
