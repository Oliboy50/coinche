import { app } from './app';

it('does not crash while creating app', () => {
  expect(app).toBeTruthy();
});
