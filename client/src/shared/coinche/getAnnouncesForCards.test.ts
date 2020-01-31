import {
  Announce,
  AnnounceId,
  Card,
  CardColor,
  CardName,
  getAnnounceById,
  getAvailableAnnouncesForCards,
  TrumpMode,
} from './index';

describe('getAvailableAnnouncesForCards', () => {
  const testCases: {
    trumpMode: TrumpMode;
    cards: Card[];
    announces: Announce[];
  }[] = [
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
  ];

  testCases.forEach(({trumpMode, cards, announces}) => {
    it(`returns announces [${announces.map(a => a.id).join(', ')}] when cards ${cards.map(c => `${c.color}|${c.name}`).join(', ')}`, () => {
      expect(getAvailableAnnouncesForCards(cards, trumpMode)).toEqual(announces);
    });
  });
});
