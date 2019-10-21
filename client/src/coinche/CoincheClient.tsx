import { Client } from 'boardgame.io/react';
import {
  buildGame,
  GameStatePlayerView,
  Moves,
  PlayerID,
  PhaseID,
} from '../shared/coinche';
import { BoardComponent } from './component/Board';

export const coincheGame = buildGame();
export const coincheBoard = BoardComponent;
export const CoincheClientComponent = Client<GameStatePlayerView, Moves, PlayerID, PhaseID>({
  game: coincheGame,
  numPlayers: 4,
  multiplayer: process.env.REACT_APP_API_BASE_URL ? { server: process.env.REACT_APP_API_BASE_URL } : { local: true },
  board: coincheBoard,
  debug: process.env.NODE_ENV !== 'production',
});
