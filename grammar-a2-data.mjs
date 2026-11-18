// Fondation : Grammaire A2. Uniquement du vocabulaire des Unités 1 à 15. Se débloque après l'Unité 15.
import { cloze } from './content-helpers.mjs';

export const GRAMMAR_A2_DECK = {
  slug: 'swedish-grammar-a2',
  title: '4. Grammaire A2 : passé, futur, comparatifs',
  title_en: '4. A2 Grammar: past, future, comparatives',
  category: 'grammar',
  cefr_level: 'A2',
  sort_order: 4,
  prerequisite_slug: 'swedish-unit-15-plans',
};
const D = GRAMMAR_A2_DECK.slug;

export const GRAMMAR_A2_CARDS = [
  cloze(D, 'gram-a2-pret-g1', {
    prompt: 'Prétérit, groupe 1 (-ade) : Igår ___ jag hemma. (jobba)', promptEn: 'Past tense, group 1 (-ade): Igår ___ jag hemma. (jobba)',
    sv: 'Igår jobbade jag hemma.', fr: 'Hier, j’ai travaillé à la maison.', en: 'Yesterday I worked from home.',
    ipa: '/ɪˈɡoːr ˈjɔbːadɛ jɑː ˈhɛmːa/',
    note: 'Groupe 1 (présent en **-ar**) : prétérit en **-ade**, supin en **-at** : *jobba, jobbar, jobbade, har jobbat*. Et toujours V2 : *Igår* **jobbade** *jag*.',
    gloss: [['igår', 'hier', 'yesterday'], ['jobbade', 'ai travaillé', 'worked'], ['jag', 'je', 'I'], ['hemma', 'à la maison', 'at home']],
  }),
  cloze(D, 'gram-a2-pret-g2', {
    prompt: 'Prétérit, groupe 2 (-te / -de) : Hon ___ en ny jacka. (köpa)', promptEn: 'Past tense, group 2 (-te / -de): Hon ___ en ny jacka. (köpa)',
    sv: 'Hon köpte en ny jacka.', fr: 'Elle a acheté une nouvelle veste.', en: 'She bought a new jacket.',
    ipa: '/hʊnː ˈɕœpːtɛ ɛn nyː ˈjakːa/',
    note: 'Groupe 2 (présent en **-er**) : **-te** après une consonne sourde (*köpte*, *åkte*), **-de** sinon (*ringde*, *stängde*).',
    gloss: [['hon', 'elle', 'she'], ['köpte', 'a acheté', 'bought'], ['en', 'une', 'a'], ['ny', 'nouvelle', 'new'], ['jacka', 'veste', 'jacket']],
  }),
  cloze(D, 'gram-a2-pret-fort', {
    prompt: 'Prétérit, verbe fort : Vi ___ på bio i helgen. (gå)', promptEn: 'Past tense, strong verb: Vi ___ på bio i helgen. (gå)',
    sv: 'Vi gick på bio i helgen.', fr: 'Nous sommes allés au cinéma ce week-end.', en: 'We went to the cinema at the weekend.',
    ipa: '/viː jɪkː poː ˈbiːu ɪ ˈhɛlɡɛn/',
    note: 'Les verbes forts changent de voyelle, sans terminaison : *gå → gick*, *se → såg*, *äta → åt*, *dricka → drack*. À apprendre par cœur.',
    gloss: [['vi', 'nous', 'we'], ['gick', 'sommes allés', 'went'], ['på', 'au', 'to'], ['bio', 'cinéma', 'cinema'], ['i', 'ce', 'at'], ['helgen', 'week-end', 'the weekend']],
  }),
  cloze(D, 'gram-a2-parfait-duree', {
    prompt: 'Parfait + durée : Jag ___ ___ i Sverige i två år. (bo, toujours vrai)', promptEn: 'Perfect + duration: Jag ___ ___ i Sverige i två år. (bo, still true)',
    sv: 'Jag har bott i Sverige i två år.', fr: 'J’habite en Suède depuis deux ans.', en: 'I have lived in Sweden for two years.',
    ipa: '/jɑː hɑːr bʊtː ɪ ˈsværjɛ ɪ tvoː oːr/',
    note: 'Le français dit « j’habite **depuis** » (présent) ; le suédois dit « j’ai habité **pendant** » : **har bott** + **i** + durée.',
    gloss: [['jag', 'je', 'I'], ['har', 'ai', 'have'], ['bott', 'habité', 'lived'], ['i', 'en', 'in'], ['Sverige', 'Suède', 'Sweden'], ['i', 'pendant', 'for'], ['två', 'deux', 'two'], ['år', 'ans', 'years']],
  }),
  cloze(D, 'gram-a2-pret-vs-parfait', {
    prompt: 'Prétérit ou parfait ? Igår ___ vi sill. (äta, moment daté)', promptEn: 'Past or perfect? Igår ___ vi sill. (äta, a dated moment)',
    sv: 'Igår åt vi sill.', fr: 'Hier, nous avons mangé du hareng.', en: 'Yesterday we ate herring.',
    ipa: '/ɪˈɡoːr oːt viː sɪlː/',
    note: 'Moment précis (*igår*, *i helgen*, *2024*) → **prétérit** (*åt*). Expérience sans date → **parfait** (*Har du ätit sill?*). Le français utilise « avons mangé » dans les deux cas.',
    gloss: [['igår', 'hier', 'yesterday'], ['åt', 'avons mangé', 'ate'], ['vi', 'nous', 'we'], ['sill', 'hareng', 'herring']],
  }),
  cloze(D, 'gram-a2-ska', {
    prompt: 'Futur de projet : Nästa vecka ___ jag åka till Gotland. (projet décidé)', promptEn: 'Future plan: Nästa vecka ___ jag åka till Gotland. (decided plan)',
    sv: 'Nästa vecka ska jag åka till Gotland.', fr: 'La semaine prochaine, je vais aller à Gotland.', en: 'Next week I am going to Gotland.',
    ipa: '/ˈnɛsːta ˈvɛkːa skɑː jɑː ˈoːka tɪlː ˈɡɔtland/',
    note: '**ska** = intention, projet. Et V2 : *Nästa vecka* (1) **ska** (2) *jag* (3).',
    gloss: [['nästa', 'prochaine', 'next'], ['vecka', 'semaine', 'week'], ['ska', 'vais', 'am going to'], ['jag', 'je', 'I'], ['åka', 'aller', 'go'], ['till', 'à', 'to'], ['Gotland', 'Gotland', 'Gotland']],
  }),
  cloze(D, 'gram-a2-kommer-att', {
    prompt: 'Futur de prévision : Det ___ ___ snöa imorgon.', promptEn: 'Future prediction: Det ___ ___ snöa imorgon.',
    sv: 'Det kommer att snöa imorgon.', fr: 'Il va neiger demain.', en: 'It is going to snow tomorrow.',
    ipa: '/deː ˈkɔmːɛr ɔ ˈsnøːa ɪˈmɔrːɔn/',
    note: '**kommer att** = ce qui va se passer sans que personne le décide. *ska snöa* serait faux ici.',
    gloss: [['det', 'il', 'it'], ['kommer', 'va', 'is going'], ['att', 'à', 'to'], ['snöa', 'neiger', 'snow'], ['imorgon', 'demain', 'tomorrow']],
  }),
  cloze(D, 'gram-a2-modal-inte', {
    prompt: 'Modal + négation : Vi ___ ___ komma idag. (kan + inte)', promptEn: 'Modal + negation: Vi ___ ___ komma idag. (kan + inte)',
    sv: 'Vi kan inte komma idag.', fr: 'Nous ne pouvons pas venir aujourd’hui.', en: 'We cannot come today.',
    ipa: '/viː kanː ˈɪnːtɛ ˈkɔmːa ɪˈdɑː/',
    note: '*inte* se place après le **verbe conjugué** (le modal), avant l’infinitif : *kan inte komma*, *vill inte jobba*.',
    gloss: [['vi', 'nous', 'we'], ['kan', 'pouvons', 'can'], ['inte', 'ne… pas', 'not'], ['komma', 'venir', 'come'], ['idag', 'aujourd’hui', 'today']],
  }),
  cloze(D, 'gram-a2-reflechi', {
    prompt: 'Pronom réfléchi : Hon klär på ___ . (elle-même)', promptEn: 'Reflexive pronoun: Hon klär på ___ . (herself)',
    sv: 'Hon klär på sig.', fr: 'Elle s’habille.', en: 'She gets dressed.',
    ipa: '/hʊnː klæːr poː sɛj/',
    note: 'Réfléchis : *mig, dig, sig, oss, er, sig*. **sig** pour *han / hon / den / de*. Se prononce [sɛj].',
    gloss: [['hon', 'elle', 'she'], ['klär', 'habille', 'dresses'], ['på', '(particule)', '(particle)'], ['sig', 'se', 'herself']],
  }),
  cloze(D, 'gram-a2-comparatif', {
    prompt: 'Comparatif : Den här jackan är ___ än den där. (billig)', promptEn: 'Comparative: Den här jackan är ___ än den där. (billig)',
    sv: 'Den här jackan är billigare än den där.', fr: 'Cette veste-ci est moins chère que celle-là.', en: 'This jacket is cheaper than that one.',
    ipa: '/dɛnː hæːr ˈjakːan æːr ˈbɪlːɪɡarɛ ɛn dɛnː dæːr/',
    note: '**-are** + **än** (que) : *billigare än*, *större än*. *den där* = celle-là.',
    gloss: [['den', 'cette', 'this'], ['här', 'ici', 'here'], ['jackan', 'la veste', 'the jacket'], ['är', 'est', 'is'], ['billigare', 'moins chère', 'cheaper'], ['än', 'que', 'than'], ['den', 'celle', 'that'], ['där', 'là', 'there']],
  }),
  cloze(D, 'gram-a2-superlatif', {
    prompt: 'Superlatif défini : Det här är den ___ tröjan. (bra)', promptEn: 'Definite superlative: Det här är den ___ tröjan. (bra)',
    sv: 'Det här är den bästa tröjan.', fr: 'C’est le meilleur pull.', en: 'This is the best jumper.',
    ipa: '/deː hæːr æːr dɛnː ˈbɛsta ˈtrœjːan/',
    note: 'Devant un nom défini, le superlatif prend **-a** : *den bästa tröjan*, *det billigaste rummet*. Seul après *är* : *den är bäst*.',
    gloss: [['det', 'ce', 'this'], ['här', 'ici', 'here'], ['är', 'est', 'is'], ['den', 'le', 'the'], ['bästa', 'meilleur', 'best'], ['tröjan', 'pull', 'jumper']],
  }),
  cloze(D, 'gram-a2-for-sedan', {
    prompt: '« Il y a » + durée : Jag kom till Sverige ___ två år ___ .', promptEn: '"Ago": Jag kom till Sverige ___ två år ___ .',
    sv: 'Jag kom till Sverige för två år sedan.', fr: 'Je suis arrivé en Suède il y a deux ans.', en: 'I came to Sweden two years ago.',
    ipa: '/jɑː kɔmː tɪlː ˈsværjɛ fœr tvoː oːr ˈseːdan/',
    note: '« il y a » = **för … sedan** (souvent prononcé *sen*). *kom* = prétérit de *komma*. Ne pas confondre avec *i två år* (pendant / depuis).',
    gloss: [['jag', 'je', 'I'], ['kom', 'suis arrivé', 'came'], ['till', 'en', 'to'], ['Sverige', 'Suède', 'Sweden'], ['för', 'il y a', 'ago'], ['två', 'deux', 'two'], ['år', 'ans', 'years'], ['sedan', '(il y a)', '(ago)']],
  }),
];
