// FranceCore, Unité 13 : Vêtements et shopping.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT13_DECK = unitDeck({
  n: 13, slug: 'fr-unit-13-clothes', sv: 'Kläder och shopping', en: 'Clothes and shopping',
  level: 'A2', section: 'fr-section-4-en-france', after: 'fr-unit-12-health',
});
const D = UNIT13_DECK.slug;

export const UNIT13_CARDS = [
  // ===================== MOTS =====================
  vocab(D, 'fr-u13-pantalon', {
    prompt: 'Plagget med två ben', promptEn: 'The garment with two legs',
    fr: 'le pantalon', sv: 'byxorna', en: 'the trousers / the pants',
    ipa: '/lə pɑ̃.ta.lɔ̃/',
    note: 'Se upp: **singular** på franska, *un pantalon*, men plural på svenska och engelska. *Ce pantalon est trop long* = de här byxorna är för långa.',
    noteEn: 'Watch out: **singular** in French, *un pantalon*, but plural in English. *Ce pantalon est trop long* = these trousers are too long.',
  }),
  vocab(D, 'fr-u13-robe', {
    prompt: 'Ett plagg i ett stycke, oftast för kvinnor', promptEn: 'A one-piece garment, usually for women',
    fr: 'la robe', sv: 'klänningen', en: 'the dress',
    ipa: '/la ʁɔb/',
    note: 'Inte en morgonrock (*un peignoir*). Slutets **e** är stumt, så **b** hörs: [ʁɔb].',
    noteEn: 'Not a robe or bathrobe (*un peignoir*). The final **e** is silent, so the **b** is heard: [ʁɔb].',
  }),
  vocab(D, 'fr-u13-veste', {
    prompt: 'Ett kort ytterplagg eller en kavaj', promptEn: 'A short outer garment or a blazer',
    fr: 'la veste', sv: 'jackan / kavajen', en: 'the jacket',
    ipa: '/la vɛst/',
    note: 'Falsk vän: **une veste** är en jacka, inte en väst. Västen heter *un gilet*. En tjock vinterjacka är **un manteau**.',
    noteEn: 'False friend: **une veste** is a jacket, not a vest. A waistcoat is *un gilet*. A heavy winter coat is **un manteau**.',
  }),
  vocab(D, 'fr-u13-pull', {
    prompt: 'En varm stickad tröja', promptEn: 'A warm knitted top',
    fr: 'le pull', sv: 'tröjan', en: 'the jumper / the sweater',
    ipa: '/lə pyl/',
    note: 'Kortform för engelskans *pull-over*, men uttalat på franskt vis: [pyl], med **u** som svenskt *y*.',
    noteEn: 'Short for English *pull-over*, but said the French way: [pyl], with a French **u**.',
  }),
  vocab(D, 'fr-u13-chaussures', {
    prompt: 'Det man har på fötterna', promptEn: 'What you wear on your feet',
    fr: 'les chaussures', sv: 'skorna', en: 'the shoes',
    ipa: '/le ʃo.syʁ/',
    note: 'Femininum: *une chaussure*. Gympaskor heter **des baskets** (femininum), och strumpor **des chaussettes**.',
    noteEn: 'Feminine: *une chaussure*. Trainers are **des baskets** (feminine), and socks **des chaussettes**.',
  }),
  vocab(D, 'fr-u13-taille', {
    prompt: 'Klädstorleken', promptEn: 'Clothing size',
    fr: 'la taille', sv: 'storleken', en: 'the size',
    ipa: '/la taj/',
    note: 'Betyder också midja och kroppslängd. **-aille** uttalas [aj]. Storlekarna är desamma som i Sverige: 36, 38, 40.',
    noteEn: 'Also means waist and height. **-aille** is pronounced [aj]. Sizes are European: 36, 38, 40.',
  }),
  vocab(D, 'fr-u13-pointure', {
    prompt: 'Skostorleken', promptEn: 'Shoe size',
    fr: 'la pointure', sv: 'skostorleken', en: 'the shoe size',
    ipa: '/la pwɛ̃.tyʁ/',
    note: 'Ett eget ord bara för skor: *Vous faites quelle pointure ?* **oin** uttalas [wɛ̃], ett *w* följt av nasalt *in*.',
    noteEn: 'A separate word just for shoes: *Vous faites quelle pointure ?* **oin** is [wɛ̃], a *w* followed by a nasal vowel.',
  }),
  vocab(D, 'fr-u13-essayer', {
    prompt: 'Att prova ett plagg', promptEn: 'To try something on',
    fr: 'essayer', sv: 'prova', en: 'to try on / to try',
    ipa: '/e.se.je/',
    note: 'Betyder både prova kläder och försöka: *j’essaie de comprendre*. **y** blir **i** framför stum ändelse: *j’essaie*.',
    noteEn: 'Means both to try on clothes and to attempt: *j’essaie de comprendre*. **y** becomes **i** before a silent ending: *j’essaie*.',
  }),
  vocab(D, 'fr-u13-cabine-essayage', {
    prompt: 'Det lilla rummet i butiken där man provar', promptEn: 'The little room in the shop where you try things on',
    fr: 'la cabine d’essayage', sv: 'provhytten', en: 'the fitting room / the changing room',
    ipa: '/la ka.bin de.sɛ.jaʒ/',
    note: '**De** blir **d’** framför vokal. Ofta kort som **la cabine**: *Les cabines sont au fond.*',
    noteEn: '**De** becomes **d’** before a vowel. Often just **la cabine**: *Les cabines sont au fond.*',
  }),
  vocab(D, 'fr-u13-soldes', {
    prompt: 'Rean, två gånger om året', promptEn: 'The sales, twice a year',
    fr: 'les soldes', sv: 'rean', en: 'the sales',
    ipa: '/le sɔld/',
    note: 'Maskulinum plural. Rean regleras av staten: den börjar på fastställda datum i januari och i slutet av juni och pågår i fyra veckor.',
    noteEn: 'Masculine plural. Sales are regulated by the state: they start on fixed dates in January and late June and last four weeks.',
  }),
  vocab(D, 'fr-u13-blanc', {
    prompt: 'Färgen på snö', promptEn: 'The colour of snow',
    fr: 'blanc / blanche', sv: 'vit', en: 'white',
    ipa: '/blɑ̃/ /blɑ̃ʃ/',
    note: 'Oregelbunden femininform: *un pull blanc*, *une robe blanche*. **c** i maskulinum är stumt.',
    noteEn: 'Irregular feminine: *un pull blanc*, *une robe blanche*. The **c** in the masculine is silent.',
  }),
  vocab(D, 'fr-u13-marron', {
    prompt: 'Färgen på kastanjer och choklad', promptEn: 'The colour of chestnuts and chocolate',
    fr: 'marron', sv: 'brun', en: 'brown',
    ipa: '/ma.ʁɔ̃/',
    note: 'Betyder egentligen kastanj, och böjs därför **aldrig**: *des chaussures marron*. **Brun** används mest om hår och hy.',
    noteEn: 'It literally means chestnut, so it **never** agrees: *des chaussures marron*. **Brun** is used mostly for hair and skin.',
  }),

  // ===================== PHRASES =====================
  phrase(D, 'fr-u13-essayer-robe', {
    prompt: 'Fråga om du får prova den här klänningen', promptEn: 'Ask if you can try on this dress',
    fr: 'Je peux essayer cette robe ?', sv: 'Får jag prova den här klänningen?', en: 'Can I try on this dress?',
    ipa: '/ʒə pø e.se.je sɛt ʁɔb/',
    note: 'Demonstrativet böjs: **ce** pull, **cet** anorak (framför vokal), **cette** robe, **ces** chaussures. *Ce* och *cette* motsvarar *den här*.',
    noteEn: 'The demonstrative agrees: **ce** pull, **cet** anorak (before a vowel), **cette** robe, **ces** chaussures.',
    gloss: [['je', 'jag', 'I'], ['peux', 'får', 'can'], ['essayer', 'prova', 'try on'], ['cette robe', 'den här klänningen', 'this dress']],
  }),
  phrase(D, 'fr-u13-quelle-taille', {
    prompt: 'Expediten frågar vilken storlek du har: svara 38', promptEn: 'The assistant asks your size: answer 38',
    fr: 'Vous faites quelle taille ? Je fais du 38.', sv: 'Vilken storlek har ni? Jag har 38.', en: 'What size are you? I’m a 38.',
    ipa: '/vu fɛt kɛl taj ʒə fɛ dy tʁɑ̃t.ɥit/',
    note: 'Storlek anges med **faire du** + nummer. **Vous faites** är oregelbundet: aldrig *vous faisez*.',
    noteEn: 'Size is given with **faire du** + number. **Vous faites** is irregular: never *vous faisez*.',
    gloss: [['vous faites', 'har ni', 'are you'], ['quelle taille', 'vilken storlek', 'what size'], ['je fais du', 'jag har', 'I’m a'], ['38', '38', '38']],
  }),
  phrase(D, 'fr-u13-en-noir', {
    prompt: 'Fråga om de har den här tröjan i svart', promptEn: 'Ask if they have this jumper in black',
    fr: 'Vous avez ce pull en noir ?', sv: 'Har ni den här tröjan i svart?', en: 'Do you have this jumper in black?',
    ipa: '/vu.za.ve sə pyl ɑ̃ nwaʁ/',
    note: '**En** + färg eller storlek för andra varianter av samma vara: *en noir, en 40, en taille M*.',
    noteEn: '**En** + a colour or size for other versions of the same item: *en noir, en 40, en taille M*.',
    gloss: [['vous avez', 'har ni', 'do you have'], ['ce pull', 'den här tröjan', 'this jumper'], ['en noir', 'i svart', 'in black']],
  }),
  phrase(D, 'fr-u13-trop-grande', {
    prompt: 'Säg att jackan är lite för stor för dig', promptEn: 'Say the jacket is a bit too big for you',
    fr: 'Elle est un peu trop grande pour moi.', sv: 'Den är lite för stor för mig.', en: 'It’s a bit too big for me.',
    ipa: '/ɛ.lɛ.tœ̃ pø tʁo ɡʁɑ̃d puʁ mwa/',
    note: '**Elle** syftar på *la veste*: saker är *il* eller *elle* efter genus. **Grande** får **e** och då hörs **d**: [ɡʁɑ̃d].',
    noteEn: '**Elle** refers to *la veste*: things are *il* or *elle* by gender. **Grande** takes an **e**, so the **d** is heard: [ɡʁɑ̃d].',
    gloss: [['elle', 'den', 'it'], ['est', 'är', 'is'], ['un peu', 'lite', 'a bit'], ['trop', 'för', 'too'], ['grande', 'stor', 'big'], ['pour moi', 'för mig', 'for me']],
  }),
  phrase(D, 'fr-u13-soldes-janvier', {
    prompt: 'Berätta att rean börjar i januari', promptEn: 'Say the sales start in January',
    fr: 'Les soldes commencent en janvier.', sv: 'Rean börjar i januari.', en: 'The sales start in January.',
    ipa: '/le sɔld kɔ.mɑ̃s ɑ̃ ʒɑ̃.vje/',
    note: 'Verbändelsen **-ent** är alltid stum: *commencent* låter som *commence*. Månader tar **en** och skrivs med liten bokstav.',
    noteEn: 'The verb ending **-ent** is always silent: *commencent* sounds like *commence*. Months take **en** and are written in lower case.',
    gloss: [['les soldes', 'rean', 'the sales'], ['commencent', 'börjar', 'start'], ['en janvier', 'i januari', 'in January']],
  }),
  phrase(D, 'fr-u13-moitie-prix', {
    prompt: 'Säg att du köpte jackan till halva priset', promptEn: 'Say you bought the jacket at half price',
    fr: 'J’ai acheté cette veste à moitié prix.', sv: 'Jag köpte den här jackan till halva priset.', en: 'I bought this jacket at half price.',
    ipa: '/ʒe aʃ.te sɛt vɛst a mwa.tje pʁi/',
    note: '**À moitié prix** = till halva priset, på skyltar **-50 %**. **x** i *prix* är stumt. Ett vanligt ord för extrapris är **en promo**.',
    noteEn: '**À moitié prix** = at half price, shown as **-50 %** on signs. The **x** in *prix* is silent. Another common word for a deal is **en promo**.',
    gloss: [['j’ai acheté', 'jag köpte', 'I bought'], ['cette veste', 'den här jackan', 'this jacket'], ['à moitié prix', 'till halva priset', 'at half price']],
  }),
  phrase(D, 'fr-u13-je-le-prends', {
    prompt: 'Säg att byxorna sitter bra och att du tar dem', promptEn: 'Say the trousers fit you well and you’ll take them',
    fr: 'Ce pantalon me va bien, je le prends.', sv: 'De här byxorna sitter bra på mig, jag tar dem.', en: 'These trousers fit me well, I’ll take them.',
    ipa: '/sə pɑ̃.ta.lɔ̃ mə va bjɛ̃ ʒə lə pʁɑ̃/',
    note: '**Aller à quelqu’un** = passa någon: *ça te va bien*. **Le** står i singular eftersom *pantalon* är singular, där svenskan säger *dem*.',
    noteEn: '**Aller à quelqu’un** = to suit someone: *ça te va bien*. **Le** is singular because *pantalon* is singular, where English says *them*.',
    gloss: [['ce pantalon', 'de här byxorna', 'these trousers'], ['me va bien', 'sitter bra på mig', 'fit me well'], ['je', 'jag', 'I'], ['le', 'dem', 'them'], ['prends', 'tar', 'take']],
  }),
  phrase(D, 'fr-u13-baskets-blanches', {
    prompt: 'Säg att du letar efter vita gympaskor i storlek 40', promptEn: 'Say you’re looking for white trainers in size 40',
    fr: 'Je cherche des baskets blanches en 40.', sv: 'Jag letar efter vita gympaskor i storlek 40.', en: 'I’m looking for white trainers in a 40.',
    ipa: '/ʒə ʃɛʁʃ de bas.kɛt blɑ̃ʃ ɑ̃ ka.ʁɑ̃t/',
    note: 'Färgen står **efter** substantivet och böjs: *baskets* är femininum plural, alltså **blanches**. Slutets **s** i *baskets* hörs inte.',
    noteEn: 'Colours go **after** the noun and agree: *baskets* is feminine plural, hence **blanches**. The final **s** of *baskets* is silent.',
    gloss: [['je', 'jag', 'I'], ['cherche', 'letar efter', 'am looking for'], ['des baskets', 'gympaskor', 'trainers'], ['blanches', 'vita', 'white'], ['en 40', 'i storlek 40', 'in a 40']],
  }),
];
