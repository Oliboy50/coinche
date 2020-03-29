import {Context} from 'boardgame.io/core';
import {GameState, PhaseID, PlayerID} from '../index';
import sayCoinche from './sayCoinche';
import {getDefaultContext, getDefaultGameState} from './__testHelper';

describe(`move/sayCoinche`, () => {
  let G: GameState;
  let ctx: Context<PlayerID, PhaseID>;

  beforeEach(() => {
    G = {
      ...getDefaultGameState(),
      numberOfSuccessiveSkipSaid: 3,
    };
    ctx = {
      ...getDefaultContext(),
      currentPlayer: PlayerID.North,
    };
  });

  it(`says coinche and sets isCurrentSayTakeCoinched to true and resets number of successive skip said when isCurrentSayTakeCoinched is false`, () => {
    G = {
      ...G,
      isCurrentSayTakeCoinched: false,
    };

    sayCoinche(G, ctx);

    expect(G.isCurrentSayTakeCoinched).toBe(true);
    expect(G.numberOfSuccessiveSkipSaid).toBe(0);
    expect(G.playersSaid).toEqual({
      ...getDefaultGameState().playersSaid,
      [PlayerID.North]: 'coinche',
    });
  });

  it(`says surcoinche and resets number of successive skip said when isCurrentSayTakeCoinched is true`, () => {
    G = {
      ...G,
      isCurrentSayTakeCoinched: true,
    };

    sayCoinche(G, ctx);

    expect(G.numberOfSuccessiveSkipSaid).toBe(0);
    expect(G.playersSaid).toEqual({
      ...getDefaultGameState().playersSaid,
      [PlayerID.North]: 'surcoinche',
    });
  });
});
