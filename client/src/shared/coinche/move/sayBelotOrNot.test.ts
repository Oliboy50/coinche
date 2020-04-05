import {Context} from 'boardgame.io/core';
import {
  GameState,
  PhaseID,
  PlayerID,
} from '../index';
import {getDefaultContext, getDefaultGameState} from './__testHelper';
import sayBelotOrNot from './sayBelotOrNot';

describe(`move/sayBelotOrNot`, () => {
  let G: GameState;
  let ctx: Context<PlayerID, PhaseID>;

  beforeEach(() => {
    G = getDefaultGameState();
    ctx = {
      ...getDefaultContext(),
      currentPlayer: PlayerID.North,
    };
  });

  [true, false].forEach(sayIt => {
    it(`throws if no belotAnnounce when sayIt is ${sayIt ? 'true' : 'false'}`, () => {
      G.belotAnnounce = undefined;

      expect(() => {
        sayBelotOrNot(G, ctx, sayIt);
      }).toThrow();
    });
  });

  [true, false].forEach(sayIt => {
    it(`throws if belotAnnounce.owner is not currentPlayer when sayIt is ${sayIt ? 'true' : 'false'}`, () => {
      G.belotAnnounce = {
        id: 'Belot',
        owner: PlayerID.South,
        ownerHasChosen: false,
        isSaid: false,
      };

      expect(() => {
        sayBelotOrNot(G, ctx, sayIt);
      }).toThrow();
    });
  });

  [true, false].forEach(sayIt => {
    it(`throws if belotAnnounce.ownerHasChosen is true when sayIt is ${sayIt ? 'true' : 'false'}`, () => {
      G.belotAnnounce = {
        id: 'Belot',
        owner: PlayerID.North,
        ownerHasChosen: true,
        isSaid: false,
      };

      expect(() => {
        sayBelotOrNot(G, ctx, sayIt);
      }).toThrow();
    });
  });

  it(`sets belotAnnounce.ownerHasChosen to true when sayIt is false`, () => {
    G.belotAnnounce = {
      id: 'Belot',
      owner: PlayerID.North,
      ownerHasChosen: false,
      isSaid: false,
    };

    sayBelotOrNot(G, ctx, false);

    expect(G.belotAnnounce).toEqual({
      id: 'Belot',
      owner: PlayerID.North,
      ownerHasChosen: true,
      isSaid: false,
    });
    expect(G.playersAnnouncesDisplayedInCurrentTurn[PlayerID.North]).toEqual([]);
  });

  it(`sets belotAnnounce.ownerHasChosen to true and belotAnnounce.isSaid to true when sayIt is true`, () => {
    G.belotAnnounce = {
      id: 'Belot',
      owner: PlayerID.North,
      ownerHasChosen: false,
      isSaid: false,
    };

    sayBelotOrNot(G, ctx, true);

    expect(G.belotAnnounce).toEqual({
      id: 'Belot',
      owner: PlayerID.North,
      ownerHasChosen: true,
      isSaid: true,
    });
    expect(G.playersAnnouncesDisplayedInCurrentTurn[PlayerID.North]).toEqual([{ id: 'Belot' }]);
  });
});
