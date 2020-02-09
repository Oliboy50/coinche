import { Context } from 'boardgame.io/core';
import {
  GameState,
  PlayerID,
  PhaseID,
  Announce,
} from '../index';

export default (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
  announce: Announce,
): void => {
  G.playersSaidAnnounces[ctx.currentPlayer] = [
    ...G.playersSaidAnnounces[ctx.currentPlayer],
    { announce: announce, isCardsDisplayable: false },
  ];
};
