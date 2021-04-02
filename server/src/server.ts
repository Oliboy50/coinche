import {RunningServers, Server} from 'boardgame.io/server';
import { get as getRoute } from 'koa-route';
import { coincheGame } from '../../client/src/shared/coinche';

let runningServers: RunningServers | undefined;

const server = Server({ games: [coincheGame] });

export const start = async (): Promise<RunningServers> => {
  return runningServers = await server.run(process.env.PORT ? process.env.PORT : 8000);
};
export const stop = async (): Promise<void> => {
  if (!runningServers) {
    return;
  }

  server.kill(runningServers);
};

server.app.use(getRoute('/healthz', ({ res }, next) => {
  res.statusCode = 200;

  return next();
}));

// dev routing
if (process.env.SERVER_ENV === 'dev') {
  server.app.use(getRoute('/restart-with-clean-data', async ({ res }, next) => {
    await stop();
    server.db.listMatches().forEach(gameID => {
      server.db.wipe(gameID);
    });
    await start();
    res.statusCode = 200;

    return next();
  }));
}
