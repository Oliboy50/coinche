import { Client } from 'boardgame.io/react';
import {
  buildGame,
  GameStatePlayerView,
  Moves,
  PlayerID,
  PhaseID,
} from '../shared/coinche';
import { CoincheBoard } from './CoincheBoard';

const coincheGame = buildGame();
export const CoincheClient = Client<GameStatePlayerView, Moves, PlayerID, PhaseID>({
  game: coincheGame,
  numPlayers: 4,
  multiplayer: process.env.REACT_APP_API_BASE_URL ? { server: process.env.REACT_APP_API_BASE_URL } : { local: true },
  board: CoincheBoard,
  debug: process.env.NODE_ENV !== 'production',
});
