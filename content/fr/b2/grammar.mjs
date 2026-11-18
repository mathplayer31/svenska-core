// FranceCore, Fondations : grammaire B2 (16 phrases à trou), ouverte après l'unité 31.
import { cloze, foundationDeck } from '../helpers.mjs';

export const GRAMMAR_B2_DECK = foundationDeck({
  slug: 'fr-grammar-b2', sv: 'Grammatik B2', en: 'B2 grammar',
  category: 'grammar', level: 'B2', order: 6, after: 'fr-unit-31-history',
});
const D = GRAMMAR_B2_DECK.slug;

export const GRAMMAR_B2_CARDS = [
  // ===== Subjonctif après conjonction =====
  cloze(D, 'fr-gram-b2-bien-que', {
    prompt: 'Konjunktiv efter konjunktion: Bien qu’il ___, nous partons en randonnée. (pleuvoir)', promptEn: 'Subjunctive after a conjunction: Bien qu’il ___, nous partons en randonnée. (pleuvoir)',
    fr: 'Bien qu’il pleuve, nous partons en randonnée.', sv: 'Fast det regnar ger vi oss ut på vandring.', en: 'Although it’s raining, we’re going hiking.',
    ipa: '/bjɛ̃ kil plœv nu paʁ.tɔ̃.z‿ɑ̃ ʁɑ̃.dɔ.ne/',
    note: '**bien que** (fast, trots att) kräver alltid konjunktiv, även om det handlar om ett faktum. Konjunktiv av *pleuvoir*: **qu’il pleuve**.',
    noteEn: '**bien que** (although) always takes the subjunctive, even for a plain fact. Subjunctive of *pleuvoir*: **qu’il pleuve**.',
    gloss: [['bien qu’', 'fast', 'although'], ['il pleuve', 'det regnar', 'it’s raining'], ['nous partons', 'vi ger oss ut', 'we’re going'], ['en randonnée', 'på vandring', 'hiking']],
  }),
  cloze(D, 'fr-gram-b2-pour-que', {
    prompt: 'Konjunktiv efter konjunktion: Je parle lentement pour que tu ___. (comprendre)', promptEn: 'Subjunctive after a conjunction: Je parle lentement pour que tu ___. (comprendre)',
    fr: 'Je parle lentement pour que tu comprennes.', sv: 'Jag talar långsamt så att du ska förstå.', en: 'I’m speaking slowly so that you understand.',
    ipa: '/ʒə paʁl lɑ̃t.mɑ̃ puʁ kə ty kɔ̃.pʁɛn/',
    note: '**pour que** (för att, så att) + konjunktiv när subjekten är olika. Med samma subjekt används infinitiv: *Je parle lentement pour être compris.* Stammen får dubbelt **n**: *comprennes*.',
    noteEn: '**pour que** (so that) + subjunctive when the subjects differ. With the same subject, use the infinitive: *Je parle lentement pour être compris.* The stem doubles the **n**: *comprennes*.',
    gloss: [['je parle', 'jag talar', 'I’m speaking'], ['lentement', 'långsamt', 'slowly'], ['pour que', 'så att', 'so that'], ['tu comprennes', 'du förstår', 'you understand']],
  }),
  cloze(D, 'fr-gram-b2-avant-que', {
    prompt: 'Konjunktiv efter konjunktion: Rentrons avant qu’il ne ___ trop tard. (être)', promptEn: 'Subjunctive after a conjunction: Rentrons avant qu’il ne ___ trop tard. (être)',
    fr: 'Rentrons avant qu’il ne soit trop tard.', sv: 'Låt oss åka hem innan det blir för sent.', en: 'Let’s go home before it’s too late.',
    ipa: '/ʁɑ̃.tʁɔ̃ a.vɑ̃ kil nə swa tʁo taʁ/',
    note: '**avant que** + konjunktiv. Det lilla **ne** är inte en negation (*ne explétif*): det hör till skriftspråket och kan utelämnas utan att betydelsen ändras.',
    noteEn: '**avant que** + subjunctive. The little **ne** is not a negative (*ne explétif*): it belongs to formal style and can be dropped with no change in meaning.',
    gloss: [['rentrons', 'låt oss åka hem', 'let’s go home'], ['avant qu’', 'innan', 'before'], ['il', 'det', 'it'], ['ne', '(stilmarkör)', '(formal particle)'], ['soit', 'blir', 'is'], ['trop tard', 'för sent', 'too late']],
  }),
  cloze(D, 'fr-gram-b2-sans-que', {
    prompt: 'Konjunktiv efter konjunktion: Il est parti sans que je le ___. (savoir)', promptEn: 'Subjunctive after a conjunction: Il est parti sans que je le ___. (savoir)',
    fr: 'Il est parti sans que je le sache.', sv: 'Han gick utan att jag visste om det.', en: 'He left without my knowing.',
    ipa: '/il ɛ paʁ.ti sɑ̃ kə ʒə lə saʃ/',
    note: '**sans que** + konjunktiv. *savoir* har en oregelbunden konjunktiv: **que je sache**, som också finns i uttrycket *pas que je sache* (inte vad jag vet).',
    noteEn: '**sans que** + subjunctive. *savoir* has an irregular subjunctive: **que je sache**, also found in the phrase *pas que je sache* (not that I know of).',
    gloss: [['il est parti', 'han gick', 'he left'], ['sans que', 'utan att', 'without'], ['je', 'jag', 'I'], ['le', 'det', 'it'], ['sache', 'visste', 'knew']],
  }),

  // ===== Conditionnel passé =====
  cloze(D, 'fr-gram-b2-aurais-aime', {
    prompt: 'Konditionalis perfekt: J’___ venir, mais j’étais malade. (aimer)', promptEn: 'Past conditional: J’___ venir, mais j’étais malade. (aimer)',
    fr: 'J’aurais aimé venir, mais j’étais malade.', sv: 'Jag hade gärna kommit, men jag var sjuk.', en: 'I would have liked to come, but I was ill.',
    ipa: '/ʒo.ʁɛ.z‿ɛ.me və.niʁ mɛ ʒe.tɛ ma.lad/',
    note: 'Konditionalis av *avoir* + perfekt particip: **j’aurais aimé**. Uttrycker en önskan som inte blev av, som svenskans ”hade gärna”.',
    noteEn: 'Conditional of *avoir* + past participle: **j’aurais aimé**. It expresses a wish that didn’t come true.',
    gloss: [['j’aurais aimé', 'jag hade gärna', 'I would have liked'], ['venir', 'kommit', 'to come'], ['mais', 'men', 'but'], ['j’étais', 'jag var', 'I was'], ['malade', 'sjuk', 'ill']],
  }),
  cloze(D, 'fr-gram-b2-aurais-du', {
    prompt: 'Konditionalis perfekt (förebråelse): Tu ___ me prévenir ! (devoir)', promptEn: 'Past conditional (reproach): Tu ___ me prévenir ! (devoir)',
    fr: 'Tu aurais dû me prévenir !', sv: 'Du borde ha sagt till mig!', en: 'You should have warned me!',
    ipa: '/ty o.ʁɛ dy mə pʁe.vniʁ/',
    note: '**tu aurais dû** + infinitiv = du borde ha. Lägg märke till ordföljden: infinitiven står i presens, medan svenskan och engelskan sätter den i perfekt. **dû** har cirkumflex för att skiljas från *du*.',
    noteEn: '**tu aurais dû** + infinitive = you should have. Word order differs from English: the infinitive stays plain (*prévenir*), the past goes on *devoir*. **dû** has a circumflex to tell it from *du*.',
    gloss: [['tu', 'du', 'you'], ['aurais dû', 'borde ha', 'should have'], ['me', 'mig', 'me'], ['prévenir', 'sagt till', 'warned']],
  }),

  // ===== Si + plus-que-parfait =====
  cloze(D, 'fr-gram-b2-si-javais-su', {
    prompt: 'Si + pluskvamperfekt: Si j’avais su, je ne ___ pas venu. (être)', promptEn: 'Si + pluperfect: Si j’avais su, je ne ___ pas venu. (être)',
    fr: 'Si j’avais su, je ne serais pas venu.', sv: 'Om jag hade vetat det hade jag inte kommit.', en: 'If I’d known, I wouldn’t have come.',
    ipa: '/si ʒa.vɛ sy ʒə nə sə.ʁɛ pa və.ny/',
    note: 'Efter **si** står pluskvamperfekt, i huvudsatsen konditionalis perfekt. Aldrig konditionalis efter *si*. Repliken är berömd från filmen *La Guerre des boutons* (1962).',
    noteEn: 'After **si** comes the pluperfect, in the main clause the past conditional. Never a conditional after *si*. The line is famous from the film *La Guerre des boutons* (1962).',
    gloss: [['si', 'om', 'if'], ['j’avais su', 'jag hade vetat', 'I’d known'], ['je', 'jag', 'I'], ['ne ... pas', 'inte', 'not'], ['serais', 'hade', 'would have'], ['venu', 'kommit', 'come']],
  }),
  cloze(D, 'fr-gram-b2-si-etions-partis', {
    prompt: 'Si + pluskvamperfekt: Si nous ___ plus tôt, nous aurions eu le train. (partir)', promptEn: 'Si + pluperfect: Si nous ___ plus tôt, nous aurions eu le train. (partir)',
    fr: 'Si nous étions partis plus tôt, nous aurions eu le train.', sv: 'Om vi hade åkt tidigare hade vi hunnit med tåget.', en: 'If we had left earlier, we would have caught the train.',
    ipa: '/si nu.z‿e.tjɔ̃ paʁ.ti ply to nu.z‿o.ʁjɔ̃.z‿y lə tʁɛ̃/',
    note: '*partir* bildar perfekt med **être**, därför **nous étions partis**, med pluralböjt particip. **avoir le train** = hinna med tåget; *rater le train* = missa det.',
    noteEn: '*partir* takes **être**, hence **nous étions partis**, with a plural participle. **avoir le train** = to catch the train; *rater le train* = to miss it.',
    gloss: [['si', 'om', 'if'], ['nous étions partis', 'vi hade åkt', 'we had left'], ['plus tôt', 'tidigare', 'earlier'], ['nous aurions eu', 'hade vi hunnit med', 'we would have caught'], ['le train', 'tåget', 'the train']],
  }),

  // ===== Passif =====
  cloze(D, 'fr-gram-b2-passif-votee', {
    prompt: 'Passiv (passé composé): La loi ___ ___ par l’Assemblée nationale. (voter)', promptEn: 'Passive (passé composé): La loi ___ ___ par l’Assemblée nationale. (voter)',
    fr: 'La loi a été votée par l’Assemblée nationale.', sv: 'Lagen röstades igenom av nationalförsamlingen.', en: 'The law was passed by the National Assembly.',
    ipa: '/la lwa a e.te vɔ.te paʁ la.sɑ̃.ble na.sjɔ.nal/',
    note: 'Passiv = **être** i rätt tempus + particip, som böjs efter subjektet: *la loi* är femininum, alltså **votée**. Den som utför handlingen inleds med **par**.',
    noteEn: 'Passive = **être** in the right tense + participle, which agrees with the subject: *la loi* is feminine, so **votée**. The doer is introduced by **par**.',
    gloss: [['la loi', 'lagen', 'the law'], ['a été votée', 'röstades igenom', 'was passed'], ['par', 'av', 'by'], ['l’Assemblée nationale', 'nationalförsamlingen', 'the National Assembly']],
  }),
  cloze(D, 'fr-gram-b2-passif-construites', {
    prompt: 'Passiv (passé composé): Ces maisons ___ ___ ___ au XIXe siècle. (construire)', promptEn: 'Passive (passé composé): Ces maisons ___ ___ ___ au XIXe siècle. (construire)',
    fr: 'Ces maisons ont été construites au XIXe siècle.', sv: 'De här husen byggdes på 1800-talet.', en: 'These houses were built in the 19th century.',
    ipa: '/se mɛ.zɔ̃ ɔ̃.t‿e.te kɔ̃s.tʁɥit o diz.nœ.vjɛm sjɛkl/',
    note: 'Femininum plural ger **construites**. Århundraden skrivs med romerska siffror och räknas annorlunda: **le XIXe siècle** (det nittonde) motsvarar 1800-talet.',
    noteEn: 'Feminine plural gives **construites**. Centuries are written in Roman numerals: **le XIXe siècle** = the 19th century, the 1800s.',
    gloss: [['ces maisons', 'de här husen', 'these houses'], ['ont été construites', 'byggdes', 'were built'], ['au XIXe siècle', 'på 1800-talet', 'in the 19th century']],
  }),

  // ===== Participe présent =====
  cloze(D, 'fr-gram-b2-ayant', {
    prompt: 'Presens particip: Les candidats ___ un diplôme peuvent postuler. (avoir)', promptEn: 'Present participle: Les candidats ___ un diplôme peuvent postuler. (avoir)',
    fr: 'Les candidats ayant un diplôme peuvent postuler.', sv: 'Sökande som har en examen kan söka.', en: 'Candidates holding a degree may apply.',
    ipa: '/le kɑ̃.di.da ɛ.jɑ̃ œ̃ di.plom pœv pɔs.ty.le/',
    note: 'Presens particip (**-ant**) ersätter en relativsats, *qui ont*, i formell stil och i annonser. Det böjs aldrig. Oregelbundna former: **ayant** (*avoir*), *étant* (*être*), *sachant* (*savoir*).',
    noteEn: 'The present participle (**-ant**) replaces a relative clause, *qui ont*, in formal style and job ads. It never agrees. Irregular forms: **ayant** (*avoir*), *étant* (*être*), *sachant* (*savoir*).',
    gloss: [['les candidats', 'de sökande', 'candidates'], ['ayant', 'som har', 'holding'], ['un diplôme', 'en examen', 'a degree'], ['peuvent', 'kan', 'may'], ['postuler', 'söka', 'apply']],
  }),

  // ===== Connecteurs =====
  cloze(D, 'fr-gram-b2-pourtant', {
    prompt: 'Sambandsord: Il a beaucoup travaillé ; ___, il a raté son examen. (donc / pourtant)', promptEn: 'Connector: Il a beaucoup travaillé ; ___, il a raté son examen. (donc / pourtant)',
    fr: 'Il a beaucoup travaillé ; pourtant, il a raté son examen.', sv: 'Han pluggade mycket; ändå kuggade han på provet.', en: 'He worked hard; yet he failed his exam.',
    ipa: '/il a bo.ku tʁa.va.je puʁ.tɑ̃ il a ʁa.te sɔ̃.n‿ɛɡ.za.mɛ̃/',
    note: 'Resultatet går emot förväntan, alltså **pourtant**. *Donc* skulle ange en följd. Före semikolon sätter man mellanslag på franska.',
    noteEn: 'The outcome goes against expectation, so **pourtant**. *Donc* would signal a consequence. French puts a space before a semicolon.',
    gloss: [['il a beaucoup travaillé', 'han pluggade mycket', 'he worked hard'], ['pourtant', 'ändå', 'yet'], ['il a raté', 'han kuggade på', 'he failed'], ['son examen', 'provet', 'his exam']],
  }),

  // ===== Mise en relief =====
  cloze(D, 'fr-gram-b2-ce-qui', {
    prompt: 'Framhävning: ___ ___ me dérange, c’est le bruit. (ce qui / ce que)', promptEn: 'Emphasis: ___ ___ me dérange, c’est le bruit. (ce qui / ce que)',
    fr: 'Ce qui me dérange, c’est le bruit.', sv: 'Det som stör mig är oljudet.', en: 'What bothers me is the noise.',
    ipa: '/sə ki mə de.ʁɑ̃ʒ sɛ lə bʁɥi/',
    note: '**ce qui** är subjekt för verbet (*ce qui dérange*), **ce que** är objekt (*ce que j’aime*). Strukturen *ce qui ..., c’est ...* lyfter fram det viktiga i slutet.',
    noteEn: '**ce qui** is the subject of the verb (*ce qui dérange*), **ce que** the object (*ce que j’aime*). The pattern *ce qui ..., c’est ...* saves the key point for the end.',
    gloss: [['ce qui', 'det som', 'what'], ['me dérange', 'stör mig', 'bothers me'], ['c’est', 'är', 'is'], ['le bruit', 'oljudet', 'the noise']],
  }),
  cloze(D, 'fr-gram-b2-cest-que', {
    prompt: 'Framhävning: C’est en 1789 ___ la Révolution a commencé. (qui / que)', promptEn: 'Emphasis: C’est en 1789 ___ la Révolution a commencé. (qui / que)',
    fr: 'C’est en 1789 que la Révolution a commencé.', sv: 'Det var 1789 som revolutionen började.', en: 'It was in 1789 that the Revolution began.',
    ipa: '/sɛ.t‿ɑ̃ mil sɛt sɑ̃ ka.tʁə.vɛ̃.nœf kə la ʁe.vɔ.ly.sjɔ̃ a kɔ.mɑ̃.se/',
    note: '**c’est ... qui** lyfter fram subjektet, **c’est ... que** allt annat: tid, plats, objekt. Lägg märke till att franskan säger **c’est** i presens även om det handlar om det förflutna.',
    noteEn: '**c’est ... qui** highlights the subject, **c’est ... que** everything else: time, place, object. Note that French says **c’est** in the present even about the past.',
    gloss: [['c’est', 'det var', 'it was'], ['en 1789', '1789', 'in 1789'], ['que', 'som', 'that'], ['la Révolution', 'revolutionen', 'the Revolution'], ['a commencé', 'började', 'began']],
  }),

  // ===== Passé simple (lecture) =====
  cloze(D, 'fr-gram-b2-passe-simple', {
    prompt: 'Passé simple (läsförståelse): Louis XVI ___ guillotiné en 1793. (être)', promptEn: 'Passé simple (reading): Louis XVI ___ guillotiné en 1793. (être)',
    fr: 'Louis XVI fut guillotiné en 1793.', sv: 'Ludvig XVI giljotinerades 1793.', en: 'Louis XVI was guillotined in 1793.',
    ipa: '/lwi sɛz fy ɡi.jɔ.ti.ne ɑ̃ mil sɛt sɑ̃ ka.tʁə.vɛ̃.tʁɛz/',
    note: '**fut** är passé simple av *être*. Formen används nästan bara i skrift, men du måste känna igen den för att läsa romaner och historieböcker. Kungars nummer läses som grundtal: *Louis seize*.',
    noteEn: '**fut** is the passé simple of *être*. It is used almost only in writing, but you need to recognise it to read novels and history books. Royal numbers are read as cardinals: *Louis seize*.',
    gloss: [['Louis XVI', 'Ludvig XVI', 'Louis XVI'], ['fut guillotiné', 'giljotinerades', 'was guillotined'], ['en 1793', '1793', 'in 1793']],
  }),

  // ===== Accord du participe avec avoir =====
  cloze(D, 'fr-gram-b2-accord-avoir', {
    prompt: 'Particip med avoir: Les lettres que j’ai ___ sont sur la table. (écrire)', promptEn: 'Participle with avoir: Les lettres que j’ai ___ sont sur la table. (écrire)',
    fr: 'Les lettres que j’ai écrites sont sur la table.', sv: 'Breven som jag har skrivit ligger på bordet.', en: 'The letters I wrote are on the table.',
    ipa: '/le lɛ.tʁə kə ʒe e.kʁit sɔ̃ syʁ la tabl/',
    note: 'Med **avoir** böjs participet bara när objektet står före verbet: här *que* = *les lettres* (femininum plural), alltså **écrites**. Jämför: *J’ai écrit des lettres*, utan böjning. Här hörs böjningen: [ekʁit].',
    noteEn: 'With **avoir** the participle agrees only when the direct object comes before the verb: here *que* = *les lettres* (feminine plural), so **écrites**. Compare: *J’ai écrit des lettres*, no agreement. Here you can hear it: [ekʁit].',
    gloss: [['les lettres', 'breven', 'the letters'], ['que', 'som', 'that'], ['j’ai écrites', 'jag har skrivit', 'I wrote'], ['sont', 'ligger', 'are'], ['sur la table', 'på bordet', 'on the table']],
  }),
];
