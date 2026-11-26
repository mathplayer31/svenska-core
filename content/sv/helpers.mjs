// Compact writing of units A2 and beyond: each card carries its French AND its English.
// gloss: list of triples [Swedish, French, English], one per word of the sentence.
// The `english_translation` field holds the French (historical name, see scripts/sync-content.mjs).

function card(type, deck, slug, d) {
  return {
    slug,
    deck_slug: deck,
    card_type: type,
    swedish_prompt: d.prompt,
    swedish_target: d.sv,
    english_translation: d.fr,
    ipa_transcription: d.ipa,
    pitch_accent: d.accent,
    explanation_md: d.note,
    gloss: d.gloss?.map(([sv, fr]) => ({ sv, fr })),
    words: d.words ?? [d.sv],
    en: { prompt: d.promptEn, translation: d.en, gloss: d.gloss?.map((g) => g[2]) },
  };
}

export const vocab = (deck, slug, d) => card('vocab', deck, slug, d);
export const phrase = (deck, slug, d) => card('phrase', deck, slug, d);
export const cloze = (deck, slug, d) => card('cloze_grammar', deck, slug, d);

/** Thematic unit deck: FR / EN titles, section and previous unit. */
export function unitDeck({ n, slug, fr, en, level, section, after }) {
  return {
    slug,
    title: `Unité ${n} : ${fr}`,
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

// Thematic vocabulary decks (issue #18): studied like the foundations, unlocked by a unit.
// One row per word: [Swedish, IPA, French, English, gender?]. Countable nouns carry their article
// (en / ett); for a noun without an article (uncountable), `genre` gives the article and the definite form
// (e.g. 'ett blodet'), from which the card's note is built. Slug: `v-` + 1st form, å ä ö as aa ae oe.
const ascii = (s) =>
  s.toLowerCase().replace(/å/g, 'aa').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/é/g, 'e')
    .replace(/^(en|ett|att) /, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function themeDeck({ level, key, sort, fr, en, after }, rows) {
  const deck = {
    slug: `swedish-theme-${key}`,
    title: `Vocabulaire ${level} : ${fr}`,
    title_en: `${level} Vocabulary: ${en}`,
    category: 'vocabulary',
    cefr_level: level,
    sort_order: sort,
    prerequisite_slug: after,
  };
  const cards = rows.map(([sv, ipa, frWord, enWord, genre]) => {
    const [art, def] = genre?.split(' ') ?? [];
    const c = vocab(deck.slug, `v-${ascii(sv.split(' / ')[0])}`, {
      prompt: `${fr} : « ${frWord} »`, promptEn: `${en}: "${enWord}"`,
      sv, fr: frWord, en: enWord, ipa,
      note: genre ? `Nom en **${art}** : *${def}* au défini.` : '',
    });
    return { ...c, note_en: genre ? `An **${art}** noun: definite form *${def}*.` : '' };
  });
  return { deck, cards };
}
