// FranceCore (issue #9) : tout le contenu du cours de français, lu par scripts/sync-content.mjs.
import { FR_SECTIONS } from './sections.mjs';
import * as A1 from './a1/index.mjs';
import * as A2 from './a2/index.mjs';
import * as B1 from './b1/index.mjs';
import * as B2 from './b2/index.mjs';

export { FR_SECTIONS };
export const FR_DECKS = [...A1.DECKS, ...A2.DECKS, ...B1.DECKS, ...B2.DECKS];
export const FR_CARDS = [...A1.CARDS, ...A2.CARDS, ...B1.CARDS, ...B2.CARDS];
