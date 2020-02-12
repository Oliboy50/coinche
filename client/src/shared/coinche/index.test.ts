import {
  Announce,
  AnnounceId,
  Card,
  CardColor,
  CardName,
  getAnnounceById,
  getAnnouncesForCards,
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
