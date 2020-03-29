import { Context } from 'boardgame.io/core';
import {
  ExpectedPoints,
  GameState,
  TrumpMode,
  PlayerID,
  PhaseID,
  TeamID,
  validExpectedPoints,
  validTrumpModes,
  getPlayerTeam,
  isSayableExpectedPoints,
} from '../index';

export default (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
  expectedPoints: ExpectedPoints,
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

  G.isCurrentSayTakeCoinched = false;
  G.numberOfSuccessiveSkipSaid = 0;
  G.attackingTeam = getPlayerTeam(ctx.currentPlayer);
  G.defensingTeam = G.attackingTeam === TeamID.NorthSouth ? TeamID.EastWest : TeamID.NorthSouth;
  G.expectedPoints = expectedPoints;
  G.trumpMode = trumpMode;
  G.playersSaid = {
    ...G.playersSaid,
    [ctx.currentPlayer]: { expectedPoints, trumpMode },
  };
  G.lastPlayersTakeSaid = {
    ...G.lastPlayersTakeSaid,
    [ctx.currentPlayer]: { expectedPoints, trumpMode },
  };
};
