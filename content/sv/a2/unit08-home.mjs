// Unit 8: At home (A2, Section 3). Grammar: ligger / står / sitter, prepositions of place.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT8_DECK = unitDeck({
  n: 8, slug: 'swedish-unit-8-home', fr: 'Chez moi', en: 'At home',
  level: 'A2', section: 'section-3-ma-vie', after: 'swedish-unit-7-weather',
});
const D = UNIT8_DECK.slug;

export const UNIT8_CARDS = [
  vocab(D, 'u8-lagenhet', {
    prompt: 'Le logement le plus courant en ville : « un appartement »', promptEn: 'The most common home in town: "an apartment"',
    sv: 'en lägenhet', fr: 'un appartement', en: 'an apartment', ipa: '/ɛn ˈlɛːɡɛnˌheːt/',
    note: 'Défini : **lägenheten**. Dans les annonces, *3 rok* veut dire 3 pièces + cuisine (*rum och kök*).',
    gloss: [['en', 'un', 'an'], ['lägenhet', 'appartement', 'apartment']],
  }),
  vocab(D, 'u8-rum', {
    prompt: 'Une pièce de la maison : « une pièce / une chambre »', promptEn: 'A room in the house: "a room"',
    sv: 'ett rum', fr: 'une pièce', en: 'a room', ipa: '/ɛtː rɵmː/',
    note: 'Mot **ett**, invariable au pluriel : *ett rum, två rum*. Le **u** est court devant **mm**.',
    gloss: [['ett', 'une', 'a'], ['rum', 'pièce', 'room']],
  }),
  vocab(D, 'u8-kok', {
    prompt: 'La pièce où l’on cuisine : « une cuisine »', promptEn: 'Where you cook: "a kitchen"',
    sv: 'ett kök', fr: 'une cuisine', en: 'a kitchen', ipa: '/ɛtː ɕøːk/',
    note: 'Les deux **k** sonnent différemment : le premier, devant **ö**, est doux [ɕ] ; le dernier est dur. Défini : *köket*.',
    gloss: [['ett', 'une', 'a'], ['kök', 'cuisine', 'kitchen']],
  }),
  vocab(D, 'u8-sovrum', {
    prompt: 'La pièce où l’on dort : « une chambre »', promptEn: 'The room where you sleep: "a bedroom"',
    sv: 'ett sovrum', fr: 'une chambre (à coucher)', en: 'a bedroom', ipa: '/ɛtː ˈsoːvˌrɵmː/',
    accent: 'Accent 2 (Grave)',
    note: '*sova* (dormir) + *rum* (pièce). Le genre vient du dernier mot : *rum* est **ett**, donc *ett sovrum*.',
    gloss: [['ett', 'une', 'a'], ['sovrum', 'chambre', 'bedroom']],
  }),
  vocab(D, 'u8-sang', {
    prompt: 'Le meuble pour dormir : « un lit »', promptEn: 'The furniture you sleep in: "a bed"',
    sv: 'en säng', fr: 'un lit', en: 'a bed', ipa: '/ɛn sɛŋː/',
    note: 'Le **ng** final se prononce comme dans l’anglais *sing*, sans **g** audible.',
    gloss: [['en', 'un', 'a'], ['säng', 'lit', 'bed']],
  }),
  vocab(D, 'u8-soffa', {
    prompt: 'Le meuble du salon : « un canapé »', promptEn: 'The living-room furniture: "a sofa"',
    sv: 'en soffa', fr: 'un canapé', en: 'a sofa', ipa: '/ɛn ˈsɔfːa/', accent: 'Accent 2 (Grave)',
    note: 'Défini : *soffan*. Pluriel : *soffor* (1er groupe, comme *flicka → flickor*).',
    gloss: [['en', 'un', 'a'], ['soffa', 'canapé', 'sofa']],
  }),
  vocab(D, 'u8-fonster', {
    prompt: 'Pour regarder dehors : « une fenêtre »', promptEn: 'To look outside: "a window"',
    sv: 'ett fönster', fr: 'une fenêtre', en: 'a window', ipa: '/ɛtː ˈfœnstɛr/',
    note: 'Mot **ett**. Défini : **fönstret** (le *e* tombe). Invariable au pluriel : *två fönster*.',
    gloss: [['ett', 'une', 'a'], ['fönster', 'fenêtre', 'window']],
  }),
  vocab(D, 'u8-hyran', {
    prompt: 'Ce que tu paies chaque mois pour ton logement : « le loyer »', promptEn: 'What you pay every month for your home: "the rent"',
    sv: 'hyran', fr: 'le loyer', en: 'the rent', ipa: '/ˈhyːran/',
    note: 'Défini de *en hyra*. Le verbe : *hyra* (louer). Un locataire = *en hyresgäst*.',
    words: ['hyran'],
  }),
  vocab(D, 'u8-bor', {
    prompt: 'Le verbe du logement : « habite » (présent)', promptEn: 'The verb for where you live: "live" (present)',
    sv: 'bor', fr: 'habite / habites', en: 'live / lives', ipa: '/buːr/',
    note: 'Infinitif *att bo*. Groupe 3 (verbes courts) : *bo, bor, bodde, har bott*. *Var bor du?* = Où habites-tu ?',
  }),
  vocab(D, 'u8-flyttar', {
    prompt: 'Changer de logement : « déménage » (présent)', promptEn: 'Changing homes: "move" (present)',
    sv: 'flyttar', fr: 'déménage / déménageons', en: 'move / moves', ipa: '/ˈflʏtːar/',
    note: 'Infinitif *att flytta*, groupe 1 (*flyttade, har flyttat*). S’emploie aussi pour déplacer un objet.',
  }),

  // Additions (issue #14)
  vocab(D, 'u8-badrum', {
    prompt: 'La pièce avec la douche : « une salle de bains »', promptEn: 'The room with the shower: "a bathroom"',
    sv: 'ett badrum', fr: 'une salle de bains', en: 'a bathroom', ipa: '/ɛtː ˈbɑːdˌrɵmː/',
    note: '*bad* (bain) + *rum* (pièce) : mot **ett**, comme *rum*.',
  }),
  vocab(D, 'u8-vardagsrum', {
    prompt: 'La pièce où l’on se détend : « un salon »', promptEn: 'Where you relax: "a living room"',
    sv: 'ett vardagsrum', fr: 'un salon', en: 'a living room', ipa: '/ɛtː ˈvɑːɖɑksˌrɵmː/',
    note: '*vardag* (jour ordinaire) + *rum*. Le **rd** se prononce [ɖ], langue recourbée.',
  }),
  vocab(D, 'u8-dorr', {
    prompt: 'Pour entrer dans une pièce : « une porte »', promptEn: 'To go into a room: "a door"',
    sv: 'en dörr', fr: 'une porte', en: 'a door', ipa: '/ɛn dœrː/',
    note: 'Défini : *dörren*. *Stäng dörren!* = ferme la porte !',
  }),
  vocab(D, 'u8-balkong', {
    prompt: 'Dehors, accroché à l’appartement : « un balcon »', promptEn: 'Outside, attached to the flat: "a balcony"',
    sv: 'en balkong', fr: 'un balcon', en: 'a balcony', ipa: '/ɛn balˈkɔŋː/',
    note: 'Accent sur la dernière syllabe. *Lägenheten har balkong* (sans article).',
  }),
  vocab(D, 'u8-hiss', {
    prompt: 'Pour monter sans les marches : « un ascenseur »', promptEn: 'To go up without the stairs: "a lift"',
    sv: 'en hiss', fr: 'un ascenseur', en: 'a lift / an elevator', ipa: '/ɛn hɪsː/',
    note: 'Défini : *hissen*. Dans les annonces : *hiss finns* (il y a un ascenseur).',
  }),
  vocab(D, 'u8-trappa', {
    prompt: 'Les marches entre les étages : « un escalier »', promptEn: 'Steps between floors: "stairs"',
    sv: 'en trappa', fr: 'un escalier', en: 'a staircase / stairs', ipa: '/ɛn ˈtrapːa/',
    note: 'Aussi pour les étages : *Jag bor två trappor upp* = au 2e étage.',
  }),
  phrase(D, 'u8-jag-bor-i', {
    prompt: 'Dire où tu habites : « J’habite dans un appartement à Stockholm. »', promptEn: 'Saying where you live: "I live in an apartment in Stockholm."',
    sv: 'Jag bor i en lägenhet i Stockholm.', fr: 'J’habite dans un appartement à Stockholm.', en: 'I live in an apartment in Stockholm.',
    ipa: '/jɑː buːr ɪ ɛn ˈlɛːɡɛnˌheːt ɪ ˈstɔkːhɔlm/',
    note: '**i** = dans / à pour un lieu fermé ou une ville : *i en lägenhet*, *i Stockholm*.',
    gloss: [['jag', 'je', 'I'], ['bor', 'habite', 'live'], ['i', 'dans', 'in'], ['en', 'un', 'an'], ['lägenhet', 'appartement', 'apartment'], ['i', 'à', 'in'], ['Stockholm', 'Stockholm', 'Stockholm']],
  }),
  phrase(D, 'u8-tre-rum', {
    prompt: 'Décrire ton logement : « L’appartement a trois pièces et une cuisine. »', promptEn: 'Describing your home: "The apartment has three rooms and a kitchen."',
    sv: 'Lägenheten har tre rum och kök.', fr: 'L’appartement a trois pièces et une cuisine.', en: 'The apartment has three rooms and a kitchen.',
    ipa: '/ˈlɛːɡɛnˌheːtɛn hɑːr treː rɵmː ɔ ɕøːk/',
    note: '*rum och kök* est une formule fixe, sans article : c’est elle qu’on abrège en *rok* dans les annonces.',
    gloss: [['lägenheten', 'l’appartement', 'the apartment'], ['har', 'a', 'has'], ['tre', 'trois', 'three'], ['rum', 'pièces', 'rooms'], ['och', 'et', 'and'], ['kök', 'cuisine', 'kitchen']],
  }),
  phrase(D, 'u8-hur-mycket-hyran', {
    prompt: 'Demander le loyer : « Combien coûte le loyer ? »', promptEn: 'Asking about the rent: "How much is the rent?"',
    sv: 'Hur mycket är hyran?', fr: 'Combien coûte le loyer ?', en: 'How much is the rent?',
    ipa: '/hʉːr ˈmʏkːɛ æːr ˈhyːran/',
    note: '**hur mycket** = combien (quantité). Pour un prix, on peut aussi dire *Vad kostar…?* (Unité 2).',
    gloss: [['hur', 'comment', 'how'], ['mycket', 'beaucoup', 'much'], ['är', 'est', 'is'], ['hyran', 'le loyer', 'the rent']],
  }),
  phrase(D, 'u8-soffan-star', {
    prompt: 'Placer un objet debout : « Le canapé est près de la fenêtre. »', promptEn: 'Placing an upright object: "The sofa is by the window."',
    sv: 'Soffan står vid fönstret.', fr: 'Le canapé est près de la fenêtre.', en: 'The sofa is by the window.',
    ipa: '/ˈsɔfːan stoːr viːd ˈfœnstrɛt/',
    note: 'Le suédois précise la position : **står** (est debout) pour un meuble posé sur ses pieds. *vid* = près de, à côté de.',
    gloss: [['soffan', 'le canapé', 'the sofa'], ['står', 'est (debout)', 'stands'], ['vid', 'près de', 'by'], ['fönstret', 'la fenêtre', 'the window']],
  }),
  phrase(D, 'u8-boken-ligger', {
    prompt: 'Placer un objet à plat : « Le livre est sur la table. »', promptEn: 'Placing a flat object: "The book is on the table."',
    sv: 'Boken ligger på bordet.', fr: 'Le livre est sur la table.', en: 'The book is on the table.',
    ipa: '/ˈbuːkɛn ˈlɪɡːɛr poː ˈbuːɖɛt/',
    note: '**ligger** (est couché) pour un objet à plat. *på* = sur. Tu connais déjà *ligger* pour un lieu (*Var ligger…?*, Unité 4).',
    gloss: [['boken', 'le livre', 'the book'], ['ligger', 'est (à plat)', 'lies'], ['på', 'sur', 'on'], ['bordet', 'la table', 'the table']],
  }),
  phrase(D, 'u8-jag-sitter', {
    prompt: 'Dire où tu es assis : « Je suis assis dans la cuisine. »', promptEn: 'Saying where you are sitting: "I am sitting in the kitchen."',
    sv: 'Jag sitter i köket.', fr: 'Je suis (assis) dans la cuisine.', en: 'I am sitting in the kitchen.',
    ipa: '/jɑː ˈsɪtːɛr ɪ ˈɕøːkɛt/',
    note: 'Trio de position : **sitter** (assis), **står** (debout), **ligger** (couché). Là où le français dit simplement « être ».',
    gloss: [['jag', 'je', 'I'], ['sitter', 'suis assis', 'am sitting'], ['i', 'dans', 'in'], ['köket', 'la cuisine', 'the kitchen']],
  }),
  phrase(D, 'u8-vi-flyttar', {
    prompt: 'Annoncer un déménagement : « Nous déménageons dans un nouvel appartement. »', promptEn: 'Announcing a move: "We are moving to a new apartment."',
    sv: 'Vi flyttar till en ny lägenhet.', fr: 'Nous déménageons dans un nouvel appartement.', en: 'We are moving to a new apartment.',
    ipa: '/viː ˈflʏtːar tɪlː ɛn nyː ˈlɛːɡɛnˌheːt/',
    note: 'Direction = **till** (vers), pas *i*. *ny* = nouveau (vu en phonétique, *ny / nu*).',
    gloss: [['vi', 'nous', 'we'], ['flyttar', 'déménageons', 'are moving'], ['till', 'vers', 'to'], ['en', 'un', 'a'], ['ny', 'nouvel', 'new'], ['lägenhet', 'appartement', 'apartment']],
  }),
  phrase(D, 'u8-sovrum-litet', {
    prompt: 'Décrire une pièce : « Ma chambre est petite. » (ett sovrum)', promptEn: 'Describing a room: "My bedroom is small." (ett sovrum)',
    sv: 'Mitt sovrum är litet.', fr: 'Ma chambre est petite.', en: 'My bedroom is small.',
    ipa: '/mɪtː ˈsoːvˌrɵmː æːr ˈliːtɛt/',
    note: 'Double accord **ett** : *mitt* (et pas *min*) et **litet** (forme neutre irrégulière de *liten*).',
    gloss: [['mitt', 'ma', 'my'], ['sovrum', 'chambre', 'bedroom'], ['är', 'est', 'is'], ['litet', 'petite', 'small']],
  }),
];
