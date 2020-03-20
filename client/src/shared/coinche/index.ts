import {
  Context,
  GameConfig,
  TurnConfig,
} from 'boardgame.io/core';
import playCard from './move/playCard';
import sayAnnounce from './move/sayAnnounce';
import saySkip from './move/saySkip';
import sayTake from './move/sayTake';

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

export enum AnnounceGroup {
  Square = 'Square',
  Tierce = 'Tierce',
  Quarte = 'Quarte',
  Quinte = 'Quinte',
}

export interface Announce {
  id: AnnounceId;
  cards: Card[];
}
export interface PlayerAnnounce {
  announce: Announce;
  announceGroup: AnnounceGroup;
  isSaid: boolean;
  isCardsDisplayable: boolean;
}
export interface SecretPlayerAnnounce {
  announce: Announce | undefined;
  announceGroup: AnnounceGroup | undefined;
  isSaid: boolean;
  isCardsDisplayable: boolean;
}
const transformPlayerAnnounceToSecretPlayerAnnounce = (playerAnnounce: PlayerAnnounce): SecretPlayerAnnounce => ({
  announce: playerAnnounce.isCardsDisplayable ? playerAnnounce.announce : undefined,
  announceGroup: playerAnnounce.isSaid ? playerAnnounce.announceGroup : undefined,
  isSaid: playerAnnounce.isSaid,
  isCardsDisplayable: playerAnnounce.isCardsDisplayable,
});

export interface GameState {
  // internal state
  __forcedNextPhase?: PhaseID;

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
  dealer: PlayerID;
  nextDealer: PlayerID;
  attackingTeam: TeamID;
  defensingTeam: TeamID;
  expectedPoints: number;
  trumpMode: TrumpMode;
  playersSaid: Record<PlayerID, 'skip' | { expectedPoints: number; trumpMode: TrumpMode } | undefined>;
  numberOfSuccessiveSkipSaid: number;
  playersAnnounces: Record<PlayerID, PlayerAnnounce[]>;

