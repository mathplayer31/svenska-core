// FranceCore (issue #9): compact writing of the French course cards.
// Language learned: French. Learner languages: Swedish (base language) and English.
// The database columns keep their historical names from the Swedish course:
//   swedish_target = French text, swedish_prompt = instruction in Swedish,
//   english_translation = Swedish translation, explanation_md = note in Swedish,
//   gloss[].sv = French word, gloss[].fr = Swedish word (English is added by scripts/sync-content.mjs).
// All slugs start with `fr-`: the progress of both courses shares the same tables.

function card(type, deck, slug, d) {
  return {
    slug,
    deck_slug: deck,
    card_type: type,
    swedish_prompt: d.prompt,
    swedish_target: d.fr,
    english_translation: d.sv,
    ipa_transcription: d.ipa,
    explanation_md: d.note,
    note_en: d.noteEn,
    gloss: d.gloss?.map(([fr, sv]) => ({ sv: fr, fr: sv })),
    words: d.words ?? [d.fr],
    en: { prompt: d.promptEn, translation: d.en, gloss: d.gloss?.map((g) => g[2]) },
  };
}

/** Word or expression: { prompt, promptEn, fr, sv, en, ipa, note, noteEn } */
export const vocab = (deck, slug, d) => card('vocab', deck, slug, d);
/** Sentence with a word-by-word gloss: gloss = [[French, Swedish, English], ...] */
export const phrase = (deck, slug, d) => card('phrase', deck, slug, d);
/** Fill-in-the-blank grammar: prompt with ___, fr = full sentence */
export const cloze = (deck, slug, d) => card('cloze_grammar', deck, slug, d);
/** Paire minimale de prononciation : fr = 'mot 1 / mot 2', words = [mot 1, mot 2] */
export const pair = (deck, slug, d) => card('minimal_pair', deck, slug, d);

/** Thematic unit deck: Swedish / English titles, section and previous unit. */
export function unitDeck({ n, slug, sv, en, level, section, after }) {
  return {
    slug,
    course: 'fr',
    title: `Enhet ${n}: ${sv}`,
    title_en: `Unit ${n}: ${en}`,
    category: 'vocabulary',
    cefr_level: level,
    sort_order: 0,
    track: 'thematic',
    unit_number: n,
    section_slug: section,
    prerequisite_slug: after,
  };
}

/** Foundation deck (pronunciation, genders, grammar), unlocked after unit `after`. */
export function foundationDeck({ slug, sv, en, category, level, order, after }) {
  return {
    slug,
    course: 'fr',
    title: `${order}. ${sv}`,
    title_en: `${order}. ${en}`,
    category,
    cefr_level: level,
    sort_order: order,
    track: 'foundation',
    prerequisite_slug: after,
  };
}
