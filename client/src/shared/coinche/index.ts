import {
  Context,
  Game,
  TurnOrder,
} from 'boardgame.io/core';
import saySkip from './move/saySkip';
import sayTake from './move/sayTake';
import sayAnnounce from './move/sayAnnounce';
import playCard from './move/playCard';

export enum CardColor {
  Spade = 'Spade',
  Diamond = 'Diamond',
  Heart = 'Heart',
  Club = 'Club',
}

export enum CardName {
  Ace = 'Ace',
  Seven = 'Seven',
  Eight = 'Eight',
  Nine = 'Nine',
  Ten = 'Ten',
  Jack = 'Jack',
  Queen = 'Queen',
  King = 'King',
}

export interface Card {
  color: CardColor;
  name: CardName;
}
export type SecretCard = true; // SecretCard are Card with hidden properties
export const secretCard: SecretCard = true;
export const isSameCard = (card: Card | undefined, otherCard: Card | undefined): boolean => {
  if (!card || !otherCard) {
    return false;
  }

  return card.color === otherCard.color && card.name === otherCard.name;
};
export const cardsContainCard = (cards: Card[], card: Card): boolean => cards.some(c => isSameCard(c, card));

export enum TrumpMode {
  TrumpSpade = 'TrumpSpade',
  TrumpDiamond = 'TrumpDiamond',
  TrumpClub = 'TrumpClub',
  TrumpHeart = 'TrumpHeart',
  NoTrump = 'NoTrump',
}
export const validTrumpModes: TrumpMode[] = Object.values(TrumpMode);

export enum PlayerID {
  North = '0',
  East = '1',
  South = '2',
  West = '3',
}
export const validPlayerIDs: PlayerID[] = Object.values(PlayerID);
const howManyPlayers = Object.keys(PlayerID).length;

export enum PhaseID {
  Deal = 'Deal',
  Talk = 'Talk',
  PlayCards = 'PlayCards',
  CountPoints = 'CountPoints',
}
export enum TeamID {
  NorthSouth = 'NorthSouth',
  EastWest = 'EastWest',
}

export const validExpectedPoints = [
  82,
  85,
  90,
  95,
  100,
  105,
  110,
  115,
  120,
  125,
  130,
  135,
  140,
  145,
  150,
  155,
  160,
  165,
  170,
  175,
  180,
  185,
  190,
  195,
  200,
  205,
  210,
  215,
  220,
  225,
  230,
  235,
  240,
  245,
  250,
];

export enum AnnounceId {
  SquareAce = 'SquareAce',
  SquareNine = 'SquareNine',
  SquareTen = 'SquareTen',
  SquareJack = 'SquareJack',
  SquareQueen = 'SquareQueen',
  SquareKing = 'SquareKing',
  QuinteAceSpade = 'QuinteAceSpade',
  QuinteAceDiamond = 'QuinteAceDiamond',
  QuinteAceHeart = 'QuinteAceHeart',
  QuinteAceClub = 'QuinteAceClub',
  QuinteKingSpade = 'QuinteKingSpade',
  QuinteKingDiamond = 'QuinteKingDiamond',
  QuinteKingHeart = 'QuinteKingHeart',
  QuinteKingClub = 'QuinteKingClub',
  QuinteQueenSpade = 'QuinteQueenSpade',
  QuinteQueenDiamond = 'QuinteQueenDiamond',
  QuinteQueenHeart = 'QuinteQueenHeart',
  QuinteQueenClub = 'QuinteQueenClub',
  QuinteJackSpade = 'QuinteJackSpade',
  QuinteJackDiamond = 'QuinteJackDiamond',
  QuinteJackHeart = 'QuinteJackHeart',
  QuinteJackClub = 'QuinteJackClub',
  QuarteAceSpade = 'QuarteAceSpade',
  QuarteAceDiamond = 'QuarteAceDiamond',
  QuarteAceHeart = 'QuarteAceHeart',
  QuarteAceClub = 'QuarteAceClub',
  QuarteKingSpade = 'QuarteKingSpade',
  QuarteKingDiamond = 'QuarteKingDiamond',
  QuarteKingHeart = 'QuarteKingHeart',
  QuarteKingClub = 'QuarteKingClub',
  QuarteQueenSpade = 'QuarteQueenSpade',
  QuarteQueenDiamond = 'QuarteQueenDiamond',
  QuarteQueenHeart = 'QuarteQueenHeart',
  QuarteQueenClub = 'QuarteQueenClub',
  QuarteJackSpade = 'QuarteJackSpade',
  QuarteJackDiamond = 'QuarteJackDiamond',
  QuarteJackHeart = 'QuarteJackHeart',
  QuarteJackClub = 'QuarteJackClub',
  QuarteTenSpade = 'QuarteTenSpade',
  QuarteTenDiamond = 'QuarteTenDiamond',
  QuarteTenHeart = 'QuarteTenHeart',
  QuarteTenClub = 'QuarteTenClub',
  TierceAceSpade = 'TierceAceSpade',
  TierceAceDiamond = 'TierceAceDiamond',
  TierceAceHeart = 'TierceAceHeart',
  TierceAceClub = 'TierceAceClub',
  TierceKingSpade = 'TierceKingSpade',
  TierceKingDiamond = 'TierceKingDiamond',
  TierceKingHeart = 'TierceKingHeart',
  TierceKingClub = 'TierceKingClub',
  TierceQueenSpade = 'TierceQueenSpade',
  TierceQueenDiamond = 'TierceQueenDiamond',
  TierceQueenHeart = 'TierceQueenHeart',
  TierceQueenClub = 'TierceQueenClub',
  TierceJackSpade = 'TierceJackSpade',
  TierceJackDiamond = 'TierceJackDiamond',
  TierceJackHeart = 'TierceJackHeart',
  TierceJackClub = 'TierceJackClub',
  TierceTenSpade = 'TierceTenSpade',
  TierceTenDiamond = 'TierceTenDiamond',
  TierceTenHeart = 'TierceTenHeart',
  TierceTenClub = 'TierceTenClub',
  TierceNineSpade = 'TierceNineSpade',
  TierceNineDiamond = 'TierceNineDiamond',
  TierceNineHeart = 'TierceNineHeart',
  TierceNineClub = 'TierceNineClub',
  // @TODO
  // Belot = 'Belot',
}
export const validAnnounceIds: AnnounceId[] = Object.values(AnnounceId);

export interface Announce {
  id: AnnounceId;
  cards: Card[];
}

export interface GameState {
  // global state
  howManyPlayers: number;
  howManyCards: number;
  howManyPointsATeamMustReachToEndTheGame: number;
  howManyCardsToDealToEachPlayerBeforeTalking: number;
  howManyCardsToDealToEachPlayerAfterTalking: number;
  teamsPoints: Record<TeamID, number>;

  // round state
  availableCards: Card[];
  playersCards: Record<PlayerID, Card[]>;
  wonTeamsCards: Record<TeamID, Card[]>;
  turnOrder: PlayerID[];
  dealer: PlayerID;
  nextDealer: PlayerID;
  attackingTeam: TeamID;
  defensingTeam: TeamID;
  expectedPoints: number;
  trumpMode: TrumpMode;
  playersSaid: Record<PlayerID, 'skip' | { expectedPoints: number; trumpMode: TrumpMode } | undefined>;
  numberOfSuccessiveSkipSaid: number;
  playersSaidAnnounces: Record<PlayerID, { announce: Announce; isCardsDisplayable: boolean; }[]>;

  // turn state
  firstPlayerInCurrentTurn: PlayerID;
  playersCardsPlayedInCurrentTurn: Record<PlayerID, Card | undefined>;
  playersCardsPlayedInPreviousTurn: Record<PlayerID, Card> | undefined;
}
export type GameStatePlayerView = Omit<GameState, 'availableCards' | 'playersCards'> & {
  availableCards: SecretCard[];
  playersCards: Record<PlayerID, Card[] | SecretCard[]>;
  playerCards: Card[]; // Syntactic sugar for playersCards[myPlayerID]
}

