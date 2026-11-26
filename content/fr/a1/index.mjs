// FranceCore A1: decks and cards of the level, in path order.
import { FOUNDATION_DECKS, FOUNDATION_CARDS } from './foundations.mjs';
import { GRAMMAR_A1_DECK, GRAMMAR_A1_CARDS } from './grammar.mjs';
import { UNIT1_DECK, UNIT1_CARDS } from './unit01-greetings.mjs';
import { UNIT2_DECK, UNIT2_CARDS } from './unit02-cafe.mjs';
import { UNIT3_DECK, UNIT3_CARDS } from './unit03-family.mjs';
import { UNIT4_DECK, UNIT4_CARDS } from './unit04-shopping.mjs';
import { UNIT5_DECK, UNIT5_CARDS } from './unit05-restaurant.mjs';
import { UNIT6_DECK, UNIT6_CARDS } from './unit06-transport.mjs';
import { UNIT7_DECK, UNIT7_CARDS } from './unit07-weather.mjs';

export const DECKS = [
  ...FOUNDATION_DECKS, GRAMMAR_A1_DECK,
  UNIT1_DECK, UNIT2_DECK, UNIT3_DECK, UNIT4_DECK, UNIT5_DECK, UNIT6_DECK, UNIT7_DECK,
];
export const CARDS = [
  ...FOUNDATION_CARDS, ...GRAMMAR_A1_CARDS,
  ...UNIT1_CARDS, ...UNIT2_CARDS, ...UNIT3_CARDS, ...UNIT4_CARDS, ...UNIT5_CARDS, ...UNIT6_CARDS, ...UNIT7_CARDS,
];
