import { server } from './server';

(async(): Promise<void> => {
  await server.run(process.env.PORT ? process.env.PORT : 8000);
})();
