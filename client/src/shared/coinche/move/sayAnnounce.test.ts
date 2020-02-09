import { Context } from 'boardgame.io/core';
import {
  GameState,
  PhaseID,
  PlayerID,
} from '../index';
import saySkip from './saySkip';
import { getDefaultContext, getDefaultGameState } from './__testHelper';

describe(`move/sayAnnounce`, () => {
  let G: GameState;
  let ctx: Context<PlayerID, PhaseID>;

  beforeEach(() => {
    G = getDefaultGameState();
    ctx = getDefaultContext();
  });

  // @TODO
  it(`adds said announce to the player said announces`, () => {
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
