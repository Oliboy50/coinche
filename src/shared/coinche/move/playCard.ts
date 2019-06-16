import { Context } from 'boardgame.io/core';
import {
  GameState,
  PlayerID,
  PhaseID,
  Card,
  TrumpMode,
  getCardColorAssociatedToTrumpMode,
  isCardBeatingTheOtherCards,
} from '../index';

export default (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
  card: Card,
) => {
  if (!card || !G.playersCards[ctx.currentPlayer].includes(card)) {
    throw new Error();
  }

  // a card has already been played
  if (G.playersCardsPlayedInCurrentTurn[G.firstPlayerInCurrentTurn]) {
    const firstCardColor = G.playersCardsPlayedInCurrentTurn[G.firstPlayerInCurrentTurn]!.color;

    // must play same color if possible
    if (
      card.color !== firstCardColor
      && G.playersCards[ctx.currentPlayer].some(c => c.color === firstCardColor)
    ) {
      throw new Error();
    }

    const isSingleColorTrumpMode = [TrumpMode.TrumpSpade, TrumpMode.TrumpDiamond, TrumpMode.TrumpHeart, TrumpMode.TrumpClub].includes(G.trumpMode);
    const firstCardColorIsAssociatedToTrumpMode = firstCardColor === getCardColorAssociatedToTrumpMode(G.trumpMode);
    const otherCards = Object.values(G.playersCardsPlayedInCurrentTurn).filter(c => c !== undefined) as Card[];

    // if single color trump mode, must play more powerful card if possible
    if (
      isSingleColorTrumpMode
      && firstCardColorIsAssociatedToTrumpMode
      && !isCardBeatingTheOtherCards(card, otherCards, G.trumpMode, firstCardColor)
      && G.playersCards[ctx.currentPlayer].some(c => isCardBeatingTheOtherCards(c, otherCards, G.trumpMode, firstCardColor))
    ) {
      throw new Error();
    }
  }

  G.playersCardsPlayedInCurrentTurn[ctx.currentPlayer] = card;

  ctx.events.endTurn();
};
