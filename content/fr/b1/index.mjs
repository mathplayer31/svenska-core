// FranceCore B1: decks and cards of the level, in path order.
import { UNIT16_DECK, UNIT16_CARDS } from './unit16-paperwork.mjs';
import { UNIT17_DECK, UNIT17_CARDS } from './unit17-neighbours.mjs';
import { UNIT18_DECK, UNIT18_CARDS } from './unit18-job-hunting.mjs';
import { UNIT19_DECK, UNIT19_CARDS } from './unit19-opinions.mjs';
import { UNIT20_DECK, UNIT20_CARDS } from './unit20-nature.mjs';
import { UNIT21_DECK, UNIT21_CARDS } from './unit21-news.mjs';
import { UNIT22_DECK, UNIT22_CARDS } from './unit22-emotions.mjs';
import { UNIT23_DECK, UNIT23_CARDS } from './unit23-stories.mjs';
import { GRAMMAR_B1_DECK, GRAMMAR_B1_CARDS } from './grammar.mjs';

export const DECKS = [
  UNIT16_DECK, UNIT17_DECK, UNIT18_DECK, UNIT19_DECK,
  UNIT20_DECK, UNIT21_DECK, UNIT22_DECK, UNIT23_DECK,
  GRAMMAR_B1_DECK,
];
export const CARDS = [
  ...UNIT16_CARDS, ...UNIT17_CARDS, ...UNIT18_CARDS, ...UNIT19_CARDS,
  ...UNIT20_CARDS, ...UNIT21_CARDS, ...UNIT22_CARDS, ...UNIT23_CARDS,
  ...GRAMMAR_B1_CARDS,
];
