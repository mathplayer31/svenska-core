// Unité 26 : Santé & société (B2, Section 7). Grammaire : participes présent (-ande) et passé, participe substantivé.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT26_DECK = unitDeck({
  n: 26, slug: 'swedish-unit-26-welfare', fr: 'Santé & société', en: 'Health & society',
  level: 'B2', section: 'section-7-travailler', after: 'swedish-unit-25-economy',
});
const D = UNIT26_DECK.slug;

export const UNIT26_CARDS = [
  vocab(D, 'u26-varden', {
    prompt: 'Le système de soins : « les soins (de santé) »', promptEn: 'The healthcare system: "healthcare"',
    sv: 'vården', fr: 'les soins / le système de santé', en: 'healthcare', ipa: '/ˈvoːɖɛn/',
    note: 'Défini de *vård*. Le **rd** est rétroflexe. Cf. *vårdcentral* (Unité 12).',
  }),
  vocab(D, 'u26-valfarden', {
    prompt: 'L’État-providence : « le bien-être social »', promptEn: 'The welfare state: "welfare"',
    sv: 'välfärden', fr: 'l’État-providence / la protection sociale', en: 'welfare', ipa: '/ˈvɛːlˌfæːɖɛn/',
    note: '*väl* (bien) + *färd* (voyage, état). Financée par des impôts élevés : *välfärdsstaten*.',
  }),
  vocab(D, 'u26-forsakring', {
    prompt: 'Protection contre les risques : « une assurance »', promptEn: 'Protection against risk: "insurance"',
    sv: 'en försäkring', fr: 'une assurance', en: 'insurance', ipa: '/ɛn fœˈʂɛːkrɪŋ/',
    note: 'L’assurance sociale : *Försäkringskassan*, qui verse indemnités maladie et allocations parentales.',
    gloss: [['en', 'une', 'an'], ['försäkring', 'assurance', 'insurance']],
  }),
  vocab(D, 'u26-sjukskriven', {
    prompt: 'Arrêté par le médecin : « en arrêt maladie »', promptEn: 'Signed off by the doctor: "on sick leave"',
    sv: 'sjukskriven', fr: 'en arrêt maladie', en: 'on sick leave', ipa: '/ˈɧʉːkˌskriːvɛn/',
    note: 'Participe passé de *sjukskriva* (litt. « écrire malade »). Pluriel : *sjukskrivna*.',
  }),
  vocab(D, 'u26-remiss', {
    prompt: 'L’orientation vers un spécialiste : « une lettre d’orientation »', promptEn: 'Being sent on to a specialist: "a referral"',
    sv: 'en remiss', fr: 'une orientation / une lettre de référence', en: 'a referral', ipa: '/ɛn rɛˈmɪsː/',
    note: 'Pour voir un spécialiste, il faut souvent une *remiss* du *vårdcentral*.',
    gloss: [['en', 'une', 'a'], ['remiss', 'orientation', 'referral']],
  }),
  vocab(D, 'u26-vantetid', {
    prompt: 'Le temps avant un rendez-vous : « le délai d’attente »', promptEn: 'The time before an appointment: "the waiting time"',
    sv: 'väntetid', fr: 'le délai d’attente', en: 'waiting time', ipa: '/ˈvɛntɛˌtiːd/',
    note: '*vänta* + *tid*. Sujet récurrent du débat public sur la santé.',
  }),
  vocab(D, 'u26-sjukskoterska', {
    prompt: 'Le métier qui soigne au quotidien : « un(e) infirmier(ère) »', promptEn: 'The everyday caring profession: "a nurse"',
    sv: 'en sjuksköterska', fr: 'un(e) infirmier(ère)', en: 'a nurse', ipa: '/ɛn ˈɧʉːkˌɧøːtɛʂka/',
    accent: 'Accent 2 (Grave)',
    note: '*sjuk* (malade) + *sköterska* (soignante, de *sköta*). Deux sons [ɧ] à la suite.',
    gloss: [['en', 'un(e)', 'a'], ['sjuksköterska', 'infirmier(ère)', 'nurse']],
  }),
  vocab(D, 'u26-behandling', {
    prompt: 'Ce que reçoit le patient : « un traitement »', promptEn: 'What the patient receives: "treatment"',
    sv: 'en behandling', fr: 'un traitement', en: 'treatment', ipa: '/ɛn bɛˈhandlɪŋ/',
    note: 'De *behandla* (traiter). Suffixe **-ling** / **-ning** → mot **en**.',
    gloss: [['en', 'un', 'a'], ['behandling', 'traitement', 'treatment']],
  }),
  vocab(D, 'u26-foraldraledig', {
    prompt: 'En congé pour s’occuper de son enfant : « en congé parental »', promptEn: 'On leave to look after your child: "on parental leave"',
    sv: 'föräldraledig', fr: 'en congé parental', en: 'on parental leave', ipa: '/fœˈrɛldraˌleːdɪɡ/',
    note: '480 jours par enfant, à partager entre les deux parents. Les pères en poussette : les fameux *lattepappor*.',
  }),
  vocab(D, 'u26-avgift', {
    prompt: 'Une somme à payer pour un service : « une redevance / des frais »', promptEn: 'A sum to pay for a service: "a fee / a charge"',
    sv: 'en avgift', fr: 'des frais / une redevance', en: 'a fee / a charge', ipa: '/ɛn ˈɑːvˌjɪft/',
    note: 'Le **g** devant **i** se dit [j]. *avgiftsfri* = gratuit (sans frais).',
    gloss: [['en', 'des', 'a'], ['avgift', 'frais', 'fee']],
  }),

  // Ajouts (issue #14)
  vocab(D, 'u26-sjukhuset', {
    prompt: 'Pour les soins graves et les urgences : « l’hôpital »', promptEn: 'For serious care and emergencies: "the hospital"',
    sv: 'sjukhuset', fr: 'l’hôpital', en: 'the hospital', ipa: '/ˈɧʉːkˌhʉːsɛt/',
    note: '*sjuk* (malade) + *hus* (maison). Les urgences : *akuten*.',
  }),
  vocab(D, 'u26-patient', {
    prompt: 'La personne soignée : « un patient »', promptEn: 'The person receiving care: "a patient"',
    sv: 'en patient', fr: 'un patient / une patiente', en: 'a patient', ipa: '/ɛn pasɪˈɛnt/',
    note: 'Le **ti** se prononce [sɪ]. Accent sur la fin.',
  }),
  vocab(D, 'u26-pension', {
    prompt: 'L’argent touché après la vie active : « une retraite »', promptEn: 'Money after your working life: "a pension"',
    sv: 'en pension', fr: 'une retraite (pension)', en: 'a pension', ipa: '/ɛn panˈɧuːn/',
    note: 'Le **sion** se prononce [ɧuːn]. Partir à la retraite : *gå i pension*.',
  }),
  vocab(D, 'u26-barnbidrag', {
    prompt: 'L’allocation versée pour chaque enfant', promptEn: 'The benefit paid for every child: "child benefit"',
    sv: 'barnbidrag', fr: 'les allocations familiales', en: 'child benefit', ipa: '/ˈbɑːɳbɪˌdrɑːɡ/',
    note: '*barn* (enfant) + *bidrag* (contribution). Versé par *Försäkringskassan* jusqu’à 16 ans.',
  }),
  vocab(D, 'u26-a-kassan', {
    prompt: 'L’assurance chômage', promptEn: 'Unemployment insurance',
    sv: 'a-kassan', fr: 'la caisse d’assurance chômage', en: 'the unemployment fund', ipa: '/ˈɑːˌkasːan/',
    note: '*arbetslöshetskassa*, abrégé. L’adhésion est volontaire, souvent via le syndicat.',
  }),
  vocab(D, 'u26-tandlakare', {
    prompt: 'Le médecin des dents : « un dentiste »', promptEn: 'The tooth doctor: "a dentist"',
    sv: 'en tandläkare', fr: 'un / une dentiste', en: 'a dentist', ipa: '/ɛn ˈtandˌlɛːkarɛ/',
    note: '*tand* (dent) + *läkare* (médecin). Gratuit jusqu’à 23 ans, ensuite payant.',
  }),
  phrase(D, 'u26-sjukskriven-tva-veckor', {
    prompt: '« Je suis en arrêt maladie pour deux semaines. »', promptEn: '"I am on sick leave for two weeks."',
    sv: 'Jag är sjukskriven i två veckor.', fr: 'Je suis en arrêt maladie pour deux semaines.', en: 'I am on sick leave for two weeks.',
    ipa: '/jɑː æːr ˈɧʉːkˌskriːvɛn ɪ tvoː ˈvɛkːʊr/',
    note: 'Participe passé employé comme adjectif après *är*. Durée : **i** + durée.',
    gloss: [['jag', 'je', 'I'], ['är', 'suis', 'am'], ['sjukskriven', 'en arrêt maladie', 'on sick leave'], ['i', 'pour', 'for'], ['två', 'deux', 'two'], ['veckor', 'semaines', 'weeks']],
  }),
  phrase(D, 'u26-skattefinansierad', {
    prompt: '« Les soins en Suède sont financés par l’impôt. »', promptEn: '"Healthcare in Sweden is funded by taxes."',
    sv: 'Vården i Sverige är skattefinansierad.', fr: 'Les soins en Suède sont financés par l’impôt.', en: 'Healthcare in Sweden is funded by taxes.',
    ipa: '/ˈvoːɖɛn ɪ ˈsværjɛ æːr ˈskatːɛfɪnanˌsjeːrad/',
    note: 'Mot composé + participe passé : *skatte-* + *finansierad*. Le suédois colle les mots là où le français utilise « par ».',
    gloss: [['vården', 'les soins', 'healthcare'], ['i', 'en', 'in'], ['Sverige', 'Suède', 'Sweden'], ['är', 'sont', 'is'], ['skattefinansierad', 'financés par l’impôt', 'tax-funded']],
  }),
  phrase(D, 'u26-vantetiden-lang', {
    prompt: '« Le délai pour voir le spécialiste est long. »', promptEn: '"The waiting time for the specialist is long."',
    sv: 'Väntetiden till specialisten är lång.', fr: 'Le délai pour voir le spécialiste est long.', en: 'The waiting time for the specialist is long.',
    ipa: '/ˈvɛntɛˌtiːdɛn tɪlː spɛsiaˈlɪstɛn æːr lɔŋː/',
    note: '*till* marque la destination (le spécialiste qu’on attend de voir).',
    gloss: [['väntetiden', 'le délai', 'the waiting time'], ['till', 'pour', 'for'], ['specialisten', 'le spécialiste', 'the specialist'], ['är', 'est', 'is'], ['lång', 'long', 'long']],
  }),
  phrase(D, 'u26-skrev-remiss', {
    prompt: '« Le médecin a fait une lettre d’orientation vers l’hôpital. »', promptEn: '"The doctor wrote a referral to the hospital."',
    sv: 'Läkaren skrev en remiss till sjukhuset.', fr: 'Le médecin a fait une lettre d’orientation vers l’hôpital.', en: 'The doctor wrote a referral to the hospital.',
    ipa: '/ˈlɛːkarɛn skreːv ɛn rɛˈmɪsː tɪlː ˈɧʉːkˌhʉːsɛt/',
    note: '*skriva, skrev, har skrivit* (verbe fort). *sjukhus* = hôpital (« maison des malades »).',
    gloss: [['läkaren', 'le médecin', 'the doctor'], ['skrev', 'a écrit', 'wrote'], ['en', 'une', 'a'], ['remiss', 'orientation', 'referral'], ['till', 'vers', 'to'], ['sjukhuset', 'l’hôpital', 'the hospital']],
  }),
  phrase(D, 'u26-foraldraledig-dotter', {
    prompt: '« Il est en congé parental avec sa fille. »', promptEn: '"He is on parental leave with his daughter."',
    sv: 'Han är föräldraledig med sin dotter.', fr: 'Il est en congé parental avec sa fille.', en: 'He is on parental leave with his daughter.',
    ipa: '/hanː æːr fœˈrɛldraˌleːdɪɡ meː sɪnː ˈdɔtːɛr/',
    note: '*sin* : sa propre fille (renvoie au sujet *han*, Unité 3). *dotter* = fille (enfant), pluriel *döttrar*.',
    gloss: [['han', 'il', 'he'], ['är', 'est', 'is'], ['föräldraledig', 'en congé parental', 'on parental leave'], ['med', 'avec', 'with'], ['sin', 'sa (propre)', 'his (own)'], ['dotter', 'fille', 'daughter']],
  }),
  phrase(D, 'u26-vantande-patienten', {
    prompt: 'Participe présent : « Le patient qui attendait s’est inquiété. »', promptEn: 'Present participle: "The waiting patient became worried."',
    sv: 'Den väntande patienten blev orolig.', fr: 'Le patient qui attendait s’est inquiété.', en: 'The waiting patient became worried.',
    ipa: '/dɛnː ˈvɛntandɛ paˈɧɛntɛn bleːv ˈuːˌruːlɪɡ/',
    note: 'Participe présent = radical + **-ande** (ou **-ende** après une voyelle longue : *gående*). Il s’emploie comme un adjectif invariable.',
    gloss: [['den', 'le', 'the'], ['väntande', 'qui attendait', 'waiting'], ['patienten', 'patient', 'patient'], ['blev', 'est devenu', 'became'], ['orolig', 'inquiet', 'worried']],
  }),
  phrase(D, 'u26-avgiftsfri', {
    prompt: '« Le traitement est gratuit pour les enfants. »', promptEn: '"The treatment is free for children."',
    sv: 'Behandlingen är avgiftsfri för barn.', fr: 'Le traitement est gratuit pour les enfants.', en: 'The treatment is free for children.',
    ipa: '/bɛˈhandlɪŋɛn æːr ˈɑːvjɪftsˌfriː fœr bɑːɳ/',
    note: '*avgift* + *fri* (libre de) = sans frais. Même modèle : *rökfri* (non-fumeur), *sockerfri* (sans sucre).',
    gloss: [['behandlingen', 'le traitement', 'the treatment'], ['är', 'est', 'is'], ['avgiftsfri', 'gratuit', 'free of charge'], ['för', 'pour', 'for'], ['barn', 'enfants', 'children']],
  }),
  phrase(D, 'u26-alla-anstallda', {
    prompt: 'Participe substantivé : « Tous les employés ont une assurance. »', promptEn: 'Participle as a noun: "All employees have insurance."',
    sv: 'Alla anställda har en försäkring.', fr: 'Tous les employés ont une assurance.', en: 'All employees have insurance.',
    ipa: '/ˈalːa ˈanːˌstɛlda hɑːr ɛn fœˈʂɛːkrɪŋ/',
    note: '*anställd* (participe passé de *anställa*, embaucher) devient un nom : **de anställda** = les employés. Pluriel en **-a**.',
    gloss: [['alla', 'tous les', 'all'], ['anställda', 'employés', 'employees'], ['har', 'ont', 'have'], ['en', 'une', 'an'], ['försäkring', 'assurance', 'insurance']],
  }),
];
