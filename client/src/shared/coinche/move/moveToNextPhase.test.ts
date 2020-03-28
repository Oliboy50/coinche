import { Context } from 'boardgame.io/core';
import {
  GameState,
  PhaseID,
  PlayerID,
} from '../index';
import moveToNextPhase from './moveToNextPhase';
import { getDefaultContext, getDefaultGameState } from './__testHelper';

describe(`move/moveToNextPhase`, () => {
  let G: GameState;
  let ctx: Context<PlayerID, PhaseID>;

  beforeEach(() => {
    G = getDefaultGameState();
    ctx = getDefaultContext();
  });

  it(`sets __isWaitingBeforeMovingToNextPhase to false and __canMoveToNextPhase to true and ends the current player turn`, () => {
    G = {
      ...G,
      __isWaitingBeforeMovingToNextPhase: true,
      __canMoveToNextPhase: false,
    };
    const endTurnSpy = jest.spyOn(ctx.events, 'endTurn');

    moveToNextPhase(G, ctx);

    expect(G.__isWaitingBeforeMovingToNextPhase).toBe(false);
    expect(G.__canMoveToNextPhase).toBe(true);
    expect(endTurnSpy).toHaveBeenCalledTimes(1);
  });
});
