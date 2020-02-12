import {Context} from 'boardgame.io/core';
import {AnnounceId, GameState, getAnnounceById, PhaseID, PlayerID} from '../index';
import {getDefaultContext, getDefaultGameState} from './__testHelper';
import sayAnnounce from './sayAnnounce';

describe(`move/sayAnnounce`, () => {
  let G: GameState;
  let ctx: Context<PlayerID, PhaseID>;

  beforeEach(() => {
    G = getDefaultGameState();
    ctx = {
      ...getDefaultContext(),
      currentPlayer: PlayerID.North,
    };
  });

  it(`sets playersAnnounces[currentPlayer][saidAnnounce].isSaid to true`, () => {
    G.playersAnnounces[PlayerID.North] = [
      { announce: getAnnounceById(AnnounceId.TierceAceClub), isCardsDisplayable: false, isSaid: false },
      { announce: getAnnounceById(AnnounceId.SquareAce), isCardsDisplayable: false, isSaid: false },
    ];

    sayAnnounce(G, ctx, getAnnounceById(AnnounceId.SquareAce));

    expect(G.playersAnnounces[PlayerID.North]).toEqual([
      { announce: getAnnounceById(AnnounceId.TierceAceClub), isCardsDisplayable: false, isSaid: false },
      { announce: getAnnounceById(AnnounceId.SquareAce), isCardsDisplayable: false, isSaid: true },
    ]);
  });

  it(`throws if playersAnnounces[currentPlayer] does not contain given announce`, () => {
    G.playersAnnounces[PlayerID.North] = [
      { announce: getAnnounceById(AnnounceId.TierceAceClub), isCardsDisplayable: false, isSaid: false },
    ];

    expect(() => {
      sayAnnounce(G, ctx, getAnnounceById(AnnounceId.SquareAce));
    }).toThrow();
  });
});
