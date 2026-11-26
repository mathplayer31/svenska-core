# FranceCore: French course syllabus (A1 to B2)

> Issue #9. Updated: 18 Nov 2026.
> Learner: reads Swedish (base language) or English. Language learned: French.

## Structure

8 sections, 31 units, like SvenskaCore. Each unit: **12 words** (`vocab`), **5 to 8 added words or expressions** (issue #14, also `vocab`), then **8 sentences** (`phrase`), so 25 to 28 cards. Each section ends with a test (80 % to pass) that opens the next one.

| Level | Section | Units |
|---|---|---|
| A1 | 1. Första stegen / First steps (`fr-section-1-premiers-pas`) | 1 to 3 |
| A1 | 2. Vardagen / Everyday life (`fr-section-2-vie-quotidienne`) | 4 to 7 |
| A2 | 3. Mitt liv / My life (`fr-section-3-ma-vie`) | 8 to 11 |
| A2 | 4. Klara sig i Frankrike / Getting by in France (`fr-section-4-en-france`) | 12 to 15 |
| B1 | 5. Att flytta till Frankrike / Settling in France (`fr-section-5-sinstaller`) | 16 to 19 |
| B1 | 6. Förstå Frankrike / Understanding France (`fr-section-6-comprendre`) | 20 to 23 |
| B2 | 7. Arbetsliv och samhälle / Work and society (`fr-section-7-societe`) | 24 to 27 |
| B2 | 8. Nyanser / Nuances (`fr-section-8-nuances`) | 28 to 31 |

## Units

File `content/fr/<level>/unitNN-<topic>.mjs`, deck `fr-unit-N-<topic>`, previous unit in `after` (`null` for unit 1).

| N | Deck slug | File | Swedish | English | Content |
|---|---|---|---|---|---|
| 1 | `fr-unit-1-greetings` | `a1/unit01-greetings.mjs` | Hälsningar och kindpussar | Greetings and la bise | bonjour, tu / vous, introducing yourself, la bise |
| 2 | `fr-unit-2-cafe` | `a1/unit02-cafe.mjs` | På kaféet | At the café | ordering, un café / un crème, l'addition, je voudrais |
| 3 | `fr-unit-3-family` | `a1/unit03-family.mjs` | Familjen | Family | family members, possessives mon / ma / mes, age with avoir |
| 4 | `fr-unit-4-shopping` | `a1/unit04-shopping.mjs` | Bageri och marknad | Bakery and market | baguette, croissant, fruit, quantities, prices, combien |
| 5 | `fr-unit-5-restaurant` | `a1/unit05-restaurant.mjs` | På restaurang | At the restaurant | booking, menu, entrée / plat / dessert, doneness |
| 6 | `fr-unit-6-transport` | `a1/unit06-transport.mjs` | Att ta sig fram | Getting around | métro, bus, SNCF train, ticket, asking the way |
| 7 | `fr-unit-7-weather` | `a1/unit07-weather.mjs` | Väder och årstider | Weather and seasons | il fait beau / froid, il pleut, seasons, months |
| 8 | `fr-unit-8-home` | `a2/unit08-home.mjs` | Boendet | Home | rooms, furniture, flat, rent, flat-sharing |
| 9 | `fr-unit-9-day` | `a2/unit09-day.mjs` | Min dag | My day | routine, pronominal verbs, the time, morning / evening |
| 10 | `fr-unit-10-work` | `a2/unit10-work.mjs` | Jobb och studier | Work and studies | jobs, office, university, working hours |
| 11 | `fr-unit-11-free-time` | `a2/unit11-free-time.mjs` | Fritid och helg | Free time and weekend | sport, going out, cinema, telling your weekend in the passé composé |
| 12 | `fr-unit-12-health` | `a2/unit12-health.mjs` | Hälsa | Health | body, pharmacy, doctor, avoir mal à |
| 13 | `fr-unit-13-clothes` | `a2/unit13-clothes.mjs` | Kläder och shopping | Clothes and shopping | clothes, sizes, colours, trying on, les soldes |
| 14 | `fr-unit-14-traditions` | `a2/unit14-traditions.mjs` | Högtider och traditioner | Holidays and traditions | 14 juillet, Noël, galette des rois, fête de la musique |
| 15 | `fr-unit-15-plans` | `a2/unit15-plans.mjs` | Planer och semester | Plans and holidays | holidays, hotel, near future, booking |
| 16 | `fr-unit-16-paperwork` | `b1/unit16-paperwork.mjs` | Myndighetsärenden | Paperwork | préfecture, mairie, dossier, appointment, supporting document |
| 17 | `fr-unit-17-neighbours` | `b1/unit17-neighbours.mjs` | Grannar och umgänge | Neighbours and social life | neighbours, inviting, apéro, doing a favour |
| 18 | `fr-unit-18-job-hunting` | `b1/unit18-job-hunting.mjs` | Söka jobb | Job hunting | CV, cover letter, interview, CDI / CDD |
| 19 | `fr-unit-19-opinions` | `b1/unit19-opinions.mjs` | Säga sin åsikt | Giving your opinion | je pense que, à mon avis, être d'accord, subjunctive of opinion |
| 20 | `fr-unit-20-nature` | `b1/unit20-nature.mjs` | Natur och regioner | Nature and regions | regions, mountains, sea, countryside, hiking |
| 21 | `fr-unit-21-news` | `b1/unit21-news.mjs` | Nyheter och medier | News and media | newspaper, strike, election, reporting information |
| 22 | `fr-unit-22-emotions` | `b1/unit22-emotions.mjs` | Känslor och relationer | Emotions and relationships | feelings, se disputer, se réconcilier |
| 23 | `fr-unit-23-stories` | `b1/unit23-stories.mjs` | Att berätta | Telling stories | imparfait / passé composé, il était une fois, memories |
| 24 | `fr-unit-24-professional` | `b2/unit24-professional.mjs` | Yrkesliv | Professional life | meetings, negotiating, formal email, remote work |
| 25 | `fr-unit-25-economy` | `b2/unit25-economy.mjs` | Ekonomi och konsumtion | Economy and consumption | purchasing power, inflation, budget, bank |
| 26 | `fr-unit-26-public-services` | `b2/unit26-public-services.mjs` | Offentlig service | Public services | Sécurité sociale, mutuelle, pension, state school |
| 27 | `fr-unit-27-climate` | `b2/unit27-climate.mjs` | Miljö | Environment | global warming, recycling, transition, debate |
| 28 | `fr-unit-28-idioms` | `b2/unit28-idioms.mjs` | Idiomatiska uttryck | Idioms | poser un lapin, avoir le cafard, coûter les yeux de la tête |
| 29 | `fr-unit-29-arguing` | `b2/unit29-arguing.mjs` | Argumentera | Arguing a point | connectors, concession, nuancing, refuting |
| 30 | `fr-unit-30-registers` | `b2/unit30-registers.mjs` | Språkregister | Registers | soutenu / courant / familier, verlan, common slang |
| 31 | `fr-unit-31-history` | `b2/unit31-history.mjs` | Historia och kultur | History and culture | Révolution, laïcité, Francophonie, literature |

## Foundations (Foundations tab)

| Order | Slug | Swedish / English | Cards | Opens after |
|---|---|---|---|---|
| 1 | `fr-core-a1` | Uttal / Pronunciation | 12 minimal pairs (`pair`): u / ou, é / è, the three nasals, silent e, r, liaison, silent h, silent -ent, eu / eur, s / z, oi | from the start |
| 2 | `fr-grammar-a1` | Grammatik A1 / A1 grammar | 16 `cloze`: articles, être / avoir, -er verbs, ne ... pas, questions, adjective agreement and position, possessives, il y a, aller + infinitive, partitive, au / du | Unit 7 |
| 3 | `fr-vocab-a1` | Genus: le eller la / Gender: le or la | 12 `vocab`: common nouns with their article and a gender hint | Unit 1 |
| 4 | `fr-grammar-a2` | Grammatik A2 / A2 grammar | 16 `cloze`: passé composé with avoir / être, agreement with être, imparfait, futur simple, pronouns le / la / lui / leur, y / en, comparative, superlative, pronominal verbs, depuis, imperative | Unit 15 |
| 5 | `fr-grammar-b1` | Grammatik B1 / B1 grammar | 16 `cloze`: imparfait or passé composé, plus-que-parfait, conditional, present subjunctive, qui / que / où / dont, si + imparfait, gerund, reported speech, double pronouns | Unit 23 |
| 6 | `fr-grammar-b2` | Grammatik B2 / B2 grammar | 16 `cloze`: subjunctive after a conjunction, past conditional, si + plus-que-parfait, passive, present participle, connectors, emphasis (mise en relief), passé simple (reading), past participle agreement with avoir | Unit 31 |

The sentences of the grammar decks only use the vocabulary of units already open.

## Card format (`content/fr/helpers.mjs`)

```js
vocab(D, 'fr-u1-bonjour', {
  prompt: 'instruction in Swedish', promptEn: 'instruction in English',
  fr: 'bonjour', sv: 'hej / god dag', en: 'hello / good morning',
  ipa: '/bɔ̃.ʒuʁ/',
  note: 'note in Swedish (mini-markdown **bold**, *italic*)', noteEn: 'note in English',
});
phrase(D, 'fr-u1-...', { ...same fields, gloss: [['French', 'Swedish', 'English'], ...] }); // one triple per word
cloze(D, 'fr-gram-a1-...', { prompt: 'instruction with ___ and the infinitive verb in brackets', ... });
pair(D, 'fr-phon-...', { fr: 'tu / tout', words: ['tu', 'tout'], ... });
```

- All slugs start with `fr-` (cards: `fr-uN-...`, `fr-gram-a1-...`, `fr-phon-...`, `fr-gen-...`).
- French is written with the typographic apostrophe (`’`) and a space before `?` `!` `:` as in French.
- Multiple forms are separated by ` / `. No em dash, no emoji.
- Notes explain what surprises a Swedish or English speaker: pronunciation (silent letters, nasals, liaison), gender, agreement, tu / vous, and cultural customs.
- Each level has its `index.mjs` (`DECKS`, `CARDS`), gathered by `content/fr/index.mjs`. `npm run content` rejects a card without Swedish or without English.
