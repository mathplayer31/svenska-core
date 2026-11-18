// FranceCore, Unité 29 : Argumenter (connecteurs, concession, nuancer, réfuter).
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT29_DECK = unitDeck({
  n: 29, slug: 'fr-unit-29-arguing', sv: 'Argumentera', en: 'Arguing a point',
  level: 'B2', section: 'fr-section-8-nuances', after: 'fr-unit-28-idioms',
});
const D = UNIT29_DECK.slug;

export const UNIT29_CARDS = [
  // ===================== MOTS =====================
  vocab(D, 'fr-u29-cependant', {
    prompt: 'Sambandsord för motsats, i formell stil', promptEn: 'Linking word for contrast, formal style',
    fr: 'cependant', sv: 'emellertid / dock', en: 'however',
    ipa: '/sə.pɑ̃.dɑ̃/',
    note: 'Ett av de vanligaste sambandsorden i franska uppsatser, där man förväntas binda ihop argumenten tydligt. I talspråk säger man hellre **mais**.',
    noteEn: 'One of the most common connectors in French essays, where arguments are expected to be explicitly linked. In speech people simply say **mais**.',
  }),
  vocab(D, 'fr-u29-neanmoins', {
    prompt: 'Trots det, i skriftspråk', promptEn: 'Even so, in writing',
    fr: 'néanmoins', sv: 'likväl / ändå', en: 'nevertheless',
    ipa: '/ne.ɑ̃.mwɛ̃/',
    note: 'Mer formellt än *cependant*. Används ofta för att erkänna ett argument och ändå hålla fast vid sin linje. **s** på slutet är stumt.',
    noteEn: 'More formal than *cependant*. Often used to acknowledge a point while holding your line. The final **s** is silent.',
  }),
  vocab(D, 'fr-u29-en-revanche', {
    prompt: 'Däremot, när man ställer två saker mot varandra', promptEn: 'On the other hand, when contrasting two things',
    fr: 'en revanche', sv: 'däremot / å andra sidan', en: 'on the other hand / by contrast',
    ipa: '/ɑ̃ ʁə.vɑ̃ʃ/',
    note: 'I vardagen säger man **par contre**, som puristerna länge kritiserade. I skrift är *en revanche* säkrare. **une revanche** betyder annars revansch.',
    noteEn: 'In everyday speech people say **par contre**, long frowned on by purists. In writing *en revanche* is the safer choice. On its own, **une revanche** means revenge or a rematch.',
  }),
  vocab(D, 'fr-u29-pourtant', {
    prompt: 'Uttryck för att något är oväntat', promptEn: 'Marks that something is unexpected',
    fr: 'pourtant', sv: 'ändå / trots allt', en: 'yet / and yet',
    ipa: '/puʁ.tɑ̃/',
    note: 'Betonar en överraskande motsats: *Il est riche, et pourtant il n’est pas heureux.* Kan stå mitt i satsen: *C’est pourtant simple !* = det är ju enkelt!',
    noteEn: 'Stresses a surprising contrast: *Il est riche, et pourtant il n’est pas heureux.* It can sit mid-sentence: *C’est pourtant simple !* = but it’s simple!',
  }),
  vocab(D, 'fr-u29-en-effet', {
    prompt: 'Bekräftar eller förklarar det som just sagts', promptEn: 'Confirms or explains what was just said',
    fr: 'en effet', sv: 'mycket riktigt / nämligen', en: 'indeed / in fact',
    ipa: '/ɑ̃.n‿e.fɛ/',
    note: 'Lätt att missförstå: **en effet** bekräftar eller förklarar det som just sagts, ungefär ”det är nämligen så att”: *Il était fatigué. En effet, il avait travaillé toute la nuit.* Bindning: [ɑ̃nefɛ].',
    noteEn: 'False friend: **en effet** does not mean "in effect"; it confirms or explains: *Il était fatigué. En effet, il avait travaillé toute la nuit.* Liaison: [ɑ̃nefɛ].',
  }),
  vocab(D, 'fr-u29-dailleurs', {
    prompt: 'För övrigt, när man lägger till ett argument', promptEn: 'Besides, when adding a further point',
    fr: 'd’ailleurs', sv: 'för övrigt / förresten', en: 'besides / incidentally',
    ipa: '/da.jœʁ/',
    note: 'Förväxla inte med **ailleurs** = någon annanstans. *D’ailleurs* lägger till ett stöd för det man nyss sa, ofta med en personlig ton.',
    noteEn: 'Don’t confuse with **ailleurs** = elsewhere. *D’ailleurs* adds support to what you just said, often with a personal touch.',
  }),
  vocab(D, 'fr-u29-certes', {
    prompt: 'Visserligen, inför en motsägelse', promptEn: 'Admittedly, before a counterpoint',
    fr: 'certes', sv: 'visserligen', en: 'admittedly / granted',
    ipa: '/sɛʁt/',
    note: 'Inleder en eftergift som nästan alltid följs av **mais**: *Certes ..., mais ...* = visserligen ..., men ... Klassisk struktur i franska uppsatser. Slutets **s** är stumt.',
    noteEn: 'Opens a concession that is almost always followed by **mais**: *Certes ..., mais ...* = admittedly ..., but ... A classic structure in French essays. The **s** is silent.',
  }),
  vocab(D, 'fr-u29-or', {
    prompt: 'Sambandsord som inför ett avgörande faktum', promptEn: 'Connector that introduces a decisive fact',
    fr: 'or', sv: 'nu är det så att / men', en: 'now / yet',
    ipa: '/ɔʁ/',
    note: 'Ett litet ord som saknar direkt motsvarighet. Det för in ett nytt faktum som ändrar resonemanget: *Il faut un diplôme. Or, il n’en a pas.* Samma uttal som **l’or** (guld).',
    noteEn: 'A small word with no exact equivalent. It introduces a new fact that shifts the argument: *Il faut un diplôme. Or, il n’en a pas.* (You need a degree. Now, he doesn’t have one.) Sounds like **l’or** (gold).',
  }),
  vocab(D, 'fr-u29-par-consequent', {
    prompt: 'Följaktligen', promptEn: 'As a result',
    fr: 'par conséquent', sv: 'följaktligen / därför', en: 'consequently / therefore',
    ipa: '/paʁ kɔ̃.se.kɑ̃/',
    note: 'Formellt alternativ till *donc*. Andra varianter: **c’est pourquoi** (det är därför) och **ainsi** (således). Slutets **t** är stumt.',
    noteEn: 'A formal alternative to *donc*. Other options: **c’est pourquoi** (that is why) and **ainsi** (thus). The final **t** is silent.',
  }),
  vocab(D, 'fr-u29-dune-part', {
    prompt: 'Å ena sidan ... å andra sidan', promptEn: 'On the one hand ... on the other',
    fr: 'd’une part ... d’autre part', sv: 'dels ... dels', en: 'on the one hand ... on the other hand',
    ipa: '/dyn paʁ dotʁ paʁ/',
    note: 'Obs: på franska radar uttrycket ofta upp två argument åt samma håll, som svenskans *dels ... dels*, inte bara två motsatta. För motsats säger man *d’un côté ... de l’autre*.',
    noteEn: 'Careful: in French this often lists two points in the same direction ("firstly ... secondly"), not just two opposing ones. For contrast use *d’un côté ... de l’autre*.',
  }),
  vocab(D, 'fr-u29-nuancer', {
    prompt: 'Göra ett påstående mindre svartvitt', promptEn: 'Make a claim less black-and-white',
    fr: 'nuancer', sv: 'nyansera', en: 'to qualify / to add nuance',
    ipa: '/nɥɑ̃.se/',
    note: 'Att nyansera ses som ett tecken på intellektuell mognad i fransk debatt: *Il faut nuancer ce propos.* **ç** behövs i *nous nuançons* för att behålla [s]-ljudet.',
    noteEn: 'Adding nuance is seen as a sign of intellectual maturity in French debate: *Il faut nuancer ce propos.* The **ç** in *nous nuançons* keeps the [s] sound.',
  }),
  vocab(D, 'fr-u29-refuter', {
    prompt: 'Visa att ett argument är fel', promptEn: 'Show that an argument is wrong',
    fr: 'réfuter', sv: 'vederlägga / motbevisa', en: 'to refute / to rebut',
    ipa: '/ʁe.fy.te/',
    note: 'Formellt ord. I vardagen: **contester** eller *démonter un argument* (plocka isär ett argument).',
    noteEn: 'A formal word. In everyday speech: **contester** or *démonter un argument* (to take an argument apart).',
  }),

  // ===================== PHRASES =====================
  phrase(D, 'fr-u29-certes-mais', {
    prompt: 'Medge en fördel men invänd med kostnaden', promptEn: 'Grant a merit but object on cost',
    fr: 'Certes, l’idée est séduisante, mais elle coûte cher.', sv: 'Visserligen är idén lockande, men den är dyr.', en: 'Admittedly, the idea is appealing, but it’s expensive.',
    ipa: '/sɛʁt li.de ɛ se.dɥi.zɑ̃t mɛ ɛl kut ʃɛʁ/',
    note: '**séduisant** = lockande, tilltalande, används gärna om idéer, inte bara om personer. **coûter cher**: *cher* böjs inte här, eftersom det fungerar som adverb.',
    noteEn: '**séduisant** = appealing, used readily of ideas, not just people. **coûter cher**: *cher* does not agree here, as it works as an adverb.',
    gloss: [['certes', 'visserligen', 'admittedly'], ['l’idée', 'idén', 'the idea'], ['est', 'är', 'is'], ['séduisante', 'lockande', 'appealing'], ['mais', 'men', 'but'], ['elle', 'den', 'it'], ['coûte cher', 'är dyr', 'is expensive']],
  }),
  phrase(D, 'fr-u29-partage-avis', {
    prompt: 'Säg artigt att du inte riktigt håller med', promptEn: 'Politely say you don’t quite agree',
    fr: 'Je ne partage pas tout à fait votre avis.', sv: 'Jag delar inte riktigt er uppfattning.', en: 'I don’t entirely share your view.',
    ipa: '/ʒə nə paʁ.taʒ pa tu.t‿a fɛ vɔ.tʁ a.vi/',
    note: '**pas tout à fait** (inte riktigt) mildrar oenigheten, ett typiskt franskt sätt att säga emot. **un avis** är en åsikt; *à mon avis* = enligt min mening.',
    noteEn: '**pas tout à fait** (not quite) softens the disagreement, a typical French way of pushing back. **un avis** is an opinion; *à mon avis* = in my opinion.',
    gloss: [['je', 'jag', 'I'], ['ne partage pas', 'delar inte', 'don’t share'], ['tout à fait', 'riktigt', 'entirely'], ['votre', 'er', 'your'], ['avis', 'uppfattning', 'view']],
  }),
  phrase(D, 'fr-u29-je-vous-accorde', {
    prompt: 'Ge motparten rätt på en punkt', promptEn: 'Concede a point to the other side',
    fr: 'Je vous accorde que la situation est complexe.', sv: 'Jag ger er rätt i att situationen är komplicerad.', en: 'I grant you that the situation is complex.',
    ipa: '/ʒə vu.z‿a.kɔʁd kə la si.tɥa.sjɔ̃ ɛ kɔ̃.plɛks/',
    note: '**accorder que** följs av indikativ, eftersom man medger ett faktum. Ett elegant sätt att förbereda sitt motargument.',
    noteEn: '**accorder que** takes the indicative, since you are conceding a fact. An elegant way to set up your counterargument.',
    gloss: [['je', 'jag', 'I'], ['vous', 'er', 'you'], ['accorde', 'medger', 'grant'], ['que', 'att', 'that'], ['la situation', 'situationen', 'the situation'], ['est', 'är', 'is'], ['complexe', 'komplicerad', 'complex']],
  }),
  phrase(D, 'fr-u29-nen-demeure-pas-moins', {
    prompt: 'Håll fast vid att problemet kvarstår', promptEn: 'Insist that the problem remains',
    fr: 'Il n’en demeure pas moins que le problème reste entier.', sv: 'Det ändrar inte det faktum att problemet kvarstår.', en: 'The fact remains that the problem is still unresolved.',
    ipa: '/il nɑ̃ də.mœʁ pa mwɛ̃ kə lə pʁɔ.blɛm ʁɛst ɑ̃.tje/',
    note: 'Ett formellt, mycket franskt uttryck för att avfärda motargument: ”det kvarstår inte desto mindre att”. **rester entier** = förbli olöst, ordagrant ”förbli helt”.',
    noteEn: 'A formal, very French way of brushing aside counterarguments: "it remains none the less that". **rester entier** = to remain unresolved, literally "to remain whole".',
    gloss: [['il n’en demeure pas moins', 'det kvarstår inte desto mindre', 'it remains none the less'], ['que', 'att', 'that'], ['le problème', 'problemet', 'the problem'], ['reste', 'förblir', 'remains'], ['entier', 'olöst', 'unresolved']],
  }),
  phrase(D, 'fr-u29-tient-pas-la-route', {
    prompt: 'Säg att argumentet inte håller', promptEn: 'Say the argument doesn’t hold up',
    fr: 'Cet argument ne tient pas la route.', sv: 'Det argumentet håller inte.', en: 'That argument doesn’t hold water.',
    ipa: '/sɛ.t‿aʁ.ɡy.mɑ̃ nə tjɛ̃ pa la ʁut/',
    note: 'Ordagrant ”håller inte vägen”, som en bil som inte klarar kurvorna. **cet** används framför vokal i maskulinum: *cet argument*, men *ce problème*.',
    noteEn: 'Literally "doesn’t hold the road", like a car that can’t take the bends. **cet** is used before a vowel in the masculine: *cet argument*, but *ce problème*.',
    gloss: [['cet argument', 'det argumentet', 'that argument'], ['ne tient pas', 'håller inte', 'doesn’t hold'], ['la route', 'vägen', 'the road']],
  }),
  phrase(D, 'fr-u29-autrement-dit', {
    prompt: 'Sammanfatta med andra ord att inget förändras', promptEn: 'Sum up in other words that nothing changes',
    fr: 'Autrement dit, rien ne change.', sv: 'Med andra ord förändras ingenting.', en: 'In other words, nothing changes.',
    ipa: '/o.tʁə.mɑ̃ di ʁjɛ̃ nə ʃɑ̃ʒ/',
    note: '**autrement dit** = med andra ord, ordagrant ”annorlunda sagt”. **rien** som subjekt kräver **ne** före verbet, men inget *pas*.',
    noteEn: '**autrement dit** = in other words, literally "otherwise said". **rien** as subject needs **ne** before the verb, but no *pas*.',
    gloss: [['autrement dit', 'med andra ord', 'in other words'], ['rien', 'ingenting', 'nothing'], ['ne', '(inte)', '(not)'], ['change', 'förändras', 'changes']],
  }),
  phrase(D, 'fr-u29-loin-de-moi', {
    prompt: 'Säg emot artigt men bestämt', promptEn: 'Contradict politely but firmly',
    fr: 'Loin de moi l’idée de vous contredire, mais les chiffres disent autre chose.', sv: 'Jag vill inte motsäga er, men siffrorna säger något annat.', en: 'Far be it from me to contradict you, but the figures say otherwise.',
    ipa: '/lwɛ̃ də mwa li.de də vu kɔ̃.tʁə.diʁ mɛ le ʃi.fʁə diz o.tʁə ʃoz/',
    note: 'Den artiga inledningen förebådar just en motsägelse. Fälla: **vous contredisez** (ni motsäger), inte *contredites* som *vous dites*.',
    noteEn: 'The polite opener announces exactly the contradiction it claims to avoid. Trap: **vous contredisez**, not *contredites* like *vous dites*.',
    gloss: [['loin de moi', 'långt ifrån mig', 'far from me'], ['l’idée', 'tanken', 'the idea'], ['de vous contredire', 'att motsäga er', 'of contradicting you'], ['mais', 'men', 'but'], ['les chiffres', 'siffrorna', 'the figures'], ['disent', 'säger', 'say'], ['autre chose', 'något annat', 'something else']],
  }),
  phrase(D, 'fr-u29-en-somme', {
    prompt: 'Avsluta resonemanget', promptEn: 'Wrap up the argument',
    fr: 'En somme, chacun a ses raisons.', sv: 'Kort sagt har alla sina skäl.', en: 'In short, everyone has their reasons.',
    ipa: '/ɑ̃ sɔm ʃa.kœ̃ a se ʁɛ.zɔ̃/',
    note: '**en somme** = sammanfattningsvis. Andra avslutningar: **en définitive**, **pour conclure**. **chacun** (var och en) är singular: *chacun a*, inte *ont*.',
    noteEn: '**en somme** = in short. Other closers: **en définitive**, **pour conclure**. **chacun** (each one) is singular: *chacun a*, not *ont*.',
    gloss: [['en somme', 'kort sagt', 'in short'], ['chacun', 'var och en', 'everyone'], ['a', 'har', 'has'], ['ses raisons', 'sina skäl', 'their reasons']],
  }),
];
