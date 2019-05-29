import { Client } from 'boardgame.io/react';
import {buildCoincheGame, CoincheGameMoves, CoincheGameState, PlayerID} from '../shared/coinche';
import { CoincheBoard } from './CoincheBoard';

export const CoincheClient = Client<CoincheGameState, CoincheGameMoves, PlayerID>({
  game: buildCoincheGame(),
  numPlayers: 4,
  multiplayer: { local: true },
  board: CoincheBoard,
  debug: process.env.NODE_ENV === 'development',
});
