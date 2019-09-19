import { app } from './app';

(async() => {
  await app.run(process.env.PORT ? process.env.PORT : 8000);
})();
