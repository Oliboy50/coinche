import { Context } from 'boardgame.io/core';
import {
  GameState,
  PlayerID,
  PhaseID,
  Card,
  TrumpMode,
  getCardColorAssociatedToTrumpMode,
  isCardBeatingTheOtherCards, getPlayerPartner, isSameCard, getWinningCard,
} from '../index';

export default (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
  card: Card,
) => {
  if (!card || !G.playersCards[ctx.currentPlayer].find(c => isSameCard(c, card))) {
    throw new Error();
  }

  // a card has already been played
  if (G.playersCardsPlayedInCurrentTurn[G.firstPlayerInCurrentTurn]) {
    const firstCardColor = G.playersCardsPlayedInCurrentTurn[G.firstPlayerInCurrentTurn]!.color;

    // if player has a card with same color than first card played
    // can't play a card with other color
    if (
      card.color !== firstCardColor
      && G.playersCards[ctx.currentPlayer].some(c => c.color === firstCardColor)
    ) {
      throw new Error();
    }

    const isSingleColorTrumpMode = [TrumpMode.TrumpSpade, TrumpMode.TrumpDiamond, TrumpMode.TrumpHeart, TrumpMode.TrumpClub].includes(G.trumpMode);
    const firstCardColorIsAssociatedToTrumpMode = firstCardColor === getCardColorAssociatedToTrumpMode(G.trumpMode);
    const otherCards = Object.values(G.playersCardsPlayedInCurrentTurn).filter(c => c !== undefined) as Card[];

    // if single color trump mode
    // if player has a more powerful card
    // if player is trying to play a less powerful card
    if (
      isSingleColorTrumpMode
      && G.playersCards[ctx.currentPlayer].some(c => isCardBeatingTheOtherCards(c, otherCards, G.trumpMode, firstCardColor))
      && !isCardBeatingTheOtherCards(card, otherCards, G.trumpMode, firstCardColor)
    ) {
      // if first card played is trump
      if (firstCardColorIsAssociatedToTrumpMode) {
        throw new Error();
      }

      const playerPartnerCard = G.playersCardsPlayedInCurrentTurn[getPlayerPartner(ctx.currentPlayer)];
      const currentWinningCard = getWinningCard(otherCards, G.trumpMode, firstCardColor);
      const currentWinningCardIsFromPartner = Boolean(playerPartnerCard && isSameCard(playerPartnerCard, currentWinningCard));

      // if current winning card is not from partner
      // if player does not have a card with same color than first card
      if (
        !currentWinningCardIsFromPartner
        && !G.playersCards[ctx.currentPlayer].some(c => c.color === firstCardColor)
      ) {
        throw new Error();
      }
    }
  }

  G.playersCardsPlayedInCurrentTurn[ctx.currentPlayer] = card;

  ctx.events.endTurn();
};
