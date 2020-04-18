import {
  Announce,
  AnnounceID,
  Card,
  CardColor,
  CardName,
  TrumpMode,
  getAnnounceByID,
  getAnnounces,
  getAnnouncesForCards,
  isAnnounceIDBeatingTheOtherAnnounceIDs,
  isCardBeatingTheOtherCards,
  validAnnounceIDs,
} from './index';

describe('isCardBeatingTheOtherCards', () => {
  const testCases: {
    card: Card;
    otherCards: Card[];
    trumpMode: TrumpMode;
    firstCardColor: CardColor;
    expectedResult: boolean;
  }[] = [
    {
      card: { name: CardName.Nine, color: CardColor.Spade },
      otherCards: [
        { name: CardName.Ace, color: CardColor.Club },
        { name: CardName.King, color: CardColor.Heart },
        { name: CardName.Ten, color: CardColor.Spade },
      ],
      trumpMode: TrumpMode.NoTrump,
      firstCardColor: CardColor.Spade,
      expectedResult: false,
    },
    {
      card: { name: CardName.Ten, color: CardColor.Spade },
      otherCards: [
        { name: CardName.Ace, color: CardColor.Club },
        { name: CardName.King, color: CardColor.Heart },
        { name: CardName.Nine, color: CardColor.Spade },
      ],
      trumpMode: TrumpMode.NoTrump,
      firstCardColor: CardColor.Spade,
      expectedResult: true,
    },
    {
      card: { name: CardName.Nine, color: CardColor.Spade },
      otherCards: [
        { name: CardName.Ace, color: CardColor.Club },
        { name: CardName.King, color: CardColor.Heart },
        { name: CardName.Ten, color: CardColor.Spade },
      ],
      trumpMode: TrumpMode.TrumpSpade,
      firstCardColor: CardColor.Spade,
      expectedResult: true,
    },
    {
      card: { name: CardName.Ten, color: CardColor.Spade },
      otherCards: [
        { name: CardName.Ace, color: CardColor.Club },
        { name: CardName.King, color: CardColor.Heart },
        { name: CardName.Nine, color: CardColor.Spade },
      ],
      trumpMode: TrumpMode.TrumpSpade,
      firstCardColor: CardColor.Spade,
      expectedResult: false,
    },
  ];

  testCases.forEach(({card, otherCards, trumpMode, firstCardColor, expectedResult}) => {
    it(`returns ${expectedResult ? 'true' : 'false'} when card ${card.color}|${card.name} and trumpMode ${trumpMode} and firstCardColor ${firstCardColor} and otherCards ${otherCards.map(c => `${c.color}|${c.name}`).join(', ')}`, () => {
      expect(isCardBeatingTheOtherCards(card, otherCards, trumpMode, firstCardColor)).toEqual(expectedResult);
    });
  });
});

