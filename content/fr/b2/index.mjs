// FranceCore B2: decks and cards of the level, in path order.
import { UNIT24_DECK, UNIT24_CARDS } from './unit24-professional.mjs';
import { UNIT25_DECK, UNIT25_CARDS } from './unit25-economy.mjs';
import { UNIT26_DECK, UNIT26_CARDS } from './unit26-public-services.mjs';
import { UNIT27_DECK, UNIT27_CARDS } from './unit27-climate.mjs';
import { UNIT28_DECK, UNIT28_CARDS } from './unit28-idioms.mjs';
import { UNIT29_DECK, UNIT29_CARDS } from './unit29-arguing.mjs';
import { UNIT30_DECK, UNIT30_CARDS } from './unit30-registers.mjs';
import { UNIT31_DECK, UNIT31_CARDS } from './unit31-history.mjs';
import { GRAMMAR_B2_DECK, GRAMMAR_B2_CARDS } from './grammar.mjs';

export const DECKS = [
  UNIT24_DECK, UNIT25_DECK, UNIT26_DECK, UNIT27_DECK,
  UNIT28_DECK, UNIT29_DECK, UNIT30_DECK, UNIT31_DECK, GRAMMAR_B2_DECK,
];
export const CARDS = [
  ...UNIT24_CARDS, ...UNIT25_CARDS, ...UNIT26_CARDS, ...UNIT27_CARDS,
  ...UNIT28_CARDS, ...UNIT29_CARDS, ...UNIT30_CARDS, ...UNIT31_CARDS, ...GRAMMAR_B2_CARDS,
];
