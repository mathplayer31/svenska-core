// Unité 21 : Médias & actualités (B1, Section 6). Grammaire : plus-que-parfait (hade + supin), « enligt ».
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT21_DECK = unitDeck({
  n: 21, slug: 'swedish-unit-21-news', fr: 'Médias & actualités', en: 'Media & news',
  level: 'B1', section: 'section-6-societe', after: 'swedish-unit-20-nature',
});
const D = UNIT21_DECK.slug;

export const UNIT21_CARDS = [
  vocab(D, 'u21-nyheterna', {
    prompt: 'Le journal télévisé ou radio : « les informations »', promptEn: 'TV or radio news: "the news"',
    sv: 'nyheterna', fr: 'les informations / les nouvelles', en: 'the news', ipa: '/ˈnyːˌheːtɛɳa/',
    note: 'Pluriel défini de *en nyhet* (*ny* + *-het*). Le **rn** final est rétroflexe. Les grandes chaînes publiques : *SVT* et *SR*.',
  }),
  vocab(D, 'u21-artikel', {
    prompt: 'Un texte dans le journal : « un article »', promptEn: 'A text in the paper: "an article"',
    sv: 'en artikel', fr: 'un article', en: 'an article', ipa: '/ɛn aˈʈɪkːɛl/',
    note: 'Pluriel : *artiklar* (le **e** tombe, comme *nyckel → nycklar*). Le **rt** est rétroflexe.',
    gloss: [['en', 'un', 'an'], ['artikel', 'article', 'article']],
  }),
  vocab(D, 'u21-tidning', {
    prompt: 'Le quotidien en papier ou en ligne : « un journal »', promptEn: 'The daily paper, printed or online: "a newspaper"',
    sv: 'en tidning', fr: 'un journal', en: 'a newspaper', ipa: '/ɛn ˈtiːdnɪŋ/',
    note: '*tid* (temps) + *-ning*. Les grands titres : *Dagens Nyheter*, *Svenska Dagbladet*, *Aftonbladet*.',
    gloss: [['en', 'un', 'a'], ['tidning', 'journal', 'newspaper']],
  }),
  vocab(D, 'u21-val', {
    prompt: 'Quand on vote : « une élection »', promptEn: 'When you vote: "an election"',
    sv: 'ett val', fr: 'une élection / un choix', en: 'an election / a choice', ipa: '/ɛtː vɑːl/',
    note: 'Mot **ett**. Aussi « un choix » (*välja* = choisir). Les élections générales ont lieu tous les 4 ans, en septembre.',
    gloss: [['ett', 'une', 'an'], ['val', 'élection', 'election']],
  }),
  vocab(D, 'u21-debatt', {
    prompt: 'Une discussion publique entre opinions : « un débat »', promptEn: 'A public exchange of views: "a debate"',
    sv: 'en debatt', fr: 'un débat', en: 'a debate', ipa: '/ɛn dɛˈbatː/',
    note: 'Accent sur **batt**. Débattre : *debattera*.',
    gloss: [['en', 'un', 'a'], ['debatt', 'débat', 'debate']],
  }),
  vocab(D, 'u21-regeringen', {
    prompt: 'L’exécutif du pays : « le gouvernement »', promptEn: 'The country’s executive: "the government"',
    sv: 'regeringen', fr: 'le gouvernement', en: 'the government', ipa: '/rɛˈjeːrɪŋɛn/',
    note: 'Le **g** devant **e** se dit [j]. Le Parlement : *riksdagen*. Le Premier ministre : *statsministern*.',
  }),
  vocab(D, 'u21-laser', {
    prompt: 'Le verbe de la lecture : « lit » (présent)', promptEn: 'The reading verb: "read" (present)',
    sv: 'läser', fr: 'lis / lit', en: 'read / reads', ipa: '/ˈlɛːsɛr/',
    note: 'Groupe 2 : *läsa, läser, läste, har läst*. Aussi « étudier » une matière : *läsa svenska*.',
  }),
  vocab(D, 'u21-enligt', {
    prompt: 'Pour citer une source : « selon »', promptEn: 'To quote a source: "according to"',
    sv: 'enligt', fr: 'selon / d’après', en: 'according to', ipa: '/ˈeːnlɪt/',
    note: 'Le **g** est muet. En tête de phrase, il déclenche l’inversion V2 : *Enligt tidningen **ökar** priserna*.',
  }),
  vocab(D, 'u21-hade', {
    prompt: 'L’auxiliaire du plus-que-parfait : « avait »', promptEn: 'The pluperfect auxiliary: "had"',
    sv: 'hade', fr: 'avait / avais', en: 'had', ipa: '/ˈhadːɛ/',
    note: 'Prétérit de *ha*. Plus-que-parfait = **hade** + supin : *hade läst*, *hade börjat*. Pour une action antérieure à une autre action passée.',
  }),
  vocab(D, 'u21-kalla', {
    prompt: 'D’où vient une information : « une source »', promptEn: 'Where information comes from: "a source"',
    sv: 'en källa', fr: 'une source', en: 'a source', ipa: '/ɛn ˈɕɛlːa/',
    note: 'Le **k** devant **ä** est doux [ɕ]. Aussi une source d’eau. Vérifier ses sources : *granska källor*.',
    gloss: [['en', 'une', 'a'], ['källa', 'source', 'source']],
  }),

  phrase(D, 'u21-sett-nyheterna', {
    prompt: '« Tu as vu les infos aujourd’hui ? »', promptEn: '"Have you seen the news today?"',
    sv: 'Har du sett nyheterna idag?', fr: 'Tu as vu les infos aujourd’hui ?', en: 'Have you seen the news today?',
    ipa: '/hɑːr dʉː sɛtː ˈnyːˌheːtɛɳa ɪˈdɑː/',
    note: 'Parfait : la journée n’est pas finie, le résultat compte maintenant.',
    gloss: [['har', 'as', 'have'], ['du', 'tu', 'you'], ['sett', 'vu', 'seen'], ['nyheterna', 'les infos', 'the news'], ['idag', 'aujourd’hui', 'today']],
  }),
  phrase(D, 'u21-laste-artikel', {
    prompt: '« J’ai lu un article intéressant dans le journal. »', promptEn: '"I read an interesting article in the paper."',
    sv: 'Jag läste en intressant artikel i tidningen.', fr: 'J’ai lu un article intéressant dans le journal.', en: 'I read an interesting article in the paper.',
    ipa: '/jɑː ˈlɛːstɛ ɛn ɪntrɛˈsantː aˈʈɪkːɛl ɪ ˈtiːdnɪŋɛn/',
    note: 'L’adjectif se place **avant** le nom (pas comme en français) : *en intressant artikel*.',
    gloss: [['jag', 'je', 'I'], ['läste', 'ai lu', 'read'], ['en', 'un', 'an'], ['intressant', 'intéressant', 'interesting'], ['artikel', 'article', 'article'], ['i', 'dans', 'in'], ['tidningen', 'le journal', 'the paper']],
  }),
  phrase(D, 'u21-enligt-tidningen', {
    prompt: '« Selon le journal, les prix augmentent. » (commence par « selon »)', promptEn: '"According to the paper, prices are rising." (start with "according to")',
    sv: 'Enligt tidningen ökar priserna.', fr: 'Selon le journal, les prix augmentent.', en: 'According to the paper, prices are rising.',
    ipa: '/ˈeːnlɪt ˈtiːdnɪŋɛn ˈøːkar ˈpriːsɛɳa/',
    note: 'V2 : *Enligt tidningen* (1) **ökar** (2) *priserna* (3). *öka* = augmenter ; contraire : *minska*.',
    gloss: [['enligt', 'selon', 'according to'], ['tidningen', 'le journal', 'the paper'], ['ökar', 'augmentent', 'are rising'], ['priserna', 'les prix', 'prices']],
  }),
  phrase(D, 'u21-val-i-september', {
    prompt: '« Il y a des élections en septembre. »', promptEn: '"There is an election in September."',
    sv: 'Det är val i september.', fr: 'Il y a des élections en septembre.', en: 'There is an election in September.',
    ipa: '/deː æːr vɑːl ɪ sɛpˈtɛmbɛr/',
    note: '*Det är val* : sans article, comme *det är rea* (Unité 13). Les mois en minuscule.',
    gloss: [['det', 'il', 'there'], ['är', 'y a', 'is'], ['val', 'élections', 'an election'], ['i', 'en', 'in'], ['september', 'septembre', 'September']],
  }),
  phrase(D, 'u21-regeringen-presenterat', {
    prompt: '« Le gouvernement a présenté un nouveau plan. »', promptEn: '"The government has presented a new plan."',
    sv: 'Regeringen har presenterat en ny plan.', fr: 'Le gouvernement a présenté un nouveau plan.', en: 'The government has presented a new plan.',
    ipa: '/rɛˈjeːrɪŋɛn hɑːr prɛsɛnˈteːrat ɛn nyː plɑːn/',
    note: 'Verbe en **-era** (venu du français) : *presentera, presenterade, har presenterat*.',
    gloss: [['regeringen', 'le gouvernement', 'the government'], ['har', 'a', 'has'], ['presenterat', 'présenté', 'presented'], ['en', 'un', 'a'], ['ny', 'nouveau', 'new'], ['plan', 'plan', 'plan']],
  }),
  phrase(D, 'u21-hade-redan-borjat', {
    prompt: 'Plus-que-parfait : « Quand je suis rentré, les infos avaient déjà commencé. »', promptEn: 'Pluperfect: "When I got home, the news had already started."',
    sv: 'När jag kom hem hade nyheterna redan börjat.', fr: 'Quand je suis rentré, les infos avaient déjà commencé.', en: 'When I got home, the news had already started.',
    ipa: '/nɛːr jɑː kɔmː hɛmː ˈhadːɛ ˈnyːˌheːtɛɳa ˈreːdan ˈbœrjat/',
    note: '**hade börjat** : action finie avant une autre action passée (*kom hem*). Et V2 après la subordonnée : **hade** juste après *När jag kom hem*. *redan* = déjà.',
    gloss: [['när', 'quand', 'when'], ['jag', 'je', 'I'], ['kom', 'suis arrivé', 'got'], ['hem', 'à la maison', 'home'], ['hade', 'avaient', 'had'], ['nyheterna', 'les infos', 'the news'], ['redan', 'déjà', 'already'], ['börjat', 'commencé', 'started']],
  }),
  phrase(D, 'u21-aldrig-last-forut', {
    prompt: '« Elle n’avait jamais lu ce journal avant. »', promptEn: '"She had never read the paper before."',
    sv: 'Hon hade aldrig läst tidningen förut.', fr: 'Elle n’avait jamais lu ce journal avant.', en: 'She had never read the paper before.',
    ipa: '/hʊnː ˈhadːɛ ˈaldrɪɡ lɛːst ˈtiːdnɪŋɛn ˈfœːrʉːt/',
    note: '*aldrig* entre l’auxiliaire et le supin, comme au parfait. **förut** = avant, auparavant.',
    gloss: [['hon', 'elle', 'she'], ['hade', 'avait', 'had'], ['aldrig', 'jamais', 'never'], ['läst', 'lu', 'read'], ['tidningen', 'le journal', 'the paper'], ['förut', 'avant', 'before']],
  }),
  phrase(D, 'u21-vilken-kalla', {
    prompt: '« De quelle source vient l’information ? »', promptEn: '"Which source does the information come from?"',
    sv: 'Vilken källa kommer informationen från?', fr: 'De quelle source vient l’information ?', en: 'Which source does the information come from?',
    ipa: '/ˈvɪlːkɛn ˈɕɛlːa ˈkɔmːɛr ɪnfɔrmaˈɧuːnɛn froːn/',
    note: 'La préposition **från** va à la fin de la question, comme en anglais (*come from*). *-tion* se dit [ɧuːn].',
    gloss: [['vilken', 'quelle', 'which'], ['källa', 'source', 'source'], ['kommer', 'vient', 'comes'], ['informationen', 'l’information', 'the information'], ['från', 'de', 'from']],
  }),
];
