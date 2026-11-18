// FranceCore, Unité 15 : Projets et vacances.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT15_DECK = unitDeck({
  n: 15, slug: 'fr-unit-15-plans', sv: 'Planer och semester', en: 'Plans and holidays',
  level: 'A2', section: 'fr-section-4-en-france', after: 'fr-unit-14-traditions',
});
const D = UNIT15_DECK.slug;

export const UNIT15_CARDS = [
  // ===================== MOTS =====================
  vocab(D, 'fr-u15-vacances', {
    prompt: 'Ledigheten då man reser bort', promptEn: 'Time off when you go away',
    fr: 'les vacances', sv: 'semestern / lovet', en: 'the holidays / the vacation',
    ipa: '/le va.kɑ̃s/',
    note: 'Alltid **femininum plural** i den här betydelsen: *les grandes vacances* = sommarlovet. *La vacance* i singular betyder en vakans, en ledig tjänst.',
    noteEn: 'Always **feminine plural** in this sense: *les grandes vacances* = the summer holidays. *La vacance* in the singular means a vacancy.',
  }),
  vocab(D, 'fr-u15-partir-en-vacances', {
    prompt: 'Att åka bort på semester', promptEn: 'To go away on holiday',
    fr: 'partir en vacances', sv: 'åka på semester', en: 'to go on holiday',
    ipa: '/paʁ.tiʁ ɑ̃ va.kɑ̃s/',
    note: '**Partir** = åka iväg, och tar **être** i passé composé: *ils sont partis*. Man säger **en** vacances, utan artikel.',
    noteEn: '**Partir** = to leave, and takes **être** in the passé composé: *ils sont partis*. You say **en** vacances, with no article.',
  }),
  vocab(D, 'fr-u15-reserver', {
    prompt: 'Att boka', promptEn: 'To book',
    fr: 'réserver', sv: 'boka', en: 'to book / to reserve',
    ipa: '/ʁe.zɛʁ.ve/',
    note: 'Bokningen heter **la réservation**. **s** mellan vokaler uttalas [z]: [ʁezɛʁve].',
    noteEn: 'The booking is **la réservation**. An **s** between vowels is [z]: [ʁezɛʁve].',
  }),
  vocab(D, 'fr-u15-hotel', {
    prompt: 'Där man bor när man reser', promptEn: 'Where you stay when travelling',
    fr: 'l’hôtel', sv: 'hotellet', en: 'the hotel',
    ipa: '/lo.tɛl/',
    note: 'Maskulinum med stumt **h**: *un‿hôtel*. Se upp: **l’hôtel de ville** är stadshuset, inte ett hotell.',
    noteEn: 'Masculine with a silent **h**: *un‿hôtel*. Careful: **l’hôtel de ville** is the town hall, not a hotel.',
  }),
  vocab(D, 'fr-u15-chambre-double', {
    prompt: 'Ett hotellrum med dubbelsäng', promptEn: 'A hotel room with a double bed',
    fr: 'une chambre double', sv: 'ett dubbelrum', en: 'a double room',
    ipa: '/yn ʃɑ̃bʁ dubl/',
    note: 'Ett rum med två separata sängar heter **une chambre à deux lits** eller *une chambre twin*. *Chambre* betyder här hotellrum.',
    noteEn: 'A room with two separate beds is **une chambre à deux lits** or *une chambre twin*. *Chambre* here means a hotel room.',
  }),
  vocab(D, 'fr-u15-camping', {
    prompt: 'Platsen där man bor i tält eller husvagn', promptEn: 'Where you stay in a tent or caravan',
    fr: 'le camping', sv: 'campingen', en: 'the campsite',
    ipa: '/lə kɑ̃.piŋ/',
    note: 'På franska är **le camping** själva platsen, inte bara aktiviteten. Campingsemester är mycket populärt i Frankrike, ofta med pool.',
    noteEn: 'In French **le camping** is the place itself, the campsite, not just the activity. Camping holidays are hugely popular in France, often with a pool.',
  }),
  vocab(D, 'fr-u15-gite', {
    prompt: 'Ett hus på landet som man hyr på semestern', promptEn: 'A country house you rent for the holidays',
    fr: 'le gîte', sv: 'stugan / semesterhuset', en: 'the holiday cottage',
    ipa: '/lə ʒit/',
    note: 'Ofta ett gammalt stenhus på landsbygden, hyrt veckovis från lördag till lördag. Märket **Gîtes de France** står för kvalitet.',
    noteEn: 'Often an old stone house in the countryside, rented by the week from Saturday to Saturday. The **Gîtes de France** label stands for quality.',
  }),
  vocab(D, 'fr-u15-valise', {
    prompt: 'Väskan man packar inför resan', promptEn: 'The bag you pack for a trip',
    fr: 'la valise', sv: 'resväskan', en: 'the suitcase',
    ipa: '/la va.liz/',
    note: '**Faire sa valise** = packa väskan. **s** mellan vokaler uttalas [z].',
    noteEn: '**Faire sa valise** = to pack your suitcase. An **s** between vowels is [z].',
  }),
  vocab(D, 'fr-u15-plage', {
    prompt: 'Sanden vid havet', promptEn: 'The sand by the sea',
    fr: 'la plage', sv: 'stranden', en: 'the beach',
    ipa: '/la plaʒ/',
    note: 'Femininum, fast de flesta ord på **-age** är maskulinum (*le voyage, le fromage*). **Aller à la plage** = gå till stranden.',
    noteEn: 'Feminine, although most words in **-age** are masculine (*le voyage, le fromage*). **Aller à la plage** = to go to the beach.',
  }),
  vocab(D, 'fr-u15-sejour', {
    prompt: 'Tiden man stannar på ett ställe', promptEn: 'The time you spend somewhere',
    fr: 'le séjour', sv: 'vistelsen', en: 'the stay',
    ipa: '/lə se.ʒuʁ/',
    note: 'Hotellet säger gärna **Bon séjour !** = trevlig vistelse. Ordet betyder också vardagsrum: *le séjour*.',
    noteEn: 'Hotels like to say **Bon séjour !** = enjoy your stay. The word also means living room: *le séjour*.',
  }),
  vocab(D, 'fr-u15-conges', {
    prompt: 'De lediga dagar man har rätt till från jobbet', promptEn: 'The days off you are entitled to at work',
    fr: 'les congés', sv: 'ledigheten / semesterdagarna', en: 'leave / time off',
    ipa: '/le kɔ̃.ʒe/',
    note: '**Les congés payés** infördes 1936 och ger i dag fem veckors betald semester. **Je suis en congé** = jag är ledig.',
    noteEn: '**Les congés payés**, introduced in 1936, now give five weeks’ paid holiday. **Je suis en congé** = I’m on leave.',
  }),
  vocab(D, 'fr-u15-complet', {
    prompt: 'När det inte finns några lediga platser kvar', promptEn: 'When there are no places left',
    fr: 'complet / complète', sv: 'fullbokad / fullsatt', en: 'full / fully booked',
    ipa: '/kɔ̃.plɛ/ /kɔ̃.plɛt/',
    note: '**C’est complet** står på skylten när hotellet är fullt. Femininum: *la salle est complète*, och då hörs **t**.',
    noteEn: '**C’est complet** is on the sign when the hotel is full. Feminine: *la salle est complète*, and then the **t** is heard.',
  }),

  // ===================== PHRASES =====================
  phrase(D, 'fr-u15-bretagne', {
    prompt: 'Säg att ni ska åka till Bretagne i sommar', promptEn: 'Say you’re going to Brittany this summer',
    fr: 'Cet été, on va partir en Bretagne.', sv: 'I sommar ska vi åka till Bretagne.', en: 'This summer we’re going to Brittany.',
    ipa: '/sɛ.te.te ɔ̃ va paʁ.tiʁ ɑ̃ bʁə.taɲ/',
    note: '**Cet** framför vokal: *cet été*, uttalat [sɛtete]. Femininum regioner och länder tar **en**: *en Bretagne, en Suède*.',
    noteEn: '**Cet** before a vowel: *cet été*, said [sɛtete]. Feminine regions and countries take **en**: *en Bretagne, en Suède*.',
    gloss: [['cet été', 'i sommar', 'this summer'], ['on', 'vi', 'we'], ['va partir', 'ska åka', 'are going'], ['en Bretagne', 'till Bretagne', 'to Brittany']],
  }),
  phrase(D, 'fr-u15-louer-gite', {
    prompt: 'Säg att ni ska hyra ett semesterhus i en vecka', promptEn: 'Say you’re going to rent a holiday cottage for a week',
    fr: 'Nous allons louer un gîte pour une semaine.', sv: 'Vi ska hyra ett semesterhus i en vecka.', en: 'We’re going to rent a holiday cottage for a week.',
    ipa: '/nu.za.lɔ̃ lu.e œ̃ ʒit puʁ yn sə.mɛn/',
    note: '**Louer** = hyra, både som hyresgäst och som uthyrare. **Pour** anger hur länge något är planerat: *pour une semaine*.',
    noteEn: '**Louer** = to rent, whether you are the tenant or the owner. **Pour** gives a planned length of time: *pour une semaine*.',
    gloss: [['nous', 'vi', 'we'], ['allons louer', 'ska hyra', 'are going to rent'], ['un gîte', 'ett semesterhus', 'a holiday cottage'], ['pour une semaine', 'i en vecka', 'for a week']],
  }),
  phrase(D, 'fr-u15-reserver-chambre', {
    prompt: 'Säg att du vill boka ett rum för två nätter', promptEn: 'Say you’d like to book a room for two nights',
    fr: 'Je voudrais réserver une chambre pour deux nuits.', sv: 'Jag skulle vilja boka ett rum för två nätter.', en: 'I’d like to book a room for two nights.',
    ipa: '/ʒə vu.dʁɛ ʁe.zɛʁ.ve yn ʃɑ̃bʁ puʁ dø nɥi/',
    note: '**Nuit** uttalas [nɥi], med samma snabba *ui* som i *cuisine*. Slutets **t** och **s** är stumma.',
    noteEn: '**Nuit** is [nɥi], with the same quick *ui* as in *cuisine*. The final **t** and **s** are silent.',
    gloss: [['je voudrais', 'jag skulle vilja', 'I’d like'], ['réserver', 'boka', 'to book'], ['une chambre', 'ett rum', 'a room'], ['pour deux nuits', 'för två nätter', 'for two nights']],
  }),
  phrase(D, 'fr-u15-petit-dej-compris', {
    prompt: 'Fråga om frukosten ingår', promptEn: 'Ask if breakfast is included',
    fr: 'Est-ce que le petit-déjeuner est compris ?', sv: 'Ingår frukosten?', en: 'Is breakfast included?',
    ipa: '/ɛs.kə lə pə.ti de.ʒœ.ne ɛ kɔ̃.pʁi/',
    note: 'Fråga alltid: på franska hotell ingår frukosten sällan i priset. **Est-ce que** framför ett påstående gör det till en ja / nej-fråga.',
    noteEn: 'Always ask: in French hotels breakfast is rarely included in the price. **Est-ce que** in front of a statement turns it into a yes / no question.',
    gloss: [['est-ce que', '(frågeord)', '(question marker)'], ['le petit-déjeuner', 'frukosten', 'breakfast'], ['est compris', 'ingår', 'is included']],
  }),
  phrase(D, 'fr-u15-train-ou-voiture', {
    prompt: 'Fråga om din vän ska ta tåget eller bilen', promptEn: 'Ask your friend if they’ll take the train or the car',
    fr: 'Tu vas prendre le train ou la voiture ?', sv: 'Ska du ta tåget eller bilen?', en: 'Are you going to take the train or the car?',
    ipa: '/ty va pʁɑ̃dʁ lə tʁɛ̃ u la vwa.tyʁ/',
    note: '**Ou** = eller, utan accent; **où** med accent = var. På motorvägarna betalar man vägtull, **le péage**.',
    noteEn: '**Ou** = or, with no accent; **où** with an accent = where. On motorways you pay a toll, **le péage**.',
    gloss: [['tu', 'du', 'you'], ['vas prendre', 'ska ta', 'are going to take'], ['le train', 'tåget', 'the train'], ['ou', 'eller', 'or'], ['la voiture', 'bilen', 'the car']],
  }),
  phrase(D, 'fr-u15-en-aout', {
    prompt: 'Berätta att många fransmän åker på semester i augusti', promptEn: 'Say many French people go on holiday in August',
    fr: 'En août, beaucoup de Français partent en vacances.', sv: 'I augusti åker många fransmän på semester.', en: 'In August, lots of French people go on holiday.',
    ipa: '/ɑ̃.nut bo.ku də fʁɑ̃.sɛ paʁt ɑ̃ va.kɑ̃s/',
    note: 'I augusti stänger många småbutiker och Paris töms. **Août** uttalas [u] eller [ut]. Substantivet **Français** skrivs med stor bokstav, adjektivet *français* med liten.',
    noteEn: 'In August many small shops close and Paris empties out. **Août** is said [u] or [ut]. The noun **Français** takes a capital, the adjective *français* does not.',
    gloss: [['en août', 'i augusti', 'in August'], ['beaucoup de', 'många', 'lots of'], ['Français', 'fransmän', 'French people'], ['partent', 'åker', 'go'], ['en vacances', 'på semester', 'on holiday']],
  }),
  phrase(D, 'fr-u15-pas-fait-valise', {
    prompt: 'Säg att du inte har packat väskan än', promptEn: 'Say you haven’t packed your suitcase yet',
    fr: 'Je n’ai pas encore fait ma valise.', sv: 'Jag har inte packat väskan än.', en: 'I haven’t packed my suitcase yet.',
    ipa: '/ʒə ne pa.zɑ̃.kɔʁ fɛ ma va.liz/',
    note: 'I passé composé omsluter nekningen **hjälpverbet**: *je **n’**ai **pas** fait*. **Pas encore** = inte än.',
    noteEn: 'In the passé composé the negation wraps around the **auxiliary**: *je **n’**ai **pas** fait*. **Pas encore** = not yet.',
    gloss: [['je', 'jag', 'I'], ['n’ai pas', 'har inte', 'haven’t'], ['encore', 'än', 'yet'], ['fait ma valise', 'packat väskan', 'packed my suitcase']],
  }),
  phrase(D, 'fr-u15-tenverrai-photos', {
    prompt: 'Lova en vän att skicka bilder från stranden', promptEn: 'Promise a friend you’ll send photos from the beach',
    fr: 'Je t’enverrai des photos de la plage.', sv: 'Jag skickar bilder från stranden till dig.', en: 'I’ll send you some photos from the beach.',
    ipa: '/ʒə tɑ̃.vɛ.ʁe de fɔ.to də la plaʒ/',
    note: '**Futur simple** för ett löfte. *Envoyer* har en oregelbunden stam: **j’enverrai**. **T’** (= *te*, till dig) står före verbet.',
    noteEn: '**Futur simple** for a promise. *Envoyer* has an irregular stem: **j’enverrai**. **T’** (= *te*, to you) goes before the verb.',
    gloss: [['je', 'jag', 'I'], ['t’', 'till dig', 'you'], ['enverrai', 'skickar', 'will send'], ['des photos', 'bilder', 'some photos'], ['de la plage', 'från stranden', 'from the beach']],
  }),
];
