// Fondation : Grammaire B2. Vocabulaire des Unités 1 à 31 uniquement. Se débloque après l'Unité 31.
import { cloze } from './content-helpers.mjs';

export const GRAMMAR_B2_DECK = {
  slug: 'swedish-grammar-b2',
  title: '6. Grammaire B2 : passif, participes, conditionnel',
  title_en: '6. B2 Grammar: passive, participles, conditional',
  category: 'grammar',
  cefr_level: 'B2',
  sort_order: 6,
  prerequisite_slug: 'swedish-unit-31-history',
};
const D = GRAMMAR_B2_DECK.slug;

export const GRAMMAR_B2_CARDS = [
  cloze(D, 'gram-b2-passif-present', {
    prompt: 'Passif en -s (présent) : Tidningen ___ varje dag. (läsa)', promptEn: '-s passive (present): Tidningen ___ varje dag. (läsa)',
    sv: 'Tidningen läses varje dag.', fr: 'Le journal est lu chaque jour.', en: 'The newspaper is read every day.',
    ipa: '/ˈtiːdnɪŋɛn ˈlɛːsɛs ˈvarjɛ dɑːɡ/',
    note: 'Groupe 2 : *läser* → **läses** (on remplace **-r** par **-s**, avec un **e** de liaison). Groupe 1 : *skickar* → *skickas*.',
    gloss: [['tidningen', 'le journal', 'the newspaper'], ['läses', 'est lu', 'is read'], ['varje', 'chaque', 'every'], ['dag', 'jour', 'day']],
  }),
  cloze(D, 'gram-b2-passif-preterit', {
    prompt: 'Passif en -s (prétérit) : Huset ___ 1920. (bygga)', promptEn: '-s passive (past): Huset ___ 1920. (bygga)',
    sv: 'Huset byggdes 1920.', fr: 'La maison a été construite en 1920.', en: 'The house was built in 1920.',
    ipa: '/ˈhʉːsɛt ˈbʏɡːdɛs ˈnɪtːɔnˌhɵnːdraˈɕʉːɡʊ/',
    note: 'Prétérit + **-s** : *byggde* → *byggdes*. Les années se disent sans préposition : *1920* (*nittonhundratjugo*).',
    gloss: [['huset', 'la maison', 'the house'], ['byggdes', 'a été construite', 'was built'], ['1920', 'en 1920', 'in 1920']],
    words: ['Huset byggdes nittonhundratjugo.'],
  }),
  cloze(D, 'gram-b2-passif-bli', {
    prompt: 'Passif avec « bli » : Hon ___ ___ till chef. (välja, résultat)', promptEn: 'Passive with "bli": Hon ___ ___ till chef. (välja, result)',
    sv: 'Hon blev vald till chef.', fr: 'Elle a été choisie comme cheffe.', en: 'She was chosen as manager.',
    ipa: '/hʊnː bleːv vɑːld tɪlː ɧeːf/',
    note: '**bli** + participe passé accordé : *vald* (en), *valt* (ett), *valda* (pluriel). Insiste sur le changement d’état.',
    gloss: [['hon', 'elle', 'she'], ['blev', 'a été', 'was'], ['vald', 'choisie', 'chosen'], ['till', 'comme', 'as'], ['chef', 'cheffe', 'manager']],
  }),
  cloze(D, 'gram-b2-passif-modal', {
    prompt: 'Passif après modal : Blanketten måste ___ ___ idag. (fylla i)', promptEn: 'Passive after a modal: Blanketten måste ___ ___ idag. (fylla i)',
    sv: 'Blanketten måste fyllas i idag.', fr: 'Le formulaire doit être rempli aujourd’hui.', en: 'The form must be filled in today.',
    ipa: '/blaŋˈkɛtːɛn ˈmɔsːtɛ ˈfʏlːas iː ɪˈdɑː/',
    note: 'Modal + infinitif + **s** (*fyllas*). Avec un verbe à particule, la particule reste après : *fyllas i*.',
    gloss: [['blanketten', 'le formulaire', 'the form'], ['måste', 'doit', 'must'], ['fyllas', 'être rempli', 'be filled'], ['i', '(particule)', 'in'], ['idag', 'aujourd’hui', 'today']],
  }),
  cloze(D, 'gram-b2-participe-passe', {
    prompt: 'Participe passé accordé : Fönstret är ___ . (stänga, mot ett)', promptEn: 'Agreeing past participle: Fönstret är ___ . (stänga, ett word)',
    sv: 'Fönstret är stängt.', fr: 'La fenêtre est fermée.', en: 'The window is closed.',
    ipa: '/ˈfœnstrɛt æːr stɛŋːt/',
    note: 'Le participe s’accorde comme un adjectif : *dörren är **stängd*** (en), *fönstret är **stängt*** (ett), *fönstren är **stängda*** (pluriel).',
    gloss: [['fönstret', 'la fenêtre', 'the window'], ['är', 'est', 'is'], ['stängt', 'fermée', 'closed']],
  }),
  cloze(D, 'gram-b2-participe-present', {
    prompt: 'Participe présent : Det är en ___ film. (spänna → -ande)', promptEn: 'Present participle: Det är en ___ film. (spänna → -ande)',
    sv: 'Det är en spännande film.', fr: 'C’est un film passionnant.', en: 'It is an exciting film.',
    ipa: '/deː æːr ɛn ˈspɛnːandɛ fɪlm/',
    note: 'Participe présent = **-ande** / **-ende**, invariable : *en spännande film, ett spännande år*. Beaucoup deviennent de vrais adjectifs.',
    gloss: [['det', 'c’', 'it'], ['är', 'est', 'is'], ['en', 'un', 'an'], ['spännande', 'passionnant', 'exciting'], ['film', 'film', 'film']],
  }),
  cloze(D, 'gram-b2-conditionnel-irreel', {
    prompt: 'Hypothèse irréelle : Om jag ___ rik ___ jag resa jorden runt.', promptEn: 'Unreal condition: Om jag ___ rik ___ jag resa jorden runt.',
    sv: 'Om jag vore rik skulle jag resa jorden runt.', fr: 'Si j’étais riche, je ferais le tour du monde.', en: 'If I were rich, I would travel around the world.',
    ipa: '/ɔm jɑː ˈvuːrɛ riːk ˈskɵlːɛ jɑː ˈreːsa ˈjuːɖɛn rɵnːt/',
    note: '**vore** = subjonctif de *vara* (« étais » hypothétique), soutenu. À l’oral : *om jag var rik*. Puis **skulle** + infinitif.',
    gloss: [['om', 'si', 'if'], ['jag', 'je', 'I'], ['vore', 'étais', 'were'], ['rik', 'riche', 'rich'], ['skulle', '(conditionnel)', 'would'], ['jag', 'je', 'I'], ['resa', 'voyager', 'travel'], ['jorden', 'la terre', 'the world'], ['runt', 'autour', 'around']],
  }),
  cloze(D, 'gram-b2-skulle-vilja', {
    prompt: 'Demande polie : Jag ___ ___ ha en kaffe, tack.', promptEn: 'Polite request: Jag ___ ___ ha en kaffe, tack.',
    sv: 'Jag skulle vilja ha en kaffe, tack.', fr: 'Je voudrais un café, s’il vous plaît.', en: 'I would like a coffee, please.',
    ipa: '/jɑː ˈskɵlːɛ ˈvɪlja hɑː ɛn ˈkafːɛ takː/',
    note: '**skulle vilja** = je voudrais (plus poli que *jag vill ha*, Unité 2). *en kaffe* = une tasse de café.',
    gloss: [['jag', 'je', 'I'], ['skulle', '(conditionnel)', 'would'], ['vilja', 'vouloir', 'like'], ['ha', 'avoir', 'to have'], ['en', 'un', 'a'], ['kaffe', 'café', 'coffee'], ['tack', 'merci', 'please']],
  }),
  cloze(D, 'gram-b2-discours-rapporte', {
    prompt: 'Discours rapporté : « Jag är trött. » → Hon sa att hon ___ trött.', promptEn: 'Reported speech: "Jag är trött." → Hon sa att hon ___ trött.',
    sv: 'Hon sa att hon var trött.', fr: 'Elle a dit qu’elle était fatiguée.', en: 'She said she was tired.',
    ipa: '/hʊnː sɑː at hʊnː vɑːr trœtː/',
    note: 'Verbe introducteur au passé → recul du temps : *är → **var***, *har → hade*, *ska → skulle*. Comme en français.',
    gloss: [['hon', 'elle', 'she'], ['sa', 'a dit', 'said'], ['att', 'que', 'that'], ['hon', 'elle', 'she'], ['var', 'était', 'was'], ['trött', 'fatiguée', 'tired']],
  }),
  cloze(D, 'gram-b2-reciproque', {
    prompt: 'Verbe réciproque en -s : Vi ___ på stationen klockan åtta. (träffa, l’un l’autre)', promptEn: 'Reciprocal -s verb: Vi ___ på stationen klockan åtta. (träffa, each other)',
    sv: 'Vi träffas på stationen klockan åtta.', fr: 'On se retrouve à la gare à huit heures.', en: 'We meet at the station at eight.',
    ipa: '/viː ˈtrɛfːas poː staˈɧuːnɛn ˈklɔkːan ˈɔtːa/',
    note: 'Certains verbes en **-s** ont un sens **réciproque** (l’un l’autre) : *träffas*, *ses* (*Vi ses!* = À plus !), *höras* (*Vi hörs!*).',
    gloss: [['vi', 'nous', 'we'], ['träffas', 'nous retrouvons', 'meet'], ['på', 'à', 'at'], ['stationen', 'la gare', 'the station'], ['klockan', 'à l’heure', 'at'], ['åtta', 'huit', 'eight']],
  }),
  cloze(D, 'gram-b2-deponent', {
    prompt: 'Verbe déponent : Vi ___ att det går bra. (espérer)', promptEn: 'Deponent verb: Vi ___ att det går bra. (to hope)',
    sv: 'Vi hoppas att det går bra.', fr: 'Nous espérons que ça se passe bien.', en: 'We hope it goes well.',
    ipa: '/viː ˈhɔpːas at deː ɡoːr brɑː/',
    note: '**Déponents** : forme en **-s** mais sens **actif**, sans forme sans -s : *hoppas, minnas, finnas, andas* (respirer). *det går bra* = ça se passe bien.',
    gloss: [['vi', 'nous', 'we'], ['hoppas', 'espérons', 'hope'], ['att', 'que', 'that'], ['det', 'ça', 'it'], ['går', 'se passe', 'goes'], ['bra', 'bien', 'well']],
  }),
  cloze(D, 'gram-b2-derivation-bar', {
    prompt: 'Dérivation en -bar : Problemet går att lösa = Problemet är ___ .', promptEn: 'Derivation with -bar: Problemet går att lösa = Problemet är ___ .',
    sv: 'Problemet är lösbart.', fr: 'Le problème est soluble (on peut le résoudre).', en: 'The problem is solvable.',
    ipa: '/prʊˈbleːmɛt æːr ˈløːsbɑːʈ/',
    note: 'Radical + **-bar** = « -able » : *lösa → lösbar*, *äta → ätbar*, *hålla → hållbar* (Unité 27). Accordé au neutre : *lösbart*.',
    gloss: [['problemet', 'le problème', 'the problem'], ['är', 'est', 'is'], ['lösbart', 'soluble', 'solvable']],
  }),
];
