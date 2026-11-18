// Unité 9 : Ma journée (A2, Section 3). Grammaire : dire l'heure, verbes réfléchis (klä på sig, lägga sig).
import { vocab, phrase, unitDeck } from './content-helpers.mjs';

export const UNIT9_DECK = unitDeck({
  n: 9, slug: 'swedish-unit-9-day', fr: 'Ma journée', en: 'My day',
  level: 'A2', section: 'section-3-ma-vie', after: 'swedish-unit-8-home',
});
const D = UNIT9_DECK.slug;

export const UNIT9_CARDS = [
  vocab(D, 'u9-vaknar', {
    prompt: 'Le premier verbe de la journée : « se réveille » (présent)', promptEn: 'The first verb of the day: "wake up" (present)',
    sv: 'vaknar', fr: 'se réveille', en: 'wake up / wakes up', ipa: '/ˈvɑːknar/',
    note: 'Pas de pronom réfléchi en suédois : *jag vaknar* = je **me** réveille. Infinitif *att vakna*, groupe 1.',
  }),
  vocab(D, 'u9-duschar', {
    prompt: 'Se laver sous l’eau : « se douche » (présent)', promptEn: 'Washing under running water: "shower" (present)',
    sv: 'duschar', fr: 'se douche', en: 'shower / showers', ipa: '/ˈdɵʂːar/',
    note: 'Le **sch** se prononce comme le « ch » français. Là encore, pas de réfléchi : *jag duschar*.',
  }),
  vocab(D, 'u9-frukost', {
    prompt: 'Le premier repas : « le petit-déjeuner »', promptEn: 'The first meal: "breakfast"',
    sv: 'frukost', fr: 'le petit-déjeuner', en: 'breakfast', ipa: '/ˈfrʉːkɔst/',
    note: 'Sans article pour le repas : *äta frukost*. Les repas : *frukost*, *lunch*, *middag*.',
  }),
  vocab(D, 'u9-middag', {
    prompt: 'Le repas du soir : « le dîner »', promptEn: 'The evening meal: "dinner"',
    sv: 'middag', fr: 'le dîner', en: 'dinner', ipa: '/ˈmɪdːɑːɡ/',
    note: 'Malgré son nom (« midi »), *middag* est le repas du **soir**. À l’oral, le **g** final tombe souvent : [ˈmɪdːa].',
  }),
  vocab(D, 'u9-klockan', {
    prompt: 'Pour parler de l’heure : « l’heure / la montre »', promptEn: 'To talk about the time: "the time / the clock"',
    sv: 'klockan', fr: 'l’heure (la montre)', en: 'the time (the clock)', ipa: '/ˈklɔkːan/',
    note: 'Défini de *en klocka* (horloge, montre). On dit l’heure avec : *Klockan är…* (litt. « la montre est… »).',
  }),
  vocab(D, 'u9-atta', {
    prompt: 'Le chiffre 8 : « huit »', promptEn: 'The number 8: "eight"',
    sv: 'åtta', fr: 'huit', en: 'eight', ipa: '/ˈɔtːa/',
    note: 'Le **å** est court devant **tt**. Pour compter jusqu’à 12 : *sex, sju, åtta, nio, tio, elva, tolv*.',
  }),
  vocab(D, 'u9-halv', {
    prompt: 'Le piège de l’heure : « demie » (avant l’heure suivante)', promptEn: 'The time trap: "half" (before the next hour)',
    sv: 'halv', fr: 'demi (avant l’heure)', en: 'half (before the hour)', ipa: '/halv/',
    note: '**halv åtta** = 7 h 30, pas 8 h 30 ! On compte la demi-heure **vers** l’heure suivante (« à mi-chemin de huit »).',
  }),
  vocab(D, 'u9-kvart', {
    prompt: 'Un quart d’heure : « quart »', promptEn: 'Fifteen minutes: "quarter"',
    sv: 'kvart', fr: 'quart (d’heure)', en: 'quarter (of an hour)', ipa: '/kvaʈː/',
    note: '*kvart över åtta* = 8 h 15 ; *kvart i åtta* = 7 h 45. **över** = après, **i** = moins.',
  }),
  vocab(D, 'u9-pa-morgonen', {
    prompt: 'Un moment de la journée : « le matin »', promptEn: 'A time of day: "in the morning"',
    sv: 'på morgonen', fr: 'le matin', en: 'in the morning', ipa: '/poː ˈmɔrːɔnɛn/',
    note: 'Habitude : **på** + forme définie. *på morgonen*, *på eftermiddagen* (l’après-midi), *på kvällen*.',
    gloss: [['på', 'à', 'in'], ['morgonen', 'le matin', 'the morning']],
  }),
  vocab(D, 'u9-pa-kvallen', {
    prompt: 'Un moment de la journée : « le soir »', promptEn: 'A time of day: "in the evening"',
    sv: 'på kvällen', fr: 'le soir', en: 'in the evening', ipa: '/poː ˈkvɛlːɛn/',
    note: 'Défini de *en kväll* (vu dans *god kväll*). *ikväll* = ce soir.',
    gloss: [['på', 'à', 'in'], ['kvällen', 'le soir', 'the evening']],
  }),

  phrase(D, 'u9-vad-ar-klockan', {
    prompt: 'Demander l’heure : « Quelle heure est-il ? »', promptEn: 'Asking the time: "What time is it?"',
    sv: 'Vad är klockan?', fr: 'Quelle heure est-il ?', en: 'What time is it?',
    ipa: '/vɑː æːr ˈklɔkːan/',
    note: 'Mot à mot : « qu’est la montre ? ». Mot interrogatif + verbe en 2e position, comme *Vad heter du?*',
    gloss: [['vad', 'quoi', 'what'], ['är', 'est', 'is'], ['klockan', 'l’heure', 'the time']],
  }),
  phrase(D, 'u9-halv-atta', {
    prompt: 'Donner l’heure : « Il est sept heures et demie. »', promptEn: 'Telling the time: "It is half past seven."',
    sv: 'Klockan är halv åtta.', fr: 'Il est sept heures et demie.', en: 'It is half past seven.',
    ipa: '/ˈklɔkːan æːr halv ˈɔtːa/',
    note: 'Le piège n°1 des francophones : **halv åtta** = 7 h 30. On pense « à moitié de huit ».',
    gloss: [['klockan', 'l’heure', 'the time'], ['är', 'est', 'is'], ['halv', 'demie', 'half'], ['åtta', 'huit', 'eight']],
  }),
  phrase(D, 'u9-kvart-over', {
    prompt: 'Donner l’heure : « Il est huit heures et quart. »', promptEn: 'Telling the time: "It is a quarter past eight."',
    sv: 'Klockan är kvart över åtta.', fr: 'Il est huit heures et quart.', en: 'It is a quarter past eight.',
    ipa: '/ˈklɔkːan æːr kvaʈː ˈøːvɛr ˈɔtːa/',
    note: '**över** = après (l’heure). Pour 7 h 45 : *kvart i åtta*.',
    gloss: [['klockan', 'l’heure', 'the time'], ['är', 'est', 'is'], ['kvart', 'quart', 'quarter'], ['över', 'après', 'past'], ['åtta', 'huit', 'eight']],
  }),
  phrase(D, 'u9-vaknar-sju', {
    prompt: 'Ta routine : « Je me réveille à sept heures. »', promptEn: 'Your routine: "I wake up at seven."',
    sv: 'Jag vaknar klockan sju.', fr: 'Je me réveille à sept heures.', en: 'I wake up at seven.',
    ipa: '/jɑː ˈvɑːknar ˈklɔkːan ɧʉː/',
    note: '« à 7 heures » = **klockan sju**, sans préposition. *sju* = sept (vu en phonétique).',
    gloss: [['jag', 'je', 'I'], ['vaknar', 'me réveille', 'wake up'], ['klockan', 'à l’heure', 'at'], ['sju', 'sept', 'seven']],
  }),
  phrase(D, 'u9-klar-pa-mig', {
    prompt: 'Ta routine : « Je me douche et je m’habille. »', promptEn: 'Your routine: "I shower and get dressed."',
    sv: 'Jag duschar och klär på mig.', fr: 'Je me douche et je m’habille.', en: 'I shower and get dressed.',
    ipa: '/jɑː ˈdɵʂːar ɔ klæːr poː mɛj/',
    note: '**klä på sig** = s’habiller, verbe réfléchi : *jag klär på **mig***, *du klär på **dig***, *hon klär på **sig***. *mig* se dit [mɛj].',
    gloss: [['jag', 'je', 'I'], ['duschar', 'me douche', 'shower'], ['och', 'et', 'and'], ['klär', 'habille', 'dress'], ['på', '(particule)', '(particle)'], ['mig', 'me', 'myself']],
  }),
  phrase(D, 'u9-frukost-morgonen', {
    prompt: '« Nous prenons le petit-déjeuner le matin. »', promptEn: '"We have breakfast in the morning."',
    sv: 'Vi äter frukost på morgonen.', fr: 'Nous prenons le petit-déjeuner le matin.', en: 'We have breakfast in the morning.',
    ipa: '/viː ˈɛːtɛr ˈfrʉːkɔst poː ˈmɔrːɔnɛn/',
    note: '*äter* = présent de *äta* (manger, Unité 2). En suédois, on « mange » le petit-déjeuner.',
    gloss: [['vi', 'nous', 'we'], ['äter', 'mangeons', 'eat'], ['frukost', 'petit-déjeuner', 'breakfast'], ['på', 'à', 'in'], ['morgonen', 'le matin', 'the morning']],
  }),
  phrase(D, 'u9-lagar-middag', {
    prompt: '« Le soir, je prépare le dîner. » (commence par « le soir »)', promptEn: '"In the evening, I cook dinner." (start with "in the evening")',
    sv: 'På kvällen lagar jag middag.', fr: 'Le soir, je prépare le dîner.', en: 'In the evening, I cook dinner.',
    ipa: '/poː ˈkvɛlːɛn ˈlɑːɡar jɑː ˈmɪdːɑːɡ/',
    note: 'Règle **V2** : *på kvällen* (1) + **lagar** (2) + *jag* (3). *laga mat* = cuisiner.',
    gloss: [['på', 'à', 'in'], ['kvällen', 'le soir', 'the evening'], ['lagar', 'prépare', 'cook'], ['jag', 'je', 'I'], ['middag', 'dîner', 'dinner']],
  }),
  phrase(D, 'u9-lagger-mig', {
    prompt: '« Je me couche à onze heures. »', promptEn: '"I go to bed at eleven."',
    sv: 'Jag lägger mig klockan elva.', fr: 'Je me couche à onze heures.', en: 'I go to bed at eleven.',
    ipa: '/jɑː ˈlɛɡːɛr mɛj ˈklɔkːan ˈɛlva/',
    note: '**lägga sig** = se coucher (réfléchi). Ne pas confondre avec *ligga* (être couché, Unité 8). *elva* = onze.',
    gloss: [['jag', 'je', 'I'], ['lägger', 'couche', 'lay'], ['mig', 'me', 'myself'], ['klockan', 'à l’heure', 'at'], ['elva', 'onze', 'eleven']],
  }),
];
