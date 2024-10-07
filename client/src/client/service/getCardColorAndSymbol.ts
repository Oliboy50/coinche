import {CardColorDisplay} from '../context/cardColor';
import {CardColor, TrumpMode} from '../../shared/coinche';

const SPADE = '♠️';
const CLUB = '♣️';
const DIAMOND = '♦️';
const HEART = '♥️';

export const getCardColorClassForCardColor = (cardColorDisplay: CardColorDisplay, cardColor: CardColor): string => {
  switch (cardColorDisplay) {
    case CardColorDisplay.TwoColors:
      switch (cardColor) {
        case CardColor.Spade:
        case CardColor.Club:
          return 'black';
        case CardColor.Diamond:
        case CardColor.Heart:
          return 'red';
      }
    // eslint-disable-next-line no-fallthrough
    case CardColorDisplay.FourColors:
      switch (cardColor) {
        case CardColor.Spade:
          return 'spade';
        case CardColor.Club:
          return 'club';
        case CardColor.Diamond:
          return 'diamond';
        case CardColor.Heart:
          return 'heart';
      }
  }
};

export const getCardColorClassForTrump = (cardColorDisplay: CardColorDisplay, trumpMode: TrumpMode): string => {
  switch (trumpMode) {
    case TrumpMode.TrumpSpade:
      return getCardColorClassForCardColor(cardColorDisplay, CardColor.Spade);
    case TrumpMode.TrumpClub:
      return getCardColorClassForCardColor(cardColorDisplay, CardColor.Club);
    case TrumpMode.TrumpDiamond:
      return getCardColorClassForCardColor(cardColorDisplay, CardColor.Diamond);
    case TrumpMode.TrumpHeart:
      return getCardColorClassForCardColor(cardColorDisplay, CardColor.Heart);
    case TrumpMode.NoTrump:
      return '';
  }
};

export const getCardSymbolCharForTrump = (trumpMode: TrumpMode): string => {
  switch (trumpMode) {
    case TrumpMode.TrumpSpade:
      return SPADE;
    case TrumpMode.TrumpDiamond:
      return DIAMOND;
    case TrumpMode.TrumpClub:
      return CLUB;
    case TrumpMode.TrumpHeart:
      return HEART;
    case TrumpMode.NoTrump:
      return '';
  }
};

export const getCardSymbolCharForCardColor = (cardColor: CardColor): string => {
  switch (cardColor) {
    case CardColor.Spade:
      return SPADE;
    case CardColor.Club:
      return CLUB;
    case CardColor.Diamond:
      return DIAMOND;
    case CardColor.Heart:
      return HEART;
  }
};
