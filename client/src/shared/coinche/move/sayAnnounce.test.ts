import {Context} from 'boardgame.io/core';
import {AnnounceId, GameState, getAnnounceById, getAnnounceGroupByAnnounceId, PhaseID, PlayerID} from '../index';
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
    const announceTierceAceClub = getAnnounceById(AnnounceId.TierceAceClub);
    const announceSquareAce = getAnnounceById(AnnounceId.SquareAce);
    G.playersAnnounces[PlayerID.North] = [
      { announce: announceTierceAceClub, announceGroup: getAnnounceGroupByAnnounceId(announceTierceAceClub.id), isCardsDisplayable: false, isSaid: false },
      { announce: announceSquareAce, announceGroup: getAnnounceGroupByAnnounceId(announceSquareAce.id), isCardsDisplayable: false, isSaid: false },
    ];

    sayAnnounce(G, ctx, getAnnounceById(AnnounceId.SquareAce));

    expect(G.playersAnnounces[PlayerID.North]).toEqual([
      { announce: announceTierceAceClub, announceGroup: getAnnounceGroupByAnnounceId(announceTierceAceClub.id), isCardsDisplayable: false, isSaid: false },
      { announce: announceSquareAce, announceGroup: getAnnounceGroupByAnnounceId(announceSquareAce.id), isCardsDisplayable: false, isSaid: true },
    ]);
  });

  it(`throws if playersAnnounces[currentPlayer] does not contain given announce`, () => {
    const announceTierceAceClub = getAnnounceById(AnnounceId.TierceAceClub);
    G.playersAnnounces[PlayerID.North] = [
      { announce: announceTierceAceClub, announceGroup: getAnnounceGroupByAnnounceId(announceTierceAceClub.id), isCardsDisplayable: false, isSaid: false },
    ];

    expect(() => {
      sayAnnounce(G, ctx, getAnnounceById(AnnounceId.SquareAce));
    }).toThrow();
  });
});
