import { Card } from './index';

export const shuffleCards = (
  cards: Card[],
  shuffle: <A extends any[]>(array: A) => A,
): Card[] => shuffle(cards);
