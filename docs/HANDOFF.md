# SvenskaCore : Handoff (à donner à Gemini)

> Mise à jour : 18 nov 2026 (nuit) : Unités 2 à 7, Section 2, exercices, grammaire V2 réécrite, mode hors ligne + APK Android, dépôt git, refonte visuelle, sélecteur de langue FR / EN (issue #1), niveaux A2, B1 et B2 (issues #2 à #4), notes en anglais (issue #5), rangement des fichiers (issue #7), comptes et synchro de progression (issue #8), second cours FranceCore (issue #9).
> Utilisateur francophone, débutant complet en suédois. Réponds en français.

## Goal
App d'apprentissage du suédois, local-first, style Mjølnir, pour **PC Web** et **APK Android**.

## Tech Stack
- **Frontend :** React 19 + TypeScript + Vite + Tailwind CSS v4 (`@tailwindcss/vite`)
- **Mobile :** Capacitor (`@capacitor/core`, `@capacitor/android`)
- **SRS :** `ts-fsrs`
- **Backend/DB :** Supabase local (Docker) pour le pipeline de contenu ; Supabase Cloud (gratuit) pour les comptes et la progression (issue #8)
- **Web en ligne :** Cloudflare Pages
- **Audio :** `edge-tts` (`sv-SE-SofieNeural`) via `scripts/sync-content.mjs`

## Environnement local
- API : `http://127.0.0.1:54321`, Studio : `http://127.0.0.1:54323`
- Postgres : `postgresql://postgres:postgres@127.0.0.1:54322/postgres`
- `.env.local` : `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Schéma complet de la base : `supabase/schema.sql` (à coller dans le SQL Editor pour une base neuve).
- Dépôt GitHub **privé** : https://github.com/mathplayer31/svenska-core (branche `main`, remote `origin`).

## Vocabulaire B2 : decks thématiques : AJOUTÉ (25 nov 2026, issue #18)
- SvenskaCore compte **3 023 mots ou expressions distincts** (point de départ : 518). Comptage : `node scripts/count-vocab.mjs` (une carte `vocab` = un mot, comptée par sa 1re forme sans article ; le script sort en erreur si un mot d'un deck thématique existe déjà ailleurs, paires minimales de phonétique comprises).
- 44 decks de fondation « Vocabulaire A2 / B1 / B2 : thème » : 13 en A2 (761 mots : corps, maison, nourriture, gens, ville, temps et nombres, loisirs, vêtements et couleurs, nature et animaux, voyages, verbes, adjectifs, petits mots), 14 en B1 (790 mots), 17 en B2 (954 mots, dont 55 expressions imagées). Les unités n'ont pas changé, aucun slug existant n'a changé.
- Fichiers : `content/sv/a2/themes-1.mjs` et `themes-2.mjs`, idem en `b1/` et `b2/`. Une ligne par mot : `[suédois, IPA, français, anglais, genre ?]`, transformée en carte par `themeDeck` (`content/sv/helpers.mjs`) : slug `v-<mot>` (å ä ö en aa ae oe), consigne « Thème : « traduction » », son du mot avec son article. Les noms comptables portent leur article en / ett ; un nom sans article (indénombrable) a son genre et sa forme définie en 5e colonne, d'où sa note (« Nom en **ett** : *blodet* au défini »). Les autres cartes n'ont pas de note : `sync-content` n'exige la note anglaise que si la note française existe.
- Déverrouillage : chaque deck a pour prérequis une unité de son niveau (ex. « Le corps » après l'Unité 12, « Économie et finance » après l'Unité 25). Étude comme les fondations, avec FSRS. L'onglet Fondations range les decks par niveau CECR (un bloc A1, A2, B1, B2).
- `content/sv/index.mjs` regroupe désormais tous les decks et cartes suédois (`SV_DECKS`, `SV_CARDS`), lus par `scripts/sync-content.mjs` et `scripts/count-vocab.mjs`. Pour ajouter un deck thématique : une entrée `themeDeck(...)` dans le fichier `themes-*.mjs` du niveau, puis `npm run content`.
- Accents tonals : seuls les monosyllabes des nouveaux decks (accent 1, certain) sont dans `content/sv/tones.mjs` (405 mots). Les mots de deux syllabes ou plus sont sans courbe, à faire relire par une personne native.
- Sons : 2 505 MP3 de plus dans `public/audio` (environ 4 300 au total). Le cache hors ligne de la PWA les inclut (liste générée au build dans `dist/sw.js`) ; la liste des sons change, donc un appareil déjà installé retélécharge tous les sons une fois.
- Vérifié le 25 nov 2026 : `npm run content`, `node scripts/count-vocab.mjs`, `node scripts/check-tones.mjs`, `node scripts/check-fr.mjs`, `npx tsc -b`, `npm run build`, `npm run apk`.

## Rappel quotidien : AJOUTÉ (21 nov 2026, issue #16)
- Réglage dans l'écran Compte (`src/ReminderSettings.tsx`) : interrupteur et heure, mémorisés sur l'appareil (clé `svenska.reminder`). La permission de notification n'est demandée qu'à l'activation. Logique : `src/reminders.ts`.
- APK : notification locale répétée chaque jour (`@capacitor/local-notifications`, id 1), sans serveur. Le plugin la reprogramme au redémarrage du téléphone (récepteur `BOOT_COMPLETED`) ; un appui ouvre l'app.
- PWA (iPhone avec l'app sur l'écran d'accueil, iOS 16.4 ou plus, et navigateurs compatibles) : push web, compte obligatoire. L'abonnement va dans la table `push_subscriptions` (RLS : le propriétaire seul), avec l'heure, le fuseau et le texte dans la langue de l'interface. La fonction `supabase/functions/send-reminders` (planifiée toutes les 5 minutes) envoie le rappel une fois par jour dès que l'heure est passée dans le fuseau de l'abonnement, et supprime les abonnements expirés (404 ou 410). `scripts/sw.js` affiche la notification (`push`) et ouvre l'app à l'appui (`notificationclick`).
- iPhone sans l'app installée : le réglage explique comment l'ajouter à l'écran d'accueil. Navigateur sans push, ou dev (`npm run dev`, pas de service worker) : message « ce navigateur ne peut pas recevoir de rappels ».
- Le texte (titre et corps) suit la langue de l'interface : l'app le remet à jour à l'ouverture et à chaque changement de langue. À la déconnexion, le rappel web est retiré (il est lié au compte).
- Android 12 et plus : à l'activation, le plugin ouvre l'écran système « Alarmes et rappels » pour une alarme exacte. Refusée, l'alarme devient non exacte et Android peut la retarder jusqu'à une heure.
- Build Android : le plugin impose une chaîne Java 21 absente du PC (seul le JDK 25 d'Android Studio est installé) ; `android/build.gradle` ignore son `jvmToolchain(21)` et garde le bytecode Java 21.
- Vérifié le 21 nov 2026 : `npx tsc -b`, `npm run build`, `npm run apk` ; sur la base locale, fonction servie par `npx supabase functions serve send-reminders --no-verify-jwt --env-file <fichier>` : 401 sans secret, envoi chiffré accepté (201), abonnement en 410 supprimé, pas de second envoi le même jour, heure pas encore atteinte ignorée ; RLS (un autre compte ne voit ni ne modifie rien, ne peut pas écrire chez le premier) ; dans le navigateur intégré (build de production sur la base locale, service push simulé : ce navigateur n'en a pas) : activation, changement d'heure, changement de langue, coupure et déconnexion mettent la table à jour ; message iPhone. Sur l'émulateur Android (API 37) : permission, alarme exacte à l'heure choisie, notification reçue en français, appui qui ouvre l'app, rappel du lendemain reprogrammé, rappel conservé après redémarrage du téléphone sans rouvrir l'app.

### Mise en place sur Supabase Cloud : FAIT (21 nov 2026)
Commandes exécutées dans cet ordre, depuis la racine du dépôt (projet `dzbjgjlkwbendatibgkb`). Le CLI exige `--yes` pour toute modification du projet hébergé.
1. Connexion du CLI (une page de validation s'ouvre dans le navigateur) :
```powershell
npx supabase login
```
2. Table, RLS et droits :
```powershell
npx supabase db query --remote=dzbjgjlkwbendatibgkb --yes --file supabase/migrations-manuelles/migration_rappels.sql
```
   Sur ce projet, une nouvelle table ne reçoit aucun droit automatique : sans le `grant ... to service_role` de la migration, la fonction répondait 500 « permission denied for table push_subscriptions ».
3. Clés VAPID, secrets et déploiement (l'adresse sert de contact aux services push) :
```powershell
node scripts/setup-reminders.mjs mailto:mathplayer31@gmail.com --yes
```
   Le script génère les clés VAPID et le secret d'appel, les enregistre comme secrets de la fonction (`VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`, `CRON_SECRET` ; la clé privée n'est écrite nulle part ailleurs), écrit `VITE_VAPID_PUBLIC_KEY` dans `.env.production`, déploie `send-reminders` (`--no-verify-jwt` : la fonction vérifie elle-même le secret d'appel) et écrit le SQL de planification dans `supabase/rappels-cron.sql.local` (ignoré par git, il contient le secret). **Ne pas le relancer** : de nouvelles clés rendent inutilisables les abonnements existants.
4. Planification (extensions `pg_cron` et `pg_net`, secret d'appel dans Vault sous `rappels_cron_secret`, tâche `rappels-quotidiens` toutes les 5 minutes, délai de 30 s), puis suppression du fichier :
```powershell
npx supabase db query --remote=dzbjgjlkwbendatibgkb --yes --file supabase/rappels-cron.sql.local
Remove-Item supabase/rappels-cron.sql.local
```
   Avec le délai par défaut de pg_net (5 s), le premier appel a échoué sur le démarrage à froid de la fonction : d'où `timeout_milliseconds := 30000`.
5. Contrôle : la réponse de chaque passage est dans `net._http_response` (attendu : 200 et `{"sent":…,"removed":…,"failed":…}`).
```powershell
npx supabase db query --remote=dzbjgjlkwbendatibgkb --read-only "select status_code, content::text, created from net._http_response order by created desc limit 3"
```
6. Commit de `.env.production` (clé publique) et push : Cloudflare reconstruit l'app avec la clé.
## XP, streak et classement : AJOUTÉ (21 nov 2026, issue #15)
- XP par réponse dans les séances d'unité et des fondations : 10 par nouvelle carte, 5 par rappel ou exercice réussi, 1 par erreur, +20 par séance terminée. Le total gagné s'affiche en fin de séance d'unité. L'entraînement libre et les tests de section ne rapportent pas d'XP.
- Streak : un jour (heure locale de l'appareil) est validé par une séance terminée ; une séance des fondations est terminée quand sa file de cartes est vide (pas en mode libre). Récompenses à 7, 30, 100 et 365 jours de record : icônes à côté du pseudo.
- Règles pures dans `src/xp.ts`, contrôle : `node --experimental-strip-types scripts/check-xp.ts`. Stockage et envoi dans `src/dataSource.ts` (clé locale `svenska.xp`) : chaque événement a un identifiant créé sur l'appareil, envoyé au compte tout de suite ou à la synchro suivante, sans doublon. Sans compte, XP et streak restent locaux ; l'XP gagnée avant la connexion est créditée au compte connecté ensuite.
- Onglet Classement (`src/Leaderboard.tsx`) : série en cours, record, XP de la semaine ; classements semaine (depuis lundi 0 h), mois, série, position de l'utilisateur mise en avant. Pseudo dans l'écran Compte : 3 à 20 caractères `A-Z a-z 0-9 _`, unique sans tenir compte de la casse, modifiable ; sans pseudo, absent du classement.
- Base : `supabase/migrations-manuelles/migration_classement.sql` (tables `profiles` et `xp_events`, fonction `leaderboard()`). RLS : chacun ne lit que ses lignes ; les autres comptes ne sont visibles que via `leaderboard()`, qui ne renvoie que pseudo, XP, streak et record. Appliquée le 21 nov 2026 sur la base locale et sur Supabase Cloud (SQL Editor).
- Limite connue : un utilisateur peut insérer de faux événements par l'API avec sa propre clé de session (pas de contrôle côté serveur de la réalité des réponses).
- Vérifié le 21 nov 2026 sur la base locale : deux comptes de test, pas de doublon au renvoi, insertion chez un autre refusée, pseudo pris (autre casse) et invalide refusés, profil et événements des autres illisibles, visiteur anonyme refusé ; dans l'app : séance des fondations sans compte (41 XP), connexion et envoi, séance d'unité hors ligne (+173 XP) puis envoi au retour du réseau (214 XP en base comme sur l'appareil), onglets et icônes, FR / EN, mobile.

## Plus de mots par unité : AJOUTÉ (21 nov 2026, issue #14)
- 5 à 8 cartes `vocab` (mots ou expressions) de plus dans chacune des 62 unités : 195 pour SvenskaCore, 190 pour FranceCore. Elles sont liées au thème de l'unité, sans doublon dans le cours (ex. *tack så mycket* dans l'Unité 1, avec *tack* ; *merci beaucoup* dans l'Unité 1 de FranceCore).
- Placées dans chaque fichier d'unité après les mots d'origine, sous le commentaire `// Ajouts (issue #14)`, avant les phrases. Les unités A1 suédoises importent désormais `vocab` de `content/sv/helpers.mjs` pour ces ajouts (anglais intégré à la carte, note anglaise dans `content/sv/a1/notes-en.mjs`).
- Accents tonals : 130 nouveaux mots dans `content/sv/tones.mjs`, les autres sont listés en tête du fichier. *nyår* et *patient* sont écartés par `node scripts/check-tones.mjs` (voyelles voisines à l'écrit).
- `node scripts/check-fr.mjs` attend maintenant 17 à 20 mots et 8 phrases par unité.
- Total : 1724 cartes (suédois : A1 208, A2 207, B1 206, B2 205 ; français : A1 223, A2 224, B1 226, B2 225).
- Vérifié le 21 nov 2026 : `npm run content`, `node scripts/check-tones.mjs`, `node scripts/check-fr.mjs`, `npx tsc -b`, `npm run build`.

## PWA (app sur iPhone) et icône : AJOUTÉ (21 nov 2026, issue #12)
- Pas d'app iOS native (il faudrait un Mac et Xcode) : le site s'installe comme une app. Sur iPhone : Safari, ouvrir https://svenska-core.pages.dev, Partager > Sur l'écran d'accueil.
- Hors ligne complet : `scripts/sw.js` est le modèle du service worker ; au build, `vite.config.ts` écrit `dist/sw.js` avec la liste des fichiers (app + 1 386 sons). Deux caches versionnés par empreinte du contenu : un déploiement remplace l'app, les sons ne sont retéléchargés que s'ils ont changé. Les sons sont servis en 206 sur requête Range (obligatoire pour Safari iOS).
- Le service worker n'est enregistré qu'en production web (`src/main.tsx`) : ni en dev, ni dans l'APK.
- Icône : drapeau suédois sur fond bleu Melodi. Favicon `public/favicon.svg` ; icônes PWA, iPhone et Android générées par `python scripts/make-icons.py` (Pillow).
- Tester le build de production en local : `npm run build` puis `npm run preview` (port 4173).

## Design Melodi, séances d'unité et accents tonals : AJOUTÉ (20 nov 2026, issue #10)
- Look « Melodi » (lecteur de musique) : palette bleue dans `src/index.css`, thème clair / sombre / système (`src/theme.ts`, clé `svenska.theme`), pièces visuelles dans `src/Melodi.tsx` (drapeaux, pochettes d'albums, panneau de choix du cours). Remplace la refonte « nordique clair » ci-dessous.
- Parcours : les sections sont des albums, les unités des pistes. Plus d'onglet Réviser : navigation Parcours / Fondations / Compte.
- Séance d'unité (`src/UnitSession.tsx`, plan dans `src/sessionPlan.ts`, revu le 21 nov 2026, issue #13) : un bloc de 6 nouvelles cartes, puis au plus 3 exercices sur ce bloc (paires sur ses mots, phrases en blocs, QCM ou écriture), puis 2 rappels ; au plus 12 nouvelles cartes et 10 rappels. Un rappel est un exercice noté dans FSRS (juste : Bien, avertissement : Difficile, faux : À revoir). En fin de séance, chaque carte trouvée difficile (notée À revoir ou Difficile, exercice raté) revient une fois, étiquetée « À retravailler ».
- Paires : mots seulement (`isMatchWord` : carte de vocabulaire, au plus 2 mots sans compter l'article, pas de ponctuation de phrase), première forme de chaque côté, grille alignée ligne par ligne.
- « Je ne peux pas écouter maintenant » : bouton sous les exercices d'écoute et de dictée ; ils sont remplacés par des exercices sans son pendant une heure (clé `svenska.noAudioUntil`). Contrôle : `node --experimental-strip-types scripts/check-session.ts`.
- Accents tonals : saisis dans `content/sv/tones.mjs` (slug -> 1 ou 2), seulement quand ils sont certains ; la liste des mots laissés sans courbe, à faire relire par une personne native, est en tête du fichier. `scripts/sync-content.mjs` ajoute le champ `tone` à l'export ; contrôle contre l'IPA : `node scripts/check-tones.mjs`. La courbe est dessinée par `src/ToneCurve.tsx`.

## Rangement des fichiers : FAIT (19 nov 2026, issue #7)
- Contenu par niveau dans `content/` : `content/sv/a1/` (foundations.mjs, grammar.mjs, unit01 à unit07, en.mjs, notes-en.mjs), `content/sv/a2/`, `content/sv/b1/`, `content/sv/b2/` (grammar.mjs, unités, notes-en.mjs), plus `content/sv/sections.mjs` et `content/sv/helpers.mjs`. Arborescence complète : README.
- Script de contenu : `scripts/sync-content.mjs` (ex `generate-audio.mjs`), lancé par `npm run content`. Les fondations phonétique et vocab/genres, autrefois codées dans le script, sont dans `content/sv/a1/foundations.mjs`.
- Docs : `docs/HANDOFF.md` (ce fichier, ex `SvenskaCore_handoff.md`) et `docs/PROGRAMME.md`. Migrations SQL : `supabase/migrations-manuelles/`.
- Supprimés : `seed-human-audio.mjs` (effaçait la progression de phonétique s'il était lancé) et `GEMINI.md` (obsolète).
- Pour ajouter une unité : créer `content/sv/<niveau>/unitNN-sujet.mjs` avec `unitDeck` / `vocab` / `phrase`, sa note anglaise dans `content/sv/<niveau>/notes-en.mjs`, puis l'importer dans `scripts/sync-content.mjs`.

## Notes en anglais : AJOUTÉ (19 nov 2026, issue #5)
- En mode anglais, plus aucun texte français : les 631 notes de grammaire sont traduites et adaptées à un anglophone (repères de prononciation et pièges comparés à l'anglais).
- Fichiers `content/sv/a1/notes-en.mjs`, `content/sv/a2/notes-en.mjs`, `content/sv/b1/notes-en.mjs`, `content/sv/b2/notes-en.mjs` : une note par slug. `IPA_EN` (dans `content/sv/a1/notes-en.mjs`) remplace les indications de prononciation rédigées en français (8 cartes de phonétique + *och*).
- `scripts/sync-content.mjs` s'arrête si une carte n'a pas de note anglaise. Toute nouvelle carte doit donc avoir sa note dans le fichier `notes-en-*` de son niveau.
- Colonnes ajoutées (fichier `supabase/migrations-manuelles/migration_notes_en.sql`, appliqué) :
```sql
alter table public.cards add column if not exists explanation_en text;
alter table public.cards add column if not exists ipa_en text;
```
- L'accent tonal, saisi en français (« Accent 1 (Aigu) »), est affiché « (acute) / (grave) » en anglais. La mention « Note (in French) » a disparu.

## Niveaux B1 et B2 : AJOUTÉS (19 nov 2026, issues #3 et #4)
- B1 = Section 5 « S'installer en Suède » (Unités 16 à 19 : démarches, logement & voisinage, travail & entretien, avis & débats) + Section 6 « Société & culture » (Unités 20 à 23 : nature & allemansrätten, médias, émotions, raconter au passé) + deck « 5. Grammaire B1 » (BIFF, *som*, *om*, *fast*, verbes à particule, plus-que-parfait, questions indirectes). Fichiers `content/sv/b1/unit16-paperwork.mjs` à `content/sv/b1/unit23-stories.mjs`, `content/sv/b1/grammar.mjs`.
- B2 = Section 7 « Travailler en suédois » (Unités 24 à 27 : vie pro, économie, santé & société, climat) + Section 8 « Nuances & expression » (Unités 28 à 31 : expressions idiomatiques, argumenter, registres, histoire & identité) + deck « 6. Grammaire B2 » (passif -s et bli, participes, conditionnel, discours rapporté, verbes réciproques et déponents, dérivation -bar). Fichiers `content/sv/b2/unit24-professional.mjs` à `content/sv/b2/unit31-history.mjs`, `content/sv/b2/grammar.mjs`.
- Même format que l'A2 (`content/sv/helpers.mjs`, anglais intégré). Total : 631 cartes (A1 163, A2 156, B1 156, B2 156).
- Fusionné dans `main` le 19 nov 2026 (avance rapide jusqu'au commit a17bd80) ; branches supprimées, issues #2, #3 et #4 fermées.
- Rendu des notes corrigé : l'italique peut contenir du gras ou être barré (`renderInlineMd` récursif dans `App.tsx`).

## Niveau A2 : AJOUTÉ (18 nov 2026, issue #2)
- Programme complet A1 à B2 : `docs/PROGRAMME.md` (sections, unités, thèmes, grammaire). B1 et B2 restent à produire, une issue par niveau.
- A2 = Section 3 « Ma vie au quotidien » (Unités 8 à 11) + Section 4 « Se débrouiller en Suède » (Unités 12 à 15), 18 cartes par unité (10 mots + 8 phrases), plus le deck de fondation « 4. Grammaire A2 » (12 cartes, débloqué après l'Unité 15). 156 cartes A2, 319 au total.
- Fichiers : `content/sv/a2/unit08-home.mjs` à `content/sv/a2/unit15-plans.mjs`, `content/sv/a2/grammar.mjs`. Écriture compacte via `content/sv/helpers.mjs` (`vocab`, `phrase`, `cloze`, `unitDeck`) : chaque carte porte son anglais dans `en`, et la glose s'écrit en triplets `[suédois, français, anglais]`. Les sections A2 portent `title_en` / `description_en` dans `content/sv/sections.mjs`. `content/sv/a1/en.mjs` ne sert plus qu'à l'A1.
- Pour l'audio d'une carte dont le texte n'est pas lisible tel quel (ex. *Ring 1177…*), `words` donne le texte à prononcer (*Ring elva sjuttiosju…*).
- Tableau de bord : sections groupées par niveau CECR (déduit du `cefr_level` des decks de la section), et l'en-tête affiche le niveau de la dernière section ouverte.

## Sélecteur de langue FR / EN : AJOUTÉ (18 nov 2026, issue #1)
- Bouton FR / EN dans l'en-tête de l'accueil, mémorisé sur l'appareil (`localStorage`, clé `svenska.lang`). Français par défaut.
- Interface : `src/i18n.tsx` (dictionnaires `fr` / `en`, `I18nProvider` dans `main.tsx`, hook `useI18n()` qui donne `{ lang, setLang, t }`). Tout nouveau texte d'interface passe par ce fichier, dans les deux langues.
- Contenu : `content/sv/a1/en.mjs` donne par slug la consigne, la traduction et la glose anglaises de chaque carte (`CARDS_EN`), plus les titres des decks (`DECKS_EN`) et des sections (`SECTIONS_EN`). Les notes de grammaire (`explanation_md`) restent en français (libellé « Note (in French) » en mode anglais).
- `scripts/sync-content.mjs` vérifie le contenu anglais **avant** toute écriture en base et s'arrête avec la liste des manques (carte sans traduction, glose anglaise de longueur différente, deck ou section sans titre anglais).
- Colonnes : `cards.english_translation` contient désormais **vraiment l'anglais** ; le français est dans `cards.french_translation` (dans les fichiers `content/`, le champ `english_translation` contient toujours le français, nom historique). `cards.gloss` = `[{"sv","fr","en"}]`. Nouvelles colonnes `cards.prompt_en`, `decks.title_en`, `sections.title_en`, `sections.description_en`.
- Migration appliquée (fichier `supabase/migrations-manuelles/migration_langue_en.sql`) :
```sql
alter table public.cards add column if not exists prompt_en text;
alter table public.decks add column if not exists title_en text;
alter table public.sections add column if not exists title_en text;
alter table public.sections add column if not exists description_en text;
```
- Corrigé au passage : les 8 cartes du deck « Vocabulaire & Genres » avaient leur traduction en anglais même en mode français.

## Refonte visuelle « nordique clair » : AJOUTÉ (18 nov 2026)
- Thème dans `src/index.css` : variables CSS (`--bg`, `--surface`, `--ink`, `--accent` bleu #1F4E8C, `--gold` #F2C14E…) exposées à Tailwind via `@theme inline` (classes `bg-bg`, `bg-surface`, `text-ink`, `text-muted`, `bg-accent`, `border-line`…). Mode sombre automatique (`prefers-color-scheme`). Ne plus utiliser de couleurs Tailwind brutes (`slate-*`, `amber-*`…).
- Polices embarquées (fonctionnent hors ligne) : `@fontsource-variable/fraunces` (titres, classe `font-serif`) et `@fontsource-variable/inter` (texte).
- Navigation : 3 onglets **Parcours / Réviser / Fondations**, barre en bas sur mobile, sélecteur en haut sur desktop. Écrans intérieurs (unité, cartes, exercices, test) avec bouton retour en haut.
- Boutons de notation FSRS en français : À revoir / Difficile / Bien / Facile (raccourcis 1 à 4 inchangés).
- Règle de contenu : aucun tiret cadratin. Titres `Unité 1 : Salutations`, formes multiples `ett mål / en sol` (l'app découpe les étiquettes audio sur ` / `).
- Nettoyage : `src/App.css`, `src/assets/` et la dépendance `dexie` supprimés (inutilisés).

## Mode hors ligne & Android : AJOUTÉ (18 nov 2026)
- Décision : l'APK fonctionne **100 % hors ligne**. La synchro entre appareils passe par un compte facultatif (section suivante).
- `src/dataSource.ts` : couche d'accès aux données. Web et Android lisent le contenu embarqué `src/content.json` ; progression en `localStorage` (clés `svenska.cardProgress`, `svenska.sectionProgress`), synchronisée avec le compte si connecté.
- `src/content.json` est **généré** par `scripts/sync-content.mjs` à chaque synchro (sections, decks, cartes ; les uuid sont remplacés par les slugs, donc la progression locale survit à un re-seed). Les MP3 de `public/audio` sont embarqués dans l'APK.
- `capacitor.config.json` (le `.ts` a été abandonné : Capacitor ne sait pas le lire avec TypeScript 7). Wrapper Gradle passé en **9.1.0** (le seul JDK installé est le JDK 25 d'Android Studio).
- Build : `npm run apk` → `scripts/build-android.mjs`. Le script mesure cœurs / charge CPU / RAM libre et adapte le build (1 à 4 workers Gradle, JVM 1 à 3 Go, priorité basse, sans daemon) pour ne pas saturer le PC. APK debug : `android/app/build/outputs/apk/debug/app-debug.apk`.
- Les notes (`explanation_md`) sont rendues avec un mini-markdown (`**gras**`, `*italique*`, `~~barré~~`).

## Version Android signée (release) : AJOUTÉ (25 nov 2026, issue #17)
Procédure vérifiée le 25 nov 2026.
- La clé reste hors du dépôt, dans `C:\Users\mathp\.svenskacore\` : `svenskacore-release.jks` (alias `svenskacore`, RSA 2048, validité 10 000 jours) et `keystore.properties`. `android/.gitignore` exclut aussi `*.jks` et `*.keystore`.
- **Avertissement** : sauvegarder tout le dossier `.svenskacore` et son mot de passe hors du PC. Sans cette clé, plus aucune mise à jour de l'app n'est publiable sur le Play Store.
- Création de la clé (faite une seule fois, par l'utilisateur, pour que le mot de passe ne passe jamais par Claude), dans PowerShell :
  1. `New-Item -ItemType Directory -Force "$env:USERPROFILE\.svenskacore"`
  2. `& "C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe" -genkeypair -v -keystore "$env:USERPROFILE\.svenskacore\svenskacore-release.jks" -alias svenskacore -keyalg RSA -keysize 2048 -validity 10000`
  3. `notepad "$env:USERPROFILE\.svenskacore\keystore.properties"`, avec les 4 lignes `storeFile=svenskacore-release.jks`, `storePassword=...`, `keyAlias=svenskacore`, `keyPassword=...` (même mot de passe).
- Build : `npm run apk:release` (même script que `npm run apk`, avec `--release`). Sans `keystore.properties`, le script s'arrête avant de construire. Sorties :
  - `android/app/build/outputs/bundle/release/app-release.aab` (à envoyer sur le Play Store) ;
  - `android/app/build/outputs/apk/release/app-release.apk` (installation directe sur un téléphone).
- Vérification de la signature : `& "$env:LOCALAPPDATA\Android\Sdk\build-tools\36.0.0\apksigner.bat" verify --print-certs android\app\build\outputs\apk\release\app-release.apk` (code 0, affiche le certificat, SHA-256 `8d74e759...0740`). Pour l'AAB : `jarsigner -verify` répond « jar verified » ; ses avertissements (certificat auto-signé, pas d'horodatage) sont normaux pour une clé d'envoi Play Store.
- Résultat du 25 nov 2026 : APK de 30 Mo, AAB de 25 Mo.
- À chaque publication : augmenter `versionCode` (entier strictement croissant) et `versionName` dans `android/app/build.gradle`.

## FranceCore, cours de français : AJOUTÉ (18 nov 2026, issue #9)
- Même app, deux cours : un clic sur le nom de l'app (en-tête) bascule entre **SvenskaCore** (suédois, interface FR / EN) et **FranceCore** (français, interface EN / SV). Cours et langue mémorisés par appareil (`svenska.course`, `svenska.lang`, `svenska.lang.fr`).
- Contenu : le suédois est rangé dans `content/sv/`, le français dans `content/fr/` (programme : `docs/PROGRAMME-FR.md`, format : `content/fr/helpers.mjs`). 8 sections, 31 unités de 12 mots + 8 phrases, fondations de prononciation et de genre, un deck de grammaire par niveau.
- Base : colonne `course` (`sv` par défaut, `fr`) sur `decks` et `sections` (`supabase/migrations-manuelles/migration_cours.sql`, incluse dans `schema.sql`). Les colonnes gardent leurs noms historiques : pour une carte française, `swedish_target` = français, `english_translation` / `french_translation` = suédois (langue de base), anglais dans les colonnes `_en`.
- L'app ne charge que le cours actif (`loadData` dans `src/App.tsx`) ; parcours, révisions, tests et fondations restent inchangés. Tous les slugs français commencent par `fr-` : la progression des deux cours partage les mêmes clés et tables, avec la même synchro de compte.
- Audio : `scripts/sync-content.mjs` choisit la voix d'après le cours du deck (`fr-FR-DeniseNeural` pour le français). Les exercices écrits reconnaissent les articles des deux langues (en / ett, un / une, le / la) et tolèrent les accents oubliés.
- Contrôles : `npm run content` refuse une carte française sans suédois ou sans anglais ; `node scripts/check-fr.mjs [niveau]` vérifie le contenu français hors ligne (champs, gloses, 17 à 20 mots + 8 phrases par unité, slugs, tiret cadratin).

## Comptes et synchro de progression : AJOUTÉ (18 nov 2026, issue #8)
- Seule la progression se synchronise ; le contenu reste embarqué. L'app marche sans compte.
- Base des comptes : Supabase Cloud, tables `progress_cards` / `progress_sections` clés par slug, RLS `auth.uid() = user_id` : `supabase/cloud-schema.sql` (appliqué aussi sur la base locale pour le dev).
- Connexion e-mail + mot de passe : bouton Compte en haut à droite, `src/AccountScreen.tsx`.
- Synchro (`src/dataSource.ts`) à l'ouverture et au retour sur l'app : fusion carte par carte, la révision la plus récente gagne ; tests de section : meilleur score, validé si validé sur un appareil. Chaque révision est écrite sur l'appareil puis envoyée ; faite hors ligne, elle part à la synchro suivante. Règles : `src/syncMerge.ts`, test : `node --experimental-strip-types --no-warnings scripts/check-sync.ts`.
- Config : `.env.local` (dev, base locale), `.env.production` (`npm run build`, Cloudflare) et `.env.android` (APK) contiennent `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`. Vides : comptes désactivés. La clé anon est publique par conception, la protection vient de la RLS.
- Retiré : le mode web « contenu et progression dans Supabase local » (`npm run dev:local`, `VITE_DATA_SOURCE`). Supabase local ne sert plus qu'à `npm run content` et au test des comptes en dev.
- Import de l'ancienne progression PC (tables `user_card_progress` / `user_section_progress`) dans un compte : `scripts/import-progress.ts`, commande en en-tête du fichier. Relancer ne change rien.
- Web en ligne : Cloudflare Pages relié au dépôt GitHub, commande `npm run build`, dossier `dist`, Node 22 (`.node-version`).
- Vérifié le 18 nov 2026 sur la base locale avec un compte de test : import de 25 cartes + 1 test ; connexion sur un stockage vide, progression récupérée ; révision faite dans l'app, présente dans le compte ; révision faite hors ligne, envoyée à la synchro suivante ; un second compte ne voit rien et ne peut pas écrire chez le premier ; écran Compte en FR et EN ; déconnexion, progression gardée sur l'appareil.

## Grammaire V2 réécrite : AJOUTÉ (18 nov 2026)
- `content/sv/a1/grammar.mjs` : 12 cartes `cloze_grammar` qui n'utilisent que le vocabulaire des unités 1 à 7 (V2 avec idag/imorgon/igår, questions, *inte*, *sin/hans*, accord en -t, forme définie, *det här tåget*). Prérequis du deck : **Unité 7**.
- Les 8 anciennes cartes (*åkte*, *jobbar hemifrån*, *eftersom*…) ont été supprimées. `scripts/sync-content.mjs` supprime désormais toute carte en base dont le slug n'existe plus dans les fichiers de données (et sa progression).

---

## Problème constaté
Les cartes de **prononciation** fonctionnent bien. Les cartes de **grammaire/syntaxe V2** sont trop dures : l'utilisateur ne connaît aucun mot des phrases, donc il butte sur le vocabulaire et pas sur la règle.

## Décisions prises (à respecter)
1. **Architecture "Double Rail"** : un parcours **thématique** (unités en situation réelle) comme entrée principale du dashboard, + les **fondations** (phonétique, grammaire V2, genres en/ett) en soutien.
2. **Ne PAS ajouter `'thematic'` dans `decks.category`.** `category` = la compétence (`phonetics` / `grammar` / `vocabulary`). Le parcours est porté par une nouvelle colonne `track` (`'foundation'` | `'thematic'`) + `unit_number`.
3. **Règles de contenu :**
   - Chaque phrase de grammaire n'utilise que des mots déjà introduits dans les unités précédentes (ex. V2 avec « Jag heter Anna » / « Idag heter jag Anna » après l'Unité 1).
   - Chaque mot d'une phrase est **glosé** (tap sur un mot -> traduction) via la colonne `gloss`.
   - Les decks de fondation (grammaire, vocab/genres) sont **déverrouillés par les unités** via `prerequisite_deck_id`, pas dispos dès le départ.
4. **Plan des unités thématiques :**
   - U1 Salutations & premier contact (Hej, Tjena, God morgon, Hur är läget?, Det är bra tack, Jag heter…, Jag kommer från Frankrike)
   - U2 Café & fika (« Jag tar en bryggkaffe och en kanelbulle, tack » : pas « Jag vill ha », qui sonne enfantin ; Kan jag betala med kort? ; Ta med eller äta här ?)
   - U3 Famille & relations (flickvän, pojkvän, svärmor, syster, bror ; piège `sin/sitt/sina`)
   - U4 Nourriture, courses, restaurant (ICA/Systembolaget, en påse, kvitto, Notan tack)
   - U5 Déplacements & météo (tunnelbana, spår, nästa avgång, försening, väder)
5. **Dashboard :** section « Parcours Thématique » en haut, section « Fondations Linguistiques » dessous.

---

## Migration SQL : APPLIQUÉE (confirmé par l'utilisateur)

```sql
-- 1. Parcours (thématique / fondation) séparé de la compétence (category)
alter table public.decks
  add column track text not null default 'foundation'
    check (track in ('foundation', 'thematic')),
  add column unit_number int,
  add column prerequisite_deck_id uuid
    references public.decks(id) on delete set null;

-- 2. Glose mot à mot + traduction française
alter table public.cards
  add column gloss jsonb,               -- [{"sv":"jag","fr":"je"}, ...]
  add column french_translation text;

-- 3. Nouveau type de carte : phrase complète
alter table public.cards drop constraint cards_card_type_check;
alter table public.cards add constraint cards_card_type_check
  check (card_type = any (array[
    'minimal_pair','vocab','cloze_grammar','listening','phrase'
  ]));

-- 4. Index dashboard
create index decks_track_unit_idx on public.decks (track, unit_number, sort_order);
```

---

## Schéma de la DB (`public`) : état AVANT migration (les nouvelles colonnes sont listées plus bas et sont désormais en base)

### `decks`
| colonne | type | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| slug | text | NO (unique) | |
| title | text | NO | |
| category | text | NO | CHECK in ('phonetics','grammar','vocabulary') |
| cefr_level | text | NO | 'A1' |
| sort_order | int4 | NO | 0 |

### `cards`
| colonne | type | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| deck_id | uuid | NO | FK -> decks(id) ON DELETE CASCADE |
| card_type | text | NO | CHECK in ('minimal_pair','vocab','cloze_grammar','listening') (+ 'phrase' après migration) |
| swedish_prompt | text | NO | |
| swedish_target | text | NO | |
| english_translation | text | NO | |
| ipa_transcription | text | YES | |
| pitch_accent | text | YES | |
| audio_url | text | YES | |
| explanation_md | text | NO | |
| created_at | timestamptz | NO | now() |
| slug | text | YES (unique) | |

### `user_card_progress` (PK : `user_id, card_id`, FK card_id -> cards ON DELETE CASCADE)
`state int2 (0)`, `due timestamptz (now())`, `stability float8 (0)`, `difficulty float8 (0)`, `elapsed_days int4 (0)`, `scheduled_days int4 (0)`, `reps int4 (0)`, `lapses int4 (0)`, `last_review timestamptz (null)`

### RLS
RLS activé sur les 3 tables avec une policy dev permissive (`ALL`, `true`, rôle `public`). **À restreindre avant toute mise en prod.**

### Nouvelles colonnes (après migration)
- `decks.track` text not null default 'foundation' (`'foundation'|'thematic'`)
- `decks.unit_number` int (nullable)
- `decks.prerequisite_deck_id` uuid (nullable, FK decks)
- `cards.gloss` jsonb (nullable) : `[{"sv":"jag","fr":"je"}]`
- `cards.french_translation` text (nullable)

---

## Decks existants (seedés)
| slug | title | category | sort_order |
|---|---|---|---|
| swedish-core-a1 | 1. Phonétique & Voyelles | phonetics | 1 |
| swedish-grammar-a1 | 2. Grammaire & Syntaxe V2 | grammar | 2 |
| swedish-vocab-a1 | 3. Vocabulaire & Genres (en/ett) | vocabulary | 3 |

Tous en `track = 'foundation'`. La phonétique reste accessible dès le début. Grammaire et vocab/genres seront verrouillés derrière l'Unité 1 (ou 2) une fois ses decks créés :
```sql
-- À exécuter APRÈS création du deck de l'Unité 1 (slug à adapter)
update public.decks
set prerequisite_deck_id = (select id from public.decks where slug = 'swedish-unit-1-greetings')
where slug in ('swedish-grammar-a1', 'swedish-vocab-a1');
```

---

## Pipeline de contenu (IMPORTANT : source de vérité)
- Les decks et cartes sont définis dans **`scripts/sync-content.mjs`** (`DECKS_DATA`, `CARDS_DATA`) et poussés par `upsert` (onConflict `slug`). Lancer : `npm run content`. Ne pas seeder à la main en SQL.
- Les nouvelles unités sont dans des modules séparés (`content/sv/a1/unit01-greetings.mjs`, etc.) exportant un deck + un tableau de cartes, importés dans le script.
- Convention des champs d'une carte : `swedish_prompt` = consigne/indice **en français** ; `swedish_target` = texte suédois ; `english_translation` contient en réalité la **traduction française** (nom de colonne trompeur, à renommer plus tard) ; `french_translation` est rempli avec la même valeur ; `words` = textes dont on génère un MP3 chacun.
- Audio : MP3 générés en local dans `./public/audio/<slug>_<n>.mp3` (cache si déjà présent), `audio_url` = chemins `/audio/...` joints par `|`. (Le bucket Supabase `card-audio` n'est pas utilisé par le script.)
- Nouveaux champs de carte : `gloss` (jsonb `[{sv, fr}]`) et `french_translation`.

## Frontend (`App.tsx`) : état
- Charge les nouveaux champs : `decks.track/unit_number/prerequisite_deck_id`, `cards.gloss/french_translation`.
- Dashboard en 2 sections : « Parcours Thématique » puis « Fondations Linguistiques ».
- Verrouillage : un deck est débloqué quand toutes les cartes de son deck prérequis ont été vues au moins une fois (`state !== 0`). La session globale « ALL » exclut les decks verrouillés et met les nouvelles cartes du parcours thématique en premier.
- Type de carte `phrase` géré ; affichage de la glose mot à mot sur la face réponse.
- `scripts/sync-content.mjs` : `generateMp3()` avec timeout 30 s, 3 tentatives et `stdio: 'inherit'` (fait ; un MP3 tronqué est supprimé automatiquement).
- Prérequis : un deck déclare `prerequisite_slug` (dans `DECKS_DATA` ou `content/sv/*/unitNN-*.mjs`) ; le script le résout en `prerequisite_deck_id` après l'upsert de tous les decks. Grammaire + vocab/genres -> Unité 1 ; Unité 2 -> Unité 1.

## Page d'unité + exercices : AJOUTÉ (18 nov 2026)
- Clic sur un deck **thématique** -> page d'unité (pas directement les cartes) : barre de progression, **1. Découvrir** (session de cartes FSRS du deck), **2. Pratiquer** (déverrouillé quand toutes les cartes de l'unité ont été vues), **Lexique** (mots/phrases déjà vus, tap = audio). Les cartes encore non vues sont masquées dans le lexique.
- `src/UnitPractice.tsx` : série d'environ 15 exercices **générés automatiquement depuis les cartes** (aucun contenu à écrire en plus) :
  1. Associer les paires (5 mots sv <-> fr ; 1 erreur tolérée)
  2. QCM traduction FR -> choisir le suédois
  3. QCM écoute -> choisir la traduction (bouton lent 0.65x)
  4. Composer la phrase avec des blocs de mots (distracteurs = mots de l'unité + des unités précédentes)
  5. Écriture libre FR -> suédois, et dictée audio -> suédois. Boutons å/ä/ö. Correction tolérante : majuscules/ponctuation ignorées, oubli d'accents accepté avec avertissement, 1 faute de frappe acceptée si le mot fait ≥ 6 lettres ; l'oubli/erreur d'article en/ett compte comme une erreur, avec explication.
- Correction affichée après chaque exercice (suédois + traduction + glose + audio). Raccourcis : 1-4 pour les QCM, Entrée pour vérifier/continuer.
- Un exercice raté est reproposé **une fois** en fin de série (« rattrapage »). Score = % réussis du premier coup.
- Meilleur score par unité stocké en `localStorage` (`svenska.practiceScores`) : pas en DB pour l'instant, les exercices n'alimentent pas FSRS.

## Unité 2 : Café & fika : SEEDÉE
- `content/sv/a1/unit02-cafe.mjs` : 10 `vocab` (fika, en bryggkaffe, en kanelbulle, ett te, mjölk, en kopp, och, med, ett kort, här) + 8 `phrase` (Ska vi fika?, Jag tar en bryggkaffe och en kanelbulle tack, En kopp te med mjölk tack, Ta med eller äta här?, Äta här tack, Vad kostar det?, Kan jag betala med kort?, Det var gott!). Section 1, `unit_number` 2, prérequis Unité 1.

## Unités 3 à 7 + Section 2 : SEEDÉES (18 nov 2026)
Chaque unité a pour prérequis la précédente (chaîne U1 → U7). Le plan initial a été découpé plus finement : restaurant et météo ont leur propre unité.

| Unité | Section | Fichier | Contenu | Point de grammaire |
|---|---|---|---|---|
| U3 Famille & relations | 1 | `content/sv/a1/unit03-family.mjs` | 12 mots (familj, mamma, pappa, föräldrar, syster, bror, barn, flickvän, pojkvän, svärmor, han, hon) + 10 phrases | min/mitt/mina ; piège **sin/sitt/sina vs hans/hennes** (*Hon fikar med sin syster* vs *…hennes syster*) |
| U4 Courses : ICA & Systembolaget | 2 | `content/sv/a1/unit04-shopping.mjs` | 12 mots (affär, köper, påse, kvitto, bröd, ost, frukt, vin, öl, kronor, dyrt, billigt) + 9 phrases | défini suffixé (*kvittot*), *ni*, *Det blir…*, adjectif en -t après *det är* |
| U5 Au restaurant | 2 | `content/sv/a1/unit05-restaurant.mjs` | 10 mots (restaurang, bord, meny, vatten, kött, fisk, vegetarisk, två, notan, gärna) + 9 phrases | *Kan jag få…?*, *jätte-*, *var för sig* |
| U6 Déplacements & transports | 2 | `content/sv/a1/unit06-transport.mjs` | 11 mots (buss, tunnelbana, tåg, biljett, station, spår, nästa, försenad, vänster, höger, till) + 8 phrases | accord *försenat*, *den här bussen* (double défini) |
| U7 Météo & temps | 2 | `content/sv/a1/unit07-weather.mjs` | 10 mots (vädret, solen, regnar, snöar, kallt, varmt, blåsigt, imorgon, igår, grader) + 9 phrases | **V2** avec adverbe de temps en tête (*Idag är det kallt*, *Imorgon snöar det*), *det* impersonnel |

- `content/sv/sections.mjs` : ajout de `section-2-vie-quotidienne` (pass_score 80). La section 2 regroupe U4 à U7 et a son test de fin de section (généré automatiquement).
- Total en base : 159 cartes. Mots/notions introduits en phrase sans carte dédiée, toujours glosés : vill ha, ni, hundra, var, ligger, på, få, lite, för, sig, när, går, tre, tio, sväng, sedan, skiner, vilket, fint, hennes, hans.

## Sections + tests (style Duolingo) : AJOUTÉ
- Hiérarchie : **Section → Unités (decks thématiques) → cartes**. Les fondations (phonétique, grammaire, vocab/genres) restent hors section.
- DB (fichier `migration_sections.sql`, à exécuter dans le SQL Editor) : table `sections` (`slug`, `title`, `description`, `sort_order`, `pass_score` défaut 80), colonne `decks.section_id`, table `user_section_progress` (`user_id`, `section_id`, `best_score`, `passed`, `attempts`, `last_attempt`). RLS dev permissive.
- Données : `content/sv/sections.mjs` (tableau `SECTIONS`). Un deck rattache sa section via `section_slug` dans `content/sv/*/unitNN-*.mjs` ; `scripts/sync-content.mjs` upserte les sections, retire `section_slug` et met `section_id` avant d'upserter le deck.
- Règles : la section 1 est toujours ouverte ; la section N+1 s'ouvre quand le test de la section N est réussi (≥ `pass_score`). Les decks d'une section verrouillée sont verrouillés. Le test devient disponible quand toutes les cartes de la section ont été vues au moins une fois.
- Test (`SectionTest.tsx`) : 10 QCM générés depuis les cartes `vocab`/`phrase` de la section (1 question sur 2 : écoute -> choisir la traduction ; sinon traduction FR -> choisir le suédois). Score sauvegardé (meilleur score, tentatives).
- Pour ajouter une section 3 : ajouter une entrée dans `SECTIONS`, puis mettre `section_slug: 'section-3-...'` sur ses decks (et `prerequisite_slug` vers l'unité précédente).

## Reste à faire (dans l'ordre)
1. [x] Migration SQL appliquée.
2. [x] Seed Unité 1 (Salutations) : 10 `vocab` + 7 `phrase` dans `content/sv/a1/unit01-greetings.mjs`, branchée et seedée.
3. [x] `scripts/sync-content.mjs` génère l'audio des nouvelles cartes, remplit `audio_url`, gère les prérequis.
4. [x] Frontend : dashboard sections + verrouillage (fait dans App.tsx).
5. [~] Carte `phrase` : glose affichée en chips mot/traduction sur la face réponse (pas encore au tap).
6. [x] Boucle de révision FSRS (Again/Hard/Good/Easy + upsert `user_card_progress`), faite directement dans App.tsx. Typage corrigé (`Rating` -> `Grade`, ts-fsrs v5).
7. [x] Page d'unité Découvrir -> Pratiquer + 5 types d'exercices (`UnitPractice.tsx`).
8. [x] Seeds Unités 2 à 7 + Section 2 complète. A2, B1 et B2 livrés (issues #2, #3, #4, Unités 8 à 31, Sections 3 à 8, Grammaires A2 / B1 / B2), fusionnés dans `main`. Decks de vocabulaire thématique A2 à B2 ajoutés (issue #18) : 3 023 mots. Reste : la même chose pour FranceCore.
8b. [x] Deck Grammaire V2 réécrit avec le vocabulaire des unités 1 à 7 (`content/sv/a1/grammar.mjs`).
8c. [ ] Le test de la section 1 a été validé avant l'ajout des Unités 2 et 3 : à refaire pour couvrir leur vocabulaire.
9. [ ] Persister les scores d'exercices en DB (et éventuellement faire compter une erreur d'exercice comme un « Again » FSRS).
10. [~] APK Android hors ligne fait (`npm run apk`). Version signée faite (`npm run apk:release`, issue #17). Restent : icône et splash, fiche Play Store.
11. [~] Comptes et synchro (issue #8) : code fait. Restent : projet Supabase Cloud, clés dans `.env.production` et `.env.android`, Cloudflare Pages, import de la progression PC.

## Consignes pour Gemini
- Garder les décisions ci-dessus ; ne pas réintroduire `'thematic'` dans `category`.
- Donner du SQL prêt à coller dans le SQL Editor de Supabase Studio.
- À chaque modification de la DB, fournir la migration ET un récap à ajouter à ce fichier.
