import { Context } from 'boardgame.io/core';
import {
  GameState,
  PlayerID,
  PhaseID,
} from '../index';

export default (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
): void => {
  G.numberOfSuccessiveSkipSaid = 0;

  if (G.isCurrentSayTakeCoinched) {
    G.playersSaid = {
      ...G.playersSaid,
      [ctx.currentPlayer]: 'surcoinche',
    };
  } else {
    G.isCurrentSayTakeCoinched = true;
    G.playersSaid = {
      ...G.playersSaid,
      [ctx.currentPlayer]: 'coinche',
    };
  }
};
