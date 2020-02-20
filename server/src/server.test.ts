import { server } from './server';

// @TODO remove this test when we'll have a useful unit test
it('does not crash while creating server', () => {
  expect(server).toBeTruthy();
});
