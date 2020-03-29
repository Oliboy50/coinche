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
      isCurrentSayTakeCoinched: true,
      numberOfSuccessiveSkipSaid: 3,
      expectedPoints: undefined,
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
              -1 as any,
              0 as any,
              80 as any,
              81 as any,
              100.5 as any,
              251 as any,
              255 as any,
            ])
            .forEach(expectedPoints => {
              it(`throws if expected points is ${expectedPoints}`, () => {
                G.playersSaid[PlayerID.West] = { expectedPoints: higherAlreadySaidExpectedPoints, trumpMode};
                G.playersSaid[PlayerID.South] = 'skip';

                expect(() => {
                  sayTake(G, ctx, expectedPoints, trumpMode);
                }).toThrow();
              });
            });

          validExpectedPoints
            .filter(expectedPoints => expectedPoints > higherAlreadySaidExpectedPoints)
            .forEach(expectedPoints => {
              it(`sets attacking and defensing team, isCurrentSayTakeCoinched to false, expected points to ${expectedPoints} and trump mode to ${trumpMode} and resets number of successive skip said`, () => {
                sayTake(G, ctx, expectedPoints, trumpMode);

                expect(G.numberOfSuccessiveSkipSaid).toBe(0);
                expect(G.isCurrentSayTakeCoinched).toBe(false);
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
