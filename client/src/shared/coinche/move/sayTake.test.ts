import {Context} from 'boardgame.io/core';
import {GameState, PhaseID, PlayerID, TeamID, TrumpMode, validExpectedPoints, validTrumpModes} from '../index';
import sayTake from './sayTake';
import {getDefaultContext, getDefaultGameState} from './__testHelper';

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
    ctx = {
      ...getDefaultContext(),
      currentPlayer: PlayerID.North,
    };
  });

  validExpectedPoints.forEach(higherAlreadySaidExpectedPoints => {
    describe(`when higher already said expected points is ${higherAlreadySaidExpectedPoints}`, () => {
      validTrumpModes.forEach(trumpMode => {
        describe(`when saying ${trumpMode} trump mode`, () => {
          validExpectedPoints
            // can't say take with valid expected points less than the higher already said
            .filter(expectedPoints => expectedPoints <= higherAlreadySaidExpectedPoints)
            // can't say take with invalid expected points
            .concat([
              -1,
              0,
              80,
              81,
              100.5,
              251,
              255,
            ])
            .forEach(expectedPoints => {
              it(`throws if expected points is ${expectedPoints}`, () => {
                const endTurn = jest.spyOn(ctx.events, 'endTurn');
                G.playersSaid[PlayerID.West] = { expectedPoints: higherAlreadySaidExpectedPoints, trumpMode};
                G.playersSaid[PlayerID.South] = 'skip';

                expect(() => {
                  sayTake(G, ctx, expectedPoints, trumpMode);
                }).toThrow();

                expect(endTurn).toHaveBeenCalledTimes(0);
              });
            });

          validExpectedPoints
            .filter(expectedPoints => expectedPoints > higherAlreadySaidExpectedPoints)
            .forEach(expectedPoints => {
              it(`sets attacking and defensing team, expected points to ${expectedPoints} and trump mode to ${trumpMode} and reset number of successive skip said`, () => {
                const endTurn = jest.spyOn(ctx.events, 'endTurn');

                sayTake(G, ctx, expectedPoints, trumpMode);

                expect(endTurn).toHaveBeenCalledTimes(1);
                expect(G.numberOfSuccessiveSkipSaid).toBe(0);
                expect(G.attackingTeam).toBe(TeamID.NorthSouth);
                expect(G.defensingTeam).toBe(TeamID.EastWest);
                expect(G.expectedPoints).toBe(expectedPoints);
                expect(G.trumpMode).toBe(trumpMode);
                expect(G.playersSaid).toEqual({
                  ...getDefaultGameState().playersSaid,
                  [PlayerID.North]: { expectedPoints, trumpMode },
                });
              });
            });
        });
      });
    });
  });
});
