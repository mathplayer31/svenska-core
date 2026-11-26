// Unit 28: Idioms (B2, Section 8). Fixed expressions and how to use them in context.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT28_DECK = unitDeck({
  n: 28, slug: 'swedish-unit-28-idioms', fr: 'Expressions idiomatiques', en: 'Idioms',
  level: 'B2', section: 'section-8-nuances', after: 'swedish-unit-27-climate',
});
const D = UNIT28_DECK.slug;

export const UNIT28_CARDS = [
  vocab(D, 'u28-lagom', {
    prompt: 'Le mot le plus suédois qui soit : « juste ce qu’il faut »', promptEn: 'The most Swedish word there is: "just right"',
    sv: 'lagom', fr: 'juste ce qu’il faut / ni trop ni trop peu', en: 'just right / not too much, not too little', ipa: '/ˈlɑːɡɔm/',
    note: 'Ni trop, ni trop peu : la juste mesure, valeur culturelle centrale. *lagom varmt* = juste à la bonne température.',
  }),
  vocab(D, 'u28-ta-det-lugnt', {
    prompt: 'Pour calmer quelqu’un : « du calme / prends ton temps »', promptEn: 'To calm someone down: "take it easy"',
    sv: 'ta det lugnt', fr: 'du calme / prends ton temps', en: 'take it easy', ipa: '/tɑː deː lɵŋnt/',
    note: 'Litt. « prends-le calmement ». Aussi pour dire au revoir : *Ta det lugnt!* (À plus, sois cool).',
    gloss: [['ta', 'prends', 'take'], ['det', 'le', 'it'], ['lugnt', 'calmement', 'easy']],
  }),
  vocab(D, 'u28-ingen-fara', {
    prompt: 'Pour rassurer après une excuse : « pas de souci »', promptEn: 'To reassure after an apology: "no worries"',
    sv: 'ingen fara', fr: 'pas de souci / pas de problème', en: 'no worries / no problem', ipa: '/ˈɪŋːɛn ˈfɑːra/',
    note: 'Litt. « aucun danger ». Réponse naturelle à *Förlåt!* (pardon).',
    gloss: [['ingen', 'aucun', 'no'], ['fara', 'danger', 'danger']],
  }),
  vocab(D, 'u28-halla-tummarna', {
    prompt: 'Souhaiter bonne chance : « croiser les doigts »', promptEn: 'Wishing good luck: "keep your fingers crossed"',
    sv: 'hålla tummarna', fr: 'croiser les doigts', en: 'keep your fingers crossed', ipa: '/ˈhɔlːa ˈtɵmːaɳa/',
    note: 'Litt. « tenir les pouces » : on serre les pouces dans les poings.',
    gloss: [['hålla', 'tenir', 'hold'], ['tummarna', 'les pouces', 'the thumbs']],
  }),
  vocab(D, 'u28-det-ordnar-sig', {
    prompt: 'Rassurer sur l’avenir : « ça va s’arranger »', promptEn: 'Reassuring about the future: "it will work out"',
    sv: 'det ordnar sig', fr: 'ça va s’arranger', en: 'it will work out', ipa: '/deː ˈoːɖnar sɛj/',
    note: '*ordna* = arranger, organiser. Formule d’optimisme tranquille, très suédoise.',
    gloss: [['det', 'ça', 'it'], ['ordnar', 'arrange', 'sorts'], ['sig', 'se', 'itself out']],
  }),
  vocab(D, 'u28-tack-for-senast', {
    prompt: 'Le remerciement après une soirée : « merci pour la dernière fois »', promptEn: 'The thank-you after an evening together: "thanks for last time"',
    sv: 'tack för senast', fr: 'merci pour la dernière fois', en: 'thanks for last time', ipa: '/takː fœr ˈseːnast/',
    note: 'Politesse obligatoire : on remercie la prochaine fois qu’on revoit son hôte, même des semaines après.',
    gloss: [['tack', 'merci', 'thanks'], ['för', 'pour', 'for'], ['senast', 'la dernière fois', 'last time']],
  }),
  vocab(D, 'u28-inte-min-kopp-te', {
    prompt: 'Ce qui ne te plaît pas trop : « pas mon truc »', promptEn: 'Something you don’t really like: "not my cup of tea"',
    sv: 'inte min kopp te', fr: 'pas mon truc', en: 'not my cup of tea', ipa: '/ˈɪnːtɛ mɪnː kɔpː teː/',
    note: 'Calque de l’anglais, très courant. *en kopp te* : Unité 2.',
    gloss: [['inte', 'pas', 'not'], ['min', 'ma', 'my'], ['kopp', 'tasse', 'cup'], ['te', 'thé', 'of tea']],
  }),
  vocab(D, 'u28-ingen-ko-pa-isen', {
    prompt: 'Il n’y a pas d’urgence : « il n’y a pas le feu »', promptEn: 'There is no rush: "no need to worry / no rush"',
    sv: 'ingen ko på isen', fr: 'il n’y a pas le feu / pas de panique', en: 'no rush / nothing to worry about', ipa: '/ˈɪŋːɛn kuː poː ˈiːsɛn/',
    note: 'Litt. « pas de vache sur la glace » : tant que la vache n’est pas sur la glace, rien ne presse.',
    gloss: [['ingen', 'aucune', 'no'], ['ko', 'vache', 'cow'], ['på', 'sur', 'on'], ['isen', 'la glace', 'the ice']],
  }),
  vocab(D, 'u28-smaken-ar-som-baken', {
    prompt: 'Chacun ses goûts (familier) : « les goûts et les couleurs »', promptEn: 'To each their own (informal): "there’s no accounting for taste"',
    sv: 'smaken är som baken', fr: 'les goûts et les couleurs (familier)', en: 'to each their own (informal)', ipa: '/ˈsmɑːkɛn æːr sɔmː ˈbɑːkɛn/',
    note: 'Litt. « le goût, c’est comme les fesses : chacun a le sien ». Familier mais très courant, sans être grossier.',
    gloss: [['smaken', 'le goût', 'taste'], ['är', 'est', 'is'], ['som', 'comme', 'like'], ['baken', 'les fesses', 'the bottom']],
  }),
  vocab(D, 'u28-ingen-konst', {
    prompt: 'Quelque chose de facile : « ce n’est pas sorcier »', promptEn: 'Something easy: "it\'s no big deal / it\'s not rocket science"',
    sv: 'det är ingen konst', fr: 'ce n’est pas sorcier', en: 'it’s nothing difficult', ipa: '/deː æːr ˈɪŋːɛn kɔnst/',
    note: 'Litt. « ce n’est pas un art ». *konst* = art (*konstmuseum*).',
    gloss: [['det', 'ce', 'it'], ['är', 'est', 'is'], ['ingen', 'aucun', 'no'], ['konst', 'art', 'art']],
  }),

  // Additions (issue #14)
  vocab(D, 'u28-rakmacka', {
    prompt: 'Réussir sans effort, grâce à d’autres', promptEn: 'Succeeding effortlessly, thanks to others',
    sv: 'glida in på en räkmacka', fr: 'avoir tout servi sur un plateau', en: 'have it handed to you on a plate', ipa: '/ˈɡliːda ɪn poː ɛn ˈrɛːkˌmakːa/',
    note: 'Littéralement « glisser sur un sandwich aux crevettes ». Se dit de quelqu’un de privilégié.',
    gloss: [['glida in', 'glisser', 'slide in'], ['på', 'sur', 'on'], ['en', 'un', 'a'], ['räkmacka', 'sandwich aux crevettes', 'shrimp sandwich']],
  }),
  vocab(D, 'u28-ana-ugglor', {
    prompt: 'Se douter que quelque chose cloche', promptEn: 'Suspecting something is wrong',
    sv: 'ana ugglor i mossen', fr: 'flairer quelque chose de louche', en: 'smell a rat', ipa: '/ˈɑːna ˈɵɡːlɔr ɪ ˈmɔsːɛn/',
    note: 'Littéralement « soupçonner des hiboux dans le marais ». *Jag anar ugglor i mossen.*',
    gloss: [['ana', 'soupçonner', 'suspect'], ['ugglor', 'des hiboux', 'owls'], ['i', 'dans', 'in'], ['mossen', 'le marais', 'the bog']],
  }),
  vocab(D, 'u28-lok-pa-laxen', {
    prompt: 'Aggraver une situation déjà mauvaise', promptEn: 'Making a bad situation worse',
    sv: 'lägga lök på laxen', fr: 'en rajouter une couche', en: 'add insult to injury', ipa: '/ˈlɛɡːa løːk poː ˈlaksɛn/',
    note: 'Littéralement « mettre de l’oignon sur le saumon ». Ironique : on gâche ce qui était déjà là.',
    gloss: [['lägga', 'mettre', 'put'], ['lök', 'oignon', 'onion'], ['på', 'sur', 'on'], ['laxen', 'le saumon', 'the salmon']],
  }),
  vocab(D, 'u28-korvspad', {
    prompt: 'Quelque chose d’évident : « clair comme de l’eau de roche »', promptEn: 'Something obvious: "crystal clear"',
    sv: 'klart som korvspad', fr: 'clair comme de l’eau de roche', en: 'crystal clear', ipa: '/klɑːʈ sɔm ˈkɔrvˌspɑːd/',
    note: 'Littéralement « clair comme l’eau de cuisson des saucisses ». Souvent ironique : *Det är väl klart som korvspad!*',
    gloss: [['klart', 'clair', 'clear'], ['som', 'comme', 'as'], ['korvspad', 'eau des saucisses', 'sausage water']],
  }),
  vocab(D, 'u28-smor-i-smaland', {
    prompt: 'Refuser catégoriquement : « pour rien au monde »', promptEn: 'Refusing flatly: "not for all the tea in China"',
    sv: 'inte för allt smör i Småland', fr: 'pour rien au monde', en: 'not for all the tea in China', ipa: '/ˈɪntɛ fœr alt smœːr ɪ ˈsmoːland/',
    note: 'Littéralement « pas pour tout le beurre du Småland », une région agricole.',
    gloss: [['inte', 'pas', 'not'], ['för', 'pour', 'for'], ['allt', 'tout', 'all'], ['smör', 'beurre', 'butter'], ['i', 'en', 'in'], ['Småland', 'Småland', 'Småland']],
  }),
  vocab(D, 'u28-over-en-kam', {
    prompt: 'Juger tout le monde pareil : « mettre tout le monde dans le même sac »', promptEn: 'Judging everyone alike: "tar everyone with the same brush"',
    sv: 'dra alla över en kam', fr: 'mettre tout le monde dans le même sac', en: 'tar everyone with the same brush', ipa: '/drɑː ˈalːa ˈøːvɛr ɛn kamː/',
    note: 'Littéralement « passer tout le monde au même peigne ». *Man ska inte dra alla över en kam.*',
    gloss: [['dra', 'passer', 'pull'], ['alla', 'tout le monde', 'everyone'], ['över', 'sur', 'over'], ['en', 'un', 'one'], ['kam', 'peigne', 'comb']],
  }),
  phrase(D, 'u28-lagom-varmt', {
    prompt: '« Le café est juste à la bonne température. »', promptEn: '"The coffee is just the right temperature."',
    sv: 'Kaffet är lagom varmt.', fr: 'Le café est juste à la bonne température.', en: 'The coffee is just the right temperature.',
    ipa: '/ˈkafːɛt æːr ˈlɑːɡɔm varmt/',
    note: '*lagom* devant un adjectif = « juste assez ». *kaffet* est neutre, d’où *varmt*.',
    gloss: [['kaffet', 'le café', 'the coffee'], ['är', 'est', 'is'], ['lagom', 'juste assez', 'just right'], ['varmt', 'chaud', 'warm']],
  }),
  phrase(D, 'u28-gott-om-tid', {
    prompt: '« Du calme, on a largement le temps. »', promptEn: '"Take it easy, we have plenty of time."',
    sv: 'Ta det lugnt, vi har gott om tid.', fr: 'Du calme, on a largement le temps.', en: 'Take it easy, we have plenty of time.',
    ipa: '/tɑː deː lɵŋnt viː hɑːr ɡɔtː ɔm tiːd/',
    note: '**gott om** = beaucoup de, largement. Contraire : *ont om tid* (manquer de temps).',
    gloss: [['ta', 'prends', 'take'], ['det', 'le', 'it'], ['lugnt', 'calmement', 'easy'], ['vi', 'nous', 'we'], ['har', 'avons', 'have'], ['gott', 'largement', 'plenty'], ['om', 'de', 'of'], ['tid', 'temps', 'time']],
  }),
  phrase(D, 'u28-forlat-ingen-fara', {
    prompt: '« Désolé d’être en retard. Pas de souci ! »', promptEn: '"Sorry I\'m late. No worries!"',
    sv: 'Förlåt att jag är sen. Ingen fara!', fr: 'Désolé d’être en retard. Pas de souci !', en: 'Sorry I\'m late. No worries!',
    ipa: '/fœˈloːt at jɑː æːr seːn ˈɪŋːɛn ˈfɑːra/',
    note: '*förlåt* = pardon. *sen* = en retard (pour une personne ; pour un train, *försenad*, Unité 6).',
    gloss: [['förlåt', 'pardon', 'sorry'], ['att', 'que', 'that'], ['jag', 'je', 'I'], ['är', 'suis', 'am'], ['sen', 'en retard', 'late'], ['ingen', 'aucun', 'no'], ['fara', 'souci', 'worries']],
  }),
  phrase(D, 'u28-haller-tummarna', {
    prompt: '« Je croise les doigts pour toi ! »', promptEn: '"I\'m keeping my fingers crossed for you!"',
    sv: 'Jag håller tummarna för dig!', fr: 'Je croise les doigts pour toi !', en: 'I\'m keeping my fingers crossed for you!',
    ipa: '/jɑː ˈhɔlːɛr ˈtɵmːaɳa fœr dɛj/',
    note: 'Avant un examen, un entretien (*intervju*, Unité 18)…',
    gloss: [['jag', 'je', 'I'], ['håller', 'tiens', 'am keeping'], ['tummarna', 'les pouces', 'my fingers crossed'], ['för', 'pour', 'for'], ['dig', 'toi', 'you']],
  }),
  phrase(D, 'u28-oroa-dig-inte', {
    prompt: '« Ne t’inquiète pas, ça va s’arranger. »', promptEn: '"Don\'t worry, it will work out."',
    sv: 'Oroa dig inte, det ordnar sig.', fr: 'Ne t’inquiète pas, ça va s’arranger.', en: 'Don\'t worry, it will work out.',
    ipa: '/ʊˈruːa dɛj ˈɪnːtɛ deː ˈoːɖnar sɛj/',
    note: 'Impératif négatif : verbe + réfléchi + **inte** (*Oroa dig inte!*). *oroa sig* = s’inquiéter, de *orolig* (Unité 22).',
    gloss: [['oroa', 'inquiète', 'worry'], ['dig', 'te', 'yourself'], ['inte', 'ne… pas', 'not'], ['det', 'ça', 'it'], ['ordnar', 'arrange', 'will work'], ['sig', 'se', 'out']],
  }),
  phrase(D, 'u28-tack-for-senast-trevligt', {
    prompt: '« Merci pour l’autre soir, c’était super sympa ! »', promptEn: '"Thanks for last time, it was really lovely!"',
    sv: 'Tack för senast, det var jättetrevligt!', fr: 'Merci pour l’autre soir, c’était super sympa !', en: 'Thanks for last time, it was really lovely!',
    ipa: '/takː fœr ˈseːnast deː vɑːr ˈjɛtːɛˌtreːvlɪt/',
    note: 'La formule complète, à dire en revoyant ses hôtes.',
    gloss: [['tack', 'merci', 'thanks'], ['för', 'pour', 'for'], ['senast', 'la dernière fois', 'last time'], ['det', 'c’', 'it'], ['var', 'était', 'was'], ['jättetrevligt', 'super sympa', 'really lovely']],
  }),
  phrase(D, 'u28-ingen-ko', {
    prompt: '« Il n’y a pas le feu. » (pas d’urgence)', promptEn: '"No rush." (nothing urgent)',
    sv: 'Det är ingen ko på isen.', fr: 'Il n’y a pas le feu.', en: 'There\'s no rush.',
    ipa: '/deː æːr ˈɪŋːɛn kuː poː ˈiːsɛn/',
    note: 'Forme complète de l’expression, avec *det är*.',
    gloss: [['det', 'il', 'there'], ['är', 'y a', 'is'], ['ingen', 'aucune', 'no'], ['ko', 'vache', 'cow'], ['på', 'sur', 'on'], ['isen', 'la glace', 'the ice']],
  }),
  phrase(D, 'u28-inte-riktigt-min-kopp', {
    prompt: '« Le foot, ce n’est pas vraiment mon truc. »', promptEn: '"Football isn\'t really my cup of tea."',
    sv: 'Fotboll är inte riktigt min kopp te.', fr: 'Le foot, ce n’est pas vraiment mon truc.', en: 'Football isn\'t really my cup of tea.',
    ipa: '/ˈfuːtbɔlː æːr ˈɪnːtɛ ˈrɪktɪɡt mɪnː kɔpː teː/',
    note: '*inte riktigt* = pas vraiment : adoucit la critique, très suédois.',
    gloss: [['fotboll', 'le foot', 'football'], ['är', 'est', 'is'], ['inte', 'pas', 'not'], ['riktigt', 'vraiment', 'really'], ['min', 'mon', 'my'], ['kopp', 'tasse', 'cup'], ['te', 'thé', 'of tea']],
  }),
];
