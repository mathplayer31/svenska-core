// Unit 24: Working life (B2, Section 7). Grammar: -s passive (hålls, fattades, skrivas under).
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT24_DECK = unitDeck({
  n: 24, slug: 'swedish-unit-24-professional', fr: 'Vie professionnelle', en: 'Professional life',
  level: 'B2', section: 'section-7-travailler', after: 'swedish-unit-23-stories',
});
const D = UNIT24_DECK.slug;

export const UNIT24_CARDS = [
  vocab(D, 'u24-ansvar', {
    prompt: 'Ce dont tu es chargé : « la responsabilité »', promptEn: 'What you are in charge of: "responsibility"',
    sv: 'ett ansvar', fr: 'une responsabilité', en: 'a responsibility', ipa: '/ɛtː ˈanːˌsvɑːr/',
    note: 'Mot **ett**, souvent sans article : *ha ansvar för* = être responsable de. Adjectif : *ansvarig*.',
    gloss: [['ett', 'une', 'a'], ['ansvar', 'responsabilité', 'responsibility']],
  }),
  vocab(D, 'u24-forhandlar', {
    prompt: 'Discuter pour trouver un accord : « négocie » (présent)', promptEn: 'Discussing to reach a deal: "negotiate" (present)',
    sv: 'förhandlar', fr: 'négocie / négocions', en: 'negotiate / negotiates', ipa: '/fœrˈhandlar/',
    note: '*för* + *handla* (commercer). *förhandla om* = négocier quelque chose. Le nom : *en förhandling*.',
  }),
  vocab(D, 'u24-uppdrag', {
    prompt: 'Une tâche confiée, une mission de consultant : « une mission »', promptEn: 'An assigned task, a consulting job: "an assignment"',
    sv: 'ett uppdrag', fr: 'une mission', en: 'an assignment / a mission', ipa: '/ɛtː ˈɵpːˌdrɑːɡ/',
    accent: 'Accent 2 (Grave)',
    note: 'Mot **ett**. Un donneur d’ordre : *en uppdragsgivare*.',
    gloss: [['ett', 'une', 'an'], ['uppdrag', 'mission', 'assignment']],
  }),
  vocab(D, 'u24-kund', {
    prompt: 'Celui qui achète tes services : « un client »', promptEn: 'The one who buys your services: "a customer / a client"',
    sv: 'en kund', fr: 'un client', en: 'a customer / a client', ipa: '/ɛn kɵnːd/',
    note: 'Pluriel : *kunder*. Le service client : *kundtjänst*.',
    gloss: [['en', 'un', 'a'], ['kund', 'client', 'customer']],
  }),
  vocab(D, 'u24-avtal', {
    prompt: 'Un engagement écrit entre deux parties : « un accord / un contrat »', promptEn: 'A written commitment between two parties: "an agreement"',
    sv: 'ett avtal', fr: 'un accord / un contrat', en: 'an agreement / a contract', ipa: '/ɛtː ˈɑːvˌtɑːl/',
    accent: 'Accent 2 (Grave)',
    note: 'Mot **ett**. La convention collective, pilier du modèle suédois : *kollektivavtal*.',
    gloss: [['ett', 'un', 'an'], ['avtal', 'accord', 'agreement']],
  }),
  vocab(D, 'u24-beslut', {
    prompt: 'Ce qu’on tranche : « une décision »', promptEn: 'What gets settled: "a decision"',
    sv: 'ett beslut', fr: 'une décision', en: 'a decision', ipa: '/ɛtː bɛˈslʉːt/',
    note: 'Mot **ett**. « Prendre une décision » = **fatta** ett beslut (pas *ta*). Les décisions en Suède se prennent souvent par consensus.',
    gloss: [['ett', 'une', 'a'], ['beslut', 'décision', 'decision']],
  }),
  vocab(D, 'u24-ledningen', {
    prompt: 'Ceux qui dirigent l’entreprise : « la direction »', promptEn: 'Those who run the company: "the management"',
    sv: 'ledningen', fr: 'la direction', en: 'the management', ipa: '/ˈleːdnɪŋɛn/',
    note: 'Défini de *en ledning*, de *leda* (diriger). Un dirigeant : *en ledare*.',
  }),
  vocab(D, 'u24-skoter', {
    prompt: 'Prendre en charge une tâche : « s’occupe de »', promptEn: 'Taking care of a task: "handle / take care of"',
    sv: 'sköter', fr: 's’occupe de / gère', en: 'handle / take care of', ipa: '/ˈɧøːtɛr/',
    note: 'Le **sk** devant **ö** se dit [ɧ]. *sköta om* = soigner, prendre soin de. *Sköt om dig!* = Prends soin de toi !',
  }),
  vocab(D, 'u24-halls', {
    prompt: 'Passif de « hålla » pour un événement : « a lieu / se tient »', promptEn: 'Passive of "hålla" for an event: "is held / takes place"',
    sv: 'hålls', fr: 'a lieu / se tient', en: 'is held / takes place', ipa: '/hɔlːs/',
    note: 'Passif en **-s** : on ajoute *s* au verbe conjugué (*håller → hålls*). Très fréquent à l’écrit et dans les annonces.',
  }),
  vocab(D, 'u24-skickas', {
    prompt: 'Passif de « skicka » : « est envoyé(e) »', promptEn: 'Passive of "skicka": "is sent"',
    sv: 'skickas', fr: 'est envoyé(e)', en: 'is sent', ipa: '/ˈɧɪkːas/',
    note: 'Groupe 1 : présent passif = infinitif + **s** (*skickas*). Prétérit : *skickades*. Supin : *har skickats*.',
  }),

  // Additions (issue #14)
  vocab(D, 'u24-faktura', {
    prompt: 'Le document à payer : « une facture »', promptEn: 'The document to pay: "an invoice"',
    sv: 'en faktura', fr: 'une facture', en: 'an invoice', ipa: '/ɛn fakˈtʉːra/',
    note: 'Pluriel : *fakturor*. Paiement à 30 jours : *30 dagars betalningsvillkor*.',
  }),
  vocab(D, 'u24-offert', {
    prompt: 'Le prix proposé avant un contrat : « un devis »', promptEn: 'The price offered before a contract: "a quote"',
    sv: 'en offert', fr: 'un devis / une offre', en: 'a quote / a tender', ipa: '/ɛn ɔˈfæʈː/',
    note: '*Begära in en offert* = demander un devis. Le **rt** se prononce [ʈ].',
  }),
  vocab(D, 'u24-fattar-ett-beslut', {
    prompt: 'Prendre une décision, en suédois soutenu', promptEn: 'Making a decision, in formal Swedish',
    sv: 'fattar ett beslut', fr: 'prend une décision', en: 'makes a decision', ipa: '/ˈfatːar ɛtː bɛˈslʉːt/',
    note: 'On ne « prend » pas une décision en suédois, on la *fattar* (saisit). Passif : *beslutet fattades*.',
    gloss: [['fattar', 'prend (saisit)', 'makes (grasps)'], ['ett', 'une', 'a'], ['beslut', 'décision', 'decision']],
  }),
  vocab(D, 'u24-styrelse', {
    prompt: 'Ceux qui dirigent l’entreprise au-dessus de la direction : « le conseil d’administration »', promptEn: 'Those above management: "the board"',
    sv: 'en styrelse', fr: 'un conseil d’administration', en: 'a board (of directors)', ipa: '/ɛn ˈstyːrɛlsɛ/',
    note: 'De *styra* (diriger). Le président du conseil : *styrelseordförande*.',
  }),
  vocab(D, 'u24-avdelning', {
    prompt: 'Une partie de l’entreprise : « un service »', promptEn: 'A part of the company: "a department"',
    sv: 'en avdelning', fr: 'un service / un département', en: 'a department', ipa: '/ɛn ˈɑːvˌdeːlnɪŋ/',
    note: '*Ekonomiavdelningen* = le service comptable. Aussi un service à l’hôpital.',
  }),
  vocab(D, 'u24-forslag', {
    prompt: 'Ce qu’on soumet en réunion : « une proposition »', promptEn: 'What you put forward in a meeting: "a proposal"',
    sv: 'ett förslag', fr: 'une proposition', en: 'a proposal / a suggestion', ipa: '/ɛtː ˈfœːˌʂlɑːɡ/',
    note: '*Lägga fram ett förslag* = présenter une proposition. Verbe : *föreslå*.',
  }),
  phrase(D, 'u24-motet-halls', {
    prompt: 'Passif : « La réunion a lieu vendredi. »', promptEn: 'Passive: "The meeting is held on Friday."',
    sv: 'Mötet hålls på fredag.', fr: 'La réunion a lieu vendredi.', en: 'The meeting is held on Friday.',
    ipa: '/ˈmøːtɛt hɔlːs poː ˈfreːda/',
    note: '**på fredag** = vendredi prochain ; *på fredagar* = le vendredi (habitude). Les jours s’écrivent en minuscule.',
    gloss: [['mötet', 'la réunion', 'the meeting'], ['hålls', 'a lieu', 'is held'], ['på', '(le)', 'on'], ['fredag', 'vendredi', 'Friday']],
  }),
  phrase(D, 'u24-beslutet-fattades', {
    prompt: 'Passif au passé : « La décision a été prise par la direction. »', promptEn: 'Past passive: "The decision was made by the management."',
    sv: 'Beslutet fattades av ledningen.', fr: 'La décision a été prise par la direction.', en: 'The decision was made by the management.',
    ipa: '/bɛˈslʉːtɛt ˈfatːadɛs ɑːv ˈleːdnɪŋɛn/',
    note: 'Prétérit passif : *fattade* + **s** = *fattades*. L’agent est introduit par **av** (par).',
    gloss: [['beslutet', 'la décision', 'the decision'], ['fattades', 'a été prise', 'was made'], ['av', 'par', 'by'], ['ledningen', 'la direction', 'the management']],
  }),
  phrase(D, 'u24-skrivas-under', {
    prompt: 'Passif après un modal : « Le contrat doit être signé aujourd’hui. »', promptEn: 'Passive after a modal: "The contract must be signed today."',
    sv: 'Avtalet måste skrivas under idag.', fr: 'Le contrat doit être signé aujourd’hui.', en: 'The contract must be signed today.',
    ipa: '/ˈɑːvˌtɑːlɛt ˈmɔsːtɛ ˈskriːvas ˈɵnːdɛr ɪˈdɑː/',
    note: 'Modal + **infinitif passif** (*skrivas*). *skriva under* = signer (verbe à particule, *under* accentué).',
    gloss: [['avtalet', 'le contrat', 'the contract'], ['måste', 'doit', 'must'], ['skrivas', 'être écrit', 'be written'], ['under', '(signé)', '(signed)'], ['idag', 'aujourd’hui', 'today']],
  }),
  phrase(D, 'u24-ansvar-for-kunder', {
    prompt: '« Je suis responsable de trois clients. »', promptEn: '"I am responsible for three clients."',
    sv: 'Jag har ansvar för tre kunder.', fr: 'Je suis responsable de trois clients.', en: 'I am responsible for three clients.',
    ipa: '/jɑː hɑːr ˈanːˌsvɑːr fœr treː ˈkɵnːdɛr/',
    note: 'Litt. « j’ai la responsabilité pour ». Variante : *jag är ansvarig för*.',
    gloss: [['jag', 'je', 'I'], ['har', 'ai', 'have'], ['ansvar', 'responsabilité', 'responsibility'], ['för', 'pour', 'for'], ['tre', 'trois', 'three'], ['kunder', 'clients', 'clients']],
  }),
  phrase(D, 'u24-fakturan-skickas', {
    prompt: 'Passif d’habitude : « La facture est envoyée chaque mois. »', promptEn: 'Habitual passive: "The invoice is sent every month."',
    sv: 'Fakturan skickas varje månad.', fr: 'La facture est envoyée chaque mois.', en: 'The invoice is sent every month.',
    ipa: '/fakˈtʉːran ˈɧɪkːas ˈvarjɛ ˈmoːnad/',
    note: '**varje** = chaque, invariable : *varje dag, varje månad*. *en faktura* = une facture.',
    gloss: [['fakturan', 'la facture', 'the invoice'], ['skickas', 'est envoyée', 'is sent'], ['varje', 'chaque', 'every'], ['månad', 'mois', 'month']],
  }),
  phrase(D, 'u24-forhandlar-om-avtal', {
    prompt: '« Nous négocions un nouveau contrat. »', promptEn: '"We are negotiating a new agreement."',
    sv: 'Vi förhandlar om ett nytt avtal.', fr: 'Nous négocions un nouveau contrat.', en: 'We are negotiating a new agreement.',
    ipa: '/viː fœrˈhandlar ɔm ɛtː nʏtː ˈɑːvˌtɑːl/',
    note: '*förhandla **om*** + objet. *nytt* : accord neutre avec *ett avtal*.',
    gloss: [['vi', 'nous', 'we'], ['förhandlar', 'négocions', 'are negotiating'], ['om', '(sur)', '(about)'], ['ett', 'un', 'a'], ['nytt', 'nouveau', 'new'], ['avtal', 'contrat', 'agreement']],
  }),
  phrase(D, 'u24-uppdraget-klart', {
    prompt: '« La mission doit être terminée en mai. »', promptEn: '"The assignment must be finished in May."',
    sv: 'Uppdraget ska vara klart i maj.', fr: 'La mission doit être terminée en mai.', en: 'The assignment must be finished in May.',
    ipa: '/ˈɵpːˌdrɑːɡɛt skɑː ˈvɑːra klɑːʈ ɪ maj/',
    note: '*klar* = prêt, terminé ; **klart** car *uppdraget* est neutre. *ska* exprime ici une exigence.',
    gloss: [['uppdraget', 'la mission', 'the assignment'], ['ska', 'doit', 'must'], ['vara', 'être', 'be'], ['klart', 'terminée', 'finished'], ['i', 'en', 'in'], ['maj', 'mai', 'May']],
  }),
  phrase(D, 'u24-skoter-kontakten', {
    prompt: '« Elle s’occupe du contact avec les clients. »', promptEn: '"She handles contact with the customers."',
    sv: 'Hon sköter kontakten med kunderna.', fr: 'Elle s’occupe du contact avec les clients.', en: 'She handles contact with the customers.',
    ipa: '/hʊnː ˈɧøːtɛr kɔnˈtaktɛn meː ˈkɵnːdɛɳa/',
    note: '*sköta* + objet direct, sans préposition. Pluriel défini : *kunderna*.',
    gloss: [['hon', 'elle', 'she'], ['sköter', 's’occupe de', 'handles'], ['kontakten', 'le contact', 'the contact'], ['med', 'avec', 'with'], ['kunderna', 'les clients', 'the customers']],
  }),
];
