# SvenskaCore : Handoff (à donner à Gemini)

> Mise à jour : 18 nov 2026 (nuit) : Unités 2 à 7, Section 2, exercices, grammaire V2 réécrite, mode hors ligne + APK Android, dépôt git, refonte visuelle, sélecteur de langue FR / EN (issue #1), niveaux A2, B1 et B2 (issues #2 à #4).
> Utilisateur francophone, débutant complet en suédois. Réponds en français.

## Goal
App d'apprentissage du suédois, local-first, style Mjølnir, pour **PC Web** et **APK Android**.

## Tech Stack
- **Frontend :** React 19 + TypeScript + Vite + Tailwind CSS v4 (`@tailwindcss/vite`)
- **Mobile :** Capacitor (`@capacitor/core`, `@capacitor/android`)
- **SRS :** `ts-fsrs`
- **Backend/DB :** Supabase local (Docker) -> PostgreSQL + Storage (bucket public `card-audio`)
- **Audio :** `edge-tts` (`sv-SE-SofieNeural`) via `generate-audio.mjs`

## Environnement local
- API : `http://127.0.0.1:54321`, Studio : `http://127.0.0.1:54323`
- Postgres : `postgresql://postgres:postgres@127.0.0.1:54322/postgres`
- `.env.local` : `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Schéma complet de la base : `supabase/schema.sql` (à coller dans le SQL Editor pour une base neuve).
- Dépôt GitHub **privé** : https://github.com/mathplayer31/svenska-core (branche `main`, remote `origin`).

## Niveaux B1 et B2 : AJOUTÉS (19 nov 2026, issues #3 et #4)
- B1 = Section 5 « S'installer en Suède » (Unités 16 à 19 : démarches, logement & voisinage, travail & entretien, avis & débats) + Section 6 « Société & culture » (Unités 20 à 23 : nature & allemansrätten, médias, émotions, raconter au passé) + deck « 5. Grammaire B1 » (BIFF, *som*, *om*, *fast*, verbes à particule, plus-que-parfait, questions indirectes). Fichiers `unit16-data.mjs` à `unit23-data.mjs`, `grammar-b1-data.mjs`.
- B2 = Section 7 « Travailler en suédois » (Unités 24 à 27 : vie pro, économie, santé & société, climat) + Section 8 « Nuances & expression » (Unités 28 à 31 : expressions idiomatiques, argumenter, registres, histoire & identité) + deck « 6. Grammaire B2 » (passif -s et bli, participes, conditionnel, discours rapporté, verbes réciproques et déponents, dérivation -bar). Fichiers `unit24-data.mjs` à `unit31-data.mjs`, `grammar-b2-data.mjs`.
- Même format que l'A2 (`content-helpers.mjs`, anglais intégré). Total : 631 cartes (A1 163, A2 156, B1 156, B2 156).
- Fusionné dans `main` le 19 nov 2026 (avance rapide jusqu'au commit a17bd80) ; branches supprimées, issues #2, #3 et #4 fermées.
- Rendu des notes corrigé : l'italique peut contenir du gras ou être barré (`renderInlineMd` récursif dans `App.tsx`).

## Niveau A2 : AJOUTÉ (18 nov 2026, issue #2)
- Programme complet A1 à B2 : `docs/PROGRAMME.md` (sections, unités, thèmes, grammaire). B1 et B2 restent à produire, une issue par niveau.
- A2 = Section 3 « Ma vie au quotidien » (Unités 8 à 11) + Section 4 « Se débrouiller en Suède » (Unités 12 à 15), 18 cartes par unité (10 mots + 8 phrases), plus le deck de fondation « 4. Grammaire A2 » (12 cartes, débloqué après l'Unité 15). 156 cartes A2, 319 au total.
- Fichiers : `unit8-data.mjs` à `unit15-data.mjs`, `grammar-a2-data.mjs`. Écriture compacte via `content-helpers.mjs` (`vocab`, `phrase`, `cloze`, `unitDeck`) : chaque carte porte son anglais dans `en`, et la glose s'écrit en triplets `[suédois, français, anglais]`. Les sections A2 portent `title_en` / `description_en` dans `sections-data.mjs`. `content-en.mjs` ne sert plus qu'à l'A1.
- Pour l'audio d'une carte dont le texte n'est pas lisible tel quel (ex. *Ring 1177…*), `words` donne le texte à prononcer (*Ring elva sjuttiosju…*).
- Tableau de bord : sections groupées par niveau CECR (déduit du `cefr_level` des decks de la section), et l'en-tête affiche le niveau de la dernière section ouverte.

## Sélecteur de langue FR / EN : AJOUTÉ (18 nov 2026, issue #1)
- Bouton FR / EN dans l'en-tête de l'accueil, mémorisé sur l'appareil (`localStorage`, clé `svenska.lang`). Français par défaut.
- Interface : `src/i18n.tsx` (dictionnaires `fr` / `en`, `I18nProvider` dans `main.tsx`, hook `useI18n()` qui donne `{ lang, setLang, t }`). Tout nouveau texte d'interface passe par ce fichier, dans les deux langues.
- Contenu : `content-en.mjs` donne par slug la consigne, la traduction et la glose anglaises de chaque carte (`CARDS_EN`), plus les titres des decks (`DECKS_EN`) et des sections (`SECTIONS_EN`). Les notes de grammaire (`explanation_md`) restent en français (libellé « Note (in French) » en mode anglais).
- `generate-audio.mjs` vérifie le contenu anglais **avant** toute écriture en base et s'arrête avec la liste des manques (carte sans traduction, glose anglaise de longueur différente, deck ou section sans titre anglais).
- Colonnes : `cards.english_translation` contient désormais **vraiment l'anglais** ; le français est dans `cards.french_translation` (dans les fichiers `*-data.mjs`, le champ `english_translation` contient toujours le français, nom historique). `cards.gloss` = `[{"sv","fr","en"}]`. Nouvelles colonnes `cards.prompt_en`, `decks.title_en`, `sections.title_en`, `sections.description_en`.
- Migration appliquée (fichier `supabase/migration_langue_en.sql`) :
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
- Décision : l'APK fonctionne **100 % hors ligne**. Pas de synchro de progression entre PC et téléphone pour l'instant.
- `src/dataSource.ts` : couche d'accès aux données. Web = Supabase ; Android (`Capacitor.isNativePlatform()`) ou `VITE_DATA_SOURCE=local` (fichier `.env.android`) = contenu embarqué `src/content.json` + progression en `localStorage` (clés `svenska.cardProgress`, `svenska.sectionProgress`).
- `src/content.json` est **généré** par `generate-audio.mjs` à chaque synchro (sections, decks, cartes ; les uuid sont remplacés par les slugs, donc la progression locale survit à un re-seed). Les MP3 de `public/audio` sont embarqués dans l'APK.
- `capacitor.config.json` (le `.ts` a été abandonné : Capacitor ne sait pas le lire avec TypeScript 7). Wrapper Gradle passé en **9.1.0** (le seul JDK installé est le JDK 25 d'Android Studio).
- Build : `npm run apk` → `scripts/build-android.mjs`. Le script mesure cœurs / charge CPU / RAM libre et adapte le build (1 à 4 workers Gradle, JVM 1 à 3 Go, priorité basse, sans daemon) pour ne pas saturer le PC. APK debug : `android/app/build/outputs/apk/debug/app-debug.apk`.
- Test local du mode hors ligne dans le navigateur : `npm run dev:local`.
- Les notes (`explanation_md`) sont rendues avec un mini-markdown (`**gras**`, `*italique*`, `~~barré~~`).

## Grammaire V2 réécrite : AJOUTÉ (18 nov 2026)
- `grammar-data.mjs` : 12 cartes `cloze_grammar` qui n'utilisent que le vocabulaire des unités 1 à 7 (V2 avec idag/imorgon/igår, questions, *inte*, *sin/hans*, accord en -t, forme définie, *det här tåget*). Prérequis du deck : **Unité 7**.
- Les 8 anciennes cartes (*åkte*, *jobbar hemifrån*, *eftersom*…) ont été supprimées. `generate-audio.mjs` supprime désormais toute carte en base dont le slug n'existe plus dans les fichiers de données (et sa progression).

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
- Les decks et cartes sont définis dans **`generate-audio.mjs`** (`DECKS_DATA`, `CARDS_DATA`) et poussés par `upsert` (onConflict `slug`). Lancer : `node --env-file=.env.local generate-audio.mjs`. Ne pas seeder à la main en SQL.
- Les nouvelles unités sont dans des modules séparés (`unit1-data.mjs`, etc.) exportant un deck + un tableau de cartes, importés dans le script.
- Convention des champs d'une carte : `swedish_prompt` = consigne/indice **en français** ; `swedish_target` = texte suédois ; `english_translation` contient en réalité la **traduction française** (nom de colonne trompeur, à renommer plus tard) ; `french_translation` est rempli avec la même valeur ; `words` = textes dont on génère un MP3 chacun.
- Audio : MP3 générés en local dans `./public/audio/<slug>_<n>.mp3` (cache si déjà présent), `audio_url` = chemins `/audio/...` joints par `|`. (Le bucket Supabase `card-audio` n'est pas utilisé par le script.)
- Nouveaux champs de carte : `gloss` (jsonb `[{sv, fr}]`) et `french_translation`.

## Frontend (`App.tsx`) : état
- Charge les nouveaux champs : `decks.track/unit_number/prerequisite_deck_id`, `cards.gloss/french_translation`.
- Dashboard en 2 sections : « Parcours Thématique » puis « Fondations Linguistiques ».
- Verrouillage : un deck est débloqué quand toutes les cartes de son deck prérequis ont été vues au moins une fois (`state !== 0`). La session globale « ALL » exclut les decks verrouillés et met les nouvelles cartes du parcours thématique en premier.
- Type de carte `phrase` géré ; affichage de la glose mot à mot sur la face réponse.
- `generate-audio.mjs` : `generateMp3()` avec timeout 30 s, 3 tentatives et `stdio: 'inherit'` (fait ; un MP3 tronqué est supprimé automatiquement).
- Prérequis : un deck déclare `prerequisite_slug` (dans `DECKS_DATA` ou `unit*-data.mjs`) ; le script le résout en `prerequisite_deck_id` après l'upsert de tous les decks. Grammaire + vocab/genres -> Unité 1 ; Unité 2 -> Unité 1.

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
- `unit2-data.mjs` : 10 `vocab` (fika, en bryggkaffe, en kanelbulle, ett te, mjölk, en kopp, och, med, ett kort, här) + 8 `phrase` (Ska vi fika?, Jag tar en bryggkaffe och en kanelbulle tack, En kopp te med mjölk tack, Ta med eller äta här?, Äta här tack, Vad kostar det?, Kan jag betala med kort?, Det var gott!). Section 1, `unit_number` 2, prérequis Unité 1.

## Unités 3 à 7 + Section 2 : SEEDÉES (18 nov 2026)
Chaque unité a pour prérequis la précédente (chaîne U1 → U7). Le plan initial a été découpé plus finement : restaurant et météo ont leur propre unité.

| Unité | Section | Fichier | Contenu | Point de grammaire |
|---|---|---|---|---|
| U3 Famille & relations | 1 | `unit3-data.mjs` | 12 mots (familj, mamma, pappa, föräldrar, syster, bror, barn, flickvän, pojkvän, svärmor, han, hon) + 10 phrases | min/mitt/mina ; piège **sin/sitt/sina vs hans/hennes** (*Hon fikar med sin syster* vs *…hennes syster*) |
| U4 Courses : ICA & Systembolaget | 2 | `unit4-data.mjs` | 12 mots (affär, köper, påse, kvitto, bröd, ost, frukt, vin, öl, kronor, dyrt, billigt) + 9 phrases | défini suffixé (*kvittot*), *ni*, *Det blir…*, adjectif en -t après *det är* |
| U5 Au restaurant | 2 | `unit5-data.mjs` | 10 mots (restaurang, bord, meny, vatten, kött, fisk, vegetarisk, två, notan, gärna) + 9 phrases | *Kan jag få…?*, *jätte-*, *var för sig* |
| U6 Déplacements & transports | 2 | `unit6-data.mjs` | 11 mots (buss, tunnelbana, tåg, biljett, station, spår, nästa, försenad, vänster, höger, till) + 8 phrases | accord *försenat*, *den här bussen* (double défini) |
| U7 Météo & temps | 2 | `unit7-data.mjs` | 10 mots (vädret, solen, regnar, snöar, kallt, varmt, blåsigt, imorgon, igår, grader) + 9 phrases | **V2** avec adverbe de temps en tête (*Idag är det kallt*, *Imorgon snöar det*), *det* impersonnel |

- `sections-data.mjs` : ajout de `section-2-vie-quotidienne` (pass_score 80). La section 2 regroupe U4 à U7 et a son test de fin de section (généré automatiquement).
- Total en base : 159 cartes. Mots/notions introduits en phrase sans carte dédiée, toujours glosés : vill ha, ni, hundra, var, ligger, på, få, lite, för, sig, när, går, tre, tio, sväng, sedan, skiner, vilket, fint, hennes, hans.

## Sections + tests (style Duolingo) : AJOUTÉ
- Hiérarchie : **Section → Unités (decks thématiques) → cartes**. Les fondations (phonétique, grammaire, vocab/genres) restent hors section.
- DB (fichier `migration_sections.sql`, à exécuter dans le SQL Editor) : table `sections` (`slug`, `title`, `description`, `sort_order`, `pass_score` défaut 80), colonne `decks.section_id`, table `user_section_progress` (`user_id`, `section_id`, `best_score`, `passed`, `attempts`, `last_attempt`). RLS dev permissive.
- Données : `sections-data.mjs` (tableau `SECTIONS`). Un deck rattache sa section via `section_slug` dans `unit*-data.mjs` ; `generate-audio.mjs` upserte les sections, retire `section_slug` et met `section_id` avant d'upserter le deck.
- Règles : la section 1 est toujours ouverte ; la section N+1 s'ouvre quand le test de la section N est réussi (≥ `pass_score`). Les decks d'une section verrouillée sont verrouillés. Le test devient disponible quand toutes les cartes de la section ont été vues au moins une fois.
- Test (`SectionTest.tsx`) : 10 QCM générés depuis les cartes `vocab`/`phrase` de la section (1 question sur 2 : écoute -> choisir la traduction ; sinon traduction FR -> choisir le suédois). Score sauvegardé (meilleur score, tentatives).
- Pour ajouter une section 3 : ajouter une entrée dans `SECTIONS`, puis mettre `section_slug: 'section-3-...'` sur ses decks (et `prerequisite_slug` vers l'unité précédente).

## Reste à faire (dans l'ordre)
1. [x] Migration SQL appliquée.
2. [x] Seed Unité 1 (Salutations) : 10 `vocab` + 7 `phrase` dans `unit1-data.mjs`, branchée et seedée.
3. [x] `generate-audio.mjs` génère l'audio des nouvelles cartes, remplit `audio_url`, gère les prérequis.
4. [x] Frontend : dashboard sections + verrouillage (fait dans App.tsx).
5. [~] Carte `phrase` : glose affichée en chips mot/traduction sur la face réponse (pas encore au tap).
6. [x] Boucle de révision FSRS (Again/Hard/Good/Easy + upsert `user_card_progress`), faite directement dans App.tsx. Typage corrigé (`Rating` -> `Grade`, ts-fsrs v5).
7. [x] Page d'unité Découvrir -> Pratiquer + 5 types d'exercices (`UnitPractice.tsx`).
8. [x] Seeds Unités 2 à 7 + Section 2 complète. A2, B1 et B2 livrés (issues #2, #3, #4, Unités 8 à 31, Sections 3 à 8, Grammaires A2 / B1 / B2), fusionnés dans `main`. Prochaine étape possible : decks de vocabulaire thématique plus denses pour approcher les 3 000 mots d'un vrai B2.
8b. [x] Deck Grammaire V2 réécrit avec le vocabulaire des unités 1 à 7 (`grammar-data.mjs`).
8c. [ ] Le test de la section 1 a été validé avant l'ajout des Unités 2 et 3 : à refaire pour couvrir leur vocabulaire.
9. [ ] Persister les scores d'exercices en DB (et éventuellement faire compter une erreur d'exercice comme un « Again » FSRS).
10. [~] APK Android hors ligne fait (`npm run apk`). Restent : icône et splash, APK signé (release), synchro de progression PC <-> téléphone, auth + restriction RLS.

## Consignes pour Gemini
- Garder les décisions ci-dessus ; ne pas réintroduire `'thematic'` dans `category`.
- Donner du SQL prêt à coller dans le SQL Editor de Supabase Studio.
- À chaque modification de la DB, fournir la migration ET un récap à ajouter à ce fichier.
