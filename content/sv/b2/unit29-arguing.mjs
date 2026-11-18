// Unité 29 : Argumenter & nuancer (B2, Section 8). Grammaire : connecteurs logiques et ordre des mots (V2 après adverbe).
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT29_DECK = unitDeck({
  n: 29, slug: 'swedish-unit-29-arguing', fr: 'Argumenter & nuancer', en: 'Arguing & nuancing',
  level: 'B2', section: 'section-8-nuances', after: 'swedish-unit-28-idioms',
});
const D = UNIT29_DECK.slug;

export const UNIT29_CARDS = [
  vocab(D, 'u29-a-ena-sidan', {
    prompt: 'Présenter un premier point de vue : « d’un côté »', promptEn: 'Presenting a first point of view: "on the one hand"',
    sv: 'å ena sidan', fr: 'd’un côté / d’une part', en: 'on the one hand', ipa: '/oː ˈeːna ˈsiːdan/',
    note: 'Toujours suivi de *å andra sidan*. En tête de phrase, il déclenche V2 : *Å ena sidan **är** det…*',
    gloss: [['å', 'de', 'on'], ['ena', 'un', 'the one'], ['sidan', 'côté', 'hand']],
  }),
  vocab(D, 'u29-a-andra-sidan', {
    prompt: 'Présenter le point de vue opposé : « de l’autre côté »', promptEn: 'Presenting the opposite view: "on the other hand"',
    sv: 'å andra sidan', fr: 'de l’autre côté / d’autre part', en: 'on the other hand', ipa: '/oː ˈandra ˈsiːdan/',
    note: '*andra* = autre (forme définie de *annan*).',
    gloss: [['å', 'de', 'on'], ['andra', 'l’autre', 'the other'], ['sidan', 'côté', 'hand']],
  }),
  vocab(D, 'u29-daremot', {
    prompt: 'Pour opposer deux idées : « en revanche »', promptEn: 'To contrast two ideas: "on the other hand / however"',
    sv: 'däremot', fr: 'en revanche / par contre', en: 'however / by contrast', ipa: '/ˈdæːrɛˌmuːt/',
    note: 'Adverbe : il peut ouvrir la proposition (et provoque alors V2) ou se placer après le verbe.',
  }),
  vocab(D, 'u29-dessutom', {
    prompt: 'Pour ajouter un argument : « en plus / de plus »', promptEn: 'To add an argument: "moreover / besides"',
    sv: 'dessutom', fr: 'en plus / de plus', en: 'moreover / besides', ipa: '/dɛˈsʉːtɔm/',
    note: 'Accent sur **su**. Très fréquent pour enchaîner : *och dessutom…*',
  }),
  vocab(D, 'u29-trots-att', {
    prompt: 'Une concession soutenue : « bien que / malgré le fait que »', promptEn: 'A formal concession: "although / despite the fact that"',
    sv: 'trots att', fr: 'bien que / alors que', en: 'although / even though', ipa: '/trɔtːs at/',
    note: 'Version écrite de *fast* (Grammaire B1). Suivi de l’indicatif. Devant un nom : *trots* seul (*trots regnet*).',
    gloss: [['trots', 'malgré', 'despite'], ['att', 'que', 'that']],
  }),
  vocab(D, 'u29-darfor', {
    prompt: 'Pour tirer une conséquence : « c’est pourquoi / donc »', promptEn: 'To draw a consequence: "therefore / that\'s why"',
    sv: 'därför', fr: 'c’est pourquoi / donc', en: 'therefore / that’s why', ipa: '/ˈdærːfœr/',
    note: 'Attention : *därför att* = parce que (cause), *därför* seul = c’est pourquoi (conséquence).',
  }),
  vocab(D, 'u29-alltsa', {
    prompt: 'Pour reformuler ou conclure : « donc / autrement dit »', promptEn: 'To rephrase or conclude: "so / in other words"',
    sv: 'alltså', fr: 'donc / autrement dit', en: 'so / thus', ipa: '/ˈalːtsoː/',
    note: 'À l’oral, souvent réduit en *asså* et utilisé comme mot de remplissage (« genre, bon »).',
  }),
  vocab(D, 'u29-visserligen', {
    prompt: 'Concéder avant d’objecter : « certes »', promptEn: 'Conceding before objecting: "admittedly / granted"',
    sv: 'visserligen', fr: 'certes / il est vrai que', en: 'admittedly / granted', ipa: '/ˈvɪsːɛˌliːɡɛn/',
    note: 'Annonce presque toujours un *men* (mais) : *Visserligen…, men…*',
  }),
  vocab(D, 'u29-i-stallet', {
    prompt: 'Proposer une alternative : « à la place / plutôt »', promptEn: 'Offering an alternative: "instead"',
    sv: 'i stället', fr: 'à la place / plutôt', en: 'instead', ipa: '/ɪ ˈstɛlːɛt/',
    note: 'S’écrit aussi *istället*. *i stället för* = au lieu de (Unité 27).',
    gloss: [['i', 'à', 'in'], ['stället', 'la place', 'stead']],
  }),
  vocab(D, 'u29-till-exempel', {
    prompt: 'Pour illustrer : « par exemple »', promptEn: 'To illustrate: "for example"',
    sv: 'till exempel', fr: 'par exemple', en: 'for example', ipa: '/tɪlː ɛkˈsɛmpɛl/',
    note: 'Abrégé **t.ex.** à l’écrit. Litt. « pour exemple ».',
    gloss: [['till', 'pour', 'for'], ['exempel', 'exemple', 'example']],
  }),

  phrase(D, 'u29-ena-andra-sidan', {
    prompt: '« D’un côté c’est cher, de l’autre c’est bien. »', promptEn: '"On the one hand it is expensive, on the other hand it is good."',
    sv: 'Å ena sidan är det dyrt, å andra sidan är det bra.', fr: 'D’un côté c’est cher, de l’autre c’est bien.', en: 'On the one hand it is expensive, on the other hand it is good.',
    ipa: '/oː ˈeːna ˈsiːdan æːr deː dyːʈ oː ˈandra ˈsiːdan æːr deː brɑː/',
    note: 'Deux fois V2 : *Å ena sidan* **är** *det*, *å andra sidan* **är** *det*.',
    gloss: [['å', 'de', 'on'], ['ena', 'un', 'the one'], ['sidan', 'côté', 'hand'], ['är', 'est', 'is'], ['det', 'c’', 'it'], ['dyrt', 'cher', 'expensive'], ['å', 'de', 'on'], ['andra', 'l’autre', 'the other'], ['sidan', 'côté', 'hand'], ['är', 'est', 'is'], ['det', 'c’', 'it'], ['bra', 'bien', 'good']],
  }),
  phrase(D, 'u29-daremot-klimatet', {
    prompt: '« J’aime la ville, en revanche le climat est rude. »', promptEn: '"I like the city; the climate, however, is harsh."',
    sv: 'Jag gillar staden, däremot är klimatet hårt.', fr: 'J’aime la ville, en revanche le climat est rude.', en: 'I like the city; the climate, however, is harsh.',
    ipa: '/jɑː ˈjɪlːar ˈstɑːdɛn ˈdæːrɛˌmuːt æːr klɪˈmɑːtɛt hoːʈ/',
    note: '*gilla* = aimer bien (oral). *däremot* en tête → **är** *klimatet*. *hård* → *hårt* (neutre).',
    gloss: [['jag', 'je', 'I'], ['gillar', 'aime', 'like'], ['staden', 'la ville', 'the city'], ['däremot', 'en revanche', 'however'], ['är', 'est', 'is'], ['klimatet', 'le climat', 'the climate'], ['hårt', 'rude', 'harsh']],
  }),
  phrase(D, 'u29-dessutom-billig', {
    prompt: '« L’appartement est grand, et en plus il n’est pas cher. »', promptEn: '"The apartment is big and cheap too."',
    sv: 'Lägenheten är stor och dessutom billig.', fr: 'L’appartement est grand, et en plus il n’est pas cher.', en: 'The apartment is big and cheap too.',
    ipa: '/ˈlɛːɡɛnˌheːtɛn æːr stuːr ɔ dɛˈsʉːtɔm ˈbɪlːɪɡ/',
    note: '*och dessutom* + adjectif : addition d’un argument.',
    gloss: [['lägenheten', 'l’appartement', 'the apartment'], ['är', 'est', 'is'], ['stor', 'grand', 'big'], ['och', 'et', 'and'], ['dessutom', 'en plus', 'besides'], ['billig', 'pas cher', 'cheap']],
  }),
  phrase(D, 'u29-trots-att-regnade', {
    prompt: '« Bien qu’il pleuvait, nous sommes sortis. »', promptEn: '"Even though it was raining, we went out."',
    sv: 'Trots att det regnade gick vi ut.', fr: 'Bien qu’il pleuvait, nous sommes sortis.', en: 'Even though it was raining, we went out.',
    ipa: '/trɔtːs at deː ˈrɛŋnadɛ jɪkː viː ʉːt/',
    note: 'Subordonnée en tête → V2 : **gick** *vi*. Pas de subjonctif en suédois.',
    gloss: [['trots', 'bien', 'even'], ['att', 'que', 'though'], ['det', 'il', 'it'], ['regnade', 'pleuvait', 'was raining'], ['gick', 'sommes allés', 'went'], ['vi', 'nous', 'we'], ['ut', 'dehors', 'out']],
  }),
  phrase(D, 'u29-darfor-taxi', {
    prompt: '« Il était tard, c’est pourquoi nous avons pris un taxi. »', promptEn: '"It was late, so we took a taxi."',
    sv: 'Det var sent, därför tog vi en taxi.', fr: 'Il était tard, c’est pourquoi nous avons pris un taxi.', en: 'It was late, so we took a taxi.',
    ipa: '/deː vɑːr seːnt ˈdærːfœr tuːɡ viː ɛn ˈtaksɪ/',
    note: '*därför* en tête de proposition → V2 : **tog** *vi*. *sent* = tard (adverbe).',
    gloss: [['det', 'il', 'it'], ['var', 'était', 'was'], ['sent', 'tard', 'late'], ['därför', 'c’est pourquoi', 'so'], ['tog', 'avons pris', 'took'], ['vi', 'nous', 'we'], ['en', 'un', 'a'], ['taxi', 'taxi', 'taxi']],
  }),
  phrase(D, 'u29-menar-alltsa', {
    prompt: '« Tu veux donc dire qu’on doit attendre ? »', promptEn: '"So you mean we should wait?"',
    sv: 'Du menar alltså att vi ska vänta?', fr: 'Tu veux donc dire qu’on doit attendre ?', en: 'So you mean we should wait?',
    ipa: '/dʉː ˈmeːnar ˈalːtsoː at viː skɑː ˈvɛnta/',
    note: '*mena* = vouloir dire. L’adverbe *alltså* se place après le verbe.',
    gloss: [['du', 'tu', 'you'], ['menar', 'veux dire', 'mean'], ['alltså', 'donc', 'so'], ['att', 'que', 'that'], ['vi', 'nous', 'we'], ['ska', 'devons', 'should'], ['vänta', 'attendre', 'wait']],
  }),
  phrase(D, 'u29-visserligen-ung', {
    prompt: '« Certes il est jeune, mais il a de l’expérience. »', promptEn: '"He is admittedly young, but he has experience."',
    sv: 'Visserligen är han ung, men han har erfarenhet.', fr: 'Certes il est jeune, mais il a de l’expérience.', en: 'He is admittedly young, but he has experience.',
    ipa: '/ˈvɪsːɛˌliːɡɛn æːr hanː ɵŋː mɛnː hanː hɑːr ˈeːrfaːrɛnˌheːt/',
    note: 'Concession + objection : *Visserligen* (V2 : **är** *han*), *men* (ordre normal).',
    gloss: [['visserligen', 'certes', 'admittedly'], ['är', 'est', 'is'], ['han', 'il', 'he'], ['ung', 'jeune', 'young'], ['men', 'mais', 'but'], ['han', 'il', 'he'], ['har', 'a', 'has'], ['erfarenhet', 'expérience', 'experience']],
  }),
  phrase(D, 'u29-till-exempel-taget', {
    prompt: '« Nous pouvons par exemple prendre le train à la place. »', promptEn: '"We could take the train instead, for example."',
    sv: 'Vi kan till exempel ta tåget i stället.', fr: 'Nous pouvons par exemple prendre le train à la place.', en: 'We could take the train instead, for example.',
    ipa: '/viː kanː tɪlː ɛkˈsɛmpɛl tɑː ˈtoːɡɛt ɪ ˈstɛlːɛt/',
    note: 'Les adverbiaux comme *till exempel* se placent après le verbe conjugué, avant l’infinitif.',
    gloss: [['vi', 'nous', 'we'], ['kan', 'pouvons', 'could'], ['till', 'par', 'for'], ['exempel', 'exemple', 'example'], ['ta', 'prendre', 'take'], ['tåget', 'le train', 'the train'], ['i', 'à', 'in'], ['stället', 'la place', 'stead']],
  }),
];
