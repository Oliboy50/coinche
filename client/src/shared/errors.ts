export class StupidTypescript extends Error {
  constructor(message = 'TS should prevent this from happening') {
    super(message);
  }
}
