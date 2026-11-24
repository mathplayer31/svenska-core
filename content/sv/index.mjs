// SvenskaCore : tous les decks et cartes du cours de suédois, lus par scripts/sync-content.mjs
// et scripts/count-vocab.mjs.
import { UNIT1_DECK, UNIT1_CARDS } from './a1/unit01-greetings.mjs';
import { UNIT2_DECK, UNIT2_CARDS } from './a1/unit02-cafe.mjs';
import { UNIT3_DECK, UNIT3_CARDS } from './a1/unit03-family.mjs';
import { UNIT4_DECK, UNIT4_CARDS } from './a1/unit04-shopping.mjs';
import { UNIT5_DECK, UNIT5_CARDS } from './a1/unit05-restaurant.mjs';
import { UNIT6_DECK, UNIT6_CARDS } from './a1/unit06-transport.mjs';
import { UNIT7_DECK, UNIT7_CARDS } from './a1/unit07-weather.mjs';
import { UNIT8_DECK, UNIT8_CARDS } from './a2/unit08-home.mjs';
import { UNIT9_DECK, UNIT9_CARDS } from './a2/unit09-day.mjs';
import { UNIT10_DECK, UNIT10_CARDS } from './a2/unit10-work.mjs';
import { UNIT11_DECK, UNIT11_CARDS } from './a2/unit11-free-time.mjs';
import { UNIT12_DECK, UNIT12_CARDS } from './a2/unit12-health.mjs';
import { UNIT13_DECK, UNIT13_CARDS } from './a2/unit13-clothes.mjs';
import { UNIT14_DECK, UNIT14_CARDS } from './a2/unit14-traditions.mjs';
import { UNIT15_DECK, UNIT15_CARDS } from './a2/unit15-plans.mjs';
import { GRAMMAR_A2_DECK, GRAMMAR_A2_CARDS } from './a2/grammar.mjs';
import { UNIT16_DECK, UNIT16_CARDS } from './b1/unit16-paperwork.mjs';
import { UNIT17_DECK, UNIT17_CARDS } from './b1/unit17-neighbours.mjs';
import { UNIT18_DECK, UNIT18_CARDS } from './b1/unit18-job-hunting.mjs';
import { UNIT19_DECK, UNIT19_CARDS } from './b1/unit19-opinions.mjs';
import { UNIT20_DECK, UNIT20_CARDS } from './b1/unit20-nature.mjs';
import { UNIT21_DECK, UNIT21_CARDS } from './b1/unit21-news.mjs';
import { UNIT22_DECK, UNIT22_CARDS } from './b1/unit22-emotions.mjs';
import { UNIT23_DECK, UNIT23_CARDS } from './b1/unit23-stories.mjs';
import { GRAMMAR_B1_DECK, GRAMMAR_B1_CARDS } from './b1/grammar.mjs';
import { UNIT24_DECK, UNIT24_CARDS } from './b2/unit24-professional.mjs';
import { UNIT25_DECK, UNIT25_CARDS } from './b2/unit25-economy.mjs';
import { UNIT26_DECK, UNIT26_CARDS } from './b2/unit26-welfare.mjs';
import { UNIT27_DECK, UNIT27_CARDS } from './b2/unit27-climate.mjs';
import { UNIT28_DECK, UNIT28_CARDS } from './b2/unit28-idioms.mjs';
import { UNIT29_DECK, UNIT29_CARDS } from './b2/unit29-arguing.mjs';
import { UNIT30_DECK, UNIT30_CARDS } from './b2/unit30-registers.mjs';
import { UNIT31_DECK, UNIT31_CARDS } from './b2/unit31-history.mjs';
import { GRAMMAR_B2_DECK, GRAMMAR_B2_CARDS } from './b2/grammar.mjs';
import { GRAMMAR_CARDS } from './a1/grammar.mjs';
import { FOUNDATION_DECKS, FOUNDATION_CARDS } from './a1/foundations.mjs';
// Decks thématiques de vocabulaire (issue #18)
import { THEMES_A2_1 } from './a2/themes-1.mjs';
import { THEMES_A2_2 } from './a2/themes-2.mjs';
import { THEMES_B1_1 } from './b1/themes-1.mjs';
import { THEMES_B1_2 } from './b1/themes-2.mjs';

const THEMES = [...THEMES_A2_1, ...THEMES_A2_2, ...THEMES_B1_1, ...THEMES_B1_2];

export const SV_DECKS = [
  ...FOUNDATION_DECKS, UNIT1_DECK, UNIT2_DECK, UNIT3_DECK, UNIT4_DECK, UNIT5_DECK, UNIT6_DECK, UNIT7_DECK,
  // A2
  UNIT8_DECK, UNIT9_DECK, UNIT10_DECK, UNIT11_DECK, UNIT12_DECK, UNIT13_DECK, UNIT14_DECK, UNIT15_DECK, GRAMMAR_A2_DECK,
  // B1
  UNIT16_DECK, UNIT17_DECK, UNIT18_DECK, UNIT19_DECK, UNIT20_DECK, UNIT21_DECK, UNIT22_DECK, UNIT23_DECK, GRAMMAR_B1_DECK,
  // B2
  UNIT24_DECK, UNIT25_DECK, UNIT26_DECK, UNIT27_DECK, UNIT28_DECK, UNIT29_DECK, UNIT30_DECK, UNIT31_DECK, GRAMMAR_B2_DECK,
  // Vocabulaire thématique (issue #18)
  ...THEMES.map((t) => t.deck),
];
export const SV_CARDS = [
  ...FOUNDATION_CARDS, ...GRAMMAR_CARDS, ...UNIT1_CARDS, ...UNIT2_CARDS, ...UNIT3_CARDS,
  ...UNIT4_CARDS, ...UNIT5_CARDS, ...UNIT6_CARDS, ...UNIT7_CARDS,
  // A2
  ...UNIT8_CARDS, ...UNIT9_CARDS, ...UNIT10_CARDS, ...UNIT11_CARDS,
  ...UNIT12_CARDS, ...UNIT13_CARDS, ...UNIT14_CARDS, ...UNIT15_CARDS, ...GRAMMAR_A2_CARDS,
  // B1
  ...UNIT16_CARDS, ...UNIT17_CARDS, ...UNIT18_CARDS, ...UNIT19_CARDS,
  ...UNIT20_CARDS, ...UNIT21_CARDS, ...UNIT22_CARDS, ...UNIT23_CARDS, ...GRAMMAR_B1_CARDS,
  // B2
  ...UNIT24_CARDS, ...UNIT25_CARDS, ...UNIT26_CARDS, ...UNIT27_CARDS,
  ...UNIT28_CARDS, ...UNIT29_CARDS, ...UNIT30_CARDS, ...UNIT31_CARDS, ...GRAMMAR_B2_CARDS,
  // Vocabulaire thématique (issue #18)
  ...THEMES.flatMap((t) => t.cards),
];
