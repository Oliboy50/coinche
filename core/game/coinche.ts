import { Game } from 'boardgame.io/core';

enum PlayingCardColor {
  Spade,
  Diamond,
  Heart,
  Club,
}

enum PlayingCardName {
  Ace,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
}

enum CoincheTrumpMode {
  SingleTrump,
  NoTrump,
  AllTrump,
}

enum PlayerPosition {
  North,
  East,
  South,
  West,
}

interface CoinchePlayer {
  name: string;
  cards: CoincheCard[];
}

interface CoincheCard {
  color: PlayingCardColor;
  name: PlayingCardName;
}

export interface CoincheGameState {
  availableCards: CoincheCard[];
  playedCards: CoincheCard[];
  players: {
    [PlayerPosition.North]: CoinchePlayer,
    [PlayerPosition.East]: CoinchePlayer,
    [PlayerPosition.South]: CoinchePlayer,
    [PlayerPosition.West]: CoinchePlayer,
  };
  trumpMode?: CoincheTrumpMode;
  currentTrump?: PlayingCardColor;
}

export interface CoincheGameMoves {
  shuffle: () => any;
  distributeCard: (playerPosition: PlayerPosition) => any;
}

export const getCardValue = (card: CoincheCard, gameState: CoincheGameState): number => {
  switch (card.name) {
    case PlayingCardName.Ace:
      return gameState.trumpMode === CoincheTrumpMode.NoTrump ? 19 : 11;
    case PlayingCardName.Nine:
      return gameState.currentTrump === card.color ? 14 : 0;
    case PlayingCardName.Ten:
      return 10;
    case PlayingCardName.Jack:
      return gameState.currentTrump === card.color ? 20 : 2;
    case PlayingCardName.Queen:
      return 3;
    case PlayingCardName.King:
      return 4;
    default:
      return 0;
  }
};

const getCoincheCards = (): CoincheCard[] => [
  {
    color: PlayingCardColor.Spade,
    name: PlayingCardName.Ace,
  },
  {
    color: PlayingCardColor.Spade,
    name: PlayingCardName.Seven,
  },
  {
    color: PlayingCardColor.Spade,
    name: PlayingCardName.Eight,
  },
  {
    color: PlayingCardColor.Spade,
    name: PlayingCardName.Nine,
  },
  {
    color: PlayingCardColor.Spade,
    name: PlayingCardName.Ten,
  },
  {
    color: PlayingCardColor.Spade,
    name: PlayingCardName.Jack,
  },
  {
    color: PlayingCardColor.Spade,
    name: PlayingCardName.Queen,
  },
  {
    color: PlayingCardColor.Spade,
    name: PlayingCardName.King,
  },
  {
    color: PlayingCardColor.Diamond,
    name: PlayingCardName.Ace,
  },
  {
    color: PlayingCardColor.Diamond,
    name: PlayingCardName.Seven,
  },
  {
    color: PlayingCardColor.Diamond,
    name: PlayingCardName.Eight,
  },
  {
    color: PlayingCardColor.Diamond,
    name: PlayingCardName.Nine,
  },
  {
    color: PlayingCardColor.Diamond,
    name: PlayingCardName.Ten,
  },
  {
    color: PlayingCardColor.Diamond,
    name: PlayingCardName.Jack,
  },
  {
    color: PlayingCardColor.Diamond,
    name: PlayingCardName.Queen,
  },
  {
    color: PlayingCardColor.Diamond,
    name: PlayingCardName.King,
  },
  {
    color: PlayingCardColor.Heart,
    name: PlayingCardName.Ace,
  },
  {
    color: PlayingCardColor.Heart,
    name: PlayingCardName.Seven,
  },
  {
    color: PlayingCardColor.Heart,
    name: PlayingCardName.Eight,
  },
  {
    color: PlayingCardColor.Heart,
    name: PlayingCardName.Nine,
  },
  {
    color: PlayingCardColor.Heart,
    name: PlayingCardName.Ten,
  },
  {
    color: PlayingCardColor.Heart,
    name: PlayingCardName.Jack,
  },
  {
    color: PlayingCardColor.Heart,
    name: PlayingCardName.Queen,
  },
  {
    color: PlayingCardColor.Heart,
    name: PlayingCardName.King,
  },
  {
    color: PlayingCardColor.Club,
    name: PlayingCardName.Ace,
  },
  {
    color: PlayingCardColor.Club,
    name: PlayingCardName.Seven,
  },
  {
    color: PlayingCardColor.Club,
    name: PlayingCardName.Eight,
  },
  {
    color: PlayingCardColor.Club,
    name: PlayingCardName.Nine,
  },
  {
    color: PlayingCardColor.Club,
    name: PlayingCardName.Ten,
  },
  {
    color: PlayingCardColor.Club,
    name: PlayingCardName.Jack,
  },
  {
    color: PlayingCardColor.Club,
    name: PlayingCardName.Queen,
  },
  {
    color: PlayingCardColor.Club,
    name: PlayingCardName.King,
  },
];

export const buildCoincheGame = () => Game<CoincheGameState, CoincheGameMoves>({
  setup: () => ({
    availableCards: getCoincheCards(),
    playedCards: [],
    players: {
      [PlayerPosition.North]: {
        name: 'North',
        cards: [],
      },
      [PlayerPosition.East]: {
        name: 'East',
        cards: [],
      },
      [PlayerPosition.South]: {
        name: 'South',
        cards: [],
      },
      [PlayerPosition.West]: {
        name: 'West',
        cards: [],
      },
    },
  }),

  moves: {
    shuffle: (G, ctx) => ({...G, availableCards: ctx.random.Shuffle(G.availableCards)}),
    distributeCard: (G, ctx, playerPosition) => {
      const card = G.availableCards.pop();
      if (!card) {
        return G;
      }

      G.players[playerPosition].cards.push(card);
      return G;
    },
  },
});
