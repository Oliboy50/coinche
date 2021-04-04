import type { Context } from 'boardgame.io/core';
import type {
  GameState,
  PhaseID,
  PlayerID,
} from '../index';
import waitBeforeMovingToNextPhase from './waitBeforeMovingToNextPhase';
import { getDefaultContext, getDefaultGameState } from './__testHelper';

describe(`move/setIsWaitingBeforeMovingToNextPhase`, () => {
  let G: GameState;
  let ctx: Context<PlayerID, PhaseID>;

  beforeEach(() => {
    G = getDefaultGameState();
    ctx = getDefaultContext();
  });

  it(`sets __isWaitingBeforeMovingToNextPhase to true`, () => {
    G = {
      ...G,
      __isWaitingBeforeMovingToNextPhase: false,
    };

    waitBeforeMovingToNextPhase(G, ctx);

    expect(G.__isWaitingBeforeMovingToNextPhase).toBe(true);
  });
});
