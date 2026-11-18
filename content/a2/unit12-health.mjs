// Unité 12 : Santé (A2, Section 4). Grammaire : « ha ont i » + partie du corps définie, impératif.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT12_DECK = unitDeck({
  n: 12, slug: 'swedish-unit-12-health', fr: 'Santé', en: 'Health',
  level: 'A2', section: 'section-4-en-suede', after: 'swedish-unit-11-free-time',
});
const D = UNIT12_DECK.slug;

export const UNIT12_CARDS = [
  vocab(D, 'u12-sjuk', {
    prompt: 'Quand on ne va pas bien : « malade »', promptEn: 'When you are not well: "ill / sick"',
    sv: 'sjuk', fr: 'malade', en: 'ill / sick', ipa: '/ɧʉːk/',
    note: 'Le **sj** se prononce [ɧ], comme *sju*. Être en arrêt maladie : *vara sjukskriven*.',
  }),
  vocab(D, 'u12-ha-ont', {
    prompt: 'Ressentir une douleur : « avoir mal »', promptEn: 'Feeling pain: "to hurt / to have a pain"',
    sv: 'ha ont', fr: 'avoir mal', en: 'to hurt / to have a pain', ipa: '/hɑː ʊnːt/',
    note: 'Construction : **ha ont i** + partie du corps **définie** : *ont i huvudet*, *ont i magen*.',
    gloss: [['ha', 'avoir', 'have'], ['ont', 'mal', 'pain']],
  }),
  vocab(D, 'u12-huvudet', {
    prompt: 'En haut du corps : « la tête »', promptEn: 'At the top of the body: "the head"',
    sv: 'huvudet', fr: 'la tête', en: 'the head', ipa: '/ˈhʉːvɵdɛt/',
    note: 'Défini de *ett huvud*. À l’oral, souvent réduit en [ˈhʉːvɛt].',
  }),
  vocab(D, 'u12-magen', {
    prompt: 'Au milieu du corps : « le ventre / l’estomac »', promptEn: 'The middle of the body: "the stomach"',
    sv: 'magen', fr: 'le ventre / l’estomac', en: 'the stomach', ipa: '/ˈmɑːɡɛn/',
    note: 'Défini de *en mage*. *ont i magen* = mal au ventre.',
  }),
  vocab(D, 'u12-halsen', {
    prompt: 'Là où l’on avale : « la gorge / le cou »', promptEn: 'Where you swallow: "the throat / the neck"',
    sv: 'halsen', fr: 'la gorge / le cou', en: 'the throat / the neck', ipa: '/ˈhalsɛn/',
    note: 'Défini de *en hals*. Un mal de gorge : *halsont*.',
  }),
  vocab(D, 'u12-feber', {
    prompt: 'Une température trop élevée : « de la fièvre »', promptEn: 'A high temperature: "a fever"',
    sv: 'feber', fr: 'de la fièvre', en: 'a fever', ipa: '/ˈfeːbɛr/',
    note: 'Sans article : *jag har feber*. Un rhume : *en förkylning* (*jag är förkyld*).',
  }),
  vocab(D, 'u12-apotek', {
    prompt: 'Là où l’on achète des médicaments : « une pharmacie »', promptEn: 'Where you buy medicine: "a pharmacy"',
    sv: 'ett apotek', fr: 'une pharmacie', en: 'a pharmacy', ipa: '/ɛtː apʊˈteːk/',
    note: 'Mot **ett**, accent sur **tek**. Les médicaments courants se trouvent aussi au supermarché.',
    gloss: [['ett', 'une', 'a'], ['apotek', 'pharmacie', 'pharmacy']],
  }),
  vocab(D, 'u12-vardcentral', {
    prompt: 'Le centre de soins de quartier : « un centre de santé »', promptEn: 'The local health clinic: "a health centre"',
    sv: 'en vårdcentral', fr: 'un centre de santé', en: 'a health centre', ipa: '/ɛn ˈvoːɖsɛnˌtrɑːl/',
    accent: 'Accent 2 (Grave)',
    note: '*vård* (soins) + *central*. C’est là qu’on va d’abord, pas directement chez un spécialiste.',
    gloss: [['en', 'un', 'a'], ['vårdcentral', 'centre de santé', 'health centre']],
  }),
  vocab(D, 'u12-lakare', {
    prompt: 'La personne qui soigne : « un médecin »', promptEn: 'The person who treats you: "a doctor"',
    sv: 'en läkare', fr: 'un médecin', en: 'a doctor', ipa: '/ɛn ˈlɛːkarɛ/',
    note: 'Invariable au pluriel : *två läkare*. Comme *lärare* (professeur, Unité 10).',
    gloss: [['en', 'un', 'a'], ['läkare', 'médecin', 'doctor']],
  }),
  vocab(D, 'u12-vila', {
    prompt: 'Ce que conseille le médecin : « se reposer »', promptEn: 'What the doctor advises: "to rest"',
    sv: 'vila', fr: 'se reposer / repose-toi', en: 'rest', ipa: '/ˈviːla/',
    note: 'Infinitif et impératif identiques pour le groupe 1 : *Vila!* = Repose-toi ! Pas de réfléchi.',
  }),

  phrase(D, 'u12-jag-ar-sjuk', {
    prompt: 'Prévenir : « Je suis malade aujourd’hui. »', promptEn: 'Letting someone know: "I am ill today."',
    sv: 'Jag är sjuk idag.', fr: 'Je suis malade aujourd’hui.', en: 'I am ill today.',
    ipa: '/jɑː æːr ɧʉːk ɪˈdɑː/',
    note: 'Pour prévenir le travail : *Jag är sjuk idag, jag kommer inte.* (je ne viens pas).',
    gloss: [['jag', 'je', 'I'], ['är', 'suis', 'am'], ['sjuk', 'malade', 'ill'], ['idag', 'aujourd’hui', 'today']],
  }),
  phrase(D, 'u12-ont-i-huvudet', {
    prompt: '« J’ai mal à la tête. »', promptEn: '"I have a headache."',
    sv: 'Jag har ont i huvudet.', fr: 'J’ai mal à la tête.', en: 'I have a headache.',
    ipa: '/jɑː hɑːr ʊnːt ɪ ˈhʉːvɵdɛt/',
    note: 'Mot à mot : « j’ai mal **dans** la tête ». Toujours **i** + forme définie.',
    gloss: [['jag', 'je', 'I'], ['har', 'ai', 'have'], ['ont', 'mal', 'pain'], ['i', 'dans', 'in'], ['huvudet', 'la tête', 'the head']],
  }),
  phrase(D, 'u12-ont-i-magen', {
    prompt: '« Elle a mal au ventre. »', promptEn: '"She has a stomach ache."',
    sv: 'Hon har ont i magen.', fr: 'Elle a mal au ventre.', en: 'She has a stomach ache.',
    ipa: '/hʊnː hɑːr ʊnːt ɪ ˈmɑːɡɛn/',
    note: 'Même moule : *ont i halsen* (mal à la gorge), *ont i ryggen* (mal au dos).',
    gloss: [['hon', 'elle', 'she'], ['har', 'a', 'has'], ['ont', 'mal', 'pain'], ['i', 'dans', 'in'], ['magen', 'le ventre', 'the stomach']],
  }),
  phrase(D, 'u12-jag-har-feber', {
    prompt: '« J’ai de la fièvre. »', promptEn: '"I have a fever."',
    sv: 'Jag har feber.', fr: 'J’ai de la fièvre.', en: 'I have a fever.',
    ipa: '/jɑː hɑːr ˈfeːbɛr/',
    note: 'Pas d’article ni de « de la » : *har feber*.',
    gloss: [['jag', 'je', 'I'], ['har', 'ai', 'have'], ['feber', 'fièvre', 'fever']],
  }),
  phrase(D, 'u12-ring-1177', {
    prompt: 'Le bon réflexe en Suède : « Appelle le 1177 si tu es malade. »', promptEn: 'The right reflex in Sweden: "Call 1177 if you are ill."',
    sv: 'Ring 1177 om du är sjuk.', fr: 'Appelle le 1177 si tu es malade.', en: 'Call 1177 if you are ill.',
    ipa: '/rɪŋː ˈɛlva ˈɧɵtːɪˌɧʉː ɔm dʉː æːr ɧʉːk/',
    note: '**1177** = conseil médical par téléphone, se lit *elva sjuttiosju*. Urgences vitales : **112**. **Ring!** = impératif de *ringa* (radical sans -a). **om** = si.',
    gloss: [['ring', 'appelle', 'call'], ['1177', '1177', '1177'], ['om', 'si', 'if'], ['du', 'tu', 'you'], ['är', 'es', 'are'], ['sjuk', 'malade', 'ill']],
    words: ['Ring elva sjuttiosju om du är sjuk.'],
  }),
  phrase(D, 'u12-narmaste-apotek', {
    prompt: '« Où est la pharmacie la plus proche ? »', promptEn: '"Where is the nearest pharmacy?"',
    sv: 'Var ligger närmaste apotek?', fr: 'Où est la pharmacie la plus proche ?', en: 'Where is the nearest pharmacy?',
    ipa: '/vɑːr ˈlɪɡːɛr ˈnæːrmastɛ apʊˈteːk/',
    note: '**närmaste** = le plus proche (superlatif de *nära*). Comme *nästa*, il s’emploie sans article.',
    gloss: [['var', 'où', 'where'], ['ligger', 'se trouve', 'is'], ['närmaste', 'la plus proche', 'nearest'], ['apotek', 'pharmacie', 'pharmacy']],
  }),
  phrase(D, 'u12-behover-lakare', {
    prompt: '« J’ai besoin de voir un médecin. »', promptEn: '"I need to see a doctor."',
    sv: 'Jag behöver träffa en läkare.', fr: 'J’ai besoin de voir un médecin.', en: 'I need to see a doctor.',
    ipa: '/jɑː bɛˈhøːvɛr ˈtrɛfːa ɛn ˈlɛːkarɛ/',
    note: '**behöver** + infinitif sans *att*, comme un modal. *träffa* = rencontrer, voir quelqu’un (cf. *träffas*, Unité 1).',
    gloss: [['jag', 'je', 'I'], ['behöver', 'ai besoin de', 'need'], ['träffa', 'voir', 'see'], ['en', 'un', 'a'], ['läkare', 'médecin', 'doctor']],
  }),
  phrase(D, 'u12-vila-och-drick', {
    prompt: 'Le conseil du médecin : « Repose-toi et bois beaucoup d’eau ! »', promptEn: 'The doctor’s advice: "Rest and drink lots of water!"',
    sv: 'Vila och drick mycket vatten!', fr: 'Repose-toi et bois beaucoup d’eau !', en: 'Rest and drink lots of water!',
    ipa: '/ˈviːla ɔ drɪkː ˈmʏkːɛ ˈvatːɛn/',
    note: 'Impératif = radical du verbe : *vila* (groupe 1, garde le -a), **drick** (de *dricka*, perd le -a).',
    gloss: [['vila', 'repose-toi', 'rest'], ['och', 'et', 'and'], ['drick', 'bois', 'drink'], ['mycket', 'beaucoup', 'lots of'], ['vatten', 'eau', 'water']],
  }),
];
