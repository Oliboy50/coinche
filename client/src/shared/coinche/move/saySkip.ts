import { Context } from 'boardgame.io/core';
import {
  GameState,
  PlayerID,
  PhaseID,
} from '../index';

export default function saySkip (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
): void {
  G.numberOfSuccessiveSkipSaid++;
  G.playersSaid = {
    ...G.playersSaid,
    [ctx.currentPlayer]: 'skip',
  };
};
