// Unité 11 : Loisirs & week-end (A2, Section 3). Grammaire : prétérit (gick, såg, åkte, köpte).
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT11_DECK = unitDeck({
  n: 11, slug: 'swedish-unit-11-free-time', fr: 'Loisirs & week-end', en: 'Free time & weekends',
  level: 'A2', section: 'section-3-ma-vie', after: 'swedish-unit-10-work',
});
const D = UNIT11_DECK.slug;

export const UNIT11_CARDS = [
  vocab(D, 'u11-helgen', {
    prompt: 'Samedi et dimanche : « le week-end »', promptEn: 'Saturday and Sunday: "the weekend"',
    sv: 'helgen', fr: 'le week-end', en: 'the weekend', ipa: '/ˈhɛlɡɛn/',
    note: 'Défini de *en helg*. *i helgen* = ce week-end (passé ou à venir selon le temps du verbe). *Trevlig helg!* = Bon week-end !',
  }),
  vocab(D, 'u11-tranar', {
    prompt: 'Faire du sport : « s’entraîne » (présent)', promptEn: 'Doing sport: "work out / train" (present)',
    sv: 'tränar', fr: 's’entraîne / fait du sport', en: 'work out / train', ipa: '/ˈtrɛːnar/',
    note: 'Infinitif *att träna*, groupe 1. Une salle de sport : *ett gym*.',
  }),
  vocab(D, 'u11-film', {
    prompt: 'Au cinéma ou sur ton écran : « un film »', promptEn: 'At the cinema or on your screen: "a film"',
    sv: 'en film', fr: 'un film', en: 'a film / a movie', ipa: '/ɛn fɪlm/',
    note: 'Mot **en** (*filmen*). Le cinéma (lieu) : *bio* (*gå på bio*).',
    gloss: [['en', 'un', 'a'], ['film', 'film', 'film']],
  }),
  vocab(D, 'u11-spelar', {
    prompt: 'Pratiquer un jeu, un sport, un instrument : « joue » (présent)', promptEn: 'A game, a sport, an instrument: "play" (present)',
    sv: 'spelar', fr: 'joue / joues', en: 'play / plays', ipa: '/ˈspeːlar/',
    note: 'Sans préposition : *spela fotboll* (jouer au foot), *spela gitarr* (jouer de la guitare). Pour les enfants qui jouent : *leka*.',
  }),
  vocab(D, 'u11-van', {
    prompt: 'Quelqu’un que tu apprécies : « un(e) ami(e) »', promptEn: 'Someone you like: "a friend"',
    sv: 'en vän', fr: 'un(e) ami(e)', en: 'a friend', ipa: '/ɛn vɛnː/',
    note: 'Pluriel irrégulier : **vänner**. Tu le connais dans *flickvän* et *pojkvän* (Unité 3). Familier : *en kompis*.',
    gloss: [['en', 'un', 'a'], ['vän', 'ami', 'friend']],
  }),
  vocab(D, 'u11-roligt', {
    prompt: 'Ce qui plaît et amuse : « amusant / sympa »', promptEn: 'What is enjoyable: "fun"',
    sv: 'roligt', fr: 'amusant / sympa', en: 'fun', ipa: '/ˈruːlɪt/',
    note: 'Le **g** de *-igt* est muet. *Det var roligt!* = C’était sympa ! Attention : *rolig* veut dire « amusant », pas « drôle et ridicule ».',
  }),
  vocab(D, 'u11-gick', {
    prompt: 'Prétérit de « gå » (aller à pied) : « suis allé(e) / allais »', promptEn: 'Past tense of "gå" (to go on foot): "went"',
    sv: 'gick', fr: 'suis allé(e) / allai', en: 'went', ipa: '/jɪkː/',
    note: 'Verbe fort : *gå, går, gick, har gått*. Le **g** devant **i** est doux : « yik ».',
  }),
  vocab(D, 'u11-sag', {
    prompt: 'Prétérit de « se » (voir) : « ai vu / vis »', promptEn: 'Past tense of "se" (to see): "saw"',
    sv: 'såg', fr: 'ai vu / vis', en: 'saw', ipa: '/soːɡ/',
    note: 'Verbe fort : *se, ser, såg, har sett*.',
  }),
  vocab(D, 'u11-akte', {
    prompt: 'Prétérit de « åka » (aller en véhicule) : « suis allé(e) »', promptEn: 'Past tense of "åka" (to go by vehicle): "went / travelled"',
    sv: 'åkte', fr: 'suis allé(e) (en véhicule)', en: 'went (by vehicle)', ipa: '/ˈɔkːtɛ/',
    note: '**gå** = aller à pied, **åka** = aller en bus, train, voiture. Groupe 2 : *åka, åker, åkte, har åkt*.',
  }),
  vocab(D, 'u11-kopte', {
    prompt: 'Prétérit de « köpa » (acheter) : « ai acheté »', promptEn: 'Past tense of "köpa" (to buy): "bought"',
    sv: 'köpte', fr: 'ai acheté / achetai', en: 'bought', ipa: '/ˈɕœpːtɛ/',
    note: 'Groupe 2 : *köpa, köper, köpte, har köpt*. Le **ö** devient court au prétérit.',
  }),

  // Ajouts (issue #14)
  vocab(D, 'u11-konsert', {
    prompt: 'Écouter de la musique en direct : « un concert »', promptEn: 'Live music: "a concert"',
    sv: 'en konsert', fr: 'un concert', en: 'a concert', ipa: '/ɛn kɔnˈsæʈː/',
    note: 'Le **rt** final se prononce [ʈ], langue recourbée. *Gå på konsert* = aller au concert.',
  }),
  vocab(D, 'u11-simmar', {
    prompt: 'Dans l’eau, à la piscine : « nager »', promptEn: 'In the water, at the pool: "to swim"',
    sv: 'simmar', fr: 'nage / nager', en: 'swims / to swim', ipa: '/ˈsɪmːar/',
    note: 'Infinitif *simma*, 1er groupe. La piscine : *simhallen*.',
  }),
  vocab(D, 'u11-museum', {
    prompt: 'Pour voir des expositions : « un musée »', promptEn: 'To see exhibitions: "a museum"',
    sv: 'ett museum', fr: 'un musée', en: 'a museum', ipa: '/ɛtː mɵˈseːɵm/',
    note: 'Défini : *museet*. Pluriel : *museer*.',
  }),
  vocab(D, 'u11-promenad', {
    prompt: 'Marcher pour le plaisir : « une promenade »', promptEn: 'Walking for pleasure: "a walk"',
    sv: 'en promenad', fr: 'une promenade', en: 'a walk', ipa: '/ɛn prɔmɛˈnɑːd/',
    note: '*Ta en promenad* = faire une promenade. Accent sur la fin.',
  }),
  vocab(D, 'u11-fotboll', {
    prompt: 'Le sport le plus populaire : « le football »', promptEn: 'The most popular sport: "football"',
    sv: 'fotboll', fr: 'le football', en: 'football / soccer', ipa: '/ˈfuːtˌbɔlː/',
    note: 'Sans article : *Jag spelar fotboll.* *fot* (pied) + *boll* (ballon).',
  }),
  vocab(D, 'u11-gjorde', {
    prompt: 'Le passé de *göra* : « a fait »', promptEn: 'Past of *göra*: "did"',
    sv: 'gjorde', fr: 'a fait / faisait', en: 'did', ipa: '/ˈjuːɖɛ/',
    note: '*göra, gör, gjorde, har gjort*. Le **gj** se prononce [j] et le **rd** [ɖ].',
  }),
  phrase(D, 'u11-vad-gjorde-du', {
    prompt: 'Le lundi matin : « Qu’est-ce que tu as fait ce week-end ? »', promptEn: 'On Monday morning: "What did you do at the weekend?"',
    sv: 'Vad gjorde du i helgen?', fr: 'Qu’est-ce que tu as fait ce week-end ?', en: 'What did you do at the weekend?',
    ipa: '/vɑː ˈjuːɖɛ dʉː ɪ ˈhɛlɡɛn/',
    note: '**gjorde** = prétérit de *göra* (faire), irrégulier. Le prétérit sert pour un passé **daté** (*i helgen*, *igår*), là où le français dit « as fait ».',
    gloss: [['vad', 'quoi', 'what'], ['gjorde', 'as fait', 'did'], ['du', 'tu', 'you'], ['i', 'ce', 'at'], ['helgen', 'week-end', 'the weekend']],
  }),
  phrase(D, 'u11-tranar-kvallen', {
    prompt: '« Je fais du sport le soir. »', promptEn: '"I work out in the evening."',
    sv: 'Jag tränar på kvällen.', fr: 'Je fais du sport le soir.', en: 'I work out in the evening.',
    ipa: '/jɑː ˈtrɛːnar poː ˈkvɛlːɛn/',
    note: 'Présent d’habitude, avec *på kvällen* (Unité 9).',
    gloss: [['jag', 'je', 'I'], ['tränar', 'fais du sport', 'work out'], ['på', 'à', 'in'], ['kvällen', 'le soir', 'the evening']],
  }),
  phrase(D, 'u11-gick-pa-bio', {
    prompt: '« Hier, je suis allé au cinéma. » (commence par « hier »)', promptEn: '"Yesterday I went to the cinema." (start with "yesterday")',
    sv: 'Igår gick jag på bio.', fr: 'Hier, je suis allé(e) au cinéma.', en: 'Yesterday I went to the cinema.',
    ipa: '/ɪˈɡoːr jɪkː jɑː poː ˈbiːu/',
    note: 'V2 + prétérit : *igår* (1) **gick** (2) *jag* (3). « Aller au cinéma » = **gå på bio**, sans article.',
    gloss: [['igår', 'hier', 'yesterday'], ['gick', 'suis allé', 'went'], ['jag', 'je', 'I'], ['på', 'au', 'to'], ['bio', 'cinéma', 'cinema']],
  }),
  phrase(D, 'u11-sag-film', {
    prompt: '« Nous avons vu un film. »', promptEn: '"We saw a film."',
    sv: 'Vi såg en film.', fr: 'Nous avons vu un film.', en: 'We saw a film.',
    ipa: '/viː soːɡ ɛn fɪlm/',
    note: 'Un seul mot pour le passé : **såg**, là où le français utilise « avons vu ».',
    gloss: [['vi', 'nous', 'we'], ['såg', 'avons vu', 'saw'], ['en', 'un', 'a'], ['film', 'film', 'film']],
  }),
  phrase(D, 'u11-jatteroligt', {
    prompt: 'Donner ton avis : « C’était super sympa ! »', promptEn: 'Giving your opinion: "It was really fun!"',
    sv: 'Det var jätteroligt!', fr: 'C’était super sympa !', en: 'It was really fun!',
    ipa: '/deː vɑːr ˈjɛtːɛˌruːlɪt/',
    note: 'Le préfixe **jätte-** (Unité 5) marche avec tous les adjectifs : *jätteroligt*, *jättegott*, *jättetrevligt*.',
    gloss: [['det', 'ça', 'it'], ['var', 'était', 'was'], ['jätteroligt', 'super sympa', 'really fun']],
  }),
  phrase(D, 'u11-akte-goteborg', {
    prompt: '« Je suis allé à Göteborg avec mon ami. »', promptEn: '"I went to Göteborg with my friend."',
    sv: 'Jag åkte till Göteborg med min vän.', fr: 'Je suis allé(e) à Göteborg avec mon ami(e).', en: 'I went to Göteborg with my friend.',
    ipa: '/jɑː ˈɔkːtɛ tɪlː jœtɛˈbɔrj meː mɪnː vɛnː/',
    note: '**åkte** : on y est allé en train ou en voiture. À pied, on dirait *gick*.',
    gloss: [['jag', 'je', 'I'], ['åkte', 'suis allé', 'went'], ['till', 'à', 'to'], ['Göteborg', 'Göteborg', 'Göteborg'], ['med', 'avec', 'with'], ['min', 'mon', 'my'], ['vän', 'ami', 'friend']],
  }),
  phrase(D, 'u11-spelar-fotboll', {
    prompt: 'Demander un loisir : « Tu joues au foot ? »', promptEn: 'Asking about a hobby: "Do you play football?"',
    sv: 'Spelar du fotboll?', fr: 'Tu joues au foot ?', en: 'Do you play football?',
    ipa: '/ˈspeːlar dʉː ˈfuːtbɔlː/',
    note: 'Pas de préposition après *spela* : *spela fotboll*, *spela tennis*.',
    gloss: [['spelar', 'joues', 'play'], ['du', 'tu', 'you'], ['fotboll', 'football', 'football']],
  }),
  phrase(D, 'u11-kopte-soffa', {
    prompt: '« Elle a acheté un nouveau canapé. »', promptEn: '"She bought a new sofa."',
    sv: 'Hon köpte en ny soffa.', fr: 'Elle a acheté un nouveau canapé.', en: 'She bought a new sofa.',
    ipa: '/hʊnː ˈɕœpːtɛ ɛn nyː ˈsɔfːa/',
    note: 'Prétérit du groupe 2 : radical + **-te** (*köpte*) ou **-de** (*ringde*). *soffa* vient de l’Unité 8.',
    gloss: [['hon', 'elle', 'she'], ['köpte', 'a acheté', 'bought'], ['en', 'un', 'a'], ['ny', 'nouveau', 'new'], ['soffa', 'canapé', 'sofa']],
  }),
];
