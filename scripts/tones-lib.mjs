// Swedish tonal accents (issue #10): from the entries in content/sv/tones.mjs to the curve data.
// Everything is checked against the card's IPA; the slightest inconsistency throws (no wrong curve).

const ARTICLES = /^(en|ett|att)\s+/i;
const IPA_ARTICLES = /^(ɛn|ɛtː?|atː?)\s+/;
// Swedish written vowels and IPA vowels; a sequence of vowels = one syllable nucleus
const ORTHO_VOWELS = /[aeiouyåäöéAEIOUYÅÄÖÉ]+/g;
const IPA_VOWEL = 'iyɪʏeøɛœaɑɒoɔuʊʉɵəæ';

/** Head word: 1st form, without parentheses or article; null if several words */
export function headWord(target) {
  const first = target.split(' / ')[0].replace(/\(.*?\)/g, '').trim().replace(ARTICLES, '');
  return /^[\p{L}-]+$/u.test(first) ? first : null;
}

/** Ranges [start, end) of the vowel nuclei of the written word */
export function orthoNuclei(word) {
  return [...word.matchAll(ORTHO_VOWELS)].map((m) => [m.index, m.index + m[0].length]);
}

/** IPA of the 1st form: nuclei, stressed syllable (ˈ) and secondary stress (ˌ) */
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
      // ː ends the long vowel: "snøːar" has two syllables
      inVowel = false;
    }
  }
  return { ipa: first, nuclei, stress, secondary };
}

/**
 * Curve data for a card and its accent (1 or 2).
 * Returns { a, w, v, s, p }: accent, word, nuclei, stressed syllable, 2nd peak (accent 2).
 */
export function toneFor(card, accent) {
  if (accent !== 1 && accent !== 2) throw new Error(`accent ${accent}: 1 or 2 expected`);
  const w = headWord(card.swedish_target);
  if (!w) throw new Error(`"${card.swedish_target}": not a single word`);
  const info = card.ipa_transcription ? ipaInfo(card.ipa_transcription) : null;
  if (!info) throw new Error(`"${w}": IPA missing or made of several words`);
  const v = orthoNuclei(w);
  if (v.length !== info.nuclei) {
    throw new Error(`"${w}": ${v.length} written syllable(s), ${info.nuclei} in the IPA ${info.ipa}`);
  }
  if (v.length > 1 && info.stress === null) throw new Error(`"${w}": stress mark missing from the IPA ${info.ipa}`);
  const s = info.stress ?? 0;
  if (accent === 1) return { a: 1, w, v, s, p: null };
  // Accent 2: a syllable is needed after the stressed one; 2nd peak on the secondary stress (compound word)
  const p = info.secondary ?? s + 1;
  if (p <= s || p >= v.length) throw new Error(`"${w}": accent 2 impossible (stressed syllable ${s + 1} of ${v.length})`);
  return { a: 2, w, v, s, p };
}

/** Adds the `tone` field to an exported card if its slug is entered (throws if the entry is inconsistent) */
export function withTone(card, tones) {
  const accent = tones[card.slug ?? card.id];
  if (!accent) return card;
  try {
    return { ...card, tone: toneFor(card, accent) };
  } catch (e) {
    throw new Error(`Tonal accent of ${card.slug ?? card.id}: ${e.message}`);
  }
}
