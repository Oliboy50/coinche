import { Server } from 'boardgame.io/server';
import { buildGame } from '../../shared/coinche';

const coincheGame = buildGame();

const server = Server({ games: [coincheGame] });

(async() => {
  const { appServer, apiServer } = await server.run(8000);

  console.log(appServer, apiServer);
})();
