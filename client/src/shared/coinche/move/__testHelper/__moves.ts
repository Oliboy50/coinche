import { Context } from 'boardgame.io/core';
import {
  PlayerID,
  PhaseID,
  GameState,
  getSetupGameState,
} from '../../index';

export const getDefaultContext = (): Context<PlayerID, PhaseID> => ({
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
  phase: PhaseID.Deal,
  playerID: PlayerID.North,
  events: {
    endGame: () => undefined,
    endPhase: () => undefined,
    endTurn: () => undefined,
  },
});

export const getDefaultGameState = (): GameState => getSetupGameState(getDefaultContext(), {});
