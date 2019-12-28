import { app } from './app';

(async(): Promise<void> => {
  await app.run(process.env.PORT ? process.env.PORT : 8000);
})();
