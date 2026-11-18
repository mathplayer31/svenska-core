// FranceCore, Unité 3 : La famille. Membres de la famille, possessifs mon / ma / mes, l'âge avec avoir.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT3_DECK = unitDeck({
  n: 3, slug: 'fr-unit-3-family', sv: 'Familjen', en: 'Family',
  level: 'A1', section: 'fr-section-1-premiers-pas', after: 'fr-unit-2-cafe',
});
const D = UNIT3_DECK.slug;

export const UNIT3_CARDS = [
  // ===================== MOTS =====================
  vocab(D, 'fr-u3-la-famille', {
    prompt: 'Föräldrar, syskon, barn ...', promptEn: 'Parents, siblings, children ...',
    fr: 'la famille', sv: 'familjen', en: 'the family',
    ipa: '/la fa.mij/',
    note: '**-ille** uttalas [ij], som ett svenskt *j*: [famij]. Det dubbla **l**:et hörs inte som l.',
    noteEn: '**-ille** is pronounced [ij], like the *y* in *yes*: [famij]. The double **l** is not heard as an l.',
  }),
  vocab(D, 'fr-u3-le-pere', {
    prompt: 'Pappa', promptEn: 'Dad',
    fr: 'le père', sv: 'pappan / fadern', en: 'the father',
    ipa: '/lə pɛʁ/',
    note: '**è** uttalas öppet [ɛ], som i svenskans *ära*. Barn säger **papa**.',
    noteEn: '**è** is an open [ɛ], as in *bed*. Children say **papa**.',
  }),
  vocab(D, 'fr-u3-la-mere', {
    prompt: 'Mamma', promptEn: 'Mum',
    fr: 'la mère', sv: 'mamman / modern', en: 'the mother',
    ipa: '/la mɛʁ/',
    note: 'Låter exakt som **la mer** (havet). Sammanhanget avgör. Barn säger **maman**, med nasalt slut.',
    noteEn: 'Sounds exactly like **la mer** (the sea). Context tells them apart. Children say **maman**, with a nasal ending.',
  }),
  vocab(D, 'fr-u3-les-parents', {
    prompt: 'Mamma och pappa tillsammans', promptEn: 'Mum and dad together',
    fr: 'les parents', sv: 'föräldrarna', en: 'the parents',
    ipa: '/le pa.ʁɑ̃/',
    note: '**Les parents** betyder också ”släktingar” i allmänhet. **-ents** uttalas nasalt [ɑ̃], och t och s är stumma.',
    noteEn: '**Les parents** can also mean "relatives" in general. **-ents** is the nasal [ɑ̃], and the t and s are silent.',
  }),
  vocab(D, 'fr-u3-le-frere', {
    prompt: 'Bror', promptEn: 'Brother',
    fr: 'le frère', sv: 'brodern / brorsan', en: 'the brother',
    ipa: '/lə fʁɛʁ/',
    note: 'Två franska r i samma ord: båda bildas längst bak i halsen. Franskan har inget enkelt ord för ”syskon”: man säger *frères et sœurs*.',
    noteEn: 'Two French r sounds in one word, both made at the back of the throat. French has no everyday word for "siblings": people say *frères et sœurs*.',
  }),
  vocab(D, 'fr-u3-la-soeur', {
    prompt: 'Syster', promptEn: 'Sister',
    fr: 'la sœur', sv: 'systern', en: 'the sister',
    ipa: '/la sœʁ/',
    note: '**œu** är en hopskriven bokstav som uttalas [œ], som svenskans öppna *ö* i *dörr*.',
    noteEn: '**œu** uses a joined letter and sounds [œ], close to the vowel in *her* with rounded lips.',
  }),
  vocab(D, 'fr-u3-le-fils', {
    prompt: 'Son', promptEn: 'Son',
    fr: 'le fils', sv: 'sonen', en: 'the son',
    ipa: '/lə fis/',
    note: 'Ett lurigt ord: **l** är stumt men **s** uttalas, [fis]. Blanda inte ihop det med *fille* (dotter).',
    noteEn: 'A tricky word: the **l** is silent but the **s** is pronounced, [fis]. Don’t mix it up with *fille* (daughter).',
  }),
  vocab(D, 'fr-u3-la-fille', {
    prompt: 'Dotter, men också flicka', promptEn: 'Daughter, but also girl',
    fr: 'la fille', sv: 'dottern / flickan', en: 'the daughter / the girl',
    ipa: '/la fij/',
    note: '**Ma fille** = min dotter, **une fille** = en flicka. Uttalas [fij], med samma **-ille** som i *famille*.',
    noteEn: '**Ma fille** = my daughter, **une fille** = a girl. Pronounced [fij], with the same **-ille** as in *famille*.',
  }),
  vocab(D, 'fr-u3-le-mari', {
    prompt: 'Den man man är gift med', promptEn: 'The man you are married to',
    fr: 'le mari', sv: 'maken', en: 'the husband',
    ipa: '/lə ma.ʁi/',
    note: 'Är man inte gift säger man ofta **mon copain** (min pojkvän) eller **mon compagnon** (min sambo).',
    noteEn: 'If you are not married, people often say **mon copain** (my boyfriend) or **mon compagnon** (my partner).',
  }),
  vocab(D, 'fr-u3-la-femme', {
    prompt: 'Den kvinna man är gift med, men också kvinna', promptEn: 'The woman you are married to, but also woman',
    fr: 'la femme', sv: 'frun / kvinnan', en: 'the wife / the woman',
    ipa: '/la fam/',
    note: 'Ett oväntat uttal: **femme** låter [fam], som om det stod *a*. **Ma femme** = min fru, **une femme** = en kvinna.',
    noteEn: 'An unexpected pronunciation: **femme** sounds [fam], as if spelt with an *a*. **Ma femme** = my wife, **une femme** = a woman.',
  }),
  vocab(D, 'fr-u3-les-grands-parents', {
    prompt: 'Mor- och farföräldrar', promptEn: 'Grandparents',
    fr: 'les grands-parents', sv: 'mor- och farföräldrarna', en: 'the grandparents',
    ipa: '/le ɡʁɑ̃.pa.ʁɑ̃/',
    note: 'Franskan skiljer inte mellan mammas och pappas sida: **le grand-père** och **la grand-mère** räcker. Barn säger **papi** och **mamie**.',
    noteEn: 'French does not separate the mother’s and father’s side: **le grand-père** and **la grand-mère** cover both. Children say **papi** and **mamie**.',
  }),
  vocab(D, 'fr-u3-un-enfant', {
    prompt: 'Barn', promptEn: 'Child',
    fr: 'un enfant / des enfants', sv: 'ett barn / barn', en: 'a child / children',
    ipa: '/œ̃.n‿ɑ̃.fɑ̃/ /de.z‿ɑ̃.fɑ̃/',
    note: 'Bindning: **un enfant** [œ̃nɑ̃fɑ̃], **des enfants** [dezɑ̃fɑ̃]. Det stumma s:et i *des* blir ett [z] framför vokal.',
    noteEn: 'Liaison: **un enfant** [œ̃nɑ̃fɑ̃], **des enfants** [dezɑ̃fɑ̃]. The silent s of *des* turns into [z] before a vowel.',
  }),

  // ===================== PHRASES =====================
  phrase(D, 'fr-u3-jai-un-frere-et-une-soeur', {
    prompt: 'Berätta att du har en bror och en syster', promptEn: 'Say you have a brother and a sister',
    fr: 'J’ai un frère et une sœur.', sv: 'Jag har en bror och en syster.', en: 'I have a brother and a sister.',
    ipa: '/ʒe œ̃ fʁɛʁ e yn sœʁ/',
    note: '**J’ai** (jag har) kommer från *avoir*. **Un** framför maskulint, **une** framför feminint: lär dig alltid artikeln med ordet. **Et** uttalas [e], t:et är alltid stumt.',
    noteEn: '**J’ai** (I have) comes from *avoir*. **Un** before masculine, **une** before feminine: always learn the article with the noun. **Et** is [e], its t is always silent.',
    gloss: [['j’ai', 'jag har', 'I have'], ['un', 'en', 'a'], ['frère', 'bror', 'brother'], ['et', 'och', 'and'], ['une', 'en', 'a'], ['sœur', 'syster', 'sister']],
  }),
  phrase(D, 'fr-u3-ma-mere-sappelle-marie', {
    prompt: 'Säg vad din mamma heter', promptEn: 'Say what your mother is called',
    fr: 'Ma mère s’appelle Marie.', sv: 'Min mamma heter Marie.', en: 'My mother is called Marie.',
    ipa: '/ma mɛʁ sa.pɛl ma.ʁi/',
    note: 'Possessivet följer **ägodelens** genus, inte ägarens: **ma** mère, **mon** père, **mes** parents. Samma *s’appelle* som i *je m’appelle*.',
    noteEn: 'The possessive agrees with the **thing owned**, not the owner: **ma** mère, **mon** père, **mes** parents. Same *s’appelle* as in *je m’appelle*.',
    gloss: [['ma', 'min', 'my'], ['mère', 'mamma', 'mother'], ['s’appelle', 'heter', 'is called'], ['Marie', 'Marie', 'Marie']],
  }),
  phrase(D, 'fr-u3-mon-pere-habite-a-lyon', {
    prompt: 'Säg att din pappa bor i Lyon', promptEn: 'Say your father lives in Lyon',
    fr: 'Mon père habite à Lyon.', sv: 'Min pappa bor i Lyon.', en: 'My father lives in Lyon.',
    ipa: '/mɔ̃ pɛʁ a.bit a ljɔ̃/',
    note: '**Mon** för maskulina ord, och även för feminina ord som börjar på vokal: *mon amie*, aldrig *ma amie*. Städer tar **à**, som i *j’habite à Stockholm*.',
    noteEn: '**Mon** for masculine nouns, and also for feminine nouns starting with a vowel: *mon amie*, never *ma amie*. Cities take **à**, as in *j’habite à Stockholm*.',
    gloss: [['mon', 'min', 'my'], ['père', 'pappa', 'father'], ['habite', 'bor', 'lives'], ['à', 'i', 'in'], ['Lyon', 'Lyon', 'Lyon']],
  }),
  phrase(D, 'fr-u3-jai-trente-ans', {
    prompt: 'Säg att du är trettio år', promptEn: 'Say you are thirty',
    fr: 'J’ai trente ans.', sv: 'Jag är trettio år.', en: 'I’m thirty.',
    ipa: '/ʒe tʁɑ̃.t‿ɑ̃/',
    note: 'Ålder uttrycks med **avoir** (ha): ordagrant ”jag har trettio år”. Säg aldrig *je suis trente*. Och **ans** måste alltid med.',
    noteEn: 'Age uses **avoir** (to have): literally "I have thirty years". Never say *je suis trente*. And **ans** (years) can’t be left out.',
    gloss: [['j’ai', 'jag har', 'I have'], ['trente', 'trettio', 'thirty'], ['ans', 'år', 'years']],
  }),
  phrase(D, 'fr-u3-tu-as-quel-age', {
    prompt: 'Fråga ett barn eller en vän hur gammal hen är', promptEn: 'Ask a child or a friend how old they are',
    fr: 'Tu as quel âge ?', sv: 'Hur gammal är du?', en: 'How old are you?',
    ipa: '/ty a kɛ.l‿ɑʒ/',
    note: 'Ordagrant ”du har vilken ålder?”. Till en vuxen du inte känner: **Quel âge avez-vous ?**, men att fråga om ålder kan vara känsligt.',
    noteEn: 'Literally "you have what age?". To an adult you don’t know: **Quel âge avez-vous ?**, though asking about age can be touchy.',
    gloss: [['tu', 'du', 'you'], ['as', 'har', 'have'], ['quel', 'vilken', 'what'], ['âge', 'ålder', 'age']],
  }),
  phrase(D, 'fr-u3-mes-grands-parents-bretagne', {
    prompt: 'Berätta att dina mor- och farföräldrar bor i Bretagne', promptEn: 'Say your grandparents live in Brittany',
    fr: 'Mes grands-parents habitent en Bretagne.', sv: 'Mina mor- och farföräldrar bor i Bretagne.', en: 'My grandparents live in Brittany.',
    ipa: '/me ɡʁɑ̃.pa.ʁɑ̃ a.bit ɑ̃ bʁə.taɲ/',
    note: '**habitent** uttalas exakt som *habite*: verbändelsen **-ent** är stum. Regioner och länder tar ofta **en**: *en Bretagne, en Suède*.',
    noteEn: '**habitent** sounds exactly like *habite*: the verb ending **-ent** is silent. Regions and countries often take **en**: *en Bretagne, en Suède*.',
    gloss: [['mes', 'mina', 'my'], ['grands-parents', 'mor- och farföräldrar', 'grandparents'], ['habitent', 'bor', 'live'], ['en', 'i', 'in'], ['Bretagne', 'Bretagne', 'Brittany']],
  }),
  phrase(D, 'fr-u3-vous-avez-des-enfants', {
    prompt: 'Fråga artigt om någon har barn', promptEn: 'Politely ask whether someone has children',
    fr: 'Vous avez des enfants ?', sv: 'Har ni barn?', en: 'Do you have children?',
    ipa: '/vu.z‿a.ve de.z‿ɑ̃.fɑ̃/',
    note: 'Två bindningar: **vous‿avez** och **des‿enfants**, båda med [z]. Franskan kräver en artikel, **des**, där svenskan och engelskan inte har någon.',
    noteEn: 'Two liaisons: **vous‿avez** and **des‿enfants**, both with [z]. French needs an article, **des**, where English has none.',
    gloss: [['vous', 'ni', 'you'], ['avez', 'har', 'have'], ['des', '(några)', '(some)'], ['enfants', 'barn', 'children']],
  }),
  phrase(D, 'fr-u3-je-nai-pas-denfants', {
    prompt: 'Svara att du inte har några barn', promptEn: 'Answer that you have no children',
    fr: 'Je n’ai pas d’enfants.', sv: 'Jag har inga barn.', en: 'I don’t have any children.',
    ipa: '/ʒə ne pa dɑ̃.fɑ̃/',
    note: 'Efter nekning blir **un, une, des** till **de**, här **d’** framför vokal. **Ne** blir **n’** framför *ai*.',
    noteEn: 'After a negative, **un, une, des** become **de**, here **d’** before a vowel. **Ne** becomes **n’** before *ai*.',
    gloss: [['je', 'jag', 'I'], ['n’ai', 'har (inte)', 'have (not)'], ['pas', 'inte', 'not'], ['d’enfants', 'några barn', 'any children']],
  }),
];
