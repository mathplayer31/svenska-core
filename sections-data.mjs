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
];
