import { Client } from 'boardgame.io/react';
import {
  buildGame,
  GameStatePlayerView,
  Moves,
  PlayerID,
  PhaseID,
} from '../shared/coinche';
import { CoincheBoard } from './CoincheBoard';

export const CoincheClient = Client<GameStatePlayerView, Moves, PlayerID, PhaseID>({
  game: buildGame(),
  numPlayers: 4,
  multiplayer: { local: true },
  board: CoincheBoard,
  debug: process.env.NODE_ENV !== 'production',
});
