import { Context } from 'boardgame.io/core';
import {
  GameState,
  PhaseID,
  PlayerID,
} from '../index';
import saySkip from './saySkip';
import { getDefaultContext, getDefaultGameState } from './__testHelper';

describe(`move/saySkip`, () => {
  let G: GameState;
  let ctx: Context<PlayerID, PhaseID>;

  beforeEach(() => {
    G = getDefaultGameState();
    ctx = {
      ...getDefaultContext(),
      currentPlayer: PlayerID.North,
    };
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
    expect(G.playersSaid).toEqual({
      ...getDefaultGameState().playersSaid,
      [PlayerID.North]: 'skip',
    });
  });
});
