// Sections du parcours (style Duolingo). Chaque section regroupe des unités (decks)
// et se termine par un test. La section N+1 se débloque quand le test de la section N est réussi.
export const SECTIONS = [
  {
    slug: 'section-1-premiers-pas',
    title: 'Section 1 : Premiers pas',
    description: 'Salutations, café, famille : de quoi te débrouiller dans les premières conversations.',
    sort_order: 1,
    pass_score: 80,
  },
  {
    slug: 'section-2-vie-quotidienne',
    title: 'Section 2 : Vie quotidienne',
    description: 'Courses, restaurant, transports, météo : te débrouiller seul(e) en ville.',
    sort_order: 2,
    pass_score: 80,
  },
  // ===================== A2 (anglais intégré) =====================
  {
    slug: 'section-3-ma-vie',
    title: 'Section 3 : Ma vie au quotidien',
    description: 'Logement, journée type, travail et loisirs : parler de toi et raconter ton week-end.',
    title_en: 'Section 3: My daily life',
    description_en: 'Home, daily routine, work and free time: talk about yourself and your weekend.',
    sort_order: 3,
    pass_score: 80,
  },
  {
    slug: 'section-4-en-suede',
    title: 'Section 4 : Se débrouiller en Suède',
    description: 'Santé, vêtements, fêtes et projets : les situations concrètes d’une vie en Suède.',
    title_en: 'Section 4: Getting by in Sweden',
    description_en: 'Health, clothes, holidays and plans: the real situations of life in Sweden.',
    sort_order: 4,
    pass_score: 80,
  },
  // ===================== B1 =====================
  {
    slug: 'section-5-sinstaller',
    title: 'Section 5 : S’installer en Suède',
    description: 'Démarches, logement, emploi et débats : vivre et travailler en Suède au quotidien.',
    title_en: 'Section 5: Settling in Sweden',
    description_en: 'Paperwork, housing, jobs and debates: living and working in Sweden day to day.',
    sort_order: 5,
    pass_score: 80,
  },
  {
    slug: 'section-6-societe',
    title: 'Section 6 : Société & culture',
    description: 'Nature, actualités, émotions et récits : comprendre la Suède et raconter ta vie.',
    title_en: 'Section 6: Society & culture',
    description_en: 'Nature, news, emotions and stories: understanding Sweden and telling your own story.',
    sort_order: 6,
    pass_score: 80,
  },
  // ===================== B2 =====================
  {
    slug: 'section-7-travailler',
    title: 'Section 7 : Travailler en suédois',
    description: 'Vie pro, économie, protection sociale et climat : comprendre et débattre des sujets de société.',
    title_en: 'Section 7: Working in Swedish',
    description_en: 'Work life, economy, welfare and climate: understanding and debating social issues.',
    sort_order: 7,
    pass_score: 80,
  },
  {
    slug: 'section-8-nuances',
    title: 'Section 8 : Nuances & expression',
    description: 'Expressions, argumentation, registres et histoire : parler comme un Suédois.',
    title_en: 'Section 8: Nuance & expression',
    description_en: 'Idioms, argumentation, registers and history: speaking like a Swede.',
    sort_order: 8,
    pass_score: 80,
  },
];