  // turn state
  firstPlayerInCurrentTurn: PlayerID;
  playersCardPlayedInCurrentTurn: Record<PlayerID, Card | undefined>;
  playersCardPlayedInPreviousTurn: Record<PlayerID, Card> | undefined;
}
export type GameStatePlayerView = Omit<GameState, 'availableCards' | 'playersCards' | 'playersAnnounces'> & {
  availableCards: SecretCard[];
  playersCards: Record<PlayerID, Card[] | SecretCard[]>;
  playerCards: Card[]; // Contains G.playersCards[myPlayerID]
  playersAnnounces: Record<PlayerID, PlayerAnnounce[] | SecretPlayerAnnounce[]>;
  playerAnnounces: PlayerAnnounce[];  // Contains G.playersAnnounces[myPlayerID]
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
export const getAnnounceGroupByAnnounceId = (announceId: AnnounceId): AnnounceGroup => {
  switch (announceId) {
    case AnnounceId.SquareAce:
    case AnnounceId.SquareNine:
    case AnnounceId.SquareTen:
    case AnnounceId.SquareJack:
    case AnnounceId.SquareQueen:
    case AnnounceId.SquareKing:
      return AnnounceGroup.Square;
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
      return AnnounceGroup.Tierce;
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
      return AnnounceGroup.Quarte;
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
      return AnnounceGroup.Quinte;
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
export const getAnnouncesForCards = (cards: Card[], _: TrumpMode): Announce[] => {
  const availableAnnounces = getAnnounces().reduce((acc, announce) => {
    if (announce.cards.every(announceCard => cardsContainCard(cards, announceCard))) {
      return [...acc, announce];
    }

    return acc;
  }, [] as Announce[]);

  return filterSelfExcludingAnnounces(availableAnnounces);
};
export const isAnnounceIdBeatingTheOtherAnnounceIds = (announceId: AnnounceId, otherAnnounceIds: AnnounceId[], trumpMode: TrumpMode): boolean => {
  if (!otherAnnounceIds.length) {
    return true;
  }

  switch (getAnnounceGroupByAnnounceId(announceId)) {
    case AnnounceGroup.Square:
      // handle other announces with lower announce groups
      if (otherAnnounceIds.every(a => getAnnounceGroupByAnnounceId(a) !== AnnounceGroup.Square)) {
        return true;
      }
      // handle same announce group
      switch (announceId) {
        case AnnounceId.SquareAce:
          if (trumpMode === TrumpMode.NoTrump) {
            return true;
          }
          return otherAnnounceIds.every(a => ![AnnounceId.SquareJack, AnnounceId.SquareNine].includes(a));
        case AnnounceId.SquareTen:
          if (trumpMode === TrumpMode.NoTrump) {
            return otherAnnounceIds.every(a => a !== AnnounceId.SquareAce);
          }
          return otherAnnounceIds.every(a => ![AnnounceId.SquareJack, AnnounceId.SquareNine, AnnounceId.SquareAce].includes(a));
        case AnnounceId.SquareKing:
          if (trumpMode === TrumpMode.NoTrump) {
            return otherAnnounceIds.every(a => ![AnnounceId.SquareAce, AnnounceId.SquareTen].includes(a));
          }
          return otherAnnounceIds.every(a => ![AnnounceId.SquareJack, AnnounceId.SquareNine, AnnounceId.SquareAce, AnnounceId.SquareTen].includes(a));
        case AnnounceId.SquareQueen:
          if (trumpMode === TrumpMode.NoTrump) {
            return otherAnnounceIds.every(a => ![AnnounceId.SquareAce, AnnounceId.SquareTen, AnnounceId.SquareKing].includes(a));
          }
          return otherAnnounceIds.every(a => ![AnnounceId.SquareJack, AnnounceId.SquareNine, AnnounceId.SquareAce, AnnounceId.SquareTen, AnnounceId.SquareKing].includes(a));
        case AnnounceId.SquareJack:
          if (trumpMode === TrumpMode.NoTrump) {
            return otherAnnounceIds.every(a => ![AnnounceId.SquareAce, AnnounceId.SquareTen, AnnounceId.SquareKing, AnnounceId.SquareQueen].includes(a));
          }
          return true;
        case AnnounceId.SquareNine:
          if (trumpMode === TrumpMode.NoTrump) {
            return otherAnnounceIds.every(a => ![AnnounceId.SquareAce, AnnounceId.SquareTen, AnnounceId.SquareKing, AnnounceId.SquareQueen, AnnounceId.SquareJack].includes(a));
          }
          return otherAnnounceIds.every(a => a !== AnnounceId.SquareJack);
      }
      // throw if a case has been forgotten
      throw new Error('a case has been forgotten');
    case AnnounceGroup.Quinte:
      // handle other announces with higher announce groups
      if (otherAnnounceIds.some(a => getAnnounceGroupByAnnounceId(a) === AnnounceGroup.Square)) {
        return false;
      }
      // handle other announces with lower announce groups
      if (otherAnnounceIds.every(a => getAnnounceGroupByAnnounceId(a) !== AnnounceGroup.Quinte)) {
        return true;
      }
      // handle same announce group
      switch (announceId) {
        case AnnounceId.QuinteAceSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return true;
          }
          return otherAnnounceIds.every(a => ![AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart].includes(a));
        case AnnounceId.QuinteAceDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return true;
          }
          return otherAnnounceIds.every(a => ![AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart].includes(a));
        case AnnounceId.QuinteAceClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return true;
          }
          return otherAnnounceIds.every(a => ![AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceHeart].includes(a));
        case AnnounceId.QuinteAceHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return true;
          }
          return otherAnnounceIds.every(a => ![AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub].includes(a));
        case AnnounceId.QuinteKingSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
          ].includes(a));
        case AnnounceId.QuinteKingDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
          ].includes(a));
        case AnnounceId.QuinteKingClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingHeart,
          ].includes(a));
        case AnnounceId.QuinteKingHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub,
          ].includes(a));
        case AnnounceId.QuinteQueenSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
              AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
            AnnounceId.QuinteQueenDiamond, AnnounceId.QuinteQueenClub, AnnounceId.QuinteQueenHeart,
          ].includes(a));
        case AnnounceId.QuinteQueenDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
              AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
            AnnounceId.QuinteQueenSpade, AnnounceId.QuinteQueenClub, AnnounceId.QuinteQueenHeart,
          ].includes(a));
        case AnnounceId.QuinteQueenClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
              AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
            AnnounceId.QuinteQueenSpade, AnnounceId.QuinteQueenDiamond, AnnounceId.QuinteQueenHeart,
          ].includes(a));
        case AnnounceId.QuinteQueenHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
              AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
            AnnounceId.QuinteQueenSpade, AnnounceId.QuinteQueenDiamond, AnnounceId.QuinteQueenClub,
          ].includes(a));
        case AnnounceId.QuinteJackSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
              AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
              AnnounceId.QuinteQueenSpade, AnnounceId.QuinteQueenDiamond, AnnounceId.QuinteQueenClub, AnnounceId.QuinteQueenHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
            AnnounceId.QuinteQueenSpade, AnnounceId.QuinteQueenDiamond, AnnounceId.QuinteQueenClub, AnnounceId.QuinteQueenHeart,
            AnnounceId.QuinteJackDiamond, AnnounceId.QuinteJackClub, AnnounceId.QuinteJackHeart,
          ].includes(a));
        case AnnounceId.QuinteJackDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
              AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
              AnnounceId.QuinteQueenSpade, AnnounceId.QuinteQueenDiamond, AnnounceId.QuinteQueenClub, AnnounceId.QuinteQueenHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
            AnnounceId.QuinteQueenSpade, AnnounceId.QuinteQueenDiamond, AnnounceId.QuinteQueenClub, AnnounceId.QuinteQueenHeart,
            AnnounceId.QuinteJackSpade, AnnounceId.QuinteJackClub, AnnounceId.QuinteJackHeart,
          ].includes(a));
        case AnnounceId.QuinteJackClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
              AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
              AnnounceId.QuinteQueenSpade, AnnounceId.QuinteQueenDiamond, AnnounceId.QuinteQueenClub, AnnounceId.QuinteQueenHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
            AnnounceId.QuinteQueenSpade, AnnounceId.QuinteQueenDiamond, AnnounceId.QuinteQueenClub, AnnounceId.QuinteQueenHeart,
            AnnounceId.QuinteJackSpade, AnnounceId.QuinteJackDiamond, AnnounceId.QuinteJackHeart,
          ].includes(a));
        case AnnounceId.QuinteJackHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
              AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
              AnnounceId.QuinteQueenSpade, AnnounceId.QuinteQueenDiamond, AnnounceId.QuinteQueenClub, AnnounceId.QuinteQueenHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuinteAceSpade, AnnounceId.QuinteAceDiamond, AnnounceId.QuinteAceClub, AnnounceId.QuinteAceHeart,
            AnnounceId.QuinteKingSpade, AnnounceId.QuinteKingDiamond, AnnounceId.QuinteKingClub, AnnounceId.QuinteKingHeart,
            AnnounceId.QuinteQueenSpade, AnnounceId.QuinteQueenDiamond, AnnounceId.QuinteQueenClub, AnnounceId.QuinteQueenHeart,
            AnnounceId.QuinteJackSpade, AnnounceId.QuinteJackDiamond, AnnounceId.QuinteJackClub,
          ].includes(a));
      }
      // throw if a case has been forgotten
      throw new Error('a case has been forgotten');
    case AnnounceGroup.Quarte:
      // handle other announces with higher announce groups
      if (otherAnnounceIds.some(a => [AnnounceGroup.Square, AnnounceGroup.Quinte].includes(getAnnounceGroupByAnnounceId(a)))) {
        return false;
      }
      // handle other announces with lower announce groups
      if (otherAnnounceIds.every(a => getAnnounceGroupByAnnounceId(a) !== AnnounceGroup.Quarte)) {
        return true;
      }
      // handle same announce group
      switch (announceId) {
        case AnnounceId.QuarteAceSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return true;
          }
          return otherAnnounceIds.every(a => ![AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart].includes(a));
        case AnnounceId.QuarteAceDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return true;
          }
          return otherAnnounceIds.every(a => ![AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart].includes(a));
        case AnnounceId.QuarteAceClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return true;
          }
          return otherAnnounceIds.every(a => ![AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceHeart].includes(a));
        case AnnounceId.QuarteAceHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return true;
          }
          return otherAnnounceIds.every(a => ![AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub].includes(a));
        case AnnounceId.QuarteKingSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
          ].includes(a));
        case AnnounceId.QuarteKingDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
          ].includes(a));
        case AnnounceId.QuarteKingClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingHeart,
          ].includes(a));
        case AnnounceId.QuarteKingHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub,
          ].includes(a));
        case AnnounceId.QuarteQueenSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
              AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
          ].includes(a));
        case AnnounceId.QuarteQueenDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
              AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
          ].includes(a));
        case AnnounceId.QuarteQueenClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
              AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenHeart,
          ].includes(a));
        case AnnounceId.QuarteQueenHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
              AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub,
          ].includes(a));
        case AnnounceId.QuarteJackSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
              AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
              AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
            AnnounceId.QuarteJackDiamond, AnnounceId.QuarteJackClub, AnnounceId.QuarteJackHeart,
          ].includes(a));
        case AnnounceId.QuarteJackDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
              AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
              AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
            AnnounceId.QuarteJackSpade, AnnounceId.QuarteJackClub, AnnounceId.QuarteJackHeart,
          ].includes(a));
        case AnnounceId.QuarteJackClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
              AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
              AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
            AnnounceId.QuarteJackSpade, AnnounceId.QuarteJackDiamond, AnnounceId.QuarteJackHeart,
          ].includes(a));
        case AnnounceId.QuarteJackHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
              AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
              AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
            AnnounceId.QuarteJackSpade, AnnounceId.QuarteJackDiamond, AnnounceId.QuarteJackClub,
          ].includes(a));
        case AnnounceId.QuarteTenSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
              AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
              AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
              AnnounceId.QuarteJackSpade, AnnounceId.QuarteJackDiamond, AnnounceId.QuarteJackClub, AnnounceId.QuarteJackHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
            AnnounceId.QuarteJackSpade, AnnounceId.QuarteJackDiamond, AnnounceId.QuarteJackClub, AnnounceId.QuarteJackHeart,
            AnnounceId.QuarteTenDiamond, AnnounceId.QuarteTenClub, AnnounceId.QuarteTenHeart,
          ].includes(a));
        case AnnounceId.QuarteTenDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
              AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
              AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
              AnnounceId.QuarteJackSpade, AnnounceId.QuarteJackDiamond, AnnounceId.QuarteJackClub, AnnounceId.QuarteJackHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
            AnnounceId.QuarteJackSpade, AnnounceId.QuarteJackDiamond, AnnounceId.QuarteJackClub, AnnounceId.QuarteJackHeart,
            AnnounceId.QuarteTenSpade, AnnounceId.QuarteTenClub, AnnounceId.QuarteTenHeart,
          ].includes(a));
        case AnnounceId.QuarteTenClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
              AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
              AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
              AnnounceId.QuarteJackSpade, AnnounceId.QuarteJackDiamond, AnnounceId.QuarteJackClub, AnnounceId.QuarteJackHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
            AnnounceId.QuarteJackSpade, AnnounceId.QuarteJackDiamond, AnnounceId.QuarteJackClub, AnnounceId.QuarteJackHeart,
            AnnounceId.QuarteTenSpade, AnnounceId.QuarteTenDiamond, AnnounceId.QuarteTenHeart,
          ].includes(a));
        case AnnounceId.QuarteTenHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
              AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
              AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
              AnnounceId.QuarteJackSpade, AnnounceId.QuarteJackDiamond, AnnounceId.QuarteJackClub, AnnounceId.QuarteJackHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.QuarteAceSpade, AnnounceId.QuarteAceDiamond, AnnounceId.QuarteAceClub, AnnounceId.QuarteAceHeart,
            AnnounceId.QuarteKingSpade, AnnounceId.QuarteKingDiamond, AnnounceId.QuarteKingClub, AnnounceId.QuarteKingHeart,
            AnnounceId.QuarteQueenSpade, AnnounceId.QuarteQueenDiamond, AnnounceId.QuarteQueenClub, AnnounceId.QuarteQueenHeart,
            AnnounceId.QuarteJackSpade, AnnounceId.QuarteJackDiamond, AnnounceId.QuarteJackClub, AnnounceId.QuarteJackHeart,
            AnnounceId.QuarteTenSpade, AnnounceId.QuarteTenDiamond, AnnounceId.QuarteTenClub,
          ].includes(a));
      }
      // throw if a case has been forgotten
      throw new Error('a case has been forgotten');
    case AnnounceGroup.Tierce:
      // handle other announces with higher announce groups
      if (otherAnnounceIds.some(a => [AnnounceGroup.Square, AnnounceGroup.Quinte, AnnounceGroup.Quarte].includes(getAnnounceGroupByAnnounceId(a)))) {
        return false;
      }
      // handle same announce group
      switch (announceId) {
        case AnnounceId.TierceAceSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return true;
          }
          return otherAnnounceIds.every(a => ![AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart].includes(a));
        case AnnounceId.TierceAceDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return true;
          }
          return otherAnnounceIds.every(a => ![AnnounceId.TierceAceSpade, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart].includes(a));
        case AnnounceId.TierceAceClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return true;
          }
          return otherAnnounceIds.every(a => ![AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceHeart].includes(a));
        case AnnounceId.TierceAceHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return true;
          }
          return otherAnnounceIds.every(a => ![AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub].includes(a));
        case AnnounceId.TierceKingSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
          ].includes(a));
        case AnnounceId.TierceKingDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
          ].includes(a));
        case AnnounceId.TierceKingClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingHeart,
          ].includes(a));
        case AnnounceId.TierceKingHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub,
          ].includes(a));
        case AnnounceId.TierceQueenSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
          ].includes(a));
        case AnnounceId.TierceQueenDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
          ].includes(a));
        case AnnounceId.TierceQueenClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenHeart,
          ].includes(a));
        case AnnounceId.TierceQueenHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub,
          ].includes(a));
        case AnnounceId.TierceJackSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
              AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
          ].includes(a));
        case AnnounceId.TierceJackDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
              AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            AnnounceId.TierceJackSpade, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
          ].includes(a));
        case AnnounceId.TierceJackClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
              AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackHeart,
          ].includes(a));
        case AnnounceId.TierceJackHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
              AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub,
          ].includes(a));
        case AnnounceId.TierceTenSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
              AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
              AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
            AnnounceId.TierceTenDiamond, AnnounceId.TierceTenClub, AnnounceId.TierceTenHeart,
          ].includes(a));
        case AnnounceId.TierceTenDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
              AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
              AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
            AnnounceId.TierceTenSpade, AnnounceId.TierceTenClub, AnnounceId.TierceTenHeart,
          ].includes(a));
        case AnnounceId.TierceTenClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
              AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
              AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
            AnnounceId.TierceTenSpade, AnnounceId.TierceTenDiamond, AnnounceId.TierceTenHeart,
          ].includes(a));
        case AnnounceId.TierceTenHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
              AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
              AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
            AnnounceId.TierceTenSpade, AnnounceId.TierceTenDiamond, AnnounceId.TierceTenClub,
          ].includes(a));
        case AnnounceId.TierceNineSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
              AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
              AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
              AnnounceId.TierceTenSpade, AnnounceId.TierceTenDiamond, AnnounceId.TierceTenClub, AnnounceId.TierceTenHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
            AnnounceId.TierceTenSpade, AnnounceId.TierceTenDiamond, AnnounceId.TierceTenClub, AnnounceId.TierceTenHeart,
            AnnounceId.TierceNineDiamond, AnnounceId.TierceNineClub, AnnounceId.TierceNineHeart,
          ].includes(a));
        case AnnounceId.TierceNineDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
              AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
              AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
            AnnounceId.TierceTenSpade, AnnounceId.TierceTenDiamond, AnnounceId.TierceTenClub, AnnounceId.TierceTenHeart,
            AnnounceId.TierceNineSpade, AnnounceId.TierceNineClub, AnnounceId.TierceNineHeart,
          ].includes(a));
        case AnnounceId.TierceNineClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
              AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
              AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
              AnnounceId.TierceTenSpade, AnnounceId.TierceTenDiamond, AnnounceId.TierceTenClub, AnnounceId.TierceTenHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
            AnnounceId.TierceTenSpade, AnnounceId.TierceTenDiamond, AnnounceId.TierceTenClub, AnnounceId.TierceTenHeart,
            AnnounceId.TierceNineSpade, AnnounceId.TierceNineDiamond, AnnounceId.TierceNineHeart,
          ].includes(a));
        case AnnounceId.TierceNineHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIds.every(a => ![
              AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
              AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
              AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
              AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
              AnnounceId.TierceTenSpade, AnnounceId.TierceTenDiamond, AnnounceId.TierceTenClub, AnnounceId.TierceTenHeart,
            ].includes(a));
          }
          return otherAnnounceIds.every(a => ![
            AnnounceId.TierceAceSpade, AnnounceId.TierceAceDiamond, AnnounceId.TierceAceClub, AnnounceId.TierceAceHeart,
            AnnounceId.TierceKingSpade, AnnounceId.TierceKingDiamond, AnnounceId.TierceKingClub, AnnounceId.TierceKingHeart,
            AnnounceId.TierceQueenSpade, AnnounceId.TierceQueenDiamond, AnnounceId.TierceQueenClub, AnnounceId.TierceQueenHeart,
            AnnounceId.TierceJackSpade, AnnounceId.TierceJackDiamond, AnnounceId.TierceJackClub, AnnounceId.TierceJackHeart,
            AnnounceId.TierceTenSpade, AnnounceId.TierceTenDiamond, AnnounceId.TierceTenClub, AnnounceId.TierceTenHeart,
            AnnounceId.TierceNineSpade, AnnounceId.TierceNineDiamond, AnnounceId.TierceNineClub,
          ].includes(a));
      }
      // throw if a case has been forgotten
      throw new Error('a case has been forgotten');
  }
};
export const getWinningAnnounceId = (announceIds: AnnounceId[], trumpMode: TrumpMode): AnnounceId => {
  if (!announceIds.length) {
    throw new Error();
  }
  if (announceIds.length === 1) {
    return announceIds[0];
  }

  return announceIds.reduce((currentWinningAnnounceId, announceId) => {
    if (!currentWinningAnnounceId) {
      return announceId;
    }

    if (isAnnounceIdBeatingTheOtherAnnounceIds(announceId, announceIds.filter(a => a !== announceId), trumpMode)) {
      return announceId;
    }

    return currentWinningAnnounceId;
  });
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
export const isPlayableCard = (card: Card, playerCards: Card[], trumpMode: TrumpMode, playersCardPlayedInCurrentTurn: GameState['playersCardPlayedInCurrentTurn'], firstPlayerInCurrentTurn: PlayerID, playerPartner: PlayerID): boolean => {
  // if a card has already been played
  if (playersCardPlayedInCurrentTurn[firstPlayerInCurrentTurn]) {
    const firstCardColor = playersCardPlayedInCurrentTurn[firstPlayerInCurrentTurn]!.color;

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
    const otherCards = Object.values(playersCardPlayedInCurrentTurn).filter(c => c !== undefined) as Card[];

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

      const playerPartnerCard = playersCardPlayedInCurrentTurn[playerPartner];
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

export const getWinner = (playersCardPlayedInCurrentTurn: Record<PlayerID, Card | undefined>, trumpMode: TrumpMode, firstCardColor: CardColor): PlayerID => {
  const winningCard = getWinningCard(
    Object.values(playersCardPlayedInCurrentTurn).filter(c => c !== undefined) as Card[],
    trumpMode,
    firstCardColor,
  );

  const winningPlayerCard = Object.entries(playersCardPlayedInCurrentTurn).find(([, playerCard]) => isSameCard(winningCard, playerCard));
  if (!winningPlayerCard) {
    throw new Error(`Can't get winner`);
  }

  return winningPlayerCard[0] as PlayerID;
};
export const getGameWinnerTeam = (teamsPoints: Record<TeamID, number>, howManyPointsATeamMustReachToEndTheGame: number): TeamID | null | undefined => {
  if (Object.values(teamsPoints).every(points => points < howManyPointsATeamMustReachToEndTheGame)) {
    return;
  }

  if (teamsPoints[TeamID.NorthSouth] === teamsPoints[TeamID.EastWest]) {
    return null;
  }

  if (teamsPoints[TeamID.NorthSouth] >= teamsPoints[TeamID.EastWest]) {
    return TeamID.NorthSouth;
  }

  return TeamID.EastWest;
};

export const getTurnOrder = (firstPlayer: PlayerID): PlayerID[] => {
  switch (firstPlayer) {
    case PlayerID.North:
      return [PlayerID.North, PlayerID.West, PlayerID.South, PlayerID.East];
    case PlayerID.East:
      return [PlayerID.East, PlayerID.North, PlayerID.West, PlayerID.South];
    case PlayerID.South:
      return [PlayerID.South, PlayerID.East, PlayerID.North, PlayerID.West];
    case PlayerID.West:
      return [PlayerID.West, PlayerID.South, PlayerID.East, PlayerID.North];
    default:
      console.log(firstPlayer);
      throw new Error();
  }
};

const getDefaultPlayersCards = () => ({
  [PlayerID.North]: [],
  [PlayerID.East]: [],
  [PlayerID.South]: [],
  [PlayerID.West]: [],
});
const getDefaultPlayersAnnounces = () => ({
  [PlayerID.North]: [],
  [PlayerID.East]: [],
  [PlayerID.South]: [],
  [PlayerID.West]: [],
});
const getDefaultWonTeamsCards = () => ({
  [TeamID.NorthSouth]: [],
  [TeamID.EastWest]: [],
});
const getDefaultTeamsPoints = () => ({
  [TeamID.NorthSouth]: 0,
  [TeamID.EastWest]: 0,
});
const getDefaultPlayersCardPlayedInCurrentTurn = () => ({
  [PlayerID.North]: undefined,
  [PlayerID.East]: undefined,
  [PlayerID.South]: undefined,
  [PlayerID.West]: undefined,
});
const getDefaultPlayersCardPlayedInPreviousTurn = () => undefined;
const getDefaultPlayersSaid = () => ({
  [PlayerID.North]: undefined,
  [PlayerID.East]: undefined,
  [PlayerID.South]: undefined,
  [PlayerID.West]: undefined,
});

export const getSetupGameState = (_: Context<PlayerID, PhaseID>): GameState => {
  const dealer = PlayerID.North;
  const nextDealer = dealer;
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
    teamsPoints: getDefaultTeamsPoints(),
    dealer,
    nextDealer,
    firstPlayerInCurrentTurn: nextDealer,
    trumpMode: TrumpMode.NoTrump,
    attackingTeam: TeamID.NorthSouth,
    defensingTeam: TeamID.EastWest,
    expectedPoints: 0,
    howManyCardsToDealToEachPlayerBeforeTalking,
    howManyCardsToDealToEachPlayerAfterTalking,
    howManyPointsATeamMustReachToEndTheGame: 2000,
    playersSaid: getDefaultPlayersSaid(),
    numberOfSuccessiveSkipSaid: 0,
    playersAnnounces: getDefaultPlayersAnnounces(),
    playersCardPlayedInCurrentTurn: getDefaultPlayersCardPlayedInCurrentTurn(),
    playersCardPlayedInPreviousTurn: getDefaultPlayersCardPlayedInPreviousTurn(),
  };
};
const defaultTurnConfig: TurnConfig<GameState, PlayerID, PhaseID> = {
  order: {
    playOrder: () => getTurnOrder(PlayerID.North),
    first: (G, ctx) => {
      if (ctx.phase === PhaseID.PlayCards) {
        switch (G.firstPlayerInCurrentTurn) {
          case PlayerID.North:
            return 0;
          case PlayerID.West:
            return 1;
          case PlayerID.South:
            return 2;
          case PlayerID.East:
            return 3;
        }
      }

      switch (G.nextDealer) {
        case PlayerID.North:
          return 0;
        case PlayerID.West:
          return 1;
        case PlayerID.South:
          return 2;
        case PlayerID.East:
          return 3;
      }
    },
    next: (G, ctx) => {
      switch (ctx.currentPlayer) {
        case PlayerID.North:
          return 1;
        case PlayerID.West:
          return 2;
        case PlayerID.South:
          return 3;
        case PlayerID.East:
          return 0;
      }
    },
  },
};
export const buildGame = (): GameConfig<GameState, GameStatePlayerView, Moves, PlayerID, PhaseID> => ({
  name: 'coinche',
  minPlayers: howManyPlayers,
  maxPlayers: howManyPlayers,

  setup: getSetupGameState,

  turn: defaultTurnConfig,

  events: {
    endStage: false,
    endTurn: false,
    endPhase: false,
    endGame: false,
    setStage: false,
    setPhase: false,
    setActivePlayers: false,
    pass: false,
  },

  phases: {
    [PhaseID.Deal]: {
      start: true,
      onBegin: (G, ctx) => {
        // set new dealer
        const dealer = G.nextDealer;
        const nextDealer = getTurnOrder(dealer)[1];

        // reset round state
        G.playersCards = getDefaultPlayersCards();
        G.wonTeamsCards = getDefaultWonTeamsCards();
        G.playersSaid = getDefaultPlayersSaid();
        G.playersAnnounces = getDefaultPlayersAnnounces();
        G.numberOfSuccessiveSkipSaid = 0;
        G.dealer = dealer;
        G.nextDealer = nextDealer;
        G.firstPlayerInCurrentTurn = nextDealer;
        G.playersCardPlayedInCurrentTurn = getDefaultPlayersCardPlayedInCurrentTurn();
        G.playersCardPlayedInPreviousTurn = getDefaultPlayersCardPlayedInPreviousTurn();
        G.expectedPoints = 0;
        G.trumpMode = TrumpMode.NoTrump;
        G.availableCards = ctx.random.Shuffle(getCards());

        // deal cards before talking
        getTurnOrder(nextDealer).forEach(playerID => {
          for (let i = 0; i < G.howManyCardsToDealToEachPlayerBeforeTalking; i++) {
            const card = G.availableCards.pop();
            G.playersCards[playerID].push(card!);
          }
        });

        G.__forcedNextPhase = PhaseID.Talk;
      },
      endIf: (G) => {
        return G.__forcedNextPhase ? { next: G.__forcedNextPhase } : false;
      },
      onEnd: (G) => {
        G.__forcedNextPhase = undefined;
      },
    },
    [PhaseID.Talk]: {
      // @TODO sayCoinche and saySurcoinche
      moves: {
        saySkip,
        sayTake,
      },
      endIf: (G) => {
        if (G.numberOfSuccessiveSkipSaid >= G.howManyPlayers) {
          return { next: PhaseID.Deal };
        }

        if (G.expectedPoints && (
          // 3 successive skips
          G.numberOfSuccessiveSkipSaid >= (G.howManyPlayers - 1)
          // maximum validExpectedPoints
          || G.expectedPoints === validExpectedPoints[validExpectedPoints.length - 1]
        )) {
          getTurnOrder(G.nextDealer).forEach(playerID => {
            // deal remaining cards
            for (let i = 0; i < G.howManyCardsToDealToEachPlayerAfterTalking; i++) {
              const card = G.availableCards.pop();
              G.playersCards[playerID].push(card!);
            }
            // list available announces
            G.playersAnnounces[playerID] = getAnnouncesForCards(G.playersCards[playerID], G.trumpMode).map(announce => ({ announce, announceGroup: getAnnounceGroupByAnnounceId(announce.id), isCardsDisplayable: false, isSaid: false }));
          });

          return { next: PhaseID.PlayCards };
        }

        return false;
      },
    },
    [PhaseID.PlayCards]: {
      moves: {
        sayAnnounce,
        playCard,
      },
      turn: {
        ...defaultTurnConfig,
        onBegin: (G, ctx) => {
          // @TODO: display announces cards => on second (or third if NoTrump) turn of second round

          // set players cards playability
          const player = ctx.currentPlayer;
          const playerPartner = getPlayerPartner(player);
          // @TODO! debug cards playability (why cards are always playable now???)
          const setCardsPlayability = (cards: Card[], playerIsCurrentPlayer: boolean): Card[] => cards.map(card => ({
            ...card,
            isPlayable: !playerIsCurrentPlayer
              ? false
              : isPlayableCard(
                card,
                G.playersCards[player],
                G.trumpMode,
                G.playersCardPlayedInCurrentTurn,
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
      },
      endIf: (G) => {
        if (Object.values(G.playersCardPlayedInCurrentTurn).every(card => card !== undefined)) {
          return { next: PhaseID.CountPoints };
        }

        return false;
      },
    },
    [PhaseID.CountPoints]: {
      onBegin: (G, ctx) => {
        const winner = getWinner(G.playersCardPlayedInCurrentTurn, G.trumpMode, G.playersCardPlayedInCurrentTurn[G.firstPlayerInCurrentTurn]!.color);
        const winnerTeam = getPlayerTeam(winner);

        // fill cards played in previous turn
        G.playersCardPlayedInPreviousTurn = {...G.playersCardPlayedInCurrentTurn} as Record<PlayerID, Card>; // cast because G.playersCardPlayedInCurrentTurn can't contain "undefined" values at this point

        // fill played cards to winner team cards
        (Object.values(G.playersCardPlayedInCurrentTurn).filter(c => c !== undefined) as Card[]).forEach(card => G.wonTeamsCards[winnerTeam].push(card));

        // winner becomes next first player
        G.firstPlayerInCurrentTurn = winner;

        // go to PlayCards phase if not all cards have been played
        if (Object.values(G.wonTeamsCards).reduce((acc, cards) => acc.concat(cards), []).length < G.howManyCards) {
          G.__forcedNextPhase = PhaseID.PlayCards;
          return;
        }

        // compute capot (100) or last turn (10) extra points
        const attackingTeamExtraPoints = G.attackingTeam === winnerTeam  ? (!G.wonTeamsCards[G.defensingTeam].length ? 100 : 10) : 0;
        const defensingTeamExtraPoints = G.defensingTeam === winnerTeam  ? (!G.wonTeamsCards[G.attackingTeam].length ? 100 : 10) : 0;

        // compute cards points
        const attackingTeamCardsPoints = G.wonTeamsCards[G.attackingTeam].reduce((acc, card) => acc + getCardPoints(card, G.trumpMode), 0);
        const defensingTeamCardsPoints = G.wonTeamsCards[G.defensingTeam].reduce((acc, card) => acc + getCardPoints(card, G.trumpMode), 0);

        // compute announces points
        const northSouthTeamAnnounces = [...G.playersAnnounces[PlayerID.North], ...G.playersAnnounces[PlayerID.South]].filter(a => a.isSaid);
        const eastWestTeamAnnounces = [...G.playersAnnounces[PlayerID.East], ...G.playersAnnounces[PlayerID.West]].filter(a => a.isSaid);
        const allAnnounceIds = [...northSouthTeamAnnounces.map(a => a.announce.id), ...eastWestTeamAnnounces.map(a => a.announce.id)];
        const bestAnnounceId = allAnnounceIds.length ? getWinningAnnounceId(allAnnounceIds, G.trumpMode) : undefined;
        const bestAnnounceBelongsToNorthSouthTeam = bestAnnounceId ? northSouthTeamAnnounces.map(a => a.announce.id).includes(bestAnnounceId) : undefined;
        const northSouthTeamAnnouncesPoints = bestAnnounceBelongsToNorthSouthTeam === true ? northSouthTeamAnnounces.reduce((acc, a) => getAnnouncePoints(a.announce, G.trumpMode), 0) : 0;
        const eastWestTeamAnnouncesPoints = bestAnnounceBelongsToNorthSouthTeam === false ? eastWestTeamAnnounces.reduce((acc, a) => getAnnouncePoints(a.announce, G.trumpMode), 0) : 0;
        const attackingTeamAnnouncesPoints = G.attackingTeam === TeamID.NorthSouth ? northSouthTeamAnnouncesPoints : eastWestTeamAnnouncesPoints;
        const defensingTeamAnnouncesPoints = G.defensingTeam === TeamID.NorthSouth ? northSouthTeamAnnouncesPoints : eastWestTeamAnnouncesPoints;

        // check which team won the round then assign their points accordingly
        const attackingTeamTotalPoints = (attackingTeamExtraPoints + attackingTeamCardsPoints + attackingTeamAnnouncesPoints);
        const defensingTeamTotalPoints = (defensingTeamExtraPoints + defensingTeamCardsPoints + defensingTeamAnnouncesPoints);
        if (attackingTeamTotalPoints >= G.expectedPoints && attackingTeamTotalPoints >= defensingTeamTotalPoints) {
          G.teamsPoints[G.attackingTeam] += (attackingTeamTotalPoints + G.expectedPoints);
          G.teamsPoints[G.defensingTeam] += defensingTeamTotalPoints;
        } else {
          G.teamsPoints[G.defensingTeam] += (attackingTeamTotalPoints + defensingTeamTotalPoints + G.expectedPoints);
        }

        // go to Deal phase if the end of the game has not been reached
        const gameWinnerTeam = getGameWinnerTeam(G.teamsPoints, G.howManyPointsATeamMustReachToEndTheGame);
        if (gameWinnerTeam === undefined) {
          G.__forcedNextPhase = PhaseID.Deal;
          return;
        }

        // @TODO congrats winning team
        console.log(`The winner is... ${gameWinnerTeam || 'both'}!`, G, ctx);
        ctx.events.endGame();
      },
      endIf: (G) => {
        return G.__forcedNextPhase ? { next: G.__forcedNextPhase } : false;
      },
      onEnd: (G) => {
        G.__forcedNextPhase = undefined;
      },
    },
  },

  playerView: (
    {
      availableCards,
      playersCards,
      playersAnnounces,
      ...GWithoutSecretData
    },
    ctx,
    playerID,
  ): GameStatePlayerView => {
    return {
      ...GWithoutSecretData,
      availableCards: new Array(availableCards.length).fill(secretCard),
      playersCards: {
        [PlayerID.North]: PlayerID.North === playerID ? playersCards[playerID] : new Array(playersCards[PlayerID.North].length).fill(secretCard),
        [PlayerID.East]: PlayerID.East === playerID ? playersCards[playerID] : new Array(playersCards[PlayerID.East].length).fill(secretCard),
        [PlayerID.South]: PlayerID.South === playerID ? playersCards[playerID] : new Array(playersCards[PlayerID.South].length).fill(secretCard),
        [PlayerID.West]: PlayerID.West === playerID ? playersCards[playerID] : new Array(playersCards[PlayerID.West].length).fill(secretCard),
      },
      playerCards: playerID ? playersCards[playerID] as Card[] : [],
      // @TODO: find a way to hide the "playersAnnounces.length" info (to make sure a player can't know how many announces others have)
      playersAnnounces: {
        [PlayerID.North]: PlayerID.North === playerID ? playersAnnounces[playerID] : (playersAnnounces[PlayerID.North] as PlayerAnnounce[]).map(transformPlayerAnnounceToSecretPlayerAnnounce),
        [PlayerID.East]: PlayerID.East === playerID ? playersAnnounces[playerID] : (playersAnnounces[PlayerID.East] as PlayerAnnounce[]).map(transformPlayerAnnounceToSecretPlayerAnnounce),
        [PlayerID.South]: PlayerID.South === playerID ? playersAnnounces[playerID] : (playersAnnounces[PlayerID.South] as PlayerAnnounce[]).map(transformPlayerAnnounceToSecretPlayerAnnounce),
        [PlayerID.West]: PlayerID.West === playerID ? playersAnnounces[playerID] : (playersAnnounces[PlayerID.West] as PlayerAnnounce[]).map(transformPlayerAnnounceToSecretPlayerAnnounce),
      },
      playerAnnounces: playerID ? playersAnnounces[playerID] as PlayerAnnounce[] : [],
    };
  },
});
