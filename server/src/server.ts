import { Server } from 'boardgame.io/server';
import { get } from 'koa-route';
import { buildGame } from '../../client/src/shared/coinche';

const coincheGame = buildGame();

export const server = Server({ games: [coincheGame] });

server.app.use(get('/healthz', ({ res }) => {
  res.statusCode = 200;
}));
