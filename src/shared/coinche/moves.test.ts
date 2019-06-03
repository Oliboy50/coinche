import {Context} from 'boardgame.io/core';
import {GameState, getSetupGameState, PhaseID, PlayerID, TrumpMode} from './index';
import {saySkip, sayTake} from './moves';

describe('coinche/moves', () => {
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

  describe('saySkip', () => {
    it('increases number of successive skip said', () => {
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

  describe('sayTake', () => {
    it('set expected points and trump mode and reset number of successive skip said', () => {
      G = {
        ...G,
        numberOfSuccessiveSkipSaid: 3,
        expectedPoints: undefined,
        trumpMode: undefined,
      };

      const endTurn = jest.spyOn(ctx.events, 'endTurn');
      sayTake(G, ctx, 160, TrumpMode.NoTrump);

      expect(endTurn).toHaveBeenCalledTimes(1);
      expect(G.numberOfSuccessiveSkipSaid).toBe(0);
      expect(G.expectedPoints).toBe(160);
      expect(G.trumpMode).toBe(TrumpMode.NoTrump);
    });
  });
});
