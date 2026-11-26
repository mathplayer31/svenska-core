// Foundation: B1 grammar. Vocabulary from Units 1 to 23 only. Unlocks after Unit 23.
import { cloze } from '../helpers.mjs';

export const GRAMMAR_B1_DECK = {
  slug: 'swedish-grammar-b1',
  title: '5. Grammaire B1 : subordonnées et particules',
  title_en: '5. B1 Grammar: subordinate clauses and particles',
  category: 'grammar',
  cefr_level: 'B1',
  sort_order: 5,
  prerequisite_slug: 'swedish-unit-23-stories',
};
const D = GRAMMAR_B1_DECK.slug;

export const GRAMMAR_B1_CARDS = [
  cloze(D, 'gram-b1-biff-att', {
    prompt: 'BIFF : Hon säger att hon ___ ___ trött. (inte + är)', promptEn: 'BIFF: Hon säger att hon ___ ___ trött. (inte + är)',
    sv: 'Hon säger att hon inte är trött.', fr: 'Elle dit qu’elle n’est pas fatiguée.', en: 'She says she is not tired.',
    ipa: '/hʊnː ˈsɛjːɛr at hʊnː ˈɪnːtɛ æːr trœtː/',
    note: '**BIFF** (*I Bisats kommer Inte Före det Finita verbet*) : dans une subordonnée, *inte* se place **avant** le verbe conjugué.',
    gloss: [['hon', 'elle', 'she'], ['säger', 'dit', 'says'], ['att', 'que', 'that'], ['hon', 'elle', 'she'], ['inte', 'ne… pas', 'not'], ['är', 'est', 'is'], ['trött', 'fatiguée', 'tired']],
  }),
  cloze(D, 'gram-b1-biff-eftersom', {
    prompt: 'Principale + subordonnée : Vi kommer ___ eftersom vi ___ har tid. (inte, deux fois)', promptEn: 'Main + subordinate: Vi kommer ___ eftersom vi ___ har tid. (inte, twice)',
    sv: 'Vi kommer inte eftersom vi inte har tid.', fr: 'Nous ne venons pas parce que nous n’avons pas le temps.', en: 'We are not coming because we do not have time.',
    ipa: '/viː ˈkɔmːɛr ˈɪnːtɛ ˈɛftɛˌʂɔmː viː ˈɪnːtɛ hɑːr tiːd/',
    note: 'Même phrase, deux places : *kommer **inte*** (principale, après le verbe) et *eftersom vi **inte** har* (subordonnée, avant le verbe).',
    gloss: [['vi', 'nous', 'we'], ['kommer', 'venons', 'are coming'], ['inte', 'ne… pas', 'not'], ['eftersom', 'parce que', 'because'], ['vi', 'nous', 'we'], ['inte', 'ne… pas', 'not'], ['har', 'avons', 'have'], ['tid', 'temps', 'time']],
  }),
  cloze(D, 'gram-b1-biff-aldrig', {
    prompt: 'BIFF avec « aldrig » : Hon sa att hon ___ ___ varit i Norge.', promptEn: 'BIFF with "aldrig": Hon sa att hon ___ ___ varit i Norge.',
    sv: 'Hon sa att hon aldrig hade varit i Norge.', fr: 'Elle a dit qu’elle n’était jamais allée en Norvège.', en: 'She said she had never been to Norway.',
    ipa: '/hʊnː sɑː at hʊnː ˈaldrɪɡ ˈhadːɛ ˈvɑːrɪt ɪ ˈnɔrjɛ/',
    note: 'BIFF vaut pour tous les adverbes de phrase (*aldrig, alltid, inte, kanske*) : ils passent avant le verbe conjugué dans la subordonnée.',
    gloss: [['hon', 'elle', 'she'], ['sa', 'a dit', 'said'], ['att', 'que', 'that'], ['hon', 'elle', 'she'], ['aldrig', 'jamais', 'never'], ['hade', 'avait', 'had'], ['varit', 'été', 'been'], ['i', 'en', 'in'], ['Norge', 'Norvège', 'Norway']],
  }),
  cloze(D, 'gram-b1-som-sujet', {
    prompt: 'Relative sujet : Kvinnan ___ bor ovanför är läkare.', promptEn: 'Subject relative: Kvinnan ___ bor ovanför är läkare.',
    sv: 'Kvinnan som bor ovanför är läkare.', fr: 'La femme qui habite au-dessus est médecin.', en: 'The woman who lives upstairs is a doctor.',
    ipa: '/ˈkvɪnːan sɔmː buːr ˈoːvanˌfœr æːr ˈlɛːkarɛ/',
    note: '**som** sujet (= qui) est **obligatoire**. *kvinnan* = la femme.',
    gloss: [['kvinnan', 'la femme', 'the woman'], ['som', 'qui', 'who'], ['bor', 'habite', 'lives'], ['ovanför', 'au-dessus', 'upstairs'], ['är', 'est', 'is'], ['läkare', 'médecin', 'a doctor']],
  }),
  cloze(D, 'gram-b1-som-objet', {
    prompt: 'Relative complément : Boken ___ jag läser är bra.', promptEn: 'Object relative: Boken ___ jag läser är bra.',
    sv: 'Boken som jag läser är bra.', fr: 'Le livre que je lis est bien.', en: 'The book I am reading is good.',
    ipa: '/ˈbuːkɛn sɔmː jɑː ˈlɛːsɛr æːr brɑː/',
    note: '**som** complément (= que) peut être **omis** : *boken jag läser*. Comme *the book I read* en anglais.',
    gloss: [['boken', 'le livre', 'the book'], ['som', 'que', 'that'], ['jag', 'je', 'I'], ['läser', 'lis', 'am reading'], ['är', 'est', 'is'], ['bra', 'bien', 'good']],
  }),
  cloze(D, 'gram-b1-om-indirect', {
    prompt: '« Si » de question indirecte : Jag vet inte ___ han kommer.', promptEn: 'Indirect "whether": Jag vet inte ___ han kommer.',
    sv: 'Jag vet inte om han kommer.', fr: 'Je ne sais pas s’il vient.', en: 'I don\'t know whether he is coming.',
    ipa: '/jɑː veːt ˈɪnːtɛ ɔm hanː ˈkɔmːɛr/',
    note: '**om** = « si » dans les deux sens : condition (*om det regnar*) et question indirecte (*jag vet inte om*). *vet* = sais (*veta*).',
    gloss: [['jag', 'je', 'I'], ['vet', 'sais', 'know'], ['inte', 'ne… pas', 'not'], ['om', 'si', 'whether'], ['han', 'il', 'he'], ['kommer', 'vient', 'is coming']],
  }),
  cloze(D, 'gram-b1-fast', {
    prompt: 'Concession : Vi gick ut ___ det regnade. (bien que)', promptEn: 'Concession: Vi gick ut ___ det regnade. (although)',
    sv: 'Vi gick ut fast det regnade.', fr: 'Nous sommes sortis bien qu’il pleuvait.', en: 'We went out even though it was raining.',
    ipa: '/viː jɪkː ʉːt fastː deː ˈrɛŋnadɛ/',
    note: '**fast** (oral) = *trots att* (plus soutenu) = bien que. Pas de subjonctif en suédois : le verbe reste à l’indicatif.',
    gloss: [['vi', 'nous', 'we'], ['gick', 'sommes allés', 'went'], ['ut', 'dehors', 'out'], ['fast', 'bien que', 'even though'], ['det', 'il', 'it'], ['regnade', 'pleuvait', 'was raining']],
  }),
  cloze(D, 'gram-b1-tycka-om', {
    prompt: 'Verbe à particule : Jag ___ ___ choklad. (aimer)', promptEn: 'Particle verb: Jag ___ ___ choklad. (to like)',
    sv: 'Jag tycker om choklad.', fr: 'J’aime le chocolat.', en: 'I like chocolate.',
    ipa: '/jɑː ˈtʏkːɛr ˈɔmː ɧʊˈklɑːd/',
    note: '**tycka om** = aimer, avec l’accent sur la particule *om*. *choklad* : le **ch** se dit [ɧ].',
    gloss: [['jag', 'je', 'I'], ['tycker', 'aime', 'like'], ['om', '(particule)', '(particle)'], ['choklad', 'chocolat', 'chocolate']],
  }),
  cloze(D, 'gram-b1-halsa-pa', {
    prompt: 'Verbe à particule : Imorgon ska vi ___ ___ grannarna. (rendre visite)', promptEn: 'Particle verb: Imorgon ska vi ___ ___ grannarna. (to visit)',
    sv: 'Imorgon ska vi hälsa på grannarna.', fr: 'Demain, nous allons rendre visite aux voisins.', en: 'Tomorrow we are going to visit the neighbours.',
    ipa: '/ɪˈmɔrːɔn skɑː viː ˈhɛlsa ˈpoː ˈɡranːaɳa/',
    note: '**hälsa på** (accent sur *på*) = rendre visite. Le pluriel défini de *granne* : *grannarna*.',
    gloss: [['imorgon', 'demain', 'tomorrow'], ['ska', 'allons', 'are going to'], ['vi', 'nous', 'we'], ['hälsa', 'rendre', 'visit'], ['på', 'visite à', '(particle)'], ['grannarna', 'les voisins', 'the neighbours']],
  }),
  cloze(D, 'gram-b1-plusqueparfait', {
    prompt: 'Plus-que-parfait : När vi kom ___ filmen redan ___ . (ha + börja)', promptEn: 'Pluperfect: När vi kom ___ filmen redan ___ . (ha + börja)',
    sv: 'När vi kom hade filmen redan börjat.', fr: 'Quand nous sommes arrivés, le film avait déjà commencé.', en: 'When we arrived, the film had already started.',
    ipa: '/nɛːr viː kɔmː ˈhadːɛ ˈfɪlmɛn ˈreːdan ˈbœrjat/',
    note: '**hade** + supin pour l’action la plus ancienne. La subordonnée en tête impose V2 : **hade** *filmen*.',
    gloss: [['när', 'quand', 'when'], ['vi', 'nous', 'we'], ['kom', 'sommes arrivés', 'arrived'], ['hade', 'avait', 'had'], ['filmen', 'le film', 'the film'], ['redan', 'déjà', 'already'], ['börjat', 'commencé', 'started']],
  }),
  cloze(D, 'gram-b1-innan-v2', {
    prompt: 'Subordonnée en tête : Innan jag äter frukost ___ ___ . (duscha + jag)', promptEn: 'Subordinate clause first: Innan jag äter frukost ___ ___ . (duscha + jag)',
    sv: 'Innan jag äter frukost duschar jag.', fr: 'Avant de prendre mon petit-déjeuner, je me douche.', en: 'Before I have breakfast, I take a shower.',
    ipa: '/ˈɪnːan jɑː ˈɛːtɛr ˈfrʉːkɔst ˈdɵʂːar jɑː/',
    note: 'Toute la subordonnée = 1re position, donc **verbe puis sujet** : *duschar jag*. Erreur classique : ~~*Innan jag äter frukost jag duschar*~~.',
    gloss: [['innan', 'avant que', 'before'], ['jag', 'je', 'I'], ['äter', 'mange', 'have'], ['frukost', 'petit-déjeuner', 'breakfast'], ['duschar', 'me douche', 'shower'], ['jag', 'je', 'I']],
  }),
  cloze(D, 'gram-b1-question-indirecte', {
    prompt: 'Question indirecte : Kan du säga var stationen ___ ? (ordre des mots)', promptEn: 'Indirect question: Kan du säga var stationen ___ ? (word order)',
    sv: 'Kan du säga var stationen ligger?', fr: 'Tu peux me dire où se trouve la gare ?', en: 'Can you tell me where the station is?',
    ipa: '/kanː dʉː ˈsɛjːa vɑːr staˈɧuːnɛn ˈlɪɡːɛr/',
    note: 'Question directe : *Var **ligger** stationen?* Indirecte : *var stationen **ligger*** (sujet avant le verbe, comme dans toute subordonnée).',
    gloss: [['kan', 'peux', 'can'], ['du', 'tu', 'you'], ['säga', 'dire', 'tell'], ['var', 'où', 'where'], ['stationen', 'la gare', 'the station'], ['ligger', 'se trouve', 'is']],
  }),
];
