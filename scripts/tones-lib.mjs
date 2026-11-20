// Accents tonals suédois (issue #10) : de la saisie de content/sv/tones.mjs aux données de la courbe.
// Tout est vérifié contre l'IPA de la carte ; la moindre incohérence lève une erreur (pas de courbe fausse).

const ARTICLES = /^(en|ett|att)\s+/i;
const IPA_ARTICLES = /^(ɛn|ɛtː?|atː?)\s+/;
// Voyelles écrites et voyelles IPA du suédois ; une suite de voyelles = un noyau de syllabe
const ORTHO_VOWELS = /[aeiouyåäöéAEIOUYÅÄÖÉ]+/g;
const IPA_VOWEL = 'iyɪʏeøɛœaɑɒoɔuʊʉɵəæ';

/** Mot de tête : 1re forme, sans parenthèse ni article ; null si plusieurs mots */
export function headWord(target) {
  const first = target.split(' / ')[0].replace(/\(.*?\)/g, '').trim().replace(ARTICLES, '');
  return /^[\p{L}-]+$/u.test(first) ? first : null;
}

/** Plages [début, fin) des noyaux vocaliques du mot écrit */
export function orthoNuclei(word) {
  return [...word.matchAll(ORTHO_VOWELS)].map((m) => [m.index, m.index + m[0].length]);
}

/** IPA de la 1re forme : noyaux, syllabe accentuée (ˈ) et accent secondaire (ˌ) */
export function ipaInfo(ipa) {
  const first = ipa.split(' / ')[0].replace(/\(.*?\)/g, '').trim().replace(/^\/|\/$/g, '').trim().replace(IPA_ARTICLES, '');
  if (/\s/.test(first)) return null;
  let nuclei = 0;
  let inVowel = false;
  let stress = null;
  let secondary = null;
  for (const ch of first) {
    if (ch === 'ˈ') stress = nuclei;
    else if (ch === 'ˌ') secondary = nuclei;
    if (IPA_VOWEL.includes(ch)) {
      if (!inVowel) nuclei++;
      inVowel = true;
    } else if (ch !== '̃' && ch !== '̞' && ch !== '̝') {
      // ː termine la voyelle longue : « snøːar » a deux syllabes
      inVowel = false;
    }
  }
  return { ipa: first, nuclei, stress, secondary };
}

/**
 * Données de courbe pour une carte et son accent (1 ou 2).
 * Renvoie { a, w, v, s, p } : accent, mot, noyaux, syllabe accentuée, 2e sommet (accent 2).
 */
export function toneFor(card, accent) {
  if (accent !== 1 && accent !== 2) throw new Error(`accent ${accent} : 1 ou 2 attendu`);
  const w = headWord(card.swedish_target);
  if (!w) throw new Error(`« ${card.swedish_target} » : pas un mot seul`);
  const info = card.ipa_transcription ? ipaInfo(card.ipa_transcription) : null;
  if (!info) throw new Error(`« ${w} » : IPA absente ou à plusieurs mots`);
  const v = orthoNuclei(w);
  if (v.length !== info.nuclei) {
    throw new Error(`« ${w} » : ${v.length} syllabe(s) écrite(s), ${info.nuclei} dans l'IPA ${info.ipa}`);
  }
  if (v.length > 1 && info.stress === null) throw new Error(`« ${w} » : accent tonique absent de l'IPA ${info.ipa}`);
  const s = info.stress ?? 0;
  if (accent === 1) return { a: 1, w, v, s, p: null };
  // Accent 2 : il faut une syllabe après la syllabe accentuée ; 2e sommet sur l'accent secondaire (mot composé)
  const p = info.secondary ?? s + 1;
  if (p <= s || p >= v.length) throw new Error(`« ${w} » : accent 2 impossible (syllabe accentuée ${s + 1} sur ${v.length})`);
  return { a: 2, w, v, s, p };
}

/** Ajoute le champ `tone` à une carte exportée si son slug est saisi (erreur si la saisie est incohérente) */
export function withTone(card, tones) {
  const accent = tones[card.slug ?? card.id];
  if (!accent) return card;
  try {
    return { ...card, tone: toneFor(card, accent) };
  } catch (e) {
    throw new Error(`Accent tonal de ${card.slug ?? card.id} : ${e.message}`);
  }
}
