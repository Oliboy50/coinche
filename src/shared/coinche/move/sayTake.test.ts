import {Context} from 'boardgame.io/core';
import {GameState, PhaseID, PlayerID, TrumpMode, validExpectedPoints, validTrumpModes} from '../index';
import sayTake from './sayTake';
import {getDefaultContext, getDefaultGameState} from './__testHelper/__moves';

describe(`move/sayTake`, () => {
  let G: GameState;
  let ctx: Context<PlayerID, PhaseID>;

  beforeEach(() => {
    G = {
      ...getDefaultGameState(),
      numberOfSuccessiveSkipSaid: 3,
      expectedPoints: 0,
      trumpMode: TrumpMode.NoTrump,
    };
    ctx = getDefaultContext();
  });

  validExpectedPoints.forEach((expectedPoints) => {
    validTrumpModes.forEach((trumpMode) => {
      it(`set expected points to ${expectedPoints} and trump mode to ${trumpMode} and reset number of successive skip said`, () => {
        const endTurn = jest.spyOn(ctx.events, 'endTurn');

        sayTake(G, ctx, expectedPoints, trumpMode);

        expect(endTurn).toHaveBeenCalledTimes(1);
        expect(G.numberOfSuccessiveSkipSaid).toBe(0);
        expect(G.expectedPoints).toBe(expectedPoints);
        expect(G.trumpMode).toBe(trumpMode);
      });
    });
  });

  [
    -1,
    0,
    80,
    81,
    100.5,
    251,
    255,
  ].forEach((expectedPoints) => {
    it(`throws if expected points is ${expectedPoints}`, () => {
      const endTurn = jest.spyOn(ctx.events, 'endTurn');

      expect(() => {
        sayTake(G, ctx, expectedPoints, TrumpMode.NoTrump);
      }).toThrow();

      expect(endTurn).toHaveBeenCalledTimes(0);
    });
  });
});
