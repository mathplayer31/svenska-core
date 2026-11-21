// Unité 25 : Économie & consommation (B2, Section 7). Grammaire : passif en « bli » + participe, passif au parfait.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT25_DECK = unitDeck({
  n: 25, slug: 'swedish-unit-25-economy', fr: 'Économie & consommation', en: 'Economy & consumption',
  level: 'B2', section: 'section-7-travailler', after: 'swedish-unit-24-professional',
});
const D = UNIT25_DECK.slug;

export const UNIT25_CARDS = [
  vocab(D, 'u25-priset', {
    prompt: 'Combien coûte une chose : « le prix »', promptEn: 'How much something costs: "the price"',
    sv: 'priset', fr: 'le prix', en: 'the price', ipa: '/ˈpriːsɛt/',
    note: 'Défini de *ett pris*. Attention : *ett pris* veut aussi dire « un prix » (récompense), comme le prix Nobel (*Nobelpriset*).',
  }),
  vocab(D, 'u25-lan', {
    prompt: 'L’argent emprunté à la banque : « un prêt »', promptEn: 'Money borrowed from the bank: "a loan"',
    sv: 'ett lån', fr: 'un prêt / un emprunt', en: 'a loan', ipa: '/ɛtː loːn/',
    note: 'Un prêt immobilier : *bolån*. Emprunter : *låna* ; prêter : *låna ut*.',
    gloss: [['ett', 'un', 'a'], ['lån', 'prêt', 'loan']],
  }),
  vocab(D, 'u25-sparar', {
    prompt: 'Mettre de l’argent de côté : « économise » (présent)', promptEn: 'Putting money aside: "save" (present)',
    sv: 'sparar', fr: 'économise / épargne', en: 'save / saves', ipa: '/ˈspɑːrar/',
    note: 'Infinitif *att spara*. Aussi : sauvegarder un fichier (*spara filen*).',
  }),
  vocab(D, 'u25-rantan', {
    prompt: 'Le coût de l’argent emprunté : « le taux d’intérêt »', promptEn: 'The cost of borrowed money: "the interest rate"',
    sv: 'räntan', fr: 'le taux d’intérêt / les intérêts', en: 'the interest rate', ipa: '/ˈrɛntan/',
    note: 'Défini de *en ränta*. Le taux directeur est fixé par la banque centrale : *Riksbanken*.',
  }),
  vocab(D, 'u25-budget', {
    prompt: 'Le plan des dépenses : « un budget »', promptEn: 'The spending plan: "a budget"',
    sv: 'en budget', fr: 'un budget', en: 'a budget', ipa: '/ɛn ˈbɵdʒɛt/',
    note: 'Emprunt à l’anglais. *hålla budgeten* = respecter le budget.',
    gloss: [['en', 'un', 'a'], ['budget', 'budget', 'budget']],
  }),
  vocab(D, 'u25-inflationen', {
    prompt: 'La hausse générale des prix : « l’inflation »', promptEn: 'The general rise in prices: "inflation"',
    sv: 'inflationen', fr: 'l’inflation', en: 'inflation', ipa: '/ɪnflaˈɧuːnɛn/',
    note: 'Les mots en **-tion** sont des mots **en** et se prononcent [ɧuːn].',
  }),
  vocab(D, 'u25-skatten', {
    prompt: 'Ce qu’on paie à l’État : « l’impôt »', promptEn: 'What you pay the state: "the tax"',
    sv: 'skatten', fr: 'l’impôt / la taxe', en: 'the tax', ipa: '/ˈskatːɛn/',
    note: 'Défini de *en skatt*. Même mot qu’un « trésor ». Prélevé à la source sur le salaire.',
  }),
  vocab(D, 'u25-lonar-sig', {
    prompt: 'Quand ça rapporte : « vaut la peine »', promptEn: 'When it pays off: "be worth it / pay"',
    sv: 'lönar sig', fr: 'vaut la peine / est rentable', en: 'pays off / is worth it', ipa: '/ˈløːnar sɛj/',
    note: 'Verbe réfléchi, de *lön* (salaire). *Det lönar sig inte* = ça ne vaut pas le coup.',
    gloss: [['lönar', 'rapporte', 'pays'], ['sig', 'se', 'itself']],
  }),
  vocab(D, 'u25-hojs', {
    prompt: 'Passif de « höja » : « est augmenté(e) / relevé(e) »', promptEn: 'Passive of "höja": "is raised"',
    sv: 'höjs', fr: 'est augmenté(e) / relevé(e)', en: 'is raised', ipa: '/højs/',
    note: 'Groupe 2 : *höjer* → passif *höjs* (on enlève le **-er** et on ajoute **-s**). Prétérit : *höjdes*.',
  }),
  vocab(D, 'u25-sanks', {
    prompt: 'Passif de « sänka » : « est baissé(e) »', promptEn: 'Passive of "sänka": "is lowered / cut"',
    sv: 'sänks', fr: 'est baissé(e) / réduit(e)', en: 'is lowered / cut', ipa: '/sɛŋks/',
    note: 'Contraire de *höjs*. *Räntan sänks* = le taux est abaissé.',
  }),

  // Ajouts (issue #14)
  vocab(D, 'u25-aktie', {
    prompt: 'Une part d’une entreprise en bourse : « une action »', promptEn: 'A share of a listed company: "a share"',
    sv: 'en aktie', fr: 'une action (en bourse)', en: 'a share / a stock', ipa: '/ɛn ˈakːtsɪɛ/',
    note: 'Pluriel : *aktier*. La bourse : *börsen*. Un fonds : *en fond*.',
  }),
  vocab(D, 'u25-bolan', {
    prompt: 'Le crédit pour acheter un logement : « un prêt immobilier »', promptEn: 'The loan for buying a home: "a mortgage"',
    sv: 'ett bolån', fr: 'un prêt immobilier', en: 'a mortgage', ipa: '/ɛtː ˈbuːˌloːn/',
    note: '*bo* (habiter) + *lån* (prêt). Sensible à *räntan* (le taux).',
  }),
  vocab(D, 'u25-kostnad', {
    prompt: 'Ce que quelque chose coûte : « un coût »', promptEn: 'What something costs: "a cost"',
    sv: 'en kostnad', fr: 'un coût / une dépense', en: 'a cost / an expense', ipa: '/ɛn ˈkɔstnad/',
    note: 'Souvent au pluriel : *kostnaderna ökar* (les coûts augmentent).',
  }),
  vocab(D, 'u25-inkomst', {
    prompt: 'L’argent qui rentre : « un revenu »', promptEn: 'Money coming in: "an income"',
    sv: 'en inkomst', fr: 'un revenu', en: 'an income', ipa: '/ɛn ˈɪnˌkɔmst/',
    note: '*in* (dedans) + *komst* (venue). L’impôt sur le revenu : *inkomstskatt*.',
  }),
  vocab(D, 'u25-kris', {
    prompt: 'Quand l’économie va très mal : « une crise »', promptEn: 'When the economy is in trouble: "a crisis"',
    sv: 'en kris', fr: 'une crise', en: 'a crisis', ipa: '/ɛn kriːs/',
    note: 'Pluriel : *kriser*. *Finanskrisen* = la crise financière.',
  }),
  vocab(D, 'u25-lagkonjunktur', {
    prompt: 'Une période où l’économie ralentit : « une récession »', promptEn: 'A period of slowdown: "a recession"',
    sv: 'en lågkonjunktur', fr: 'une récession / un ralentissement', en: 'a recession / a downturn', ipa: '/ɛn ˈloːɡkɔnjɵŋkˌtʉːr/',
    note: '*låg* (bas) + *konjunktur* (conjoncture). Le contraire : *högkonjunktur*.',
  }),
  phrase(D, 'u25-rantan-hojts', {
    prompt: 'Passif au parfait : « Le taux d’intérêt a encore été relevé. »', promptEn: 'Perfect passive: "The interest rate has been raised again."',
    sv: 'Räntan har höjts igen.', fr: 'Le taux d’intérêt a encore été relevé.', en: 'The interest rate has been raised again.',
    ipa: '/ˈrɛntan hɑːr højts ɪˈjɛn/',
    note: 'Parfait passif = *har* + supin + **s** : *har höjt* → *har höjts*.',
    gloss: [['räntan', 'le taux', 'the interest rate'], ['har', 'a', 'has'], ['höjts', 'été relevé', 'been raised'], ['igen', 'encore', 'again']],
  }),
  phrase(D, 'u25-priserna-hogre', {
    prompt: '« Les prix ont augmenté l’année dernière. »', promptEn: '"Prices rose last year."',
    sv: 'Priserna blev högre förra året.', fr: 'Les prix ont augmenté l’année dernière.', en: 'Prices rose last year.',
    ipa: '/ˈpriːsɛɳa bleːv ˈhøːɡrɛ ˈfœrːa ˈoːrɛt/',
    note: '*högre* = comparatif irrégulier de *hög* (haut). **förra året** = l’année dernière (*förra* + défini).',
    gloss: [['priserna', 'les prix', 'prices'], ['blev', 'sont devenus', 'became'], ['högre', 'plus élevés', 'higher'], ['förra', 'dernière', 'last'], ['året', 'l’année', 'year']],
  }),
  phrase(D, 'u25-sparar-pengar', {
    prompt: '« Nous mettons de l’argent de côté pour un voyage. »', promptEn: '"We are saving money for a trip."',
    sv: 'Vi sparar pengar till en resa.', fr: 'Nous mettons de l’argent de côté pour un voyage.', en: 'We are saving money for a trip.',
    ipa: '/viː ˈspɑːrar ˈpɛŋːar tɪlː ɛn ˈreːsa/',
    note: '*spara till* = économiser pour (un but).',
    gloss: [['vi', 'nous', 'we'], ['sparar', 'économisons', 'are saving'], ['pengar', 'argent', 'money'], ['till', 'pour', 'for'], ['en', 'un', 'a'], ['resa', 'voyage', 'trip']],
  }),
  phrase(D, 'u25-blev-beviljat', {
    prompt: 'Passif avec « bli » : « Le prêt a été accordé par la banque. »', promptEn: 'Passive with "bli": "The loan was granted by the bank."',
    sv: 'Lånet blev beviljat av banken.', fr: 'Le prêt a été accordé par la banque.', en: 'The loan was granted by the bank.',
    ipa: '/ˈloːnɛt bleːv bɛˈvɪljat ɑːv ˈbaŋkɛn/',
    note: '**bli** + participe passé (accordé : *beviljat* car *lånet* est neutre). Plus oral que *beviljades*, et insiste sur le résultat.',
    gloss: [['lånet', 'le prêt', 'the loan'], ['blev', 'a été', 'was'], ['beviljat', 'accordé', 'granted'], ['av', 'par', 'by'], ['banken', 'la banque', 'the bank']],
  }),
  phrase(D, 'u25-lonar-sig-jamfora', {
    prompt: '« Ça vaut la peine de comparer les prix. »', promptEn: '"It pays to compare prices."',
    sv: 'Det lönar sig att jämföra priser.', fr: 'Ça vaut la peine de comparer les prix.', en: 'It pays to compare prices.',
    ipa: '/deː ˈløːnar sɛj at ˈjɛmˌføːra ˈpriːsɛr/',
    note: '*jämföra* = comparer (*jäm-* = égal). *Det lönar sig att* + infinitif.',
    gloss: [['det', 'ça', 'it'], ['lönar', 'vaut', 'pays'], ['sig', '(la peine)', '(off)'], ['att', 'de', 'to'], ['jämföra', 'comparer', 'compare'], ['priser', 'prix', 'prices']],
  }),
  phrase(D, 'u25-skatten-dras', {
    prompt: '« L’impôt est prélevé sur le salaire. »', promptEn: '"The tax is deducted from the salary."',
    sv: 'Skatten dras från lönen.', fr: 'L’impôt est prélevé sur le salaire.', en: 'The tax is deducted from the salary.',
    ipa: '/ˈskatːɛn drɑːs froːn ˈløːnɛn/',
    note: '*dras* = passif de *dra* (tirer) : verbe court, on ajoute simplement **-s**.',
    gloss: [['skatten', 'l’impôt', 'the tax'], ['dras', 'est prélevé', 'is deducted'], ['från', 'sur', 'from'], ['lönen', 'le salaire', 'the salary']],
  }),
  phrase(D, 'u25-halla-budgeten', {
    prompt: '« Nous devons respecter le budget. »', promptEn: '"We have to stay within the budget."',
    sv: 'Vi måste hålla budgeten.', fr: 'Nous devons respecter le budget.', en: 'We have to stay within the budget.',
    ipa: '/viː ˈmɔsːtɛ ˈhɔlːa ˈbɵdʒɛtɛn/',
    note: '**hålla** = tenir : *hålla budgeten*, *hålla tiden* (être à l’heure), *hålla ett löfte* (tenir une promesse).',
    gloss: [['vi', 'nous', 'we'], ['måste', 'devons', 'have to'], ['hålla', 'tenir', 'keep'], ['budgeten', 'le budget', 'the budget']],
  }),
  phrase(D, 'u25-inflationen-sjunkit', {
    prompt: '« L’inflation a baissé cette année. »', promptEn: '"Inflation has fallen this year."',
    sv: 'Inflationen har sjunkit i år.', fr: 'L’inflation a baissé cette année.', en: 'Inflation has fallen this year.',
    ipa: '/ɪnflaˈɧuːnɛn hɑːr ˈɧɵŋkɪt ɪ oːr/',
    note: '*sjunka, sjönk, har sjunkit* (verbe fort, intransitif). **i år** = cette année (comme *i sommar*).',
    gloss: [['inflationen', 'l’inflation', 'inflation'], ['har', 'a', 'has'], ['sjunkit', 'baissé', 'fallen'], ['i', 'cette', 'this'], ['år', 'année', 'year']],
  }),
];
