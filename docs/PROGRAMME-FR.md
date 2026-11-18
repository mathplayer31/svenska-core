# FranceCore : programme du cours de français (A1 à B2)

> Issue #9. Mis à jour : 18 nov 2026.
> Apprenant : lit le suédois (langue de base) ou l'anglais. Langue étudiée : le français.

## Structure

8 sections, 31 unités, comme SvenskaCore. Chaque unité : **12 mots** (`vocab`) puis **8 phrases** (`phrase`), soit 20 cartes. Chaque section se termine par un test (80 % pour valider) qui ouvre la suivante.

| Niveau | Section | Unités |
|---|---|---|
| A1 | 1. Första stegen / First steps (`fr-section-1-premiers-pas`) | 1 à 3 |
| A1 | 2. Vardagen / Everyday life (`fr-section-2-vie-quotidienne`) | 4 à 7 |
| A2 | 3. Mitt liv / My life (`fr-section-3-ma-vie`) | 8 à 11 |
| A2 | 4. Klara sig i Frankrike / Getting by in France (`fr-section-4-en-france`) | 12 à 15 |
| B1 | 5. Att flytta till Frankrike / Settling in France (`fr-section-5-sinstaller`) | 16 à 19 |
| B1 | 6. Förstå Frankrike / Understanding France (`fr-section-6-comprendre`) | 20 à 23 |
| B2 | 7. Arbetsliv och samhälle / Work and society (`fr-section-7-societe`) | 24 à 27 |
| B2 | 8. Nyanser / Nuances (`fr-section-8-nuances`) | 28 à 31 |

## Unités

