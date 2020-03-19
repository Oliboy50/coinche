import {
  Announce,
  AnnounceId,
  Card,
  CardColor,
  CardName,
  getAnnounceById,
  getAnnounces,
  getAnnouncesForCards,
  isAnnounceIdBeatingTheOtherAnnounceIds,
  TrumpMode,
  validAnnounceIds,
} from './index';

describe('getAnnounceById', () => {
  validAnnounceIds.forEach((announceId ) => {
    it(`returns an announce for id ${announceId}`, () => {
      expect(getAnnounceById(announceId)).toBeTruthy();
    });
  });
});

describe('getAnnouncesForCards', () => {
  const testCases: {
    trumpMode: TrumpMode;
    cards: Card[];
    announces: Announce[];
  }[] = [
    {
      trumpMode: TrumpMode.NoTrump,
      cards: [
        { name: CardName.Ace, color: CardColor.Club },
        { name: CardName.King, color: CardColor.Diamond },
        { name: CardName.Queen, color: CardColor.Heart },
        { name: CardName.Jack, color: CardColor.Spade },
        { name: CardName.Ten, color: CardColor.Club },
        { name: CardName.Nine, color: CardColor.Diamond },
        { name: CardName.Eight, color: CardColor.Heart },
        { name: CardName.Seven, color: CardColor.Spade },
      ],
      announces: [],
    },
    {
      trumpMode: TrumpMode.NoTrump,
      cards: [
        { name: CardName.Ace, color: CardColor.Club },
        { name: CardName.King, color: CardColor.Club },
        { name: CardName.Queen, color: CardColor.Heart },
        { name: CardName.Jack, color: CardColor.Heart },
        { name: CardName.Ten, color: CardColor.Heart },
        { name: CardName.Nine, color: CardColor.Heart },
        { name: CardName.Eight, color: CardColor.Club },
        { name: CardName.Seven, color: CardColor.Club },
      ],
      announces: [
        getAnnounceById(AnnounceId.QuarteQueenHeart),
      ],
    },
    {
      trumpMode: TrumpMode.NoTrump,
      cards: [
        { name: CardName.Ace, color: CardColor.Club },
        { name: CardName.King, color: CardColor.Diamond },
        { name: CardName.Queen, color: CardColor.Diamond },
        { name: CardName.Jack, color: CardColor.Diamond },
        { name: CardName.Ten, color: CardColor.Diamond },
        { name: CardName.Nine, color: CardColor.Club },
        { name: CardName.Eight, color: CardColor.Club },
        { name: CardName.Seven, color: CardColor.Club },
      ],
      announces: [
        getAnnounceById(AnnounceId.QuarteKingDiamond),
        getAnnounceById(AnnounceId.TierceNineClub),
      ],
    },
    {
      trumpMode: TrumpMode.NoTrump,
      cards: [
        { name: CardName.Ace, color: CardColor.Club },
        { name: CardName.King, color: CardColor.Club },
        { name: CardName.Queen, color: CardColor.Club },
        { name: CardName.Jack, color: CardColor.Club },
        { name: CardName.Ten, color: CardColor.Club },
        { name: CardName.King, color: CardColor.Spade },
        { name: CardName.King, color: CardColor.Diamond },
        { name: CardName.King, color: CardColor.Heart },
      ],
      announces: [
        getAnnounceById(AnnounceId.SquareKing),
        getAnnounceById(AnnounceId.QuinteAceClub),
      ],
    },
    {
      trumpMode: TrumpMode.NoTrump,
      cards: [
        { name: CardName.Ace, color: CardColor.Club },
        { name: CardName.Ace, color: CardColor.Diamond },
        { name: CardName.Ace, color: CardColor.Heart },
        { name: CardName.Ace, color: CardColor.Spade },
        { name: CardName.Ten, color: CardColor.Club },
        { name: CardName.Ten, color: CardColor.Diamond },
        { name: CardName.Ten, color: CardColor.Heart },
        { name: CardName.Ten, color: CardColor.Spade },
      ],
      announces: [
        getAnnounceById(AnnounceId.SquareAce),
        getAnnounceById(AnnounceId.SquareTen),
      ],
    },
    {
      trumpMode: TrumpMode.NoTrump,
      cards: [
        { name: CardName.Ace, color: CardColor.Spade },
        { name: CardName.King, color: CardColor.Spade },
        { name: CardName.Queen, color: CardColor.Spade },
        { name: CardName.Jack, color: CardColor.Spade },
        { name: CardName.Ten, color: CardColor.Spade },
        { name: CardName.Nine, color: CardColor.Spade },
        { name: CardName.Eight, color: CardColor.Spade },
        { name: CardName.Seven, color: CardColor.Spade },
      ],
      announces: [
        getAnnounceById(AnnounceId.QuinteAceSpade),
        getAnnounceById(AnnounceId.TierceNineSpade),
      ],
    },
    {
      trumpMode: TrumpMode.NoTrump,
      cards: [
        { name: CardName.Ace, color: CardColor.Diamond },
        { name: CardName.King, color: CardColor.Diamond },
        { name: CardName.Queen, color: CardColor.Diamond },
        { name: CardName.Jack, color: CardColor.Diamond },
        { name: CardName.Ten, color: CardColor.Diamond },
        { name: CardName.Nine, color: CardColor.Diamond },
        { name: CardName.Eight, color: CardColor.Diamond },
        { name: CardName.Seven, color: CardColor.Diamond },
      ],
      announces: [
        getAnnounceById(AnnounceId.QuinteAceDiamond),
        getAnnounceById(AnnounceId.TierceNineDiamond),
      ],
    },
    {
      trumpMode: TrumpMode.NoTrump,
      cards: [
        { name: CardName.Ace, color: CardColor.Heart },
        { name: CardName.King, color: CardColor.Heart },
        { name: CardName.Queen, color: CardColor.Heart },
        { name: CardName.Jack, color: CardColor.Heart },
        { name: CardName.Ten, color: CardColor.Heart },
        { name: CardName.Nine, color: CardColor.Heart },
        { name: CardName.Eight, color: CardColor.Heart },
        { name: CardName.Seven, color: CardColor.Heart },
      ],
      announces: [
        getAnnounceById(AnnounceId.QuinteAceHeart),
        getAnnounceById(AnnounceId.TierceNineHeart),
      ],
    },
    {
      trumpMode: TrumpMode.NoTrump,
      cards: [
        { name: CardName.Ace, color: CardColor.Club },
        { name: CardName.King, color: CardColor.Club },
        { name: CardName.Queen, color: CardColor.Club },
        { name: CardName.Jack, color: CardColor.Club },
        { name: CardName.Ten, color: CardColor.Club },
        { name: CardName.Nine, color: CardColor.Club },
        { name: CardName.Eight, color: CardColor.Club },
        { name: CardName.Seven, color: CardColor.Club },
      ],
      announces: [
        getAnnounceById(AnnounceId.QuinteAceClub),
        getAnnounceById(AnnounceId.TierceNineClub),
      ],
    },
  ];

  testCases.forEach(({trumpMode, cards, announces}) => {
    it(`returns announces [${announces.map(a => a.id).join(', ')}] when cards ${cards.map(c => `${c.color}|${c.name}`).join(', ')}`, () => {
      expect(getAnnouncesForCards(cards, trumpMode)).toEqual(announces);
    });
  });
});

