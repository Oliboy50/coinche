import { Game, TurnOrder } from 'boardgame.io/core';
import { distributeAvailableCard, shuffleAvailableCards } from './actions';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export enum PlayingCardColor {
  Spade,
  Diamond,
  Heart,
  Club,
}

export enum PlayingCardName {
  Ace,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
}

export enum CoincheTrumpMode {
  TrumpSpade,
  TrumpDiamond,
  TrumpHeart,
  TrumpClub,
  NoTrump,
  AllTrump,
}

export enum PlayerID {
  North = '0',
  East = '1',
  South = '2',
  West = '3',
}

export enum PhaseID {
  Talk = '0',
  PlayCards = '1',
}

interface CoinchePlayer {
  cards: CoincheCard[];
}

export interface CoincheCard {
  color: PlayingCardColor;
  name: PlayingCardName;
}

export interface CoincheGameState {
  availableCards: CoincheCard[];
  playedCards: CoincheCard[];
  players: {
    [key in PlayerID]: CoinchePlayer;
  };
  dealer: PlayerID;
  turnOrder: PlayerID[];
  howManyCardsPlayersHaveBeforeTalking: number;
  trumpMode?: CoincheTrumpMode;
  trump?: PlayingCardColor;
  expectedPoints?: number;
}

export type CoincheGameStatePlayerView = Omit<CoincheGameState, 'players'> & {
  player?: CoinchePlayer;
}

export interface CoincheMoves {
  talk_skip: () => any;
  talk_take: (expectedPoints: number, mode: CoincheTrumpMode) => any;
}

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

export const getCoincheCardValue = (card: CoincheCard, gameState: CoincheGameState): number => {
  switch (card.name) {
    case PlayingCardName.Ace:
      return gameState.trumpMode === CoincheTrumpMode.NoTrump ? 19 : 11;
    case PlayingCardName.Nine:
      return gameState.trump === card.color ? 14 : 0;
    case PlayingCardName.Ten:
      return 10;
    case PlayingCardName.Jack:
      return gameState.trump === card.color ? 20 : 2;
    case PlayingCardName.Queen:
      return 3;
    case PlayingCardName.King:
      return 4;
    default:
      return 0;
  }
};

const getTurnOrder = (dealer: PlayerID): PlayerID[] => {
  switch (dealer) {
    case PlayerID.North:
      return [PlayerID.North, PlayerID.West, PlayerID.South, PlayerID.East];
    case PlayerID.East:
      return [PlayerID.East, PlayerID.North, PlayerID.West, PlayerID.South];
    case PlayerID.South:
      return [PlayerID.South, PlayerID.East, PlayerID.North, PlayerID.West];
    case PlayerID.West:
      return [PlayerID.West, PlayerID.South, PlayerID.East, PlayerID.North];
  }
};

export const buildCoincheGame = () => Game<CoincheGameState, CoincheGameStatePlayerView, CoincheMoves, PlayerID, PhaseID>({
  setup: (ctx, setupData) => {
    const dealer = PlayerID.North;

    return {
      availableCards: getCoincheCards(),
      playedCards: [],
      players: {
        [PlayerID.North]: {
          cards: [],
        },
        [PlayerID.East]: {
          cards: [],
        },
        [PlayerID.South]: {
          cards: [],
        },
        [PlayerID.West]: {
          cards: [],
        },
      },
      dealer,
      howManyCardsPlayersHaveBeforeTalking: 6,
      turnOrder: getTurnOrder(dealer),
    };
  },

  flow: {
    turnOrder: TurnOrder.CUSTOM_FROM<CoincheGameState>('turnOrder'),
    startingPhase: PhaseID.Talk,
    phases: {
      [PhaseID.Talk]: {
        onPhaseBegin: (G, ctx) => {
          G.availableCards = shuffleAvailableCards(G, ctx);

          G.turnOrder.forEach(playerID => {
            for (let i = 0; i < G.howManyCardsPlayersHaveBeforeTalking; i++) {
              distributeAvailableCard(G, ctx, playerID);
            }
          });
        },
        allowedMoves: ['talk_skip', 'talk_take'],
        endPhaseIf: G => Boolean(G.trump && G.expectedPoints),
        next: PhaseID.PlayCards,
      },
      [PhaseID.PlayCards]: {
        allowedMoves: [],
        endPhaseIf: G => Boolean(G.trump && G.expectedPoints),
        next: PhaseID.Talk,
      },
    },
  },

  moves: {
    talk_skip: (G, ctx) => ({ ...G, availableCards: shuffleAvailableCards(G, ctx) }),
    talk_take: (G, ctx, expectedPoints, color) => ({ ...G, availableCards: shuffleAvailableCards(G, ctx) }),
  },

  playerView: ({ players, ...GWithoutPlayers }, ctx, playerID) => ({
    ...GWithoutPlayers,
    ...(players ? { player: players[playerID] } : null),
  }),
});
