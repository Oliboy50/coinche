import { Server } from 'boardgame.io/server';
import { get } from 'koa-route';
import { game as coincheGame } from '../../client/src/shared/coinche';

export const server = Server({ games: [coincheGame] });

server.app.use(get('/healthz', ({ res }) => {
  res.statusCode = 200;
}));
