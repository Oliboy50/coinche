import { Context } from 'boardgame.io/core';
import {
  GameState,
  PlayerID,
  PhaseID,
  Card,
  getPlayerPartner,
  isSameCard,
  isPlayableCard,
} from '../index';

export default (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
  card: Card,
): void => {
  const cardIndexInPlayerCards = G.playersCards[ctx.currentPlayer].findIndex(c => isSameCard(c, card));
  const playerPartner = getPlayerPartner(ctx.currentPlayer);

  if (cardIndexInPlayerCards < 0 || !isPlayableCard(
    card,
    G.playersCards[ctx.currentPlayer],
    G.currentSayTake!.trumpMode,
    G.playersCardPlayedInCurrentTurn,
    G.firstPlayerInCurrentTurn,
    playerPartner,
  )) {
    throw new Error(`Player can't play this card`);
  }

  // move card from playersCards to playersCardPlayedInCurrentTurn
  G.playersCards[ctx.currentPlayer] = [
    ...G.playersCards[ctx.currentPlayer].slice(0, cardIndexInPlayerCards),
    ...G.playersCards[ctx.currentPlayer].slice(cardIndexInPlayerCards + 1),
  ];
  G.playersCardPlayedInCurrentTurn[ctx.currentPlayer] = card;
};
