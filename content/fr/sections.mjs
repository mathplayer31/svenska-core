// FranceCore : sections du parcours. Titres et descriptions en suédois (langue de base) et en anglais.
// La section N+1 se débloque quand le test de la section N est réussi. Programme : docs/PROGRAMME-FR.md.
const section = (n, slug, sv, en, descSv, descEn) => ({
  slug,
  course: 'fr',
  title: `Avsnitt ${n}: ${sv}`,
  title_en: `Section ${n}: ${en}`,
  description: descSv,
  description_en: descEn,
  sort_order: n,
  pass_score: 80,
});

export const FR_SECTIONS = [
  // A1
  section(1, 'fr-section-1-premiers-pas', 'Första stegen', 'First steps',
    'Hälsningar, kafé och familj: nog för att klara de första samtalen.',
    'Greetings, café, family: enough to get through your first conversations.'),
  section(2, 'fr-section-2-vie-quotidienne', 'Vardagen', 'Everyday life',
    'Bageri, marknad, restaurang, transporter och väder: klara dig själv i stan.',
    'Bakery, market, restaurant, transport and weather: get by on your own in town.'),
  // A2
  section(3, 'fr-section-3-ma-vie', 'Mitt liv', 'My life',
    'Boende, vardagsrutiner, jobb och fritid: prata om dig själv och din helg.',
    'Home, daily routine, work and free time: talk about yourself and your weekend.'),
  section(4, 'fr-section-4-en-france', 'Klara sig i Frankrike', 'Getting by in France',
    'Hälsa, kläder, högtider och resplaner: vardagssituationer i Frankrike.',
    'Health, clothes, holidays and travel plans: everyday situations in France.'),
  // B1
  section(5, 'fr-section-5-sinstaller', 'Att flytta till Frankrike', 'Settling in France',
    'Myndigheter, grannar, jobbsökande och åsikter: bygg upp ett liv på plats.',
    'Paperwork, neighbours, job hunting and opinions: build a life there.'),
  section(6, 'fr-section-6-comprendre', 'Förstå Frankrike', 'Understanding France',
    'Natur och regioner, nyheter, känslor och berättelser: följ med i samtal och medier.',
    'Nature and regions, news, emotions and stories: follow conversations and the media.'),
  // B2
  section(7, 'fr-section-7-societe', 'Arbetsliv och samhälle', 'Work and society',
    'Yrkesliv, ekonomi, offentlig sektor och miljö: diskutera samhällsfrågor.',
    'Professional life, economy, public services and the environment: discuss social issues.'),
  section(8, 'fr-section-8-nuances', 'Nyanser', 'Nuances',
    'Idiom, argumentation, språkregister och historia: tala naturligt och nyanserat.',
    'Idioms, argument, registers and history: speak naturally and with nuance.'),
];
