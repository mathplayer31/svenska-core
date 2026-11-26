// Unit 18: Work & interviews (B1, Section 5). Grammar: "när" and "om" clauses, V2 in the main clause.
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT18_DECK = unitDeck({
  n: 18, slug: 'swedish-unit-18-job-hunting', fr: 'Travail & entretien', en: 'Jobs & interviews',
  level: 'B1', section: 'section-5-sinstaller', after: 'swedish-unit-17-neighbours',
});
const D = UNIT18_DECK.slug;

export const UNIT18_CARDS = [
  vocab(D, 'u18-ansokan', {
    prompt: 'Ce qu’on envoie pour un poste : « une candidature »', promptEn: 'What you send for a job: "an application"',
    sv: 'en ansökan', fr: 'une candidature / une demande', en: 'an application', ipa: '/ɛn ˈanːˌsøːkan/',
    note: 'Nom tiré de *ansöka* (Unité 16). Pluriel irrégulier : *ansökningar*. La lettre de motivation : *personligt brev*.',
    gloss: [['en', 'une', 'an'], ['ansökan', 'candidature', 'application']],
  }),
  vocab(D, 'u18-cv', {
    prompt: 'Le résumé de ton parcours : « un CV »', promptEn: 'The summary of your career: "a CV / résumé"',
    sv: 'ett CV', fr: 'un CV', en: 'a CV / a résumé', ipa: '/ɛtː seːˈveː/',
    note: 'Mot **ett**, lettres à la suédoise : « sé-vé ». Pas de photo obligatoire, et souvent 2 pages maximum.',
    gloss: [['ett', 'un', 'a'], ['CV', 'CV', 'CV']],
  }),
  vocab(D, 'u18-erfarenhet', {
    prompt: 'Ce que tu as appris en travaillant : « l’expérience »', promptEn: 'What you learned by working: "experience"',
    sv: 'erfarenhet', fr: 'l’expérience', en: 'experience', ipa: '/ˈeːrfaːrɛnˌheːt/',
    note: 'Sans article dans *ha erfarenhet av* (avoir de l’expérience en). Suffixe **-het** : mot **en**.',
  }),
  vocab(D, 'u18-lon', {
    prompt: 'Ce que tu gagnes chaque mois : « le salaire »', promptEn: 'What you earn every month: "a salary / wages"',
    sv: 'en lön', fr: 'un salaire', en: 'a salary / wages', ipa: '/ɛn løːn/',
    note: 'Défini : *lönen*. Les salaires sont négociés en entretien : on te demandera souvent *Vilka är dina löneanspråk?* (tes prétentions).',
    gloss: [['en', 'un', 'a'], ['lön', 'salaire', 'salary']],
  }),
  vocab(D, 'u18-anstallning', {
    prompt: 'Un poste salarié : « un emploi »', promptEn: 'A salaried position: "a job / employment"',
    sv: 'en anställning', fr: 'un emploi (salarié)', en: 'a job / employment', ipa: '/ɛn ˈanːˌstɛlnɪŋ/',
    note: 'Suffixe **-ning** (mot **en**). CDI : *fast anställning* ; CDD : *visstidsanställning*.',
    gloss: [['en', 'un', 'a'], ['anställning', 'emploi', 'job']],
  }),
  vocab(D, 'u18-intervju', {
    prompt: 'L’entretien d’embauche : « une interview / un entretien »', promptEn: 'The job meeting: "an interview"',
    sv: 'en intervju', fr: 'un entretien', en: 'an interview', ipa: '/ɛn ɪntɛrˈvjʉː/',
    note: 'Emprunt à l’anglais, prononcé à la suédoise : « inter-viou ».',
    gloss: [['en', 'un', 'an'], ['intervju', 'entretien', 'interview']],
  }),
  vocab(D, 'u18-soker', {
    prompt: 'Être à la recherche : « cherche » (présent)', promptEn: 'Looking for something: "look for / apply for" (present)',
    sv: 'söker', fr: 'cherche', en: 'look for / apply for', ipa: '/ˈsøːkɛr/',
    note: '*söka jobb* = chercher du travail / postuler. Même racine que *ansöka*.',
  }),
  vocab(D, 'u18-heltid', {
    prompt: 'Toute la semaine de travail : « temps plein »', promptEn: 'The full working week: "full-time"',
    sv: 'heltid', fr: 'temps plein', en: 'full-time', ipa: '/ˈheːlˌtiːd/',
    note: '*hel* (entier) + *tid* (temps). Temps partiel : *deltid*. Une semaine standard : 40 heures.',
  }),
  vocab(D, 'u18-kunskaper', {
    prompt: 'Ce que tu sais : « des connaissances »', promptEn: 'What you know: "knowledge / skills"',
    sv: 'kunskaper', fr: 'des connaissances', en: 'knowledge / skills', ipa: '/ˈkɵnːˌskɑːpɛr/',
    note: 'Pluriel de *kunskap*. *goda kunskaper i svenska* = de bonnes connaissances en suédois (**i** + matière).',
  }),
  vocab(D, 'u18-arbetsgivare', {
    prompt: 'Celui qui embauche : « un employeur »', promptEn: 'The one who hires: "an employer"',
    sv: 'en arbetsgivare', fr: 'un employeur', en: 'an employer', ipa: '/ɛn ˈarbeːtsˌjiːvarɛ/',
    accent: 'Accent 2 (Grave)',
    note: '*arbete* (travail) + *givare* (celui qui donne). Le salarié : *arbetstagare*.',
    gloss: [['en', 'un', 'an'], ['arbetsgivare', 'employeur', 'employer']],
  }),

  // Additions (issue #14)
  vocab(D, 'u18-deltid', {
    prompt: 'Pas à temps plein : « temps partiel »', promptEn: 'Not full-time: "part-time"',
    sv: 'deltid', fr: 'temps partiel', en: 'part-time', ipa: '/ˈdeːlˌtiːd/',
    note: '*del* (partie) + *tid* (temps). *Jag jobbar deltid, 75 procent.*',
  }),
  vocab(D, 'u18-tjanst', {
    prompt: 'Le poste proposé dans l’annonce', promptEn: 'The job on offer: "a position"',
    sv: 'en tjänst', fr: 'un poste', en: 'a position', ipa: '/ɛn ɕɛnst/',
    note: 'Aussi « un service » : *Kan du göra mig en tjänst?* = tu peux me rendre service ?',
  }),
  vocab(D, 'u18-referens', {
    prompt: 'Quelqu’un qui parle de toi à l’employeur : « une référence »', promptEn: 'Someone who vouches for you: "a reference"',
    sv: 'en referens', fr: 'une référence', en: 'a reference', ipa: '/ɛn rɛfɛˈrɛns/',
    note: 'En Suède, l’employeur appelle souvent tes anciens chefs : *referenser lämnas på begäran*.',
  }),
  vocab(D, 'u18-provanstallning', {
    prompt: 'Les premiers mois à l’essai : « une période d’essai »', promptEn: 'The first months on trial: "a probation period"',
    sv: 'en provanställning', fr: 'une période d’essai', en: 'a probationary employment', ipa: '/ɛn ˈpruːvanˌstɛlːnɪŋ/',
    note: 'Six mois maximum, puis souvent un CDI : *tillsvidareanställning*.',
  }),
  vocab(D, 'u18-arbetslos', {
    prompt: 'Sans emploi : « au chômage »', promptEn: 'Without a job: "unemployed"',
    sv: 'arbetslös', fr: 'au chômage', en: 'unemployed', ipa: '/ˈarbeːtsˌløːs/',
    note: '*arbete* (travail) + *-lös* (sans). Le chômage : *arbetslöshet*.',
  }),
  vocab(D, 'u18-utbildning', {
    prompt: 'Tes études et diplômes : « une formation »', promptEn: 'Your studies and degrees: "education / training"',
    sv: 'en utbildning', fr: 'une formation / des études', en: 'education / training', ipa: '/ɛn ˈʉːtˌbɪldnɪŋ/',
    note: 'Rubrique du CV, avec *arbetslivserfarenhet* (expérience professionnelle).',
  }),
  vocab(D, 'u18-arbetsformedlingen', {
    prompt: 'L’agence publique pour l’emploi', promptEn: 'The public employment service',
    sv: 'Arbetsförmedlingen', fr: 'l’agence pour l’emploi', en: 'the Public Employment Service', ipa: '/ˈarbeːtsfœrˌmeːdlɪŋɛn/',
    note: 'L’équivalent de France Travail. Propose aussi des cours de suédois pour le travail.',
  }),
  phrase(D, 'u18-soker-jobb-som', {
    prompt: '« Je cherche un emploi de développeur. »', promptEn: '"I am looking for a job as a developer."',
    sv: 'Jag söker jobb som utvecklare.', fr: 'Je cherche un emploi de développeur.', en: 'I am looking for a job as a developer.',
    ipa: '/jɑː ˈsøːkɛr jɔbː sɔmː ˈʉːtˌvɛklarɛ/',
    note: '*söka jobb* sans article, et *som* + métier sans article (Unité 10). *utvecklare* = développeur.',
    gloss: [['jag', 'je', 'I'], ['söker', 'cherche', 'am looking for'], ['jobb', 'emploi', 'a job'], ['som', 'comme', 'as'], ['utvecklare', 'développeur', 'a developer']],
  }),
  phrase(D, 'u18-skickat-ansokan', {
    prompt: '« J’ai envoyé ma candidature et mon CV. »', promptEn: '"I have sent my application and my CV."',
    sv: 'Jag har skickat min ansökan och mitt CV.', fr: 'J’ai envoyé ma candidature et mon CV.', en: 'I have sent my application and my CV.',
    ipa: '/jɑː hɑːr ˈɧɪkːat mɪnː ˈanːˌsøːkan ɔ mɪtː seːˈveː/',
    note: '*skicka* = envoyer, le **sk** devant **i** se dit [ɧ]. *min* ansökan (en) / *mitt* CV (ett).',
    gloss: [['jag', 'je', 'I'], ['har', 'ai', 'have'], ['skickat', 'envoyé', 'sent'], ['min', 'ma', 'my'], ['ansökan', 'candidature', 'application'], ['och', 'et', 'and'], ['mitt', 'mon', 'my'], ['CV', 'CV', 'CV']],
  }),
  phrase(D, 'u18-erfarenhet-av', {
    prompt: 'En entretien : « Vous avez de l’expérience dans la vente ? »', promptEn: 'In an interview: "Do you have any sales experience?"',
    sv: 'Har du erfarenhet av försäljning?', fr: 'Vous avez de l’expérience dans la vente ?', en: 'Do you have any sales experience?',
    ipa: '/hɑːr dʉː ˈeːrfaːrɛnˌheːt ɑːv fœˈʂɛljnɪŋ/',
    note: '**erfarenhet av** = expérience de / dans. On tutoie aussi en entretien.',
    gloss: [['har', 'avez', 'have'], ['du', 'vous', 'you'], ['erfarenhet', 'expérience', 'experience'], ['av', 'dans', 'in'], ['försäljning', 'la vente', 'sales']],
  }),
  phrase(D, 'u18-nar-jag-fick', {
    prompt: '« Quand j’ai eu le poste, j’étais content. » (commence par « quand »)', promptEn: '"When I got the job, I was happy." (start with "when")',
    sv: 'När jag fick jobbet blev jag glad.', fr: 'Quand j’ai eu le poste, j’ai été content.', en: 'When I got the job, I was happy.',
    ipa: '/nɛːr jɑː fɪkː ˈjɔbːɛt bleːv jɑː ɡlɑːd/',
    note: 'La subordonnée *När jag fick jobbet* occupe la 1re place : la principale commence par le verbe **blev** (V2). *fick* = prétérit de *få*, *blev* = de *bli* (devenir).',
    gloss: [['när', 'quand', 'when'], ['jag', 'je', 'I'], ['fick', 'ai eu', 'got'], ['jobbet', 'le poste', 'the job'], ['blev', 'suis devenu', 'became'], ['jag', 'je', 'I'], ['glad', 'content', 'happy']],
  }),
  phrase(D, 'u18-om-du-far-jobbet', {
    prompt: '« Si tu obtiens le poste, tu commences en mars. » (commence par « si »)', promptEn: '"If you get the job, you start in March." (start with "if")',
    sv: 'Om du får jobbet, börjar du i mars.', fr: 'Si tu obtiens le poste, tu commences en mars.', en: 'If you get the job, you start in March.',
    ipa: '/ɔm dʉː foːr ˈjɔbːɛt ˈbœrjar dʉː ɪ maʂː/',
    note: 'Même mécanique qu’à l’Unité 15 : *Om …* (1) **börjar** (2) *du* (3). *mars* : **rs** rétroflexe.',
    gloss: [['om', 'si', 'if'], ['du', 'tu', 'you'], ['får', 'obtiens', 'get'], ['jobbet', 'le poste', 'the job'], ['börjar', 'commences', 'start'], ['du', 'tu', 'you'], ['i', 'en', 'in'], ['mars', 'mars', 'March']],
  }),
  phrase(D, 'u18-lonen', {
    prompt: '« Le salaire est de 35 000 couronnes par mois. »', promptEn: '"The salary is 35,000 crowns a month."',
    sv: 'Lönen är 35 000 kronor i månaden.', fr: 'Le salaire est de 35 000 couronnes par mois.', en: 'The salary is 35,000 crowns a month.',
    ipa: '/ˈløːnɛn æːr ˈtrɛtːɪfɛmˌtʉːsɛn ˈkruːnɔr ɪ ˈmoːnadɛn/',
    note: '« par mois » = **i månaden** (litt. « dans le mois »), « par heure » = *i timmen*. On parle toujours du salaire **brut** mensuel.',
    gloss: [['lönen', 'le salaire', 'the salary'], ['är', 'est', 'is'], ['35 000', '35 000', '35,000'], ['kronor', 'couronnes', 'crowns'], ['i', 'par', 'a'], ['månaden', 'mois', 'month']],
    words: ['Lönen är trettiofemtusen kronor i månaden.'],
  }),
  phrase(D, 'u18-pa-heltid', {
    prompt: '« Le poste est à temps plein. »', promptEn: '"The job is full-time."',
    sv: 'Jobbet är på heltid.', fr: 'Le poste est à temps plein.', en: 'The job is full-time.',
    ipa: '/ˈjɔbːɛt æːr poː ˈheːlˌtiːd/',
    note: '**på heltid** / *på deltid* : la préposition *på* est obligatoire.',
    gloss: [['jobbet', 'le poste', 'the job'], ['är', 'est', 'is'], ['på', 'à', 'on'], ['heltid', 'temps plein', 'full-time']],
  }),
  phrase(D, 'u18-goda-kunskaper', {
    prompt: '« J’ai de bonnes connaissances en suédois. »', promptEn: '"I have a good knowledge of Swedish."',
    sv: 'Jag har goda kunskaper i svenska.', fr: 'J’ai de bonnes connaissances en suédois.', en: 'I have a good knowledge of Swedish.',
    ipa: '/jɑː hɑːr ˈɡuːda ˈkɵnːˌskɑːpɛr ɪ ˈsvɛnska/',
    note: 'Pluriel de *god* : **goda** (les adjectifs prennent **-a** au pluriel). *kunskaper i* + langue.',
    gloss: [['jag', 'je', 'I'], ['har', 'ai', 'have'], ['goda', 'bonnes', 'good'], ['kunskaper', 'connaissances', 'knowledge'], ['i', 'en', 'of'], ['svenska', 'suédois', 'Swedish']],
  }),
];
