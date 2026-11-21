// Unité 13 : Vêtements & achats (A2, Section 4). Grammaire : comparatif et superlatif (större, billigare, bäst).
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT13_DECK = unitDeck({
  n: 13, slug: 'swedish-unit-13-clothes', fr: 'Vêtements & achats', en: 'Clothes & shopping',
  level: 'A2', section: 'section-4-en-suede', after: 'swedish-unit-12-health',
});
const D = UNIT13_DECK.slug;

export const UNIT13_CARDS = [
  vocab(D, 'u13-troja', {
    prompt: 'Un vêtement chaud pour le haut : « un pull »', promptEn: 'A warm top: "a jumper / a sweater"',
    sv: 'en tröja', fr: 'un pull', en: 'a jumper / a sweater', ipa: '/ɛn ˈtrœjːa/',
    accent: 'Accent 2 (Grave)',
    note: 'Pluriel : *tröjor*. Un t-shirt : *en t-shirt*.',
    gloss: [['en', 'un', 'a'], ['tröja', 'pull', 'jumper']],
  }),
  vocab(D, 'u13-jacka', {
    prompt: 'À mettre par-dessus pour sortir : « une veste / un blouson »', promptEn: 'To wear over your clothes outside: "a jacket"',
    sv: 'en jacka', fr: 'une veste / un blouson', en: 'a jacket', ipa: '/ɛn ˈjakːa/',
    accent: 'Accent 2 (Grave)',
    note: 'Un manteau d’hiver : *en vinterjacka*. Indispensable de novembre à mars.',
    gloss: [['en', 'une', 'a'], ['jacka', 'veste', 'jacket']],
  }),
  vocab(D, 'u13-byxor', {
    prompt: 'Le vêtement pour les jambes : « un pantalon »', promptEn: 'Clothing for your legs: "trousers"',
    sv: 'byxor', fr: 'un pantalon', en: 'trousers', ipa: '/ˈbʏksʊr/',
    note: 'Toujours au **pluriel**, comme en anglais : *ett par byxor* (une paire de pantalons).',
  }),
  vocab(D, 'u13-skor', {
    prompt: 'Aux pieds : « des chaussures »', promptEn: 'On your feet: "shoes"',
    sv: 'skor', fr: 'des chaussures', en: 'shoes', ipa: '/skuːr/',
    note: 'Pluriel de *en sko*. Défini : *skorna*. On enlève ses chaussures en entrant chez quelqu’un en Suède.',
  }),
  vocab(D, 'u13-storlek', {
    prompt: 'S, M, L ou 42 : « une taille / une pointure »', promptEn: 'S, M, L or 42: "a size"',
    sv: 'en storlek', fr: 'une taille / une pointure', en: 'a size', ipa: '/ɛn ˈstuːrˌleːk/',
    accent: 'Accent 2 (Grave)',
    note: '*stor* (grand) + *lek*. Sert pour les vêtements comme pour les chaussures.',
    gloss: [['en', 'une', 'a'], ['storlek', 'taille', 'size']],
  }),
  vocab(D, 'u13-provar', {
    prompt: 'En cabine : « essaie » (présent)', promptEn: 'In the fitting room: "try on" (present)',
    sv: 'provar', fr: 'essaie / essaye', en: 'try on / tries on', ipa: '/ˈpruːvar/',
    note: 'Infinitif *att prova*, groupe 1. La cabine d’essayage : *provhytten*.',
  }),
  vocab(D, 'u13-rea', {
    prompt: 'Quand les prix baissent : « les soldes »', promptEn: 'When prices drop: "the sales"',
    sv: 'rea', fr: 'les soldes', en: 'the sales', ipa: '/ˈreːa/',
    note: 'Abréviation de *realisation*. *Det är rea* = c’est les soldes. Grosse période : *mellandagsrea*, entre Noël et le Nouvel An.',
  }),
  vocab(D, 'u13-storre', {
    prompt: 'Comparatif irrégulier de « stor » : « plus grand »', promptEn: 'Irregular comparative of "stor": "bigger"',
    sv: 'större', fr: 'plus grand(e)', en: 'bigger / larger', ipa: '/ˈstœrːɛ/',
    note: 'Irrégulier : *stor, större, störst*. Même chose : *liten, mindre, minst* ; *bra, bättre, bäst*.',
  }),
  vocab(D, 'u13-billigare', {
    prompt: 'Comparatif régulier de « billig » : « moins cher »', promptEn: 'Regular comparative of "billig": "cheaper"',
    sv: 'billigare', fr: 'moins cher', en: 'cheaper', ipa: '/ˈbɪlːɪɡarɛ/',
    note: 'Règle générale : **-are** (plus…) et **-ast** (le plus…) : *billig, billigare, billigast*. Le **g** se prononce ici.',
  }),
  vocab(D, 'u13-bast', {
    prompt: 'Superlatif irrégulier de « bra » : « le meilleur / le mieux »', promptEn: 'Irregular superlative of "bra": "best"',
    sv: 'bäst', fr: 'le meilleur / le mieux', en: 'best', ipa: '/bɛst/',
    note: '*bra, bättre, bäst*. *Vilken är bäst?* = Lequel est le meilleur ?',
  }),

  // Ajouts (issue #14)
  vocab(D, 'u13-klanning', {
    prompt: 'Un vêtement d’une seule pièce : « une robe »', promptEn: 'A one-piece garment: "a dress"',
    sv: 'en klänning', fr: 'une robe', en: 'a dress', ipa: '/ɛn ˈklɛnːɪŋ/',
    note: 'Défini : *klänningen*. Pluriel : *klänningar*.',
  }),
  vocab(D, 'u13-kjol', {
    prompt: 'Un vêtement qui part de la taille : « une jupe »', promptEn: 'A garment from the waist down: "a skirt"',
    sv: 'en kjol', fr: 'une jupe', en: 'a skirt', ipa: '/ɛn ɕuːl/',
    note: 'Le **kj** se prononce [ɕ], comme le **k** de *köpa*.',
  }),
  vocab(D, 'u13-mossa', {
    prompt: 'Pour garder la tête au chaud : « un bonnet »', promptEn: 'To keep your head warm: "a beanie / hat"',
    sv: 'en mössa', fr: 'un bonnet', en: 'a beanie', ipa: '/ɛn ˈmœsːa/',
    note: 'Indispensable l’hiver. Pluriel : *mössor*.',
  }),
  vocab(D, 'u13-vantar', {
    prompt: 'Pour les mains l’hiver : « des moufles »', promptEn: 'For your hands in winter: "mittens"',
    sv: 'vantar', fr: 'des moufles', en: 'mittens', ipa: '/ˈvantar/',
    note: 'Pluriel de *en vante*. Des gants à doigts : *handskar*.',
  }),
  vocab(D, 'u13-provrum', {
    prompt: 'Pour essayer les vêtements : « une cabine d’essayage »', promptEn: 'To try on clothes: "a fitting room"',
    sv: 'ett provrum', fr: 'une cabine d’essayage', en: 'a fitting room', ipa: '/ɛtː ˈpruːvˌrɵmː/',
    note: '*prova* (essayer) + *rum* (pièce) : mot **ett**.',
  }),
  vocab(D, 'u13-snygg', {
    prompt: 'Qui a du style : « beau / joli »', promptEn: 'Looking good: "nice / good-looking"',
    sv: 'snygg', fr: 'beau / joli', en: 'nice-looking', ipa: '/snʏɡː/',
    note: 'Pour les vêtements et les gens. Neutre : *snyggt*. Superlatif : *snyggast*.',
  }),
  vocab(D, 'u13-farg', {
    prompt: 'Rouge, bleu, noir : « une couleur »', promptEn: 'Red, blue, black: "a colour"',
    sv: 'en färg', fr: 'une couleur', en: 'a colour', ipa: '/ɛn færj/',
    note: 'Le **g** après **r** se prononce [j]. *Vilken färg?* = quelle couleur ?',
  }),
  phrase(D, 'u13-prova-trojan', {
    prompt: 'En magasin : « Je peux essayer ce pull ? »', promptEn: 'In a shop: "Can I try on this jumper?"',
    sv: 'Kan jag prova den här tröjan?', fr: 'Je peux essayer ce pull ?', en: 'Can I try on this jumper?',
    ipa: '/kanː jɑː ˈpruːva dɛnː hæːr ˈtrœjːan/',
    note: '**den här** + nom défini (*tröjan*), comme *den här bussen* (Unité 6). Après *kan*, l’infinitif sans *att* : *prova*.',
    gloss: [['kan', 'peux', 'can'], ['jag', 'je', 'I'], ['prova', 'essayer', 'try on'], ['den', 'ce', 'this'], ['här', 'ici', 'here'], ['tröjan', 'le pull', 'the jumper']],
  }),
  phrase(D, 'u13-storre-storlek', {
    prompt: '« Vous avez une taille plus grande ? »', promptEn: '"Do you have a bigger size?"',
    sv: 'Har ni en större storlek?', fr: 'Vous avez une taille plus grande ?', en: 'Do you have a bigger size?',
    ipa: '/hɑːr niː ɛn ˈstœrːɛ ˈstuːrˌleːk/',
    note: 'Le comparatif se place devant le nom, sans accord : *en större storlek*, *ett större rum*.',
    gloss: [['har', 'avez', 'have'], ['ni', 'vous', 'you'], ['en', 'une', 'a'], ['större', 'plus grande', 'bigger'], ['storlek', 'taille', 'size']],
  }),
  phrase(D, 'u13-for-liten', {
    prompt: '« La veste est trop petite. »', promptEn: '"The jacket is too small."',
    sv: 'Jackan är för liten.', fr: 'La veste est trop petite.', en: 'The jacket is too small.',
    ipa: '/ˈjakːan æːr fœr ˈliːtɛn/',
    note: '**för** + adjectif = **trop** (et pas « pour ») : *för liten*, *för dyr*. *jackan* est un mot **en**, donc *liten* (pas *litet*).',
    gloss: [['jackan', 'la veste', 'the jacket'], ['är', 'est', 'is'], ['för', 'trop', 'too'], ['liten', 'petite', 'small']],
  }),
  phrase(D, 'u13-skorna-billigare', {
    prompt: '« Ces chaussures sont moins chères. »', promptEn: '"These shoes are cheaper."',
    sv: 'De här skorna är billigare.', fr: 'Ces chaussures sont moins chères.', en: 'These shoes are cheaper.',
    ipa: '/dɔmː hæːr ˈskuːɳa æːr ˈbɪlːɪɡarɛ/',
    note: 'Au pluriel : **de här** + nom défini pluriel (*skorna*). *de* se prononce [dɔmː]. Le comparatif ne s’accorde pas.',
    gloss: [['de', 'ces', 'these'], ['här', 'ici', 'here'], ['skorna', 'les chaussures', 'the shoes'], ['är', 'sont', 'are'], ['billigare', 'moins chères', 'cheaper']],
  }),
  phrase(D, 'u13-vilken-storlek', {
    prompt: '« Quelle taille fais-tu ? »', promptEn: '"What size are you?"',
    sv: 'Vilken storlek har du?', fr: 'Quelle taille fais-tu ?', en: 'What size are you?',
    ipa: '/ˈvɪlːkɛn ˈstuːrˌleːk hɑːr dʉː/',
    note: '**vilken** (mot *en*) / *vilket* (mot *ett*, cf. *Vilket fint väder!*) / *vilka* (pluriel). En suédois, on « a » une taille.',
    gloss: [['vilken', 'quelle', 'what'], ['storlek', 'taille', 'size'], ['har', 'as', 'have'], ['du', 'tu', 'you']],
  }),
  phrase(D, 'u13-rea-pa-byxor', {
    prompt: '« Il y a des soldes sur les pantalons aujourd’hui. »', promptEn: '"Trousers are on sale today."',
    sv: 'Det är rea på byxor idag.', fr: 'Il y a des soldes sur les pantalons aujourd’hui.', en: 'Trousers are on sale today.',
    ipa: '/deː æːr ˈreːa poː ˈbʏksʊr ɪˈdɑː/',
    note: '*Det är rea på…* = il y a des soldes sur… **på** = sur.',
    gloss: [['det', 'il', 'it'], ['är', 'est', 'is'], ['rea', 'soldes', 'sale'], ['på', 'sur', 'on'], ['byxor', 'pantalons', 'trousers'], ['idag', 'aujourd’hui', 'today']],
  }),
  phrase(D, 'u13-snyggast', {
    prompt: '« Le pull bleu est le plus joli. »', promptEn: '"The blue jumper is the nicest."',
    sv: 'Den blå tröjan är snyggast.', fr: 'Le pull bleu est le plus joli.', en: 'The blue jumper is the nicest.',
    ipa: '/dɛnː bloː ˈtrœjːan æːr ˈsnʏɡːast/',
    note: 'Double défini avec adjectif : **den** blå **tröjan**. *snygg* (joli, beau), *snyggare*, *snyggast* : pas d’article devant le superlatif après *är*.',
    gloss: [['den', 'le', 'the'], ['blå', 'bleu', 'blue'], ['tröjan', 'pull', 'jumper'], ['är', 'est', 'is'], ['snyggast', 'le plus joli', 'the nicest']],
  }),
  phrase(D, 'u13-vilken-ar-bast', {
    prompt: '« Lequel est le meilleur ? »', promptEn: '"Which one is the best?"',
    sv: 'Vilken är bäst?', fr: 'Lequel est le meilleur ?', en: 'Which one is the best?',
    ipa: '/ˈvɪlːkɛn æːr bɛst/',
    note: '*vilken* seul = lequel / laquelle. Réponse : *Den här är bäst* (celui-ci est le meilleur).',
    gloss: [['vilken', 'lequel', 'which one'], ['är', 'est', 'is'], ['bäst', 'le meilleur', 'the best']],
  }),
];
