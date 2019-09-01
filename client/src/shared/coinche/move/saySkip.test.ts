import { Context } from 'boardgame.io/core';
import {
  GameState,
  PhaseID,
  PlayerID,
} from '../index';
import saySkip from './saySkip';
import { getDefaultContext, getDefaultGameState } from './__testHelper/__moves';

describe(`move/saySkip`, () => {
  let G: GameState;
  let ctx: Context<PlayerID, PhaseID>;

  beforeEach(() => {
    G = getDefaultGameState();
    ctx = getDefaultContext();
  });

  it(`increases number of successive skip said`, () => {
    G = {
      ...G,
      numberOfSuccessiveSkipSaid: 0,
    };

    const endTurn = jest.spyOn(ctx.events, 'endTurn');

    saySkip(G, ctx);

    expect(endTurn).toHaveBeenCalledTimes(1);
    expect(G.numberOfSuccessiveSkipSaid).toBe(1);
  });
});
