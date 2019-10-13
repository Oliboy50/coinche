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
  G.numberOfSuccessiveSkipSaid++;
  G.playersSaid = {
    ...G.playersSaid,
    [ctx.currentPlayer]: 'skip',
  };

  ctx.events.endTurn();
};
