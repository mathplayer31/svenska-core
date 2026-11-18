// Unité 10 : Travail & études (A2, Section 3). Grammaire : modaux + infinitif sans « att ».
import { vocab, phrase, unitDeck } from './content-helpers.mjs';

export const UNIT10_DECK = unitDeck({
  n: 10, slug: 'swedish-unit-10-work', fr: 'Travail & études', en: 'Work & studies',
  level: 'A2', section: 'section-3-ma-vie', after: 'swedish-unit-9-day',
});
const D = UNIT10_DECK.slug;

export const UNIT10_CARDS = [
  vocab(D, 'u10-jobb', {
    prompt: 'Une activité payée : « un travail / un boulot »', promptEn: 'Paid work: "a job"',
    sv: 'ett jobb', fr: 'un travail / un boulot', en: 'a job', ipa: '/ɛtː jɔbː/',
    note: 'Mot **ett**. Plus formel : *ett arbete*. *på jobbet* = au travail.',
    gloss: [['ett', 'un', 'a'], ['jobb', 'travail', 'job']],
  }),
  vocab(D, 'u10-jobbar', {
    prompt: 'Le verbe du travail : « travaille » (présent)', promptEn: 'The work verb: "work" (present)',
    sv: 'jobbar', fr: 'travaille / travailles', en: 'work / works', ipa: '/ˈjɔbːar/',
    note: 'Infinitif *att jobba* (familier mais courant partout). Formel : *arbetar*.',
  }),
  vocab(D, 'u10-kollega', {
    prompt: 'Quelqu’un avec qui tu travailles : « un(e) collègue »', promptEn: 'Someone you work with: "a colleague"',
    sv: 'en kollega', fr: 'un(e) collègue', en: 'a colleague', ipa: '/ɛn kɔˈleːɡa/',
    note: 'Accent sur **le**. Pluriel : *kollegor*. La pause café au bureau : *fika med kollegorna*.',
    gloss: [['en', 'un', 'a'], ['kollega', 'collègue', 'colleague']],
  }),
  vocab(D, 'u10-chef', {
    prompt: 'La personne qui dirige : « un(e) chef / un(e) responsable »', promptEn: 'The person in charge: "a boss / a manager"',
    sv: 'en chef', fr: 'un(e) chef / responsable', en: 'a boss / a manager', ipa: '/ɛn ɧeːf/',
    note: 'Le **ch** se prononce [ɧ], comme *sju*. Les hiérarchies suédoises sont plates : on tutoie son chef.',
    gloss: [['en', 'un', 'a'], ['chef', 'chef', 'boss']],
  }),
  vocab(D, 'u10-mote', {
    prompt: 'Au bureau, autour d’une table : « une réunion »', promptEn: 'At the office, around a table: "a meeting"',
    sv: 'ett möte', fr: 'une réunion', en: 'a meeting', ipa: '/ɛtː ˈmøːtɛ/',
    accent: 'Accent 2 (Grave)',
    note: 'Mot **ett** (*mötet*). Vient de *möta* (rencontrer), comme *träffas* de l’Unité 1.',
    gloss: [['ett', 'une', 'a'], ['möte', 'réunion', 'meeting']],
  }),
  vocab(D, 'u10-pluggar', {
    prompt: 'Le verbe des études (familier) : « étudie / bosse »', promptEn: 'The study verb (informal): "study"',
    sv: 'pluggar', fr: 'étudie / bosse', en: 'study / studies', ipa: '/ˈplɵɡːar/',
    note: 'Infinitif *att plugga*, très courant à l’oral. Plus neutre : *studera*.',
  }),
  vocab(D, 'u10-kurs', {
    prompt: 'Une formation : « un cours / une formation »', promptEn: 'A training: "a course"',
    sv: 'en kurs', fr: 'un cours / une formation', en: 'a course', ipa: '/ɛn kɵʂː/',
    note: 'Le **rs** devient [ʂ] (rétroflexe). Le célèbre cours public pour immigrés : *SFI* (*svenska för invandrare*).',
    gloss: [['en', 'un', 'a'], ['kurs', 'cours', 'course']],
  }),
  vocab(D, 'u10-maste', {
    prompt: 'Le modal de l’obligation : « dois »', promptEn: 'The modal of obligation: "must / have to"',
    sv: 'måste', fr: 'dois / doit', en: 'must / have to', ipa: '/ˈmɔsːtɛ/',
    note: 'Invariable. Suivi de l’infinitif **sans** *att* : *jag måste jobba*. Négation : *jag behöver inte* (je n’ai pas besoin).',
  }),
  vocab(D, 'u10-far', {
    prompt: 'Le modal de la permission : « ai le droit / peux »', promptEn: 'The modal of permission: "may / am allowed to"',
    sv: 'får', fr: 'ai le droit de / peux', en: 'may / am allowed to', ipa: '/foːr/',
    note: 'Même mot que dans *Kan jag få…?* (recevoir). Comme modal : permission. *Får jag…?* = Est-ce que je peux… ?',
  }),
  vocab(D, 'u10-hemma', {
    prompt: 'Le lieu où l’on vit : « à la maison »', promptEn: 'Where you live: "at home"',
    sv: 'hemma', fr: 'à la maison', en: 'at home', ipa: '/ˈhɛmːa/',
    note: 'Position : **hemma** (à la maison). Direction : **hem** (vers la maison) : *jag går hem*.',
  }),

  phrase(D, 'u10-jobbar-som', {
    prompt: 'Dire ton métier : « Je travaille comme professeur. »', promptEn: 'Saying your job: "I work as a teacher."',
    sv: 'Jag jobbar som lärare.', fr: 'Je travaille comme professeur.', en: 'I work as a teacher.',
    ipa: '/jɑː ˈjɔbːar sɔmː ˈlæːrarɛ/',
    note: '**som** = comme, en tant que. Pas d’article devant le métier : *som lärare*, *jag är lärare*.',
    gloss: [['jag', 'je', 'I'], ['jobbar', 'travaille', 'work'], ['som', 'comme', 'as'], ['lärare', 'professeur', 'teacher']],
  }),
  phrase(D, 'u10-maste-jobba', {
    prompt: 'Une obligation : « Je dois travailler aujourd’hui. »', promptEn: 'An obligation: "I have to work today."',
    sv: 'Jag måste jobba idag.', fr: 'Je dois travailler aujourd’hui.', en: 'I have to work today.',
    ipa: '/jɑː ˈmɔsːtɛ ˈjɔbːa ɪˈdɑː/',
    note: 'Modal + **infinitif sans att** : *måste jobba*, *kan komma*, *vill äta*. L’infinitif se termine souvent en **-a**.',
    gloss: [['jag', 'je', 'I'], ['måste', 'dois', 'have to'], ['jobba', 'travailler', 'work'], ['idag', 'aujourd’hui', 'today']],
  }),
  phrase(D, 'u10-far-jag-ga-hem', {
    prompt: 'Demander la permission : « Est-ce que je peux rentrer à la maison ? »', promptEn: 'Asking permission: "May I go home?"',
    sv: 'Får jag gå hem?', fr: 'Est-ce que je peux rentrer (à la maison) ?', en: 'May I go home?',
    ipa: '/foːr jɑː ɡoː hɛmː/',
    note: 'Question oui/non : modal d’abord. **hem** (direction), pas *hemma* (position).',
    gloss: [['får', 'ai le droit', 'may'], ['jag', 'je', 'I'], ['gå', 'aller', 'go'], ['hem', 'à la maison', 'home']],
  }),
  phrase(D, 'u10-mote-nio', {
    prompt: '« Nous avons une réunion à neuf heures. »', promptEn: '"We have a meeting at nine."',
    sv: 'Vi har ett möte klockan nio.', fr: 'Nous avons une réunion à neuf heures.', en: 'We have a meeting at nine.',
    ipa: '/viː hɑːr ɛtː ˈmøːtɛ ˈklɔkːan ˈniːu/',
    note: '*nio* = neuf, prononcé « nii-ou ». L’heure sans préposition : *klockan nio* (Unité 9).',
    gloss: [['vi', 'nous', 'we'], ['har', 'avons', 'have'], ['ett', 'une', 'a'], ['möte', 'réunion', 'meeting'], ['klockan', 'à l’heure', 'at'], ['nio', 'neuf', 'nine']],
  }),
  phrase(D, 'u10-chef-trevlig', {
    prompt: '« Mon chef est sympa. »', promptEn: '"My boss is nice."',
    sv: 'Min chef är trevlig.', fr: 'Mon chef est sympa.', en: 'My boss is nice.',
    ipa: '/mɪnː ɧeːf æːr ˈtreːvlɪɡ/',
    note: '*trevlig* (sympa, agréable) : forme de base de *trevligt* (Unité 1). Avec un mot **en**, l’adjectif reste nu.',
    gloss: [['min', 'mon', 'my'], ['chef', 'chef', 'boss'], ['är', 'est', 'is'], ['trevlig', 'sympa', 'nice']],
  }),
  phrase(D, 'u10-pluggar-kurs', {
    prompt: '« J’étudie le suédois dans un cours. »', promptEn: '"I study Swedish on a course."',
    sv: 'Jag pluggar svenska på en kurs.', fr: 'J’étudie le suédois dans un cours.', en: 'I study Swedish on a course.',
    ipa: '/jɑː ˈplɵɡːar ˈsvɛnska poː ɛn kɵʂː/',
    note: 'Les langues s’écrivent en minuscule : *svenska*, *engelska*, *franska*. On est « sur » un cours : **på** en kurs.',
    gloss: [['jag', 'je', 'I'], ['pluggar', 'étudie', 'study'], ['svenska', 'suédois', 'Swedish'], ['på', 'dans', 'on'], ['en', 'un', 'a'], ['kurs', 'cours', 'course']],
  }),
  phrase(D, 'u10-hjalpa-mig', {
    prompt: 'Demander de l’aide : « Tu peux m’aider ? »', promptEn: 'Asking for help: "Can you help me?"',
    sv: 'Kan du hjälpa mig?', fr: 'Tu peux m’aider ?', en: 'Can you help me?',
    ipa: '/kanː dʉː ˈjɛlpa mɛj/',
    note: 'Le **hj** se prononce simplement [j] : « yelpa ». Le **h** est muet.',
    gloss: [['kan', 'peux', 'can'], ['du', 'tu', 'you'], ['hjälpa', 'aider', 'help'], ['mig', 'me', 'me']],
  }),
  phrase(D, 'u10-jobbar-hemma', {
    prompt: '« Aujourd’hui, je travaille à la maison. » (commence par « aujourd’hui »)', promptEn: '"Today I am working from home." (start with "today")',
    sv: 'Idag jobbar jag hemma.', fr: 'Aujourd’hui, je travaille à la maison.', en: 'Today I am working from home.',
    ipa: '/ɪˈdɑː ˈjɔbːar jɑː ˈhɛmːa/',
    note: 'Révision **V2** : *idag* (1) + **jobbar** (2) + *jag* (3). Télétravailler : *jobba hemifrån*.',
    gloss: [['idag', 'aujourd’hui', 'today'], ['jobbar', 'travaille', 'work'], ['jag', 'je', 'I'], ['hemma', 'à la maison', 'at home']],
  }),
];
