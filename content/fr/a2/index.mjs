// FranceCore A2 : decks et cartes du niveau, dans l'ordre du parcours.
import { UNIT8_DECK, UNIT8_CARDS } from './unit08-home.mjs';
import { UNIT9_DECK, UNIT9_CARDS } from './unit09-day.mjs';
import { UNIT10_DECK, UNIT10_CARDS } from './unit10-work.mjs';
import { UNIT11_DECK, UNIT11_CARDS } from './unit11-free-time.mjs';
import { UNIT12_DECK, UNIT12_CARDS } from './unit12-health.mjs';
import { UNIT13_DECK, UNIT13_CARDS } from './unit13-clothes.mjs';
import { UNIT14_DECK, UNIT14_CARDS } from './unit14-traditions.mjs';
import { UNIT15_DECK, UNIT15_CARDS } from './unit15-plans.mjs';
import { GRAMMAR_A2_DECK, GRAMMAR_A2_CARDS } from './grammar.mjs';

export const DECKS = [
  UNIT8_DECK, UNIT9_DECK, UNIT10_DECK, UNIT11_DECK,
  UNIT12_DECK, UNIT13_DECK, UNIT14_DECK, UNIT15_DECK, GRAMMAR_A2_DECK,
];
export const CARDS = [
  ...UNIT8_CARDS, ...UNIT9_CARDS, ...UNIT10_CARDS, ...UNIT11_CARDS,
  ...UNIT12_CARDS, ...UNIT13_CARDS, ...UNIT14_CARDS, ...UNIT15_CARDS, ...GRAMMAR_A2_CARDS,
];
