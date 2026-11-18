// FranceCore, Grammaire B1 : 16 phrases à trou (temps du passé, conditionnel, subjonctif, relatifs, gérondif, discours indirect, doubles pronoms).
import { cloze, foundationDeck } from '../helpers.mjs';

export const GRAMMAR_B1_DECK = foundationDeck({
  slug: 'fr-grammar-b1', sv: 'Grammatik B1', en: 'B1 grammar',
  category: 'grammar', level: 'B1', order: 5, after: 'fr-unit-23-stories',
});
const D = GRAMMAR_B1_DECK.slug;

export const GRAMMAR_B1_CARDS = [
  // ---------- Imparfait ou passé composé ----------
  cloze(D, 'fr-gram-b1-imparfait-decor', {
    prompt: 'Imparfait eller passé composé? Quand je suis arrivée à la préfecture, il y ___ déjà beaucoup de monde. (avoir)',
    promptEn: 'Imparfait or passé composé? Quand je suis arrivée à la préfecture, il y ___ déjà beaucoup de monde. (avoir)',
    fr: 'Quand je suis arrivée à la préfecture, il y avait déjà beaucoup de monde.', sv: 'När jag kom till prefekturen var det redan mycket folk där.', en: 'When I got to the prefecture, there were already lots of people.',
    ipa: '/kɑ̃ ʒə sɥi.z‿a.ʁi.ve a la pʁe.fɛk.tyʁ il i a.vɛ de.ʒa bo.ku də mɔ̃d/',
    note: '**Imparfait** för läget man möter (*il y avait*), **passé composé** för händelsen (*je suis arrivée*). Fråga dig: är det kulisserna eller handlingen?',
    noteEn: '**Imparfait** for the situation you find (*il y avait*), **passé composé** for the event (*je suis arrivée*). Ask yourself: is it the scenery or the action?',
    gloss: [['quand', 'när', 'when'], ['je suis arrivée', 'jag kom', 'I got'], ['à la préfecture', 'till prefekturen', 'to the prefecture'], ['il y avait', 'det var', 'there were'], ['déjà', 'redan', 'already'], ['beaucoup de monde', 'mycket folk', 'lots of people']],
  }),
  cloze(D, 'fr-gram-b1-passe-compose-evenement', {
    prompt: 'Imparfait eller passé composé? Je lisais le journal quand mon voisin ___ à la porte. (frapper)',
    promptEn: 'Imparfait or passé composé? Je lisais le journal quand mon voisin ___ à la porte. (frapper)',
    fr: 'Je lisais le journal quand mon voisin a frappé à la porte.', sv: 'Jag läste tidningen när min granne knackade på dörren.', en: 'I was reading the paper when my neighbour knocked at the door.',
    ipa: '/ʒə li.zɛ lə ʒuʁ.nal kɑ̃ mɔ̃ vwa.zɛ̃ a fʁa.pe a la pɔʁt/',
    note: 'Knackningen är en kort händelse som avbryter läsningen: **passé composé**. Det som pågick står i imparfait: *je lisais*.',
    noteEn: 'The knock is a brief event that interrupts the reading: **passé composé**. What was going on is in the imparfait: *je lisais*.',
    gloss: [['je lisais', 'jag läste', 'I was reading'], ['le journal', 'tidningen', 'the paper'], ['quand', 'när', 'when'], ['mon voisin', 'min granne', 'my neighbour'], ['a frappé', 'knackade', 'knocked'], ['à la porte', 'på dörren', 'at the door']],
  }),
  // ---------- Plus-que-parfait ----------
  cloze(D, 'fr-gram-b1-pqp-avoir', {
    prompt: 'Plus-que-parfait: Je n’ai pas pu entrer : j’___ mes clés au bureau. (oublier)',
    promptEn: 'Past perfect: Je n’ai pas pu entrer : j’___ mes clés au bureau. (oublier)',
    fr: 'Je n’ai pas pu entrer : j’avais oublié mes clés au bureau.', sv: 'Jag kunde inte komma in: jag hade glömt nycklarna på kontoret.', en: 'I couldn’t get in: I had left my keys at the office.',
    ipa: '/ʒə ne pa py ɑ̃.tʁe ʒa.vɛ.z‿u.bli.je me kle o by.ʁo/',
    note: '**Plus-que-parfait** = hjälpverbet i imparfait + particip: *j’avais oublié*. Det visar att glömskan kom *före* försöket att komma in.',
    noteEn: '**Plus-que-parfait** = auxiliary in the imparfait + past participle: *j’avais oublié*. It shows the forgetting came *before* trying to get in.',
    gloss: [['je n’ai pas pu', 'jag kunde inte', 'I couldn’t'], ['entrer', 'komma in', 'get in'], ['j’avais oublié', 'jag hade glömt', 'I had left'], ['mes clés', 'mina nycklar', 'my keys'], ['au bureau', 'på kontoret', 'at the office']],
  }),
  cloze(D, 'fr-gram-b1-pqp-etre', {
    prompt: 'Plus-que-parfait (hjälpverbet): Quand nous sommes arrivés, Marie ___ déjà partie. (être)',
    promptEn: 'Past perfect (the auxiliary): Quand nous sommes arrivés, Marie ___ déjà partie. (être)',
    fr: 'Quand nous sommes arrivés, Marie était déjà partie.', sv: 'När vi kom hade Marie redan gått.', en: 'When we arrived, Marie had already left.',
    ipa: '/kɑ̃ nu sɔm.z‿a.ʁi.ve ma.ʁi e.tɛ de.ʒa paʁ.ti/',
    note: 'Verb som tar **être** i passé composé tar det också i plus-que-parfait: *elle était partie*. Svenskan säger *hade gått*, men franskan *var gången*.',
    noteEn: 'Verbs that take **être** in the passé composé also take it in the plus-que-parfait: *elle était partie*. English says *had left*, French literally *was left*.',
    gloss: [['quand', 'när', 'when'], ['nous sommes arrivés', 'vi kom', 'we arrived'], ['Marie', 'Marie', 'Marie'], ['était', 'hade', 'had'], ['déjà', 'redan', 'already'], ['partie', 'gått', 'left']],
  }),
  // ---------- Conditionnel ----------
  cloze(D, 'fr-gram-b1-conditionnel-politesse', {
    prompt: 'Konditionalis (artighet): ___-vous m’aider à remplir ce formulaire ? (pouvoir)',
    promptEn: 'Conditional (politeness): ___-vous m’aider à remplir ce formulaire ? (pouvoir)',
    fr: 'Pourriez-vous m’aider à remplir ce formulaire ?', sv: 'Skulle ni kunna hjälpa mig att fylla i den här blanketten?', en: 'Could you help me fill in this form?',
    ipa: '/pu.ʁje vu mɛ.de a ʁɑ̃.pliʁ sə fɔʁ.my.lɛʁ/',
    note: 'Konditionalis = futurumstammen + imparfaits ändelser: *pourr-* + *-iez*. Stammen för *pouvoir* har dubbelt **r**.',
    noteEn: 'Conditional = future stem + imparfait endings: *pourr-* + *-iez*. The stem of *pouvoir* has a double **r**.',
    gloss: [['pourriez-vous', 'skulle ni kunna', 'could you'], ['m’aider', 'hjälpa mig', 'help me'], ['à remplir', 'att fylla i', 'fill in'], ['ce formulaire', 'den här blanketten', 'this form']],
  }),
  cloze(D, 'fr-gram-b1-conditionnel-souhait', {
    prompt: 'Konditionalis (önskan): J’___ travailler dans le Midi. (aimer)',
    promptEn: 'Conditional (wish): J’___ travailler dans le Midi. (aimer)',
    fr: 'J’aimerais travailler dans le Midi.', sv: 'Jag skulle vilja jobba i Sydfrankrike.', en: 'I’d like to work in the South of France.',
    ipa: '/ʒɛ.mə.ʁɛ tʁa.va.je dɑ̃ lə mi.di/',
    note: 'För *-er*-verb är stammen hela infinitiven: *aimer-* + *-ais*. Uttalet [ʒɛmʁɛ] skiljer sig från futurum *j’aimerai* [ʒɛmʁe] bara på slutvokalen.',
    noteEn: 'For *-er* verbs the stem is the whole infinitive: *aimer-* + *-ais*. *J’aimerais* [ʒɛmʁɛ] differs from the future *j’aimerai* [ʒɛmʁe] only in the final vowel.',
    gloss: [['j’aimerais', 'jag skulle vilja', 'I’d like'], ['travailler', 'jobba', 'to work'], ['dans le Midi', 'i Sydfrankrike', 'in the South of France']],
  }),
  // ---------- Si + imparfait ----------
  cloze(D, 'fr-gram-b1-si-imparfait', {
    prompt: 'Si + imparfait: Si j’___ un CDI, je pourrais louer un appartement. (avoir)',
    promptEn: 'Si + imparfait: Si j’___ un CDI, je pourrais louer un appartement. (avoir)',
    fr: 'Si j’avais un CDI, je pourrais louer un appartement.', sv: 'Om jag hade en fast anställning skulle jag kunna hyra en lägenhet.', en: 'If I had a permanent contract, I could rent a flat.',
    ipa: '/si ʒa.vɛ œ̃ se.de.i ʒə pu.ʁɛ lwe œ̃.n‿a.paʁ.tə.mɑ̃/',
    note: 'Efter **si** står **imparfait**, aldrig konditionalis: *si j’avais*, inte *si j’aurais*. Konditionalis kommer i huvudsatsen.',
    noteEn: 'After **si** comes the **imparfait**, never the conditional: *si j’avais*, not *si j’aurais*. The conditional goes in the main clause.',
    gloss: [['si', 'om', 'if'], ['j’avais', 'jag hade', 'I had'], ['un CDI', 'en fast anställning', 'a permanent contract'], ['je pourrais', 'skulle jag kunna', 'I could'], ['louer', 'hyra', 'rent'], ['un appartement', 'en lägenhet', 'a flat']],
  }),
  cloze(D, 'fr-gram-b1-si-conditionnel', {
    prompt: 'Huvudsatsen efter si + imparfait: Si tu venais samedi, on ___ l’apéro sur le balcon. (prendre)',
    promptEn: 'The main clause after si + imparfait: Si tu venais samedi, on ___ l’apéro sur le balcon. (prendre)',
    fr: 'Si tu venais samedi, on prendrait l’apéro sur le balcon.', sv: 'Om du kom på lördag skulle vi ta en drink på balkongen.', en: 'If you came on Saturday, we’d have drinks on the balcony.',
    ipa: '/si ty və.nɛ sam.di ɔ̃ pʁɑ̃.dʁɛ la.pe.ʁo syʁ lə bal.kɔ̃/',
    note: 'Huvudsatsen står i **konditionalis**: *prendr-* + *-ait*. För verb på *-re* faller slutets *e* bort: *prendre* blir *prendr-*.',
    noteEn: 'The main clause is in the **conditional**: *prendr-* + *-ait*. Verbs in *-re* drop the final *e*: *prendre* becomes *prendr-*.',
    gloss: [['si', 'om', 'if'], ['tu venais', 'du kom', 'you came'], ['samedi', 'på lördag', 'on Saturday'], ['on prendrait', 'skulle vi ta', 'we’d have'], ['l’apéro', 'en drink', 'drinks'], ['sur le balcon', 'på balkongen', 'on the balcony']],
  }),
  // ---------- Subjonctif présent ----------
  cloze(D, 'fr-gram-b1-subj-il-faut', {
    prompt: 'Subjonctif efter il faut que: Il faut que tu ___ ce formulaire avant vendredi. (remplir)',
    promptEn: 'Subjunctive after il faut que: Il faut que tu ___ ce formulaire avant vendredi. (remplir)',
    fr: 'Il faut que tu remplisses ce formulaire avant vendredi.', sv: 'Du måste fylla i den här blanketten före fredag.', en: 'You have to fill in this form before Friday.',
    ipa: '/il fo kə ty ʁɑ̃.plis sə fɔʁ.my.lɛʁ a.vɑ̃ vɑ̃.dʁə.di/',
    note: 'Subjonctif bildas på stammen från *ils* i presens: *ils rempliss-ent* ger *que tu rempliss-es*. Ändelserna *-e, -es, -e, -ions, -iez, -ent* är samma för nästan alla verb.',
    noteEn: 'The subjunctive is built on the *ils* present stem: *ils rempliss-ent* gives *que tu rempliss-es*. The endings *-e, -es, -e, -ions, -iez, -ent* are the same for nearly all verbs.',
    gloss: [['il faut que', 'det krävs att', 'it’s necessary that'], ['tu remplisses', 'du fyller i', 'you fill in'], ['ce formulaire', 'den här blanketten', 'this form'], ['avant vendredi', 'före fredag', 'before Friday']],
  }),
  cloze(D, 'fr-gram-b1-subj-sentiment', {
    prompt: 'Subjonctif efter en känsla: Je suis content que vous ___ là. (être)',
    promptEn: 'Subjunctive after a feeling: Je suis content que vous ___ là. (être)',
    fr: 'Je suis content que vous soyez là.', sv: 'Jag är glad att ni är här.', en: 'I’m glad you’re here.',
    ipa: '/ʒə sɥi kɔ̃.tɑ̃ kə vu swa.je la/',
    note: 'Glädje, sorg, rädsla och förvåning följs av **subjonctif**. *Être* är oregelbundet: *que je sois, que tu sois, qu’il soit, que nous soyons, que vous soyez, qu’ils soient*.',
    noteEn: 'Joy, sadness, fear and surprise take the **subjunctive**. *Être* is irregular: *que je sois, que tu sois, qu’il soit, que nous soyons, que vous soyez, qu’ils soient*.',
    gloss: [['je suis content', 'jag är glad', 'I’m glad'], ['que', 'att', 'that'], ['vous soyez', 'ni är', 'you are'], ['là', 'här', 'here']],
  }),
  cloze(D, 'fr-gram-b1-subj-opinion', {
    prompt: 'Subjonctif efter nekad åsikt: Je ne pense pas qu’il ___ raison. (avoir)',
    promptEn: 'Subjunctive after a negative opinion: Je ne pense pas qu’il ___ raison. (avoir)',
    fr: 'Je ne pense pas qu’il ait raison.', sv: 'Jag tror inte att han har rätt.', en: 'I don’t think he’s right.',
    ipa: '/ʒə nə pɑ̃s pa kil ɛ ʁɛ.zɔ̃/',
    note: 'Jakande *je pense qu’il a raison* tar indikativ, nekande **je ne pense pas qu’il ait raison** tar subjonctif. *Avoir*: *que j’aie, qu’il ait, que nous ayons*.',
    noteEn: 'Affirmative *je pense qu’il a raison* takes the indicative, negative **je ne pense pas qu’il ait raison** takes the subjunctive. *Avoir*: *que j’aie, qu’il ait, que nous ayons*.',
    gloss: [['je ne pense pas', 'jag tror inte', 'I don’t think'], ['qu’il', 'att han', 'that he'], ['ait raison', 'har rätt', 'is right']],
  }),
  // ---------- Qui / que / où / dont ----------
  cloze(D, 'fr-gram-b1-relatif-dont', {
    prompt: 'Välj qui / que / où / dont: C’est le livre ___ je t’ai parlé. (parler de)',
    promptEn: 'Choose qui / que / où / dont: C’est le livre ___ je t’ai parlé. (parler de)',
    fr: 'C’est le livre dont je t’ai parlé.', sv: 'Det är boken som jag berättade om för dig.', en: 'That’s the book I told you about.',
    ipa: '/sɛ lə livʁ dɔ̃ ʒə te paʁ.le/',
    note: '**Dont** ersätter *de* + något: *parler de ce livre* blir *le livre dont je parle*. Svenskan och engelskan flyttar prepositionen till slutet, franskan bakar in den i pronomenet.',
    noteEn: '**Dont** replaces *de* + something: *parler de ce livre* becomes *le livre dont je parle*. English leaves the preposition at the end; French builds it into the pronoun.',
    gloss: [['c’est', 'det är', 'that’s'], ['le livre', 'boken', 'the book'], ['dont', 'som ... om', 'about which'], ['je t’ai parlé', 'jag berättade för dig', 'I told you']],
  }),
  cloze(D, 'fr-gram-b1-relatif-ou', {
    prompt: 'Välj qui / que / où / dont: La ville ___ j’ai grandi est au bord de la mer. (plats)',
    promptEn: 'Choose qui / que / où / dont: La ville ___ j’ai grandi est au bord de la mer. (place)',
    fr: 'La ville où j’ai grandi est au bord de la mer.', sv: 'Staden där jag växte upp ligger vid havet.', en: 'The town where I grew up is by the sea.',
    ipa: '/la vil u ʒe ɡʁɑ̃.di ɛ.t‿o bɔʁ də la mɛʁ/',
    note: '**Où** för plats och tid: *la ville où*, *le jour où*. **Qui** är subjekt, **que** objekt: *la ville qui me plaît*, *la ville que j’aime*.',
    noteEn: '**Où** for place and time: *la ville où*, *le jour où*. **Qui** is a subject, **que** an object: *la ville qui me plaît*, *la ville que j’aime*.',
    gloss: [['la ville', 'staden', 'the town'], ['où', 'där', 'where'], ['j’ai grandi', 'jag växte upp', 'I grew up'], ['est', 'ligger', 'is'], ['au bord de la mer', 'vid havet', 'by the sea']],
  }),
  // ---------- Gérondif ----------
  cloze(D, 'fr-gram-b1-gerondif', {
    prompt: 'Gerundium: J’ai trouvé ce travail ___ les offres sur Internet. (regarder)',
    promptEn: 'Gerund: J’ai trouvé ce travail ___ les offres sur Internet. (regarder)',
    fr: 'J’ai trouvé ce travail en regardant les offres sur Internet.', sv: 'Jag hittade det här jobbet genom att titta på annonserna på nätet.', en: 'I found this job by looking at the ads online.',
    ipa: '/ʒe tʁu.ve sə tʁa.vaj ɑ̃ ʁə.ɡaʁ.dɑ̃ le.z‿ɔfʁ syʁ ɛ̃.tɛʁ.nɛt/',
    note: '**Gérondif** = *en* + stammen från *nous* + *-ant*: *nous regard-ons* ger *en regardant*. Det uttrycker sätt (*genom att*) eller samtidighet (*medan*).',
    noteEn: '**Gérondif** = *en* + the *nous* stem + *-ant*: *nous regard-ons* gives *en regardant*. It expresses manner (*by doing*) or simultaneity (*while doing*).',
    gloss: [['j’ai trouvé', 'jag hittade', 'I found'], ['ce travail', 'det här jobbet', 'this job'], ['en regardant', 'genom att titta på', 'by looking at'], ['les offres', 'annonserna', 'the ads'], ['sur Internet', 'på nätet', 'online']],
  }),
  // ---------- Discours indirect ----------
  cloze(D, 'fr-gram-b1-discours-indirect', {
    prompt: 'Indirekt tal (han sa ”Je serai en retard”): Il m’a dit qu’il ___ en retard. (être)',
    promptEn: 'Reported speech (he said "Je serai en retard"): Il m’a dit qu’il ___ en retard. (être)',
    fr: 'Il m’a dit qu’il serait en retard.', sv: 'Han sa till mig att han skulle bli sen.', en: 'He told me he would be late.',
    ipa: '/il ma di kil sə.ʁɛ ɑ̃ ʁə.taʁ/',
    note: 'När anföringsverbet står i dåtid blir futurum **konditionalis**: *je serai* blir *il serait*. Presens blir imparfait: *”Je suis là”* blir *il a dit qu’il était là*.',
    noteEn: 'When the reporting verb is in the past, the future becomes the **conditional**: *je serai* becomes *il serait*. The present becomes the imparfait: *"Je suis là"* becomes *il a dit qu’il était là*.',
    gloss: [['il m’a dit', 'han sa till mig', 'he told me'], ['qu’il', 'att han', 'that he'], ['serait', 'skulle bli', 'would be'], ['en retard', 'sen', 'late']],
  }),
  // ---------- Doubles pronoms ----------
  cloze(D, 'fr-gram-b1-doubles-pronoms', {
    prompt: 'Två pronomen i rätt ordning: Les photos ? Je ___ montrerai ce soir. (te + les)',
    promptEn: 'Two pronouns in the right order: Les photos ? Je ___ montrerai ce soir. (te + les)',
    fr: 'Les photos ? Je te les montrerai ce soir.', sv: 'Bilderna? Jag ska visa dig dem i kväll.', en: 'The photos? I’ll show them to you tonight.',
    ipa: '/le fɔ.to ʒə tə le mɔ̃.tʁə.ʁe sə swaʁ/',
    note: 'Ordningen är **me / te / nous / vous** före **le / la / les**, som i sin tur står före **lui / leur**: *je te les montre*, men *je les lui montre*.',
    noteEn: 'The order is **me / te / nous / vous** before **le / la / les**, which in turn come before **lui / leur**: *je te les montre*, but *je les lui montre*.',
    gloss: [['les photos', 'bilderna', 'the photos'], ['je', 'jag', 'I'], ['te', 'dig', 'to you'], ['les', 'dem', 'them'], ['montrerai', 'ska visa', 'will show'], ['ce soir', 'i kväll', 'tonight']],
  }),
];
