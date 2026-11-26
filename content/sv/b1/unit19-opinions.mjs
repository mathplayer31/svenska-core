// Unit 19: Opinions & debates (B1, Section 5). Grammar: tycka / tro / tänka, sentence adverbs.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT19_DECK = unitDeck({
  n: 19, slug: 'swedish-unit-19-opinions', fr: 'Avis & débats', en: 'Opinions & debates',
  level: 'B1', section: 'section-5-sinstaller', after: 'swedish-unit-18-job-hunting',
});
const D = UNIT19_DECK.slug;

export const UNIT19_CARDS = [
  vocab(D, 'u19-tycker', {
    prompt: 'Donner un avis personnel : « trouve / pense » (opinion)', promptEn: 'Giving a personal opinion: "think / find" (opinion)',
    sv: 'tycker', fr: 'trouve / pense (avis)', en: 'think / find (opinion)', ipa: '/ˈtʏkːɛr/',
    note: '**tycka** = avoir un avis, un goût : *jag tycker att filmen är bra*. Ne sert pas pour une croyance.',
  }),
  vocab(D, 'u19-tror', {
    prompt: 'Supposer sans être sûr : « crois »', promptEn: 'Assuming without being sure: "believe / think"',
    sv: 'tror', fr: 'crois / suppose', en: 'believe / think', ipa: '/truːr/',
    note: '**tro** = croire (une information incertaine) : *jag tror att hon kommer*. Aussi : croire en Dieu (*tro på Gud*).',
  }),
  vocab(D, 'u19-tanker', {
    prompt: 'Réfléchir, ou avoir l’intention : « pense / compte (faire) »', promptEn: 'Thinking, or intending: "think / intend to"',
    sv: 'tänker', fr: 'réfléchis / compte faire', en: 'think / intend to', ipa: '/ˈtɛŋkɛr/',
    note: '**tänka** = réfléchir (*jag tänker på dig* = je pense à toi), ou + infinitif = avoir l’intention (*jag tänker flytta*).',
  }),
  vocab(D, 'u19-haller-med', {
    prompt: 'Partager un avis : « être d’accord »', promptEn: 'Sharing an opinion: "agree"',
    sv: 'håller med', fr: 'suis d’accord', en: 'agree', ipa: '/ˈhɔlːɛr meː/',
    note: 'Verbe à particule **hålla med** (litt. « tenir avec »). La particule est accentuée. Être d’accord avec quelqu’un : *hålla med någon*.',
    gloss: [['håller', 'tiens', 'hold'], ['med', 'avec', 'with']],
  }),
  vocab(D, 'u19-asikt', {
    prompt: 'Ce que tu penses d’un sujet : « une opinion / un avis »', promptEn: 'What you think about a topic: "an opinion"',
    sv: 'en åsikt', fr: 'une opinion / un avis', en: 'an opinion', ipa: '/ɛn ˈoːˌsɪkt/',
    note: 'Pluriel : *åsikter*. *Enligt min åsikt…* = selon moi…',
    gloss: [['en', 'une', 'an'], ['åsikt', 'opinion', 'opinion']],
  }),
  vocab(D, 'u19-faktiskt', {
    prompt: 'Pour nuancer ou corriger : « en fait / effectivement »', promptEn: 'To nuance or correct: "actually / in fact"',
    sv: 'faktiskt', fr: 'en fait / effectivement', en: 'actually / in fact', ipa: '/ˈfaktɪskt/',
    note: 'Adverbe de phrase très fréquent à l’oral. Se place après le verbe conjugué : *det är faktiskt bra*.',
  }),
  vocab(D, 'u19-egentligen', {
    prompt: 'Ce qui est vrai au fond : « en réalité / au fond »', promptEn: 'What is really true: "actually / really"',
    sv: 'egentligen', fr: 'en réalité / au fond', en: 'actually / really', ipa: '/ɛˈjɛntlɪɡɛn/',
    note: 'Le **g** devant **e** se prononce [j] : « é-yent-li-guen ». *Vad vill du egentligen?* = Que veux-tu vraiment ?',
  }),
  vocab(D, 'u19-sakert', {
    prompt: 'Une forte probabilité : « sûrement / certainement »', promptEn: 'A strong likelihood: "surely / probably"',
    sv: 'säkert', fr: 'sûrement / certainement', en: 'surely / probably', ipa: '/ˈsɛːkɛʈ/',
    note: 'Comme adverbe : *han kommer säkert* (il va sûrement venir). Comme adjectif neutre : *det är säkert* (c’est sûr).',
  }),
  vocab(D, 'u19-arligt-talat', {
    prompt: 'Pour être franc : « honnêtement »', promptEn: 'To be frank: "honestly speaking"',
    sv: 'ärligt talat', fr: 'honnêtement / à vrai dire', en: 'honestly / to be honest', ipa: '/ˈæːlɪt ˈtɑːlat/',
    note: 'Litt. « honnêtement parlé ». Le **rl** se fond en un **l** rétroflexe.',
    gloss: [['ärligt', 'honnêtement', 'honestly'], ['talat', 'parlé', 'speaking']],
  }),
  vocab(D, 'u19-ide', {
    prompt: 'Une proposition qui vient à l’esprit : « une idée »', promptEn: 'A suggestion that comes to mind: "an idea"',
    sv: 'en idé', fr: 'une idée', en: 'an idea', ipa: '/ɛn ɪˈdeː/',
    note: 'Accent sur la dernière syllabe, comme en français. *Bra idé!* = Bonne idée !',
    gloss: [['en', 'une', 'an'], ['idé', 'idée', 'idea']],
  }),

  // Additions (issue #14)
  vocab(D, 'u19-for-min-del', {
    prompt: 'Pour donner ton avis personnel : « en ce qui me concerne »', promptEn: 'Giving your own view: "as for me"',
    sv: 'för min del', fr: 'en ce qui me concerne', en: 'as for me / personally', ipa: '/fœr mɪn deːl/',
    note: 'Se place en tête : *För min del är det okej.* Attention au V2 : le verbe suit.',
    gloss: [['för', 'pour', 'for'], ['min', 'ma', 'my'], ['del', 'part', 'part']],
  }),
  vocab(D, 'u19-sjalvklart', {
    prompt: 'C’est évident : « bien sûr »', promptEn: 'It goes without saying: "of course"',
    sv: 'självklart', fr: 'bien sûr', en: 'of course', ipa: '/ˈɧɛlvˌklɑːʈ/',
    note: '*själv* (soi-même) + *klart* (clair). Plus neutre : *så klart* ou *klart*.',
  }),
  vocab(D, 'u19-precis', {
    prompt: 'Pour approuver fortement : « exactement »', promptEn: 'Strongly agreeing: "exactly"',
    sv: 'precis', fr: 'exactement', en: 'exactly', ipa: '/prɛˈsiːs/',
    note: 'Seul, c’est une réponse : *Precis!* Le **c** se prononce [s].',
  }),
  vocab(D, 'u19-absolut', {
    prompt: 'Accord sans réserve : « absolument »', promptEn: 'Full agreement: "absolutely"',
    sv: 'absolut', fr: 'absolument', en: 'absolutely', ipa: '/apsɔˈlʉːt/',
    note: 'Le **b** devant **s** se prononce [p]. Négatif : *absolut inte* (absolument pas).',
  }),
  vocab(D, 'u19-fordel', {
    prompt: 'Le bon côté d’une solution : « un avantage »', promptEn: 'The good side of a solution: "an advantage"',
    sv: 'en fördel', fr: 'un avantage', en: 'an advantage', ipa: '/ɛn ˈfœːˌɖeːl/',
    note: 'Souvent avec son contraire : *fördelar och nackdelar* (avantages et inconvénients).',
  }),
  vocab(D, 'u19-nackdel', {
    prompt: 'Le mauvais côté : « un inconvénient »', promptEn: 'The bad side: "a disadvantage"',
    sv: 'en nackdel', fr: 'un inconvénient', en: 'a disadvantage', ipa: '/ɛn ˈnakːˌdeːl/',
    note: '*Nackdelen är att det är dyrt.* La forme définie introduit une explication avec *att*.',
  }),
  phrase(D, 'u19-vad-tycker-du', {
    prompt: 'Demander un avis : « Qu’est-ce que tu penses du film ? »', promptEn: 'Asking for an opinion: "What do you think of the film?"',
    sv: 'Vad tycker du om filmen?', fr: 'Qu’est-ce que tu penses du film ?', en: 'What do you think of the film?',
    ipa: '/vɑː ˈtʏkːɛr dʉː ɔm ˈfɪlmɛn/',
    note: '**tycka om** + nom = penser de (avis demandé). Attention : *tycka **om*** accentué sur *om* veut dire « aimer » (Unité 20).',
    gloss: [['vad', 'que', 'what'], ['tycker', 'penses', 'think'], ['du', 'tu', 'you'], ['om', 'de', 'of'], ['filmen', 'le film', 'the film']],
  }),
  phrase(D, 'u19-tycker-att', {
    prompt: '« Je trouve qu’il était trop long. »', promptEn: '"I think it was too long."',
    sv: 'Jag tycker att den var för lång.', fr: 'Je trouve qu’il était trop long.', en: 'I think it was too long.',
    ipa: '/jɑː ˈtʏkːɛr at dɛnː vɑːr fœr lɔŋː/',
    note: '**tycker att** = opinion. *den* remplace *filmen* (mot **en**). *för lång* = trop long (Unité 13).',
    gloss: [['jag', 'je', 'I'], ['tycker', 'trouve', 'think'], ['att', 'que', 'that'], ['den', 'il', 'it'], ['var', 'était', 'was'], ['för', 'trop', 'too'], ['lång', 'long', 'long']],
  }),
  phrase(D, 'u19-tror-att-regna', {
    prompt: 'Une supposition : « Je crois qu’il va pleuvoir. »', promptEn: 'An assumption: "I think it is going to rain."',
    sv: 'Jag tror att det kommer att regna.', fr: 'Je crois qu’il va pleuvoir.', en: 'I think it is going to rain.',
    ipa: '/jɑː truːr at deː ˈkɔmːɛr ɔ ˈrɛŋna/',
    note: '**tror** : on n’en est pas sûr. Ce n’est pas un avis, donc *tycker* serait faux ici.',
    gloss: [['jag', 'je', 'I'], ['tror', 'crois', 'think'], ['att', 'que', 'that'], ['det', 'il', 'it'], ['kommer', 'va', 'is going'], ['att', 'à', 'to'], ['regna', 'pleuvoir', 'rain']],
  }),
  phrase(D, 'u19-tanker-flytta', {
    prompt: 'Une intention : « J’envisage de déménager à Malmö. »', promptEn: 'An intention: "I am planning to move to Malmö."',
    sv: 'Jag tänker flytta till Malmö.', fr: 'J’envisage de déménager à Malmö.', en: 'I am planning to move to Malmö.',
    ipa: '/jɑː ˈtɛŋkɛr ˈflʏtːa tɪlː ˈmalːmøː/',
    note: '**tänka** + infinitif sans *att* = avoir l’intention de. Le trio : *tycka* (avis), *tro* (croyance), *tänka* (réflexion, intention).',
    gloss: [['jag', 'je', 'I'], ['tänker', 'envisage de', 'am planning to'], ['flytta', 'déménager', 'move'], ['till', 'à', 'to'], ['Malmö', 'Malmö', 'Malmö']],
  }),
  phrase(D, 'u19-haller-med-dig', {
    prompt: '« Je suis d’accord avec toi. »', promptEn: '"I agree with you."',
    sv: 'Jag håller med dig.', fr: 'Je suis d’accord avec toi.', en: 'I agree with you.',
    ipa: '/jɑː ˈhɔlːɛr meː dɛj/',
    note: '*dig* (toi, complément) se prononce [dɛj], comme *mig* [mɛj].',
    gloss: [['jag', 'je', 'I'], ['håller', 'tiens', 'agree'], ['med', 'avec', 'with'], ['dig', 'toi', 'you']],
  }),
  phrase(D, 'u19-faktiskt-bra-ide', {
    prompt: '« C’est en fait une bonne idée. »', promptEn: '"It is actually a good idea."',
    sv: 'Det är faktiskt en bra idé.', fr: 'C’est en fait une bonne idée.', en: 'It is actually a good idea.',
    ipa: '/deː æːr ˈfaktɪskt ɛn brɑː ɪˈdeː/',
    note: 'Place de l’adverbe de phrase : juste **après le verbe conjugué** (comme *inte*).',
    gloss: [['det', 'c’', 'it'], ['är', 'est', 'is'], ['faktiskt', 'en fait', 'actually'], ['en', 'une', 'a'], ['bra', 'bonne', 'good'], ['idé', 'idée', 'idea']],
  }),
  phrase(D, 'u19-haller-inte-med', {
    prompt: '« Honnêtement, je ne suis pas d’accord. »', promptEn: '"I don\'t agree, to be honest."',
    sv: 'Jag håller inte med, ärligt talat.', fr: 'Honnêtement, je ne suis pas d’accord.', en: 'I don\'t agree, to be honest.',
    ipa: '/jɑː ˈhɔlːɛr ˈɪnːtɛ meː ˈæːlɪt ˈtɑːlat/',
    note: 'Avec un verbe à particule, *inte* se glisse **entre** le verbe et la particule : *håller **inte** med*.',
    gloss: [['jag', 'je', 'I'], ['håller', 'tiens', 'agree'], ['inte', 'ne… pas', 'not'], ['med', 'avec', 'with'], ['ärligt', 'honnêtement', 'honestly'], ['talat', 'parlé', 'speaking']],
  }),
  phrase(D, 'u19-egentligen-gora', {
    prompt: '« Qu’est-ce que tu veux vraiment faire ? »', promptEn: '"What do you really want to do?"',
    sv: 'Vad vill du egentligen göra?', fr: 'Qu’est-ce que tu veux vraiment faire ?', en: 'What do you really want to do?',
    ipa: '/vɑː vɪlː dʉː ɛˈjɛntlɪɡɛn ˈjøːra/',
    note: 'Dans une question avec inversion, l’adverbe vient après le sujet : *vill du **egentligen** göra*.',
    gloss: [['vad', 'que', 'what'], ['vill', 'veux', 'want'], ['du', 'tu', 'you'], ['egentligen', 'vraiment', 'really'], ['göra', 'faire', 'to do']],
  }),
];
