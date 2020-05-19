import {sortCards} from './sortCards';
import {Card, CardColor, CardName} from '../../../../../shared/coinche';

describe('sortCards', () => {
  const testCases: {
    cards: Card[],
    expectedCards: Card[],
  }[] = [
    {
      cards: [],
      expectedCards: [],
    },
    {
      cards: [
        {name: CardName.Queen, color: CardColor.Diamond},
        {name: CardName.Ace, color: CardColor.Diamond},
        {name: CardName.Jack, color: CardColor.Diamond},
        {name: CardName.Eight, color: CardColor.Diamond},
        {name: CardName.Nine, color: CardColor.Diamond},
        {name: CardName.Ten, color: CardColor.Diamond},
        {name: CardName.King, color: CardColor.Diamond},
        {name: CardName.Seven, color: CardColor.Diamond},
      ],
      expectedCards: [
        {name: CardName.Ace, color: CardColor.Diamond},
        {name: CardName.King, color: CardColor.Diamond},
        {name: CardName.Queen, color: CardColor.Diamond},
        {name: CardName.Jack, color: CardColor.Diamond},
        {name: CardName.Ten, color: CardColor.Diamond},
        {name: CardName.Nine, color: CardColor.Diamond},
        {name: CardName.Eight, color: CardColor.Diamond},
        {name: CardName.Seven, color: CardColor.Diamond},
      ],
    },
    {
      cards: [
        {name: CardName.Queen, color: CardColor.Club},
        {name: CardName.King, color: CardColor.Club},
        {name: CardName.Queen, color: CardColor.Diamond},
        {name: CardName.King, color: CardColor.Diamond},
        {name: CardName.Queen, color: CardColor.Heart},
        {name: CardName.King, color: CardColor.Heart},
        {name: CardName.Queen, color: CardColor.Spade},
        {name: CardName.King, color: CardColor.Spade},
      ],
      expectedCards: [
        {name: CardName.King, color: CardColor.Spade},
        {name: CardName.Queen, color: CardColor.Spade},
        {name: CardName.King, color: CardColor.Diamond},
        {name: CardName.Queen, color: CardColor.Diamond},
        {name: CardName.King, color: CardColor.Club},
        {name: CardName.Queen, color: CardColor.Club},
        {name: CardName.King, color: CardColor.Heart},
        {name: CardName.Queen, color: CardColor.Heart},
      ],
    },
    {
      cards: [
        {name: CardName.Queen, color: CardColor.Club},
        {name: CardName.King, color: CardColor.Club},
        {name: CardName.Queen, color: CardColor.Heart},
        {name: CardName.King, color: CardColor.Heart},
        {name: CardName.Queen, color: CardColor.Spade},
        {name: CardName.King, color: CardColor.Spade},
      ],
      expectedCards: [
        {name: CardName.King, color: CardColor.Spade},
        {name: CardName.Queen, color: CardColor.Spade},
        {name: CardName.King, color: CardColor.Heart},
        {name: CardName.Queen, color: CardColor.Heart},
        {name: CardName.King, color: CardColor.Club},
        {name: CardName.Queen, color: CardColor.Club},
      ],
    },
    {
      cards: [
        {name: CardName.Queen, color: CardColor.Club},
        {name: CardName.King, color: CardColor.Club},
        {name: CardName.Queen, color: CardColor.Spade},
        {name: CardName.King, color: CardColor.Spade},
        {name: CardName.Queen, color: CardColor.Diamond},
        {name: CardName.King, color: CardColor.Diamond},
      ],
      expectedCards: [
        {name: CardName.King, color: CardColor.Spade},
        {name: CardName.Queen, color: CardColor.Spade},
        {name: CardName.King, color: CardColor.Diamond},
        {name: CardName.Queen, color: CardColor.Diamond},
        {name: CardName.King, color: CardColor.Club},
        {name: CardName.Queen, color: CardColor.Club},
      ],
    },
    {
      cards: [
        {name: CardName.Queen, color: CardColor.Club},
        {name: CardName.King, color: CardColor.Club},
        {name: CardName.Queen, color: CardColor.Heart},
        {name: CardName.King, color: CardColor.Heart},
        {name: CardName.Queen, color: CardColor.Diamond},
        {name: CardName.King, color: CardColor.Diamond},
      ],
      expectedCards: [
        {name: CardName.King, color: CardColor.Diamond},
        {name: CardName.Queen, color: CardColor.Diamond},
        {name: CardName.King, color: CardColor.Club},
        {name: CardName.Queen, color: CardColor.Club},
        {name: CardName.King, color: CardColor.Heart},
        {name: CardName.Queen, color: CardColor.Heart},
      ],
    },
    {
      cards: [
        {name: CardName.Queen, color: CardColor.Heart},
        {name: CardName.King, color: CardColor.Heart},
        {name: CardName.Queen, color: CardColor.Diamond},
        {name: CardName.King, color: CardColor.Diamond},
        {name: CardName.Queen, color: CardColor.Spade},
        {name: CardName.King, color: CardColor.Spade},
      ],
      expectedCards: [
        {name: CardName.King, color: CardColor.Diamond},
        {name: CardName.Queen, color: CardColor.Diamond},
        {name: CardName.King, color: CardColor.Spade},
        {name: CardName.Queen, color: CardColor.Spade},
        {name: CardName.King, color: CardColor.Heart},
        {name: CardName.Queen, color: CardColor.Heart},
      ],
    },
  ];
  testCases.forEach(({ cards, expectedCards }) => {
    it(`sorts cards from [${cards.map(c => `${c.color}|${c.name}`).join(',')}] to [${expectedCards.map(c => `${c.color}|${c.name}`).join(',')}]`, () => {
      expect(sortCards(cards)).toEqual(expectedCards);
    });
  });
});
