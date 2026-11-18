// FranceCore, Unité 16 : Démarches administratives (préfecture, mairie, dossier).
import { vocab, phrase, unitDeck } from '../helpers.mjs';

export const UNIT16_DECK = unitDeck({
  n: 16, slug: 'fr-unit-16-paperwork', sv: 'Myndighetsärenden', en: 'Paperwork',
  level: 'B1', section: 'fr-section-5-sinstaller', after: 'fr-unit-15-plans',
});
const D = UNIT16_DECK.slug;

export const UNIT16_CARDS = [
  // ===================== MOTS =====================
  vocab(D, 'fr-u16-prefecture', {
    prompt: 'Statens kontor i varje departement, där man bland annat söker uppehållstillstånd', promptEn: 'The state office in each département, where you apply for residence permits among other things',
    fr: 'la préfecture', sv: 'prefekturen', en: 'the prefecture',
    ipa: '/la pʁe.fɛk.tyʁ/',
    note: 'Prefekturen företräder staten lokalt. Som EU-medborgare behöver en svensk inget **titre de séjour** (uppehållstillstånd), men många andra utlänningar tillbringar långa timmar här.',
    noteEn: 'The prefecture represents the state locally. EU citizens don’t need a **titre de séjour** (residence permit), but many other foreigners spend long hours here.',
  }),
  vocab(D, 'fr-u16-mairie', {
    prompt: 'Kommunens kontor, även där man gifter sig', promptEn: 'The town office, also where people get married',
    fr: 'la mairie', sv: 'kommunhuset / rådhuset', en: 'the town hall',
    ipa: '/la me.ʁi/',
    note: 'Varje kommun, även den minsta byn, har sin **mairie** och sin borgmästare, **le maire**. I Frankrike är bara det borgerliga bröllopet på mairien juridiskt giltigt.',
    noteEn: 'Every commune, even the tiniest village, has its **mairie** and its mayor, **le maire**. In France only the civil wedding at the town hall is legally binding.',
  }),
  vocab(D, 'fr-u16-dossier', {
    prompt: 'Alla papper som hör till en ansökan', promptEn: 'All the papers that make up an application',
    fr: 'un dossier', sv: 'en ansökan / handlingar', en: 'a file / an application',
    ipa: '/œ̃ do.sje/',
    note: '*Constituer un dossier* = sätta ihop handlingarna, *déposer un dossier* = lämna in dem. Ett **dossier incomplet** (ofullständig ansökan) är fransk byråkratis klassiska mardröm.',
    noteEn: '*Constituer un dossier* = put the papers together, *déposer un dossier* = hand them in. A **dossier incomplet** (incomplete file) is the classic nightmare of French bureaucracy.',
  }),
  vocab(D, 'fr-u16-rendez-vous', {
    prompt: 'En bokad tid hos en myndighet eller läkare', promptEn: 'A booked slot at an office or a doctor’s',
    fr: 'un rendez-vous', sv: 'en bokad tid / ett möte', en: 'an appointment',
    ipa: '/œ̃ ʁɑ̃.de.vu/',
    note: '*Prendre rendez-vous* = boka en tid, ofta förkortat **RDV**. Ordet är oförändrat i plural: *des rendez-vous*, och betyder både affärsmöte och dejt.',
    noteEn: '*Prendre rendez-vous* = make an appointment, often shortened to **RDV**. The plural is unchanged: *des rendez-vous*, and it covers both business meetings and dates.',
  }),
  vocab(D, 'fr-u16-justificatif-de-domicile', {
    prompt: 'Papper som bevisar var du bor', promptEn: 'A document proving where you live',
    fr: 'un justificatif de domicile', sv: 'ett adressintyg', en: 'a proof of address',
    ipa: '/œ̃ ʒys.ti.fi.ka.tif də dɔ.mi.sil/',
    note: 'Frankrike har ingen folkbokföring: man bevisar sin adress med en el- eller telefonräkning **de moins de trois mois** (högst tre månader gammal). Det efterfrågas överallt, från banken till biblioteket.',
    noteEn: 'France has no population register: you prove your address with an electricity or phone bill **de moins de trois mois** (under three months old). It is asked for everywhere, from the bank to the library.',
  }),
  vocab(D, 'fr-u16-formulaire', {
    prompt: 'Blanketten man fyller i', promptEn: 'The form you fill in',
    fr: 'un formulaire', sv: 'en blankett', en: 'a form',
    ipa: '/œ̃ fɔʁ.my.lɛʁ/',
    note: '*Remplir un formulaire* = fylla i en blankett. Officiella blanketter kallas ofta **un Cerfa** efter numret i hörnet. Ordet är maskulint trots slutet på *-e*.',
    noteEn: '*Remplir un formulaire* = fill in a form. Official forms are often called **un Cerfa** after the number in the corner. The word is masculine despite the final *-e*.',
  }),
  vocab(D, 'fr-u16-piece-didentite', {
    prompt: 'Pass eller id-kort', promptEn: 'Passport or ID card',
    fr: 'une pièce d’identité', sv: 'en id-handling', en: 'an ID document',
    ipa: '/yn pjɛs di.dɑ̃.ti.te/',
    note: '**Pièce** betyder här *handling*, inte bit eller rum. Bilagorna till en ansökan kallas **les pièces justificatives**.',
    noteEn: '**Pièce** here means *document*, not piece or room. The supporting documents for an application are **les pièces justificatives**.',
  }),
  vocab(D, 'fr-u16-attestation', {
    prompt: 'Ett skriftligt intyg', promptEn: 'A written certificate',
    fr: 'une attestation', sv: 'ett intyg', en: 'a certificate / a statement',
    ipa: '/yn a.tɛs.ta.sjɔ̃/',
    note: 'Fransmän kräver intyg för allt: *attestation d’assurance*, *attestation de travail*. En **attestation sur l’honneur** är ett intyg på heder och samvete som man skriver själv.',
    noteEn: 'The French want a certificate for everything: *attestation d’assurance*, *attestation de travail*. An **attestation sur l’honneur** is a sworn statement you write yourself.',
  }),
  vocab(D, 'fr-u16-guichet', {
    prompt: 'Luckan där en tjänsteman tar emot', promptEn: 'The counter where a clerk serves you',
    fr: 'le guichet', sv: 'luckan / disken', en: 'the counter / the window',
    ipa: '/lə ɡi.ʃɛ/',
    note: '**gu** framför *i* och *e* uttalas [g], u:et är stumt. Man tar ofta en nummerlapp, **un ticket**, och väntar på att ens nummer visas.',
    noteEn: '**gu** before *i* and *e* is a hard [g]; the u is silent. You usually take a number, **un ticket**, and wait for it to be called.',
  }),
  vocab(D, 'fr-u16-acte-de-naissance', {
    prompt: 'Det officiella dokumentet om din födelse', promptEn: 'The official record of your birth',
    fr: 'un acte de naissance', sv: 'ett födelsebevis', en: 'a birth certificate',
    ipa: '/œ̃.n‿akt də nɛ.sɑ̃s/',
    note: 'Efterfrågas vid giftermål, PACS och medborgarskap. Utländska dokument måste ofta översättas av en auktoriserad translator: **une traduction assermentée**.',
    noteEn: 'Required for marriage, a PACS or citizenship. Foreign documents often need a sworn translation: **une traduction assermentée**.',
  }),
  vocab(D, 'fr-u16-rib', {
    prompt: 'Papperet med dina bankuppgifter', promptEn: 'The slip with your bank details',
    fr: 'un RIB', sv: 'bankuppgifter (utskrift)', en: 'bank details slip',
    ipa: '/œ̃ ʁib/',
    note: '**Relevé d’identité bancaire**: ett papper med IBAN och kontonummer. Arbetsgivare, hyresvärdar och elbolag ber alla om *un RIB*, och man uttalar det som ett ord: [ʁib].',
    noteEn: '**Relevé d’identité bancaire**: a slip with your IBAN and account number. Employers, landlords and energy companies all ask for *un RIB*, pronounced as one word: [ʁib].',
  }),
  vocab(D, 'fr-u16-paperasse', {
    prompt: 'Vardagligt ord för all byråkrati', promptEn: 'Casual word for all the red tape',
    fr: 'la paperasse', sv: 'pappersexercisen', en: 'the red tape / the paperwork',
    ipa: '/la pa.pʁas/',
    note: 'Ändelsen **-asse** gör ordet nedsättande. Att klaga på *la paperasse* är nästan en nationalsport, så det är ett bra samtalsämne.',
    noteEn: 'The ending **-asse** makes the word pejorative. Complaining about *la paperasse* is almost a national sport, so it makes good small talk.',
  }),

  // ===================== PHRASES =====================
  phrase(D, 'fr-u16-prendre-rendez-vous', {
    prompt: 'Be artigt om en tid för att lämna in din ansökan', promptEn: 'Politely ask for an appointment to submit your application',
    fr: 'J’aimerais prendre rendez-vous pour déposer mon dossier.', sv: 'Jag skulle vilja boka en tid för att lämna in min ansökan.', en: 'I’d like to make an appointment to submit my application.',
    ipa: '/ʒɛ.mə.ʁɛ pʁɑ̃dʁ ʁɑ̃.de.vu puʁ de.po.ze mɔ̃ do.sje/',
    note: 'Konditionalis **j’aimerais** (jag skulle vilja) är det artiga sättet att be om något. *Je veux* låter krävande i fransk mun.',
    noteEn: 'The conditional **j’aimerais** (I would like) is the polite way to ask. *Je veux* sounds demanding to French ears.',
    gloss: [['j’aimerais', 'jag skulle vilja', 'I’d like'], ['prendre rendez-vous', 'boka en tid', 'to make an appointment'], ['pour', 'för att', 'to'], ['déposer', 'lämna in', 'submit'], ['mon dossier', 'min ansökan', 'my application']],
  }),
  phrase(D, 'fr-u16-il-me-manque', {
    prompt: 'Säg att du saknar ett aktuellt adressintyg', promptEn: 'Say you are missing a recent proof of address',
    fr: 'Il me manque un justificatif de domicile de moins de trois mois.', sv: 'Jag saknar ett adressintyg som är högst tre månader gammalt.', en: 'I’m missing a proof of address less than three months old.',
    ipa: '/il mə mɑ̃k œ̃ ʒys.ti.fi.ka.tif də dɔ.mi.sil də mwɛ̃ də tʁwa mwa/',
    note: '**Manquer** vänder på konstruktionen: ordagrant ”det fattas mig ett intyg”. Samma verb ger *tu me manques* = jag saknar dig (du fattas mig).',
    noteEn: '**Manquer** flips the structure: literally "there is lacking to me a proof". The same verb gives *tu me manques* = I miss you (you are missing to me).',
    gloss: [['il me manque', 'jag saknar', 'I’m missing'], ['un justificatif de domicile', 'ett adressintyg', 'a proof of address'], ['de moins de', 'på mindre än', 'of less than'], ['trois mois', 'tre månader', 'three months']],
  }),
  phrase(D, 'fr-u16-quels-documents', {
    prompt: 'Fråga vilka handlingar man måste lämna in', promptEn: 'Ask which documents you have to provide',
    fr: 'Quels documents faut-il fournir ?', sv: 'Vilka handlingar måste man lämna in?', en: 'Which documents do I need to provide?',
    ipa: '/kɛl dɔ.ky.mɑ̃ fo.t‿il fuʁ.niʁ/',
    note: '**Il faut** är opersonligt (”det krävs”) och används överallt där svenskan säger *man måste*. Vid omvänd ordföljd uttalas t:et: *faut-il* [fotil].',
    noteEn: '**Il faut** is impersonal ("it is necessary") and is the go-to for "you have to". In the inverted form the t is pronounced: *faut-il* [fotil].',
    gloss: [['quels', 'vilka', 'which'], ['documents', 'handlingar', 'documents'], ['faut-il', 'måste man', 'must one'], ['fournir', 'lämna in', 'provide']],
  }),
  phrase(D, 'fr-u16-il-faut-que-vous', {
    prompt: 'Tjänstemannen säger att du måste fylla i och skriva under blanketten', promptEn: 'The clerk says you must fill in and sign the form',
    fr: 'Il faut que vous remplissiez ce formulaire et que vous le signiez.', sv: 'Ni måste fylla i den här blanketten och skriva under den.', en: 'You need to fill in this form and sign it.',
    ipa: '/il fo kə vu ʁɑ̃.pli.sje sə fɔʁ.my.lɛʁ e kə vu lə si.ɲje/',
    note: 'Efter **il faut que** kommer alltid **subjonctif**: *remplissiez*, *signiez*. **que** upprepas framför varje ny bisats, vilket svenskan inte gör.',
    noteEn: 'After **il faut que** you always use the **subjunctive**: *remplissiez*, *signiez*. **que** is repeated before each new clause, unlike in English.',
    gloss: [['il faut que', 'det krävs att', 'it’s necessary that'], ['vous', 'ni', 'you'], ['remplissiez', 'fyller i', 'fill in'], ['ce formulaire', 'den här blanketten', 'this form'], ['et que', 'och att', 'and that'], ['vous', 'ni', 'you'], ['le', 'den', 'it'], ['signiez', 'skriver under', 'sign']],
  }),
  phrase(D, 'fr-u16-dossier-incomplet', {
    prompt: 'Du får höra att ansökan är ofullständig och att du måste komma tillbaka med originalet', promptEn: 'You are told the file is incomplete and you must come back with the original',
    fr: 'Votre dossier est incomplet : il faudra revenir avec l’original.', sv: 'Er ansökan är ofullständig: ni får komma tillbaka med originalet.', en: 'Your file is incomplete: you’ll have to come back with the original.',
    ipa: '/vɔtʁ do.sje ɛ.t‿ɛ̃.kɔ̃.plɛ il fo.dʁa ʁə.və.niʁ a.vɛk lɔ.ʁi.ʒi.nal/',
    note: '**Il faudra** är futurum av *il faut*. Ta alltid med både original och kopior: franska myndigheter vill ofta se båda.',
    noteEn: '**Il faudra** is the future of *il faut*. Always bring originals and copies: French offices often want to see both.',
    gloss: [['votre dossier', 'er ansökan', 'your file'], ['est', 'är', 'is'], ['incomplet', 'ofullständig', 'incomplete'], ['il faudra', 'man kommer att behöva', 'you’ll have to'], ['revenir', 'komma tillbaka', 'come back'], ['avec', 'med', 'with'], ['l’original', 'originalet', 'the original']],
  }),
  phrase(D, 'fr-u16-quel-guichet', {
    prompt: 'Fråga artigt vilken lucka du ska gå till', promptEn: 'Politely ask which counter you should go to',
    fr: 'Pourriez-vous me dire à quel guichet je dois m’adresser ?', sv: 'Skulle ni kunna säga vilken lucka jag ska vända mig till?', en: 'Could you tell me which counter I should go to?',
    ipa: '/pu.ʁje vu mə diʁ a kɛl ɡi.ʃɛ ʒə dwa ma.dʁɛ.se/',
    note: '**Pourriez-vous** (skulle ni kunna) är artigare än *pouvez-vous*. **S’adresser à** = vända sig till, ett typiskt uttryck i myndighetsspråk.',
    noteEn: '**Pourriez-vous** (could you) is more polite than *pouvez-vous*. **S’adresser à** = to go to / enquire with, a typical officialese verb.',
    gloss: [['pourriez-vous', 'skulle ni kunna', 'could you'], ['me dire', 'säga mig', 'tell me'], ['à quel guichet', 'till vilken lucka', 'at which counter'], ['je dois', 'jag ska', 'I should'], ['m’adresser', 'vända mig', 'go / enquire']],
  }),
  phrase(D, 'fr-u16-demarches', {
    prompt: 'Klaga på att myndighetsärenden alltid tar längre tid än väntat', promptEn: 'Complain that paperwork always takes longer than expected',
    fr: 'Les démarches administratives prennent toujours plus de temps que prévu.', sv: 'Myndighetsärenden tar alltid längre tid än beräknat.', en: 'Admin procedures always take longer than expected.',
    ipa: '/le de.maʁʃ ad.mi.nis.tʁa.tiv pʁɛn tu.ʒuʁ plys də tɑ̃ kə pʁe.vy/',
    note: '**Une démarche** är ett steg i ett ärende, och *faire des démarches* = sköta pappersarbetet. **Que prévu** (än beräknat) är en kort, fast fras utan verb.',
    noteEn: '**Une démarche** is a step in an official process, and *faire des démarches* = deal with the formalities. **Que prévu** (than planned) is a short set phrase with no verb.',
    gloss: [['les démarches administratives', 'myndighetsärendena', 'admin procedures'], ['prennent', 'tar', 'take'], ['toujours', 'alltid', 'always'], ['plus de temps', 'längre tid', 'more time'], ['que prévu', 'än beräknat', 'than expected']],
  }),
  phrase(D, 'fr-u16-plus-de-creneaux', {
    prompt: 'Berätta (kvinna) att det inte fanns några tider på nätet, så du gick direkt till luckan', promptEn: 'Say (woman) there were no slots left online, so you went straight to the counter',
    fr: 'Il n’y avait plus de créneaux en ligne, alors je suis allée directement au guichet.', sv: 'Det fanns inga tider kvar på nätet, så jag gick direkt till luckan.', en: 'There were no slots left online, so I went straight to the counter.',
    ipa: '/il ni a.vɛ ply də kʁe.no ɑ̃ liɲ a.lɔʁ ʒə sɥi.z‿a.le di.ʁɛk.tə.mɑ̃ o ɡi.ʃɛ/',
    note: '**Imparfait** (*il n’y avait plus*) beskriver läget, **passé composé** (*je suis allée*) det man gjorde. **Un créneau** = en ledig tid, en lucka i schemat.',
    noteEn: 'The **imparfait** (*il n’y avait plus*) sets the scene, the **passé composé** (*je suis allée*) gives the action. **Un créneau** = a time slot.',
    gloss: [['il n’y avait plus', 'det fanns inte längre', 'there were no more'], ['de créneaux', 'tider', 'slots'], ['en ligne', 'på nätet', 'online'], ['alors', 'så', 'so'], ['je suis allée', 'jag gick', 'I went'], ['directement', 'direkt', 'straight'], ['au guichet', 'till luckan', 'to the counter']],
  }),
];
