// Écriture compacte des unités A2 et suivantes : chaque carte porte son français ET son anglais.
// gloss : liste de triplets [suédois, français, anglais], un par mot de la phrase.
// Le champ `english_translation` contient le français (nom historique, voir scripts/sync-content.mjs).

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

// Decks thématiques de vocabulaire (issue #18) : étudiés comme les fondations, débloqués par une unité.
// Une ligne par mot : [suédois, IPA, français, anglais, genre ?]. Les noms comptables portent leur article
// (en / ett) ; pour un nom sans article (indénombrable), `genre` donne l'article et la forme définie
// (ex. 'ett blodet'), dont la note de la carte est tirée. Slug : `v-` + 1re forme, å ä ö en aa ae oe.
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
