import { Client } from 'boardgame.io/react';
import { buildCoincheGame } from '../../core/game/coinche';
import { CoincheBoard } from './CoincheBoard';

export const CoincheClient = Client({
  game: buildCoincheGame(),
  numPlayer: 4,
  multiplayer: { local: true },
  board: CoincheBoard,
  debug: process.env.NODE_ENV === 'development',
});
