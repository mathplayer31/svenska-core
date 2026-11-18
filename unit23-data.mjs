// Unité 23 : Raconter au passé (B1, Section 6). Grammaire : enchaînement des temps, medan / innan / efter att.
import { vocab, phrase, unitDeck } from './content-helpers.mjs';

export const UNIT23_DECK = unitDeck({
  n: 23, slug: 'swedish-unit-23-stories', fr: 'Raconter au passé', en: 'Telling stories',
  level: 'B1', section: 'section-6-societe', after: 'swedish-unit-22-emotions',
});
const D = UNIT23_DECK.slug;

export const UNIT23_CARDS = [
  vocab(D, 'u23-plotsligt', {
    prompt: 'Pour un événement inattendu : « soudain »', promptEn: 'For an unexpected event: "suddenly"',
    sv: 'plötsligt', fr: 'soudain / tout à coup', en: 'suddenly', ipa: '/ˈplœtslɪt/',
    note: 'Le **g** de *-igt* est muet. En tête de phrase, inversion V2 : *Plötsligt **började** det regna*.',
  }),
  vocab(D, 'u23-medan', {
    prompt: 'Deux actions en même temps : « pendant que »', promptEn: 'Two actions at the same time: "while"',
    sv: 'medan', fr: 'pendant que', en: 'while', ipa: '/ˈmeːdan/',
    note: 'Conjonction de subordination : *medan jag lagade mat…* La principale qui suit commence par son verbe (V2).',
  }),
  vocab(D, 'u23-innan', {
    prompt: 'Une action avant une autre : « avant que / avant de »', promptEn: 'One action before another: "before"',
    sv: 'innan', fr: 'avant que / avant de', en: 'before', ipa: '/ˈɪnːan/',
    note: 'Conjonction (+ proposition) : *innan jag flyttade*. Devant un nom, on dit **före** : *före jul*.',
  }),
  vocab(D, 'u23-efter-att', {
    prompt: 'Une action après une autre : « après que / après avoir »', promptEn: 'One action after another: "after"',
    sv: 'efter att', fr: 'après que / après avoir', en: 'after (doing)', ipa: '/ˈɛftɛr at/',
    note: 'Conjonction : *efter att vi hade ätit*. Devant un nom, *efter* seul : *efter middagen*.',
    gloss: [['efter', 'après', 'after'], ['att', 'que', 'that']],
  }),
  vocab(D, 'u23-minns', {
    prompt: 'Avoir en mémoire : « se souvient »', promptEn: 'Having in your memory: "remember"',
    sv: 'minns', fr: 'me souviens / se souvient', en: 'remember / remembers', ipa: '/mɪnːs/',
    note: 'Verbe en **-s** (déponent) : *minnas, minns, mindes, har mints*. Synonyme courant : *komma ihåg* (Unité 20).',
  }),
  vocab(D, 'u23-hande', {
    prompt: 'Prétérit de « hända » : « s’est passé / est arrivé »', promptEn: 'Past tense of "hända": "happened"',
    sv: 'hände', fr: 's’est passé / est arrivé', en: 'happened', ipa: '/ˈhɛndɛ/',
    note: '*hända, händer, hände, har hänt*. *Vad har hänt?* = Qu’est-ce qui s’est passé ?',
  }),
  vocab(D, 'u23-berattelse', {
    prompt: 'Ce qu’on raconte : « une histoire / un récit »', promptEn: 'What you tell: "a story"',
    sv: 'en berättelse', fr: 'une histoire / un récit', en: 'a story', ipa: '/ɛn bɛˈrɛtːɛlsɛ/',
    note: 'De *berätta* (raconter). L’Histoire (discipline) : *historia*.',
    gloss: [['en', 'une', 'a'], ['berättelse', 'histoire', 'story']],
  }),
  vocab(D, 'u23-till-slut', {
    prompt: 'À la fin d’un récit : « finalement / pour finir »', promptEn: 'At the end of a story: "in the end / finally"',
    sv: 'till slut', fr: 'finalement / à la fin', en: 'in the end / finally', ipa: '/tɪlː slʉːt/',
    note: '*slut* = fin. Expression adverbiale qui déclenche l’inversion en tête : *Till slut **hittade** vi…*',
    gloss: [['till', 'à', 'in'], ['slut', 'fin', 'the end']],
  }),
  vocab(D, 'u23-forst', {
    prompt: 'La première étape : « d’abord »', promptEn: 'The first step: "first"',
    sv: 'först', fr: 'd’abord / en premier', en: 'first', ipa: '/fœʂʈ/',
    note: 'Le **rst** se fond en sons rétroflexes. Suite logique : *först… sedan… till slut*.',
  }),
  vocab(D, 'u23-sedan', {
    prompt: 'L’étape suivante : « ensuite / puis »', promptEn: 'The next step: "then / afterwards"',
    sv: 'sedan', fr: 'ensuite / puis', en: 'then / afterwards', ipa: '/ˈseːdan/',
    note: 'À l’oral : *sen*. Même mot que dans *för två år sedan* (il y a deux ans, Grammaire A2).',
  }),

  phrase(D, 'u23-vad-hande-sedan', {
    prompt: '« Qu’est-ce qui s’est passé ensuite ? »', promptEn: '"What happened next?"',
    sv: 'Vad hände sedan?', fr: 'Qu’est-ce qui s’est passé ensuite ?', en: 'What happened next?',
    ipa: '/vɑː ˈhɛndɛ ˈseːdan/',
    note: 'La question parfaite pour relancer un récit.',
    gloss: [['vad', 'qu’est-ce qui', 'what'], ['hände', 's’est passé', 'happened'], ['sedan', 'ensuite', 'next']],
  }),
  phrase(D, 'u23-forst-sedan', {
    prompt: '« D’abord nous avons dîné, ensuite nous sommes sortis. »', promptEn: '"First we had dinner, then we went out."',
    sv: 'Först åt vi middag, sedan gick vi ut.', fr: 'D’abord nous avons dîné, ensuite nous sommes sortis.', en: 'First we had dinner, then we went out.',
    ipa: '/fœʂʈ oːt viː ˈmɪdːɑːɡ ˈseːdan jɪkː viː ʉːt/',
    note: 'Deux fois V2 : *Först* **åt** *vi*, *sedan* **gick** *vi*. Les adverbes de temps en tête font passer le sujet derrière le verbe.',
    gloss: [['först', 'd’abord', 'first'], ['åt', 'avons mangé', 'ate'], ['vi', 'nous', 'we'], ['middag', 'dîner', 'dinner'], ['sedan', 'ensuite', 'then'], ['gick', 'sommes allés', 'went'], ['vi', 'nous', 'we'], ['ut', 'dehors', 'out']],
  }),
  phrase(D, 'u23-medan-ringde', {
    prompt: '« Pendant que je cuisinais, le téléphone a sonné. »', promptEn: '"While I was cooking, the phone rang."',
    sv: 'Medan jag lagade mat ringde telefonen.', fr: 'Pendant que je cuisinais, le téléphone a sonné.', en: 'While I was cooking, the phone rang.',
    ipa: '/ˈmeːdan jɑː ˈlɑːɡadɛ mɑːt ˈrɪŋdɛ tɛlɛˈfoːnɛn/',
    note: 'Le suédois n’a qu’un seul temps du passé simple : *lagade* traduit « cuisinais » (imparfait) comme « ai cuisiné ». V2 après la subordonnée : **ringde** *telefonen*.',
    gloss: [['medan', 'pendant que', 'while'], ['jag', 'je', 'I'], ['lagade', 'préparais', 'was making'], ['mat', 'à manger', 'food'], ['ringde', 'a sonné', 'rang'], ['telefonen', 'le téléphone', 'the phone']],
  }),
  phrase(D, 'u23-plotsligt-regna', {
    prompt: '« Soudain, il s’est mis à pleuvoir. »', promptEn: '"Suddenly it started to rain."',
    sv: 'Plötsligt började det regna.', fr: 'Soudain, il s’est mis à pleuvoir.', en: 'Suddenly it started to rain.',
    ipa: '/ˈplœtslɪt ˈbœrjadɛ deː ˈrɛŋna/',
    note: '*börja* + infinitif (sans *att* à l’oral) = commencer à.',
    gloss: [['plötsligt', 'soudain', 'suddenly'], ['började', 'a commencé', 'started'], ['det', 'il', 'it'], ['regna', 'pleuvoir', 'to rain']],
  }),
  phrase(D, 'u23-innan-jag-flyttade', {
    prompt: '« Avant de déménager ici, j’habitais à Lyon. »', promptEn: '"Before I moved here, I lived in Lyon."',
    sv: 'Innan jag flyttade hit bodde jag i Lyon.', fr: 'Avant de déménager ici, j’habitais à Lyon.', en: 'Before I moved here, I lived in Lyon.',
    ipa: '/ˈɪnːan jɑː ˈflʏtːadɛ hiːt ˈbʊdːɛ jɑː ɪ liˈoːn/',
    note: '**hit** = ici (direction, après un verbe de mouvement) ; *här* = ici (position). *bodde* = prétérit de *bo*.',
    gloss: [['innan', 'avant que', 'before'], ['jag', 'je', 'I'], ['flyttade', 'ai déménagé', 'moved'], ['hit', 'ici', 'here'], ['bodde', 'habitais', 'lived'], ['jag', 'je', 'I'], ['i', 'à', 'in'], ['Lyon', 'Lyon', 'Lyon']],
  }),
  phrase(D, 'u23-efter-att-atit', {
    prompt: '« Après avoir mangé, nous avons fait une promenade. »', promptEn: '"After we had eaten, we went for a walk."',
    sv: 'Efter att vi hade ätit tog vi en promenad.', fr: 'Après avoir mangé, nous avons fait une promenade.', en: 'After we had eaten, we went for a walk.',
    ipa: '/ˈɛftɛr at viː ˈhadːɛ ˈɛːtɪt tuːɡ viː ɛn prʊmɛˈnɑːd/',
    note: 'Plus-que-parfait dans la subordonnée (*hade ätit*), prétérit dans la principale (*tog*). *ta en promenad* = faire une promenade.',
    gloss: [['efter', 'après', 'after'], ['att', 'que', 'that'], ['vi', 'nous', 'we'], ['hade', 'avions', 'had'], ['ätit', 'mangé', 'eaten'], ['tog', 'avons pris', 'took'], ['vi', 'nous', 'we'], ['en', 'une', 'a'], ['promenad', 'promenade', 'walk']],
  }),
  phrase(D, 'u23-minns-inte', {
    prompt: '« Je ne me souviens pas de ce qu’il a dit. »', promptEn: '"I don\'t remember what he said."',
    sv: 'Jag minns inte vad han sa.', fr: 'Je ne me souviens pas de ce qu’il a dit.', en: 'I don\'t remember what he said.',
    ipa: '/jɑː mɪnːs ˈɪnːtɛ vɑː hanː sɑː/',
    note: '*sa* = prétérit de *säga* (forme écrite : *sade*). Question indirecte : *vad han sa*, sujet avant le verbe.',
    gloss: [['jag', 'je', 'I'], ['minns', 'me souviens', 'remember'], ['inte', 'ne… pas', 'not'], ['vad', 'ce que', 'what'], ['han', 'il', 'he'], ['sa', 'a dit', 'said']],
  }),
  phrase(D, 'u23-till-slut-hittade', {
    prompt: '« Finalement, nous avons trouvé le chemin. »', promptEn: '"In the end we found the way."',
    sv: 'Till slut hittade vi vägen.', fr: 'Finalement, nous avons trouvé le chemin.', en: 'In the end we found the way.',
    ipa: '/tɪlː slʉːt ˈhɪtːadɛ viː ˈvɛːɡɛn/',
    note: '*hitta* = trouver. *vägen* = le chemin, défini de *en väg* (vu en phonétique, *väg / vägg*).',
    gloss: [['till', 'à', 'in'], ['slut', 'la fin', 'the end'], ['hittade', 'avons trouvé', 'found'], ['vi', 'nous', 'we'], ['vägen', 'le chemin', 'the way']],
  }),
];
