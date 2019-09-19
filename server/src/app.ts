import { Server } from 'boardgame.io/server';
import { buildGame } from '../../client/src/shared/coinche';

const coincheGame = buildGame();

export const app = Server({ games: [coincheGame] });
