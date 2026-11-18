// FranceCore, fondations A1 : prononciation (paires minimales) et genre des noms (le / la).
// Le deck de grammaire A1 est dans grammar.mjs. Programme : docs/PROGRAMME-FR.md.
import { vocab, pair, foundationDeck } from '../helpers.mjs';

const CORE = foundationDeck({
  slug: 'fr-core-a1', sv: 'Uttal', en: 'Pronunciation',
  category: 'phonetics', level: 'A1', order: 1, after: null,
});
const GENDER = foundationDeck({
  slug: 'fr-vocab-a1', sv: 'Genus: le eller la', en: 'Gender: le or la',
  category: 'vocabulary', level: 'A1', order: 3, after: 'fr-unit-1-greetings',
});

export const FOUNDATION_DECKS = [CORE, GENDER];

const P = CORE.slug;
const G = GENDER.slug;

const PHONETICS = [
  pair(P, 'fr-phon-tu-tout', {
    prompt: 'u eller ou: ”tu” mot ”tout”', promptEn: 'u or ou: "tu" versus "tout"',
    fr: 'tu / tout', words: ['tu', 'tout'], sv: 'du / allt', en: 'you / all',
    ipa: '/ty/ /tu/',
    note: 'Franskt **u** är svenskt **y** [y]. **ou** är svenskt **o** som i *bo* [u]. Svenskar klarar *u* lätt, men måste komma ihåg att det stavas *u*.',
    noteEn: 'French **u** [y] is made by saying "ee" with tightly rounded lips. **ou** [u] is like the vowel in *food*. Mixing them changes the word.',
  }),
  pair(P, 'fr-phon-les-lait', {
    prompt: 'Slutet é eller öppet è: ”les” mot ”lait”', promptEn: 'Closed é or open è: "les" versus "lait"',
    fr: 'les / lait', words: ['les', 'lait'], sv: 'de (artikel) / mjölk', en: 'the (plural) / milk',
    ipa: '/le/ /lɛ/',
    note: '**é** [e] är slutet som i svenskans *le*. **è, ai, ei** [ɛ] är öppnare, som i *ära*. Många fransmän skiljer dem knappt, men i standarduttal hörs skillnaden.',
    noteEn: '**é** [e] is closed and pure, with no glide to "ay". **è, ai, ei** [ɛ] is more open, as in *bed*. Many speakers barely separate them, but standard French does.',
  }),
  pair(P, 'fr-phon-vent-vin', {
    prompt: 'Nasalerna an och in: ”vent” mot ”vin”', promptEn: 'The nasals an and in: "vent" versus "vin"',
    fr: 'vent / vin', words: ['vent', 'vin'], sv: 'vind / vin', en: 'wind / wine',
    ipa: '/vɑ̃/ /vɛ̃/',
    note: 'Inget n uttalas: luften går genom näsan. **an / en** [ɑ̃] har munnen öppen och bakåt, **in / ain / ein** [ɛ̃] har munnen bredare och mer framåt.',
    noteEn: 'No n is pronounced: the air goes through the nose. **an / en** [ɑ̃] is open and back in the mouth, **in / ain / ein** [ɛ̃] is wider and further forward.',
  }),
  pair(P, 'fr-phon-vent-vont', {
    prompt: 'Nasalerna an och on: ”vent” mot ”vont”', promptEn: 'The nasals an and on: "vent" versus "vont"',
    fr: 'vent / vont', words: ['vent', 'vont'], sv: 'vind / (de) går', en: 'wind / (they) go',
    ipa: '/vɑ̃/ /vɔ̃/',
    note: 'Den tredje nasalen, **on** [ɔ̃], uttalas med runda läppar. Det svåraste paret för de flesta: håll läpparna öppna för *an*, runda för *on*.',
    noteEn: 'The third nasal, **on** [ɔ̃], is made with rounded lips. The hardest pair for most learners: lips open for *an*, rounded for *on*.',
  }),
  pair(P, 'fr-phon-le-les', {
    prompt: 'Stumt e eller é: ”le” mot ”les”', promptEn: 'Mute e or é: "le" versus "les"',
    fr: 'le / les', words: ['le', 'les'], sv: 'den (artikel) / de (artikel)', en: 'the (singular) / the (plural)',
    ipa: '/lə/ /le/',
    note: 'Det **stumma e:t** [ə] är ett kort, slappt ljud, och försvinner ofta helt i snabbt tal: *sam(e)di*. Eftersom plural-s inte hörs är det artikeln som visar *le livre* / *les livres*.',
    noteEn: 'The **mute e** [ə] is a short, relaxed sound, often dropped entirely in fast speech: *sam(e)di*. Since the plural s is silent, the article is what tells *le livre* from *les livres*.',
  }),
  pair(P, 'fr-phon-roue-loue', {
    prompt: 'Franskt r eller l: ”roue” mot ”loue”', promptEn: 'French r or l: "roue" versus "loue"',
    fr: 'roue / loue', words: ['roue', 'loue'], sv: 'hjul / hyr', en: 'wheel / rent',
    ipa: '/ʁu/ /lu/',
    note: 'Franskt **r** [ʁ] bildas längst bak, mot gomseglet, som det skånska r:et. Tungspetsen ligger kvar nere bakom tänderna.',
    noteEn: 'French **r** [ʁ] is made at the back, against the soft palate, a little like a gentle gargle. The tip of the tongue stays down behind the teeth.',
  }),
  pair(P, 'fr-phon-ils-sont-ils-ont', {
    prompt: 'Bindning: ”ils sont” mot ”ils ont”', promptEn: 'Liaison: "ils sont" versus "ils ont"',
    fr: 'ils sont / ils ont', words: ['ils sont', 'ils ont'], sv: 'de är / de har', en: 'they are / they have',
    ipa: '/il sɔ̃/ /il.z‿ɔ̃/',
    note: 'Skillnaden mellan ”är” och ”har” hänger på ett enda ljud. I **ils ont** binds det stumma s:et till vokalen och blir [z]: [ilzɔ̃]. I **ils sont** är det ett skarpt [s].',
    noteEn: 'The difference between "are" and "have" hangs on one sound. In **ils ont** the silent s links to the vowel as [z]: [ilzɔ̃]. In **ils sont** it is a sharp [s].',
  }),
  pair(P, 'fr-phon-les-hotels-les-haricots', {
    prompt: 'Stumt h eller aspirerat h: ”les hôtels” mot ”les haricots”', promptEn: 'Mute h or aspirated h: "les hôtels" versus "les haricots"',
    fr: 'les hôtels / les haricots', words: ['les hôtels', 'les haricots'], sv: 'hotellen / bönorna', en: 'the hotels / the beans',
    ipa: '/le.z‿o.tɛl/ /le a.ʁi.ko/',
    note: '**h** uttalas aldrig. Men ett ”aspirerat” h, som i *haricot*, blockerar bindning och apostrof: *le haricot*, *les | haricots*. Ordboken markerar dem med en asterisk.',
    noteEn: '**h** is never pronounced. But an "aspirated" h, as in *haricot*, blocks liaison and elision: *le haricot*, *les | haricots*. Dictionaries mark them with an asterisk.',
  }),
  pair(P, 'fr-phon-il-parle-ils-parlent', {
    prompt: 'Stumt -ent: ”il parle” mot ”ils parlent”', promptEn: 'Silent -ent: "il parle" versus "ils parlent"',
    fr: 'il parle / ils parlent', words: ['il parle', 'ils parlent'], sv: 'han talar / de talar', en: 'he speaks / they speak',
    ipa: '/il paʁl/ /il paʁl/',
    note: 'En fälla: de låter **exakt likadant**. Verbändelsen **-ent** är alltid stum, medan *-ent* i andra ord är nasal: *le vent, souvent*.',
    noteEn: 'A trap: they sound **exactly the same**. The verb ending **-ent** is always silent, while *-ent* in other words is nasal: *le vent, souvent*.',
  }),
  pair(P, 'fr-phon-jeu-jeune', {
    prompt: 'Slutet eu eller öppet eu: ”jeu” mot ”jeune”', promptEn: 'Closed eu or open eu: "jeu" versus "jeune"',
    fr: 'jeu / jeune', words: ['jeu', 'jeune'], sv: 'lek / ung', en: 'game / young',
    ipa: '/ʒø/ /ʒœn/',
    note: '**eu** i slutet av ett ord är slutet [ø], som i *deux* och *peu*, nästan svenskt *ö* i *öl*. Följt av ett uttalat konsonantljud öppnas det till [œ], som i *sœur* och *heure*.',
    noteEn: '**eu** at the end of a word is closed [ø], as in *deux* and *peu*: say "ay" with rounded lips. Before a pronounced consonant it opens to [œ], as in *sœur* and *heure*.',
  }),
  pair(P, 'fr-phon-dessert-desert', {
    prompt: 's eller z: ”dessert” mot ”désert”', promptEn: 's or z: "dessert" versus "désert"',
    fr: 'dessert / désert', words: ['dessert', 'désert'], sv: 'efterrätt / öken', en: 'dessert / desert',
    ipa: '/de.sɛʁ/ /de.zɛʁ/',
    note: 'Ett enkelt **s** mellan vokaler blir tonande [z], ett dubbelt **ss** är tonlöst [s]. Svenskan saknar [z], så öva på att låta stämbanden surra.',
    noteEn: 'A single **s** between vowels is voiced [z], a double **ss** is voiceless [s]. Same idea as *poison* / *poisson* (poison / fish).',
  }),
  pair(P, 'fr-phon-toi-tot', {
    prompt: 'oi eller o: ”toi” mot ”tôt”', promptEn: 'oi or o: "toi" versus "tôt"',
    fr: 'toi / tôt', words: ['toi', 'tôt'], sv: 'du (betonat) / tidigt', en: 'you (stressed) / early',
    ipa: '/twa/ /to/',
    note: '**oi** uttalas alltid [wa], som i *moi, bonsoir, croissant*. Ett **ô** med cirkumflex är ett slutet [o], och t:et i *tôt* är stumt.',
    noteEn: '**oi** is always [wa], as in *moi, bonsoir, croissant*. An **ô** with a circumflex is a closed [o], and the t in *tôt* is silent.',
  }),
];

