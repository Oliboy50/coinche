import { Context } from 'boardgame.io/core';
import {
  GameState,
  TrumpMode,
  PlayerID,
  PhaseID,
  validExpectedPoints,
  validTrumpModes,
  getPlayerTeam, TeamID, isSayableExpectedPoints,
} from '../index';

export default (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
  expectedPoints: number,
  trumpMode: TrumpMode,
) => {
  if (!validExpectedPoints.includes(expectedPoints)) {
    throw new Error('Expected points are not valid');
  }
  if (!validTrumpModes.includes(trumpMode)) {
    throw new Error('Trump mode is not valid');
  }
  if (!isSayableExpectedPoints(expectedPoints, G.playersSaid)) {
    throw new Error('Must say a higher expected points');
  }

  G.numberOfSuccessiveSkipSaid = 0;
  G.attackingTeam = getPlayerTeam(ctx.currentPlayer);
  G.defensingTeam = G.attackingTeam === TeamID.NorthSouth ? TeamID.EastWest : TeamID.NorthSouth;
  G.expectedPoints = expectedPoints;
  G.trumpMode = trumpMode;
  G.playersSaid = {
    ...G.playersSaid,
    [ctx.currentPlayer]: { expectedPoints, trumpMode },
  };

  ctx.events.endTurn();
};