export interface Moves {
  saySkip: () => void;
  sayTake: (expectedPoints: number, mode: TrumpMode) => void;
  sayAnnounce: (announce: Announce) => void;
  playCard: (card: Card) => void;
}

export const getTrumpModeAssociatedToCardColor = (color: CardColor): TrumpMode => {
  switch (color) {
    case CardColor.Spade:
      return TrumpMode.TrumpSpade;
    case CardColor.Diamond:
      return TrumpMode.TrumpDiamond;
    case CardColor.Heart:
      return TrumpMode.TrumpHeart;
    case CardColor.Club:
      return TrumpMode.TrumpClub;
  }
};
export const getCardColorAssociatedToTrumpMode = (trumpMode: TrumpMode): CardColor | undefined => {
  switch (trumpMode) {
    case TrumpMode.TrumpSpade:
      return CardColor.Spade;
    case TrumpMode.TrumpDiamond:
      return CardColor.Diamond;
    case TrumpMode.TrumpHeart:
      return CardColor.Heart;
    case TrumpMode.TrumpClub:
      return CardColor.Club;
  }
};

export const getPlayerPartner = (player: PlayerID): PlayerID => {
  switch (player) {
    case PlayerID.North:
      return PlayerID.South;
    case PlayerID.East:
      return PlayerID.West;
    case PlayerID.South:
      return PlayerID.North;
    case PlayerID.West:
      return PlayerID.East;
  }
};
export const getPlayerTeam = (player: PlayerID): TeamID => [PlayerID.North, PlayerID.South].includes(player) ? TeamID.NorthSouth : TeamID.EastWest;

export const isSayableExpectedPoints = (expectedPoints: number, playersSaid: GameState['playersSaid']): boolean => {
  return Object.values(playersSaid)
    .filter(said => Boolean(said && said !== 'skip' && said.expectedPoints))
    // @ts-ignore StupidTypescript
    .every(said => said.expectedPoints < expectedPoints);
};

