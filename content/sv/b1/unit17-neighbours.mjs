// Unit 17: Housing & neighbours (B1, Section 5). Grammar: relative clauses with "som".
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT17_DECK = unitDeck({
  n: 17, slug: 'swedish-unit-17-neighbours', fr: 'Logement & voisinage', en: 'Housing & neighbours',
  level: 'B1', section: 'section-5-sinstaller', after: 'swedish-unit-16-paperwork',
});
const D = UNIT17_DECK.slug;

export const UNIT17_CARDS = [
  vocab(D, 'u17-hyresvard', {
    prompt: 'La personne ou la société qui te loue ton logement : « un propriétaire (bailleur) »', promptEn: 'The person or company you rent from: "a landlord"',
    sv: 'en hyresvärd', fr: 'un propriétaire (bailleur)', en: 'a landlord', ipa: '/ɛn ˈhyːrɛsˌvæːɖ/',
    accent: 'Accent 2 (Grave)',
    note: '*hyra* (loyer) + *värd* (hôte). Souvent une société municipale (*kommunalt bostadsbolag*).',
    gloss: [['en', 'un', 'a'], ['hyresvärd', 'propriétaire', 'landlord']],
  }),
  vocab(D, 'u17-granne', {
    prompt: 'Celui qui habite à côté : « un(e) voisin(e) »', promptEn: 'The person living next door: "a neighbour"',
    sv: 'en granne', fr: 'un(e) voisin(e)', en: 'a neighbour', ipa: '/ɛn ˈɡranːɛ/',
    accent: 'Accent 2 (Grave)',
    note: 'Pluriel : *grannar*. Les Suédois sont discrets entre voisins : un *hej* dans l’escalier suffit.',
    gloss: [['en', 'un', 'a'], ['granne', 'voisin', 'neighbour']],
  }),
  vocab(D, 'u17-tvattstuga', {
    prompt: 'La salle de lavage commune de l’immeuble : « la buanderie »', promptEn: 'The shared laundry room of the building: "the laundry room"',
    sv: 'en tvättstuga', fr: 'une buanderie (commune)', en: 'a (shared) laundry room', ipa: '/ɛn ˈtvɛtːˌstʉːɡa/',
    accent: 'Accent 2 (Grave)',
    note: 'Institution suédoise : on **réserve** un créneau (*boka en tid*) et on nettoie après soi. Source classique de conflits entre voisins.',
    gloss: [['en', 'une', 'a'], ['tvättstuga', 'buanderie', 'laundry room']],
  }),
  vocab(D, 'u17-bostadsratt', {
    prompt: 'Un appartement qu’on achète en coopérative : « une copropriété »', promptEn: 'An apartment you buy in a cooperative: "a tenant-owned apartment"',
    sv: 'en bostadsrätt', fr: 'un appartement en copropriété (coopérative)', en: 'a tenant-owned apartment', ipa: '/ɛn ˈbuːstadsˌrɛtː/',
    accent: 'Accent 2 (Grave)',
    note: 'On achète le **droit** d’habiter (*rätt*) dans une association (*bostadsrättsförening*). Contraire : *hyresrätt* (location).',
    gloss: [['en', 'une', 'a'], ['bostadsrätt', 'copropriété', 'tenant-owned apartment']],
  }),
  vocab(D, 'u17-kontrakt', {
    prompt: 'Le document signé avec le bailleur : « un contrat / un bail »', promptEn: 'The signed document with the landlord: "a contract / a lease"',
    sv: 'ett kontrakt', fr: 'un contrat / un bail', en: 'a contract / a lease', ipa: '/ɛtː kɔnˈtrakt/',
    note: 'Mot **ett**. Un bail de première main (*förstahandskontrakt*) est très recherché à Stockholm.',
    gloss: [['ett', 'un', 'a'], ['kontrakt', 'contrat', 'contract']],
  }),
  vocab(D, 'u17-stadar', {
    prompt: 'Nettoyer le logement : « fait le ménage » (présent)', promptEn: 'Cleaning the home: "clean" (present)',
    sv: 'städar', fr: 'fais / fait le ménage', en: 'clean / cleans', ipa: '/ˈstɛːdar/',
    note: 'Infinitif *att städa*. Le grand ménage du départ : *flyttstädning*.',
  }),
  vocab(D, 'u17-stor', {
    prompt: 'Gêner quelqu’un : « dérange » (présent)', promptEn: 'Bothering someone: "disturb" (present)',
    sv: 'stör', fr: 'dérange / déranges', en: 'disturb / disturbs', ipa: '/støːr/',
    note: 'Infinitif *att störa*. Formule polie : *Ursäkta att jag stör* (excusez-moi de vous déranger).',
  }),
  vocab(D, 'u17-tyst', {
    prompt: 'Sans bruit : « calme / silencieux »', promptEn: 'Without noise: "quiet / silent"',
    sv: 'tyst', fr: 'calme / silencieux', en: 'quiet / silent', ipa: '/tʏst/',
    note: 'Déjà terminé en **-t**, il ne change pas au neutre : *ett tyst rum*. *Var tyst!* = Tais-toi !',
  }),
  vocab(D, 'u17-trasig', {
    prompt: 'Qui ne fonctionne plus : « cassé / en panne »', promptEn: 'Not working any more: "broken"',
    sv: 'trasig', fr: 'cassé / en panne', en: 'broken', ipa: '/ˈtrɑːsɪɡ/',
    note: 'Neutre : *trasigt* (*fönstret är trasigt*). Familier : *sönder* (*den är sönder*).',
  }),
  vocab(D, 'u17-nyckel', {
    prompt: 'Pour ouvrir la porte : « une clé »', promptEn: 'To open the door: "a key"',
    sv: 'en nyckel', fr: 'une clé', en: 'a key', ipa: '/ɛn ˈnʏkːɛl/',
    note: 'Pluriel : *nycklar* (le **e** tombe). Le badge d’immeuble : *en tagg* ou *en bricka*.',
    gloss: [['en', 'une', 'a'], ['nyckel', 'clé', 'key']],
  }),

  // Additions (issue #14)
  vocab(D, 'u17-tvattmaskin', {
    prompt: 'L’appareil pour laver le linge : « une machine à laver »', promptEn: 'The appliance for washing clothes: "a washing machine"',
    sv: 'en tvättmaskin', fr: 'une machine à laver', en: 'a washing machine', ipa: '/ɛn ˈtvɛtːmaˌɧiːn/',
    note: '*tvätt* (lessive) + *maskin*. Souvent partagée dans la *tvättstuga*.',
  }),
  vocab(D, 'u17-hogljudd', {
    prompt: 'Qui fait trop de bruit : « bruyant »', promptEn: 'Making too much noise: "loud"',
    sv: 'högljudd', fr: 'bruyant(e)', en: 'loud / noisy', ipa: '/ˈhøːɡˌjɵdː/',
    note: '*hög* (fort) + *ljud* (son). *Grannarna är högljudda.*',
  }),
  vocab(D, 'u17-lapp', {
    prompt: 'Le mot laissé dans l’escalier : « un petit mot »', promptEn: 'The note left in the stairwell: "a note"',
    sv: 'en lapp', fr: 'un petit mot (affiché)', en: 'a note', ipa: '/ɛn lapː/',
    note: 'Le *lapp* passif-agressif dans la buanderie est une institution suédoise.',
  }),
  vocab(D, 'u17-reparerar', {
    prompt: 'Remettre en état : « réparer »', promptEn: 'Making it work again: "to repair"',
    sv: 'reparerar', fr: 'répare / réparer', en: 'repairs / to repair', ipa: '/rɛpaˈreːrar/',
    note: 'Infinitif *reparera*. Plus courant à l’oral : *laga* (*laga diskmaskinen*).',
  }),
  vocab(D, 'u17-soprum', {
    prompt: 'Là où l’on jette les ordures : « le local poubelles »', promptEn: 'Where you take the rubbish: "the bin room"',
    sv: 'ett soprum', fr: 'un local poubelles', en: 'a bin room', ipa: '/ɛtː ˈsuːpˌrɵmː/',
    note: '*sopor* (ordures) + *rum*. On y trie : papier, verre, plastique, alimentaire.',
  }),
  vocab(D, 'u17-hyresgast', {
    prompt: 'Celui qui loue l’appartement : « un locataire »', promptEn: 'The person renting the flat: "a tenant"',
    sv: 'en hyresgäst', fr: 'un / une locataire', en: 'a tenant', ipa: '/ɛn ˈhyːrɛsˌjɛst/',
    note: '*hyra* (loyer) + *gäst* (invité). Défendu par *Hyresgästföreningen*.',
  }),
  phrase(D, 'u17-som-bor-ovanfor', {
    prompt: 'Relative en « som » : « Le voisin qui habite au-dessus est très sympa. »', promptEn: '"Som" relative clause: "The neighbour who lives upstairs is very nice."',
    sv: 'Grannen som bor ovanför är väldigt trevlig.', fr: 'Le voisin qui habite au-dessus est très sympa.', en: 'The neighbour who lives upstairs is very nice.',
    ipa: '/ˈɡranːɛn sɔmː buːr ˈoːvanˌfœr æːr ˈvɛldɪɡt ˈtreːvlɪɡ/',
    note: '**som** = qui / que, pour les personnes comme pour les choses. *ovanför* = au-dessus. *väldigt* = très (plus oral que *mycket*).',
    gloss: [['grannen', 'le voisin', 'the neighbour'], ['som', 'qui', 'who'], ['bor', 'habite', 'lives'], ['ovanför', 'au-dessus', 'upstairs'], ['är', 'est', 'is'], ['väldigt', 'très', 'very'], ['trevlig', 'sympa', 'nice']],
  }),
  phrase(D, 'u17-tid-i-tvattstugan', {
    prompt: '« J’ai réservé un créneau à la buanderie. »', promptEn: '"I have booked a slot in the laundry room."',
    sv: 'Jag har bokat en tid i tvättstugan.', fr: 'J’ai réservé un créneau à la buanderie.', en: 'I have booked a slot in the laundry room.',
    ipa: '/jɑː hɑːr ˈbuːkat ɛn tiːd ɪ ˈtvɛtːˌstʉːɡan/',
    note: '**en tid** = un horaire, un rendez-vous (aussi chez le médecin : *boka en tid*).',
    gloss: [['jag', 'je', 'I'], ['har', 'ai', 'have'], ['bokat', 'réservé', 'booked'], ['en', 'un', 'a'], ['tid', 'créneau', 'slot'], ['i', 'à', 'in'], ['tvättstugan', 'la buanderie', 'the laundry room']],
  }),
  phrase(D, 'u17-tvattmaskinen-trasig', {
    prompt: '« La machine à laver est en panne. »', promptEn: '"The washing machine is broken."',
    sv: 'Tvättmaskinen är trasig.', fr: 'La machine à laver est en panne.', en: 'The washing machine is broken.',
    ipa: '/ˈtvɛtːmaˌɧiːnɛn æːr ˈtrɑːsɪɡ/',
    note: '*tvätt* (lessive) + *maskin* (machine), le **sk** devant **i** se dit [ɧ]. Mot **en**, donc *trasig* sans **-t**.',
    gloss: [['tvättmaskinen', 'la machine à laver', 'the washing machine'], ['är', 'est', 'is'], ['trasig', 'en panne', 'broken']],
  }),
  phrase(D, 'u17-ringa-hyresvarden', {
    prompt: '« Tu peux appeler le propriétaire ? »', promptEn: '"Can you call the landlord?"',
    sv: 'Kan du ringa hyresvärden?', fr: 'Tu peux appeler le propriétaire ?', en: 'Can you call the landlord?',
    ipa: '/kanː dʉː ˈrɪŋːa ˈhyːrɛsˌvæːɖɛn/',
    note: '**ringa** + personne directement, sans préposition (*ringa någon*).',
    gloss: [['kan', 'peux', 'can'], ['du', 'tu', 'you'], ['ringa', 'appeler', 'call'], ['hyresvärden', 'le propriétaire', 'the landlord']],
  }),
  phrase(D, 'u17-musiken-som-stor', {
    prompt: 'Mise en relief : « C’est la musique qui me dérange. »', promptEn: 'Emphasis: "It is the music that bothers me."',
    sv: 'Det är musiken som stör mig.', fr: 'C’est la musique qui me dérange.', en: 'It is the music that bothers me.',
    ipa: '/deː æːr mʉˈsiːkɛn sɔmː støːr mɛj/',
    note: '**Det är … som** = c’est … qui / que : la structure exacte du français. Très pratique pour insister.',
    gloss: [['det', 'c’', 'it'], ['är', 'est', 'is'], ['musiken', 'la musique', 'the music'], ['som', 'qui', 'that'], ['stör', 'dérange', 'bothers'], ['mig', 'me', 'me']],
  }),
  phrase(D, 'u17-efter-tio-tyst', {
    prompt: 'Le règlement de l’immeuble : « Après dix heures, il faut faire silence. »', promptEn: 'The building rules: "After ten o’clock it must be quiet."',
    sv: 'Efter klockan tio ska det vara tyst.', fr: 'Après dix heures, il faut faire silence.', en: 'After ten o’clock it must be quiet.',
    ipa: '/ˈɛftɛr ˈklɔkːan ˈtiːʊ skɑː deː ˈvɑːra tʏst/',
    note: 'V2 : *Efter klockan tio* (1) **ska** (2) *det* (3). Ici *ska* exprime une règle (« doit »), pas un projet.',
    gloss: [['efter', 'après', 'after'], ['klockan', 'l’heure', 'o’clock'], ['tio', 'dix', 'ten'], ['ska', 'doit', 'must'], ['det', 'il', 'it'], ['vara', 'être', 'be'], ['tyst', 'silencieux', 'quiet']],
  }),
  phrase(D, 'u17-som-vi-kopte', {
    prompt: '« L’appartement que nous avons acheté est une copropriété. »', promptEn: '"The apartment we bought is a tenant-owned apartment."',
    sv: 'Lägenheten som vi köpte är en bostadsrätt.', fr: 'L’appartement que nous avons acheté est une copropriété.', en: 'The apartment we bought is a tenant-owned apartment.',
    ipa: '/ˈlɛːɡɛnˌheːtɛn sɔmː viː ˈɕœpːtɛ æːr ɛn ˈbuːstadsˌrɛtː/',
    note: '**som** sert aussi pour « que » (complément). Contrairement au français, on peut l’omettre : *lägenheten vi köpte*.',
    gloss: [['lägenheten', 'l’appartement', 'the apartment'], ['som', 'que', 'that'], ['vi', 'nous', 'we'], ['köpte', 'avons acheté', 'bought'], ['är', 'est', 'is'], ['en', 'une', 'a'], ['bostadsrätt', 'copropriété', 'tenant-owned apartment']],
  }),
  phrase(D, 'u17-tappat-nyckel', {
    prompt: '« J’ai perdu ma clé. »', promptEn: '"I have lost my key."',
    sv: 'Jag har tappat min nyckel.', fr: 'J’ai perdu ma clé.', en: 'I have lost my key.',
    ipa: '/jɑː hɑːr ˈtapːat mɪnː ˈnʏkːɛl/',
    note: '**tappa** = perdre / faire tomber (un objet). Perdre un match : *förlora*.',
    gloss: [['jag', 'je', 'I'], ['har', 'ai', 'have'], ['tappat', 'perdu', 'lost'], ['min', 'ma', 'my'], ['nyckel', 'clé', 'key']],
  }),
];
