import { Context } from 'boardgame.io/core';
import {
  GameState,
  PhaseID,
  PlayerID,
} from '../index';
import endTurn from './endTurn';
import { getDefaultContext, getDefaultGameState } from './__testHelper';

describe(`move/endTurn`, () => {
  let G: GameState;
  let ctx: Context<PlayerID, PhaseID>;

  beforeEach(() => {
    G = getDefaultGameState();
    ctx = getDefaultContext();
  });

  it(`sets __canMoveToNextPhase to true`, () => {
    const endTurnSpy = jest.spyOn(ctx.events, 'endTurn');

    endTurn(G, ctx);

    expect(endTurnSpy).toHaveBeenCalledTimes(1);
  });
});
