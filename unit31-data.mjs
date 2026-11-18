// Unité 31 : Histoire & identité (B2, Section 8). Grammaire : mots composés, dérivation (-het, -ning, -bar), passif au passé.
import { vocab, phrase, unitDeck } from './content-helpers.mjs';

export const UNIT31_DECK = unitDeck({
  n: 31, slug: 'swedish-unit-31-history', fr: 'Histoire & identité', en: 'History & identity',
  level: 'B2', section: 'section-8-nuances', after: 'swedish-unit-30-registers',
});
const D = UNIT31_DECK.slug;

export const UNIT31_CARDS = [
  vocab(D, 'u31-historia', {
    prompt: 'Le passé d’un pays : « l’histoire »', promptEn: 'A country’s past: "history"',
    sv: 'historia', fr: 'l’histoire', en: 'history', ipa: '/hɪˈstuːrɪa/',
    note: 'Sans article pour la discipline : *läsa historia*. Défini : *historien*. Une histoire racontée : *en berättelse* (Unité 23).',
  }),
  vocab(D, 'u31-kungen', {
    prompt: 'Le chef de l’État suédois : « le roi »', promptEn: 'Sweden’s head of state: "the king"',
    sv: 'kungen', fr: 'le roi', en: 'the king', ipa: '/ˈkɵŋːɛn/',
    note: 'Défini de *en kung*. Monarchie constitutionnelle : le roi a un rôle uniquement symbolique. La reine : *drottningen*.',
  }),
  vocab(D, 'u31-demokrati', {
    prompt: 'Le pouvoir au peuple : « la démocratie »', promptEn: 'Power to the people: "democracy"',
    sv: 'demokrati', fr: 'la démocratie', en: 'democracy', ipa: '/dɛmʊkraˈtiː/',
    note: 'Accent final, comme en français. Défini : *demokratin*. Le suffrage universel date de 1921.',
  }),
  vocab(D, 'u31-invandring', {
    prompt: 'Le fait de venir s’installer dans un pays : « l’immigration »', promptEn: 'Coming to settle in a country: "immigration"',
    sv: 'invandring', fr: 'l’immigration', en: 'immigration', ipa: '/ˈɪnːˌvandrɪŋ/',
    note: '*in* + *vandra* (marcher, Unité 20) + **-ing**. L’émigration : *utvandring* (des millions de Suédois sont partis en Amérique vers 1900).',
  }),
  vocab(D, 'u31-invandrare', {
    prompt: 'La personne qui s’installe : « un(e) immigré(e) »', promptEn: 'The person who settles: "an immigrant"',
    sv: 'en invandrare', fr: 'un(e) immigré(e)', en: 'an immigrant', ipa: '/ɛn ˈɪnːˌvandrarɛ/',
    note: 'Suffixe **-are** = celui qui fait (*lärare*, *läkare*). Invariable au pluriel. Cf. *SFI, svenska för invandrare* (Unité 10).',
    gloss: [['en', 'un', 'an'], ['invandrare', 'immigré', 'immigrant']],
  }),
  vocab(D, 'u31-samhalle', {
    prompt: 'L’ensemble des citoyens et des institutions : « la société »', promptEn: 'All citizens and institutions together: "society"',
    sv: 'ett samhälle', fr: 'une société', en: 'a society', ipa: '/ɛtː ˈsamːˌhɛlːɛ/',
    accent: 'Accent 2 (Grave)',
    note: 'Mot **ett**. Aussi « une localité ». *samhällskunskap* = éducation civique.',
    gloss: [['ett', 'une', 'a'], ['samhälle', 'société', 'society']],
  }),
  vocab(D, 'u31-jamstalldhet', {
    prompt: 'Égalité des droits entre femmes et hommes : « l’égalité (des sexes) »', promptEn: 'Equal rights for women and men: "gender equality"',
    sv: 'jämställdhet', fr: 'l’égalité femmes-hommes', en: 'gender equality', ipa: '/ˈjɛmːˌstɛldheːt/',
    note: '*jäm* (égal) + *ställd* (placé) + **-het**. Pilier de l’identité suédoise moderne. Égalité en général : *jämlikhet*.',
  }),
  vocab(D, 'u31-neutral', {
    prompt: 'Qui ne prend pas parti dans une guerre : « neutre »', promptEn: 'Not taking sides in a war: "neutral"',
    sv: 'neutral', fr: 'neutre', en: 'neutral', ipa: '/nɛʉˈtrɑːl/',
    note: 'Neutre : *neutralt*. La Suède a été neutre pendant deux siècles, avant d’entrer dans l’OTAN en 2024.',
  }),
  vocab(D, 'u31-vikingarna', {
    prompt: 'Les navigateurs scandinaves du Moyen Âge : « les Vikings »', promptEn: 'The medieval Scandinavian seafarers: "the Vikings"',
    sv: 'vikingarna', fr: 'les Vikings', en: 'the Vikings', ipa: '/ˈviːkɪŋaɳa/',
    note: 'Pluriel défini de *en viking*. Le **rn** final est rétroflexe. Époque : environ 800 à 1050.',
  }),
  vocab(D, 'u31-folkhemmet', {
    prompt: 'Le projet social-démocrate du XXe siècle : « le foyer du peuple »', promptEn: 'The 20th-century social democratic project: "the people\'s home"',
    sv: 'folkhemmet', fr: 'le « foyer du peuple » (modèle suédois)', en: 'the people’s home', ipa: '/ˈfɔlkˌhɛmːɛt/',
    note: '*folk* (peuple) + *hem* (foyer) : la société vue comme une maison commune où personne n’est laissé de côté.',
  }),

  phrase(D, 'u31-lang-historia', {
    prompt: '« La Suède a une longue histoire. »', promptEn: '"Sweden has a long history."',
    sv: 'Sverige har en lång historia.', fr: 'La Suède a une longue histoire.', en: 'Sweden has a long history.',
    ipa: '/ˈsværjɛ hɑːr ɛn lɔŋː hɪˈstuːrɪa/',
    note: 'Ici *historia* prend l’article indéfini, comme en français.',
    gloss: [['Sverige', 'la Suède', 'Sweden'], ['har', 'a', 'has'], ['en', 'une', 'a'], ['lång', 'longue', 'long'], ['historia', 'histoire', 'history']],
  }),
  phrase(D, 'u31-ingen-makt', {
    prompt: '« Le roi n’a aucun pouvoir politique. »', promptEn: '"The king has no political power."',
    sv: 'Kungen har ingen politisk makt.', fr: 'Le roi n’a aucun pouvoir politique.', en: 'The king has no political power.',
    ipa: '/ˈkɵŋːɛn hɑːr ˈɪŋːɛn pʊˈliːtɪsk makt/',
    note: '**ingen** = aucun (mot *en*) ; *inget* (mot *ett*) ; *inga* (pluriel). Plus naturel que *inte någon*.',
    gloss: [['kungen', 'le roi', 'the king'], ['har', 'a', 'has'], ['ingen', 'aucun', 'no'], ['politisk', 'politique', 'political'], ['makt', 'pouvoir', 'power']],
  }),
  phrase(D, 'u31-vikingarna-reste', {
    prompt: '« Les Vikings voyageaient loin. »', promptEn: '"The Vikings travelled far."',
    sv: 'Vikingarna reste långt.', fr: 'Les Vikings voyageaient loin.', en: 'The Vikings travelled far.',
    ipa: '/ˈviːkɪŋaɳa ˈreːstɛ lɔŋt/',
    note: '*resa, reste, har rest*. **långt** = loin (adverbe en **-t**, de *lång*).',
    gloss: [['vikingarna', 'les Vikings', 'the Vikings'], ['reste', 'voyageaient', 'travelled'], ['långt', 'loin', 'far']],
  }),
  phrase(D, 'u31-neutralt-under-kriget', {
    prompt: '« La Suède était neutre pendant la Seconde Guerre mondiale. »', promptEn: '"Sweden was neutral during the Second World War."',
    sv: 'Sverige var neutralt under andra världskriget.', fr: 'La Suède était neutre pendant la Seconde Guerre mondiale.', en: 'Sweden was neutral during the Second World War.',
    ipa: '/ˈsværjɛ vɑːr nɛʉˈtrɑːlt ˈɵnːdɛr ˈandra ˈvæːɖsˌɕriːɡɛt/',
    note: 'Les noms de pays sont neutres : *Sverige är **neutralt***. **under** = pendant (une période). *världskrig* = *värld* (monde) + *krig* (guerre).',
    gloss: [['Sverige', 'la Suède', 'Sweden'], ['var', 'était', 'was'], ['neutralt', 'neutre', 'neutral'], ['under', 'pendant', 'during'], ['andra', 'la Seconde', 'the Second'], ['världskriget', 'Guerre mondiale', 'World War']],
  }),
  phrase(D, 'u31-jamstalldhet-viktigt', {
    prompt: '« L’égalité femmes-hommes est importante dans la société suédoise. »', promptEn: '"Gender equality is important in Swedish society."',
    sv: 'Jämställdhet är viktigt i det svenska samhället.', fr: 'L’égalité femmes-hommes est importante dans la société suédoise.', en: 'Gender equality is important in Swedish society.',
    ipa: '/ˈjɛmːˌstɛldheːt æːr ˈvɪktɪt ɪ deː ˈsvɛnska ˈsamːˌhɛlːɛt/',
    note: 'Notion abstraite sans article → l’adjectif prend souvent **-t** (*viktigt*). Double défini : *det svenska samhället*.',
    gloss: [['jämställdhet', 'l’égalité', 'gender equality'], ['är', 'est', 'is'], ['viktigt', 'importante', 'important'], ['i', 'dans', 'in'], ['det', 'la', 'the'], ['svenska', 'suédoise', 'Swedish'], ['samhället', 'société', 'society']],
  }),
  phrase(D, 'u31-manga-invandrare', {
    prompt: '« Beaucoup d’immigrés sont venus en Suède. »', promptEn: '"Many immigrants have come to Sweden."',
    sv: 'Många invandrare har kommit till Sverige.', fr: 'Beaucoup d’immigrés sont venus en Suède.', en: 'Many immigrants have come to Sweden.',
    ipa: '/ˈmɔŋːa ˈɪnːˌvandrarɛ hɑːr ˈkɔmːɪt tɪlː ˈsværjɛ/',
    note: 'Le suédois utilise toujours **har** au parfait, même pour les verbes de mouvement (*har kommit*), là où le français dit « sont venus ».',
    gloss: [['många', 'beaucoup de', 'many'], ['invandrare', 'immigrés', 'immigrants'], ['har', 'sont', 'have'], ['kommit', 'venus', 'come'], ['till', 'en', 'to'], ['Sverige', 'Suède', 'Sweden']],
  }),
  phrase(D, 'u31-folkhemmet-byggdes', {
    prompt: 'Passif au passé : « Le foyer du peuple a été bâti au XXe siècle. »', promptEn: 'Past passive: "The people\'s home was built in the 20th century."',
    sv: 'Folkhemmet byggdes under 1900-talet.', fr: 'Le foyer du peuple a été bâti au XXe siècle.', en: 'The people’s home was built in the 20th century.',
    ipa: '/ˈfɔlkˌhɛmːɛt ˈbʏɡːdɛs ˈɵnːdɛr ˈnɪtːɔnˌhɵnːdraˌtɑːlɛt/',
    note: 'Les siècles se disent par leur centaine : *1900-talet* (« les années 1900 »). *byggdes* = prétérit passif de *bygga*.',
    gloss: [['folkhemmet', 'le foyer du peuple', 'the people’s home'], ['byggdes', 'a été bâti', 'was built'], ['under', 'pendant', 'in'], ['1900-talet', 'le XXe siècle', 'the 20th century']],
    words: ['Folkhemmet byggdes under nittonhundratalet.'],
  }),
  phrase(D, 'u31-sjalvklarhet', {
    prompt: 'Dérivation en -het : « La démocratie est une évidence pour beaucoup. »', promptEn: 'Derivation with -het: "Democracy is taken for granted by many."',
    sv: 'Demokratin är en självklarhet för många.', fr: 'La démocratie est une évidence pour beaucoup.', en: 'Democracy is taken for granted by many.',
    ipa: '/dɛmʊkraˈtiːn æːr ɛn ˈɧɛlvˌklɑːrheːt fœr ˈmɔŋːa/',
    note: '*själv* (soi-même) + *klar* (clair) = évident ; + **-het** → *självklarhet* (une évidence). *Självklart!* = Bien sûr !',
    gloss: [['demokratin', 'la démocratie', 'democracy'], ['är', 'est', 'is'], ['en', 'une', 'a'], ['självklarhet', 'évidence', 'given'], ['för', 'pour', 'for'], ['många', 'beaucoup', 'many']],
  }),
];
