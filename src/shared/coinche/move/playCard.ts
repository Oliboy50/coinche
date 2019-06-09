import { Context } from 'boardgame.io/core';
import {
  GameState,
  PlayerID,
  PhaseID,
  Card,
} from '../index';

export default (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
  card: Card,
) => {
  if (!card || !G.playersCards[ctx.currentPlayer].includes(card)) {
    throw new Error();
  }

  if (
    G.playersCardsPlayedInCurrentTurn[G.firstPlayerInCurrentTurn]
    && G.playersCards[ctx.currentPlayer].some(c => c.color === G.playersCardsPlayedInCurrentTurn[G.firstPlayerInCurrentTurn]!.color)
    && card.color !== G.playersCardsPlayedInCurrentTurn[G.firstPlayerInCurrentTurn]!.color
  ) {
    throw new Error();
  }

  G.playersCardsPlayedInCurrentTurn[ctx.currentPlayer] = card;

  ctx.events.endTurn();
};
