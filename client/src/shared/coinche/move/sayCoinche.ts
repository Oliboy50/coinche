import type { Context } from 'boardgame.io/core';
import type {
  GameState,
  PlayerID,
  PhaseID,
} from '../index';

export default function sayCoinche (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
): void {
  if (!G.currentSayTake || G.currentSayTake.sayCoincheLevel === 'surcoinche') {
    throw new Error();
  }

  G.numberOfSuccessiveSkipSaid = 0;

  if (G.currentSayTake.sayCoincheLevel === 'coinche') {
    G.currentSayTake.sayCoincheLevel = 'surcoinche';
    G.playersSaid = {
      ...G.playersSaid,
      [ctx.currentPlayer]: 'surcoinche',
    };
    return;
  }

  G.currentSayTake.sayCoincheLevel = 'coinche';
  G.playersSaid = {
    ...G.playersSaid,
    [ctx.currentPlayer]: 'coinche',
  };
};