describe('isAnnounceIdBeatingTheOtherAnnounceIds', () => {
  const testCases: {
    testCase: string;
    trumpMode: TrumpMode;
    announceId: AnnounceId;
    otherAnnounceIds: AnnounceId[];
    expectedResult: boolean;
  }[] = [
    // Edge cases
    {
      testCase: `returns true when no other announces`,
      trumpMode: TrumpMode.NoTrump,
      announceId: AnnounceId.TierceNineSpade,
      otherAnnounceIds: [],
      expectedResult: true,
    },
    // Squares
    {
      testCase: `returns true when trumpMode is ${TrumpMode.TrumpSpade} and announce is ${AnnounceId.SquareJack}`,
      trumpMode: TrumpMode.TrumpSpade,
      announceId: AnnounceId.SquareJack,
      otherAnnounceIds: getAnnounces().filter(a => a.id !== AnnounceId.SquareJack).map(a => a.id),
      expectedResult: true,
    },
    {
      testCase: `returns true when trumpMode is ${TrumpMode.TrumpClub} and announce is ${AnnounceId.SquareNine} and other announces don't contain ${AnnounceId.SquareJack}`,
      trumpMode: TrumpMode.TrumpClub,
      announceId: AnnounceId.SquareNine,
      otherAnnounceIds: getAnnounces().filter(a => ![AnnounceId.SquareJack, AnnounceId.SquareNine].includes(a.id)).map(a => a.id),
      expectedResult: true,
    },
    {
      testCase: `returns true when trumpMode is ${TrumpMode.NoTrump} and announce is ${AnnounceId.SquareAce}`,
      trumpMode: TrumpMode.NoTrump,
      announceId: AnnounceId.SquareAce,
      otherAnnounceIds: getAnnounces().filter(a => a.id !== AnnounceId.SquareAce).map(a => a.id),
      expectedResult: true,
    },
    {
      testCase: `returns true when trumpMode is ${TrumpMode.NoTrump} and announce is ${AnnounceId.SquareTen} and other announces don't contain ${AnnounceId.SquareAce}`,
      trumpMode: TrumpMode.NoTrump,
      announceId: AnnounceId.SquareTen,
      otherAnnounceIds: getAnnounces().filter(a => ![AnnounceId.SquareAce, AnnounceId.SquareTen].includes(a.id)).map(a => a.id),
      expectedResult: true,
    },
    // Suites
    {
      testCase: `returns true when trumpMode is ${TrumpMode.TrumpDiamond} and announce is ${AnnounceId.QuinteKingDiamond} and other announces contain ${AnnounceId.QuinteKingHeart}`,
      trumpMode: TrumpMode.TrumpDiamond,
      announceId: AnnounceId.QuinteKingDiamond,
      otherAnnounceIds: [AnnounceId.QuinteKingHeart],
      expectedResult: true,
    },
    {
      testCase: `returns false when trumpMode is ${TrumpMode.TrumpDiamond} and announce is ${AnnounceId.QuinteKingSpade} and other announces contain ${AnnounceId.QuinteKingClub}`,
      trumpMode: TrumpMode.TrumpDiamond,
      announceId: AnnounceId.QuinteKingSpade,
      otherAnnounceIds: [AnnounceId.QuinteKingClub],
      expectedResult: false,
    },
    {
      testCase: `returns false when announce is ${AnnounceId.QuarteAceSpade} and other announces contain ${AnnounceId.QuinteAceSpade}`,
      trumpMode: TrumpMode.NoTrump,
      announceId: AnnounceId.QuarteAceSpade,
      otherAnnounceIds: [AnnounceId.QuinteAceSpade],
      expectedResult: false,
    },
    {
      testCase: `returns false when announce is ${AnnounceId.TierceTenHeart} and other announces contain ${AnnounceId.TierceJackSpade}`,
      trumpMode: TrumpMode.NoTrump,
      announceId: AnnounceId.TierceTenHeart,
      otherAnnounceIds: [AnnounceId.TierceJackSpade],
      expectedResult: false,
    },
    {
      testCase: `returns true when announce is ${AnnounceId.TierceTenHeart} and other announces contain ${AnnounceId.TierceNineSpade}`,
      trumpMode: TrumpMode.NoTrump,
      announceId: AnnounceId.TierceTenHeart,
      otherAnnounceIds: [AnnounceId.TierceNineSpade],
      expectedResult: true,
    },
  ];

  testCases.forEach(({testCase, trumpMode, announceId, otherAnnounceIds, expectedResult}) => {
    it(testCase, () => {
      expect(isAnnounceIdBeatingTheOtherAnnounceIds(announceId, otherAnnounceIds, trumpMode)).toEqual(expectedResult);
    });
  });
});
