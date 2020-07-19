import {AnnounceGroup, AnnounceID, getAnnounceByID, PlayerAnnounce, PlayerID, TrumpMode} from '../index';
import {getWinningAnnounces} from './winnerResolver';

describe('getWinningAnnounces', () => {
  const testCases: {
    trumpMode: TrumpMode;
    playerAnnounces: PlayerAnnounce[];
    expectedResult: PlayerAnnounce[];
  }[] = [
    // 0 announce
    {
      trumpMode: TrumpMode.NoTrump,
      playerAnnounces: [],
      expectedResult: [],
    },
    // 1 announce
    {
      trumpMode: TrumpMode.NoTrump,
      playerAnnounces: [
        {
          player: PlayerID.North,
          announce: getAnnounceByID(AnnounceID.TierceAceHeart),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
      ],
      expectedResult: [
        {
          player: PlayerID.North,
          announce: getAnnounceByID(AnnounceID.TierceAceHeart),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
      ],
    },
    // better announce
    {
      trumpMode: TrumpMode.NoTrump,
      playerAnnounces: [
        {
          player: PlayerID.North,
          announce: getAnnounceByID(AnnounceID.TierceAceHeart),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
        {
          player: PlayerID.East,
          announce: getAnnounceByID(AnnounceID.TierceKingSpade),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
      ],
      expectedResult: [
        {
          player: PlayerID.North,
          announce: getAnnounceByID(AnnounceID.TierceAceHeart),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
      ],
    },
    // same announces for same team
    {
      trumpMode: TrumpMode.NoTrump,
      playerAnnounces: [
        {
          player: PlayerID.North,
          announce: getAnnounceByID(AnnounceID.TierceAceHeart),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
        {
          player: PlayerID.South,
          announce: getAnnounceByID(AnnounceID.TierceAceSpade),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
      ],
      expectedResult: [
        {
          player: PlayerID.North,
          announce: getAnnounceByID(AnnounceID.TierceAceHeart),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
        {
          player: PlayerID.South,
          announce: getAnnounceByID(AnnounceID.TierceAceSpade),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
      ],
    },
    // same announces for different teams
    {
      trumpMode: TrumpMode.NoTrump,
      playerAnnounces: [
        {
          player: PlayerID.North,
          announce: getAnnounceByID(AnnounceID.TierceAceHeart),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
        {
          player: PlayerID.East,
          announce: getAnnounceByID(AnnounceID.TierceAceSpade),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
      ],
      expectedResult: [
        {
          player: PlayerID.North,
          announce: getAnnounceByID(AnnounceID.TierceAceHeart),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
        {
          player: PlayerID.East,
          announce: getAnnounceByID(AnnounceID.TierceAceSpade),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
      ],
    },
    // same announce with trump
    {
      trumpMode: TrumpMode.TrumpHeart,
      playerAnnounces: [
        {
          player: PlayerID.North,
          announce: getAnnounceByID(AnnounceID.TierceAceHeart),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
        {
          player: PlayerID.East,
          announce: getAnnounceByID(AnnounceID.TierceAceSpade),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
      ],
      expectedResult: [
        {
          player: PlayerID.North,
          announce: getAnnounceByID(AnnounceID.TierceAceHeart),
          announceGroup: AnnounceGroup.Tierce,
          isSaid: true,
          isCardsDisplayable: false,
          isCountable: false,
        },
      ],
    },
  ];

  testCases.forEach(({trumpMode, playerAnnounces, expectedResult}, i) => {
    it(`returns best player announces for case #${i}`, () => {
      expect(getWinningAnnounces(playerAnnounces, trumpMode)).toEqual(expectedResult);
    });
  });
});
