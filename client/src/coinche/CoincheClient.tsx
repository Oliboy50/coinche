import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
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
  multiplayer: Local(),
  board: coincheBoard,
  debug: process.env.NODE_ENV !== 'production',
});
