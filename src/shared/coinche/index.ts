import {Context, Game, TurnOrder} from 'boardgame.io/core';
import { shuffleCards } from './actions';
import {
  saySkip,
  sayTake,
} from './moves';

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

export enum TrumpMode {
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
  Deal = 'Deal',
  Talk = 'Talk',
  PlayCards = 'PlayCards',
  EarnPoints = 'EarnPoints',
}

export enum TeamID {
  NorthSouth = 'NorthSouth',
  EastWest = 'EastWest',
}

export interface Card {
  color: PlayingCardColor;
  name: PlayingCardName;
}

export interface GameState {
  // global state
  numCards: number;
  howManyPointsATeamMustReachToEndTheGame: number;
  howManyCardsToDistributeToEachPlayerBeforeTalking: number;
  howManyCardsToDistributeToEachPlayerAfterTalking: number;
  teamsPoints: Record<TeamID, number>;

  // round state
  availableCards: Card[];
  playersCards: Record<PlayerID, Card[]>;
  turnOrder: PlayerID[];
  playedCards: Card[];
  numberOfSuccessiveSkipSaid: number;
  dealer: PlayerID;
  nextDealer: PlayerID;
  expectedPoints?: number;
  trumpMode?: TrumpMode;
}

export interface Moves {
  saySkip: () => void;
  sayTake: (expectedPoints: number, mode: TrumpMode) => void;
}

export type GameStatePlayerView = Omit<GameState, 'playersCards'> & {
  playerCards: Card[];
}

const getCards = (): Card[] => [
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

const getTrumpModeAssociatedToPlayingCardColor = (color: PlayingCardColor): TrumpMode => {
  switch (color) {
    case PlayingCardColor.Spade:
      return TrumpMode.TrumpSpade;
    case PlayingCardColor.Diamond:
      return TrumpMode.TrumpDiamond;
    case PlayingCardColor.Heart:
      return TrumpMode.TrumpHeart;
    case PlayingCardColor.Club:
      return TrumpMode.TrumpClub;
  }
};

export const getCardPoints = (card: Card, trumpMode: TrumpMode): number => {
  switch (card.name) {
    case PlayingCardName.Ace:
      return trumpMode === TrumpMode.NoTrump ? 19 : 11;
    case PlayingCardName.Nine:
      return trumpMode === getTrumpModeAssociatedToPlayingCardColor(card.color) ? 14 : 0;
    case PlayingCardName.Ten:
      return 10;
    case PlayingCardName.Jack:
      return trumpMode === getTrumpModeAssociatedToPlayingCardColor(card.color) ? 20 : 2;
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

export const getSetupGameState = (ctx: Context<PlayerID, PhaseID>, setupData: object): GameState => {
  const dealer = PlayerID.North;
  const availableCards = getCards();
  const numCards = availableCards.length;
  const howManyCardsToDistributeToEachPlayerBeforeTalking = 6;
  const howManyCardsToDistributeToEachPlayerAfterTalking = Math.floor(numCards / ctx.numPlayers) - howManyCardsToDistributeToEachPlayerBeforeTalking;

  return {
    availableCards,
    numCards,
    playedCards: [],
    playersCards: {
      [PlayerID.North]: [],
      [PlayerID.East]: [],
      [PlayerID.South]: [],
      [PlayerID.West]: [],
    },
    teamsPoints: {
      [TeamID.NorthSouth]: 0,
      [TeamID.EastWest]: 0,
    },
    dealer,
    nextDealer: dealer,
    turnOrder: getTurnOrder(dealer),
    howManyCardsToDistributeToEachPlayerBeforeTalking,
    howManyCardsToDistributeToEachPlayerAfterTalking,
    howManyPointsATeamMustReachToEndTheGame: 2000,
    numberOfSuccessiveSkipSaid: 0,
  };
};

export const buildGame = () => Game<GameState, GameStatePlayerView, Moves, PlayerID, PhaseID>({
  setup: getSetupGameState,

  moves: {
    saySkip,
    sayTake,
  },

  flow: {
    endTurn: false,
    endPhase: false,
    endGame: false,
    turnOrder: TurnOrder.CUSTOM_FROM<GameState>('turnOrder'),
    startingPhase: PhaseID.Deal,
    phases: {
      [PhaseID.Deal]: {
        onPhaseBegin: (G, ctx) => {
          G.playedCards = [];
          G.expectedPoints = undefined;
          G.trumpMode = undefined;
          G.playersCards = {
            [PlayerID.North]: [],
            [PlayerID.East]: [],
            [PlayerID.South]: [],
            [PlayerID.West]: [],
          };
          G.dealer = G.nextDealer;
          G.nextDealer = getTurnOrder(G.dealer)[1];
          G.availableCards = shuffleCards(getCards(), ctx.random.Shuffle);
          G.turnOrder.forEach(playerID => {
            for (let i = 0; i < G.howManyCardsToDistributeToEachPlayerBeforeTalking; i++) {
              const card = G.availableCards.pop();
              if (!card) {
                throw new Error();
              }
              G.playersCards[playerID].push(card);
            }
          });

          ctx.events.endPhase();
        },
        next: PhaseID.Talk,
        allowedMoves: [],
      },
      [PhaseID.Talk]: {
        allowedMoves: ['saySkip', 'sayTake'] as (keyof Moves)[],
        endPhaseIf: (G, ctx) => {
          if (G.numberOfSuccessiveSkipSaid >= ctx.numPlayers) {
            return { next: PhaseID.Deal };
          }
          if (G.expectedPoints && G.trumpMode && G.numberOfSuccessiveSkipSaid >= (ctx.numPlayers - 1)) {
            return { next: PhaseID.PlayCards };
          }

          return false;
        },
        onPhaseEnd: (G, ctx) => ({
          ...G,
          numberOfSuccessiveSkipSaid: 0,
        }),
      },
      [PhaseID.PlayCards]: {
        onPhaseBegin: (G, ctx) => {
          G.turnOrder.forEach(playerID => {
            for (let i = 0; i < G.howManyCardsToDistributeToEachPlayerAfterTalking; i++) {
              const card = G.availableCards.pop();
              if (!card) {
                throw new Error();
              }
              G.playersCards[playerID].push(card);
            }
          });

          ctx.events.endPhase();
        },
        allowedMoves: [],
        onPhaseEnd: (G, ctx) => ({
          ...G,
        }),
      },
      [PhaseID.EarnPoints]: {
        allowedMoves: [],
        endPhaseIf: G => Boolean(G.playedCards.length >= G.numCards),
      },
    },
    endGameIf: (G, ctx) => {
      if (Object.entries(G.teamsPoints).every(([teamID, points]) => points < G.howManyPointsATeamMustReachToEndTheGame)) {
        return;
      }

      return true;
    },
  },

  playerView: ({ playersCards, ...GWithoutPlayers }, ctx, playerID): GameStatePlayerView => ({
    ...GWithoutPlayers,
    playerCards: playersCards ? playersCards[playerID] : [],
  }),
});
