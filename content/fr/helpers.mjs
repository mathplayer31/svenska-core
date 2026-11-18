// FranceCore (issue #9) : écriture compacte des cartes du cours de français.
// Langue étudiée : le français. Langues de l'apprenant : le suédois (langue de base) et l'anglais.
// Les colonnes de la base gardent leurs noms historiques du cours de suédois :
//   swedish_target = texte français, swedish_prompt = consigne en suédois,
//   english_translation = traduction suédoise, explanation_md = note en suédois,
//   gloss[].sv = mot français, gloss[].fr = mot suédois (l'anglais est ajouté par scripts/sync-content.mjs).
// Tous les slugs commencent par `fr-` : la progression des deux cours partage les mêmes tables.

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

/** Mot ou expression : { prompt, promptEn, fr, sv, en, ipa, note, noteEn } */
export const vocab = (deck, slug, d) => card('vocab', deck, slug, d);
/** Phrase avec glose mot à mot : gloss = [[français, suédois, anglais], ...] */
export const phrase = (deck, slug, d) => card('phrase', deck, slug, d);
/** Grammaire à trou : prompt avec ___, fr = phrase complète */
export const cloze = (deck, slug, d) => card('cloze_grammar', deck, slug, d);
/** Paire minimale de prononciation : fr = 'mot 1 / mot 2', words = [mot 1, mot 2] */
export const pair = (deck, slug, d) => card('minimal_pair', deck, slug, d);

/** Deck d'unité thématique : titres suédois / anglais, section et unité précédente. */
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

/** Deck de fondation (prononciation, genres, grammaire), ouvert après l'unité `after`. */
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