export const getAnnounces = (): Announce[] => [
  {
    id: AnnounceId.SquareAce,
    cards: [
      { name: CardName.Ace, color: CardColor.Club },
      { name: CardName.Ace, color: CardColor.Spade },
      { name: CardName.Ace, color: CardColor.Heart },
      { name: CardName.Ace, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.SquareKing,
    cards: [
      { name: CardName.King, color: CardColor.Club },
      { name: CardName.King, color: CardColor.Spade },
      { name: CardName.King, color: CardColor.Heart },
      { name: CardName.King, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.SquareQueen,
    cards: [
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Queen, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.SquareJack,
    cards: [
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.SquareTen,
    cards: [
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.SquareNine,
    cards: [
      { name: CardName.Nine, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.QuinteAceSpade,
    cards: [
      { name: CardName.Ace, color: CardColor.Spade },
      { name: CardName.King, color: CardColor.Spade },
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceId.QuinteAceDiamond,
    cards: [
      { name: CardName.Ace, color: CardColor.Diamond },
      { name: CardName.King, color: CardColor.Diamond },
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.QuinteAceHeart,
    cards: [
      { name: CardName.Ace, color: CardColor.Heart },
      { name: CardName.King, color: CardColor.Heart },
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceId.QuinteAceClub,
    cards: [
      { name: CardName.Ace, color: CardColor.Club },
      { name: CardName.King, color: CardColor.Club },
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceId.QuinteKingSpade,
    cards: [
      { name: CardName.King, color: CardColor.Spade },
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceId.QuinteKingDiamond,
    cards: [
      { name: CardName.King, color: CardColor.Diamond },
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.QuinteKingHeart,
    cards: [
      { name: CardName.King, color: CardColor.Heart },
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceId.QuinteKingClub,
    cards: [
      { name: CardName.King, color: CardColor.Club },
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceId.QuinteQueenSpade,
    cards: [
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
      { name: CardName.Eight, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceId.QuinteQueenDiamond,
    cards: [
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
      { name: CardName.Eight, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.QuinteQueenHeart,
    cards: [
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
      { name: CardName.Eight, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceId.QuinteQueenClub,
    cards: [
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
      { name: CardName.Eight, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceId.QuinteJackSpade,
    cards: [
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
      { name: CardName.Eight, color: CardColor.Spade },
      { name: CardName.Seven, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceId.QuinteJackDiamond,
    cards: [
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
      { name: CardName.Eight, color: CardColor.Diamond },
      { name: CardName.Seven, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.QuinteJackHeart,
    cards: [
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
      { name: CardName.Eight, color: CardColor.Heart },
      { name: CardName.Seven, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceId.QuinteJackClub,
    cards: [
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
      { name: CardName.Eight, color: CardColor.Club },
      { name: CardName.Seven, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceId.QuarteAceSpade,
    cards: [
      { name: CardName.Ace, color: CardColor.Spade },
      { name: CardName.King, color: CardColor.Spade },
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceId.QuarteAceDiamond,
    cards: [
      { name: CardName.Ace, color: CardColor.Diamond },
      { name: CardName.King, color: CardColor.Diamond },
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.QuarteAceHeart,
    cards: [
      { name: CardName.Ace, color: CardColor.Heart },
      { name: CardName.King, color: CardColor.Heart },
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceId.QuarteAceClub,
    cards: [
      { name: CardName.Ace, color: CardColor.Club },
      { name: CardName.King, color: CardColor.Club },
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceId.QuarteKingSpade,
    cards: [
      { name: CardName.King, color: CardColor.Spade },
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceId.QuarteKingDiamond,
    cards: [
      { name: CardName.King, color: CardColor.Diamond },
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.QuarteKingHeart,
    cards: [
      { name: CardName.King, color: CardColor.Heart },
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceId.QuarteKingClub,
    cards: [
      { name: CardName.King, color: CardColor.Club },
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceId.QuarteQueenSpade,
    cards: [
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceId.QuarteQueenDiamond,
    cards: [
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.QuarteQueenHeart,
    cards: [
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceId.QuarteQueenClub,
    cards: [
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceId.QuarteJackSpade,
    cards: [
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
      { name: CardName.Eight, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceId.QuarteJackDiamond,
    cards: [
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
      { name: CardName.Eight, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.QuarteJackHeart,
    cards: [
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
      { name: CardName.Eight, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceId.QuarteJackClub,
    cards: [
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
      { name: CardName.Eight, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceId.QuarteTenSpade,
    cards: [
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
      { name: CardName.Eight, color: CardColor.Spade },
      { name: CardName.Seven, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceId.QuarteTenDiamond,
    cards: [
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
      { name: CardName.Eight, color: CardColor.Diamond },
      { name: CardName.Seven, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.QuarteTenHeart,
    cards: [
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
      { name: CardName.Eight, color: CardColor.Heart },
      { name: CardName.Seven, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceId.QuarteTenClub,
    cards: [
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
      { name: CardName.Eight, color: CardColor.Club },
      { name: CardName.Seven, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceId.TierceAceSpade,
    cards: [
      { name: CardName.Ace, color: CardColor.Spade },
      { name: CardName.King, color: CardColor.Spade },
      { name: CardName.Queen, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceId.TierceAceDiamond,
    cards: [
      { name: CardName.Ace, color: CardColor.Diamond },
      { name: CardName.King, color: CardColor.Diamond },
      { name: CardName.Queen, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.TierceAceHeart,
    cards: [
      { name: CardName.Ace, color: CardColor.Heart },
      { name: CardName.King, color: CardColor.Heart },
      { name: CardName.Queen, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceId.TierceAceClub,
    cards: [
      { name: CardName.Ace, color: CardColor.Club },
      { name: CardName.King, color: CardColor.Club },
      { name: CardName.Queen, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceId.TierceKingSpade,
    cards: [
      { name: CardName.King, color: CardColor.Spade },
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceId.TierceKingDiamond,
    cards: [
      { name: CardName.King, color: CardColor.Diamond },
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.TierceKingHeart,
    cards: [
      { name: CardName.King, color: CardColor.Heart },
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceId.TierceKingClub,
    cards: [
      { name: CardName.King, color: CardColor.Club },
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceId.TierceQueenSpade,
    cards: [
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceId.TierceQueenDiamond,
    cards: [
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.TierceQueenHeart,
    cards: [
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceId.TierceQueenClub,
    cards: [
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceId.TierceJackSpade,
    cards: [
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceId.TierceJackDiamond,
    cards: [
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.TierceJackHeart,
    cards: [
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceId.TierceJackClub,
    cards: [
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceId.TierceTenSpade,
    cards: [
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
      { name: CardName.Eight, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceId.TierceTenDiamond,
    cards: [
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
      { name: CardName.Eight, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.TierceTenHeart,
    cards: [
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
      { name: CardName.Eight, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceId.TierceTenClub,
    cards: [
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
      { name: CardName.Eight, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceId.TierceNineSpade,
    cards: [
      { name: CardName.Nine, color: CardColor.Spade },
      { name: CardName.Eight, color: CardColor.Spade },
      { name: CardName.Seven, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceId.TierceNineDiamond,
    cards: [
      { name: CardName.Nine, color: CardColor.Diamond },
      { name: CardName.Eight, color: CardColor.Diamond },
      { name: CardName.Seven, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceId.TierceNineHeart,
    cards: [
      { name: CardName.Nine, color: CardColor.Heart },
      { name: CardName.Eight, color: CardColor.Heart },
      { name: CardName.Seven, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceId.TierceNineClub,
    cards: [
      { name: CardName.Nine, color: CardColor.Club },
      { name: CardName.Eight, color: CardColor.Club },
      { name: CardName.Seven, color: CardColor.Club },
    ],
  },
];
export const getAnnounceById = (announceId: AnnounceId): Announce => getAnnounces().find((a) => announceId === a.id)!;
export const getAnnounceGroupName = (announce: Announce): 'Square'|'Tierce'|'Quarte'|'Quinte' => {
  switch (announce.id) {
    case AnnounceId.SquareAce:
    case AnnounceId.SquareNine:
    case AnnounceId.SquareTen:
    case AnnounceId.SquareJack:
    case AnnounceId.SquareQueen:
    case AnnounceId.SquareKing:
      return 'Square';
    case AnnounceId.TierceAceSpade:
    case AnnounceId.TierceAceDiamond:
    case AnnounceId.TierceAceHeart:
    case AnnounceId.TierceAceClub:
    case AnnounceId.TierceKingSpade:
    case AnnounceId.TierceKingDiamond:
    case AnnounceId.TierceKingHeart:
    case AnnounceId.TierceKingClub:
    case AnnounceId.TierceQueenSpade:
    case AnnounceId.TierceQueenDiamond:
    case AnnounceId.TierceQueenHeart:
    case AnnounceId.TierceQueenClub:
    case AnnounceId.TierceJackSpade:
    case AnnounceId.TierceJackDiamond:
    case AnnounceId.TierceJackHeart:
    case AnnounceId.TierceJackClub:
    case AnnounceId.TierceTenSpade:
    case AnnounceId.TierceTenDiamond:
    case AnnounceId.TierceTenHeart:
    case AnnounceId.TierceTenClub:
    case AnnounceId.TierceNineSpade:
    case AnnounceId.TierceNineDiamond:
    case AnnounceId.TierceNineHeart:
    case AnnounceId.TierceNineClub:
      return 'Tierce';
    case AnnounceId.QuarteAceSpade:
    case AnnounceId.QuarteAceDiamond:
    case AnnounceId.QuarteAceHeart:
    case AnnounceId.QuarteAceClub:
    case AnnounceId.QuarteKingSpade:
    case AnnounceId.QuarteKingDiamond:
    case AnnounceId.QuarteKingHeart:
    case AnnounceId.QuarteKingClub:
    case AnnounceId.QuarteQueenSpade:
    case AnnounceId.QuarteQueenDiamond:
    case AnnounceId.QuarteQueenHeart:
    case AnnounceId.QuarteQueenClub:
    case AnnounceId.QuarteJackSpade:
    case AnnounceId.QuarteJackDiamond:
    case AnnounceId.QuarteJackHeart:
    case AnnounceId.QuarteJackClub:
    case AnnounceId.QuarteTenSpade:
    case AnnounceId.QuarteTenDiamond:
    case AnnounceId.QuarteTenHeart:
    case AnnounceId.QuarteTenClub:
      return 'Quarte';
    case AnnounceId.QuinteAceSpade:
    case AnnounceId.QuinteAceDiamond:
    case AnnounceId.QuinteAceHeart:
    case AnnounceId.QuinteAceClub:
    case AnnounceId.QuinteKingSpade:
    case AnnounceId.QuinteKingDiamond:
    case AnnounceId.QuinteKingHeart:
    case AnnounceId.QuinteKingClub:
    case AnnounceId.QuinteQueenSpade:
    case AnnounceId.QuinteQueenDiamond:
    case AnnounceId.QuinteQueenHeart:
    case AnnounceId.QuinteQueenClub:
    case AnnounceId.QuinteJackSpade:
    case AnnounceId.QuinteJackDiamond:
    case AnnounceId.QuinteJackHeart:
    case AnnounceId.QuinteJackClub:
      return 'Quinte';
  }
};
export const getAnnouncePoints = (announce: Announce, trumpMode: TrumpMode): number => {
  switch (announce.id) {
    case AnnounceId.SquareAce:
      return trumpMode === TrumpMode.NoTrump ? 200 : 100;
    case AnnounceId.SquareNine:
      return trumpMode === TrumpMode.NoTrump ? 100 : 150;
    case AnnounceId.SquareTen:
      return trumpMode === TrumpMode.NoTrump ? 150 : 100;
    case AnnounceId.SquareJack:
      return trumpMode === TrumpMode.NoTrump ? 100 : 200;
    case AnnounceId.SquareQueen:
      return 100;
    case AnnounceId.SquareKing:
      return 100;
    case AnnounceId.TierceAceSpade:
    case AnnounceId.TierceAceDiamond:
    case AnnounceId.TierceAceHeart:
    case AnnounceId.TierceAceClub:
    case AnnounceId.TierceKingSpade:
    case AnnounceId.TierceKingDiamond:
    case AnnounceId.TierceKingHeart:
    case AnnounceId.TierceKingClub:
    case AnnounceId.TierceQueenSpade:
    case AnnounceId.TierceQueenDiamond:
    case AnnounceId.TierceQueenHeart:
    case AnnounceId.TierceQueenClub:
    case AnnounceId.TierceJackSpade:
    case AnnounceId.TierceJackDiamond:
    case AnnounceId.TierceJackHeart:
    case AnnounceId.TierceJackClub:
    case AnnounceId.TierceTenSpade:
    case AnnounceId.TierceTenDiamond:
    case AnnounceId.TierceTenHeart:
    case AnnounceId.TierceTenClub:
    case AnnounceId.TierceNineSpade:
    case AnnounceId.TierceNineDiamond:
    case AnnounceId.TierceNineHeart:
    case AnnounceId.TierceNineClub:
      return 20;
    case AnnounceId.QuarteAceSpade:
    case AnnounceId.QuarteAceDiamond:
    case AnnounceId.QuarteAceHeart:
    case AnnounceId.QuarteAceClub:
    case AnnounceId.QuarteKingSpade:
    case AnnounceId.QuarteKingDiamond:
    case AnnounceId.QuarteKingHeart:
    case AnnounceId.QuarteKingClub:
    case AnnounceId.QuarteQueenSpade:
    case AnnounceId.QuarteQueenDiamond:
    case AnnounceId.QuarteQueenHeart:
    case AnnounceId.QuarteQueenClub:
    case AnnounceId.QuarteJackSpade:
    case AnnounceId.QuarteJackDiamond:
    case AnnounceId.QuarteJackHeart:
    case AnnounceId.QuarteJackClub:
    case AnnounceId.QuarteTenSpade:
    case AnnounceId.QuarteTenDiamond:
    case AnnounceId.QuarteTenHeart:
    case AnnounceId.QuarteTenClub:
      return 50;
    case AnnounceId.QuinteAceSpade:
    case AnnounceId.QuinteAceDiamond:
    case AnnounceId.QuinteAceHeart:
    case AnnounceId.QuinteAceClub:
    case AnnounceId.QuinteKingSpade:
    case AnnounceId.QuinteKingDiamond:
    case AnnounceId.QuinteKingHeart:
    case AnnounceId.QuinteKingClub:
    case AnnounceId.QuinteQueenSpade:
    case AnnounceId.QuinteQueenDiamond:
    case AnnounceId.QuinteQueenHeart:
    case AnnounceId.QuinteQueenClub:
    case AnnounceId.QuinteJackSpade:
    case AnnounceId.QuinteJackDiamond:
    case AnnounceId.QuinteJackHeart:
    case AnnounceId.QuinteJackClub:
      return 100;
  }
};
const announcesContainAnnounceId = (announces: Announce[], announceId: AnnounceId): boolean => announces.some(a => a.id === announceId);
const filterSelfExcludingAnnounces = (announces: Announce[]): Announce[] => {
  let bestAnnounces = [...announces];

  const selfExcludingAnnouncesSortedByPriority: {id: AnnounceId, excludes: AnnounceId[]}[] = [
    {
      id: AnnounceId.QuinteAceSpade,
      excludes: [
        AnnounceId.QuinteKingSpade,
        AnnounceId.QuinteQueenSpade,
        AnnounceId.QuinteJackSpade,
        AnnounceId.QuarteAceSpade,
        AnnounceId.QuarteKingSpade,
        AnnounceId.QuarteQueenSpade,
        AnnounceId.QuarteJackSpade,
        AnnounceId.QuarteTenSpade,
        AnnounceId.TierceAceSpade,
        AnnounceId.TierceKingSpade,
        AnnounceId.TierceQueenSpade,
        AnnounceId.TierceJackSpade,
        AnnounceId.TierceTenSpade,
      ],
    },
    {
      id: AnnounceId.QuinteAceDiamond,
      excludes: [
        AnnounceId.QuinteKingDiamond,
        AnnounceId.QuinteQueenDiamond,
        AnnounceId.QuinteJackDiamond,
        AnnounceId.QuarteAceDiamond,
        AnnounceId.QuarteKingDiamond,
        AnnounceId.QuarteQueenDiamond,
        AnnounceId.QuarteJackDiamond,
        AnnounceId.QuarteTenDiamond,
        AnnounceId.TierceAceDiamond,
        AnnounceId.TierceKingDiamond,
        AnnounceId.TierceQueenDiamond,
        AnnounceId.TierceJackDiamond,
        AnnounceId.TierceTenDiamond,
      ],
    },
    {
      id: AnnounceId.QuinteAceHeart,
      excludes: [
        AnnounceId.QuinteKingHeart,
        AnnounceId.QuinteQueenHeart,
        AnnounceId.QuinteJackHeart,
        AnnounceId.QuarteAceHeart,
        AnnounceId.QuarteKingHeart,
        AnnounceId.QuarteQueenHeart,
        AnnounceId.QuarteJackHeart,
        AnnounceId.QuarteTenHeart,
        AnnounceId.TierceAceHeart,
        AnnounceId.TierceKingHeart,
        AnnounceId.TierceQueenHeart,
        AnnounceId.TierceJackHeart,
        AnnounceId.TierceTenHeart,
      ],
    },
    {
      id: AnnounceId.QuinteAceClub,
      excludes: [
        AnnounceId.QuinteKingClub,
        AnnounceId.QuinteQueenClub,
        AnnounceId.QuinteJackClub,
        AnnounceId.QuarteAceClub,
        AnnounceId.QuarteKingClub,
        AnnounceId.QuarteQueenClub,
        AnnounceId.QuarteJackClub,
        AnnounceId.QuarteTenClub,
        AnnounceId.TierceAceClub,
        AnnounceId.TierceKingClub,
        AnnounceId.TierceQueenClub,
        AnnounceId.TierceJackClub,
        AnnounceId.TierceTenClub,
      ],
    },
    {
      id: AnnounceId.QuinteKingSpade,
      excludes: [
        AnnounceId.QuinteQueenSpade,
        AnnounceId.QuinteJackSpade,
        AnnounceId.QuarteKingSpade,
        AnnounceId.QuarteQueenSpade,
        AnnounceId.QuarteJackSpade,
        AnnounceId.QuarteTenSpade,
        AnnounceId.TierceKingSpade,
        AnnounceId.TierceQueenSpade,
        AnnounceId.TierceJackSpade,
        AnnounceId.TierceTenSpade,
        AnnounceId.TierceNineSpade,
      ],
    },
    {
      id: AnnounceId.QuinteKingDiamond,
      excludes: [
        AnnounceId.QuinteQueenDiamond,
        AnnounceId.QuinteJackDiamond,
        AnnounceId.QuarteKingDiamond,
        AnnounceId.QuarteQueenDiamond,
        AnnounceId.QuarteJackDiamond,
        AnnounceId.QuarteTenDiamond,
        AnnounceId.TierceKingDiamond,
        AnnounceId.TierceQueenDiamond,
        AnnounceId.TierceJackDiamond,
        AnnounceId.TierceTenDiamond,
        AnnounceId.TierceNineDiamond,
      ],
    },
    {
      id: AnnounceId.QuinteKingHeart,
      excludes: [
        AnnounceId.QuinteQueenHeart,
        AnnounceId.QuinteJackHeart,
        AnnounceId.QuarteKingHeart,
        AnnounceId.QuarteQueenHeart,
        AnnounceId.QuarteJackHeart,
        AnnounceId.QuarteTenHeart,
        AnnounceId.TierceKingHeart,
        AnnounceId.TierceQueenHeart,
        AnnounceId.TierceJackHeart,
        AnnounceId.TierceTenHeart,
        AnnounceId.TierceNineHeart,
      ],
    },
    {
      id: AnnounceId.QuinteKingClub,
      excludes: [
        AnnounceId.QuinteQueenClub,
        AnnounceId.QuinteJackClub,
        AnnounceId.QuarteKingClub,
        AnnounceId.QuarteQueenClub,
        AnnounceId.QuarteJackClub,
        AnnounceId.QuarteTenClub,
        AnnounceId.TierceKingClub,
        AnnounceId.TierceQueenClub,
        AnnounceId.TierceJackClub,
        AnnounceId.TierceTenClub,
        AnnounceId.TierceNineClub,
      ],
    },
    {
      id: AnnounceId.QuinteQueenSpade,
      excludes: [
        AnnounceId.QuinteJackSpade,
        AnnounceId.QuarteQueenSpade,
        AnnounceId.QuarteJackSpade,
        AnnounceId.QuarteTenSpade,
        AnnounceId.TierceQueenSpade,
        AnnounceId.TierceJackSpade,
        AnnounceId.TierceTenSpade,
        AnnounceId.TierceNineSpade,
      ],
    },
    {
      id: AnnounceId.QuinteQueenDiamond,
      excludes: [
        AnnounceId.QuinteJackDiamond,
        AnnounceId.QuarteQueenDiamond,
        AnnounceId.QuarteJackDiamond,
        AnnounceId.QuarteTenDiamond,
        AnnounceId.TierceQueenDiamond,
        AnnounceId.TierceJackDiamond,
        AnnounceId.TierceTenDiamond,
        AnnounceId.TierceNineDiamond,
      ],
    },
    {
      id: AnnounceId.QuinteQueenHeart,
      excludes: [
        AnnounceId.QuinteJackHeart,
        AnnounceId.QuarteQueenHeart,
        AnnounceId.QuarteJackHeart,
        AnnounceId.QuarteTenHeart,
        AnnounceId.TierceQueenHeart,
        AnnounceId.TierceJackHeart,
        AnnounceId.TierceTenHeart,
        AnnounceId.TierceNineHeart,
      ],
    },
    {
      id: AnnounceId.QuinteQueenClub,
      excludes: [
        AnnounceId.QuinteJackClub,
        AnnounceId.QuarteQueenClub,
        AnnounceId.QuarteJackClub,
        AnnounceId.QuarteTenClub,
        AnnounceId.TierceQueenClub,
        AnnounceId.TierceJackClub,
        AnnounceId.TierceTenClub,
        AnnounceId.TierceNineClub,
      ],
    },
    {
      id: AnnounceId.QuinteJackSpade,
      excludes: [
        AnnounceId.QuarteJackSpade,
        AnnounceId.QuarteTenSpade,
        AnnounceId.TierceJackSpade,
        AnnounceId.TierceTenSpade,
        AnnounceId.TierceNineSpade,
      ],
    },
    {
      id: AnnounceId.QuinteJackDiamond,
      excludes: [
        AnnounceId.QuarteJackDiamond,
        AnnounceId.QuarteTenDiamond,
        AnnounceId.TierceJackDiamond,
        AnnounceId.TierceTenDiamond,
        AnnounceId.TierceNineDiamond,
      ],
    },
    {
      id: AnnounceId.QuinteJackHeart,
      excludes: [
        AnnounceId.QuarteJackHeart,
        AnnounceId.QuarteTenHeart,
        AnnounceId.TierceJackHeart,
        AnnounceId.TierceTenHeart,
        AnnounceId.TierceNineHeart,
      ],
    },
    {
      id: AnnounceId.QuinteJackClub,
      excludes: [
        AnnounceId.QuarteJackClub,
        AnnounceId.QuarteTenClub,
        AnnounceId.TierceJackClub,
        AnnounceId.TierceTenClub,
        AnnounceId.TierceNineClub,
      ],
    },
    {
      id: AnnounceId.QuarteAceSpade,
      excludes: [
        AnnounceId.QuarteKingSpade,
        AnnounceId.QuarteQueenSpade,
        AnnounceId.QuarteJackSpade,
        AnnounceId.QuarteTenSpade,
        AnnounceId.TierceAceSpade,
        AnnounceId.TierceKingSpade,
        AnnounceId.TierceQueenSpade,
        AnnounceId.TierceJackSpade,
        AnnounceId.TierceTenSpade,
      ],
    },
    {
      id: AnnounceId.QuarteAceDiamond,
      excludes: [
        AnnounceId.QuarteKingDiamond,
        AnnounceId.QuarteQueenDiamond,
        AnnounceId.QuarteJackDiamond,
        AnnounceId.QuarteTenDiamond,
        AnnounceId.TierceAceDiamond,
        AnnounceId.TierceKingDiamond,
        AnnounceId.TierceQueenDiamond,
        AnnounceId.TierceJackDiamond,
        AnnounceId.TierceTenDiamond,
      ],
    },
    {
      id: AnnounceId.QuarteAceHeart,
      excludes: [
        AnnounceId.QuarteKingHeart,
        AnnounceId.QuarteQueenHeart,
        AnnounceId.QuarteJackHeart,
        AnnounceId.QuarteTenHeart,
        AnnounceId.TierceAceHeart,
        AnnounceId.TierceKingHeart,
        AnnounceId.TierceQueenHeart,
        AnnounceId.TierceJackHeart,
        AnnounceId.TierceTenHeart,
      ],
    },
    {
      id: AnnounceId.QuarteAceClub,
      excludes: [
        AnnounceId.QuarteKingClub,
        AnnounceId.QuarteQueenClub,
        AnnounceId.QuarteJackClub,
        AnnounceId.QuarteTenClub,
        AnnounceId.TierceAceClub,
        AnnounceId.TierceKingClub,
        AnnounceId.TierceQueenClub,
        AnnounceId.TierceJackClub,
        AnnounceId.TierceTenClub,
      ],
    },
    {
      id: AnnounceId.QuarteKingSpade,
      excludes: [
        AnnounceId.QuarteQueenSpade,
        AnnounceId.QuarteJackSpade,
        AnnounceId.QuarteTenSpade,
        AnnounceId.TierceKingSpade,
        AnnounceId.TierceQueenSpade,
        AnnounceId.TierceJackSpade,
        AnnounceId.TierceTenSpade,
        AnnounceId.TierceNineSpade,
      ],
    },
    {
      id: AnnounceId.QuarteKingDiamond,
      excludes: [
        AnnounceId.QuarteQueenDiamond,
        AnnounceId.QuarteJackDiamond,
        AnnounceId.QuarteTenDiamond,
        AnnounceId.TierceKingDiamond,
        AnnounceId.TierceQueenDiamond,
        AnnounceId.TierceJackDiamond,
        AnnounceId.TierceTenDiamond,
        AnnounceId.TierceNineDiamond,
      ],
    },
    {
      id: AnnounceId.QuarteKingHeart,
      excludes: [
        AnnounceId.QuarteQueenHeart,
        AnnounceId.QuarteJackHeart,
        AnnounceId.QuarteTenHeart,
        AnnounceId.TierceKingHeart,
        AnnounceId.TierceQueenHeart,
        AnnounceId.TierceJackHeart,
        AnnounceId.TierceTenHeart,
        AnnounceId.TierceNineHeart,
      ],
    },
    {
      id: AnnounceId.QuarteKingClub,
      excludes: [
        AnnounceId.QuarteQueenClub,
        AnnounceId.QuarteJackClub,
        AnnounceId.QuarteTenClub,
        AnnounceId.TierceKingClub,
        AnnounceId.TierceQueenClub,
        AnnounceId.TierceJackClub,
        AnnounceId.TierceTenClub,
        AnnounceId.TierceNineClub,
      ],
    },
    {
      id: AnnounceId.QuarteQueenSpade,
      excludes: [
        AnnounceId.QuarteJackSpade,
        AnnounceId.QuarteTenSpade,
        AnnounceId.TierceQueenSpade,
        AnnounceId.TierceJackSpade,
        AnnounceId.TierceTenSpade,
        AnnounceId.TierceNineSpade,
      ],
    },
    {
      id: AnnounceId.QuarteQueenDiamond,
      excludes: [
        AnnounceId.QuarteJackDiamond,
        AnnounceId.QuarteTenDiamond,
        AnnounceId.TierceQueenDiamond,
        AnnounceId.TierceJackDiamond,
        AnnounceId.TierceTenDiamond,
        AnnounceId.TierceNineDiamond,
      ],
    },
    {
      id: AnnounceId.QuarteQueenHeart,
      excludes: [
        AnnounceId.QuarteJackHeart,
        AnnounceId.QuarteTenHeart,
        AnnounceId.TierceQueenHeart,
        AnnounceId.TierceJackHeart,
        AnnounceId.TierceTenHeart,
        AnnounceId.TierceNineHeart,
      ],
    },
    {
      id: AnnounceId.QuarteQueenClub,
      excludes: [
        AnnounceId.QuarteJackClub,
        AnnounceId.QuarteTenClub,
        AnnounceId.TierceQueenClub,
        AnnounceId.TierceJackClub,
        AnnounceId.TierceTenClub,
        AnnounceId.TierceNineClub,
      ],
    },
    {
      id: AnnounceId.QuarteJackSpade,
      excludes: [
        AnnounceId.QuarteTenSpade,
        AnnounceId.TierceJackSpade,
        AnnounceId.TierceTenSpade,
        AnnounceId.TierceNineSpade,
      ],
    },
    {
      id: AnnounceId.QuarteJackDiamond,
      excludes: [
        AnnounceId.QuarteTenDiamond,
        AnnounceId.TierceJackDiamond,
        AnnounceId.TierceTenDiamond,
        AnnounceId.TierceNineDiamond,
      ],
    },
    {
      id: AnnounceId.QuarteJackHeart,
      excludes: [
        AnnounceId.QuarteTenHeart,
        AnnounceId.TierceJackHeart,
        AnnounceId.TierceTenHeart,
        AnnounceId.TierceNineHeart,
      ],
    },
    {
      id: AnnounceId.QuarteJackClub,
      excludes: [
        AnnounceId.QuarteTenClub,
        AnnounceId.TierceJackClub,
        AnnounceId.TierceTenClub,
        AnnounceId.TierceNineClub,
      ],
    },
    {
      id: AnnounceId.QuarteTenSpade,
      excludes: [
        AnnounceId.TierceTenSpade,
        AnnounceId.TierceNineSpade,
      ],
    },
    {
      id: AnnounceId.QuarteTenDiamond,
      excludes: [
        AnnounceId.TierceTenDiamond,
        AnnounceId.TierceNineDiamond,
      ],
    },
    {
      id: AnnounceId.QuarteTenHeart,
      excludes: [
        AnnounceId.TierceTenHeart,
        AnnounceId.TierceNineHeart,
      ],
    },
    {
      id: AnnounceId.QuarteTenClub,
      excludes: [
        AnnounceId.TierceTenClub,
        AnnounceId.TierceNineClub,
      ],
    },
  ];
  selfExcludingAnnouncesSortedByPriority.forEach(item => {
    if (announcesContainAnnounceId(bestAnnounces, item.id)) {
      bestAnnounces = bestAnnounces.filter(a => !item.excludes.includes(a.id));
    }
  });

  return bestAnnounces;
};
export const getAnnouncesForCards = (cards: Card[], trumpMode: TrumpMode): Announce[] => {
  const availableAnnounces = getAnnounces().reduce((acc, announce) => {
    if (announce.cards.every((announceCard) => cardsContainCard(cards, announceCard))) {
      return [...acc, announce];
    }

    return acc;
  }, [] as Announce[]);

  return filterSelfExcludingAnnounces(availableAnnounces);
};

export const getCards = (): Card[] => [
  {
    color: CardColor.Spade,
    name: CardName.Ace,
  },
  {
    color: CardColor.Spade,
    name: CardName.Seven,
  },
  {
    color: CardColor.Spade,
    name: CardName.Eight,
  },
  {
    color: CardColor.Spade,
    name: CardName.Nine,
  },
  {
    color: CardColor.Spade,
    name: CardName.Ten,
  },
  {
    color: CardColor.Spade,
    name: CardName.Jack,
  },
  {
    color: CardColor.Spade,
    name: CardName.Queen,
  },
  {
    color: CardColor.Spade,
    name: CardName.King,
  },
  {
    color: CardColor.Diamond,
    name: CardName.Ace,
  },
  {
    color: CardColor.Diamond,
    name: CardName.Seven,
  },
  {
    color: CardColor.Diamond,
    name: CardName.Eight,
  },
  {
    color: CardColor.Diamond,
    name: CardName.Nine,
  },
  {
    color: CardColor.Diamond,
    name: CardName.Ten,
  },
  {
    color: CardColor.Diamond,
    name: CardName.Jack,
  },
  {
    color: CardColor.Diamond,
    name: CardName.Queen,
  },
  {
    color: CardColor.Diamond,
    name: CardName.King,
  },
  {
    color: CardColor.Heart,
    name: CardName.Ace,
  },
  {
    color: CardColor.Heart,
    name: CardName.Seven,
  },
  {
    color: CardColor.Heart,
    name: CardName.Eight,
  },
  {
    color: CardColor.Heart,
    name: CardName.Nine,
  },
  {
    color: CardColor.Heart,
    name: CardName.Ten,
  },
  {
    color: CardColor.Heart,
    name: CardName.Jack,
  },
  {
    color: CardColor.Heart,
    name: CardName.Queen,
  },
  {
    color: CardColor.Heart,
    name: CardName.King,
  },
  {
    color: CardColor.Club,
    name: CardName.Ace,
  },
  {
    color: CardColor.Club,
    name: CardName.Seven,
  },
  {
    color: CardColor.Club,
    name: CardName.Eight,
  },
  {
    color: CardColor.Club,
    name: CardName.Nine,
  },
  {
    color: CardColor.Club,
    name: CardName.Ten,
  },
  {
    color: CardColor.Club,
    name: CardName.Jack,
  },
  {
    color: CardColor.Club,
    name: CardName.Queen,
  },
  {
    color: CardColor.Club,
    name: CardName.King,
  },
];
export const isCardBeatingTheOtherCards = (card: Card, otherCards: Card[], trumpMode: TrumpMode, firstCardColor: CardColor): boolean => {
  if (!otherCards.length) {
    return true;
  }

  const cardColorAssociatedToTrumpMode = getCardColorAssociatedToTrumpMode(trumpMode);

  if (card.color === cardColorAssociatedToTrumpMode) {
    switch (card.name) {
      case CardName.Ace:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || ![CardName.Nine, CardName.Jack].includes(name));
      case CardName.Seven:
        return otherCards.every(({color}) => color !== cardColorAssociatedToTrumpMode);
      case CardName.Eight:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || name === CardName.Seven);
      case CardName.Nine:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || name !== CardName.Jack);
      case CardName.Ten:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || ![CardName.Ace, CardName.Nine, CardName.Jack].includes(name));
      case CardName.Jack:
        return true;
      case CardName.Queen:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || [CardName.Seven, CardName.Eight].includes(name));
      case CardName.King:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || [CardName.Seven, CardName.Eight, CardName.Queen].includes(name));
    }
  }

  if (card.color !== firstCardColor) {
    return false;
  }

  switch (card.name) {
    case CardName.Ace:
      return otherCards.every(({ color }) => color !== cardColorAssociatedToTrumpMode);
    case CardName.Seven:
      return false;
    case CardName.Eight:
      return otherCards.every(({ color, name }) => color !== cardColorAssociatedToTrumpMode && name === CardName.Seven);
    case CardName.Nine:
      return otherCards.every(({ color, name }) => color !== cardColorAssociatedToTrumpMode && [CardName.Seven, CardName.Eight].includes(name));
    case CardName.Ten:
      return otherCards.every(({ color, name }) => color !== cardColorAssociatedToTrumpMode && name !== CardName.Ace);
    case CardName.Jack:
      return otherCards.every(({ color, name }) => color !== cardColorAssociatedToTrumpMode && [CardName.Seven, CardName.Eight, CardName.Nine].includes(name));
    case CardName.Queen:
      return otherCards.every(({ color, name }) => color !== cardColorAssociatedToTrumpMode && ![CardName.King, CardName.Ten, CardName.Ace].includes(name));
    case CardName.King:
      return otherCards.every(({ color, name }) => color !== cardColorAssociatedToTrumpMode && ![CardName.Ten, CardName.Ace].includes(name));
  }
};
export const isPlayableCard = (card: Card, playerCards: Card[], trumpMode: TrumpMode, playersCardsPlayedInCurrentTurn: GameState['playersCardsPlayedInCurrentTurn'], firstPlayerInCurrentTurn: PlayerID, playerPartner: PlayerID): boolean => {
  // if a card has already been played
  if (playersCardsPlayedInCurrentTurn[firstPlayerInCurrentTurn]) {
    const firstCardColor = playersCardsPlayedInCurrentTurn[firstPlayerInCurrentTurn]!.color;

    // if player has a card with same color than first card played
    if (
      card.color !== firstCardColor
      && playerCards.some(c => c.color === firstCardColor)
    ) {
      // must play a card of the same color
      return false;
    }

    const isSingleColorTrumpMode = [TrumpMode.TrumpSpade, TrumpMode.TrumpDiamond, TrumpMode.TrumpHeart, TrumpMode.TrumpClub].includes(trumpMode);
    const firstCardColorIsAssociatedToTrumpMode = firstCardColor === getCardColorAssociatedToTrumpMode(trumpMode);
    const otherCards = Object.values(playersCardsPlayedInCurrentTurn).filter(c => c !== undefined) as Card[];

    // if single color trump mode
    // and player has a more powerful card
    // and player is trying to play a less powerful card
    if (
      isSingleColorTrumpMode
      && playerCards.some(c => isCardBeatingTheOtherCards(c, otherCards, trumpMode, firstCardColor))
      && !isCardBeatingTheOtherCards(card, otherCards, trumpMode, firstCardColor)
    ) {
      // if first card played is trump
      if (firstCardColorIsAssociatedToTrumpMode) {
        // must play a more powerful trump card
        return false;
      }

      const playerPartnerCard = playersCardsPlayedInCurrentTurn[playerPartner];
      const currentWinningCard = getWinningCard(otherCards, trumpMode, firstCardColor);
      const currentWinningCardIsFromPartner = Boolean(playerPartnerCard && isSameCard(playerPartnerCard, currentWinningCard));

      // if current winning card is not from partner
      // and player does not have a card with same color than first card
      if (
        !currentWinningCardIsFromPartner
        && !playerCards.some(c => c.color === firstCardColor)
      ) {
        // must play a trump card
        return false;
      }
    }
  }

  return true;
};

export const getWinningCard = (cards: Card[], trumpMode: TrumpMode, firstCardColor: CardColor): Card => {
  if (!cards.length) {
    throw new Error();
  }

  return cards.reduce((currentWinningCard, card) => {
    if (!currentWinningCard) {
      return card;
    }

    if (isCardBeatingTheOtherCards(card, cards.filter(c => !isSameCard(c, card)), trumpMode, firstCardColor)) {
      return card;
    }

    return currentWinningCard;
  });
};
const getCardPoints = (card: Card, trumpMode: TrumpMode): number => {
  switch (card.name) {
    case CardName.Ace:
      return trumpMode === TrumpMode.NoTrump ? 19 : 11;
    case CardName.Nine:
      return trumpMode === getTrumpModeAssociatedToCardColor(card.color) ? 14 : 0;
    case CardName.Ten:
      return 10;
    case CardName.Jack:
      return trumpMode === getTrumpModeAssociatedToCardColor(card.color) ? 20 : 2;
    case CardName.Queen:
      return 3;
    case CardName.King:
      return 4;
    default:
      return 0;
  }
};

export const getWinner = (playersCardsPlayedInCurrentTurn: Record<PlayerID, Card | undefined>, trumpMode: TrumpMode, firstCardColor: CardColor): PlayerID => {
  const winningCard = getWinningCard(
    Object.values(playersCardsPlayedInCurrentTurn).filter(c => c !== undefined) as Card[],
    trumpMode,
    firstCardColor,
  );

  for (const playerID of validPlayerIDs) {
    if (isSameCard(winningCard, playersCardsPlayedInCurrentTurn[playerID])) {
      return playerID;
    }
  }

  // @TODO to remove after debugging
  console.log(winningCard, playersCardsPlayedInCurrentTurn);
  throw new Error();
};
export const getGameWinnerTeam = (teamsPoints: Record<TeamID, number>, howManyPointsATeamMustReachToEndTheGame: number): TeamID | null | undefined => {
  if (Object.values(teamsPoints).every(points => points < howManyPointsATeamMustReachToEndTheGame)) {
    return;
  }

  if (teamsPoints[TeamID.NorthSouth] === teamsPoints[TeamID.EastWest]) {
    return null;
  }

  if (teamsPoints[TeamID.NorthSouth] >= howManyPointsATeamMustReachToEndTheGame) {
    return TeamID.NorthSouth;
  }

  return TeamID.EastWest;
};

export const getTurnOrder = (dealer: PlayerID): PlayerID[] => {
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

const getDefaultPlayersCards = () => ({
  [PlayerID.North]: [],
  [PlayerID.East]: [],
  [PlayerID.South]: [],
  [PlayerID.West]: [],
});
const getDefaultPlayersSaidAnnounces = () => ({
  [PlayerID.North]: [],
  [PlayerID.East]: [],
  [PlayerID.South]: [],
  [PlayerID.West]: [],
});
const getDefaultWonTeamsCards = () => ({
  [TeamID.NorthSouth]: [],
  [TeamID.EastWest]: [],
});
const getDefaultPlayersCardsPlayedInCurrentTurn = () => ({
  [PlayerID.North]: undefined,
  [PlayerID.East]: undefined,
  [PlayerID.South]: undefined,
  [PlayerID.West]: undefined,
});
const getDefaultPlayersSaid = () => ({
  [PlayerID.North]: undefined,
  [PlayerID.East]: undefined,
  [PlayerID.South]: undefined,
  [PlayerID.West]: undefined,
});

export const getSetupGameState = (ctx: Context<PlayerID, PhaseID>, setupData: object): GameState => {
  const dealer = PlayerID.North;
  const availableCards = getCards();
  const howManyCards = availableCards.length;
  const howManyCardsToDealToEachPlayerBeforeTalking = 6;
  const howManyCardsToDealToEachPlayerAfterTalking = Math.floor(howManyCards / howManyPlayers) - howManyCardsToDealToEachPlayerBeforeTalking;

  return {
    howManyPlayers,
    howManyCards,
    availableCards,
    playersCards: getDefaultPlayersCards(),
    wonTeamsCards: getDefaultWonTeamsCards(),
    teamsPoints: {
      [TeamID.NorthSouth]: 0,
      [TeamID.EastWest]: 0,
    },
    dealer,
    nextDealer: dealer,
    turnOrder: getTurnOrder(dealer),
    firstPlayerInCurrentTurn: dealer,
    trumpMode: TrumpMode.NoTrump,
    attackingTeam: TeamID.NorthSouth,
    defensingTeam: TeamID.EastWest,
    expectedPoints: 0,
    howManyCardsToDealToEachPlayerBeforeTalking,
    howManyCardsToDealToEachPlayerAfterTalking,
    howManyPointsATeamMustReachToEndTheGame: 2000,
    playersSaid: getDefaultPlayersSaid(),
    numberOfSuccessiveSkipSaid: 0,
    playersSaidAnnounces: getDefaultPlayersSaidAnnounces(),
    playersCardsPlayedInCurrentTurn: getDefaultPlayersCardsPlayedInCurrentTurn(),
    playersCardsPlayedInPreviousTurn: undefined,
  };
};
export const buildGame = () => Game<GameState, GameStatePlayerView, Moves, PlayerID, PhaseID>({
  name: 'coinche',
  minPlayers: howManyPlayers,
  maxPlayers: howManyPlayers,

  setup: getSetupGameState,

  moves: {
    saySkip,
    sayTake,
    sayAnnounce,
    playCard,
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
          console.log('phase Deal');

          const newDealer = G.nextDealer;
          const newNextDealer = getTurnOrder(newDealer)[1];

          G.expectedPoints = 0;
          G.trumpMode = TrumpMode.NoTrump;
          G.playersCards = getDefaultPlayersCards();
          G.playersSaid = getDefaultPlayersSaid();
          G.numberOfSuccessiveSkipSaid = 0;
          G.dealer = newDealer;
          G.nextDealer = newNextDealer;
          G.firstPlayerInCurrentTurn = newNextDealer;
          G.playersCardsPlayedInPreviousTurn = undefined;
          G.availableCards = ctx.random.Shuffle(getCards());
          G.turnOrder.forEach(playerID => {
            for (let i = 0; i < G.howManyCardsToDealToEachPlayerBeforeTalking; i++) {
              const card = G.availableCards.pop();
              G.playersCards[playerID].push(card!);
            }
          });

          ctx.events.endPhase({ next: PhaseID.Talk });
        },
        allowedMoves: [],
      },
      [PhaseID.Talk]: {
        onPhaseBegin: (G, ctx) => {
          console.log('phase Talk');

          ctx.events.endTurn({ next: G.nextDealer });
        },
        // @TODO sayCoinche and saySurcoinche
        allowedMoves: ['saySkip', 'sayTake'] as (keyof Moves)[],
        endPhaseIf: (G) => {
          if (G.numberOfSuccessiveSkipSaid >= G.howManyPlayers) {
            return { next: PhaseID.Deal };
          }

          if (G.expectedPoints && (
            // 3 successive skips
            G.numberOfSuccessiveSkipSaid >= (G.howManyPlayers - 1)
            // maximum validExpectedPoints
            || G.expectedPoints === validExpectedPoints[validExpectedPoints.length - 1]
          )) {
            G.turnOrder.forEach(playerID => {
              for (let i = 0; i < G.howManyCardsToDealToEachPlayerAfterTalking; i++) {
                const card = G.availableCards.pop();
                G.playersCards[playerID].push(card!);
              }
            });

            return { next: PhaseID.PlayCards };
          }

          return false;
        },
      },
      [PhaseID.PlayCards]: {
        onPhaseBegin: (G, ctx) => {
          console.log('phase PlayCards');

          ctx.events.endTurn({ next: G.firstPlayerInCurrentTurn });
        },
        onTurnBegin: (G, ctx) => {
          // set players cards playability
          const player = ctx.currentPlayer;
          const playerPartner = getPlayerPartner(player);
          const setCardsPlayability = (cards: Card[], playerIsCurrentPlayer: boolean): Card[] => cards.map(card => ({
            ...card,
            isPlayable: !playerIsCurrentPlayer
              ? false
              : isPlayableCard(
                card,
                G.playersCards[player],
                G.trumpMode,
                G.playersCardsPlayedInCurrentTurn,
                G.firstPlayerInCurrentTurn,
                playerPartner,
              ),
          }));
          return {
            ...G,
            playersCards: {
              [PlayerID.North]: setCardsPlayability(G.playersCards[PlayerID.North], PlayerID.North === player),
              [PlayerID.East]: setCardsPlayability(G.playersCards[PlayerID.East], PlayerID.East === player),
              [PlayerID.South]: setCardsPlayability(G.playersCards[PlayerID.South], PlayerID.South === player),
              [PlayerID.West]: setCardsPlayability(G.playersCards[PlayerID.West], PlayerID.West === player),
            },
          };
        },
        // @TODO sayAnnonce
        allowedMoves: ['playCard'],
        endPhaseIf: (G) => {
          if (Object.values(G.playersCardsPlayedInCurrentTurn).every( card => card !== undefined)) {
            return { next: PhaseID.CountPoints };
          }

          return false;
        },
      },
      [PhaseID.CountPoints]: {
        allowedMoves: [],
        onPhaseBegin: (G, ctx) => {
          console.log('phase CountPoints');

          const winner = getWinner(G.playersCardsPlayedInCurrentTurn, G.trumpMode, G.playersCardsPlayedInCurrentTurn[G.firstPlayerInCurrentTurn]!.color);
          const winnerTeam = getPlayerTeam(winner);

          // fill cards played in previous turn
          G.playersCardsPlayedInPreviousTurn = {...G.playersCardsPlayedInCurrentTurn} as Record<PlayerID, Card>; // cast because G.playersCardsPlayedInCurrentTurn can't contain "undefined" values at this point

          // move played cards to winner team cards
          (Object.values(G.playersCardsPlayedInCurrentTurn).filter(c => c !== undefined) as Card[]).forEach(card => G.wonTeamsCards[winnerTeam].push(card));
          G.playersCardsPlayedInCurrentTurn = getDefaultPlayersCardsPlayedInCurrentTurn();

          // winner becomes next first player
          G.firstPlayerInCurrentTurn = winner;

          // go to PlayCards phase if not all cards have been played
          if (Object.values(G.wonTeamsCards).reduce((acc, cards) => acc.concat(cards), []).length < G.howManyCards) {
            ctx.events.endPhase({ next: PhaseID.PlayCards });
            return;
          }

          // winning team of the last turn get extra points
          let defensingTeamPoints = G.wonTeamsCards[G.defensingTeam].reduce((acc, card) => acc + getCardPoints(card, G.trumpMode), 0);
          let attackingTeamPoints = G.wonTeamsCards[G.attackingTeam].reduce((acc, card) => acc + getCardPoints(card, G.trumpMode), 0);
          if (winnerTeam === G.attackingTeam) {
            attackingTeamPoints += (!G.wonTeamsCards[G.defensingTeam].length) ? 100 : 10;
          } else {
            defensingTeamPoints += (!G.wonTeamsCards[G.attackingTeam].length) ? 100 : 10;
          }

          // check which team won the round
          // @TODO add said annonce points
          if (attackingTeamPoints >= G.expectedPoints && attackingTeamPoints >= defensingTeamPoints) {
            G.teamsPoints[G.attackingTeam] += attackingTeamPoints;
            G.teamsPoints[G.defensingTeam] += defensingTeamPoints;
          } else {
            // @TODO add attacking team said annonces to defensing team points
            G.teamsPoints[G.defensingTeam] += defensingTeamPoints;
          }

          // go to Deal phase if the end of the game has not been reached
          const gameWinnerTeam = getGameWinnerTeam(G.teamsPoints, G.howManyPointsATeamMustReachToEndTheGame);
          if (gameWinnerTeam === undefined) {
            ctx.events.endPhase({ next: PhaseID.Deal });
            return;
          }

          // @TODO congrats winning team
          console.log(`The winner is... ${gameWinnerTeam || 'both'}!`, G, ctx);
          ctx.events.endGame();
        },
      },
    },
  },

  playerView: (
    {
      playersCards,
      availableCards,
      ...GWithoutSecretData
    },
    ctx,
    playerID,
  ): GameStatePlayerView => {
    if (!validPlayerIDs.includes(playerID)) {
      throw new Error(`Invalid player ${playerID}`);
    }

    return {
      ...GWithoutSecretData,
      availableCards: new Array(availableCards.length).fill(secretCard),
      playersCards: {
        [PlayerID.North]: PlayerID.North === playerID ? playersCards[playerID] : new Array(playersCards[PlayerID.North].length).fill(secretCard),
        [PlayerID.East]: PlayerID.East === playerID ? playersCards[playerID] : new Array(playersCards[PlayerID.East].length).fill(secretCard),
        [PlayerID.South]: PlayerID.South === playerID ? playersCards[playerID] : new Array(playersCards[PlayerID.South].length).fill(secretCard),
        [PlayerID.West]: PlayerID.West === playerID ? playersCards[playerID] : new Array(playersCards[PlayerID.West].length).fill(secretCard),
      },
      playerCards: playersCards[playerID] as Card[],
    };
  },
});
