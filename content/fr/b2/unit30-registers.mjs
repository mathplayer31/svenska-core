// FranceCore, Unité 30 : Registres de langue (soutenu / courant / familier, verlan, argot courant).
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT30_DECK = unitDeck({
  n: 30, slug: 'fr-unit-30-registers', sv: 'Språkregister', en: 'Registers',
  level: 'B2', section: 'fr-section-8-nuances', after: 'fr-unit-29-arguing',
});
const D = UNIT30_DECK.slug;

export const UNIT30_CARDS = [
  // ===================== MOTS =====================
  vocab(D, 'fr-u30-verlan', {
    prompt: 'Slangen där man vänder på stavelserna', promptEn: 'The slang that flips syllables around',
    fr: 'le verlan', sv: 'verlan (baklängesslang)', en: 'verlan (back slang)',
    ipa: '/lə vɛʁ.lɑ̃/',
    note: 'Ordet är självt verlan av **l’envers** (baksidan): *l’en-vers* blir *ver-lan*. Det uppstod i förorterna och spreds via rap och film. Exempel: *fou* blir **ouf**, *femme* blir **meuf**.',
    noteEn: 'The word is itself verlan for **l’envers** (the reverse): *l’en-vers* becomes *ver-lan*. It grew up in the suburbs and spread through rap and film. Examples: *fou* gives **ouf**, *femme* gives **meuf**.',
  }),
  vocab(D, 'fr-u30-boulot', {
    prompt: 'Vardagsordet för jobb', promptEn: 'The everyday word for job',
    fr: 'le boulot', sv: 'jobbet / knegandet', en: 'the job / work (informal)',
    ipa: '/lə bu.lo/',
    note: 'Tre register för samma sak: **un emploi** (formellt), **un travail** (neutralt), **un boulot** (ledigt). *Métro, boulot, dodo* = pendla, jobba, sova, alltså ekorrhjulet.',
    noteEn: 'Three registers for one idea: **un emploi** (formal), **un travail** (neutral), **un boulot** (casual). *Métro, boulot, dodo* = commute, work, sleep: the daily grind.',
  }),
  vocab(D, 'fr-u30-bosser', {
    prompt: 'Ledigt verb för att arbeta', promptEn: 'Casual verb for working',
    fr: 'bosser', sv: 'jobba / plugga', en: 'to work / to study hard (informal)',
    ipa: '/bɔ.se/',
    note: 'Används om både arbete och studier: *Je bosse mes maths.* Inte släkt med engelskans *boss*. Neutral motsvarighet: **travailler**.',
    noteEn: 'Used for both work and study: *Je bosse mes maths.* Not related to English *boss*. Neutral equivalent: **travailler**.',
  }),
  vocab(D, 'fr-u30-fric', {
    prompt: 'Slang för pengar', promptEn: 'Slang for money',
    fr: 'le fric', sv: 'stålarna / pengarna', en: 'cash / dough',
    ipa: '/lə fʁik/',
    note: 'Många synonymer i talspråk: **le pognon**, **la thune**, **le blé**. Det neutrala ordet är **l’argent**, som också betyder silver.',
    noteEn: 'Plenty of slang synonyms: **le pognon**, **la thune**, **le blé**. The neutral word is **l’argent**, which also means silver.',
  }),
  vocab(D, 'fr-u30-bagnole', {
    prompt: 'Ledigt ord för bil', promptEn: 'Casual word for car',
    fr: 'la bagnole', sv: 'kärran / bilen', en: 'the car / the wheels (informal)',
    ipa: '/la ba.ɲɔl/',
    note: 'Registertrappan: **une automobile** (formellt), **une voiture** (neutralt), **une bagnole** (ledigt), **une caisse** (slang). **gn** uttalas [ɲ], som i *champagne*.',
    noteEn: 'The register ladder: **une automobile** (formal), **une voiture** (neutral), **une bagnole** (casual), **une caisse** (slang). **gn** is pronounced [ɲ], as in *champagne*.',
  }),
  vocab(D, 'fr-u30-mec', {
    prompt: 'Ledigt ord för man eller kille', promptEn: 'Casual word for man or guy',
    fr: 'un mec', sv: 'en kille', en: 'a guy / a bloke',
    ipa: '/œ̃ mɛk/',
    note: 'Mycket vanligt och inte oartigt bland vänner. **mon mec** = min kille, min pojkvän. Neutralt: **un homme**, **un garçon**.',
    noteEn: 'Very common and not rude among friends. **mon mec** = my boyfriend. Neutral: **un homme**, **un garçon**.',
  }),
  vocab(D, 'fr-u30-meuf', {
    prompt: 'Verlan för kvinna eller tjej', promptEn: 'Verlan for woman or girl',
    fr: 'une meuf', sv: 'en tjej', en: 'a girl / a woman (slang)',
    ipa: '/yn mœf/',
    note: 'Verlan av **femme**: *fem-me* blir *meuf*. **ma meuf** = min tjej, min flickvän. Ledigt; kan uppfattas som nedlåtande av vissa.',
    noteEn: 'Verlan for **femme**: *fem-me* becomes *meuf*. **ma meuf** = my girlfriend. Casual; some find it disrespectful.',
  }),
  vocab(D, 'fr-u30-relou', {
    prompt: 'Verlan för jobbig, tröttsam', promptEn: 'Verlan for annoying, tiresome',
    fr: 'relou', sv: 'jobbig / tjatig', en: 'annoying / a pain',
    ipa: '/ʁə.lu/',
    note: 'Verlan av **lourd** (tung), som i talspråk redan betyder ”påfrestande”: *Il est lourd avec ses blagues.* Böjs sällan: *elle est relou*.',
    noteEn: 'Verlan for **lourd** (heavy), which in speech already means "tiresome": *Il est lourd avec ses blagues.* Rarely inflected: *elle est relou*.',
  }),
  vocab(D, 'fr-u30-chelou', {
    prompt: 'Verlan för konstig, misstänkt', promptEn: 'Verlan for weird, dodgy',
    fr: 'chelou', sv: 'skum / konstig', en: 'weird / dodgy',
    ipa: '/ʃə.lu/',
    note: 'Verlan av **louche** (skum, misstänkt). Ett av de mest spridda verlanorden, som även medelålders fransmän använder.',
    noteEn: 'Verlan for **louche** (shady, suspicious). One of the most widespread verlan words, used even by middle-aged speakers.',
  }),
  vocab(D, 'fr-u30-ouf', {
    prompt: 'Verlan för galen, ofta som förstärkning', promptEn: 'Verlan for crazy, often as an intensifier',
    fr: 'ouf', sv: 'galen / helt sjuk', en: 'crazy / insane (slang)',
    ipa: '/uf/',
    note: 'Verlan av **fou**. Vanligast i uttrycket **de ouf**: *un concert de ouf* = en helt sjuk konsert. Förväxla inte med utropet *ouf !* = puh!',
    noteEn: 'Verlan for **fou**. Most common in **de ouf**: *un concert de ouf* = an insane gig. Don’t confuse it with the interjection *ouf !* = phew!',
  }),
  vocab(D, 'fr-u30-kiffer', {
    prompt: 'Slang för att gilla något mycket', promptEn: 'Slang for really liking something',
    fr: 'kiffer', sv: 'digga / gilla skarpt', en: 'to love / to be into (slang)',
    ipa: '/ki.fe/',
    note: 'Kommer från arabiskans *kif* (välbehag), via Maghreb-franskan. Böjs som ett vanligt verb på -er: *Je kiffe trop cette chanson !*',
    noteEn: 'From Arabic *kif* (pleasure), via North African French. Conjugated like any -er verb: *Je kiffe trop cette chanson !*',
  }),
  vocab(D, 'fr-u30-pote', {
    prompt: 'Ledigt ord för kompis', promptEn: 'Casual word for mate',
    fr: 'un pote', sv: 'en kompis / polare', en: 'a mate / a buddy',
    ipa: '/œ̃ pɔt/',
    note: 'Ledigt men inte vulgärt. **un ami** är neutralt men kan också betyda pojkvän: *mon ami* eller *mon copain* kan tolkas romantiskt, *mon pote* aldrig.',
    noteEn: 'Casual but not vulgar. **un ami** is neutral but can also mean boyfriend: *mon ami* or *mon copain* can sound romantic, *mon pote* never does.',
  }),

  // ===================== PHRASES =====================
  phrase(D, 'fr-u30-saurais-gre', {
    prompt: 'Be mycket formellt om svar i ett brev', promptEn: 'Ask very formally for a reply in a letter',
    fr: 'Je vous saurais gré de bien vouloir me répondre.', sv: 'Jag vore tacksam om ni ville svara mig.', en: 'I would be grateful if you would kindly reply.',
    ipa: '/ʒə vu so.ʁɛ ɡʁe də bjɛ̃ vu.lwaʁ mə ʁe.pɔ̃dʁ/',
    note: 'Mycket hög stil (**registre soutenu**), för brev till myndigheter. **savoir gré** = vara tacksam, ett uttryck som bara lever kvar i konditionalis. Vanlig fälla: det heter *saurais*, inte *serais*.',
    noteEn: 'Very high register (**registre soutenu**), for letters to officials. **savoir gré** = to be grateful, surviving only in the conditional. Common mistake: it’s *saurais*, not *serais*.',
    gloss: [['je', 'jag', 'I'], ['vous', 'er', 'you'], ['saurais gré', 'vore tacksam', 'would be grateful'], ['de', 'om', 'if'], ['bien vouloir', 'ville vara så vänlig att', 'would kindly'], ['me', 'mig', 'me'], ['répondre', 'svara', 'reply']],
  }),
  phrase(D, 'fr-u30-puis-je', {
    prompt: 'Erbjud hjälp formellt, med omvänd ordföljd', promptEn: 'Offer help formally, with inversion',
    fr: 'Puis-je vous aider ?', sv: 'Kan jag hjälpa er?', en: 'May I help you?',
    ipa: '/pɥi.ʒə vu.z‿e.de/',
    note: 'Med omvänd ordföljd blir *je peux* till **puis-je**: *peux-je* finns inte. Formellt, typiskt för butiker och hotell. Ledigt: *Je peux t’aider ?*',
    noteEn: 'With inversion *je peux* becomes **puis-je**: *peux-je* does not exist. Formal, typical of shops and hotels. Casual: *Je peux t’aider ?*',
    gloss: [['puis-je', 'kan jag', 'may I'], ['vous', 'er', 'you'], ['aider', 'hjälpa', 'help']],
  }),
  phrase(D, 'fr-u30-tas-vu-lheure', {
    prompt: 'Säg ledigt att det är sent', promptEn: 'Say casually that it’s late',
    fr: 'T’as vu l’heure ?', sv: 'Har du sett vad klockan är?', en: 'Have you seen the time?',
    ipa: '/ta vy lœʁ/',
    note: 'Talspråk: **tu as** blir **t’as**, och frågan görs bara med intonation. Skriv aldrig *t’as* i en formell text: där heter det *As-tu vu l’heure ?*',
    noteEn: 'Spoken French: **tu as** shrinks to **t’as**, and the question is made by intonation alone. Never write *t’as* formally: there it’s *As-tu vu l’heure ?*',
    gloss: [['t’as', 'har du', 'have you'], ['vu', 'sett', 'seen'], ['l’heure', 'klockan', 'the time']],
  }),
  phrase(D, 'fr-u30-boite-de-com', {
    prompt: 'Berätta ledigt var han jobbar', promptEn: 'Say casually where he works',
    fr: 'Il bosse dans une boîte de com.', sv: 'Han jobbar på en kommunikationsbyrå.', en: 'He works at a PR firm.',
    ipa: '/il bɔs dɑ̃.z‿yn bwat də kɔm/',
    note: '**une boîte** (en låda) = ett företag i talspråk, och **la com** = *la communication*. Också **une boîte de nuit** = en nattklubb.',
    noteEn: '**une boîte** (a box) = a company in casual speech, and **la com** = *la communication*. Also **une boîte de nuit** = a nightclub.',
    gloss: [['il', 'han', 'he'], ['bosse', 'jobbar', 'works'], ['dans', 'på', 'at'], ['une boîte', 'ett företag', 'a firm'], ['de com', 'inom kommunikation', 'PR']],
  }),
  phrase(D, 'fr-u30-cest-chelou', {
    prompt: 'Säg ledigt att den här grejen är konstig', promptEn: 'Say casually that this thing is weird',
    fr: 'C’est chelou, ce truc.', sv: 'Den här grejen är skum.', en: 'This thing is weird.',
    ipa: '/sɛ ʃə.lu sə tʁyk/',
    note: 'Typisk talspråksstruktur: först *c’est* + omdöme, sedan det man talar om (**dislokation**). **un truc** = en grej, ett av de mest användbara orden i ledig franska.',
    noteEn: 'Typical spoken structure: *c’est* + judgement first, then the thing itself (**dislocation**). **un truc** = a thing, one of the handiest words in casual French.',
    gloss: [['c’est', 'det är', 'it’s'], ['chelou', 'skumt', 'weird'], ['ce', 'den här', 'this'], ['truc', 'grejen', 'thing']],
  }),
  phrase(D, 'fr-u30-ca-me-saoule', {
    prompt: 'Säg ledigt att något tröttar ut dig', promptEn: 'Say casually that something is doing your head in',
    fr: 'Ça me saoule.', sv: 'Det går mig på nerverna.', en: 'It’s doing my head in.',
    ipa: '/sa mə sul/',
    note: '**saouler / soûler** betyder egentligen att berusa; i ungdomsspråk betyder det att trötta ut eller irritera. Båda stavningarna är korrekta och uttalas [sul].',
    noteEn: '**saouler / soûler** literally means to get someone drunk; in young people’s speech it means to wear out or annoy. Both spellings are correct and are pronounced [sul].',
    gloss: [['ça', 'det', 'it'], ['me', 'mig', 'me'], ['saoule', 'går på nerverna', 'is doing in']],
  }),
  phrase(D, 'fr-u30-concert-de-ouf', {
    prompt: 'Säg att konserten var helt fantastisk', promptEn: 'Say the gig was absolutely amazing',
    fr: 'C’était un concert de ouf !', sv: 'Det var en helt sjuk konsert!', en: 'That gig was insane!',
    ipa: '/se.tɛ œ̃ kɔ̃.sɛʁ də uf/',
    note: '**de ouf** fungerar som ett förstärkande adjektiv efter substantivet. Lägg märke till att man säger **de ouf**, inte *d’ouf*: verlanordet behandlas som om det började med konsonant.',
    noteEn: '**de ouf** works as an intensifying adjective after the noun. Note it’s **de ouf**, not *d’ouf*: the verlan word is treated as if it began with a consonant.',
    gloss: [['c’était', 'det var', 'it was'], ['un concert', 'en konsert', 'a gig'], ['de ouf', 'helt sjuk', 'insane']],
  }),
  phrase(D, 'fr-u30-y-a-pas-de-souci', {
    prompt: 'Svara ledigt att det inte är några problem', promptEn: 'Reply casually that it’s no problem',
    fr: 'Y a pas de souci.', sv: 'Inga problem.', en: 'No worries.',
    ipa: '/ja pa d su.si/',
    note: 'Fullständigt: *Il n’y a pas de souci.* I talspråk försvinner både **il** och **ne**. Uttrycket är överallt i Frankrike, även om språkvårdare tycker att *pas de problème* eller *volontiers* är bättre.',
    noteEn: 'In full: *Il n’y a pas de souci.* In speech both **il** and **ne** disappear. You hear it everywhere in France, though language purists prefer *pas de problème* or *volontiers*.',
    gloss: [['y a', 'det finns', 'there is'], ['pas de', 'inget', 'no'], ['souci', 'problem', 'worry']],
  }),
];
