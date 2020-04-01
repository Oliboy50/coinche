import {Context} from 'boardgame.io/core';
import {GameState, PhaseID, PlayerID, TrumpMode} from '../index';
import sayCoinche from './sayCoinche';
import {getDefaultContext, getDefaultGameState} from './__testHelper';

describe(`move/sayCoinche`, () => {
  let G: GameState;
  let ctx: Context<PlayerID, PhaseID>;

  beforeEach(() => {
    G = {
      ...getDefaultGameState(),
      currentSayTake: {trumpMode: TrumpMode.NoTrump, expectedPoints: 82, playerID: PlayerID.North, sayCoincheLevel: undefined},
      numberOfSuccessiveSkipSaid: 3,
    };
    ctx = {
      ...getDefaultContext(),
      currentPlayer: PlayerID.North,
    };
  });

  it(`sets currentSayTake.sayCoincheLevel to 'coinche' and resets number of successive skip said when currentSayTake.sayCoincheLevel is undefined`, () => {
    G = {
      ...G,
      currentSayTake: { ...G.currentSayTake!, sayCoincheLevel: undefined },
    };

    sayCoinche(G, ctx);

    expect(G.currentSayTake!.sayCoincheLevel).toBe('coinche');
    expect(G.numberOfSuccessiveSkipSaid).toBe(0);
    expect(G.playersSaid).toEqual({
      ...getDefaultGameState().playersSaid,
      [PlayerID.North]: 'coinche',
    });
  });

  it(`sets currentSayTake.sayCoincheLevel to 'surcoinche' and resets number of successive skip said when currentSayTake.sayCoincheLevel is 'coinche'`, () => {
    G = {
      ...G,
      currentSayTake: { ...G.currentSayTake!, sayCoincheLevel: 'coinche' },
    };

    sayCoinche(G, ctx);

    expect(G.currentSayTake!.sayCoincheLevel).toBe('surcoinche');
    expect(G.numberOfSuccessiveSkipSaid).toBe(0);
    expect(G.playersSaid).toEqual({
      ...getDefaultGameState().playersSaid,
      [PlayerID.North]: 'surcoinche',
    });
  });

  it(`throws when currentSayTake.sayCoincheLevel is 'surcoinche'`, () => {
    G = {
      ...G,
      currentSayTake: { ...G.currentSayTake!, sayCoincheLevel: 'surcoinche' },
    };

    expect(() => {
      sayCoinche(G, ctx);
    }).toThrow();
  });
});
