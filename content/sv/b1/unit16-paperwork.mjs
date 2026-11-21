// Unité 16 : Démarches (B1, Section 5). Grammaire : subordonnées en « att », place de « inte » (BIFF).
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT16_DECK = unitDeck({
  n: 16, slug: 'swedish-unit-16-paperwork', fr: 'Démarches', en: 'Paperwork',
  level: 'B1', section: 'section-5-sinstaller', after: 'swedish-unit-15-plans',
});
const D = UNIT16_DECK.slug;

export const UNIT16_CARDS = [
  vocab(D, 'u16-personnummer', {
    prompt: 'Le numéro qui ouvre toutes les portes en Suède : « un numéro personnel »', promptEn: 'The number that opens every door in Sweden: "a personal identity number"',
    sv: 'ett personnummer', fr: 'un numéro personnel (d’identité)', en: 'a personal identity number', ipa: '/ɛtː pæˈʂuːnˌnɵmːɛr/',
    note: 'Date de naissance + 4 chiffres (*ÅÅMMDD-XXXX*). Sans lui : pas de banque, de bail ni de médecin facilement. Le **rs** de *person* devient [ʂ].',
    gloss: [['ett', 'un', 'a'], ['personnummer', 'numéro personnel', 'personal identity number']],
  }),
  vocab(D, 'u16-skatteverket', {
    prompt: 'L’administration des impôts et de l’état civil : « le Skatteverket »', promptEn: 'The tax and population registry agency: "Skatteverket"',
    sv: 'Skatteverket', fr: 'l’administration fiscale (et l’état civil)', en: 'the Swedish Tax Agency', ipa: '/ˈskatːɛˌværkɛt/',
    note: '*skatt* (impôt) + *verket* (l’agence). C’est là qu’on s’enregistre en arrivant (*folkbokföring*) et qu’on obtient son *personnummer*.',
  }),
  vocab(D, 'u16-ansoker', {
    prompt: 'Faire une demande officielle : « demande / postule » (présent)', promptEn: 'Making an official request: "apply" (present)',
    sv: 'ansöker', fr: 'fais une demande / postule', en: 'apply / applies', ipa: '/ˈanːˌsøːkɛr/',
    note: 'Toujours avec **om** : *ansöka om ett jobb*, *ansöka om personnummer*. Le nom : *en ansökan* (une candidature).',
  }),
  vocab(D, 'u16-blankett', {
    prompt: 'Le papier administratif à remplir : « un formulaire »', promptEn: 'The official paper to fill in: "a form"',
    sv: 'en blankett', fr: 'un formulaire', en: 'a form', ipa: '/ɛn blaŋˈkɛtː/',
    note: 'Accent sur **kett**. La plupart des démarches se font en ligne avec *BankID*, l’identité numérique suédoise.',
    gloss: [['en', 'un', 'a'], ['blankett', 'formulaire', 'form']],
  }),
  vocab(D, 'u16-bankkonto', {
    prompt: 'À la banque : « un compte bancaire »', promptEn: 'At the bank: "a bank account"',
    sv: 'ett bankkonto', fr: 'un compte bancaire', en: 'a bank account', ipa: '/ɛtː ˈbaŋkˌkɔntʊ/',
    accent: 'Accent 2 (Grave)',
    note: 'Mot **ett** (*konto* est neutre). Ouvrir un compte : *öppna ett konto*.',
    gloss: [['ett', 'un', 'a'], ['bankkonto', 'compte bancaire', 'bank account']],
  }),
  vocab(D, 'u16-id-kort', {
    prompt: 'La pièce d’identité : « une carte d’identité »', promptEn: 'Proof of identity: "an ID card"',
    sv: 'ett id-kort', fr: 'une carte d’identité', en: 'an ID card', ipa: '/ɛtː ˈiːdeːˌkʊʈː/',
    note: '*id* se prononce lettre par lettre : « i-dé ». *kort* est **ett**, comme *ett kort* (carte bancaire, Unité 2).',
    gloss: [['ett', 'une', 'an'], ['id-kort', 'carte d’identité', 'ID card']],
  }),
  vocab(D, 'u16-myndighet', {
    prompt: 'Un organisme public : « une administration / une autorité »', promptEn: 'A public body: "an authority / an agency"',
    sv: 'en myndighet', fr: 'une administration / une autorité', en: 'an authority / a government agency', ipa: '/ɛn ˈmʏndɪɡˌheːt/',
    note: 'Le suffixe **-het** forme des noms en **en** : *myndighet*, *lägenhet*, *möjlighet*. Pluriel : *myndigheter*.',
    gloss: [['en', 'une', 'an'], ['myndighet', 'administration', 'authority']],
  }),
  vocab(D, 'u16-fyller-i', {
    prompt: 'Compléter un formulaire : « remplit » (présent)', promptEn: 'Completing a form: "fill in" (present)',
    sv: 'fyller i', fr: 'remplis / remplit', en: 'fill in / fills in', ipa: '/ˈfʏlːɛr iː/',
    note: 'Verbe à particule : **fylla i**. La particule *i* est accentuée et suit le verbe : *fyll i blanketten!*',
    gloss: [['fyller', 'remplis', 'fill'], ['i', '(particule)', 'in']],
  }),
  vocab(D, 'u16-vantar', {
    prompt: 'Patienter : « attend » (présent)', promptEn: 'Being patient: "wait" (present)',
    sv: 'väntar', fr: 'attends / attend', en: 'wait / waits', ipa: '/ˈvɛntar/',
    note: 'Attendre quelque chose : **vänta på** : *jag väntar på bussen*. Groupe 1 : *väntade, har väntat*.',
  }),
  vocab(D, 'u16-viktigt', {
    prompt: 'Ce qui compte beaucoup : « important »', promptEn: 'What matters a lot: "important"',
    sv: 'viktigt', fr: 'important', en: 'important', ipa: '/ˈvɪktɪt/',
    note: 'Forme en **-t** de *viktig*, avec *det är* : *Det är viktigt att…* Le **g** de *-igt* est muet.',
  }),

  // Ajouts (issue #14)
  vocab(D, 'u16-adress', {
    prompt: 'Où tu habites, pour le courrier : « une adresse »', promptEn: 'Where you live, for post: "an address"',
    sv: 'en adress', fr: 'une adresse', en: 'an address', ipa: '/ɛn aˈdrɛsː/',
    note: 'Un seul **d**, deux **s**. Changer d’adresse : *anmäla flytt* à Skatteverket.',
  }),
  vocab(D, 'u16-migrationsverket', {
    prompt: 'L’office de l’immigration', promptEn: 'The immigration authority',
    sv: 'Migrationsverket', fr: 'l’Office des migrations', en: 'the Migration Agency', ipa: '/mɪɡraˈɧuːnsˌværkɛt/',
    note: 'Pour les titres de séjour hors UE. *-verket* = l’office, comme dans *Skatteverket*.',
  }),
  vocab(D, 'u16-uppehallstillstand', {
    prompt: 'Le droit de rester en Suède : « un titre de séjour »', promptEn: 'The right to stay in Sweden: "a residence permit"',
    sv: 'ett uppehållstillstånd', fr: 'un titre de séjour', en: 'a residence permit', ipa: '/ɛtː ˈɵpːɛhɔlsˌtɪlːstɔnd/',
    note: 'Abrégé *UT*. *uppehåll* (séjour) + *tillstånd* (autorisation).',
  }),
  vocab(D, 'u16-underskrift', {
    prompt: 'Ton nom écrit à la main en bas du document : « une signature »', promptEn: 'Your handwritten name at the bottom: "a signature"',
    sv: 'en underskrift', fr: 'une signature', en: 'a signature', ipa: '/ɛn ˈɵndɛˌʂkrɪft/',
    note: 'Verbe : *skriva under* (signer). *under* + *skrift* (écrit).',
  }),
  vocab(D, 'u16-forsakringskassan', {
    prompt: 'L’organisme des allocations : « la caisse d’assurance sociale »', promptEn: 'The benefits agency: "the Social Insurance Agency"',
    sv: 'Försäkringskassan', fr: 'la Caisse d’assurance sociale', en: 'the Social Insurance Agency', ipa: '/fœˈʂɛːkrɪŋsˌkasːan/',
    note: 'Gère les congés parentaux, les arrêts maladie et les allocations familiales.',
  }),
  vocab(D, 'u16-brev', {
    prompt: 'Ce que le facteur apporte : « une lettre »', promptEn: 'What the postman brings: "a letter"',
    sv: 'ett brev', fr: 'une lettre (courrier)', en: 'a letter', ipa: '/ɛtː breːv/',
    note: 'Invariable au pluriel : *två brev*. Les administrations écrivent souvent par courrier.',
  }),
  phrase(D, 'u16-behover-personnummer', {
    prompt: '« J’ai besoin d’un numéro personnel. »', promptEn: '"I need a personal identity number."',
    sv: 'Jag behöver ett personnummer.', fr: 'J’ai besoin d’un numéro personnel.', en: 'I need a personal identity number.',
    ipa: '/jɑː bɛˈhøːvɛr ɛtː pæˈʂuːnˌnɵmːɛr/',
    note: '*behöver* + nom directement, sans « de » (Unité 12).',
    gloss: [['jag', 'je', 'I'], ['behöver', 'ai besoin de', 'need'], ['ett', 'un', 'a'], ['personnummer', 'numéro personnel', 'personal identity number']],
  }),
  phrase(D, 'u16-ansoker-hos', {
    prompt: '« On demande un numéro personnel auprès du Skatteverket. »', promptEn: '"You apply for a personal number at Skatteverket."',
    sv: 'Man ansöker om personnummer hos Skatteverket.', fr: 'On demande un numéro personnel auprès du Skatteverket.', en: 'You apply for a personal number at Skatteverket.',
    ipa: '/manː ˈanːˌsøːkɛr ɔm pæˈʂuːnˌnɵmːɛr huːs ˈskatːɛˌværkɛt/',
    note: '**man** = on (sujet général). **hos** = chez / auprès de (une personne, une administration).',
    gloss: [['man', 'on', 'you'], ['ansöker', 'demande', 'apply'], ['om', 'pour', 'for'], ['personnummer', 'numéro personnel', 'personal number'], ['hos', 'auprès de', 'at'], ['Skatteverket', 'le Skatteverket', 'Skatteverket']],
  }),
  phrase(D, 'u16-fylla-i-blanketten', {
    prompt: '« Tu dois remplir ce formulaire. »', promptEn: '"You have to fill in this form."',
    sv: 'Du måste fylla i den här blanketten.', fr: 'Tu dois remplir ce formulaire.', en: 'You have to fill in this form.',
    ipa: '/dʉː ˈmɔsːtɛ ˈfʏlːa iː dɛnː hæːr blaŋˈkɛtːɛn/',
    note: 'Modal + verbe à particule : *måste fylla i*. *den här* + nom défini.',
    gloss: [['du', 'tu', 'you'], ['måste', 'dois', 'have to'], ['fylla', 'remplir', 'fill'], ['i', '(particule)', 'in'], ['den', 'ce', 'this'], ['här', 'ici', 'here'], ['blanketten', 'le formulaire', 'the form']],
  }),
  phrase(D, 'u16-tror-att', {
    prompt: '« Je crois que ça prend deux semaines. »', promptEn: '"I think it takes two weeks."',
    sv: 'Jag tror att det tar två veckor.', fr: 'Je crois que ça prend deux semaines.', en: 'I think it takes two weeks.',
    ipa: '/jɑː truːr at deː tɑːr tvoː ˈvɛkːʊr/',
    note: '**att** = que (conjonction). *det tar* = ça prend (du temps). Pluriel de *vecka* : *veckor*.',
    gloss: [['jag', 'je', 'I'], ['tror', 'crois', 'think'], ['att', 'que', 'that'], ['det', 'ça', 'it'], ['tar', 'prend', 'takes'], ['två', 'deux', 'two'], ['veckor', 'semaines', 'weeks']],
  }),
  phrase(D, 'u16-biff-brev', {
    prompt: 'Règle BIFF : « Elle dit qu’elle n’a pas reçu de lettre. »', promptEn: 'BIFF rule: "She says she has not received a letter."',
    sv: 'Hon säger att hon inte har fått något brev.', fr: 'Elle dit qu’elle n’a pas reçu de lettre.', en: 'She says she has not received a letter.',
    ipa: '/hʊnː ˈsɛjːɛr at hʊnː ˈɪnːtɛ hɑːr fɔtː ˈnoːɡɔt breːv/',
    note: '**BIFF** : dans une subordonnée, *inte* passe **avant** le verbe conjugué : *att hon **inte har***. En principale on dirait *hon har inte*. *fått* = supin de *få*.',
    gloss: [['hon', 'elle', 'she'], ['säger', 'dit', 'says'], ['att', 'que', 'that'], ['hon', 'elle', 'she'], ['inte', 'ne… pas', 'not'], ['har', 'a', 'has'], ['fått', 'reçu', 'received'], ['något', 'aucune', 'any'], ['brev', 'lettre', 'letter']],
  }),
  phrase(D, 'u16-utan-personnummer', {
    prompt: '« Sans numéro personnel, on ne peut pas ouvrir de compte bancaire. »', promptEn: '"Without a personal number, you cannot open a bank account."',
    sv: 'Utan personnummer kan man inte öppna ett bankkonto.', fr: 'Sans numéro personnel, on ne peut pas ouvrir de compte bancaire.', en: 'Without a personal number, you cannot open a bank account.',
    ipa: '/ˈʉːtan pæˈʂuːnˌnɵmːɛr kanː manː ˈɪnːtɛ ˈœpːna ɛtː ˈbaŋkˌkɔntʊ/',
    note: 'V2 en principale : *Utan personnummer* (1) **kan** (2) *man* (3) *inte*. Ici *inte* suit le sujet, car on n’est pas dans une subordonnée.',
    gloss: [['utan', 'sans', 'without'], ['personnummer', 'numéro personnel', 'personal number'], ['kan', 'peut', 'can'], ['man', 'on', 'you'], ['inte', 'ne… pas', 'not'], ['öppna', 'ouvrir', 'open'], ['ett', 'un', 'a'], ['bankkonto', 'compte bancaire', 'bank account']],
  }),
  phrase(D, 'u16-viktigt-id-kort', {
    prompt: '« C’est important d’avoir une carte d’identité. »', promptEn: '"It is important to have an ID card."',
    sv: 'Det är viktigt att ha ett id-kort.', fr: 'C’est important d’avoir une carte d’identité.', en: 'It is important to have an ID card.',
    ipa: '/deː æːr ˈvɪktɪt at hɑː ɛtː ˈiːdeːˌkʊʈː/',
    note: 'Ici **att** = « de » devant un infinitif : *viktigt att ha*. Même mot que la conjonction « que », deux usages.',
    gloss: [['det', 'c’', 'it'], ['är', 'est', 'is'], ['viktigt', 'important', 'important'], ['att', 'de', 'to'], ['ha', 'avoir', 'have'], ['ett', 'une', 'an'], ['id-kort', 'carte d’identité', 'ID card']],
  }),
  phrase(D, 'u16-vantar-pa-svar', {
    prompt: '« Nous attendons toujours une réponse. »', promptEn: '"We are still waiting for an answer."',
    sv: 'Vi väntar fortfarande på svar.', fr: 'Nous attendons toujours une réponse.', en: 'We are still waiting for an answer.',
    ipa: '/viː ˈvɛntar fʊʈːˈfɑːrandɛ poː svɑːr/',
    note: '**fortfarande** = toujours / encore (continuité). *vänta på* + objet. *svar* (une réponse) est invariable.',
    gloss: [['vi', 'nous', 'we'], ['väntar', 'attendons', 'are waiting'], ['fortfarande', 'toujours', 'still'], ['på', '(attendre) de', 'for'], ['svar', 'réponse', 'answer']],
  }),
];
