import {Context} from 'boardgame.io/core';
import {AnnounceID, GameState, getAnnounceByID, getAnnounceGroupByAnnounceID, PhaseID, PlayerID} from '../index';
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
    const announceTierceAceClub = getAnnounceByID(AnnounceID.TierceAceClub);
    const announceSquareAce = getAnnounceByID(AnnounceID.SquareAce);
    G.playersAnnounces[PlayerID.North] = [
      { player: PlayerID.North, announce: announceTierceAceClub, announceGroup: getAnnounceGroupByAnnounceID(announceTierceAceClub.id), isCardsDisplayable: false, isCountable: false, isSaid: false },
      { player: PlayerID.North, announce: announceSquareAce, announceGroup: getAnnounceGroupByAnnounceID(announceSquareAce.id), isCardsDisplayable: false, isCountable: false, isSaid: false },
    ];

    sayAnnounce(G, ctx, getAnnounceByID(AnnounceID.SquareAce));

    expect(G.playersAnnounces[PlayerID.North]).toEqual([
      { player: PlayerID.North, announce: announceTierceAceClub, announceGroup: getAnnounceGroupByAnnounceID(announceTierceAceClub.id), isCardsDisplayable: false, isCountable: false, isSaid: false },
      { player: PlayerID.North, announce: announceSquareAce, announceGroup: getAnnounceGroupByAnnounceID(announceSquareAce.id), isCardsDisplayable: false, isCountable: false, isSaid: true },
    ]);
  });

  it(`throws if playersAnnounces[currentPlayer] does not contain given announce`, () => {
    const announceTierceAceClub = getAnnounceByID(AnnounceID.TierceAceClub);
    G.playersAnnounces[PlayerID.North] = [
      { player: PlayerID.North, announce: announceTierceAceClub, announceGroup: getAnnounceGroupByAnnounceID(announceTierceAceClub.id), isCardsDisplayable: false, isCountable: false, isSaid: false },
    ];

    expect(() => {
      sayAnnounce(G, ctx, getAnnounceByID(AnnounceID.SquareAce));
    }).toThrow();
  });
});
