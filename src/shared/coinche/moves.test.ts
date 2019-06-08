import {Context} from 'boardgame.io/core';
import {
  GameState,
  getSetupGameState,
  PhaseID,
  PlayerID,
  PlayingCardColor,
  PlayingCardName,
  TrumpMode,
  validExpectedPoints,
  validTrumpModes,
} from './index';
import {playCard, saySkip, sayTake} from './moves';

describe(`coinche/moves`, () => {
  let G: GameState;
  let ctx: Context<PlayerID, PhaseID>;

  beforeEach(() => {
    ctx = {
      numPlayers: 4,
      turn: 0,
      currentPlayer: PlayerID.North,
      currentPlayerMoves: 0,
      random: {
        Shuffle: array => array,
      },
      actionPlayers: [
        PlayerID.North,
      ],
      playOrder: [
        PlayerID.North,
        PlayerID.West,
        PlayerID.South,
        PlayerID.East,
      ],
      playOrderPos: 0,
      stats: {
        turn: {
          numMoves: {},
          allPlayed: false,
        },
        phase: {
          numMoves: {},
          allPlayed: false,
        },
      },
      allPlayed: false,
      playerID: PlayerID.North,
      events: {
        endGame: () => undefined,
        endPhase: () => undefined,
        endTurn: () => undefined,
      },
    };
    G = getSetupGameState(ctx, {});
  });

  describe(`saySkip`, () => {
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

  describe(`sayTake`, () => {
    beforeEach(() => {
      G = {
        ...G,
        numberOfSuccessiveSkipSaid: 3,
        expectedPoints: undefined,
        trumpMode: undefined,
      };
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
        expect(() => {
          sayTake(G, ctx, expectedPoints, TrumpMode.NoTrump);
        }).toThrow();
      });
    });

    [
      -1,
      100,
    ].forEach((trumpMode) => {
      it(`throws if trump mode is ${trumpMode}`, () => {
        expect(() => {
          sayTake(G, ctx, validExpectedPoints[0], trumpMode);
        }).toThrow();
      });
    });
  });

  describe(`playCard`, () => {
    // @TODO more tests
    it(`plays card in current turn`, () => {
      ctx = {
        ...ctx,
        currentPlayer: PlayerID.North,
      };
      G = {
        ...G,
        playersCardsPlayedInCurrentTurn: {
          [PlayerID.North]: undefined,
          [PlayerID.East]: undefined,
          [PlayerID.South]: undefined,
          [PlayerID.West]: undefined,
        },
      };

      const endTurn = jest.spyOn(ctx.events, 'endTurn');

      const card = { color: PlayingCardColor.Club, name: PlayingCardName.King };
      playCard(G, ctx, card);

      expect(endTurn).toHaveBeenCalledTimes(1);
      expect(G.playersCardsPlayedInCurrentTurn).toEqual({
        [PlayerID.North]: card,
        [PlayerID.East]: undefined,
        [PlayerID.South]: undefined,
        [PlayerID.West]: undefined,
      });
    });
  });
});