const GENDER_CARDS = [
  vocab(G, 'fr-gen-le-fromage', {
    prompt: 'Genus: ord på -age', promptEn: 'Gender: words ending in -age',
    fr: 'le fromage', sv: 'osten', en: 'the cheese',
    ipa: '/lə fʁɔ.maʒ/',
    note: 'Ord på **-age** är oftast **maskulina**: *le voyage, le garage*. Vanliga undantag: *la plage, la page, l’image*.',
    noteEn: 'Words in **-age** are usually **masculine**: *le voyage, le garage*. Common exceptions: *la plage, la page, l’image*.',
  }),
  vocab(G, 'fr-gen-la-boulangerie', {
    prompt: 'Genus: ord på -erie', promptEn: 'Gender: words ending in -erie',
    fr: 'la boulangerie', sv: 'bageriet', en: 'the bakery',
    ipa: '/la bu.lɑ̃ʒ.ʁi/',
    note: 'Butiker på **-erie** är **feminina**: *la pâtisserie, la fromagerie, la crêperie*. Den som arbetar där har ofta en maskulin form: *le boulanger*.',
    noteEn: 'Shops in **-erie** are **feminine**: *la pâtisserie, la fromagerie, la crêperie*. The person working there often has a masculine form: *le boulanger*.',
  }),
  vocab(G, 'fr-gen-la-maison', {
    prompt: 'Genus: ord på -son', promptEn: 'Gender: words ending in -son',
    fr: 'la maison', sv: 'huset', en: 'the house',
    ipa: '/la mɛ.zɔ̃/',
    note: 'Ord på **-son** och **-aison** är oftast **feminina**: *la saison, la raison*. Viktigt undantag: *le poisson*.',
    noteEn: 'Words in **-son** and **-aison** are usually **feminine**: *la saison, la raison*. Key exception: *le poisson*.',
  }),
  vocab(G, 'fr-gen-le-moment', {
    prompt: 'Genus: ord på -ment', promptEn: 'Gender: words ending in -ment',
    fr: 'le moment', sv: 'ögonblicket', en: 'the moment',
    ipa: '/lə mɔ.mɑ̃/',
    note: 'Substantiv på **-ment** är nästan alltid **maskulina**: *le gouvernement, l’appartement*. Här är *-ent* nasalt, till skillnad från verbändelsen.',
    noteEn: 'Nouns in **-ment** are almost always **masculine**: *le gouvernement, l’appartement*. Here *-ent* is nasal, unlike the verb ending.',
  }),
  vocab(G, 'fr-gen-la-television', {
    prompt: 'Genus: ord på -sion och -tion', promptEn: 'Gender: words ending in -sion and -tion',
    fr: 'la télévision', sv: 'tv:n', en: 'the television',
    ipa: '/la te.le.vi.zjɔ̃/',
    note: 'Alla ord på **-sion** och **-tion** är **feminina**: *la station, l’addition, la nation*. En av de säkraste reglerna.',
    noteEn: 'All words in **-sion** and **-tion** are **feminine**: *la station, l’addition, la nation*. One of the safest rules.',
  }),
  vocab(G, 'fr-gen-la-sante', {
    prompt: 'Genus: ord på -té', promptEn: 'Gender: words ending in -té',
    fr: 'la santé', sv: 'hälsan', en: 'health',
    ipa: '/la sɑ̃.te/',
    note: 'Ord på **-té** är **feminina**: *la liberté, la beauté*. Man skålar med **À votre santé !** Undantag: *l’été* och *le côté* är maskulina.',
    noteEn: 'Words in **-té** are **feminine**: *la liberté, la beauté*. People toast with **À votre santé !** Exceptions: *l’été* and *le côté* are masculine.',
  }),
  vocab(G, 'fr-gen-le-probleme', {
    prompt: 'Genus: ord på -ème', promptEn: 'Gender: words ending in -ème',
    fr: 'le problème', sv: 'problemet', en: 'the problem',
    ipa: '/lə pʁɔ.blɛm/',
    note: 'Slutar på **e** men är **maskulint**, som de flesta ord på **-ème** av grekiskt ursprung: *le système, le thème*. Vanlig fras: *Pas de problème !*',
    noteEn: 'It ends in **e** but is **masculine**, like most Greek-origin words in **-ème**: *le système, le thème*. Common phrase: *Pas de problème !*',
  }),
  vocab(G, 'fr-gen-la-voiture', {
    prompt: 'Genus: ord på -ure', promptEn: 'Gender: words ending in -ure',
    fr: 'la voiture', sv: 'bilen', en: 'the car',
    ipa: '/la vwa.tyʁ/',
    note: 'Ord på **-ure** är oftast **feminina**: *la culture, la nature, la confiture*. Undantag: *le murmure*.',
    noteEn: 'Words in **-ure** are usually **feminine**: *la culture, la nature, la confiture*. Exception: *le murmure*.',
  }),
  vocab(G, 'fr-gen-le-musee', {
    prompt: 'Genus: ett undantag på -ée', promptEn: 'Gender: an exception in -ée',
    fr: 'le musée', sv: 'museet', en: 'the museum',
    ipa: '/lə my.ze/',
    note: 'Ord på **-ée** är oftast feminina (*l’entrée, la journée*), men **le musée** och **le lycée** är maskulina. *Le musée du Louvre* är världens mest besökta museum.',
    noteEn: 'Words in **-ée** are usually feminine (*l’entrée, la journée*), but **le musée** and **le lycée** are masculine. *Le musée du Louvre* is the world’s most visited museum.',
  }),
  vocab(G, 'fr-gen-le-jardin', {
    prompt: 'Genus: ord som slutar på konsonant', promptEn: 'Gender: words ending in a consonant',
    fr: 'le jardin', sv: 'trädgården', en: 'the garden',
    ipa: '/lə ʒaʁ.dɛ̃/',
    note: 'Ord som slutar på konsonant är **oftare maskulina**: *le train, le bus, le vin*. En tumregel, ingen lag. I Paris finns **le jardin du Luxembourg**.',
    noteEn: 'Words ending in a consonant are **more often masculine**: *le train, le bus, le vin*. A rule of thumb, not a law. Paris has **le jardin du Luxembourg**.',
  }),
  vocab(G, 'fr-gen-la-table', {
    prompt: 'Genus: ord som slutar på stumt -e', promptEn: 'Gender: words ending in a silent -e',
    fr: 'la table', sv: 'bordet', en: 'the table',
    ipa: '/la tabl/',
    note: 'Ord på **stumt -e** är **oftare feminina**: *la baguette, la carte, la gare*. Men se upp: *le fromage, le problème, le musée*. Lär dig alltid artikeln med ordet.',
    noteEn: 'Words ending in a **silent -e** are **more often feminine**: *la baguette, la carte, la gare*. But watch out: *le fromage, le problème, le musée*. Always learn the article with the noun.',
  }),
  vocab(G, 'fr-gen-la-mer', {
    prompt: 'Genus: ett feminint undantag', promptEn: 'Gender: a feminine exception',
    fr: 'la mer', sv: 'havet', en: 'the sea',
    ipa: '/la mɛʁ/',
    note: 'Slutar på konsonant men är **feminint**. Låter exakt som *la mère* (mamman) och *le maire* (borgmästaren): bara artikeln och sammanhanget skiljer dem åt.',
    noteEn: 'It ends in a consonant but is **feminine**. It sounds exactly like *la mère* (the mother) and *le maire* (the mayor): only the article and context tell them apart.',
  }),
];

export const FOUNDATION_CARDS = [...PHONETICS, ...GENDER_CARDS];
