import { Context } from 'boardgame.io/core';
import {
  GameState,
  TrumpMode,
  PlayerID,
  PhaseID,
  validExpectedPoints,
  validTrumpModes,
  getPlayerTeam,
} from '../index';

export default (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
  expectedPoints: number,
  trumpMode: TrumpMode,
) => {
  if (!validExpectedPoints.includes(expectedPoints)) {
    throw new Error();
  }
  if (!validTrumpModes.includes(trumpMode)) {
    throw new Error();
  }

  G.numberOfSuccessiveSkipSaid = 0;
  G.takingTeam = getPlayerTeam(ctx.currentPlayer);
  G.expectedPoints = expectedPoints;
  G.trumpMode = trumpMode;

  ctx.events.endTurn();
};
