// Écriture compacte des unités A2 et suivantes : chaque carte porte son français ET son anglais.
// gloss : liste de triplets [suédois, français, anglais], un par mot de la phrase.
// Le champ `english_translation` contient le français (nom historique, voir generate-audio.mjs).

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

/** Deck d'unité thématique : titres FR / EN, section et unité précédente. */
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
