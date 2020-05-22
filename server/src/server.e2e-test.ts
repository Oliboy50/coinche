import {RunningServer} from 'boardgame.io/server';
import * as request from 'supertest';
import { start, stop } from './server';

describe('server endpoints', () => {
  let appServer: RunningServer;
  let apiServer: RunningServer | undefined;

  beforeAll(async () => {
    const runningServers = await start();
    appServer = runningServers.appServer;
    apiServer = runningServers.apiServer;

    expect(appServer).toBeTruthy();
    expect(apiServer).toBeUndefined();
  });

  afterAll(async () => {
    await stop();
  });

  describe(`GET /`, () => {
    it(`returns 404`, async () => {
      const response = await request(appServer).get('/');
      expect(response.status).toBe(404);
    });
  });

  describe(`GET /healthz`, () => {
    it(`returns 200`, async () => {
      const response = await request(appServer)
        .get('/healthz')
        .set('Origin', 'http://Oliboy50/coinche');
      expect(response.header['access-control-allow-origin']).toEqual('http://Oliboy50/coinche');
      expect(response.status).toBe(200);
    });
  });

  describe(`GET /restart-with-clean-data`, () => {
    it(`returns 404 (because it's only available in dev env)`, async () => {
      const response = await request(appServer).get('/restart-with-clean-data');
      expect(response.status).toBe(404);
    });
  });
});
