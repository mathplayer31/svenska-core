// FranceCore, Unité 11 : Loisirs et week-end.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT11_DECK = unitDeck({
  n: 11, slug: 'fr-unit-11-free-time', sv: 'Fritid och helg', en: 'Free time and weekend',
  level: 'A2', section: 'fr-section-3-ma-vie', after: 'fr-unit-10-work',
});
const D = UNIT11_DECK.slug;

export const UNIT11_CARDS = [
  // ===================== MOTS =====================
  vocab(D, 'fr-u11-week-end', {
    prompt: 'Lördag och söndag', promptEn: 'Saturday and Sunday',
    fr: 'le week-end', sv: 'helgen', en: 'the weekend',
    ipa: '/lə wi.kɛnd/',
    note: 'Lånat från engelskan och maskulinum. **Bon week-end !** = trevlig helg! I Québec säger man hellre *la fin de semaine*.',
    noteEn: 'Borrowed from English and masculine. **Bon week-end !** = have a nice weekend! In Quebec people prefer *la fin de semaine*.',
  }),
  vocab(D, 'fr-u11-sortir', {
    prompt: 'Att gå ut och roa sig', promptEn: 'To go out and have fun',
    fr: 'sortir', sv: 'gå ut', en: 'to go out',
    ipa: '/sɔʁ.tiʁ/',
    note: 'Betyder både att gå ut ur ett rum och att gå ut på kvällen. Passé composé med **être**: *je suis sorti*. Böjning: *je sors, nous sortons*.',
    noteEn: 'Means both leaving a room and going out in the evening. Passé composé with **être**: *je suis sorti*. Present: *je sors, nous sortons*.',
  }),
  vocab(D, 'fr-u11-cine', {
    prompt: 'Biografen, i vardagligt tal', promptEn: 'The cinema, in everyday speech',
    fr: 'le ciné', sv: 'bion', en: 'the cinema / the movies',
    ipa: '/lə si.ne/',
    note: 'Kortform för **le cinéma**. Frankrike har många biografer och billiga studentbiljetter. **c** före *i* och *e* uttalas [s].',
    noteEn: 'Short for **le cinéma**. France has lots of cinemas and cheap student tickets. **c** before *i* and *e* is [s].',
  }),
  vocab(D, 'fr-u11-film', {
    prompt: 'Det man ser på bio', promptEn: 'What you watch at the cinema',
    fr: 'le film', sv: 'filmen', en: 'the film / the movie',
    ipa: '/lə film/',
    note: 'Maskulinum. Fransmän skiljer på **un film en VO** (originalspråk) och **en VF** (dubbad till franska).',
    noteEn: 'Masculine. The French distinguish **un film en VO** (original language) from **en VF** (dubbed into French).',
  }),
  vocab(D, 'fr-u11-concert', {
    prompt: 'Ett musikevenemang', promptEn: 'A live music event',
    fr: 'le concert', sv: 'konserten', en: 'the concert / the gig',
    ipa: '/lə kɔ̃.sɛʁ/',
    note: 'Slutets **t** är stumt: [kɔ̃sɛʁ]. **on** följt av konsonant är ett nasalljud.',
    noteEn: 'The final **t** is silent: [kɔ̃sɛʁ]. **on** followed by a consonant is a nasal vowel.',
  }),
  vocab(D, 'fr-u11-musee', {
    prompt: 'Platsen där man ser konst och utställningar', promptEn: 'Where you see art and exhibitions',
    fr: 'le musée', sv: 'museet', en: 'the museum',
    ipa: '/lə my.ze/',
    note: 'Maskulinum trots ändelsen **-ée**: *un musée*. **s** mellan vokaler uttalas [z].',
    noteEn: 'Masculine despite the **-ée** ending: *un musée*. An **s** between vowels is [z].',
  }),
  vocab(D, 'fr-u11-soiree', {
    prompt: 'En kväll med vänner, eller en fest', promptEn: 'An evening with friends, or a party',
    fr: 'la soirée', sv: 'kvällen / festen', en: 'the evening / the party',
    ipa: '/la swa.ʁe/',
    note: '**Le soir** är tidpunkten, **la soirée** är kvällen som helhet. **Bonne soirée !** säger man när man skiljs på kvällen.',
    noteEn: '**Le soir** is the time of day, **la soirée** the evening as a whole. **Bonne soirée !** is what you say when parting in the evening.',
  }),
  vocab(D, 'fr-u11-piscine', {
    prompt: 'Simhallen', promptEn: 'The swimming pool',
    fr: 'la piscine', sv: 'simhallen / poolen', en: 'the swimming pool',
    ipa: '/la pi.sin/',
    note: 'I franska simhallar är badmössa ofta obligatorisk, och män måste bära tajta badbyxor: badshorts är förbjudna av hygienskäl.',
    noteEn: 'In French public pools a swimming cap is often compulsory, and men must wear tight trunks: baggy shorts are banned for hygiene reasons.',
  }),
  vocab(D, 'fr-u11-match', {
    prompt: 'En fotbollsmatch eller annan tävling', promptEn: 'A football game or other sports fixture',
    fr: 'le match', sv: 'matchen', en: 'the match / the game',
    ipa: '/lə matʃ/',
    note: 'Lånord från engelskan, maskulinum. Plural: *les matchs*. **Regarder le match** = titta på matchen.',
    noteEn: 'A loanword from English, masculine. Plural: *les matchs*. **Regarder le match** = to watch the game.',
  }),
  vocab(D, 'fr-u11-jouer-au-foot', {
    prompt: 'Att spela fotboll', promptEn: 'To play football',
    fr: 'jouer au foot', sv: 'spela fotboll', en: 'to play football',
    ipa: '/ʒu.e o fut/',
    note: '**Jouer à** + sport (*au foot, au tennis*), men **jouer de** + instrument (*de la guitare*). **Le foot** är kortform för *le football*.',
    noteEn: '**Jouer à** + a sport (*au foot, au tennis*), but **jouer de** + an instrument (*de la guitare*). **Le foot** is short for *le football*.',
  }),
  vocab(D, 'fr-u11-faire-du-velo', {
    prompt: 'Att cykla', promptEn: 'To ride a bike',
    fr: 'faire du vélo', sv: 'cykla', en: 'to go cycling',
    ipa: '/fɛʁ dy ve.lo/',
    note: 'Många aktiviteter bildas med **faire de**: *faire du sport, faire de la natation*. Cykelloppet **le Tour de France** går varje juli.',
    noteEn: 'Many activities are built with **faire de**: *faire du sport, faire de la natation*. **Le Tour de France** cycle race runs every July.',
  }),
  vocab(D, 'fr-u11-loisirs', {
    prompt: 'Det man gör på fritiden', promptEn: 'What you do in your spare time',
    fr: 'les loisirs', sv: 'fritidsintressena / fritiden', en: 'leisure activities / hobbies',
    ipa: '/le lwa.ziʁ/',
    note: 'Används oftast i plural: *Quels sont tes loisirs ?* Slutets **s** är stumt, och **oi** uttalas [wa].',
    noteEn: 'Usually plural: *Quels sont tes loisirs ?* The final **s** is silent, and **oi** is [wa].',
  }),

  // ===================== PHRASES =====================
  phrase(D, 'fr-u11-fait-ce-week-end', {
    prompt: 'Fråga en vän vad hen gjorde i helgen', promptEn: 'Ask a friend what they did at the weekend',
    fr: 'Qu’est-ce que tu as fait ce week-end ?', sv: 'Vad gjorde du i helgen?', en: 'What did you do at the weekend?',
    ipa: '/kɛs.kə ty a fɛ sə wi.kɛnd/',
    note: 'Standardfrågan på måndagsmorgonen. **Fait** är perfekt particip av *faire*. **Ce week-end** kan syfta på både förra och nästa helg.',
    noteEn: 'The standard Monday morning question. **Fait** is the past participle of *faire*. **Ce week-end** can mean last or next weekend.',
    gloss: [['qu’est-ce que', 'vad', 'what'], ['tu', 'du', 'you'], ['as fait', 'gjorde', 'did'], ['ce week-end', 'i helgen', 'at the weekend']],
  }),
  phrase(D, 'fr-u11-allee-au-cinema', {
    prompt: 'Säg att du (kvinna) gick på bio med vänner i lördags', promptEn: 'Say you (a woman) went to the cinema with friends on Saturday',
    fr: 'Samedi, je suis allée au cinéma avec des amis.', sv: 'I lördags gick jag på bio med några vänner.', en: 'On Saturday I went to the cinema with some friends.',
    ipa: '/sam.di ʒə sɥi.za.le o si.ne.ma a.vɛk de.za.mi/',
    note: '**Aller** bildar passé composé med **être**, och participet böjs: **allée** när det är en kvinna som talar. Två bindningar: *suis‿allée*, *des‿amis*.',
    noteEn: '**Aller** forms the passé composé with **être**, and the participle agrees: **allée** when a woman is speaking. Two liaisons: *suis‿allée*, *des‿amis*.',
    gloss: [['samedi', 'i lördags', 'on Saturday'], ['je', 'jag', 'I'], ['suis allée', 'gick', 'went'], ['au cinéma', 'på bio', 'to the cinema'], ['avec', 'med', 'with'], ['des amis', 'några vänner', 'some friends']],
  }),
  phrase(D, 'fr-u11-vo', {
    prompt: 'Säg att ni såg en film på originalspråk', promptEn: 'Say you saw a film in the original language',
    fr: 'On a vu un film en version originale.', sv: 'Vi såg en film på originalspråk.', en: 'We saw a film in the original language.',
    ipa: '/ɔ̃.na vy œ̃ film ɑ̃ vɛʁ.sjɔ̃ ɔ.ʁi.ʒi.nal/',
    note: 'Till skillnad från i Sverige dubbas de flesta filmer i Frankrike. Leta efter **VOST** (*version originale sous-titrée*) för att höra originalet med textning.',
    noteEn: 'Most films are dubbed in France. Look for **VOST** (*version originale sous-titrée*) to hear the original with subtitles.',
    gloss: [['on', 'vi', 'we'], ['a vu', 'såg', 'saw'], ['un film', 'en film', 'a film'], ['en version originale', 'på originalspråk', 'in the original language']],
  }),
  phrase(D, 'fr-u11-suis-sorti', {
    prompt: 'Säg att du (man) gick ut med kompisar i fredags kväll', promptEn: 'Say you (a man) went out with friends on Friday night',
    fr: 'Vendredi soir, je suis sorti avec des copains.', sv: 'I fredags kväll gick jag ut med några kompisar.', en: 'On Friday night I went out with some mates.',
    ipa: '/vɑ̃.dʁə.di swaʁ ʒə sɥi sɔʁ.ti a.vɛk de kɔ.pɛ̃/',
    note: '**Un copain / une copine** = en kompis. Men **mon copain / ma copine** betyder oftast pojkvän eller flickvän!',
    noteEn: '**Un copain / une copine** = a friend. But **mon copain / ma copine** usually means my boyfriend or my girlfriend!',
    gloss: [['vendredi soir', 'i fredags kväll', 'on Friday night'], ['je', 'jag', 'I'], ['suis sorti', 'gick ut', 'went out'], ['avec', 'med', 'with'], ['des copains', 'några kompisar', 'some mates']],
  }),
  phrase(D, 'fr-u11-restes-maison', {
    prompt: 'Säg att ni stannade hemma i söndags', promptEn: 'Say you stayed at home on Sunday',
    fr: 'Dimanche, nous sommes restés à la maison.', sv: 'I söndags stannade vi hemma.', en: 'On Sunday we stayed at home.',
    ipa: '/di.mɑ̃ʃ nu sɔm ʁɛs.te a la mɛ.zɔ̃/',
    note: '**Rester** betyder stanna, inte vila. Det tar **être**, och participet står i plural: **restés**. Söndagen är lugn: de flesta butiker är stängda.',
    noteEn: '**Rester** means to stay, not to rest. It takes **être**, and the participle is plural: **restés**. Sunday is quiet: most shops are closed.',
    gloss: [['dimanche', 'i söndags', 'on Sunday'], ['nous', 'vi', 'we'], ['sommes restés', 'stannade', 'stayed'], ['à la maison', 'hemma', 'at home']],
  }),
  phrase(D, 'fr-u11-musees-gratuits', {
    prompt: 'Berätta att många museer är gratis första söndagen i månaden', promptEn: 'Say many museums are free on the first Sunday of the month',
    fr: 'Beaucoup de musées sont gratuits le premier dimanche du mois.', sv: 'Många museer är gratis första söndagen i månaden.', en: 'Many museums are free on the first Sunday of the month.',
    ipa: '/bo.ku də my.ze sɔ̃ ɡʁa.tɥi lə pʁə.mje di.mɑ̃ʃ dy mwa/',
    note: '**Beaucoup de** följs av substantiv utan artikel. **Gratuits** böjs efter *musées*. Statliga museer är dessutom gratis för unga under 26 år som bor i EU.',
    noteEn: '**Beaucoup de** is followed by a noun with no article. **Gratuits** agrees with *musées*. National museums are also free for EU residents under 26.',
    gloss: [['beaucoup de', 'många', 'many'], ['musées', 'museer', 'museums'], ['sont', 'är', 'are'], ['gratuits', 'gratis', 'free'], ['le premier dimanche', 'första söndagen', 'on the first Sunday'], ['du mois', 'i månaden', 'of the month']],
  }),
  phrase(D, 'fr-u11-piscine-demain', {
    prompt: 'Säg att ni ska gå till simhallen i morgon och fråga om din vän hänger med', promptEn: 'Say you’re going to the pool tomorrow and ask your friend to come',
    fr: 'On va aller à la piscine demain, tu viens ?', sv: 'Vi ska gå till simhallen i morgon, hänger du med?', en: 'We’re going to the pool tomorrow, are you coming?',
    ipa: '/ɔ̃ va a.le a la pi.sin də.mɛ̃ ty vjɛ̃/',
    note: '*Aller* fungerar i futur proche med sig självt: **on va aller**. **Tu viens ?** är det enklaste sättet att bjuda med någon.',
    noteEn: '*Aller* works in the futur proche with itself: **on va aller**. **Tu viens ?** is the simplest way to invite someone along.',
    gloss: [['on', 'vi', 'we'], ['va aller', 'ska gå', 'are going to go'], ['à la piscine', 'till simhallen', 'to the pool'], ['demain', 'i morgon', 'tomorrow'], ['tu viens', 'hänger du med', 'are you coming']],
  }),
  phrase(D, 'fr-u11-lai-trouve-long', {
    prompt: 'Säg vad du tyckte om filmen: lite lång', promptEn: 'Say what you thought of the film: a bit long',
    fr: 'Le film ? Je l’ai trouvé un peu long.', sv: 'Filmen? Jag tyckte att den var lite lång.', en: 'The film? I found it a bit long.',
    ipa: '/lə film ʒə le tʁu.ve œ̃ pø lɔ̃/',
    note: '**Trouver** används för åsikter, som svenskans *tycka*. Pronomenet **l’** står före hjälpverbet. **g** i *long* är stumt.',
    noteEn: '**Trouver** is used for opinions, like *find* or *think*. The pronoun **l’** goes before the auxiliary. The **g** in *long* is silent.',
    gloss: [['le film', 'filmen', 'the film'], ['je', 'jag', 'I'], ['l’', 'den', 'it'], ['ai trouvé', 'tyckte', 'found'], ['un peu', 'lite', 'a bit'], ['long', 'lång', 'long']],
  }),
];
