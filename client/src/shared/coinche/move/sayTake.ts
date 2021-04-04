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

export default function sayTake (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
  expectedPoints: ExpectedPoints,
  trumpMode: TrumpMode,
): void {
  if (!validExpectedPoints.includes(expectedPoints)) {
    throw new Error('Expected points are not valid');
  }
  if (!validTrumpModes.includes(trumpMode)) {
    throw new Error('Trump mode is not valid');
  }
  if (!isSayableExpectedPoints(expectedPoints, G.currentSayTake?.expectedPoints)) {
    throw new Error('Must say a higher expected points');
  }

  G.numberOfSuccessiveSkipSaid = 0;
  G.attackingTeam = getPlayerTeam(ctx.currentPlayer);
  G.defensingTeam = G.attackingTeam === TeamID.NorthSouth ? TeamID.EastWest : TeamID.NorthSouth;
  G.currentSayTake = {
    playerID: ctx.currentPlayer,
    trumpMode,
    expectedPoints,
    sayCoincheLevel: undefined,
  };
  G.playersSaid = {
    ...G.playersSaid,
    [ctx.currentPlayer]: { expectedPoints, trumpMode },
  };
  G.lastPlayersTakeSaid = {
    ...G.lastPlayersTakeSaid,
    [ctx.currentPlayer]: { expectedPoints, trumpMode },
  };
};
