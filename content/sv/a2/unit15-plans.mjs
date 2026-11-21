// Unité 15 : Projets & vacances (A2, Section 4). Grammaire : futur (ska / kommer att), « om » + V2 dans la principale.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT15_DECK = unitDeck({
  n: 15, slug: 'swedish-unit-15-plans', fr: 'Projets & vacances', en: 'Plans & holidays',
  level: 'A2', section: 'section-4-en-suede', after: 'swedish-unit-14-traditions',
});
const D = UNIT15_DECK.slug;

export const UNIT15_CARDS = [
  vocab(D, 'u15-semester', {
    prompt: 'Les congés payés : « les vacances »', promptEn: 'Paid time off: "holiday / vacation"',
    sv: 'semester', fr: 'les vacances (congés)', en: 'holiday / vacation', ipa: '/sɛˈmɛstɛr/',
    note: 'Sans article : *ha semester*, *vara på semester*. Les Suédois prennent souvent 4 à 5 semaines en juillet.',
  }),
  vocab(D, 'u15-resa', {
    prompt: 'Partir loin : « un voyage »', promptEn: 'Going far away: "a trip / a journey"',
    sv: 'en resa', fr: 'un voyage', en: 'a trip / a journey', ipa: '/ɛn ˈreːsa/',
    accent: 'Accent 2 (Grave)',
    note: 'Aussi un verbe : *att resa* (voyager). *Trevlig resa!* = Bon voyage !',
    gloss: [['en', 'un', 'a'], ['resa', 'voyage', 'trip']],
  }),
  vocab(D, 'u15-bokar', {
    prompt: 'Réserver à l’avance : « réserve » (présent)', promptEn: 'Booking in advance: "book" (present)',
    sv: 'bokar', fr: 'réserve / réservons', en: 'book / books', ipa: '/ˈbuːkar/',
    note: 'Infinitif *att boka*, groupe 1 : *bokade, har bokat*. Rien à voir avec *en bok* (un livre) malgré la ressemblance.',
  }),
  vocab(D, 'u15-planerar', {
    prompt: 'Organiser l’avenir : « prévoit / planifie » (présent)', promptEn: 'Organising the future: "plan" (present)',
    sv: 'planerar', fr: 'prévoit / planifie', en: 'plan / plans', ipa: '/plaˈneːrar/',
    note: 'Les verbes en **-era** viennent souvent du français : *planera*, *studera*, *reparera*. Accent sur **ne**.',
  }),
  vocab(D, 'u15-sommarstuga', {
    prompt: 'La maison de vacances typique (souvent rouge) : « un chalet d’été »', promptEn: 'The typical (often red) holiday home: "a summer cottage"',
    sv: 'en sommarstuga', fr: 'une maison de vacances / un chalet d’été', en: 'a summer cottage', ipa: '/ɛn ˈsɔmːarˌstʉːɡa/',
    accent: 'Accent 2 (Grave)',
    note: '*sommar* (été) + *stuga* (petite maison). Souvent en bois peint en rouge de Falun.',
    gloss: [['en', 'une', 'a'], ['sommarstuga', 'maison de vacances', 'summer cottage']],
  }),
  vocab(D, 'u15-hotell', {
    prompt: 'Pour dormir en voyage : « un hôtel »', promptEn: 'Where you sleep when travelling: "a hotel"',
    sv: 'ett hotell', fr: 'un hôtel', en: 'a hotel', ipa: '/ɛtː hʊˈtɛlː/',
    note: 'Mot **ett**, avec un **h** prononcé. Accent sur **tell**.',
    gloss: [['ett', 'un', 'a'], ['hotell', 'hôtel', 'hotel']],
  }),
  vocab(D, 'u15-flyg', {
    prompt: 'Voyager dans les airs : « un vol / l’avion »', promptEn: 'Travelling by air: "a flight / the plane"',
    sv: 'ett flyg', fr: 'un vol / l’avion', en: 'a flight / the plane', ipa: '/ɛtː flyːɡ/',
    note: '*ta flyget* = prendre l’avion. L’appareil lui-même : *ett flygplan*.',
    gloss: [['ett', 'un', 'a'], ['flyg', 'vol', 'flight']],
  }),
  vocab(D, 'u15-kommer-att', {
    prompt: 'Le futur de prédiction : « va (+ verbe) »', promptEn: 'The future of prediction: "will / is going to"',
    sv: 'kommer att', fr: 'va / allons (futur)', en: 'will / is going to', ipa: '/ˈkɔmːɛr ɔ/',
    note: '**kommer att** + infinitif = ce qui va arriver (prévision). **ska** = ce qu’on a décidé (projet). À l’oral, *att* se dit [ɔ].',
    gloss: [['kommer', 'vient', 'comes'], ['att', 'à', 'to']],
  }),
  vocab(D, 'u15-nasta-vecka', {
    prompt: 'Dans sept jours environ : « la semaine prochaine »', promptEn: 'In about seven days: "next week"',
    sv: 'nästa vecka', fr: 'la semaine prochaine', en: 'next week', ipa: '/ˈnɛsːta ˈvɛkːa/',
    note: 'Pas de préposition : *nästa vecka*, *nästa år*. Cette semaine : *den här veckan*.',
    gloss: [['nästa', 'prochaine', 'next'], ['vecka', 'semaine', 'week']],
  }),
  vocab(D, 'u15-kanske', {
    prompt: 'Pour une incertitude : « peut-être »', promptEn: 'For uncertainty: "maybe / perhaps"',
    sv: 'kanske', fr: 'peut-être', en: 'maybe / perhaps', ipa: '/ˈkanːɧɛ/',
    note: 'Le **sk** devant **e** se prononce [ɧ] : « kann-chè ». En tête de phrase, il déclenche l’inversion V2.',
  }),

  // Ajouts (issue #14)
  vocab(D, 'u15-pass', {
    prompt: 'Le document pour voyager : « un passeport »', promptEn: 'The document for travelling: "a passport"',
    sv: 'ett pass', fr: 'un passeport', en: 'a passport', ipa: '/ɛtː pasː/',
    note: 'Mot **ett**. Aussi : *ett arbetspass* = un service (au travail).',
  }),
  vocab(D, 'u15-resvaska', {
    prompt: 'Pour emporter ses affaires : « une valise »', promptEn: 'To carry your things: "a suitcase"',
    sv: 'en resväska', fr: 'une valise', en: 'a suitcase', ipa: '/ɛn ˈreːsˌvɛska/',
    note: '*resa* (voyage) + *väska* (sac). *Packa resväskan* = faire sa valise.',
  }),
  vocab(D, 'u15-flygplats', {
    prompt: 'D’où partent les avions : « un aéroport »', promptEn: 'Where planes leave from: "an airport"',
    sv: 'en flygplats', fr: 'un aéroport', en: 'an airport', ipa: '/ɛn ˈflyːɡˌplats/',
    note: '*flyg* (vol) + *plats* (endroit). Le plus grand : *Arlanda*.',
  }),
  vocab(D, 'u15-badar', {
    prompt: 'Se baigner dans un lac ou la mer', promptEn: 'Going in a lake or the sea: "to swim / bathe"',
    sv: 'badar', fr: 'se baigne / se baigner', en: 'bathes / goes swimming', ipa: '/ˈbɑːdar/',
    note: 'Infinitif *bada*. Pour le plaisir de l’eau ; nager vraiment : *simma*.',
  }),
  vocab(D, 'u15-ska', {
    prompt: 'Pour parler d’un projet : « vais / vas (faire) »', promptEn: 'For a plan: "will / am going to"',
    sv: 'ska', fr: 'va / vais (faire)', en: 'will / am going to', ipa: '/skɑː/',
    note: 'Projet décidé : *Jag ska åka till Gotland.* Plus neutre pour une prévision : *kommer att*.',
  }),
  vocab(D, 'u15-utomlands', {
    prompt: 'Hors de Suède : « à l’étranger »', promptEn: 'Outside Sweden: "abroad"',
    sv: 'utomlands', fr: 'à l’étranger', en: 'abroad', ipa: '/ˈʉːtɔmˌlands/',
    note: '*Vi åker utomlands i sommar.* Sans préposition.',
  }),
  phrase(D, 'u15-i-sommar', {
    prompt: '« Qu’est-ce que tu vas faire cet été ? »', promptEn: '"What are you doing this summer?"',
    sv: 'Vad ska du göra i sommar?', fr: 'Qu’est-ce que tu vas faire cet été ?', en: 'What are you doing this summer?',
    ipa: '/vɑː skɑː dʉː ˈjøːra ɪ ˈsɔmːar/',
    note: '**i sommar** (sans article) = cet été. *i vintras* = l’hiver dernier. **ska** = projet décidé.',
    gloss: [['vad', 'quoi', 'what'], ['ska', 'vas', 'are going to'], ['du', 'tu', 'you'], ['göra', 'faire', 'do'], ['i', 'ce', 'this'], ['sommar', 'été', 'summer']],
  }),
  phrase(D, 'u15-ska-aka', {
    prompt: 'Un projet : « Je vais aller à Gotland. »', promptEn: 'A plan: "I am going to Gotland."',
    sv: 'Jag ska åka till Gotland.', fr: 'Je vais aller à Gotland.', en: 'I am going to Gotland.',
    ipa: '/jɑː skɑː ˈoːka tɪlː ˈɡɔtland/',
    note: '**ska** + infinitif sans *att*. Gotland, grande île de la Baltique, très prisée l’été.',
    gloss: [['jag', 'je', 'I'], ['ska', 'vais', 'am going to'], ['åka', 'aller', 'go'], ['till', 'à', 'to'], ['Gotland', 'Gotland', 'Gotland']],
  }),
  phrase(D, 'u15-bokat-hotell', {
    prompt: '« Nous avons réservé un hôtel. »', promptEn: '"We have booked a hotel."',
    sv: 'Vi har bokat ett hotell.', fr: 'Nous avons réservé un hôtel.', en: 'We have booked a hotel.',
    ipa: '/viː hɑːr ˈbuːkat ɛtː hʊˈtɛlː/',
    note: 'Parfait (Unité 14) : *har* + supin en **-at** (groupe 1). Le résultat compte maintenant.',
    gloss: [['vi', 'nous', 'we'], ['har', 'avons', 'have'], ['bokat', 'réservé', 'booked'], ['ett', 'un', 'a'], ['hotell', 'hôtel', 'hotel']],
  }),
  phrase(D, 'u15-kommer-att-regna', {
    prompt: 'Une prévision : « Il va pleuvoir demain. »', promptEn: 'A forecast: "It is going to rain tomorrow."',
    sv: 'Det kommer att regna imorgon.', fr: 'Il va pleuvoir demain.', en: 'It is going to rain tomorrow.',
    ipa: '/deː ˈkɔmːɛr ɔ ˈrɛŋna ɪˈmɔrːɔn/',
    note: 'Personne ne décide de la pluie : **kommer att**, pas *ska*. *regna* = infinitif de *regnar* (Unité 7).',
    gloss: [['det', 'il', 'it'], ['kommer', 'va', 'is going'], ['att', 'à', 'to'], ['regna', 'pleuvoir', 'rain'], ['imorgon', 'demain', 'tomorrow']],
  }),
  phrase(D, 'u15-om-fint-vader', {
    prompt: '« S’il fait beau, nous nous baignerons. » (commence par « s’il fait beau »)', promptEn: '"If the weather is nice, we will go swimming." (start with "if")',
    sv: 'Om det är fint väder, badar vi.', fr: 'S’il fait beau, nous nous baignerons.', en: 'If the weather is nice, we will go swimming.',
    ipa: '/ɔm deː æːr fiːnt ˈvɛːdɛr ˈbɑːdar viː/',
    note: 'Toute la subordonnée *Om det är fint väder* compte comme **1re position** : le verbe **badar** vient juste après, puis le sujet *vi*. Le présent suffit pour le futur.',
    gloss: [['om', 'si', 'if'], ['det', 'il', 'it'], ['är', 'fait', 'is'], ['fint', 'beau', 'nice'], ['väder', 'temps', 'weather'], ['badar', 'baignons', 'swim'], ['vi', 'nous', 'we']],
  }),
  phrase(D, 'u15-hyra-stuga', {
    prompt: '« Nous allons louer une maison de vacances. »', promptEn: '"We are going to rent a summer cottage."',
    sv: 'Vi ska hyra en sommarstuga.', fr: 'Nous allons louer une maison de vacances.', en: 'We are going to rent a summer cottage.',
    ipa: '/viː skɑː ˈhyːra ɛn ˈsɔmːarˌstʉːɡa/',
    note: '**hyra** = louer (le verbe de *hyran*, le loyer, Unité 8).',
    gloss: [['vi', 'nous', 'we'], ['ska', 'allons', 'are going to'], ['hyra', 'louer', 'rent'], ['en', 'une', 'a'], ['sommarstuga', 'maison de vacances', 'summer cottage']],
  }),
  phrase(D, 'u15-semester-juli', {
    prompt: '« Je suis en vacances en juillet. »', promptEn: '"I am on holiday in July."',
    sv: 'Jag har semester i juli.', fr: 'Je suis en vacances en juillet.', en: 'I am on holiday in July.',
    ipa: '/jɑː hɑːr sɛˈmɛstɛr ɪ ˈjʉːlɪ/',
    note: 'En suédois, on « a » des vacances. Les mois s’écrivent en minuscule : *i juli*, *i december*.',
    gloss: [['jag', 'je', 'I'], ['har', 'ai', 'have'], ['semester', 'vacances', 'holiday'], ['i', 'en', 'in'], ['juli', 'juillet', 'July']],
  }),
  phrase(D, 'u15-kanske-norge', {
    prompt: '« Peut-être que nous irons en Norvège. » (commence par « peut-être »)', promptEn: '"Maybe we will go to Norway." (start with "maybe")',
    sv: 'Kanske åker vi till Norge.', fr: 'Peut-être que nous irons en Norvège.', en: 'Maybe we will go to Norway.',
    ipa: '/ˈkanːɧɛ ˈoːkɛr viː tɪlː ˈnɔrjɛ/',
    note: '*kanske* en 1re position : le verbe **åker** suit, puis le sujet (V2). Variante sans inversion : *Vi åker kanske till Norge.*',
    gloss: [['kanske', 'peut-être', 'maybe'], ['åker', 'allons', 'go'], ['vi', 'nous', 'we'], ['till', 'en', 'to'], ['Norge', 'Norvège', 'Norway']],
  }),
];
