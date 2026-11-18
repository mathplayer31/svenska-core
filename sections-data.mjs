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
];
