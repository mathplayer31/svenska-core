// Unité 22 : Émotions & relations (B1, Section 6). Grammaire : känna sig + adjectif, accords au pluriel.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT22_DECK = unitDeck({
  n: 22, slug: 'swedish-unit-22-emotions', fr: 'Émotions & relations', en: 'Emotions & relationships',
  level: 'B1', section: 'section-6-societe', after: 'swedish-unit-21-news',
});
const D = UNIT22_DECK.slug;

export const UNIT22_CARDS = [
  vocab(D, 'u22-kanner-mig', {
    prompt: 'Décrire son état intérieur : « je me sens »', promptEn: 'Describing how you feel: "I feel"',
    sv: 'känner mig', fr: 'me sens', en: 'feel (myself)', ipa: '/ˈɕɛnːɛr mɛj/',
    note: '**känna sig** + adjectif, réfléchi : *jag känner mig trött*. Sans réfléchi, *känna* = connaître (*jag känner henne*). Le **k** devant **ä** est doux.',
    gloss: [['känner', 'sens', 'feel'], ['mig', 'me', 'myself']],
  }),
  vocab(D, 'u22-glad', {
    prompt: 'Une émotion positive : « content / joyeux »', promptEn: 'A positive emotion: "happy / glad"',
    sv: 'glad', fr: 'content / joyeux', en: 'happy / glad', ipa: '/ɡlɑːd/',
    note: 'Neutre : *glatt*, pluriel : *glada*. *Glad påsk!* = Joyeuses Pâques.',
  }),
  vocab(D, 'u22-ledsen', {
    prompt: 'Une émotion négative : « triste », ou pour s’excuser « désolé »', promptEn: 'A negative emotion: "sad", or to apologise "sorry"',
    sv: 'ledsen', fr: 'triste / désolé', en: 'sad / sorry', ipa: '/ˈlɛsːɛn/',
    note: 'Le **d** est muet : « lès-sen ». *Jag är ledsen* = je suis triste **ou** je suis désolé, selon le contexte.',
  }),
  vocab(D, 'u22-orolig', {
    prompt: 'Quand on s’inquiète : « inquiet »', promptEn: 'When you worry: "worried"',
    sv: 'orolig', fr: 'inquiet', en: 'worried', ipa: '/ˈuːˌruːlɪɡ/',
    note: '*o-* (préfixe négatif, comme « in- ») + *rolig*, de *ro* (le calme) : « sans calme ». Rien à voir avec *rolig* (amusant). *orolig för* = inquiet pour.',
  }),
  vocab(D, 'u22-stolt', {
    prompt: 'Ce qu’on ressent après une réussite : « fier »', promptEn: 'What you feel after a success: "proud"',
    sv: 'stolt', fr: 'fier', en: 'proud', ipa: '/stɔlt/',
    note: '*stolt över* = fier de. Pluriel : *stolta*. Déjà en **-t**, inchangé au neutre.',
  }),
  vocab(D, 'u22-arg', {
    prompt: 'Une émotion vive : « en colère / fâché »', promptEn: 'A strong emotion: "angry"',
    sv: 'arg', fr: 'en colère / fâché', en: 'angry', ipa: '/arj/',
    note: 'Le **g** après **r** se prononce [j] : « ari ». *arg på någon* = fâché contre quelqu’un.',
  }),
  vocab(D, 'u22-trott', {
    prompt: 'Après une longue journée : « fatigué »', promptEn: 'After a long day: "tired"',
    sv: 'trött', fr: 'fatigué', en: 'tired', ipa: '/trœtː/',
    note: 'Pluriel : *trötta*. *trött på* = las de (*jag är trött på regnet*).',
  }),
  vocab(D, 'u22-besviken', {
    prompt: 'Quand ça ne répond pas aux attentes : « déçu »', promptEn: 'When things fall short: "disappointed"',
    sv: 'besviken', fr: 'déçu', en: 'disappointed', ipa: '/bɛˈsviːkɛn/',
    note: 'Neutre : *besviket*, pluriel : *besvikna*. *besviken på* = déçu par.',
  }),
  vocab(D, 'u22-saknar', {
    prompt: 'Quand quelqu’un te manque : « (il me) manque »', promptEn: 'When you miss someone: "miss"',
    sv: 'saknar', fr: 'manque (à moi)', en: 'miss / misses', ipa: '/ˈsɑːknar/',
    note: 'Structure inversée par rapport au français : *jag saknar dig* = **tu me manques** (litt. « je te manque »).',
  }),
  vocab(D, 'u22-brakar', {
    prompt: 'Se disputer : « se dispute »', promptEn: 'Having an argument: "argue / quarrel"',
    sv: 'bråkar', fr: 'se dispute', en: 'argue / argues', ipa: '/ˈbroːkar/',
    note: 'Pas de réfléchi : *de bråkar* = ils se disputent. *bråka om* = se disputer à propos de.',
  }),

  // Ajouts (issue #14)
  vocab(D, 'u22-radd', {
    prompt: 'Avoir peur : « effrayé »', promptEn: 'Being afraid: "scared"',
    sv: 'rädd', fr: 'qui a peur', en: 'scared / afraid', ipa: '/rɛdː/',
    note: '*Jag är rädd för hundar* = j’ai peur des chiens. *för* introduit ce qui fait peur.',
  }),
  vocab(D, 'u22-nervos', {
    prompt: 'Avant un examen : « nerveux »', promptEn: 'Before an exam: "nervous"',
    sv: 'nervös', fr: 'nerveux / nerveuse', en: 'nervous', ipa: '/nɛrˈvøːs/',
    note: 'Accent sur la fin. *Jag är nervös inför intervjun* (*inför* = avant).',
  }),
  vocab(D, 'u22-lycklig', {
    prompt: 'Plus fort que *glad* : « heureux »', promptEn: 'Stronger than *glad*: "happy"',
    sv: 'lycklig', fr: 'heureux / heureuse', en: 'happy (deeply)', ipa: '/ˈlʏkːlɪɡ/',
    note: '*glad* = content sur le moment ; *lycklig* = heureux dans la vie. *Lycka* = le bonheur.',
  }),
  vocab(D, 'u22-avundsjuk', {
    prompt: 'Vouloir ce que l’autre a : « jaloux »', promptEn: 'Wanting what others have: "envious / jealous"',
    sv: 'avundsjuk', fr: 'jaloux / envieux', en: 'envious / jealous', ipa: '/ˈɑːvɵndsˌɧʉːk/',
    note: '*avund* (envie) + *sjuk* (malade) : littéralement « malade d’envie ».',
  }),
  vocab(D, 'u22-forvanad', {
    prompt: 'Quand on ne s’y attendait pas : « surpris »', promptEn: 'When you didn’t expect it: "surprised"',
    sv: 'förvånad', fr: 'surpris(e)', en: 'surprised', ipa: '/fœrˈvoːnad/',
    note: '*Jag blev förvånad* = j’ai été surpris. *blev* = est devenu.',
  }),
  vocab(D, 'u22-ensam', {
    prompt: 'Sans personne autour : « seul »', promptEn: 'With nobody around: "alone / lonely"',
    sv: 'ensam', fr: 'seul(e)', en: 'alone / lonely', ipa: '/ˈeːnsam/',
    note: 'Pluriel : *ensamma* (le **m** double). *Känner du dig ensam?*',
  }),
  vocab(D, 'u22-kar', {
    prompt: 'Amoureux de quelqu’un', promptEn: 'In love with someone',
    sv: 'kär', fr: 'amoureux / amoureuse', en: 'in love', ipa: '/ɕæːr/',
    note: '*Jag är kär i dig* = je suis amoureux de toi (avec *i*). Le **k** devant **ä** est doux [ɕ].',
  }),
  phrase(D, 'u22-hur-kanner-du-dig', {
    prompt: '« Comment tu te sens aujourd’hui ? »', promptEn: '"How are you feeling today?"',
    sv: 'Hur känner du dig idag?', fr: 'Comment tu te sens aujourd’hui ?', en: 'How are you feeling today?',
    ipa: '/hʉːr ˈɕɛnːɛr dʉː dɛj ɪˈdɑː/',
    note: 'Le pronom réfléchi suit le sujet dans la question : *känner du **dig***.',
    gloss: [['hur', 'comment', 'how'], ['känner', 'sens', 'feel'], ['du', 'tu', 'you'], ['dig', 'te', 'yourself'], ['idag', 'aujourd’hui', 'today']],
  }),
  phrase(D, 'u22-lite-trott', {
    prompt: '« Je me sens un peu fatigué. »', promptEn: '"I feel a bit tired."',
    sv: 'Jag känner mig lite trött.', fr: 'Je me sens un peu fatigué.', en: 'I feel a bit tired.',
    ipa: '/jɑː ˈɕɛnːɛr mɛj ˈliːtɛ trœtː/',
    note: '**lite** = un peu (Unité 5), devant l’adjectif.',
    gloss: [['jag', 'je', 'I'], ['känner', 'sens', 'feel'], ['mig', 'me', 'myself'], ['lite', 'un peu', 'a bit'], ['trött', 'fatigué', 'tired']],
  }),
  phrase(D, 'u22-blev-ledsen', {
    prompt: '« Elle est devenue triste quand elle l’a entendu. »', promptEn: '"She became sad when she heard it."',
    sv: 'Hon blev ledsen när hon hörde det.', fr: 'Elle est devenue triste quand elle l’a entendu.', en: 'She became sad when she heard it.',
    ipa: '/hʊnː bleːv ˈlɛsːɛn nɛːr hʊnː ˈhøːɖɛ deː/',
    note: '**bli** = devenir, pour un changement d’état (*blev ledsen*). *höra* = entendre (*hörde, har hört*).',
    gloss: [['hon', 'elle', 'she'], ['blev', 'est devenue', 'became'], ['ledsen', 'triste', 'sad'], ['när', 'quand', 'when'], ['hon', 'elle', 'she'], ['hörde', 'a entendu', 'heard'], ['det', 'le', 'it']],
  }),
  phrase(D, 'u22-orolig-for-bror', {
    prompt: '« Je m’inquiète pour mon frère. »', promptEn: '"I am worried about my brother."',
    sv: 'Jag är orolig för min bror.', fr: 'Je m’inquiète pour mon frère.', en: 'I am worried about my brother.',
    ipa: '/jɑː æːr ˈuːˌruːlɪɡ fœr mɪnː bruːr/',
    note: 'Préposition fixe : *orolig **för***. Chaque adjectif d’émotion a la sienne : *stolt över*, *arg på*, *besviken på*.',
    gloss: [['jag', 'je', 'I'], ['är', 'suis', 'am'], ['orolig', 'inquiet', 'worried'], ['för', 'pour', 'about'], ['min', 'mon', 'my'], ['bror', 'frère', 'brother']],
  }),
  phrase(D, 'u22-stolta-over-dig', {
    prompt: '« Nous sommes tellement fiers de toi ! »', promptEn: '"We are so proud of you!"',
    sv: 'Vi är så stolta över dig!', fr: 'Nous sommes tellement fiers de toi !', en: 'We are so proud of you!',
    ipa: '/viː æːr soː ˈstɔlta ˈøːvɛr dɛj/',
    note: 'Sujet pluriel → adjectif au pluriel en **-a** : *stolta*. *så* = tellement.',
    gloss: [['vi', 'nous', 'we'], ['är', 'sommes', 'are'], ['så', 'tellement', 'so'], ['stolta', 'fiers', 'proud'], ['över', 'de', 'of'], ['dig', 'toi', 'you']],
  }),
  phrase(D, 'u22-saknar-familj', {
    prompt: '« Ma famille me manque. »', promptEn: '"I miss my family."',
    sv: 'Jag saknar min familj.', fr: 'Ma famille me manque.', en: 'I miss my family.',
    ipa: '/jɑː ˈsɑːknar mɪnː faˈmɪlj/',
    note: 'En suédois, c’est **toi** qui « manques » la chose : *jag saknar* + ce qui manque. Comme l’anglais *I miss*.',
    gloss: [['jag', 'je', 'I'], ['saknar', 'manque de', 'miss'], ['min', 'ma', 'my'], ['familj', 'famille', 'family']],
  }),
  phrase(D, 'u22-brakar-om-pengar', {
    prompt: '« Ils se disputent à propos de l’argent. »', promptEn: '"They argue about money."',
    sv: 'De bråkar om pengar.', fr: 'Ils se disputent à propos de l’argent.', en: 'They argue about money.',
    ipa: '/dɔmː ˈbroːkar ɔm ˈpɛŋːar/',
    note: '*de* = ils / elles, prononcé [dɔmː]. *pengar* (argent) est toujours au pluriel.',
    gloss: [['de', 'ils', 'they'], ['bråkar', 'se disputent', 'argue'], ['om', 'à propos de', 'about'], ['pengar', 'argent', 'money']],
  }),
  phrase(D, 'u22-arg-men-glad', {
    prompt: '« Il était en colère, mais maintenant il est de nouveau content. »', promptEn: '"He was angry, but now he is happy again."',
    sv: 'Han var arg men nu är han glad igen.', fr: 'Il était en colère, mais maintenant il est de nouveau content.', en: 'He was angry, but now he is happy again.',
    ipa: '/hanː vɑːr arj mɛnː nʉː æːr hanː ɡlɑːd ɪˈjɛn/',
    note: 'Après *men* (mais), *nu* (maintenant) ouvre la 2e proposition : V2, donc *nu **är** han*. *igen* = de nouveau.',
    gloss: [['han', 'il', 'he'], ['var', 'était', 'was'], ['arg', 'en colère', 'angry'], ['men', 'mais', 'but'], ['nu', 'maintenant', 'now'], ['är', 'est', 'is'], ['han', 'il', 'he'], ['glad', 'content', 'happy'], ['igen', 'de nouveau', 'again']],
  }),
];
