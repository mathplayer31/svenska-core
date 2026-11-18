// FranceCore, Unité 9 : Ma journée.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT9_DECK = unitDeck({
  n: 9, slug: 'fr-unit-9-day', sv: 'Min dag', en: 'My day',
  level: 'A2', section: 'fr-section-3-ma-vie', after: 'fr-unit-8-home',
});
const D = UNIT9_DECK.slug;

export const UNIT9_CARDS = [
  // ===================== MOTS =====================
  vocab(D, 'fr-u9-se-reveiller', {
    prompt: 'Att vakna', promptEn: 'To wake up',
    fr: 'se réveiller', sv: 'vakna', en: 'to wake up',
    ipa: '/sə ʁe.ve.je/',
    note: 'Ett **reflexivt verb**: ordagrant ”väcka sig”. Pronomenet följer subjektet: *je me réveille, tu te réveilles*. Väckarklockan heter **le réveil**.',
    noteEn: 'A **reflexive verb**: literally "to wake oneself". The pronoun matches the subject: *je me réveille, tu te réveilles*. The alarm clock is **le réveil**.',
  }),
  vocab(D, 'fr-u9-se-lever', {
    prompt: 'Att stiga upp ur sängen', promptEn: 'To get out of bed',
    fr: 'se lever', sv: 'gå upp / stiga upp', en: 'to get up',
    ipa: '/sə lə.ve/',
    note: 'Stammen får accent grave när ändelsen är stum: *je me **lève***, men *nous nous levons*. Det stumma **e** i *lever* försvinner ofta i tal.',
    noteEn: 'The stem takes a grave accent when the ending is silent: *je me **lève***, but *nous nous levons*. The weak **e** in *lever* often disappears in speech.',
  }),
  vocab(D, 'fr-u9-se-doucher', {
    prompt: 'Att duscha', promptEn: 'To have a shower',
    fr: 'se doucher', sv: 'duscha', en: 'to shower',
    ipa: '/sə du.ʃe/',
    note: 'Man kan också säga **prendre une douche**. **ou** uttalas alltid [u], som svenskt *o* i *bok*.',
    noteEn: 'You can also say **prendre une douche**. **ou** is always [u], as in *food*.',
  }),
  vocab(D, 'fr-u9-shabiller', {
    prompt: 'Att klä på sig', promptEn: 'To get dressed',
    fr: 's’habiller', sv: 'klä på sig', en: 'to get dressed',
    ipa: '/sa.bi.je/',
    note: '**Se** blir **s’** eftersom **h** är stumt. **-ill-** uttalas [ij], som ett *j*: [sabije].',
    noteEn: '**Se** becomes **s’** because the **h** is silent. **-ill-** is pronounced [ij], like a *y*: [sabije].',
  }),
  vocab(D, 'fr-u9-se-coucher', {
    prompt: 'Att gå och lägga sig', promptEn: 'To go to bed',
    fr: 'se coucher', sv: 'gå och lägga sig', en: 'to go to bed',
    ipa: '/sə ku.ʃe/',
    note: 'Ett verb där svenskan behöver tre. Förväxla inte med **dormir**, att sova: man kan *se coucher* utan att somna.',
    noteEn: 'One verb where English needs three words. Don’t confuse it with **dormir**, to sleep: you can *se coucher* without falling asleep.',
  }),
  vocab(D, 'fr-u9-petit-dejeuner', {
    prompt: 'Dagens första måltid', promptEn: 'The first meal of the day',
    fr: 'le petit-déjeuner', sv: 'frukosten', en: 'breakfast',
    ipa: '/lə pə.ti de.ʒœ.ne/',
    note: 'Den franska frukosten är söt: bröd med smör och sylt, croissant, kaffe eller choklad, ofta i en skål. Pålägg som ost och skinka är ovanligt på morgonen.',
    noteEn: 'French breakfast is sweet: bread with butter and jam, croissants, coffee or hot chocolate, often in a bowl. Cheese and ham in the morning are unusual.',
  }),
  vocab(D, 'fr-u9-dejeuner', {
    prompt: 'Måltiden mitt på dagen', promptEn: 'The midday meal',
    fr: 'le déjeuner', sv: 'lunchen', en: 'lunch',
    ipa: '/lə de.ʒœ.ne/',
    note: 'Fungerar också som verb: **déjeuner** = äta lunch. Se upp: i Belgien, Schweiz och Québec betyder *le déjeuner* frukost.',
    noteEn: 'Also a verb: **déjeuner** = to have lunch. Watch out: in Belgium, Switzerland and Quebec *le déjeuner* means breakfast.',
  }),
  vocab(D, 'fr-u9-diner', {
    prompt: 'Kvällsmaten', promptEn: 'The evening meal',
    fr: 'le dîner', sv: 'middagen', en: 'dinner',
    ipa: '/lə di.ne/',
    note: 'Fransmän äter middag sent, sällan före klockan 19 och ofta runt 20. Verbet är **dîner**; cirkumflexen ändrar inte uttalet.',
    noteEn: 'The French eat dinner late, rarely before 7 pm and often around 8. The verb is **dîner**; the circumflex doesn’t change the sound.',
  }),
  vocab(D, 'fr-u9-matin', {
    prompt: 'Den första delen av dagen', promptEn: 'The first part of the day',
    fr: 'le matin', sv: 'morgonen / förmiddagen', en: 'the morning',
    ipa: '/lə ma.tɛ̃/',
    note: '**Le matin** utan preposition = på morgonen, varje morgon. **Ce matin** = i morse. **in** är ett nasalljud, [ɛ̃].',
    noteEn: '**Le matin** with no preposition = in the morning, every morning. **Ce matin** = this morning. **in** is a nasal vowel, [ɛ̃].',
  }),
  vocab(D, 'fr-u9-apres-midi', {
    prompt: 'Tiden mellan lunch och kväll', promptEn: 'The time between lunch and evening',
    fr: 'l’après-midi', sv: 'eftermiddagen', en: 'the afternoon',
    ipa: '/la.pʁɛ.mi.di/',
    note: 'Ordagrant ”efter middag”, där *midi* betyder klockan tolv. Kan vara både maskulinum och femininum, men **un après-midi** är vanligast.',
    noteEn: 'Literally "after midday", *midi* meaning noon. It can be masculine or feminine, but **un après-midi** is the usual choice.',
  }),
  vocab(D, 'fr-u9-soir', {
    prompt: 'Tiden efter arbetsdagen', promptEn: 'The time after the working day',
    fr: 'le soir', sv: 'kvällen', en: 'the evening',
    ipa: '/lə swaʁ/',
    note: '**Ce soir** = i kväll, **hier soir** = i går kväll. **La soirée** är hela kvällen, eller en fest.',
    noteEn: '**Ce soir** = tonight, **hier soir** = last night. **La soirée** is the whole evening, or a party.',
  }),
  vocab(D, 'fr-u9-midi-minuit', {
    prompt: 'Klockan tolv på dagen och klockan tolv på natten', promptEn: 'Twelve o’clock noon and twelve o’clock midnight',
    fr: 'midi / minuit', sv: 'tolv på dagen / midnatt', en: 'noon / midnight',
    ipa: '/mi.di/ /mi.nɥi/',
    note: 'Man säger *il est midi*, inte *douze heures* i vardagligt tal. Båda är maskulinum: *midi et demi*, utan **e**.',
    noteEn: 'People say *il est midi* rather than *douze heures* in everyday speech. Both are masculine: *midi et demi*, with no **e**.',
  }),

  // ===================== PHRASES =====================
  phrase(D, 'fr-u9-je-me-leve', {
    prompt: 'Säg att du går upp klockan sju', promptEn: 'Say you get up at seven',
    fr: 'Je me lève à sept heures.', sv: 'Jag går upp klockan sju.', en: 'I get up at seven o’clock.',
    ipa: '/ʒə mə lɛv a sɛ.tœʁ/',
    note: '**Heures** måste alltid sägas: *à sept heures*, inte bara *à sept*. **p** i *sept* är stumt, men **t** binds till *heures*.',
    noteEn: '**Heures** must always be said: *à sept heures*, not just *à sept*. The **p** in *sept* is silent, but the **t** links to *heures*.',
    gloss: [['je', 'jag', 'I'], ['me lève', 'går upp', 'get up'], ['à', 'klockan', 'at'], ['sept heures', 'sju', 'seven o’clock']],
  }),
  phrase(D, 'fr-u9-quelle-heure', {
    prompt: 'Fråga vad klockan är och svara att den är halv nio', promptEn: 'Ask the time and answer that it is half past eight',
    fr: 'Quelle heure est-il ? Il est huit heures et demie.', sv: 'Hur mycket är klockan? Hon är halv nio.', en: 'What time is it? It’s half past eight.',
    ipa: '/kɛ.lœʁ ɛ.til il ɛ ɥi.tœʁ e də.mi/',
    note: 'Se upp: franskan räknar från timmen som har gått. **Huit heures et demie** = 8.30 = *halv nio*. **Demie** får **e** eftersom *heure* är femininum.',
    noteEn: 'French counts from the hour just gone: **huit heures et demie** = 8:30. **Demie** takes an **e** because *heure* is feminine.',
    gloss: [['quelle heure', 'vilken tid', 'what time'], ['est-il', 'är det', 'is it'], ['il est', 'hon är', 'it is'], ['huit heures', 'åtta', 'eight'], ['et demie', 'och en halv', 'thirty']],
  }),
  phrase(D, 'fr-u9-tartines', {
    prompt: 'Berätta vad du äter till frukost', promptEn: 'Say what you have for breakfast',
    fr: 'Le matin, je prends un café et des tartines.', sv: 'På morgonen dricker jag kaffe och äter bröd med smör och sylt.', en: 'In the morning I have a coffee and some bread with butter and jam.',
    ipa: '/lə ma.tɛ̃ ʒə pʁɑ̃ œ̃ ka.fe e de taʁ.tin/',
    note: '**Une tartine** är en bit baguette med smör och sylt, som man gärna doppar i kaffet. **Prendre** används för mat och dryck, som engelskans *have*.',
    noteEn: '**Une tartine** is a piece of baguette with butter and jam, often dunked in coffee. **Prendre** is used for food and drink, like *have*.',
    gloss: [['le matin', 'på morgonen', 'in the morning'], ['je', 'jag', 'I'], ['prends', 'tar', 'have'], ['un café', 'en kaffe', 'a coffee'], ['et', 'och', 'and'], ['des tartines', 'bröd med smör och sylt', 'bread with butter and jam']],
  }),
  phrase(D, 'fr-u9-dejeune-midi', {
    prompt: 'Säg att du äter lunch halv ett med dina kollegor', promptEn: 'Say you have lunch at half past twelve with your colleagues',
    fr: 'Je déjeune à midi et demi avec mes collègues.', sv: 'Jag äter lunch halv ett med mina kollegor.', en: 'I have lunch at half past twelve with my colleagues.',
    ipa: '/ʒə de.ʒœn a mi.di e də.mi a.vɛk me kɔ.lɛɡ/',
    note: '**Midi et demi** stavas utan **e**, eftersom *midi* är maskulinum. Lunchen är en riktig måltid och tar gärna en timme.',
    noteEn: '**Midi et demi** has no **e**, since *midi* is masculine. Lunch is a proper meal and often lasts an hour.',
    gloss: [['je', 'jag', 'I'], ['déjeune', 'äter lunch', 'have lunch'], ['à midi et demi', 'halv ett', 'at half past twelve'], ['avec', 'med', 'with'], ['mes', 'mina', 'my'], ['collègues', 'kollegor', 'colleagues']],
  }),
  phrase(D, 'fr-u9-couchee-tard', {
    prompt: 'Säg att du (kvinna) gick och lade dig sent i går kväll', promptEn: 'Say you (a woman) went to bed late last night',
    fr: 'Hier soir, je me suis couchée tard.', sv: 'I går kväll gick jag och lade mig sent.', en: 'Last night I went to bed late.',
    ipa: '/jɛʁ swaʁ ʒə mə sɥi ku.ʃe taʁ/',
    note: 'Reflexiva verb bildar passé composé med **être**, och participet böjs efter subjektet: **couchée** (kvinna), *couché* (man). Uttalet är detsamma.',
    noteEn: 'Reflexive verbs form the passé composé with **être**, and the participle agrees with the subject: **couchée** (woman), *couché* (man). Both sound the same.',
    gloss: [['hier soir', 'i går kväll', 'last night'], ['je', 'jag', 'I'], ['me suis couchée', 'gick och lade mig', 'went to bed'], ['tard', 'sent', 'late']],
  }),
  phrase(D, 'fr-u9-tu-tes-leve', {
    prompt: 'Fråga en kompis (man) hur dags han gick upp', promptEn: 'Ask a (male) friend what time he got up',
    fr: 'Tu t’es levé à quelle heure ?', sv: 'Hur dags gick du upp?', en: 'What time did you get up?',
    ipa: '/ty tɛ lə.ve a kɛ.lœʁ/',
    note: '**T’es** = *te* + *es*. I talspråk hamnar frågeordet gärna sist: *à quelle heure ?* Till en kvinna skriver man **levée**.',
    noteEn: '**T’es** = *te* + *es*. In speech the question word often comes last: *à quelle heure ?* To a woman you write **levée**.',
    gloss: [['tu', 'du', 'you'], ['t’es levé', 'gick upp', 'got up'], ['à quelle heure', 'hur dags', 'what time']],
  }),
  phrase(D, 'fr-u9-vingt-heures', {
    prompt: 'Berätta att ni äter middag runt åtta på kvällen', promptEn: 'Say you have dinner around eight in the evening',
    fr: 'Le soir, on dîne vers vingt heures.', sv: 'På kvällen äter vi middag runt åtta.', en: 'In the evening we have dinner around eight.',
    ipa: '/lə swaʁ ɔ̃ din vɛʁ vɛ̃.tœʁ/',
    note: 'Franskan använder gärna 24-timmarsklockan även i tal: **vingt heures** = 20.00. **t** i *vingt* uttalas framför *heures*. **Vers** = ungefär, runt.',
    noteEn: 'French often uses the 24-hour clock even in speech: **vingt heures** = 8 pm. The **t** of *vingt* is sounded before *heures*. **Vers** = around.',
    gloss: [['le soir', 'på kvällen', 'in the evening'], ['on', 'vi', 'we'], ['dîne', 'äter middag', 'have dinner'], ['vers', 'runt', 'around'], ['vingt heures', 'åtta på kvällen', 'eight pm']],
  }),
  phrase(D, 'fr-u9-vais-me-doucher', {
    prompt: 'Säg att du ska duscha innan du går', promptEn: 'Say you’re going to shower before you leave',
    fr: 'Je vais me doucher avant de partir.', sv: 'Jag ska duscha innan jag går.', en: 'I’m going to have a shower before I leave.',
    ipa: '/ʒə vɛ mə du.ʃe a.vɑ̃ də paʁ.tiʁ/',
    note: 'I futur proche står reflexivpronomenet framför infinitiven: *je vais **me** doucher*. **Avant de** + infinitiv motsvarar *innan jag ...*.',
    noteEn: 'In the futur proche the reflexive pronoun sits before the infinitive: *je vais **me** doucher*. **Avant de** + infinitive = *before ...ing*.',
    gloss: [['je', 'jag', 'I'], ['vais', 'ska', 'am going to'], ['me doucher', 'duscha', 'have a shower'], ['avant de', 'innan', 'before'], ['partir', 'jag går', 'leaving']],
  }),
];
