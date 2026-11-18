// Unité 14 : Fêtes & traditions (A2, Section 4). Grammaire : parfait (har + supin) vs prétérit.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT14_DECK = unitDeck({
  n: 14, slug: 'swedish-unit-14-traditions', fr: 'Fêtes & traditions', en: 'Holidays & traditions',
  level: 'A2', section: 'section-4-en-suede', after: 'swedish-unit-13-clothes',
});
const D = UNIT14_DECK.slug;

export const UNIT14_CARDS = [
  vocab(D, 'u14-midsommar', {
    prompt: 'La grande fête de juin : « la Saint-Jean »', promptEn: 'The big June celebration: "Midsummer"',
    sv: 'midsommar', fr: 'la Saint-Jean (fête du solstice)', en: 'Midsummer', ipa: '/ˈmɪdːˌsɔmːar/',
    accent: 'Accent 2 (Grave)',
    note: 'Le vendredi le plus proche du 21 juin : danse autour du mât fleuri (*midsommarstången*), hareng, fraises. Sans article : *fira midsommar*.',
  }),
  vocab(D, 'u14-julen', {
    prompt: 'La fête de décembre : « Noël »', promptEn: 'The December holiday: "Christmas"',
    sv: 'julen', fr: 'Noël', en: 'Christmas', ipa: '/ˈjʉːlɛn/',
    note: 'Défini de *jul*. On fête surtout le **24 décembre** (*julafton*). *God jul!* = Joyeux Noël !',
  }),
  vocab(D, 'u14-lucia', {
    prompt: 'La procession aux bougies du 13 décembre : « la Sainte-Lucie »', promptEn: 'The candlelit procession on 13 December: "Saint Lucy\'s Day"',
    sv: 'lucia', fr: 'la Sainte-Lucie', en: 'Saint Lucy’s Day (Lucia)', ipa: '/lʉˈsiːa/',
    note: 'Le 13 décembre, une procession en blanc avec une couronne de bougies chante dans les écoles et les bureaux. On mange des *lussekatter* (brioches au safran).',
  }),
  vocab(D, 'u14-firar', {
    prompt: 'Célébrer un événement : « fête » (présent)', promptEn: 'Celebrating an event: "celebrate" (present)',
    sv: 'firar', fr: 'fête / célèbre', en: 'celebrate / celebrates', ipa: '/ˈfiːrar/',
    note: 'Infinitif *att fira*, groupe 1 : *firar, firade, har firat*.',
  }),
  vocab(D, 'u14-har-firat', {
    prompt: 'Le parfait de « fira » : « a fêté / avons fêté »', promptEn: 'Perfect of "fira": "have celebrated"',
    sv: 'har firat', fr: 'a fêté / ai fêté', en: 'have celebrated', ipa: '/hɑːr ˈfiːrat/',
    note: 'Parfait = **har** + **supin**. Supin du groupe 1 : **-at** (*firat*). Groupe 2 : **-t** (*köpt*). Verbes forts : **-it** (*ätit*, *varit*).',
    gloss: [['har', 'a', 'have'], ['firat', 'fêté', 'celebrated']],
  }),
  vocab(D, 'u14-present', {
    prompt: 'Ce qu’on offre : « un cadeau »', promptEn: 'What you give: "a present"',
    sv: 'en present', fr: 'un cadeau', en: 'a present / a gift', ipa: '/ɛn prɛˈsɛnt/',
    note: 'Accent sur **sent**. Les cadeaux de Noël : *julklappar*.',
    gloss: [['en', 'un', 'a'], ['present', 'cadeau', 'present']],
  }),
  vocab(D, 'u14-fodelsedag', {
    prompt: 'Le jour où tu es né(e) : « un anniversaire »', promptEn: 'The day you were born: "a birthday"',
    sv: 'en födelsedag', fr: 'un anniversaire', en: 'a birthday', ipa: '/ɛn ˈføːdɛlsɛˌdɑːɡ/',
    accent: 'Accent 2 (Grave)',
    note: '*födelse* (naissance) + *dag* (jour). On chante *Ja, må hon leva* (ou *han*).',
    gloss: [['en', 'un', 'a'], ['födelsedag', 'anniversaire', 'birthday']],
  }),
  vocab(D, 'u14-grattis', {
    prompt: 'Pour féliciter : « félicitations / bravo »', promptEn: 'To congratulate: "congratulations"',
    sv: 'grattis', fr: 'félicitations / bravo', en: 'congratulations', ipa: '/ˈɡratːɪs/',
    note: 'Forme courte et familière de *gratulerar*. S’utilise pour tout : anniversaire, diplôme, nouveau travail.',
  }),
  vocab(D, 'u14-tarta', {
    prompt: 'Le dessert des fêtes : « un gâteau (à la crème) »', promptEn: 'The party dessert: "a cake"',
    sv: 'en tårta', fr: 'un gâteau (à la crème)', en: 'a cake (layer cake)', ipa: '/ɛn ˈtoːʈa/',
    accent: 'Accent 2 (Grave)',
    note: 'Gâteau à étages avec crème. Un gâteau simple ou un biscuit : *en kaka* (vu en phonétique). Le **rt** est rétroflexe.',
    gloss: [['en', 'un', 'a'], ['tårta', 'gâteau', 'cake']],
  }),
  vocab(D, 'u14-aldrig', {
    prompt: 'Le contraire de « toujours » : « jamais »', promptEn: 'The opposite of "always": "never"',
    sv: 'aldrig', fr: 'jamais', en: 'never', ipa: '/ˈaldrɪɡ/',
    note: 'Se place comme *inte*, juste après le verbe conjugué : *jag har aldrig sett*. À l’oral, le **g** final tombe souvent.',
  }),

  phrase(D, 'u14-grattis-fodelsedagen', {
    prompt: 'Souhaiter un anniversaire : « Joyeux anniversaire ! »', promptEn: 'Birthday wishes: "Happy birthday!"',
    sv: 'Grattis på födelsedagen!', fr: 'Joyeux anniversaire !', en: 'Happy birthday!',
    ipa: '/ˈɡratːɪs poː ˈføːdɛlsɛˌdɑːɡɛn/',
    note: 'Formule fixe : **på** + forme définie. Mot à mot : « félicitations au jour de naissance ».',
    gloss: [['grattis', 'félicitations', 'congratulations'], ['på', 'pour', 'on'], ['födelsedagen', 'l’anniversaire', 'the birthday']],
  }),
  phrase(D, 'u14-firar-midsommar', {
    prompt: '« Nous fêtons la Saint-Jean à la campagne. »', promptEn: '"We celebrate Midsummer in the countryside."',
    sv: 'Vi firar midsommar på landet.', fr: 'Nous fêtons la Saint-Jean à la campagne.', en: 'We celebrate Midsummer in the countryside.',
    ipa: '/viː ˈfiːrar ˈmɪdːˌsɔmːar poː ˈlandɛt/',
    note: '**på landet** = à la campagne (litt. « sur le pays »). Les villes se vident à la Saint-Jean.',
    gloss: [['vi', 'nous', 'we'], ['firar', 'fêtons', 'celebrate'], ['midsommar', 'la Saint-Jean', 'Midsummer'], ['på', 'à', 'in'], ['landet', 'la campagne', 'the countryside']],
  }),
  phrase(D, 'u14-firat-jul', {
    prompt: 'Une expérience : « Tu as déjà fêté Noël en Suède ? »', promptEn: 'An experience: "Have you celebrated Christmas in Sweden?"',
    sv: 'Har du firat jul i Sverige?', fr: 'Tu as déjà fêté Noël en Suède ?', en: 'Have you celebrated Christmas in Sweden?',
    ipa: '/hɑːr dʉː ˈfiːrat jʉːl ɪ ˈsværjɛ/',
    note: '**Parfait** pour une expérience sans date précise. Avec une date, on passe au prétérit : *Vi firade jul i Sverige 2024.*',
    gloss: [['har', 'as', 'have'], ['du', 'tu', 'you'], ['firat', 'fêté', 'celebrated'], ['jul', 'Noël', 'Christmas'], ['i', 'en', 'in'], ['Sverige', 'Suède', 'Sweden']],
  }),
  phrase(D, 'u14-aldrig-sett', {
    prompt: '« Je n’ai jamais vu la Sainte-Lucie. »', promptEn: '"I have never seen Lucia."',
    sv: 'Jag har aldrig sett lucia.', fr: 'Je n’ai jamais vu la Sainte-Lucie.', en: 'I have never seen Lucia.',
    ipa: '/jɑː hɑːr ˈaldrɪɡ sɛtː lʉˈsiːa/',
    note: '**sett** = supin de *se* (voir) : *se, ser, såg, har sett*. *aldrig* se place entre *har* et le supin.',
    gloss: [['jag', 'je', 'I'], ['har', 'ai', 'have'], ['aldrig', 'jamais', 'never'], ['sett', 'vu', 'seen'], ['lucia', 'la Sainte-Lucie', 'Lucia']],
  }),
  phrase(D, 'u14-kopt-present', {
    prompt: '« Nous lui avons acheté un cadeau. » (à elle)', promptEn: '"We have bought her a present."',
    sv: 'Vi har köpt en present till henne.', fr: 'Nous lui avons acheté un cadeau.', en: 'We have bought her a present.',
    ipa: '/viː hɑːr ɕœpt ɛn prɛˈsɛnt tɪlː ˈhɛnːɛ/',
    note: '**köpt** = supin de *köpa* (groupe 2, en **-t**). *till henne* = pour elle (*henne* = elle, complément).',
    gloss: [['vi', 'nous', 'we'], ['har', 'avons', 'have'], ['köpt', 'acheté', 'bought'], ['en', 'un', 'a'], ['present', 'cadeau', 'present'], ['till', 'pour', 'for'], ['henne', 'elle', 'her']],
  }),
  phrase(D, 'u14-god-jul', {
    prompt: 'Les vœux de fin d’année : « Joyeux Noël et bonne année ! »', promptEn: 'End-of-year wishes: "Merry Christmas and Happy New Year!"',
    sv: 'God jul och gott nytt år!', fr: 'Joyeux Noël et bonne année !', en: 'Merry Christmas and Happy New Year!',
    ipa: '/ɡuːd jʉːl ɔ ɡɔtː nʏtː oːr/',
    note: '*ett år* (une année) est neutre : **gott nytt** år, avec le **-t** sur les deux adjectifs.',
    gloss: [['god', 'joyeux', 'merry'], ['jul', 'Noël', 'Christmas'], ['och', 'et', 'and'], ['gott', 'bonne', 'happy'], ['nytt', 'nouvelle', 'new'], ['år', 'année', 'year']],
  }),
  phrase(D, 'u14-atit-sill', {
    prompt: '« Tu as déjà mangé du hareng ? »', promptEn: '"Have you ever eaten herring?"',
    sv: 'Har du ätit sill?', fr: 'Tu as déjà mangé du hareng ?', en: 'Have you ever eaten herring?',
    ipa: '/hɑːr dʉː ˈɛːtɪt sɪlː/',
    note: '**ätit** = supin de *äta* (verbe fort, en **-it**) : *äta, äter, åt, har ätit*. Le hareng mariné est sur toutes les tables de fête.',
    gloss: [['har', 'as', 'have'], ['du', 'tu', 'you'], ['ätit', 'mangé', 'eaten'], ['sill', 'hareng', 'herring']],
  }),
  phrase(D, 'u14-fin-dag', {
    prompt: '« Ça a été une belle journée. »', promptEn: '"It has been a lovely day."',
    sv: 'Det har varit en fin dag.', fr: 'Ça a été une belle journée.', en: 'It has been a lovely day.',
    ipa: '/deː hɑːr ˈvɑːrɪt ɛn fiːn dɑːɡ/',
    note: '**varit** = supin de *vara* (être) : *vara, är, var, har varit*. *fin* sans **-t** car *en dag* est un mot **en**.',
    gloss: [['det', 'ça', 'it'], ['har', 'a', 'has'], ['varit', 'été', 'been'], ['en', 'une', 'a'], ['fin', 'belle', 'lovely'], ['dag', 'journée', 'day']],
  }),
];
