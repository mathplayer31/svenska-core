// FranceCore, Unité 1 : Salutations & la bise. Unité de référence pour le format (voir docs/PROGRAMME-FR.md).
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT1_DECK = unitDeck({
  n: 1, slug: 'fr-unit-1-greetings', sv: 'Hälsningar och kindpussar', en: 'Greetings and la bise',
  level: 'A1', section: 'fr-section-1-premiers-pas', after: null,
});
const D = UNIT1_DECK.slug;

export const UNIT1_CARDS = [
  // ===================== MOTS =====================
  vocab(D, 'fr-u1-bonjour', {
    prompt: 'Den vanliga hälsningen, hela dagen', promptEn: 'The everyday greeting, all day long',
    fr: 'bonjour', sv: 'hej / god dag', en: 'hello / good morning',
    ipa: '/bɔ̃.ʒuʁ/',
    note: 'Säg alltid **bonjour** när du kommer in i en butik eller hälsar på någon: att inte göra det uppfattas som oartigt. **on** är ett nasalljud: luften går genom näsan och n:et uttalas inte.',
    noteEn: 'Always say **bonjour** when you walk into a shop or greet someone: skipping it comes across as rude. **on** is a nasal vowel: air goes through the nose and the n is not pronounced.',
  }),
  vocab(D, 'fr-u1-salut', {
    prompt: 'Ledig hälsning mellan vänner, både hej och hej då', promptEn: 'Casual greeting between friends, both hi and bye',
    fr: 'salut', sv: 'hej / hej då (ledigt)', en: 'hi / bye (casual)',
    ipa: '/sa.ly/',
    note: 'Bara med vänner och familj. Slutets **t** är stumt, och **u** uttalas som svenskt **y**.',
    noteEn: 'Only with friends and family. The final **t** is silent, and **u** is said with rounded lips, like "ee" with your lips pushed forward.',
  }),
  vocab(D, 'fr-u1-bonsoir', {
    prompt: 'Hälsning på kvällen', promptEn: 'Greeting in the evening',
    fr: 'bonsoir', sv: 'god kväll', en: 'good evening',
    ipa: '/bɔ̃.swaʁ/',
    note: 'Används från sen eftermiddag. **oi** uttalas [wa], som i *moi* och *toi*.',
    noteEn: 'Used from late afternoon onwards. **oi** sounds like [wa], as in *moi* and *toi*.',
  }),
  vocab(D, 'fr-u1-au-revoir', {
    prompt: 'Artigt farväl', promptEn: 'Polite goodbye',
    fr: 'au revoir', sv: 'adjö / hej då', en: 'goodbye',
    ipa: '/o ʁə.vwaʁ/',
    note: '**au** uttalas [o]. Fungerar i alla situationer, även i butiker.',
    noteEn: '**au** is pronounced [o]. Works in every situation, shops included.',
  }),
  vocab(D, 'fr-u1-merci', {
    prompt: 'Att tacka', promptEn: 'Saying thanks',
    fr: 'merci', sv: 'tack', en: 'thank you',
    ipa: '/mɛʁ.si/',
    note: '**Merci beaucoup** = tack så mycket. Det franska **r** bildas längst bak i halsen, som ett skorrande r.',
    noteEn: '**Merci beaucoup** = thank you very much. The French **r** is made at the back of the throat.',
  }),
  vocab(D, 'fr-u1-sil-vous-plait', {
    prompt: 'Artigt ”snälla”, till någon du niar', promptEn: 'Polite "please", to someone you call vous',
    fr: 's’il vous plaît', sv: 'tack / snälla (artigt)', en: 'please (formal)',
    ipa: '/sil vu plɛ/',
    note: 'Till vänner säger man **s’il te plaît**. Svenskan har inget eget ord för ”please”: man säger ofta *tack* i stället.',
    noteEn: 'To friends you say **s’il te plaît**. Use *vous* with strangers, in shops and at work.',
  }),
  vocab(D, 'fr-u1-oui-non', {
    prompt: 'Ja och nej', promptEn: 'Yes and no',
    fr: 'oui / non', sv: 'ja / nej', en: 'yes / no',
    ipa: '/wi/ /nɔ̃/',
    note: 'På en nekande fråga svarar man **si** i stället för *oui*, precis som svenskans *jo*: *Tu ne viens pas ? Si !*',
    noteEn: 'To contradict a negative question you answer **si** instead of *oui*: *Tu ne viens pas ? Si !* (You’re not coming? Yes, I am!)',
  }),
  vocab(D, 'fr-u1-excusez-moi', {
    prompt: 'Att be om ursäkt eller påkalla uppmärksamhet', promptEn: 'Apologising or getting attention',
    fr: 'excusez-moi', sv: 'ursäkta', en: 'excuse me',
    ipa: '/ɛk.sky.ze mwa/',
    note: 'Formen med *vous*. Till en vän: **excuse-moi**. **Pardon** fungerar också, till exempel när man går förbi någon.',
    noteEn: 'The *vous* form. To a friend: **excuse-moi**. **Pardon** also works, for example when squeezing past someone.',
  }),
  vocab(D, 'fr-u1-enchante', {
    prompt: 'Det man säger när man träffar någon för första gången', promptEn: 'What you say when you meet someone for the first time',
    fr: 'enchanté', sv: 'trevligt att träffas', en: 'nice to meet you',
    ipa: '/ɑ̃.ʃɑ̃.te/',
    note: 'En kvinna skriver **enchantée**, men uttalet är detsamma. Två nasalljud: **en** och **an** låter likadant, [ɑ̃].',
    noteEn: 'A woman writes **enchantée**, but it sounds the same. Two nasal vowels: **en** and **an** sound identical, [ɑ̃].',
  }),
  vocab(D, 'fr-u1-ca-va', {
    prompt: 'Läget? Både fråga och svar', promptEn: 'How’s it going? Both question and answer',
    fr: 'ça va', sv: 'hur är läget? / det är bra', en: 'how are you? / I’m fine',
    ipa: '/sa va/',
    note: 'Med frågeintonation är det en fråga: *Ça va ?* Med fallande ton är det svaret: *Ça va.* **ç** uttalas alltid [s].',
    noteEn: 'With a rising tone it is a question: *Ça va ?* With a falling tone it is the answer: *Ça va.* **ç** is always [s].',
  }),
  vocab(D, 'fr-u1-a-bientot', {
    prompt: 'Vi ses snart', promptEn: 'See you soon',
    fr: 'à bientôt', sv: 'vi ses snart', en: 'see you soon',
    ipa: '/a bjɛ̃.to/',
    note: 'Andra vanliga avsked: **à demain** (vi ses i morgon), **à plus** (ledigt: vi hörs).',
    noteEn: 'Other common goodbyes: **à demain** (see you tomorrow), **à plus** (casual: see you).',
  }),
  vocab(D, 'fr-u1-la-bise', {
    prompt: 'Kindpussen när man hälsar', promptEn: 'The cheek kiss when you greet someone',
    fr: 'la bise', sv: 'kindpussen', en: 'the cheek kiss',
    ipa: '/la biz/',
    note: '**Faire la bise** = hälsa med kindpussar, oftast två, men antalet varierar mellan regioner. Mellan kollegor och obekanta tar man i hand: **serrer la main**.',
    noteEn: '**Faire la bise** = greet with cheek kisses, usually two, though the number varies by region. With colleagues and strangers you shake hands: **serrer la main**.',
  }),

  // ===================== PHRASES =====================
  phrase(D, 'fr-u1-je-mappelle', {
    prompt: 'Presentera dig: ”Jag heter Anna.”', promptEn: 'Introduce yourself: "My name is Anna."',
    fr: 'Je m’appelle Anna.', sv: 'Jag heter Anna.', en: 'My name is Anna.',
    ipa: '/ʒə ma.pɛl a.na/',
    note: 'Ordagrant ”jag kallar mig Anna”. **Je** blir **j’** framför vokal, och **me** blir **m’**.',
    noteEn: 'Literally "I call myself Anna". **Je** becomes **j’** before a vowel, and **me** becomes **m’**.',
    gloss: [['je', 'jag', 'I'], ['m’appelle', 'heter', 'am called'], ['Anna', 'Anna', 'Anna']],
  }),
  phrase(D, 'fr-u1-comment-tu-tappelles', {
    prompt: 'Fråga en jämnårig vad hen heter', promptEn: 'Ask someone your age their name',
    fr: 'Comment tu t’appelles ?', sv: 'Vad heter du?', en: 'What’s your name?',
    ipa: '/kɔ.mɑ̃ ty ta.pɛl/',
    note: 'Ledig form med *tu*. Artigt: **Comment vous appelez-vous ?** Observera mellanslaget före **?** i franska texter.',
    noteEn: 'Casual form with *tu*. Polite: **Comment vous appelez-vous ?** Note the space before **?** in French text.',
    gloss: [['comment', 'hur', 'how'], ['tu', 'du', 'you'], ['t’appelles', 'heter', 'are called']],
  }),
  phrase(D, 'fr-u1-comment-allez-vous', {
    prompt: 'Fråga artigt hur någon mår', promptEn: 'Politely ask how someone is',
    fr: 'Comment allez-vous ?', sv: 'Hur mår ni?', en: 'How are you?',
    ipa: '/kɔ.mɑ̃t a.le vu/',
    note: 'Bindning (**liaison**): t:et i *comment* uttalas framför vokal, [kɔmɑ̃t‿ale]. Till en vän: *Ça va ?*',
    noteEn: 'Linking (**liaison**): the t in *comment* is pronounced before a vowel, [kɔmɑ̃t‿ale]. To a friend: *Ça va ?*',
    gloss: [['comment', 'hur', 'how'], ['allez-vous', 'mår ni', 'are you']],
  }),
  phrase(D, 'fr-u1-ca-va-bien', {
    prompt: 'Svara att du mår bra och tacka', promptEn: 'Say you are well and thank them',
    fr: 'Ça va bien, merci.', sv: 'Det är bra, tack.', en: 'I’m fine, thanks.',
    ipa: '/sa va bjɛ̃ mɛʁ.si/',
    note: 'Fortsätt gärna med **Et toi ?** (och du?) eller artigt **Et vous ?**',
    noteEn: 'You can follow up with **Et toi ?** (and you?) or, politely, **Et vous ?**',
    gloss: [['ça', 'det', 'it'], ['va', 'går', 'goes'], ['bien', 'bra', 'well'], ['merci', 'tack', 'thanks']],
  }),
  phrase(D, 'fr-u1-je-suis-suedoise', {
    prompt: 'Säg att du är svensk (kvinna)', promptEn: 'Say you are Swedish (woman)',
    fr: 'Je suis suédoise.', sv: 'Jag är svensk.', en: 'I am Swedish.',
    ipa: '/ʒə sɥi sɥe.dwaz/',
    note: 'Nationalitet böjs efter kön: **suédois** (man), **suédoise** (kvinna). Ingen stor begynnelsebokstav och ingen artikel.',
    noteEn: 'Nationality agrees with gender: **suédois** (man), **suédoise** (woman). No capital letter and no article.',
    gloss: [['je', 'jag', 'I'], ['suis', 'är', 'am'], ['suédoise', 'svensk', 'Swedish']],
  }),
  phrase(D, 'fr-u1-jhabite-a-stockholm', {
    prompt: 'Säg var du bor: ”Jag bor i Stockholm.”', promptEn: 'Say where you live: "I live in Stockholm."',
    fr: 'J’habite à Stockholm.', sv: 'Jag bor i Stockholm.', en: 'I live in Stockholm.',
    ipa: '/ʒa.bit a stɔk.ɔlm/',
    note: 'Städer tar **à**: *à Paris, à Lyon*. **h** är alltid stumt i franskan, därför *j’habite*.',
    noteEn: 'Cities take **à**: *à Paris, à Lyon*. **h** is always silent in French, hence *j’habite*.',
    gloss: [['j’habite', 'jag bor', 'I live'], ['à', 'i', 'in'], ['Stockholm', 'Stockholm', 'Stockholm']],
  }),
  phrase(D, 'fr-u1-tu-parles-anglais', {
    prompt: 'Fråga en vän om hen talar engelska', promptEn: 'Ask a friend if they speak English',
    fr: 'Tu parles anglais ?', sv: 'Talar du engelska?', en: 'Do you speak English?',
    ipa: '/ty paʁl ɑ̃.ɡlɛ/',
    note: 'I talad franska räcker det med stigande ton för att göra en fråga. Slutets **-es** i *parles* är stumt.',
    noteEn: 'In spoken French a rising tone is enough to make a question. The final **-es** of *parles* is silent.',
    gloss: [['tu', 'du', 'you'], ['parles', 'talar', 'speak'], ['anglais', 'engelska', 'English']],
  }),
  phrase(D, 'fr-u1-je-ne-comprends-pas', {
    prompt: 'Säg att du inte förstår', promptEn: 'Say you don’t understand',
    fr: 'Je ne comprends pas.', sv: 'Jag förstår inte.', en: 'I don’t understand.',
    ipa: '/ʒə nə kɔ̃.pʁɑ̃ pa/',
    note: 'Nekningen har två delar runt verbet: **ne** ... **pas**. I talspråk faller *ne* ofta bort: *Je comprends pas.*',
    noteEn: 'Negation wraps the verb in two parts: **ne** ... **pas**. In speech *ne* is often dropped: *Je comprends pas.*',
    gloss: [['je', 'jag', 'I'], ['ne', '(inte)', '(not)'], ['comprends', 'förstår', 'understand'], ['pas', 'inte', 'not']],
  }),
];
