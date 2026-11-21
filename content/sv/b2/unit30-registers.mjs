// Unité 30 : Registres (B2, Section 8). Formel vs familier, discours rapporté (concordance des temps).
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT30_DECK = unitDeck({
  n: 30, slug: 'swedish-unit-30-registers', fr: 'Registres', en: 'Registers',
  level: 'B2', section: 'section-8-nuances', after: 'swedish-unit-29-arguing',
});
const D = UNIT30_DECK.slug;

export const UNIT30_CARDS = [
  vocab(D, 'u30-vanligen', {
    prompt: 'Formel, dans les courriers officiels : « veuillez »', promptEn: 'Formal, in official letters: "please / kindly"',
    sv: 'vänligen', fr: 'veuillez / merci de', en: 'please / kindly', ipa: '/ˈvɛnːlɪɡɛn/',
    note: 'Registre administratif : *Vänligen kontakta oss*. À l’oral, on dirait plutôt *Kan du…?*',
  }),
  vocab(D, 'u30-tack-pa-forhand', {
    prompt: 'Formule de fin de demande : « merci d’avance »', promptEn: 'Closing a request: "thanks in advance"',
    sv: 'tack på förhand', fr: 'merci d’avance', en: 'thanks in advance', ipa: '/takː poː fœrˈhand/',
    note: 'Courant dans les e-mails, du professionnel au personnel.',
    gloss: [['tack', 'merci', 'thanks'], ['på', 'd’', 'in'], ['förhand', 'avance', 'advance']],
  }),
  vocab(D, 'u30-med-vanliga-halsningar', {
    prompt: 'La formule de politesse d’un e-mail : « cordialement »', promptEn: 'The email sign-off: "kind regards"',
    sv: 'med vänliga hälsningar', fr: 'cordialement', en: 'kind regards', ipa: '/meː ˈvɛnːlɪɡa ˈhɛlsnɪŋar/',
    note: 'Abrégé *MVH*. Plus personnel : *Hälsningar* ou *Kram* (bisous, entre proches).',
    gloss: [['med', 'avec', 'with'], ['vänliga', 'aimables', 'kind'], ['hälsningar', 'salutations', 'regards']],
  }),
  vocab(D, 'u30-basta', {
    prompt: 'Le début d’un e-mail poli : « Cher / Chère… »', promptEn: 'The start of a polite email: "Dear…"',
    sv: 'bästa', fr: 'cher / chère (en-tête)', en: 'dear (greeting)', ipa: '/ˈbɛsta/',
    note: 'Litt. « meilleur(e) » : *Bästa Anna*, *Bästa kund*. Plus courant que *Kära* en contexte professionnel. Souvent, on écrit simplement *Hej Anna!*',
  }),
  vocab(D, 'u30-hej-hej', {
    prompt: 'Au revoir décontracté au téléphone : « salut salut »', promptEn: 'Casual goodbye on the phone: "bye bye"',
    sv: 'hej hej', fr: 'salut salut / ciao', en: 'bye bye', ipa: '/hɛj hɛj/',
    note: 'Doublé, *hej* sert à prendre congé, surtout au téléphone. Aussi *hej då* (Unité 1).',
    gloss: [['hej', 'salut', 'bye'], ['hej', 'salut', 'bye']],
  }),
  vocab(D, 'u30-kompis', {
    prompt: 'Un ami, en langage familier : « un pote »', promptEn: 'A friend, informally: "a mate / a buddy"',
    sv: 'en kompis', fr: 'un(e) pote', en: 'a mate / a buddy', ipa: '/ɛn ˈkɔmpɪs/',
    note: 'Familier pour *vän* (Unité 11). Pluriel : *kompisar*.',
    gloss: [['en', 'un', 'a'], ['kompis', 'pote', 'mate']],
  }),
  vocab(D, 'u30-schysst', {
    prompt: 'Familier, pour quelqu’un de bien : « sympa / réglo »', promptEn: 'Informal, for a decent person: "nice / fair"',
    sv: 'schysst', fr: 'sympa / réglo', en: 'nice / decent / fair', ipa: '/ɧʏsːt/',
    note: 'Orthographes variables (*schyst*, *juste*). Vient du français « juste ». Neutre inchangé.',
  }),
  vocab(D, 'u30-typ', {
    prompt: 'Le mot de remplissage des jeunes : « genre »', promptEn: 'The young people\'s filler word: "like / kind of"',
    sv: 'typ', fr: 'genre (familier)', en: 'like / kind of (informal)', ipa: '/tyːp/',
    note: 'Sens propre : *en typ* = un type, un genre. À l’oral, il sert de « genre » comme en français.',
  }),
  vocab(D, 'u30-kul', {
    prompt: 'Familier pour « amusant » : « cool / sympa »', promptEn: 'Informal for "fun": "fun / cool"',
    sv: 'kul', fr: 'cool / sympa (familier)', en: 'fun (informal)', ipa: '/kʉːl/',
    note: 'Synonyme familier de *roligt* (Unité 11). Invariable : *det var kul*.',
  }),
  vocab(D, 'u30-sa-att', {
    prompt: 'Rapporter des paroles : « a dit que »', promptEn: 'Reporting speech: "said that"',
    sv: 'sa att', fr: 'a dit que', en: 'said that', ipa: '/sɑː at/',
    note: 'Discours rapporté au passé : le temps recule d’un cran, comme en français : *är → var*, *ska → skulle*, *har → hade*.',
    gloss: [['sa', 'a dit', 'said'], ['att', 'que', 'that']],
  }),

  // Ajouts (issue #14)
  vocab(D, 'u30-grym', {
    prompt: 'En argot, très positif : « génial »', promptEn: 'Very positive slang: "awesome"',
    sv: 'grym', fr: 'génial (familier)', en: 'awesome (slang)', ipa: '/ɡrʏmː/',
    note: 'Au sens propre « cruel », mais chez les jeunes : *Det var grymt!* = c’était génial !',
  }),
  vocab(D, 'u30-assa', {
    prompt: 'Le petit mot qui ponctue l’oral : « genre / enfin »', promptEn: 'The filler word in speech: "like / I mean"',
    sv: 'asså', fr: 'enfin / genre (familier)', en: 'like / I mean (filler)', ipa: '/ˈasːɔ/',
    note: 'Forme orale de *alltså*. *Asså, jag vet inte.* À éviter à l’écrit soutenu.',
  }),
  vocab(D, 'u30-kaka', {
    prompt: 'Manger, en familier : « bouffer »', promptEn: 'Eating, casually: "to grab food"',
    sv: 'käka', fr: 'bouffer / manger (familier)', en: 'to eat (casual)', ipa: '/ˈɕɛːka/',
    note: '*Ska vi käka?* = on mange ? Registre neutre : *äta*.',
  }),
  vocab(D, 'u30-jobbigt', {
    prompt: 'Ce qui est pénible ou fatigant', promptEn: 'Something tiring or annoying: "a hassle"',
    sv: 'jobbigt', fr: 'pénible / galère', en: 'annoying / a hassle', ipa: '/ˈjɔbːɪt/',
    note: 'Très courant à l’oral : *Vad jobbigt!* = quelle galère !',
  }),
  vocab(D, 'u30-sjukt', {
    prompt: 'Intensif familier : « grave / trop »', promptEn: 'Casual intensifier: "insanely / super"',
    sv: 'sjukt', fr: 'grave / trop (familier)', en: 'insanely / super (slang)', ipa: '/ɧʉːkt/',
    note: 'Devant un adjectif : *sjukt bra* = trop bien. Sens propre : malade (*sjuk*).',
  }),
  vocab(D, 'u30-med-anledning-av', {
    prompt: 'Pour introduire un motif, en style administratif', promptEn: 'Introducing a reason, in official style',
    sv: 'med anledning av', fr: 'suite à / en raison de', en: 'in view of / regarding', ipa: '/meː ˈanˌleːdnɪŋ ɑːv/',
    note: 'Début typique de courriel officiel : *Med anledning av ditt mejl…*',
    gloss: [['med', 'avec', 'with'], ['anledning', 'raison', 'reason'], ['av', 'de', 'of']],
  }),
  vocab(D, 'u30-vi-hors', {
    prompt: 'Se quitter en promettant de se reparler : « on s’appelle »', promptEn: 'Saying goodbye, promising to talk: "talk soon"',
    sv: 'vi hörs', fr: 'on s’appelle / on se tient au courant', en: 'talk soon', ipa: '/viː hœʂː/',
    note: 'Forme réciproque en **-s** de *höra* (entendre). Pendant de *vi ses*.',
    gloss: [['vi', 'on', 'we'], ['hörs', 's’entend', 'hear each other']],
  }),
  phrase(D, 'u30-vanligen-kontakta', {
    prompt: 'Formel : « Veuillez nous contacter par e-mail. »', promptEn: 'Formal: "Please contact us by email."',
    sv: 'Vänligen kontakta oss via e-post.', fr: 'Veuillez nous contacter par e-mail.', en: 'Please contact us by email.',
    ipa: '/ˈvɛnːlɪɡɛn kɔnˈtakta ɔsː ˈviːa ˈeːˌpɔst/',
    note: '*vänligen* + impératif. *oss* = nous (complément). *e-post* = e-mail (on dit aussi *mejl*).',
    gloss: [['vänligen', 'veuillez', 'please'], ['kontakta', 'contacter', 'contact'], ['oss', 'nous', 'us'], ['via', 'par', 'by'], ['e-post', 'e-mail', 'email']],
  }),
  phrase(D, 'u30-tack-pa-forhand-svar', {
    prompt: '« Merci d’avance pour ta réponse. »', promptEn: '"Thanks in advance for your reply."',
    sv: 'Tack på förhand för ditt svar.', fr: 'Merci d’avance pour ta réponse.', en: 'Thanks in advance for your reply.',
    ipa: '/takː poː fœrˈhand fœr dɪtː svɑːr/',
    note: '*ditt* car *svar* est un mot **ett**. Le vouvoiement (*ert*) a quasiment disparu, sauf très formel.',
    gloss: [['tack', 'merci', 'thanks'], ['på', 'd’', 'in'], ['förhand', 'avance', 'advance'], ['för', 'pour', 'for'], ['ditt', 'ta', 'your'], ['svar', 'réponse', 'reply']],
  }),
  phrase(D, 'u30-mvh-anna', {
    prompt: 'Signer un e-mail : « Cordialement, Anna »', promptEn: 'Signing an email: "Kind regards, Anna"',
    sv: 'Med vänliga hälsningar, Anna', fr: 'Cordialement, Anna', en: 'Kind regards, Anna',
    ipa: '/meː ˈvɛnːlɪɡa ˈhɛlsnɪŋar ˈanːa/',
    note: '*vänliga* : pluriel de *vänlig* (aimable), accordé avec *hälsningar*.',
    gloss: [['med', 'avec', 'with'], ['vänliga', 'aimables', 'kind'], ['hälsningar', 'salutations', 'regards'], ['Anna', 'Anna', 'Anna']],
  }),
  phrase(D, 'u30-sa-skulle-komma', {
    prompt: 'Discours rapporté : « Il a dit qu’il viendrait. »', promptEn: 'Reported speech: "He said he would come."',
    sv: 'Han sa att han skulle komma.', fr: 'Il a dit qu’il viendrait.', en: 'He said he would come.',
    ipa: '/hanː sɑː at hanː ˈskɵlːɛ ˈkɔmːa/',
    note: 'Paroles d’origine : *Jag ska komma.* Rapportées au passé : *ska → **skulle***.',
    gloss: [['han', 'il', 'he'], ['sa', 'a dit', 'said'], ['att', 'que', 'that'], ['han', 'il', 'he'], ['skulle', '(conditionnel)', 'would'], ['komma', 'venir', 'come']],
  }),
  phrase(D, 'u30-fragade-om', {
    prompt: 'Question rapportée : « Elle a demandé si j’étais fatigué. »', promptEn: 'Reported question: "She asked if I was tired."',
    sv: 'Hon frågade om jag var trött.', fr: 'Elle a demandé si j’étais fatigué.', en: 'She asked if I was tired.',
    ipa: '/hʊnː ˈfroːɡadɛ ɔm jɑː vɑːr trœtː/',
    note: 'Question d’origine : *Är du trött?* Rapportée : **om** + ordre de subordonnée + temps reculé (*är → var*).',
    gloss: [['hon', 'elle', 'she'], ['frågade', 'a demandé', 'asked'], ['om', 'si', 'if'], ['jag', 'je', 'I'], ['var', 'étais', 'was'], ['trött', 'fatigué', 'tired']],
  }),
  phrase(D, 'u30-typ-jattekul', {
    prompt: 'Familier : « C’était genre super cool ! »', promptEn: 'Informal: "It was, like, really fun!"',
    sv: 'Det var typ jättekul!', fr: 'C’était genre super cool !', en: 'It was, like, really fun!',
    ipa: '/deː vɑːr tyːp ˈjɛtːɛˌkʉːl/',
    note: 'Registre jeune et oral. À éviter dans un e-mail professionnel.',
    gloss: [['det', 'c’', 'it'], ['var', 'était', 'was'], ['typ', 'genre', 'like'], ['jättekul', 'super cool', 'really fun']],
  }),
  phrase(D, 'u30-kompis-schysst', {
    prompt: 'Familier : « Mon pote est vraiment sympa. »', promptEn: 'Informal: "My mate is really nice."',
    sv: 'Min kompis är så schysst.', fr: 'Mon pote est vraiment sympa.', en: 'My mate is really nice.',
    ipa: '/mɪnː ˈkɔmpɪs æːr soː ɧʏsːt/',
    note: '*så* + adjectif = tellement, vraiment (Unité 22).',
    gloss: [['min', 'mon', 'my'], ['kompis', 'pote', 'mate'], ['är', 'est', 'is'], ['så', 'vraiment', 'so'], ['schysst', 'sympa', 'nice']],
  }),
  phrase(D, 'u30-fick-inte-anvanda', {
    prompt: 'Discours rapporté + BIFF : « Le prof a dit qu’on n’avait pas le droit d’utiliser le téléphone. »', promptEn: 'Reported speech + BIFF: "The teacher said we weren\'t allowed to use the phone."',
    sv: 'Läraren sa att vi inte fick använda telefonen.', fr: 'Le prof a dit qu’on n’avait pas le droit d’utiliser le téléphone.', en: 'The teacher said we weren\'t allowed to use the phone.',
    ipa: '/ˈlæːrarɛn sɑː at viː ˈɪnːtɛ fɪkː ˈanːˌvɛnda tɛlɛˈfoːnɛn/',
    note: 'Deux règles d’un coup : temps reculé (*får → **fick***) et BIFF (*vi **inte** fick*). *använda* = utiliser.',
    gloss: [['läraren', 'le prof', 'the teacher'], ['sa', 'a dit', 'said'], ['att', 'que', 'that'], ['vi', 'nous', 'we'], ['inte', 'ne… pas', 'not'], ['fick', 'avions le droit', 'were allowed'], ['använda', 'utiliser', 'to use'], ['telefonen', 'le téléphone', 'the phone']],
  }),
];
