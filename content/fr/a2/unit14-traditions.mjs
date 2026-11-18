// FranceCore, Unité 14 : Fêtes et traditions.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT14_DECK = unitDeck({
  n: 14, slug: 'fr-unit-14-traditions', sv: 'Högtider och traditioner', en: 'Holidays and traditions',
  level: 'A2', section: 'fr-section-4-en-france', after: 'fr-unit-13-clothes',
});
const D = UNIT14_DECK.slug;

export const UNIT14_CARDS = [
  // ===================== MOTS =====================
  vocab(D, 'fr-u14-jour-ferie', {
    prompt: 'En ledig dag enligt lag', promptEn: 'A day off by law',
    fr: 'le jour férié', sv: 'helgdagen / den röda dagen', en: 'the public holiday / the bank holiday',
    ipa: '/lə ʒuʁ fe.ʁje/',
    note: 'Frankrike har elva helgdagar. Infaller de på en lördag eller söndag får man ingen extra ledig dag i stället.',
    noteEn: 'France has eleven public holidays. If one falls on a weekend, you don’t get a day off in lieu.',
  }),
  vocab(D, 'fr-u14-faire-le-pont', {
    prompt: 'Att ta ledigt en klämdag', promptEn: 'To take the day off between a holiday and the weekend',
    fr: 'faire le pont', sv: 'ta ledigt en klämdag', en: 'to make a long weekend of it',
    ipa: '/fɛʁ lə pɔ̃/',
    note: 'Ordagrant ”göra bron”: man bygger en bro mellan helgdagen och helgen. Svenskans *klämdag* är precis samma idé.',
    noteEn: 'Literally "to make the bridge": you bridge the gap between a holiday and the weekend, for example taking Friday off after a Thursday holiday.',
  }),
  vocab(D, 'fr-u14-14-juillet', {
    prompt: 'Frankrikes nationaldag', promptEn: 'France’s national day',
    fr: 'le 14 juillet', sv: 'nationaldagen den 14 juli', en: 'Bastille Day (14 July)',
    ipa: '/lə ka.tɔʁz ʒɥi.jɛ/',
    note: 'Firar stormningen av Bastiljen 1789. Militärparad på Champs-Élysées på förmiddagen, fyrverkerier och brandmännens danser, **les bals des pompiers**, på kvällen.',
    noteEn: 'Celebrates the storming of the Bastille in 1789. Military parade on the Champs-Élysées in the morning, fireworks and firefighters’ dances, **les bals des pompiers**, at night. The French never call it "Bastille Day".',
  }),
  vocab(D, 'fr-u14-feu-dartifice', {
    prompt: 'Raketer och ljus på himlen', promptEn: 'Rockets and lights in the sky',
    fr: 'le feu d’artifice', sv: 'fyrverkeriet', en: 'the fireworks',
    ipa: '/lə fø daʁ.ti.fis/',
    note: 'Ett helt fyrverkeri är singular: *le feu d’artifice*. Plural: *les feux d’artifice*. **Le feu** betyder också eld och trafikljus.',
    noteEn: 'A whole fireworks display is singular: *le feu d’artifice*. Plural: *les feux d’artifice*. **Le feu** also means fire and traffic light.',
  }),
  vocab(D, 'fr-u14-noel', {
    prompt: 'Högtiden i december', promptEn: 'The December holiday',
    fr: 'Noël', sv: 'julen', en: 'Christmas',
    ipa: '/nɔ.ɛl/',
    note: 'Trema på **ë** visar att o och e uttalas var för sig: [nɔɛl]. **Joyeux Noël !** = god jul! Många öppnar paketen på juldagens morgon.',
    noteEn: 'The diaeresis on **ë** shows that o and e are said separately: [nɔɛl]. **Joyeux Noël !** = merry Christmas! Many families open presents on Christmas morning.',
  }),
  vocab(D, 'fr-u14-reveillon', {
    prompt: 'Den stora festmiddagen på jul- och nyårsafton', promptEn: 'The big festive dinner on Christmas Eve and New Year’s Eve',
    fr: 'le réveillon', sv: 'jul- eller nyårsaftonsmiddagen', en: 'the Christmas Eve / New Year’s Eve dinner',
    ipa: '/lə ʁe.vɛ.jɔ̃/',
    note: 'Från *réveiller*: man håller sig vaken långt in på natten. **Le réveillon de Noël** den 24 december, **le réveillon du Nouvel An** den 31.',
    noteEn: 'From *réveiller*: you stay up late into the night. **Le réveillon de Noël** on 24 December, **le réveillon du Nouvel An** on the 31st.',
  }),
  vocab(D, 'fr-u14-galette-des-rois', {
    prompt: 'Kakan man äter i januari för trettondagen', promptEn: 'The cake eaten in January for Epiphany',
    fr: 'la galette des rois', sv: 'trettondagskakan', en: 'the king cake',
    ipa: '/la ɡa.lɛt de ʁwa/',
    note: 'En smördegskaka med mandelfyllning som man äter hela januari, hemma och på jobbet. Den yngsta kryper under bordet och bestämmer vem som får vilken bit.',
    noteEn: 'A puff pastry cake with almond filling eaten all through January, at home and at work. The youngest hides under the table and decides who gets which slice.',
  }),
  vocab(D, 'fr-u14-feve', {
    prompt: 'Den lilla figuren som är gömd i kakan', promptEn: 'The little figure hidden in the cake',
    fr: 'la fève', sv: 'figuren / bönan', en: 'the charm',
    ipa: '/la fɛv/',
    note: 'Ordagrant ”bönan”, som förr var en riktig böna. Den som hittar den blir kung eller drottning och får bära papperskronan.',
    noteEn: 'Literally "the bean", which it once was. Whoever finds it becomes king or queen and wears the paper crown.',
  }),
  vocab(D, 'fr-u14-chandeleur', {
    prompt: 'Kyndelsmäss den 2 februari, crêpesdagen', promptEn: 'Candlemas on 2 February, crêpe day',
    fr: 'la Chandeleur', sv: 'kyndelsmäss', en: 'Candlemas',
    ipa: '/la ʃɑ̃d.lœʁ/',
    note: 'Då gör alla crêpes. Traditionen säger att man ska vända den första med ett mynt i andra handen för att få ett rikt år.',
    noteEn: 'Everyone makes crêpes. Tradition says you flip the first one holding a coin in your other hand for a prosperous year.',
  }),
  vocab(D, 'fr-u14-paques', {
    prompt: 'Högtiden på våren med chokladägg', promptEn: 'The spring holiday with chocolate eggs',
    fr: 'Pâques', sv: 'påsk', en: 'Easter',
    ipa: '/pɑk/',
    note: 'Inte påskharen utan **les cloches**, kyrkklockorna, kommer flygande från Rom med chokladäggen. **Le lundi de Pâques** är ledig dag.',
    noteEn: 'It isn’t a bunny but **les cloches**, the church bells, that fly back from Rome with the chocolate eggs. **Le lundi de Pâques** is a day off.',
  }),
  vocab(D, 'fr-u14-muguet', {
    prompt: 'Blomman man ger bort den 1 maj', promptEn: 'The flower given on 1 May',
    fr: 'le muguet', sv: 'liljekonvaljen', en: 'lily of the valley',
    ipa: '/lə my.ɡɛ/',
    note: 'Den 1 maj får vem som helst sälja liljekonvaljer på gatan utan tillstånd. **gu** uttalas [ɡ]: u:et visar bara att g:et är hårt.',
    noteEn: 'On 1 May anyone may sell lily of the valley in the street without a licence. **gu** is [ɡ]: the u just keeps the g hard.',
  }),
  vocab(D, 'fr-u14-fete-de-la-musique', {
    prompt: 'Musikfesten den 21 juni', promptEn: 'The music festival on 21 June',
    fr: 'la fête de la musique', sv: 'musikens dag', en: 'the music festival (21 June)',
    ipa: '/la fɛt də la my.zik/',
    note: 'Sedan 1982 får alla spela musik på gator och torg på sommarsolståndet, gratis och till sent på natten. Den infaller ungefär samtidigt som svensk midsommar.',
    noteEn: 'Since 1982 anyone may play music in the streets on the summer solstice, free and late into the night. It has since spread to cities worldwide.',
  }),

  // ===================== PHRASES =====================
  phrase(D, 'fr-u14-regarde-feu', {
    prompt: 'Berätta att man tittar på fyrverkerierna den 14 juli', promptEn: 'Say people watch the fireworks on 14 July',
    fr: 'Le 14 juillet, on regarde le feu d’artifice.', sv: 'Den 14 juli tittar man på fyrverkerierna.', en: 'On 14 July we watch the fireworks.',
    ipa: '/lə ka.tɔʁz ʒɥi.jɛ ɔ̃ ʁə.ɡaʁd lə fø daʁ.ti.fis/',
    note: 'Datum anges med **le** + grundtal: *le 14 juillet*, inte *le quatorzième*. Bara den första dagen är ett ordningstal: *le premier mai*.',
    noteEn: 'Dates use **le** + a cardinal number: *le 14 juillet*, not *le quatorzième*. Only the first is an ordinal: *le premier mai*.',
    gloss: [['le 14 juillet', 'den 14 juli', 'on 14 July'], ['on', 'man', 'we'], ['regarde', 'tittar på', 'watch'], ['le feu d’artifice', 'fyrverkerierna', 'the fireworks']],
  }),
  phrase(D, 'fr-u14-huitres-foie-gras', {
    prompt: 'Berätta att ni åt ostron och foie gras på julaftonsmiddagen', promptEn: 'Say you had oysters and foie gras at the Christmas Eve dinner',
    fr: 'Pour le réveillon, nous avons mangé des huîtres et du foie gras.', sv: 'Till julaftonsmiddagen åt vi ostron och foie gras.', en: 'For the Christmas Eve dinner we had oysters and foie gras.',
    ipa: '/puʁ lə ʁe.vɛ.jɔ̃ nu.za.vɔ̃ mɑ̃.ʒe de.zɥitʁ e dy fwa ɡʁa/',
    note: 'Den klassiska franska julmenyn: ostron, foie gras, kalkon eller kapun och **la bûche de Noël**, en tårta formad som ett vedträ. **h** i *huîtres* är stumt: *des‿huîtres*.',
    noteEn: 'The classic French Christmas menu: oysters, foie gras, turkey or capon and **la bûche de Noël**, a log-shaped cake. The **h** in *huîtres* is silent: *des‿huîtres*.',
    gloss: [['pour le réveillon', 'till julaftonsmiddagen', 'for the Christmas Eve dinner'], ['nous', 'vi', 'we'], ['avons mangé', 'åt', 'had'], ['des huîtres', 'ostron', 'oysters'], ['et', 'och', 'and'], ['du foie gras', 'foie gras', 'foie gras']],
  }),
  phrase(D, 'fr-u14-qui-a-eu-la-feve', {
    prompt: 'Fråga vem som fick figuren och utropa din vän till kung', promptEn: 'Ask who got the charm and crown your friend king',
    fr: 'Qui a eu la fève ? C’est toi, tu es le roi !', sv: 'Vem fick bönan? Det är du, du är kung!', en: 'Who got the charm? It’s you, you’re the king!',
    ipa: '/ki a y la fɛv sɛ twa ty ɛ lə ʁwa/',
    note: '**Eu** är perfekt particip av *avoir* och uttalas [y], som svenskt *y*. *Avoir* betyder här att få.',
    noteEn: '**Eu** is the past participle of *avoir* and is pronounced [y], like French *u*. Here *avoir* means to get.',
    gloss: [['qui', 'vem', 'who'], ['a eu', 'fick', 'got'], ['la fève', 'bönan', 'the charm'], ['c’est toi', 'det är du', 'it’s you'], ['tu es', 'du är', 'you are'], ['le roi', 'kung', 'the king']],
  }),
  phrase(D, 'fr-u14-21-juin', {
    prompt: 'Berätta att det är konserter på alla gator den 21 juni', promptEn: 'Say there are concerts in every street on 21 June',
    fr: 'Le 21 juin, il y a des concerts dans toutes les rues.', sv: 'Den 21 juni är det konserter på alla gator.', en: 'On 21 June there are concerts in every street.',
    ipa: '/lə vɛ̃.te.œ̃ ʒɥɛ̃ il i a de kɔ̃.sɛʁ dɑ̃ tut le ʁy/',
    note: '**Tout** böjs: *tout le quartier, toute la ville, tous les jours, toutes les rues*. Franskan säger **dans** la rue, i gatan, där svenskan säger *på*.',
    noteEn: '**Tout** agrees: *tout le quartier, toute la ville, tous les jours, toutes les rues*. French says **dans** la rue, "in" the street.',
    gloss: [['le 21 juin', 'den 21 juni', 'on 21 June'], ['il y a', 'det är', 'there are'], ['des concerts', 'konserter', 'concerts'], ['dans', 'på', 'in'], ['toutes les rues', 'alla gator', 'every street']],
  }),
  phrase(D, 'fr-u14-offre-muguet', {
    prompt: 'Berätta att man ger bort liljekonvaljer den 1 maj', promptEn: 'Say people give lily of the valley on 1 May',
    fr: 'Le premier mai, on offre du muguet.', sv: 'Den 1 maj ger man bort liljekonvaljer.', en: 'On 1 May people give each other lily of the valley.',
    ipa: '/lə pʁə.mje mɛ ɔ̃.nɔfʁ dy my.ɡɛ/',
    note: '**Offrir** = ge bort som present. Det är också arbetarnas dag, *la fête du Travail*, med demonstrationer. Bindning: *on‿offre*.',
    noteEn: '**Offrir** = to give as a present. It is also Labour Day, *la fête du Travail*, with marches. Liaison: *on‿offre*.',
    gloss: [['le premier mai', 'den 1 maj', 'on 1 May'], ['on', 'man', 'people'], ['offre', 'ger bort', 'give'], ['du muguet', 'liljekonvaljer', 'lily of the valley']],
  }),
  phrase(D, 'fr-u14-jeudi-ferie', {
    prompt: 'Säg att torsdag är en helgdag och att ni ska ta ledigt på fredagen', promptEn: 'Say Thursday is a public holiday and you’ll take Friday off too',
    fr: 'Jeudi, c’est férié : on va faire le pont.', sv: 'På torsdag är det röd dag: vi ska ta ledigt på klämdagen.', en: 'Thursday is a bank holiday: we’re going to make a long weekend of it.',
    ipa: '/ʒø.di sɛ fe.ʁje ɔ̃ va fɛʁ lə pɔ̃/',
    note: 'Kristi himmelsfärd infaller alltid på en torsdag, så i maj är *le pont* ett nationellt fenomen. Observera mellanslaget före **:** på franska.',
    noteEn: 'Ascension Day always falls on a Thursday, so in May *le pont* is a national habit. Note the space before **:** in French.',
    gloss: [['jeudi', 'på torsdag', 'on Thursday'], ['c’est férié', 'är det röd dag', 'it’s a bank holiday'], ['on', 'vi', 'we'], ['va faire le pont', 'ska ta ledigt på klämdagen', 'are going to make a long weekend of it']],
  }),
  phrase(D, 'fr-u14-chandeleur-crepes', {
    prompt: 'Berätta att man gör crêpes på kyndelsmäss', promptEn: 'Say people make crêpes at Candlemas',
    fr: 'À la Chandeleur, on fait des crêpes.', sv: 'På kyndelsmäss gör man crêpes.', en: 'At Candlemas we make crêpes.',
    ipa: '/a la ʃɑ̃d.lœʁ ɔ̃ fɛ de kʁɛp/',
    note: 'Högtider tar ofta **à**: *à Noël, à Pâques, à la Chandeleur*. **Une crêpe** är tunn och söt; den salta varianten av bovete heter *une galette* i Bretagne.',
    noteEn: 'Holidays often take **à**: *à Noël, à Pâques, à la Chandeleur*. **Une crêpe** is thin and sweet; the savoury buckwheat version is *une galette* in Brittany.',
    gloss: [['à la Chandeleur', 'på kyndelsmäss', 'at Candlemas'], ['on', 'man', 'we'], ['fait', 'gör', 'make'], ['des crêpes', 'crêpes', 'crêpes']],
  }),
  phrase(D, 'fr-u14-bonne-annee', {
    prompt: 'Önska ett gott nytt år', promptEn: 'Wish someone a happy new year',
    fr: 'Je vous souhaite une bonne année !', sv: 'Jag önskar er ett gott nytt år!', en: 'I wish you a happy new year!',
    ipa: '/ʒə vu swɛ.tyn bɔ.na.ne/',
    note: 'I Frankrike önskar man gott nytt år hela januari, till varje kollega och granne man träffar. **Vous** står före verbet: *je **vous** souhaite*.',
    noteEn: 'In France you wish people a happy new year all through January, to every colleague and neighbour you meet. **Vous** goes before the verb: *je **vous** souhaite*.',
    gloss: [['je', 'jag', 'I'], ['vous', 'er', 'you'], ['souhaite', 'önskar', 'wish'], ['une bonne année', 'ett gott nytt år', 'a happy new year']],
  }),
];
