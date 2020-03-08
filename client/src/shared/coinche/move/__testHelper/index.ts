import { Context } from 'boardgame.io/core';
import {
  PlayerID,
  PhaseID,
  GameState,
  getSetupGameState,
} from '../../index';

export const getDefaultContext = (): Context<PlayerID, PhaseID> => ({
  numPlayers: 4,
  turn: 1,
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
    setPhase: () => undefined,
    endTurn: () => undefined,
    endStage: () => undefined,
    setStage: () => undefined,
    setActivePlayers: () => undefined,
  },
});

export const getDefaultGameState = (): GameState => getSetupGameState(getDefaultContext());
