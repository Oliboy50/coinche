import * as request from 'supertest';
import { app } from './app';

describe(`GET /`, () => {
  it(`returns 404`, async () => {
    const { appServer, apiServer } = await app.run(9999);

    expect(appServer).toBeTruthy();
    expect(apiServer).toBeUndefined();

    request(appServer)
      .get('/')
      .expect(404)
    ;

    await appServer.close();
  });
});
