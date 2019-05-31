import { Context } from 'boardgame.io/core';
import { CoincheCard, CoincheGameState, PlayerID } from './index';

export const shuffleAvailableCards = (
  G: Pick<CoincheGameState, 'availableCards'>,
  ctx: Pick<Context, 'random'>,
): CoincheCard[] => ctx.random.Shuffle(G.availableCards);

export const distributeAvailableCard = (
  G: Pick<CoincheGameState, 'availableCards' | 'players'>,
  ctx: Partial<Context>,
  playerID: PlayerID,
): void => {
  const card = G.availableCards.pop();
  if (!card) {
    return;
  }

  G.players[playerID].cards.push(card);
};