Fichier `content/fr/<niveau>/unitNN-<sujet>.mjs`, deck `fr-unit-N-<sujet>`, unité précédente en `after` (`null` pour l'unité 1).

| N | Slug du deck | Fichier | Suédois | Anglais | Contenu |
|---|---|---|---|---|---|
| 1 | `fr-unit-1-greetings` | `a1/unit01-greetings.mjs` | Hälsningar och kindpussar | Greetings and la bise | bonjour, tu / vous, se présenter, la bise |
| 2 | `fr-unit-2-cafe` | `a1/unit02-cafe.mjs` | På kaféet | At the café | commander, un café / un crème, l'addition, je voudrais |
| 3 | `fr-unit-3-family` | `a1/unit03-family.mjs` | Familjen | Family | membres de la famille, possessifs mon / ma / mes, âge avec avoir |
| 4 | `fr-unit-4-shopping` | `a1/unit04-shopping.mjs` | Bageri och marknad | Bakery and market | baguette, croissant, fruits, quantités, prix, combien |
| 5 | `fr-unit-5-restaurant` | `a1/unit05-restaurant.mjs` | På restaurang | At the restaurant | réserver, menu, entrée / plat / dessert, cuisson |
| 6 | `fr-unit-6-transport` | `a1/unit06-transport.mjs` | Att ta sig fram | Getting around | métro, bus, train SNCF, billet, demander son chemin |
| 7 | `fr-unit-7-weather` | `a1/unit07-weather.mjs` | Väder och årstider | Weather and seasons | il fait beau / froid, il pleut, saisons, mois |
| 8 | `fr-unit-8-home` | `a2/unit08-home.mjs` | Boendet | Home | pièces, meubles, appartement, loyer, colocation |
| 9 | `fr-unit-9-day` | `a2/unit09-day.mjs` | Min dag | My day | routine, verbes pronominaux, l'heure, matin / soir |
| 10 | `fr-unit-10-work` | `a2/unit10-work.mjs` | Jobb och studier | Work and studies | métiers, bureau, fac, horaires |
| 11 | `fr-unit-11-free-time` | `a2/unit11-free-time.mjs` | Fritid och helg | Free time and weekend | sport, sorties, ciné, raconter son week-end au passé composé |
| 12 | `fr-unit-12-health` | `a2/unit12-health.mjs` | Hälsa | Health | corps, pharmacie, médecin, avoir mal à |
| 13 | `fr-unit-13-clothes` | `a2/unit13-clothes.mjs` | Kläder och shopping | Clothes and shopping | vêtements, tailles, couleurs, essayer, les soldes |
| 14 | `fr-unit-14-traditions` | `a2/unit14-traditions.mjs` | Högtider och traditioner | Holidays and traditions | 14 juillet, Noël, galette des rois, fête de la musique |
| 15 | `fr-unit-15-plans` | `a2/unit15-plans.mjs` | Planer och semester | Plans and holidays | vacances, hôtel, futur proche, réserver |
| 16 | `fr-unit-16-paperwork` | `b1/unit16-paperwork.mjs` | Myndighetsärenden | Paperwork | préfecture, mairie, dossier, rendez-vous, justificatif |
| 17 | `fr-unit-17-neighbours` | `b1/unit17-neighbours.mjs` | Grannar och umgänge | Neighbours and social life | voisins, inviter, apéro, rendre service |
| 18 | `fr-unit-18-job-hunting` | `b1/unit18-job-hunting.mjs` | Söka jobb | Job hunting | CV, lettre de motivation, entretien, CDI / CDD |
| 19 | `fr-unit-19-opinions` | `b1/unit19-opinions.mjs` | Säga sin åsikt | Giving your opinion | je pense que, à mon avis, être d'accord, subjonctif d'opinion |
| 20 | `fr-unit-20-nature` | `b1/unit20-nature.mjs` | Natur och regioner | Nature and regions | régions, montagne, mer, campagne, randonnée |
| 21 | `fr-unit-21-news` | `b1/unit21-news.mjs` | Nyheter och medier | News and media | journal, grève, élection, rapporter une info |
| 22 | `fr-unit-22-emotions` | `b1/unit22-emotions.mjs` | Känslor och relationer | Emotions and relationships | sentiments, se disputer, se réconcilier |
| 23 | `fr-unit-23-stories` | `b1/unit23-stories.mjs` | Att berätta | Telling stories | imparfait / passé composé, il était une fois, souvenirs |
| 24 | `fr-unit-24-professional` | `b2/unit24-professional.mjs` | Yrkesliv | Professional life | réunion, négocier, courriel formel, télétravail |
| 25 | `fr-unit-25-economy` | `b2/unit25-economy.mjs` | Ekonomi och konsumtion | Economy and consumption | pouvoir d'achat, inflation, budget, banque |
| 26 | `fr-unit-26-public-services` | `b2/unit26-public-services.mjs` | Offentlig service | Public services | Sécurité sociale, mutuelle, retraite, école publique |
| 27 | `fr-unit-27-climate` | `b2/unit27-climate.mjs` | Miljö | Environment | réchauffement, recyclage, transition, débat |
| 28 | `fr-unit-28-idioms` | `b2/unit28-idioms.mjs` | Idiomatiska uttryck | Idioms | poser un lapin, avoir le cafard, coûter les yeux de la tête |
| 29 | `fr-unit-29-arguing` | `b2/unit29-arguing.mjs` | Argumentera | Arguing a point | connecteurs, concession, nuancer, réfuter |
| 30 | `fr-unit-30-registers` | `b2/unit30-registers.mjs` | Språkregister | Registers | soutenu / courant / familier, verlan, argot courant |
| 31 | `fr-unit-31-history` | `b2/unit31-history.mjs` | Historia och kultur | History and culture | Révolution, laïcité, francophonie, littérature |

## Fondations (onglet Fondations)

| Ordre | Slug | Suédois / anglais | Cartes | S'ouvre après |
|---|---|---|---|---|
| 1 | `fr-core-a1` | Uttal / Pronunciation | 12 paires minimales (`pair`) : u / ou, é / è, les trois nasales, e muet, r, liaison, h muet, -ent muet, eu / eur, s / z, oi | dès le début |
| 2 | `fr-grammar-a1` | Grammatik A1 / A1 grammar | 16 `cloze` : articles, être / avoir, verbes en -er, ne ... pas, questions, accord et place de l'adjectif, possessifs, il y a, aller + infinitif, partitif, au / du | Unité 7 |
| 3 | `fr-vocab-a1` | Genus: le eller la / Gender: le or la | 12 `vocab` : noms courants avec leur article et un indice de genre | Unité 1 |
| 4 | `fr-grammar-a2` | Grammatik A2 / A2 grammar | 16 `cloze` : passé composé avoir / être, accord avec être, imparfait, futur simple, pronoms le / la / lui / leur, y / en, comparatif, superlatif, pronominaux, depuis, impératif | Unité 15 |
| 5 | `fr-grammar-b1` | Grammatik B1 / B1 grammar | 16 `cloze` : imparfait ou passé composé, plus-que-parfait, conditionnel, subjonctif présent, qui / que / où / dont, si + imparfait, gérondif, discours indirect, doubles pronoms | Unité 23 |
| 6 | `fr-grammar-b2` | Grammatik B2 / B2 grammar | 16 `cloze` : subjonctif après conjonction, conditionnel passé, si + plus-que-parfait, passif, participe présent, connecteurs, mise en relief, passé simple (lecture), accord du participe avec avoir | Unité 31 |

Les phrases des decks de grammaire n'utilisent que le vocabulaire des unités déjà ouvertes.

## Format des cartes (`content/fr/helpers.mjs`)

```js
vocab(D, 'fr-u1-bonjour', {
  prompt: 'consigne en suédois', promptEn: 'consigne en anglais',
  fr: 'bonjour', sv: 'hej / god dag', en: 'hello / good morning',
  ipa: '/bɔ̃.ʒuʁ/',
  note: 'note en suédois (mini-markdown **gras**, *italique*)', noteEn: 'note en anglais',
});
phrase(D, 'fr-u1-...', { ...mêmes champs, gloss: [['français', 'suédois', 'anglais'], ...] }); // un triplet par mot
cloze(D, 'fr-gram-a1-...', { prompt: 'consigne avec ___ et le verbe à l’infinitif entre parenthèses', ... });
pair(D, 'fr-phon-...', { fr: 'tu / tout', words: ['tu', 'tout'], ... });
```

- Tous les slugs commencent par `fr-` (cartes : `fr-uN-...`, `fr-gram-a1-...`, `fr-phon-...`, `fr-gen-...`).
- Le français est écrit avec l'apostrophe typographique (`’`) et l'espace avant `?` `!` `:` comme en français.
- Les formes multiples sont séparées par ` / `. Pas de tiret cadratin, pas d'emoji.
- Les notes expliquent ce qui surprend un Suédois ou un anglophone : prononciation (lettres muettes, nasales, liaison), genre, accord, tu / vous, et les codes culturels.
- Chaque niveau a son `index.mjs` (`DECKS`, `CARDS`), regroupé par `content/fr/index.mjs`. `npm run content` refuse une carte sans suédois ou sans anglais.
