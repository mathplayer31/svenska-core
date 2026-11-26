// Foundation / Grammar & Syntax V2
// Content rule: only vocabulary already seen in Units 1 to 7.
// The deck unlocks after Unit 7 (see prerequisite_slug in scripts/sync-content.mjs).
// Convention: swedish_prompt = instruction in French, swedish_target = Swedish answer.

const D = 'swedish-grammar-a1';

export const GRAMMAR_CARDS = [
  // ===================== V2 RULE =====================
  {
    slug: 'gram2-v2-idag', deck_slug: D, card_type: 'cloze_grammar',
    swedish_prompt: 'Ordre V2 : remets dans l’ordre, en commençant par « idag » : det / är / varmt / idag',
    swedish_target: 'Idag är det varmt.',
    english_translation: 'Aujourd’hui, il fait chaud.',
    ipa_transcription: '/ɪˈdɑː æːr deː varmt/',
    explanation_md: '**V2** : le verbe conjugué est TOUJOURS le 2e élément. *Idag* prend la 1re place, donc *är* vient juste après et le sujet *det* passe derrière le verbe. Jamais ~~*Idag det är varmt*~~.',
    gloss: [{ sv: 'idag', fr: 'aujourd’hui' }, { sv: 'är', fr: 'est' }, { sv: 'det', fr: 'il' }, { sv: 'varmt', fr: 'chaud' }],
    words: ['Idag är det varmt.'],
  },
  {
    slug: 'gram2-v2-imorgon', deck_slug: D, card_type: 'cloze_grammar',
    swedish_prompt: 'Ordre V2 : Imorgon ___ ___ med min syster. (fikar / jag)',
    swedish_target: 'Imorgon fikar jag med min syster.',
    english_translation: 'Demain, je prends un café avec ma sœur.',
    ipa_transcription: '/ɪˈmɔrːɔn ˈfiːkar jɑː meː mɪnː ˈsʏstɛr/',
    explanation_md: 'Même règle avec un sujet *jag* : *Jag fikar imorgon* (sujet en tête) **ou** *Imorgon fikar jag* (inversion). Le verbe ne quitte jamais la 2e place.',
    gloss: [{ sv: 'imorgon', fr: 'demain' }, { sv: 'fikar', fr: 'prends le café' }, { sv: 'jag', fr: 'je' }, { sv: 'med', fr: 'avec' }, { sv: 'min', fr: 'ma' }, { sv: 'syster', fr: 'sœur' }],
    words: ['Imorgon fikar jag med min syster.'],
  },
  {
    slug: 'gram2-v2-igar', deck_slug: D, card_type: 'cloze_grammar',
    swedish_prompt: 'Ordre V2 au passé : Igår ___ ___ försenat. (var / tåget)',
    swedish_target: 'Igår var tåget försenat.',
    english_translation: 'Hier, le train était en retard.',
    ipa_transcription: '/ɪˈɡoːr vɑːr ˈtoːɡɛt fœˈʂeːnat/',
    explanation_md: 'Au passé aussi : *Igår* (1) **var** (2) *tåget* (3). Le sujet peut être un groupe (*tåget*), il passe quand même après le verbe.',
    gloss: [{ sv: 'igår', fr: 'hier' }, { sv: 'var', fr: 'était' }, { sv: 'tåget', fr: 'le train' }, { sv: 'försenat', fr: 'en retard' }],
    words: ['Igår var tåget försenat.'],
  },
  {
    slug: 'gram2-question-ja-nej', deck_slug: D, card_type: 'cloze_grammar',
    swedish_prompt: 'Question oui/non : « Tu as un frère ? » (verbe en premier)',
    swedish_target: 'Har du en bror?',
    english_translation: 'Tu as un frère ?',
    ipa_transcription: '/hɑːr dʉː ɛn bruːr/',
    explanation_md: 'Question fermée = **verbe + sujet** : *Har du…?*, *Talar du…?*, *Kan jag…?* Pas d’équivalent de « est-ce que ».',
    gloss: [{ sv: 'har', fr: 'as' }, { sv: 'du', fr: 'tu' }, { sv: 'en', fr: 'un' }, { sv: 'bror', fr: 'frère' }],
    words: ['Har du en bror?'],
  },
  {
    slug: 'gram2-question-mot', deck_slug: D, card_type: 'cloze_grammar',
    swedish_prompt: 'Question avec mot interrogatif : « Quand part le bus ? » (när / bussen / går)',
    swedish_target: 'När går bussen?',
    english_translation: 'Quand part le bus ?',
    ipa_transcription: '/næːr ɡoːr ˈbɵsːɛn/',
    explanation_md: 'Le mot interrogatif (*när, var, vad, hur*) occupe la 1re place, le verbe la 2e, le sujet ensuite : *Vad heter du?*, *Var är stationen?*',
    gloss: [{ sv: 'när', fr: 'quand' }, { sv: 'går', fr: 'part' }, { sv: 'bussen', fr: 'le bus' }],
    words: ['När går bussen?'],
  },

  // ===================== NEGATION =====================
  {
    slug: 'gram2-inte', deck_slug: D, card_type: 'cloze_grammar',
    swedish_prompt: 'Négation : Jag ___ ___ engelska. (talar + inte)',
    swedish_target: 'Jag talar inte engelska.',
    english_translation: 'Je ne parle pas anglais.',
    ipa_transcription: '/jɑː ˈtɑːlar ˈɪnːtɛ ˈɛŋɛlska/',
    explanation_md: '**inte** = ne… pas, en un seul mot, placé juste **après le verbe** conjugué.',
    gloss: [{ sv: 'jag', fr: 'je' }, { sv: 'talar', fr: 'parle' }, { sv: 'inte', fr: 'ne… pas' }, { sv: 'engelska', fr: 'anglais' }],
    words: ['Jag talar inte engelska.'],
  },
  {
    slug: 'gram2-inte-v2', deck_slug: D, card_type: 'cloze_grammar',
    swedish_prompt: 'Négation + inversion : Idag ___ ___ ___. (regnar / det / inte)',
    swedish_target: 'Idag regnar det inte.',
    english_translation: 'Aujourd’hui, il ne pleut pas.',
    ipa_transcription: '/ɪˈdɑː ˈrɛŋnar deː ˈɪnːtɛ/',
    explanation_md: 'Avec l’inversion, *inte* se place après le **sujet** : *Idag regnar det inte* (et pas ~~*Idag regnar inte det*~~ quand le sujet est un pronom).',
    gloss: [{ sv: 'idag', fr: 'aujourd’hui' }, { sv: 'regnar', fr: 'pleut' }, { sv: 'det', fr: 'il' }, { sv: 'inte', fr: 'ne… pas' }],
    words: ['Idag regnar det inte.'],
  },

  // ===================== POSSESSIVES =====================
  {
    slug: 'gram2-sin', deck_slug: D, card_type: 'cloze_grammar',
    swedish_prompt: 'Possessif réfléchi : Han fikar med ___ flickvän. (sa propre copine)',
    swedish_target: 'Han fikar med sin flickvän.',
    english_translation: 'Il prend le café avec sa (propre) copine.',
    ipa_transcription: '/hanː ˈfiːkar meː sɪnː ˈflɪkːˌvɛn/',
    explanation_md: '**sin** renvoie au sujet (*han*) : c’est SA copine à lui. *en flickvän* → **sin** ; un mot *ett* → **sitt** ; pluriel → **sina**.',
    gloss: [{ sv: 'han', fr: 'il' }, { sv: 'fikar', fr: 'prend le café' }, { sv: 'med', fr: 'avec' }, { sv: 'sin', fr: 'sa (propre)' }, { sv: 'flickvän', fr: 'copine' }],
    words: ['Han fikar med sin flickvän.'],
  },
  {
    slug: 'gram2-hans', deck_slug: D, card_type: 'cloze_grammar',
    swedish_prompt: 'Piège : Erik fikar med ___ syster. (la sœur d’un AUTRE homme)',
    swedish_target: 'Erik fikar med hans syster.',
    english_translation: 'Erik prend le café avec sa sœur (la sœur d’un autre homme).',
    ipa_transcription: '/ˈeːrɪk ˈfiːkar meː hanːs ˈsʏstɛr/',
    explanation_md: '**hans** ne renvoie jamais au sujet. *Erik fikar med sin syster* = sa propre sœur ; *…med hans syster* = la sœur d’un autre homme.',
    gloss: [{ sv: 'Erik', fr: 'Erik' }, { sv: 'fikar', fr: 'prend le café' }, { sv: 'med', fr: 'avec' }, { sv: 'hans', fr: 'sa (à un autre)' }, { sv: 'syster', fr: 'sœur' }],
    words: ['Erik fikar med hans syster.'],
  },

  // ===================== AGREEMENT & DEFINITE FORM =====================
  {
    slug: 'gram2-adj-ett', deck_slug: D, card_type: 'cloze_grammar',
    swedish_prompt: 'Accord de l’adjectif : Det är ett ___ bord. (fin, mot ett)',
    swedish_target: 'Det är ett fint bord.',
    english_translation: 'C’est une belle table.',
    ipa_transcription: '/deː æːr ɛtː fiːnt buːɖ/',
    explanation_md: 'Avec un mot **ett**, l’adjectif prend **-t** : *ett fint bord*, *ett dyrt vin*. Avec un mot **en**, il reste nu : *en fin kopp*. Même logique que *Det är dyrt* ou *Vilket fint väder!*',
    gloss: [{ sv: 'det', fr: 'c’' }, { sv: 'är', fr: 'est' }, { sv: 'ett', fr: 'une' }, { sv: 'fint', fr: 'belle' }, { sv: 'bord', fr: 'table' }],
    words: ['Det är ett fint bord.'],
  },
  {
    slug: 'gram2-defini', deck_slug: D, card_type: 'cloze_grammar',
    swedish_prompt: 'Forme définie : « le billet » (en biljett) / « la table » (ett bord)',
    swedish_target: 'biljetten / bordet',
    english_translation: 'le billet / la table',
    ipa_transcription: '/bɪlˈjɛtːɛn/ / /ˈbuːɖɛt/',
    explanation_md: 'L’article défini se colle **à la fin** : mot *en* → **-en** (*biljetten*, *bussen*), mot *ett* → **-et** (*bordet*, *tåget*). Après une voyelle : *-n* / *-t* (*påsen*, *kvittot*).',
    words: ['biljetten', 'bordet'],
  },
  {
    slug: 'gram2-den-har', deck_slug: D, card_type: 'cloze_grammar',
    swedish_prompt: 'Démonstratif : « ce train-ci » (ett tåg)',
    swedish_target: 'det här tåget',
    english_translation: 'ce train-ci',
    ipa_transcription: '/deː hæːr ˈtoːɡɛt/',
    explanation_md: '*den här* (mot *en*) / *det här* (mot *ett*) + nom **défini** : *den här bussen*, *det här tåget*. Le nom garde sa terminaison définie, c’est le double marquage suédois.',
    gloss: [{ sv: 'det', fr: 'ce' }, { sv: 'här', fr: 'ici' }, { sv: 'tåget', fr: 'le train' }],
    words: ['det här tåget'],
  },
];
