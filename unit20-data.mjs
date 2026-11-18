// Unité 20 : Nature & allemansrätten (B1, Section 6). Grammaire : verbes à particule, « det finns ».
import { vocab, phrase, unitDeck } from './content-helpers.mjs';

export const UNIT20_DECK = unitDeck({
  n: 20, slug: 'swedish-unit-20-nature', fr: 'Nature & allemansrätten', en: 'Nature & the right to roam',
  level: 'B1', section: 'section-6-societe', after: 'swedish-unit-19-opinions',
});
const D = UNIT20_DECK.slug;

export const UNIT20_CARDS = [
  vocab(D, 'u20-allemansratten', {
    prompt: 'Le droit d’accès libre à la nature : « l’allemansrätt »', promptEn: 'The right of public access to nature: "the right to roam"',
    sv: 'allemansrätten', fr: 'le droit d’accès à la nature', en: 'the right to roam', ipa: '/ˈalːɛmansˌrɛtːɛn/',
    note: 'Litt. « le droit de tout le monde ». On peut marcher, camper une nuit, cueillir baies et champignons presque partout, à condition de ne rien abîmer : *inte störa, inte förstöra*.',
  }),
  vocab(D, 'u20-naturen', {
    prompt: 'Forêts, lacs et montagnes : « la nature »', promptEn: 'Forests, lakes and mountains: "nature"',
    sv: 'naturen', fr: 'la nature', en: 'nature', ipa: '/naˈtʉːrɛn/',
    note: 'Toujours au défini en suédois : *ute i naturen* (dehors, dans la nature).',
  }),
  vocab(D, 'u20-skogen', {
    prompt: 'Elle couvre 70 % de la Suède : « la forêt »', promptEn: 'It covers 70% of Sweden: "the forest"',
    sv: 'skogen', fr: 'la forêt', en: 'the forest', ipa: '/ˈskuːɡɛn/',
    note: 'Défini de *en skog*. Le **sk** devant **o** reste dur : [sk].',
  }),
  vocab(D, 'u20-sjo', {
    prompt: 'Il y en a près de 100 000 : « un lac »', promptEn: 'There are almost 100,000 of them: "a lake"',
    sv: 'en sjö', fr: 'un lac', en: 'a lake', ipa: '/ɛn ɧøː/',
    note: 'Le **sj** se prononce [ɧ], comme *sju*. La mer : *havet*. Pluriel : *sjöar*.',
    gloss: [['en', 'un', 'a'], ['sjö', 'lac', 'lake']],
  }),
  vocab(D, 'u20-fjallen', {
    prompt: 'Les montagnes du nord : « la montagne (scandinave) »', promptEn: 'The mountains of the north: "the mountains / fells"',
    sv: 'fjällen', fr: 'les montagnes (du nord)', en: 'the mountains / the fells', ipa: '/ˈfjɛlːɛn/',
    note: 'Pluriel défini de *ett fjäll* : montagne au-dessus de la limite des arbres. Le célèbre sentier : *Kungsleden*.',
  }),
  vocab(D, 'u20-vandrar', {
    prompt: 'Marcher longtemps dans la nature : « fait de la randonnée »', promptEn: 'Walking a long way in nature: "hike" (present)',
    sv: 'vandrar', fr: 'fais / fait de la randonnée', en: 'hike / hikes', ipa: '/ˈvandrar/',
    note: 'Infinitif *att vandra*, groupe 1. Une randonnée : *en vandring*.',
  }),
  vocab(D, 'u20-taltar', {
    prompt: 'Dormir sous la toile : « campe » (présent)', promptEn: 'Sleeping under canvas: "camp" (present)',
    sv: 'tältar', fr: 'campe / campes', en: 'camp / camps (in a tent)', ipa: '/ˈtɛltar/',
    note: 'De *ett tält* (une tente). L’allemansrätten autorise une nuit au même endroit, loin des maisons.',
  }),
  vocab(D, 'u20-plockar', {
    prompt: 'Ramasser des fruits ou des fleurs : « cueille » (présent)', promptEn: 'Gathering fruit or flowers: "pick" (present)',
    sv: 'plockar', fr: 'cueille / ramasse', en: 'pick / picks', ipa: '/ˈplɔkːar/',
    note: 'Infinitif *att plocka*. Aussi : ranger (*plocka undan*).',
  }),
  vocab(D, 'u20-svamp', {
    prompt: 'Ce qu’on cueille en automne : « des champignons »', promptEn: 'What you pick in autumn: "mushrooms"',
    sv: 'svamp', fr: 'des champignons', en: 'mushrooms', ipa: '/svamp/',
    note: 'Collectif sans article : *plocka svamp*. La chanterelle, star suédoise : *kantarell*.',
  }),
  vocab(D, 'u20-bar', {
    prompt: 'Myrtilles, airelles… : « des baies »', promptEn: 'Blueberries, lingonberries…: "berries"',
    sv: 'bär', fr: 'des baies', en: 'berries', ipa: '/bæːr/',
    note: 'Mot **ett**, invariable : *ett bär, många bär*. *blåbär* (myrtilles), *lingon* (airelles).',
  }),

  phrase(D, 'u20-ger-alla-ratt', {
    prompt: '« L’allemansrätt donne à tous le droit d’être dans la nature. »', promptEn: '"The right to roam gives everyone the right to be in nature."',
    sv: 'Allemansrätten ger alla rätt att vara i naturen.', fr: 'L’allemansrätt donne à tous le droit d’être dans la nature.', en: 'The right to roam gives everyone the right to be in nature.',
    ipa: '/ˈalːɛmansˌrɛtːɛn jeːr ˈalːa rɛtː at ˈvɑːra ɪ naˈtʉːrɛn/',
    note: '*ger* = donne (le **g** devant **e** se dit [j]). *alla* = tout le monde. *rätt att* + infinitif = le droit de.',
    gloss: [['allemansrätten', 'l’allemansrätt', 'the right to roam'], ['ger', 'donne', 'gives'], ['alla', 'à tous', 'everyone'], ['rätt', 'le droit', 'the right'], ['att', 'de', 'to'], ['vara', 'être', 'be'], ['i', 'dans', 'in'], ['naturen', 'la nature', 'nature']],
  }),
  phrase(D, 'u20-gick-ut-i-skogen', {
    prompt: 'Verbe à particule : « Nous sommes sortis dans la forêt cueillir des champignons. »', promptEn: 'Particle verb: "We went out into the forest and picked mushrooms."',
    sv: 'Vi gick ut i skogen och plockade svamp.', fr: 'Nous sommes sortis dans la forêt cueillir des champignons.', en: 'We went out into the forest and picked mushrooms.',
    ipa: '/viː jɪkː ʉːt ɪ ˈskuːɡɛn ɔ ˈplɔkːadɛ svamp/',
    note: '**gå ut** = sortir. La particule *ut* est **accentuée** à l’oral et change le sens du verbe.',
    gloss: [['vi', 'nous', 'we'], ['gick', 'sommes allés', 'went'], ['ut', 'dehors', 'out'], ['i', 'dans', 'into'], ['skogen', 'la forêt', 'the forest'], ['och', 'et', 'and'], ['plockade', 'avons cueilli', 'picked'], ['svamp', 'champignons', 'mushrooms']],
  }),
  phrase(D, 'u20-far-talta', {
    prompt: '« On a le droit de camper une nuit. »', promptEn: '"You are allowed to camp for one night."',
    sv: 'Man får tälta en natt.', fr: 'On a le droit de camper une nuit.', en: 'You are allowed to camp for one night.',
    ipa: '/manː foːr ˈtɛlta ɛn natː/',
    note: '**får** = permission (Unité 10). *en natt* = une nuit (durée, sans préposition).',
    gloss: [['man', 'on', 'you'], ['får', 'a le droit de', 'are allowed to'], ['tälta', 'camper', 'camp'], ['en', 'une', 'one'], ['natt', 'nuit', 'night']],
  }),
  phrase(D, 'u20-tycker-om-vandra', {
    prompt: 'Verbe à particule : « J’aime faire de la randonnée en montagne. »', promptEn: 'Particle verb: "I like hiking in the mountains."',
    sv: 'Jag tycker om att vandra i fjällen.', fr: 'J’aime faire de la randonnée en montagne.', en: 'I like hiking in the mountains.',
    ipa: '/jɑː ˈtʏkːɛr ˈɔmː at ˈvandra ɪ ˈfjɛlːɛn/',
    note: '**tycka om** (accent sur *om*) = aimer. Sans particule, *tycka* = penser (Unité 19). + **att** + infinitif.',
    gloss: [['jag', 'je', 'I'], ['tycker', 'aime', 'like'], ['om', '(particule)', '(particle)'], ['att', 'de', 'to'], ['vandra', 'randonner', 'hike'], ['i', 'en', 'in'], ['fjällen', 'montagne', 'the mountains']],
  }),
  phrase(D, 'u20-ta-med-skrapet', {
    prompt: 'La règle d’or : « Ramène tes déchets chez toi ! »', promptEn: 'The golden rule: "Take your rubbish home with you!"',
    sv: 'Ta med dig skräpet hem!', fr: 'Ramène tes déchets chez toi !', en: 'Take your rubbish home with you!',
    ipa: '/tɑː meː dɛj ˈskrɛːpɛt hɛmː/',
    note: '**ta med (sig)** = emporter avec soi (cf. *ta med* au café, Unité 2). *skräp* = déchets.',
    gloss: [['ta', 'prends', 'take'], ['med', 'avec', 'with'], ['dig', 'toi', 'you'], ['skräpet', 'les déchets', 'the rubbish'], ['hem', 'à la maison', 'home']],
  }),
  phrase(D, 'u20-halsade-pa', {
    prompt: 'Verbe à particule : « Nous avons rendu visite à mes parents au bord du lac. »', promptEn: 'Particle verb: "We visited my parents by the lake."',
    sv: 'Vi hälsade på mina föräldrar vid sjön.', fr: 'Nous avons rendu visite à mes parents au bord du lac.', en: 'We visited my parents by the lake.',
    ipa: '/viː ˈhɛlsadɛ ˈpoː ˈmiːna fœˈrɛldrar viːd ˈɧøːn/',
    note: '**hälsa på** (accent sur *på*) = rendre visite. Sans particule accentuée, *hälsa på någon* = saluer quelqu’un. Le sens dépend de l’accent.',
    gloss: [['vi', 'nous', 'we'], ['hälsade', 'avons rendu', 'visited'], ['på', 'visite à', '(particle)'], ['mina', 'mes', 'my'], ['föräldrar', 'parents', 'parents'], ['vid', 'au bord de', 'by'], ['sjön', 'le lac', 'the lake']],
  }),
  phrase(D, 'u20-kom-ihag', {
    prompt: '« N’oublie pas de fermer la barrière. »', promptEn: '"Remember to close the gate."',
    sv: 'Kom ihåg att stänga grinden.', fr: 'N’oublie pas de fermer la barrière.', en: 'Remember to close the gate.',
    ipa: '/kɔmː ɪˈhoːɡ at ˈstɛŋːa ˈɡrɪndɛn/',
    note: '**komma ihåg** = se souvenir de (litt. « venir en mémoire »). Impératif : *Kom ihåg!* *stänga* = fermer.',
    gloss: [['kom', 'souviens-toi', 'remember'], ['ihåg', '(particule)', '(particle)'], ['att', 'de', 'to'], ['stänga', 'fermer', 'close'], ['grinden', 'la barrière', 'the gate']],
  }),
  phrase(D, 'u20-det-finns-sjoar', {
    prompt: '« Il y a beaucoup de lacs en Suède. »', promptEn: '"There are many lakes in Sweden."',
    sv: 'Det finns många sjöar i Sverige.', fr: 'Il y a beaucoup de lacs en Suède.', en: 'There are many lakes in Sweden.',
    ipa: '/deː fɪnːs ˈmɔŋːa ˈɧøːar ɪ ˈsværjɛ/',
    note: '**det finns** = il y a (existence). *många* + pluriel dénombrable ; *mycket* + indénombrable (*mycket vatten*).',
    gloss: [['det', 'il', 'there'], ['finns', 'y a', 'are'], ['många', 'beaucoup de', 'many'], ['sjöar', 'lacs', 'lakes'], ['i', 'en', 'in'], ['Sverige', 'Suède', 'Sweden']],
  }),
];
