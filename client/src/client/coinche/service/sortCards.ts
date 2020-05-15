import {Card, CardColor, CardName} from '../../../shared/coinche';

const sameColorCardsSorter = (a: Card, b: Card): number => {
  switch (a.name) {
    case CardName.Ace:
      return -1;
    case CardName.King:
      switch (b.name) {
        case CardName.Ace:
          return 1;
        default:
          return -1;
      }
    case CardName.Queen:
      switch (b.name) {
        case CardName.Ace:
        case CardName.King:
          return 1;
        default:
          return -1;
      }
    case CardName.Jack:
      switch (b.name) {
        case CardName.Ace:
        case CardName.King:
        case CardName.Queen:
          return 1;
        default:
          return -1;
      }
    case CardName.Ten:
      switch (b.name) {
        case CardName.Nine:
        case CardName.Eight:
        case CardName.Seven:
          return -1;
        default:
          return 1;
      }
    case CardName.Nine:
      switch (b.name) {
        case CardName.Eight:
        case CardName.Seven:
          return -1;
        default:
          return 1;
      }
    case CardName.Eight:
      switch (b.name) {
        case CardName.Seven:
          return -1;
        default:
          return 1;
      }
    case CardName.Seven:
      return 1;
  }
};

const colorDiamondSpadeHeartCardsSorter = (a: Card, b: Card): number => {
  if (a.color === CardColor.Diamond && b.color !== CardColor.Diamond) {
    return -1;
  }
  if (a.color === CardColor.Spade) {
    switch (b.color) {
      case CardColor.Heart:
        return -1;
      case CardColor.Diamond:
        return 1;
    }
  }
  if (a.color === CardColor.Heart && b.color !== CardColor.Heart) {
    return 1;
  }

  return sameColorCardsSorter(a, b);
};

const colorSpadeHeartClubCardsSorter = (a: Card, b: Card): number => {
  if (a.color === CardColor.Spade && b.color !== CardColor.Spade) {
    return -1;
  }
  if (a.color === CardColor.Heart) {
    switch (b.color) {
      case CardColor.Club:
        return -1;
      case CardColor.Spade:
        return 1;
    }
  }
  if (a.color === CardColor.Club && b.color !== CardColor.Club) {
    return 1;
  }

  return sameColorCardsSorter(a, b);
};

const colorSpadeDiamondClubHeartCardsSorter = (a: Card, b: Card): number => {
  if (a.color === CardColor.Spade && b.color !== CardColor.Spade) {
    return -1;
  }
  if (a.color === CardColor.Diamond) {
    switch (b.color) {
      case CardColor.Heart:
      case CardColor.Club:
        return -1;
      case CardColor.Spade:
        return 1;
    }
  }
  if (a.color === CardColor.Club) {
    switch (b.color) {
      case CardColor.Heart:
        return -1;
      case CardColor.Spade:
      case CardColor.Diamond:
        return 1;
    }
  }
  if (a.color === CardColor.Heart && b.color !== CardColor.Heart) {
    return 1;
  }

  return sameColorCardsSorter(a, b);
};

/**
 * Sort:
 *   - from Spade to Heart (except if we have black/black/red or black/red/red colors)
 *   - from Ace to Seven
 */
export const sortCards = (cards: Card[]): Card[] => {
  const differentColors = cards.map(c => c.color).filter((color, i, colors) => colors.indexOf(color) === i);

  if (differentColors.length === 3) {
    if (differentColors.every(color => [CardColor.Diamond, CardColor.Spade, CardColor.Heart].includes(color))) {
      return cards.sort(colorDiamondSpadeHeartCardsSorter);
    }
    if (differentColors.every(color => [CardColor.Spade, CardColor.Heart, CardColor.Club].includes(color))) {
      return cards.sort(colorSpadeHeartClubCardsSorter);
    }
  }

  return cards.sort(colorSpadeDiamondClubHeartCardsSorter);
};
