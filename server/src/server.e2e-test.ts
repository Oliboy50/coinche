import { AppServer, ApiServer } from 'boardgame.io/server';
import * as request from 'supertest';
import { server } from './server';

describe('server endpoints', () => {
  let appServer: AppServer;
  let apiServer: ApiServer | undefined;

  beforeAll(async () => {
    const servers = await server.run(9999);
    appServer = servers.appServer;
    apiServer = servers.apiServer;

    expect(appServer).toBeTruthy();
    expect(apiServer).toBeUndefined();
  });

  afterAll(async () => {
    await appServer.close();
  });

  describe(`GET /`, () => {
    it(`returns 404`, async () => {
      const response = await request(appServer).get('/');
      expect(response.status).toBe(404);
    });
  });

  describe(`GET /healthz`, () => {
    it(`returns 200`, async () => {
      const response = await request(appServer).get('/healthz');
      expect(response.status).toBe(200);
    });
  });
});
