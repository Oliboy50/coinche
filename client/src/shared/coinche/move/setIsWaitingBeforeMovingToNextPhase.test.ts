import { Context } from 'boardgame.io/core';
import {
  GameState,
  PhaseID,
  PlayerID,
} from '../index';
import setIsWaitingBeforeMovingToNextPhase from './setIsWaitingBeforeMovingToNextPhase';
import { getDefaultContext, getDefaultGameState } from './__testHelper';

describe(`move/setIsWaitingBeforeMovingToNextPhase`, () => {
  let G: GameState;
  let ctx: Context<PlayerID, PhaseID>;

  beforeEach(() => {
    G = getDefaultGameState();
    ctx = getDefaultContext();
  });

  it(`sets __isWaitingBeforeMovingToNextPhase to true if isWaitingBeforeMovingToNextPhase is true`, () => {
    G = {
      ...G,
      __isWaitingBeforeMovingToNextPhase: false,
    };

    setIsWaitingBeforeMovingToNextPhase(G, ctx, true);

    expect(G.__isWaitingBeforeMovingToNextPhase).toBe(true);
  });

  it(`sets __isWaitingBeforeMovingToNextPhase to false if isWaitingBeforeMovingToNextPhase is false`, () => {
    G = {
      ...G,
      __isWaitingBeforeMovingToNextPhase: true,
    };

    setIsWaitingBeforeMovingToNextPhase(G, ctx, false);

    expect(G.__isWaitingBeforeMovingToNextPhase).toBe(false);
  });
});
