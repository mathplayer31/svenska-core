// Unité 27 : Environnement & climat (B2, Section 7). Grammaire : conditionnel (skulle, om … hade), borde.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT27_DECK = unitDeck({
  n: 27, slug: 'swedish-unit-27-climate', fr: 'Environnement & climat', en: 'Environment & climate',
  level: 'B2', section: 'section-7-travailler', after: 'swedish-unit-26-welfare',
});
const D = UNIT27_DECK.slug;

export const UNIT27_CARDS = [
  vocab(D, 'u27-klimatet', {
    prompt: 'Le temps moyen sur la durée : « le climat »', promptEn: 'Average weather over time: "the climate"',
    sv: 'klimatet', fr: 'le climat', en: 'the climate', ipa: '/klɪˈmɑːtɛt/',
    note: 'Défini de *ett klimat*. À ne pas confondre avec *vädret* (le temps du jour, Unité 7).',
  }),
  vocab(D, 'u27-utslapp', {
    prompt: 'Ce qui est rejeté dans l’air : « des émissions »', promptEn: 'What is released into the air: "emissions"',
    sv: 'utsläpp', fr: 'des émissions / des rejets', en: 'emissions', ipa: '/ˈʉːtˌslɛpː/',
    note: '*ut* (dehors) + *släppa* (lâcher). Mot **ett**, invariable au pluriel. Défini pluriel : *utsläppen*.',
  }),
  vocab(D, 'u27-atervinner', {
    prompt: 'Donner une seconde vie aux déchets : « recycle » (présent)', promptEn: 'Giving waste a second life: "recycle" (present)',
    sv: 'återvinner', fr: 'recycle / recyclons', en: 'recycle / recycles', ipa: '/ˈoːtɛrˌvɪnːɛr/',
    note: '*åter* (de nouveau) + *vinna* (gagner). La station de tri : *återvinningsstation*. La consigne des canettes : *pant*.',
  }),
  vocab(D, 'u27-hallbar', {
    prompt: 'Qui peut durer sans épuiser les ressources : « durable »', promptEn: 'Able to last without using up resources: "sustainable"',
    sv: 'hållbar', fr: 'durable', en: 'sustainable', ipa: '/ˈhɔlːbɑːr/',
    note: 'Suffixe **-bar** (= -able) : *hålla* + *-bar*. Le nom : *hållbarhet* (développement durable).',
  }),
  vocab(D, 'u27-miljon', {
    prompt: 'La nature et ce qui nous entoure : « l’environnement »', promptEn: 'Nature and our surroundings: "the environment"',
    sv: 'miljön', fr: 'l’environnement', en: 'the environment', ipa: '/mɪlˈjøːn/',
    note: 'Vient du français « milieu ». *miljövänlig* = écologique (« ami de l’environnement »).',
  }),
  vocab(D, 'u27-fornybar', {
    prompt: 'Qui se renouvelle (soleil, vent, eau) : « renouvelable »', promptEn: 'That renews itself (sun, wind, water): "renewable"',
    sv: 'förnybar', fr: 'renouvelable', en: 'renewable', ipa: '/ˈfœːrnyˌbɑːr/',
    note: '*förnya* (renouveler, cf. *ny*) + **-bar**. *förnybar energi* = énergie renouvelable.',
  }),
  vocab(D, 'u27-elbil', {
    prompt: 'Une voiture sans essence : « une voiture électrique »', promptEn: 'A car without petrol: "an electric car"',
    sv: 'en elbil', fr: 'une voiture électrique', en: 'an electric car', ipa: '/ɛn ˈeːlˌbiːl/',
    note: '*el* (électricité) + *bil* (voiture). Composés très courants : *elcykel*, *elräkning* (facture d’électricité).',
    gloss: [['en', 'une', 'an'], ['elbil', 'voiture électrique', 'electric car']],
  }),
  vocab(D, 'u27-sopor', {
    prompt: 'Ce qu’on jette : « les ordures / les déchets »', promptEn: 'What you throw away: "rubbish / garbage"',
    sv: 'sopor', fr: 'les ordures / les déchets', en: 'rubbish / garbage', ipa: '/ˈsuːpʊr/',
    note: 'Toujours au pluriel. *slänga soporna* = sortir les poubelles.',
  }),
  vocab(D, 'u27-minskar', {
    prompt: 'Le contraire d’augmenter : « diminue / réduit »', promptEn: 'The opposite of increase: "decrease / reduce"',
    sv: 'minskar', fr: 'diminue / réduit', en: 'decrease / reduce', ipa: '/ˈmɪnskar/',
    note: 'Transitif et intransitif : *utsläppen minskar* (baissent), *vi minskar utsläppen* (nous réduisons). Contraire : *ökar* (Unité 21).',
  }),
  vocab(D, 'u27-skulle', {
    prompt: 'L’auxiliaire du conditionnel : « (je) ferais / serait »', promptEn: 'The conditional auxiliary: "would"',
    sv: 'skulle', fr: 'conditionnel (ferait, serait…)', en: 'would', ipa: '/ˈskɵlːɛ/',
    note: 'Prétérit de *ska*. **skulle** + infinitif = conditionnel : *jag skulle köpa* (j’achèterais).',
  }),

  phrase(D, 'u27-sorterar-soporna', {
    prompt: '« Nous trions les déchets et nous recyclons. »', promptEn: '"We sort our rubbish and recycle."',
    sv: 'Vi sorterar soporna och återvinner.', fr: 'Nous trions les déchets et nous recyclons.', en: 'We sort our rubbish and recycle.',
    ipa: '/viː sɔrˈteːrar ˈsuːpʊɳa ɔ ˈoːtɛrˌvɪnːɛr/',
    note: '*sortera* (verbe en **-era**). *soporna* = pluriel défini de *sopor*.',
    gloss: [['vi', 'nous', 'we'], ['sorterar', 'trions', 'sort'], ['soporna', 'les déchets', 'the rubbish'], ['och', 'et', 'and'], ['återvinner', 'recyclons', 'recycle']],
  }),
  phrase(D, 'u27-utslappen-minska', {
    prompt: '« Les émissions doivent baisser. »', promptEn: '"Emissions must decrease."',
    sv: 'Utsläppen måste minska.', fr: 'Les émissions doivent baisser.', en: 'Emissions must decrease.',
    ipa: '/ˈʉːtˌslɛpːɛn ˈmɔsːtɛ ˈmɪnska/',
    note: 'Pluriel défini d’un mot **ett** en consonne : **-en** (*utsläppen*, comme *husen*).',
    gloss: [['utsläppen', 'les émissions', 'emissions'], ['måste', 'doivent', 'must'], ['minska', 'baisser', 'decrease']],
  }),
  phrase(D, 'u27-om-jag-hade-rad', {
    prompt: 'Conditionnel : « Si j’en avais les moyens, j’achèterais une voiture électrique. »', promptEn: 'Conditional: "If I could afford it, I would buy an electric car."',
    sv: 'Om jag hade råd skulle jag köpa en elbil.', fr: 'Si j’en avais les moyens, j’achèterais une voiture électrique.', en: 'If I could afford it, I would buy an electric car.',
    ipa: '/ɔm jɑː ˈhadːɛ roːd ˈskɵlːɛ jɑː ˈɕøːpa ɛn ˈeːlˌbiːl/',
    note: 'Hypothèse : **om** + prétérit, puis **skulle** + infinitif. *ha råd (med)* = avoir les moyens. V2 : *skulle* juste après la subordonnée.',
    gloss: [['om', 'si', 'if'], ['jag', 'je', 'I'], ['hade', 'avais', 'had'], ['råd', 'les moyens', 'the means'], ['skulle', '(conditionnel)', 'would'], ['jag', 'je', 'I'], ['köpa', 'acheter', 'buy'], ['en', 'une', 'an'], ['elbil', 'voiture électrique', 'electric car']],
  }),
  phrase(D, 'u27-skulle-vara-bra', {
    prompt: '« Ce serait bien pour l’environnement. »', promptEn: '"It would be good for the environment."',
    sv: 'Det skulle vara bra för miljön.', fr: 'Ce serait bien pour l’environnement.', en: 'It would be good for the environment.',
    ipa: '/deː ˈskɵlːɛ ˈvɑːra brɑː fœr mɪlˈjøːn/',
    note: '*skulle vara* = serait. Le conditionnel suédois est toujours analytique (auxiliaire + infinitif).',
    gloss: [['det', 'ce', 'it'], ['skulle', '(conditionnel)', 'would'], ['vara', 'être', 'be'], ['bra', 'bien', 'good'], ['för', 'pour', 'for'], ['miljön', 'l’environnement', 'the environment']],
  }),
  phrase(D, 'u27-borde-ta-taget', {
    prompt: 'Un conseil : « Nous devrions prendre le train au lieu de l’avion. »', promptEn: 'A recommendation: "We should take the train instead of flying."',
    sv: 'Vi borde ta tåget i stället för flyget.', fr: 'Nous devrions prendre le train au lieu de l’avion.', en: 'We should take the train instead of flying.',
    ipa: '/viː ˈbuːɖɛ tɑː ˈtoːɡɛt ɪ ˈstɛlːɛt fœr ˈflyːɡɛt/',
    note: '**borde** = devrais (conseil, morale). **i stället för** = au lieu de. Les Suédois ont même un mot pour la honte de prendre l’avion : *flygskam*.',
    gloss: [['vi', 'nous', 'we'], ['borde', 'devrions', 'should'], ['ta', 'prendre', 'take'], ['tåget', 'le train', 'the train'], ['i', 'au', 'instead'], ['stället', 'lieu', '(place)'], ['för', 'de', 'of'], ['flyget', 'l’avion', 'flying']],
  }),
  phrase(D, 'u27-satsar-fornybar', {
    prompt: '« La Suède mise sur les énergies renouvelables. »', promptEn: '"Sweden is investing in renewable energy."',
    sv: 'Sverige satsar på förnybar energi.', fr: 'La Suède mise sur les énergies renouvelables.', en: 'Sweden is investing in renewable energy.',
    ipa: '/ˈsværjɛ ˈsatsar poː ˈfœːrnyˌbɑːr ɛnɛrˈɡiː/',
    note: '**satsa på** = miser sur, investir dans. *energi* : accent final, le **g** reste dur.',
    gloss: [['Sverige', 'la Suède', 'Sweden'], ['satsar', 'mise', 'is investing'], ['på', 'sur', 'in'], ['förnybar', 'renouvelable', 'renewable'], ['energi', 'énergie', 'energy']],
  }),
  phrase(D, 'u27-klimatet-varmare', {
    prompt: '« Le climat se réchauffe. »', promptEn: '"The climate is getting warmer."',
    sv: 'Klimatet blir varmare.', fr: 'Le climat se réchauffe.', en: 'The climate is getting warmer.',
    ipa: '/klɪˈmɑːtɛt bliːr ˈvarmarɛ/',
    note: '**bli** + comparatif = changement progressif (« devient plus chaud »). Là où le français utilise un verbe réfléchi.',
    gloss: [['klimatet', 'le climat', 'the climate'], ['blir', 'devient', 'is getting'], ['varmare', 'plus chaud', 'warmer']],
  }),
  phrase(D, 'u27-skulle-vilja-leva', {
    prompt: 'Un souhait : « J’aimerais vivre de façon plus durable. »', promptEn: 'A wish: "I would like to live more sustainably."',
    sv: 'Jag skulle vilja leva mer hållbart.', fr: 'J’aimerais vivre de façon plus durable.', en: 'I would like to live more sustainably.',
    ipa: '/jɑː ˈskɵlːɛ ˈvɪlja ˈleːva meːr ˈhɔlːbɑːʈ/',
    note: '**skulle vilja** = j’aimerais (souhait poli). L’adverbe se forme avec **-t** : *hållbart* (de façon durable).',
    gloss: [['jag', 'je', 'I'], ['skulle', '(conditionnel)', 'would'], ['vilja', 'vouloir', 'like'], ['leva', 'vivre', 'to live'], ['mer', 'plus', 'more'], ['hållbart', 'durablement', 'sustainably']],
  }),
];