describe('getAnnounceByID', () => {
  validAnnounceIDs.forEach((announceID ) => {
    it(`returns an announce for id ${announceID}`, () => {
      expect(getAnnounceByID(announceID)).toBeTruthy();
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
        getAnnounceByID(AnnounceID.QuarteQueenHeart),
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
        getAnnounceByID(AnnounceID.QuarteKingDiamond),
        getAnnounceByID(AnnounceID.TierceNineClub),
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
        getAnnounceByID(AnnounceID.SquareKing),
        getAnnounceByID(AnnounceID.QuinteAceClub),
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
        getAnnounceByID(AnnounceID.SquareAce),
        getAnnounceByID(AnnounceID.SquareTen),
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
        getAnnounceByID(AnnounceID.QuinteAceSpade),
        getAnnounceByID(AnnounceID.TierceNineSpade),
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
        getAnnounceByID(AnnounceID.QuinteAceDiamond),
        getAnnounceByID(AnnounceID.TierceNineDiamond),
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
        getAnnounceByID(AnnounceID.QuinteAceHeart),
        getAnnounceByID(AnnounceID.TierceNineHeart),
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
        getAnnounceByID(AnnounceID.QuinteAceClub),
        getAnnounceByID(AnnounceID.TierceNineClub),
      ],
    },
  ];

  testCases.forEach(({trumpMode, cards, announces}) => {
    it(`returns announces [${announces.map(a => a.id).join(', ')}] when cards ${cards.map(c => `${c.color}|${c.name}`).join(', ')}`, () => {
      expect(getAnnouncesForCards(cards, trumpMode)).toEqual(announces);
    });
  });
});

describe('isAnnounceIDBeatingTheOtherAnnounceIDs', () => {
  const testCases: {
    trumpMode: TrumpMode;
    announceID: AnnounceID;
    otherAnnounceIDs: AnnounceID[];
    expectedResult: boolean | null;
  }[] = [
    // Edge cases
    {
      trumpMode: TrumpMode.NoTrump,
      announceID: AnnounceID.TierceNineSpade,
      otherAnnounceIDs: [],
      expectedResult: true,
    },
    // Squares
    {
      trumpMode: TrumpMode.TrumpSpade,
      announceID: AnnounceID.SquareJack,
      otherAnnounceIDs: getAnnounces().filter(a => a.id !== AnnounceID.SquareJack).map(a => a.id),
      expectedResult: true,
    },
    {
      trumpMode: TrumpMode.TrumpClub,
      announceID: AnnounceID.SquareNine,
      otherAnnounceIDs: getAnnounces().filter(a => ![AnnounceID.SquareJack, AnnounceID.SquareNine].includes(a.id)).map(a => a.id),
      expectedResult: true,
    },
    {
      trumpMode: TrumpMode.NoTrump,
      announceID: AnnounceID.SquareAce,
      otherAnnounceIDs: getAnnounces().filter(a => a.id !== AnnounceID.SquareAce).map(a => a.id),
      expectedResult: true,
    },
    {
      trumpMode: TrumpMode.NoTrump,
      announceID: AnnounceID.SquareTen,
      otherAnnounceIDs: getAnnounces().filter(a => ![AnnounceID.SquareAce, AnnounceID.SquareTen].includes(a.id)).map(a => a.id),
      expectedResult: true,
    },
    // Suites
    {
      trumpMode: TrumpMode.TrumpDiamond,
      announceID: AnnounceID.QuinteKingDiamond,
      otherAnnounceIDs: [AnnounceID.QuinteKingHeart],
      expectedResult: true,
    },
    {
      trumpMode: TrumpMode.TrumpDiamond,
      announceID: AnnounceID.QuinteKingSpade,
      otherAnnounceIDs: [AnnounceID.QuinteKingClub],
      expectedResult: null,
    },
    {
      trumpMode: TrumpMode.NoTrump,
      announceID: AnnounceID.QuarteAceSpade,
      otherAnnounceIDs: [AnnounceID.QuinteAceSpade],
      expectedResult: false,
    },
    {
      trumpMode: TrumpMode.NoTrump,
      announceID: AnnounceID.TierceTenHeart,
      otherAnnounceIDs: [AnnounceID.TierceJackSpade],
      expectedResult: false,
    },
    {
      trumpMode: TrumpMode.NoTrump,
      announceID: AnnounceID.TierceTenHeart,
      otherAnnounceIDs: [AnnounceID.TierceNineSpade],
      expectedResult: true,
    },
    {
      trumpMode: TrumpMode.TrumpHeart,
      announceID: AnnounceID.TierceNineHeart,
      otherAnnounceIDs: [AnnounceID.TierceNineSpade, AnnounceID.TierceNineClub, AnnounceID.TierceNineDiamond],
      expectedResult: true,
    },
    {
      trumpMode: TrumpMode.NoTrump,
      announceID: AnnounceID.TierceNineHeart,
      otherAnnounceIDs: [AnnounceID.TierceNineSpade, AnnounceID.TierceNineClub],
      expectedResult: null,
    },
    {
      trumpMode: TrumpMode.NoTrump,
      announceID: AnnounceID.TierceNineHeart,
      otherAnnounceIDs: [AnnounceID.TierceNineSpade, AnnounceID.TierceTenClub],
      expectedResult: false,
    },
  ];

  testCases.forEach(({trumpMode, announceID, otherAnnounceIDs, expectedResult}) => {
    it(`returns ${expectedResult === null ? 'null' : (expectedResult ? 'true' : 'false')} when trumpMode is ${trumpMode} and announce is ${announceID} and other announces are [${otherAnnounceIDs.join(',')}]`, () => {
      expect(isAnnounceIDBeatingTheOtherAnnounceIDs(announceID, otherAnnounceIDs, trumpMode)).toEqual(expectedResult);
    });
  });
});
