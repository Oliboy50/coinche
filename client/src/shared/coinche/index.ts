import {Context, GameConfig, TurnConfig} from 'boardgame.io/core';
import {GameName} from '../index';
import endTurn from './move/endTurn';
import waitBeforeMovingToNextPhase from './move/waitBeforeMovingToNextPhase';
import moveToNextPhase from './move/moveToNextPhase';
import playCard from './move/playCard';
import sayBelotOrNot from './move/sayBelotOrNot';
import sayAnnounce from './move/sayAnnounce';
import saySkip from './move/saySkip';
import sayTake from './move/sayTake';
import sayCoinche from './move/sayCoinche';
import {getWinningTeamAndNewAttackingTeamPointsAndDefensingTeamPointsAfterEndOfRound} from './service/pointsCounter';
import {getGameWinnerTeam, getTurnWinner, getWinningAnnounces, getWinningCard} from './service/winnerResolver';

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
export const howManyPlayers = Object.keys(PlayerID).length;

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

export type ExpectedPoints = 82 | 85 | 90 | 95 | 100 | 105 | 110 | 115 | 120 | 125 | 130 | 135 | 140 | 145 | 150 | 155 | 160 | 165 | 170 | 175 | 180 | 185 | 190 | 195 | 200 | 205 | 210 | 215 | 220 | 225 | 230 | 235 | 240 | 245 | 250;
export const validExpectedPoints: ExpectedPoints[] = [82, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250];

export enum AnnounceID {
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
}
export const validAnnounceIDs: AnnounceID[] = Object.values(AnnounceID);
export enum AnnounceGroup {
  Square = 'Square',
  Tierce = 'Tierce',
  Quarte = 'Quarte',
  Quinte = 'Quinte',
}
export interface BelotAnnounce {
  id: 'Belot';
  owner: PlayerID;
  ownerHasChosen: boolean;
  isSaid: boolean;
}
export interface Announce {
  id: AnnounceID;
  cards: Card[];
}
export interface PlayerAnnounce {
  player: PlayerID;
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

export interface SayTakeLevel {
  expectedPoints: ExpectedPoints;
  trumpMode: TrumpMode;
}
export type SayCoincheLevel = 'coinche' | 'surcoinche';
export interface SayTake extends SayTakeLevel {
  playerID: PlayerID;
  sayCoincheLevel: SayCoincheLevel | undefined;
}
export interface GameHistory {
  rounds: {
    sayTake: SayTake;
    turns: {
      playedCards: Card[];
      winningPlayer: PlayerID;
      winningTeam: TeamID;
    }[];
    displayableAnnounces: {
      id: AnnounceID | 'Belot';
      cards: Card[];
      owner: PlayerID;
      ownerTeam: TeamID;
    }[];
    winningTeam?: TeamID;
    teamPointsAtTheEndOfRound?: Record<TeamID, number>;
  }[];
}
export interface GameState {
  // internal state
  __forcedNextPhase?: PhaseID;
  __isWaitingBeforeMovingToNextPhase: boolean;
  __canMoveToNextPhase: boolean;
  __shuffleCards: (cards:Card[]) => Card[];

  // global state
  howManyPointsATeamMustReachToEndTheGame: number;
  howManyCardsToDealToEachPlayerBeforeTalking: number;
  howManyCardsToDealToEachPlayerAfterTalking: number;
  teamsPoints: Record<TeamID, number>;
  history: GameHistory;

  // round state
  availableCards: Card[];
  playersCards: Record<PlayerID, Card[]>;
  wonTeamsCards: Record<TeamID, Card[]>;
  dealer: PlayerID;
  nextDealer: PlayerID;
  attackingTeam: TeamID;
  defensingTeam: TeamID;
  playersSaid: Record<PlayerID, 'skip' | SayTakeLevel | SayCoincheLevel | undefined>;
  lastPlayersTakeSaid: Record<PlayerID, SayTakeLevel | undefined>;
  numberOfSuccessiveSkipSaid: number;
  currentSayTake: SayTake | undefined;
  belotAnnounce: BelotAnnounce | undefined;
  playersAnnounces: Record<PlayerID, PlayerAnnounce[]>;

  // turn state
  firstPlayerInCurrentTurn: PlayerID;
  playersCardPlayedInCurrentTurn: Record<PlayerID, Card | undefined>;
  playersCardPlayedInPreviousTurn: Record<PlayerID, Card> | undefined;
  playersAnnouncesDisplayedInCurrentTurn: Record<PlayerID, { id: AnnounceID | 'Belot' }[]>;
}
// @TODO: hide belotAnnounce if not said
export type GameStatePlayerView = Omit<GameState, 'availableCards' | 'playersCards' | 'playersAnnounces'> & {
  availableCards: SecretCard[];
  playersCards: Record<PlayerID, Card[] | SecretCard[]>;
  playerCards: Card[]; // Contains G.playersCards[myPlayerID]
  playersAnnounces: Record<PlayerID, PlayerAnnounce[] | SecretPlayerAnnounce[]>;
  playerAnnounces: PlayerAnnounce[];  // Contains G.playersAnnounces[myPlayerID]
}

export interface Moves {
  endTurn: () => void;
  waitBeforeMovingToNextPhase: () => void;
  moveToNextPhase: () => void;
  saySkip: () => void;
  sayTake: (expectedPoints: ExpectedPoints, mode: TrumpMode) => void;
  sayCoinche: () => void;
  sayAnnounce: (announce: Announce) => void;
  sayBelotOrNot: (sayIt: boolean) => void;
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
    case TrumpMode.NoTrump:
      return undefined;
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

export const isSayableExpectedPoints = (expectedPoints: ExpectedPoints, currentSayTakeExpectedPoints: ExpectedPoints | undefined): boolean => expectedPoints > (currentSayTakeExpectedPoints || 0);

export const getBelotCards = (trumpMode: TrumpMode): Card[] => {
  switch (trumpMode) {
    case TrumpMode.NoTrump:
      return [];
    case TrumpMode.TrumpSpade:
      return [{ color: CardColor.Spade, name: CardName.King }, { color: CardColor.Spade, name: CardName.Queen }];
    case TrumpMode.TrumpDiamond:
      return [{ color: CardColor.Diamond, name: CardName.King }, { color: CardColor.Diamond, name: CardName.Queen }];
    case TrumpMode.TrumpHeart:
      return [{ color: CardColor.Heart, name: CardName.King }, { color: CardColor.Heart, name: CardName.Queen }];
    case TrumpMode.TrumpClub:
      return [{ color: CardColor.Club, name: CardName.King }, { color: CardColor.Club, name: CardName.Queen }];
  }
};
export const getBelotOwner = (trumpMode: TrumpMode, playersCards: GameState['playersCards']): PlayerID | undefined => {
  const belotCards = getBelotCards(trumpMode);
  if (!belotCards.length) {
    return;
  }

  const playerCardsContainingBelot = Object.entries(playersCards).find(([_, playerCards]) =>
    belotCards.every(bc => playerCards.some(pc => isSameCard(bc, pc))),
  );
  return playerCardsContainingBelot ? playerCardsContainingBelot[0] as PlayerID : undefined;
};

export const getAnnounces = (): Announce[] => [
  {
    id: AnnounceID.SquareAce,
    cards: [
      { name: CardName.Ace, color: CardColor.Club },
      { name: CardName.Ace, color: CardColor.Spade },
      { name: CardName.Ace, color: CardColor.Heart },
      { name: CardName.Ace, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.SquareKing,
    cards: [
      { name: CardName.King, color: CardColor.Club },
      { name: CardName.King, color: CardColor.Spade },
      { name: CardName.King, color: CardColor.Heart },
      { name: CardName.King, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.SquareQueen,
    cards: [
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Queen, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.SquareJack,
    cards: [
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.SquareTen,
    cards: [
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.SquareNine,
    cards: [
      { name: CardName.Nine, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.QuinteAceSpade,
    cards: [
      { name: CardName.Ace, color: CardColor.Spade },
      { name: CardName.King, color: CardColor.Spade },
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceID.QuinteAceDiamond,
    cards: [
      { name: CardName.Ace, color: CardColor.Diamond },
      { name: CardName.King, color: CardColor.Diamond },
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.QuinteAceHeart,
    cards: [
      { name: CardName.Ace, color: CardColor.Heart },
      { name: CardName.King, color: CardColor.Heart },
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceID.QuinteAceClub,
    cards: [
      { name: CardName.Ace, color: CardColor.Club },
      { name: CardName.King, color: CardColor.Club },
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceID.QuinteKingSpade,
    cards: [
      { name: CardName.King, color: CardColor.Spade },
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceID.QuinteKingDiamond,
    cards: [
      { name: CardName.King, color: CardColor.Diamond },
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.QuinteKingHeart,
    cards: [
      { name: CardName.King, color: CardColor.Heart },
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceID.QuinteKingClub,
    cards: [
      { name: CardName.King, color: CardColor.Club },
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceID.QuinteQueenSpade,
    cards: [
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
      { name: CardName.Eight, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceID.QuinteQueenDiamond,
    cards: [
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
      { name: CardName.Eight, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.QuinteQueenHeart,
    cards: [
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
      { name: CardName.Eight, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceID.QuinteQueenClub,
    cards: [
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
      { name: CardName.Eight, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceID.QuinteJackSpade,
    cards: [
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
      { name: CardName.Eight, color: CardColor.Spade },
      { name: CardName.Seven, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceID.QuinteJackDiamond,
    cards: [
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
      { name: CardName.Eight, color: CardColor.Diamond },
      { name: CardName.Seven, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.QuinteJackHeart,
    cards: [
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
      { name: CardName.Eight, color: CardColor.Heart },
      { name: CardName.Seven, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceID.QuinteJackClub,
    cards: [
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
      { name: CardName.Eight, color: CardColor.Club },
      { name: CardName.Seven, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceID.QuarteAceSpade,
    cards: [
      { name: CardName.Ace, color: CardColor.Spade },
      { name: CardName.King, color: CardColor.Spade },
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceID.QuarteAceDiamond,
    cards: [
      { name: CardName.Ace, color: CardColor.Diamond },
      { name: CardName.King, color: CardColor.Diamond },
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.QuarteAceHeart,
    cards: [
      { name: CardName.Ace, color: CardColor.Heart },
      { name: CardName.King, color: CardColor.Heart },
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceID.QuarteAceClub,
    cards: [
      { name: CardName.Ace, color: CardColor.Club },
      { name: CardName.King, color: CardColor.Club },
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceID.QuarteKingSpade,
    cards: [
      { name: CardName.King, color: CardColor.Spade },
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceID.QuarteKingDiamond,
    cards: [
      { name: CardName.King, color: CardColor.Diamond },
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.QuarteKingHeart,
    cards: [
      { name: CardName.King, color: CardColor.Heart },
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceID.QuarteKingClub,
    cards: [
      { name: CardName.King, color: CardColor.Club },
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceID.QuarteQueenSpade,
    cards: [
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceID.QuarteQueenDiamond,
    cards: [
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.QuarteQueenHeart,
    cards: [
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceID.QuarteQueenClub,
    cards: [
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceID.QuarteJackSpade,
    cards: [
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
      { name: CardName.Eight, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceID.QuarteJackDiamond,
    cards: [
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
      { name: CardName.Eight, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.QuarteJackHeart,
    cards: [
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
      { name: CardName.Eight, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceID.QuarteJackClub,
    cards: [
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
      { name: CardName.Eight, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceID.QuarteTenSpade,
    cards: [
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
      { name: CardName.Eight, color: CardColor.Spade },
      { name: CardName.Seven, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceID.QuarteTenDiamond,
    cards: [
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
      { name: CardName.Eight, color: CardColor.Diamond },
      { name: CardName.Seven, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.QuarteTenHeart,
    cards: [
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
      { name: CardName.Eight, color: CardColor.Heart },
      { name: CardName.Seven, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceID.QuarteTenClub,
    cards: [
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
      { name: CardName.Eight, color: CardColor.Club },
      { name: CardName.Seven, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceID.TierceAceSpade,
    cards: [
      { name: CardName.Ace, color: CardColor.Spade },
      { name: CardName.King, color: CardColor.Spade },
      { name: CardName.Queen, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceID.TierceAceDiamond,
    cards: [
      { name: CardName.Ace, color: CardColor.Diamond },
      { name: CardName.King, color: CardColor.Diamond },
      { name: CardName.Queen, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.TierceAceHeart,
    cards: [
      { name: CardName.Ace, color: CardColor.Heart },
      { name: CardName.King, color: CardColor.Heart },
      { name: CardName.Queen, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceID.TierceAceClub,
    cards: [
      { name: CardName.Ace, color: CardColor.Club },
      { name: CardName.King, color: CardColor.Club },
      { name: CardName.Queen, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceID.TierceKingSpade,
    cards: [
      { name: CardName.King, color: CardColor.Spade },
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceID.TierceKingDiamond,
    cards: [
      { name: CardName.King, color: CardColor.Diamond },
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.TierceKingHeart,
    cards: [
      { name: CardName.King, color: CardColor.Heart },
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceID.TierceKingClub,
    cards: [
      { name: CardName.King, color: CardColor.Club },
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceID.TierceQueenSpade,
    cards: [
      { name: CardName.Queen, color: CardColor.Spade },
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceID.TierceQueenDiamond,
    cards: [
      { name: CardName.Queen, color: CardColor.Diamond },
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.TierceQueenHeart,
    cards: [
      { name: CardName.Queen, color: CardColor.Heart },
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceID.TierceQueenClub,
    cards: [
      { name: CardName.Queen, color: CardColor.Club },
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceID.TierceJackSpade,
    cards: [
      { name: CardName.Jack, color: CardColor.Spade },
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceID.TierceJackDiamond,
    cards: [
      { name: CardName.Jack, color: CardColor.Diamond },
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.TierceJackHeart,
    cards: [
      { name: CardName.Jack, color: CardColor.Heart },
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceID.TierceJackClub,
    cards: [
      { name: CardName.Jack, color: CardColor.Club },
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceID.TierceTenSpade,
    cards: [
      { name: CardName.Ten, color: CardColor.Spade },
      { name: CardName.Nine, color: CardColor.Spade },
      { name: CardName.Eight, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceID.TierceTenDiamond,
    cards: [
      { name: CardName.Ten, color: CardColor.Diamond },
      { name: CardName.Nine, color: CardColor.Diamond },
      { name: CardName.Eight, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.TierceTenHeart,
    cards: [
      { name: CardName.Ten, color: CardColor.Heart },
      { name: CardName.Nine, color: CardColor.Heart },
      { name: CardName.Eight, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceID.TierceTenClub,
    cards: [
      { name: CardName.Ten, color: CardColor.Club },
      { name: CardName.Nine, color: CardColor.Club },
      { name: CardName.Eight, color: CardColor.Club },
    ],
  },
  {
    id: AnnounceID.TierceNineSpade,
    cards: [
      { name: CardName.Nine, color: CardColor.Spade },
      { name: CardName.Eight, color: CardColor.Spade },
      { name: CardName.Seven, color: CardColor.Spade },
    ],
  },
  {
    id: AnnounceID.TierceNineDiamond,
    cards: [
      { name: CardName.Nine, color: CardColor.Diamond },
      { name: CardName.Eight, color: CardColor.Diamond },
      { name: CardName.Seven, color: CardColor.Diamond },
    ],
  },
  {
    id: AnnounceID.TierceNineHeart,
    cards: [
      { name: CardName.Nine, color: CardColor.Heart },
      { name: CardName.Eight, color: CardColor.Heart },
      { name: CardName.Seven, color: CardColor.Heart },
    ],
  },
  {
    id: AnnounceID.TierceNineClub,
    cards: [
      { name: CardName.Nine, color: CardColor.Club },
      { name: CardName.Eight, color: CardColor.Club },
      { name: CardName.Seven, color: CardColor.Club },
    ],
  },
];
export const getAnnounceByID = (announceID: AnnounceID): Announce => getAnnounces().find((a) => announceID === a.id)!;
export const getAnnounceGroupByAnnounceID = (announceID: AnnounceID): AnnounceGroup => {
  switch (announceID) {
    case AnnounceID.SquareAce:
    case AnnounceID.SquareNine:
    case AnnounceID.SquareTen:
    case AnnounceID.SquareJack:
    case AnnounceID.SquareQueen:
    case AnnounceID.SquareKing:
      return AnnounceGroup.Square;
    case AnnounceID.TierceAceSpade:
    case AnnounceID.TierceAceDiamond:
    case AnnounceID.TierceAceHeart:
    case AnnounceID.TierceAceClub:
    case AnnounceID.TierceKingSpade:
    case AnnounceID.TierceKingDiamond:
    case AnnounceID.TierceKingHeart:
    case AnnounceID.TierceKingClub:
    case AnnounceID.TierceQueenSpade:
    case AnnounceID.TierceQueenDiamond:
    case AnnounceID.TierceQueenHeart:
    case AnnounceID.TierceQueenClub:
    case AnnounceID.TierceJackSpade:
    case AnnounceID.TierceJackDiamond:
    case AnnounceID.TierceJackHeart:
    case AnnounceID.TierceJackClub:
    case AnnounceID.TierceTenSpade:
    case AnnounceID.TierceTenDiamond:
    case AnnounceID.TierceTenHeart:
    case AnnounceID.TierceTenClub:
    case AnnounceID.TierceNineSpade:
    case AnnounceID.TierceNineDiamond:
    case AnnounceID.TierceNineHeart:
    case AnnounceID.TierceNineClub:
      return AnnounceGroup.Tierce;
    case AnnounceID.QuarteAceSpade:
    case AnnounceID.QuarteAceDiamond:
    case AnnounceID.QuarteAceHeart:
    case AnnounceID.QuarteAceClub:
    case AnnounceID.QuarteKingSpade:
    case AnnounceID.QuarteKingDiamond:
    case AnnounceID.QuarteKingHeart:
    case AnnounceID.QuarteKingClub:
    case AnnounceID.QuarteQueenSpade:
    case AnnounceID.QuarteQueenDiamond:
    case AnnounceID.QuarteQueenHeart:
    case AnnounceID.QuarteQueenClub:
    case AnnounceID.QuarteJackSpade:
    case AnnounceID.QuarteJackDiamond:
    case AnnounceID.QuarteJackHeart:
    case AnnounceID.QuarteJackClub:
    case AnnounceID.QuarteTenSpade:
    case AnnounceID.QuarteTenDiamond:
    case AnnounceID.QuarteTenHeart:
    case AnnounceID.QuarteTenClub:
      return AnnounceGroup.Quarte;
    case AnnounceID.QuinteAceSpade:
    case AnnounceID.QuinteAceDiamond:
    case AnnounceID.QuinteAceHeart:
    case AnnounceID.QuinteAceClub:
    case AnnounceID.QuinteKingSpade:
    case AnnounceID.QuinteKingDiamond:
    case AnnounceID.QuinteKingHeart:
    case AnnounceID.QuinteKingClub:
    case AnnounceID.QuinteQueenSpade:
    case AnnounceID.QuinteQueenDiamond:
    case AnnounceID.QuinteQueenHeart:
    case AnnounceID.QuinteQueenClub:
    case AnnounceID.QuinteJackSpade:
    case AnnounceID.QuinteJackDiamond:
    case AnnounceID.QuinteJackHeart:
    case AnnounceID.QuinteJackClub:
      return AnnounceGroup.Quinte;
  }
};
const announcesContainAnnounceID = (announces: Announce[], announceID: AnnounceID): boolean => announces.some(a => a.id === announceID);
const filterSelfExcludingAnnounces = (announces: Announce[]): Announce[] => {
  let bestAnnounces = [...announces];

  const selfExcludingAnnouncesSortedByPriority: {id: AnnounceID, excludes: AnnounceID[]}[] = [
    {
      id: AnnounceID.QuinteAceSpade,
      excludes: [
        AnnounceID.QuinteKingSpade,
        AnnounceID.QuinteQueenSpade,
        AnnounceID.QuinteJackSpade,
        AnnounceID.QuarteAceSpade,
        AnnounceID.QuarteKingSpade,
        AnnounceID.QuarteQueenSpade,
        AnnounceID.QuarteJackSpade,
        AnnounceID.QuarteTenSpade,
        AnnounceID.TierceAceSpade,
        AnnounceID.TierceKingSpade,
        AnnounceID.TierceQueenSpade,
        AnnounceID.TierceJackSpade,
        AnnounceID.TierceTenSpade,
      ],
    },
    {
      id: AnnounceID.QuinteAceDiamond,
      excludes: [
        AnnounceID.QuinteKingDiamond,
        AnnounceID.QuinteQueenDiamond,
        AnnounceID.QuinteJackDiamond,
        AnnounceID.QuarteAceDiamond,
        AnnounceID.QuarteKingDiamond,
        AnnounceID.QuarteQueenDiamond,
        AnnounceID.QuarteJackDiamond,
        AnnounceID.QuarteTenDiamond,
        AnnounceID.TierceAceDiamond,
        AnnounceID.TierceKingDiamond,
        AnnounceID.TierceQueenDiamond,
        AnnounceID.TierceJackDiamond,
        AnnounceID.TierceTenDiamond,
      ],
    },
    {
      id: AnnounceID.QuinteAceHeart,
      excludes: [
        AnnounceID.QuinteKingHeart,
        AnnounceID.QuinteQueenHeart,
        AnnounceID.QuinteJackHeart,
        AnnounceID.QuarteAceHeart,
        AnnounceID.QuarteKingHeart,
        AnnounceID.QuarteQueenHeart,
        AnnounceID.QuarteJackHeart,
        AnnounceID.QuarteTenHeart,
        AnnounceID.TierceAceHeart,
        AnnounceID.TierceKingHeart,
        AnnounceID.TierceQueenHeart,
        AnnounceID.TierceJackHeart,
        AnnounceID.TierceTenHeart,
      ],
    },
    {
      id: AnnounceID.QuinteAceClub,
      excludes: [
        AnnounceID.QuinteKingClub,
        AnnounceID.QuinteQueenClub,
        AnnounceID.QuinteJackClub,
        AnnounceID.QuarteAceClub,
        AnnounceID.QuarteKingClub,
        AnnounceID.QuarteQueenClub,
        AnnounceID.QuarteJackClub,
        AnnounceID.QuarteTenClub,
        AnnounceID.TierceAceClub,
        AnnounceID.TierceKingClub,
        AnnounceID.TierceQueenClub,
        AnnounceID.TierceJackClub,
        AnnounceID.TierceTenClub,
      ],
    },
    {
      id: AnnounceID.QuinteKingSpade,
      excludes: [
        AnnounceID.QuinteQueenSpade,
        AnnounceID.QuinteJackSpade,
        AnnounceID.QuarteKingSpade,
        AnnounceID.QuarteQueenSpade,
        AnnounceID.QuarteJackSpade,
        AnnounceID.QuarteTenSpade,
        AnnounceID.TierceKingSpade,
        AnnounceID.TierceQueenSpade,
        AnnounceID.TierceJackSpade,
        AnnounceID.TierceTenSpade,
        AnnounceID.TierceNineSpade,
      ],
    },
    {
      id: AnnounceID.QuinteKingDiamond,
      excludes: [
        AnnounceID.QuinteQueenDiamond,
        AnnounceID.QuinteJackDiamond,
        AnnounceID.QuarteKingDiamond,
        AnnounceID.QuarteQueenDiamond,
        AnnounceID.QuarteJackDiamond,
        AnnounceID.QuarteTenDiamond,
        AnnounceID.TierceKingDiamond,
        AnnounceID.TierceQueenDiamond,
        AnnounceID.TierceJackDiamond,
        AnnounceID.TierceTenDiamond,
        AnnounceID.TierceNineDiamond,
      ],
    },
    {
      id: AnnounceID.QuinteKingHeart,
      excludes: [
        AnnounceID.QuinteQueenHeart,
        AnnounceID.QuinteJackHeart,
        AnnounceID.QuarteKingHeart,
        AnnounceID.QuarteQueenHeart,
        AnnounceID.QuarteJackHeart,
        AnnounceID.QuarteTenHeart,
        AnnounceID.TierceKingHeart,
        AnnounceID.TierceQueenHeart,
        AnnounceID.TierceJackHeart,
        AnnounceID.TierceTenHeart,
        AnnounceID.TierceNineHeart,
      ],
    },
    {
      id: AnnounceID.QuinteKingClub,
      excludes: [
        AnnounceID.QuinteQueenClub,
        AnnounceID.QuinteJackClub,
        AnnounceID.QuarteKingClub,
        AnnounceID.QuarteQueenClub,
        AnnounceID.QuarteJackClub,
        AnnounceID.QuarteTenClub,
        AnnounceID.TierceKingClub,
        AnnounceID.TierceQueenClub,
        AnnounceID.TierceJackClub,
        AnnounceID.TierceTenClub,
        AnnounceID.TierceNineClub,
      ],
    },
    {
      id: AnnounceID.QuinteQueenSpade,
      excludes: [
        AnnounceID.QuinteJackSpade,
        AnnounceID.QuarteQueenSpade,
        AnnounceID.QuarteJackSpade,
        AnnounceID.QuarteTenSpade,
        AnnounceID.TierceQueenSpade,
        AnnounceID.TierceJackSpade,
        AnnounceID.TierceTenSpade,
        AnnounceID.TierceNineSpade,
      ],
    },
    {
      id: AnnounceID.QuinteQueenDiamond,
      excludes: [
        AnnounceID.QuinteJackDiamond,
        AnnounceID.QuarteQueenDiamond,
        AnnounceID.QuarteJackDiamond,
        AnnounceID.QuarteTenDiamond,
        AnnounceID.TierceQueenDiamond,
        AnnounceID.TierceJackDiamond,
        AnnounceID.TierceTenDiamond,
        AnnounceID.TierceNineDiamond,
      ],
    },
    {
      id: AnnounceID.QuinteQueenHeart,
      excludes: [
        AnnounceID.QuinteJackHeart,
        AnnounceID.QuarteQueenHeart,
        AnnounceID.QuarteJackHeart,
        AnnounceID.QuarteTenHeart,
        AnnounceID.TierceQueenHeart,
        AnnounceID.TierceJackHeart,
        AnnounceID.TierceTenHeart,
        AnnounceID.TierceNineHeart,
      ],
    },
    {
      id: AnnounceID.QuinteQueenClub,
      excludes: [
        AnnounceID.QuinteJackClub,
        AnnounceID.QuarteQueenClub,
        AnnounceID.QuarteJackClub,
        AnnounceID.QuarteTenClub,
        AnnounceID.TierceQueenClub,
        AnnounceID.TierceJackClub,
        AnnounceID.TierceTenClub,
        AnnounceID.TierceNineClub,
      ],
    },
    {
      id: AnnounceID.QuinteJackSpade,
      excludes: [
        AnnounceID.QuarteJackSpade,
        AnnounceID.QuarteTenSpade,
        AnnounceID.TierceJackSpade,
        AnnounceID.TierceTenSpade,
        AnnounceID.TierceNineSpade,
      ],
    },
    {
      id: AnnounceID.QuinteJackDiamond,
      excludes: [
        AnnounceID.QuarteJackDiamond,
        AnnounceID.QuarteTenDiamond,
        AnnounceID.TierceJackDiamond,
        AnnounceID.TierceTenDiamond,
        AnnounceID.TierceNineDiamond,
      ],
    },
    {
      id: AnnounceID.QuinteJackHeart,
      excludes: [
        AnnounceID.QuarteJackHeart,
        AnnounceID.QuarteTenHeart,
        AnnounceID.TierceJackHeart,
        AnnounceID.TierceTenHeart,
        AnnounceID.TierceNineHeart,
      ],
    },
    {
      id: AnnounceID.QuinteJackClub,
      excludes: [
        AnnounceID.QuarteJackClub,
        AnnounceID.QuarteTenClub,
        AnnounceID.TierceJackClub,
        AnnounceID.TierceTenClub,
        AnnounceID.TierceNineClub,
      ],
    },
    {
      id: AnnounceID.QuarteAceSpade,
      excludes: [
        AnnounceID.QuarteKingSpade,
        AnnounceID.QuarteQueenSpade,
        AnnounceID.QuarteJackSpade,
        AnnounceID.QuarteTenSpade,
        AnnounceID.TierceAceSpade,
        AnnounceID.TierceKingSpade,
        AnnounceID.TierceQueenSpade,
        AnnounceID.TierceJackSpade,
        AnnounceID.TierceTenSpade,
      ],
    },
    {
      id: AnnounceID.QuarteAceDiamond,
      excludes: [
        AnnounceID.QuarteKingDiamond,
        AnnounceID.QuarteQueenDiamond,
        AnnounceID.QuarteJackDiamond,
        AnnounceID.QuarteTenDiamond,
        AnnounceID.TierceAceDiamond,
        AnnounceID.TierceKingDiamond,
        AnnounceID.TierceQueenDiamond,
        AnnounceID.TierceJackDiamond,
        AnnounceID.TierceTenDiamond,
      ],
    },
    {
      id: AnnounceID.QuarteAceHeart,
      excludes: [
        AnnounceID.QuarteKingHeart,
        AnnounceID.QuarteQueenHeart,
        AnnounceID.QuarteJackHeart,
        AnnounceID.QuarteTenHeart,
        AnnounceID.TierceAceHeart,
        AnnounceID.TierceKingHeart,
        AnnounceID.TierceQueenHeart,
        AnnounceID.TierceJackHeart,
        AnnounceID.TierceTenHeart,
      ],
    },
    {
      id: AnnounceID.QuarteAceClub,
      excludes: [
        AnnounceID.QuarteKingClub,
        AnnounceID.QuarteQueenClub,
        AnnounceID.QuarteJackClub,
        AnnounceID.QuarteTenClub,
        AnnounceID.TierceAceClub,
        AnnounceID.TierceKingClub,
        AnnounceID.TierceQueenClub,
        AnnounceID.TierceJackClub,
        AnnounceID.TierceTenClub,
      ],
    },
    {
      id: AnnounceID.QuarteKingSpade,
      excludes: [
        AnnounceID.QuarteQueenSpade,
        AnnounceID.QuarteJackSpade,
        AnnounceID.QuarteTenSpade,
        AnnounceID.TierceKingSpade,
        AnnounceID.TierceQueenSpade,
        AnnounceID.TierceJackSpade,
        AnnounceID.TierceTenSpade,
        AnnounceID.TierceNineSpade,
      ],
    },
    {
      id: AnnounceID.QuarteKingDiamond,
      excludes: [
        AnnounceID.QuarteQueenDiamond,
        AnnounceID.QuarteJackDiamond,
        AnnounceID.QuarteTenDiamond,
        AnnounceID.TierceKingDiamond,
        AnnounceID.TierceQueenDiamond,
        AnnounceID.TierceJackDiamond,
        AnnounceID.TierceTenDiamond,
        AnnounceID.TierceNineDiamond,
      ],
    },
    {
      id: AnnounceID.QuarteKingHeart,
      excludes: [
        AnnounceID.QuarteQueenHeart,
        AnnounceID.QuarteJackHeart,
        AnnounceID.QuarteTenHeart,
        AnnounceID.TierceKingHeart,
        AnnounceID.TierceQueenHeart,
        AnnounceID.TierceJackHeart,
        AnnounceID.TierceTenHeart,
        AnnounceID.TierceNineHeart,
      ],
    },
    {
      id: AnnounceID.QuarteKingClub,
      excludes: [
        AnnounceID.QuarteQueenClub,
        AnnounceID.QuarteJackClub,
        AnnounceID.QuarteTenClub,
        AnnounceID.TierceKingClub,
        AnnounceID.TierceQueenClub,
        AnnounceID.TierceJackClub,
        AnnounceID.TierceTenClub,
        AnnounceID.TierceNineClub,
      ],
    },
    {
      id: AnnounceID.QuarteQueenSpade,
      excludes: [
        AnnounceID.QuarteJackSpade,
        AnnounceID.QuarteTenSpade,
        AnnounceID.TierceQueenSpade,
        AnnounceID.TierceJackSpade,
        AnnounceID.TierceTenSpade,
        AnnounceID.TierceNineSpade,
      ],
    },
    {
      id: AnnounceID.QuarteQueenDiamond,
      excludes: [
        AnnounceID.QuarteJackDiamond,
        AnnounceID.QuarteTenDiamond,
        AnnounceID.TierceQueenDiamond,
        AnnounceID.TierceJackDiamond,
        AnnounceID.TierceTenDiamond,
        AnnounceID.TierceNineDiamond,
      ],
    },
    {
      id: AnnounceID.QuarteQueenHeart,
      excludes: [
        AnnounceID.QuarteJackHeart,
        AnnounceID.QuarteTenHeart,
        AnnounceID.TierceQueenHeart,
        AnnounceID.TierceJackHeart,
        AnnounceID.TierceTenHeart,
        AnnounceID.TierceNineHeart,
      ],
    },
    {
      id: AnnounceID.QuarteQueenClub,
      excludes: [
        AnnounceID.QuarteJackClub,
        AnnounceID.QuarteTenClub,
        AnnounceID.TierceQueenClub,
        AnnounceID.TierceJackClub,
        AnnounceID.TierceTenClub,
        AnnounceID.TierceNineClub,
      ],
    },
    {
      id: AnnounceID.QuarteJackSpade,
      excludes: [
        AnnounceID.QuarteTenSpade,
        AnnounceID.TierceJackSpade,
        AnnounceID.TierceTenSpade,
        AnnounceID.TierceNineSpade,
      ],
    },
    {
      id: AnnounceID.QuarteJackDiamond,
      excludes: [
        AnnounceID.QuarteTenDiamond,
        AnnounceID.TierceJackDiamond,
        AnnounceID.TierceTenDiamond,
        AnnounceID.TierceNineDiamond,
      ],
    },
    {
      id: AnnounceID.QuarteJackHeart,
      excludes: [
        AnnounceID.QuarteTenHeart,
        AnnounceID.TierceJackHeart,
        AnnounceID.TierceTenHeart,
        AnnounceID.TierceNineHeart,
      ],
    },
    {
      id: AnnounceID.QuarteJackClub,
      excludes: [
        AnnounceID.QuarteTenClub,
        AnnounceID.TierceJackClub,
        AnnounceID.TierceTenClub,
        AnnounceID.TierceNineClub,
      ],
    },
    {
      id: AnnounceID.QuarteTenSpade,
      excludes: [
        AnnounceID.TierceTenSpade,
        AnnounceID.TierceNineSpade,
      ],
    },
    {
      id: AnnounceID.QuarteTenDiamond,
      excludes: [
        AnnounceID.TierceTenDiamond,
        AnnounceID.TierceNineDiamond,
      ],
    },
    {
      id: AnnounceID.QuarteTenHeart,
      excludes: [
        AnnounceID.TierceTenHeart,
        AnnounceID.TierceNineHeart,
      ],
    },
    {
      id: AnnounceID.QuarteTenClub,
      excludes: [
        AnnounceID.TierceTenClub,
        AnnounceID.TierceNineClub,
      ],
    },
  ];
  selfExcludingAnnouncesSortedByPriority.forEach(item => {
    if (announcesContainAnnounceID(bestAnnounces, item.id)) {
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
export const isAnnounceIDBeatingTheOtherAnnounceIDs = (announceID: AnnounceID, otherAnnounceIDs: AnnounceID[], trumpMode: TrumpMode): boolean | null => {
  if (!otherAnnounceIDs.length) {
    return true;
  }

  switch (getAnnounceGroupByAnnounceID(announceID)) {
    case AnnounceGroup.Square:
      // handle other announces with lower announce groups
      if (otherAnnounceIDs.every(a => getAnnounceGroupByAnnounceID(a) !== AnnounceGroup.Square)) {
        return true;
      }
      // handle same announce group
      switch (announceID) {
        case AnnounceID.SquareAce:
          if (trumpMode === TrumpMode.NoTrump) {
            return true;
          }
          return otherAnnounceIDs.every(a => ![AnnounceID.SquareJack, AnnounceID.SquareNine].includes(a));
        case AnnounceID.SquareTen:
          if (trumpMode === TrumpMode.NoTrump) {
            return otherAnnounceIDs.every(a => a !== AnnounceID.SquareAce);
          }
          return otherAnnounceIDs.every(a => ![AnnounceID.SquareJack, AnnounceID.SquareNine, AnnounceID.SquareAce].includes(a));
        case AnnounceID.SquareKing:
          if (trumpMode === TrumpMode.NoTrump) {
            return otherAnnounceIDs.every(a => ![AnnounceID.SquareAce, AnnounceID.SquareTen].includes(a));
          }
          return otherAnnounceIDs.every(a => ![AnnounceID.SquareJack, AnnounceID.SquareNine, AnnounceID.SquareAce, AnnounceID.SquareTen].includes(a));
        case AnnounceID.SquareQueen:
          if (trumpMode === TrumpMode.NoTrump) {
            return otherAnnounceIDs.every(a => ![AnnounceID.SquareAce, AnnounceID.SquareTen, AnnounceID.SquareKing].includes(a));
          }
          return otherAnnounceIDs.every(a => ![AnnounceID.SquareJack, AnnounceID.SquareNine, AnnounceID.SquareAce, AnnounceID.SquareTen, AnnounceID.SquareKing].includes(a));
        case AnnounceID.SquareJack:
          if (trumpMode === TrumpMode.NoTrump) {
            return otherAnnounceIDs.every(a => ![AnnounceID.SquareAce, AnnounceID.SquareTen, AnnounceID.SquareKing, AnnounceID.SquareQueen].includes(a));
          }
          return true;
        case AnnounceID.SquareNine:
          if (trumpMode === TrumpMode.NoTrump) {
            return otherAnnounceIDs.every(a => ![AnnounceID.SquareAce, AnnounceID.SquareTen, AnnounceID.SquareKing, AnnounceID.SquareQueen, AnnounceID.SquareJack].includes(a));
          }
          return otherAnnounceIDs.every(a => a !== AnnounceID.SquareJack);
      }
      // throw if a case has been forgotten
      throw new Error('a case has been forgotten');
    case AnnounceGroup.Quinte:
      // handle other announces with higher announce groups
      if (otherAnnounceIDs.some(a => getAnnounceGroupByAnnounceID(a) === AnnounceGroup.Square)) {
        return false;
      }
      // handle other announces with lower announce groups
      if (otherAnnounceIDs.every(a => getAnnounceGroupByAnnounceID(a) !== AnnounceGroup.Quinte)) {
        return true;
      }
      // handle same announce group
      switch (announceID) {
        case AnnounceID.QuinteAceSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return true;
          }

          return otherAnnounceIDs.some(a => [AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart].includes(a)) ? null : true;
        case AnnounceID.QuinteAceDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return true;
          }

          return otherAnnounceIDs.some(a => [AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart].includes(a)) ? null : true;
        case AnnounceID.QuinteAceClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return true;
          }

          return otherAnnounceIDs.some(a => [AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceHeart].includes(a)) ? null : true;
        case AnnounceID.QuinteAceHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return true;
          }

          return otherAnnounceIDs.some(a => [AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub].includes(a)) ? null : true;
        case AnnounceID.QuinteKingSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart].includes(a)) ? null : true);
        case AnnounceID.QuinteKingDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart].includes(a)) ? null : true);
        case AnnounceID.QuinteKingClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingHeart].includes(a)) ? null : true);
        case AnnounceID.QuinteKingHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub].includes(a)) ? null : true);
        case AnnounceID.QuinteQueenSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
              AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
            AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuinteQueenDiamond, AnnounceID.QuinteQueenClub, AnnounceID.QuinteQueenHeart].includes(a)) ? null : true);
        case AnnounceID.QuinteQueenDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
              AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
            AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuinteQueenSpade, AnnounceID.QuinteQueenClub, AnnounceID.QuinteQueenHeart].includes(a)) ? null : true);
        case AnnounceID.QuinteQueenClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
              AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
            AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuinteQueenSpade, AnnounceID.QuinteQueenDiamond, AnnounceID.QuinteQueenHeart].includes(a)) ? null : true);
        case AnnounceID.QuinteQueenHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
              AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
            AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuinteQueenSpade, AnnounceID.QuinteQueenDiamond, AnnounceID.QuinteQueenClub].includes(a)) ? null : true);
        case AnnounceID.QuinteJackSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
              AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
              AnnounceID.QuinteQueenSpade, AnnounceID.QuinteQueenDiamond, AnnounceID.QuinteQueenClub, AnnounceID.QuinteQueenHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
            AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
            AnnounceID.QuinteQueenSpade, AnnounceID.QuinteQueenDiamond, AnnounceID.QuinteQueenClub, AnnounceID.QuinteQueenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuinteJackDiamond, AnnounceID.QuinteJackClub, AnnounceID.QuinteJackHeart].includes(a)) ? null : true);
        case AnnounceID.QuinteJackDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
              AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
              AnnounceID.QuinteQueenSpade, AnnounceID.QuinteQueenDiamond, AnnounceID.QuinteQueenClub, AnnounceID.QuinteQueenHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
            AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
            AnnounceID.QuinteQueenSpade, AnnounceID.QuinteQueenDiamond, AnnounceID.QuinteQueenClub, AnnounceID.QuinteQueenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuinteJackSpade, AnnounceID.QuinteJackClub, AnnounceID.QuinteJackHeart].includes(a)) ? null : true);
        case AnnounceID.QuinteJackClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
              AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
              AnnounceID.QuinteQueenSpade, AnnounceID.QuinteQueenDiamond, AnnounceID.QuinteQueenClub, AnnounceID.QuinteQueenHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
            AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
            AnnounceID.QuinteQueenSpade, AnnounceID.QuinteQueenDiamond, AnnounceID.QuinteQueenClub, AnnounceID.QuinteQueenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuinteJackSpade, AnnounceID.QuinteJackDiamond, AnnounceID.QuinteJackHeart].includes(a)) ? null : true);
        case AnnounceID.QuinteJackHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
              AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
              AnnounceID.QuinteQueenSpade, AnnounceID.QuinteQueenDiamond, AnnounceID.QuinteQueenClub, AnnounceID.QuinteQueenHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuinteAceSpade, AnnounceID.QuinteAceDiamond, AnnounceID.QuinteAceClub, AnnounceID.QuinteAceHeart,
            AnnounceID.QuinteKingSpade, AnnounceID.QuinteKingDiamond, AnnounceID.QuinteKingClub, AnnounceID.QuinteKingHeart,
            AnnounceID.QuinteQueenSpade, AnnounceID.QuinteQueenDiamond, AnnounceID.QuinteQueenClub, AnnounceID.QuinteQueenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuinteJackSpade, AnnounceID.QuinteJackDiamond, AnnounceID.QuinteJackClub].includes(a)) ? null : true);
      }
      // throw if a case has been forgotten
      throw new Error('a case has been forgotten');
    case AnnounceGroup.Quarte:
      // handle other announces with higher announce groups
      if (otherAnnounceIDs.some(a => [AnnounceGroup.Square, AnnounceGroup.Quinte].includes(getAnnounceGroupByAnnounceID(a)))) {
        return false;
      }
      // handle other announces with lower announce groups
      if (otherAnnounceIDs.every(a => getAnnounceGroupByAnnounceID(a) !== AnnounceGroup.Quarte)) {
        return true;
      }
      // handle same announce group
      switch (announceID) {
        case AnnounceID.QuarteAceSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return true;
          }

          return otherAnnounceIDs.some(a => [AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart].includes(a)) ? null : true;
        case AnnounceID.QuarteAceDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return true;
          }

          return otherAnnounceIDs.some(a => [AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart].includes(a)) ? null : true;
        case AnnounceID.QuarteAceClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return true;
          }

          return otherAnnounceIDs.some(a => [AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceHeart].includes(a)) ? null : true;
        case AnnounceID.QuarteAceHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return true;
          }

          return otherAnnounceIDs.some(a => [AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub].includes(a)) ? null : true;
        case AnnounceID.QuarteKingSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart].includes(a)) ? null : true);
        case AnnounceID.QuarteKingDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart].includes(a)) ? null : true);
        case AnnounceID.QuarteKingClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingHeart].includes(a)) ? null : true);
        case AnnounceID.QuarteKingHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub].includes(a)) ? null : true);
        case AnnounceID.QuarteQueenSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
              AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart].includes(a)) ? null : true);
        case AnnounceID.QuarteQueenDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
              AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart].includes(a)) ? null : true);
        case AnnounceID.QuarteQueenClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
              AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenHeart].includes(a)) ? null : true);
        case AnnounceID.QuarteQueenHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
              AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub].includes(a)) ? null : true);
        case AnnounceID.QuarteJackSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
              AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
              AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
            AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteJackDiamond, AnnounceID.QuarteJackClub, AnnounceID.QuarteJackHeart].includes(a)) ? null : true);
        case AnnounceID.QuarteJackDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
              AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
              AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
            AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteJackSpade, AnnounceID.QuarteJackClub, AnnounceID.QuarteJackHeart].includes(a)) ? null : true);
        case AnnounceID.QuarteJackClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
              AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
              AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
            AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteJackSpade, AnnounceID.QuarteJackDiamond, AnnounceID.QuarteJackHeart].includes(a)) ? null : true);
        case AnnounceID.QuarteJackHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
              AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
              AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
            AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteJackSpade, AnnounceID.QuarteJackDiamond, AnnounceID.QuarteJackClub].includes(a)) ? null : true);
        case AnnounceID.QuarteTenSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
              AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
              AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
              AnnounceID.QuarteJackSpade, AnnounceID.QuarteJackDiamond, AnnounceID.QuarteJackClub, AnnounceID.QuarteJackHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
            AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
            AnnounceID.QuarteJackSpade, AnnounceID.QuarteJackDiamond, AnnounceID.QuarteJackClub, AnnounceID.QuarteJackHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteTenDiamond, AnnounceID.QuarteTenClub, AnnounceID.QuarteTenHeart].includes(a)) ? null : true);
        case AnnounceID.QuarteTenDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
              AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
              AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
              AnnounceID.QuarteJackSpade, AnnounceID.QuarteJackDiamond, AnnounceID.QuarteJackClub, AnnounceID.QuarteJackHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
            AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
            AnnounceID.QuarteJackSpade, AnnounceID.QuarteJackDiamond, AnnounceID.QuarteJackClub, AnnounceID.QuarteJackHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteTenSpade, AnnounceID.QuarteTenClub, AnnounceID.QuarteTenHeart].includes(a)) ? null : true);
        case AnnounceID.QuarteTenClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
              AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
              AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
              AnnounceID.QuarteJackSpade, AnnounceID.QuarteJackDiamond, AnnounceID.QuarteJackClub, AnnounceID.QuarteJackHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
            AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
            AnnounceID.QuarteJackSpade, AnnounceID.QuarteJackDiamond, AnnounceID.QuarteJackClub, AnnounceID.QuarteJackHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteTenSpade, AnnounceID.QuarteTenDiamond, AnnounceID.QuarteTenHeart].includes(a)) ? null : true);
        case AnnounceID.QuarteTenHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
              AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
              AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
              AnnounceID.QuarteJackSpade, AnnounceID.QuarteJackDiamond, AnnounceID.QuarteJackClub, AnnounceID.QuarteJackHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.QuarteAceSpade, AnnounceID.QuarteAceDiamond, AnnounceID.QuarteAceClub, AnnounceID.QuarteAceHeart,
            AnnounceID.QuarteKingSpade, AnnounceID.QuarteKingDiamond, AnnounceID.QuarteKingClub, AnnounceID.QuarteKingHeart,
            AnnounceID.QuarteQueenSpade, AnnounceID.QuarteQueenDiamond, AnnounceID.QuarteQueenClub, AnnounceID.QuarteQueenHeart,
            AnnounceID.QuarteJackSpade, AnnounceID.QuarteJackDiamond, AnnounceID.QuarteJackClub, AnnounceID.QuarteJackHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.QuarteTenSpade, AnnounceID.QuarteTenDiamond, AnnounceID.QuarteTenClub].includes(a)) ? null : true);
      }
      // throw if a case has been forgotten
      throw new Error('a case has been forgotten');
    case AnnounceGroup.Tierce:
      // handle other announces with higher announce groups
      if (otherAnnounceIDs.some(a => [AnnounceGroup.Square, AnnounceGroup.Quinte, AnnounceGroup.Quarte].includes(getAnnounceGroupByAnnounceID(a)))) {
        return false;
      }
      // handle same announce group
      switch (announceID) {
        case AnnounceID.TierceAceSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return true;
          }

          return otherAnnounceIDs.some(a => [AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart].includes(a)) ? null : true;
        case AnnounceID.TierceAceDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return true;
          }

          return otherAnnounceIDs.some(a => [AnnounceID.TierceAceSpade, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart].includes(a)) ? null : true;
        case AnnounceID.TierceAceClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return true;
          }

          return otherAnnounceIDs.some(a => [AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceHeart].includes(a)) ? null : true;
        case AnnounceID.TierceAceHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return true;
          }

          return otherAnnounceIDs.some(a => [AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub].includes(a)) ? null : true;
        case AnnounceID.TierceKingSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart].includes(a)) ? null : true);
        case AnnounceID.TierceKingDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceKingSpade, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart].includes(a)) ? null : true);
        case AnnounceID.TierceKingClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingHeart].includes(a)) ? null : true);
        case AnnounceID.TierceKingHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub].includes(a)) ? null : true);
        case AnnounceID.TierceQueenSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart].includes(a)) ? null : true);
        case AnnounceID.TierceQueenDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart].includes(a)) ? null : true);
        case AnnounceID.TierceQueenClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenHeart].includes(a)) ? null : true);
        case AnnounceID.TierceQueenHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub].includes(a)) ? null : true);
        case AnnounceID.TierceJackSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
              AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart].includes(a)) ? null : true);
        case AnnounceID.TierceJackDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
              AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceJackSpade, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart].includes(a)) ? null : true);
        case AnnounceID.TierceJackClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
              AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackHeart].includes(a)) ? null : true);
        case AnnounceID.TierceJackHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
              AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub].includes(a)) ? null : true);
        case AnnounceID.TierceTenSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
              AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
              AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
            AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceTenDiamond, AnnounceID.TierceTenClub, AnnounceID.TierceTenHeart].includes(a)) ? null : true);
        case AnnounceID.TierceTenDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
              AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
              AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
            AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceTenSpade, AnnounceID.TierceTenClub, AnnounceID.TierceTenHeart].includes(a)) ? null : true);
        case AnnounceID.TierceTenClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
              AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
              AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
            AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceTenSpade, AnnounceID.TierceTenDiamond, AnnounceID.TierceTenHeart].includes(a)) ? null : true);
        case AnnounceID.TierceTenHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
              AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
              AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
            AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceTenSpade, AnnounceID.TierceTenDiamond, AnnounceID.TierceTenClub].includes(a)) ? null : true);
        case AnnounceID.TierceNineSpade:
          if (trumpMode === TrumpMode.TrumpSpade) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
              AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
              AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
              AnnounceID.TierceTenSpade, AnnounceID.TierceTenDiamond, AnnounceID.TierceTenClub, AnnounceID.TierceTenHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
            AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
            AnnounceID.TierceTenSpade, AnnounceID.TierceTenDiamond, AnnounceID.TierceTenClub, AnnounceID.TierceTenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceNineDiamond, AnnounceID.TierceNineClub, AnnounceID.TierceNineHeart].includes(a)) ? null : true);
        case AnnounceID.TierceNineDiamond:
          if (trumpMode === TrumpMode.TrumpDiamond) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
              AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
              AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
            AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
            AnnounceID.TierceTenSpade, AnnounceID.TierceTenDiamond, AnnounceID.TierceTenClub, AnnounceID.TierceTenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceNineSpade, AnnounceID.TierceNineClub, AnnounceID.TierceNineHeart].includes(a)) ? null : true);
        case AnnounceID.TierceNineClub:
          if (trumpMode === TrumpMode.TrumpClub) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
              AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
              AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
              AnnounceID.TierceTenSpade, AnnounceID.TierceTenDiamond, AnnounceID.TierceTenClub, AnnounceID.TierceTenHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
            AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
            AnnounceID.TierceTenSpade, AnnounceID.TierceTenDiamond, AnnounceID.TierceTenClub, AnnounceID.TierceTenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceNineSpade, AnnounceID.TierceNineDiamond, AnnounceID.TierceNineHeart].includes(a)) ? null : true);
        case AnnounceID.TierceNineHeart:
          if (trumpMode === TrumpMode.TrumpHeart) {
            return otherAnnounceIDs.every(a => ![
              AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
              AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
              AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
              AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
              AnnounceID.TierceTenSpade, AnnounceID.TierceTenDiamond, AnnounceID.TierceTenClub, AnnounceID.TierceTenHeart,
            ].includes(a));
          }

          return otherAnnounceIDs.some(a => [
            AnnounceID.TierceAceSpade, AnnounceID.TierceAceDiamond, AnnounceID.TierceAceClub, AnnounceID.TierceAceHeart,
            AnnounceID.TierceKingSpade, AnnounceID.TierceKingDiamond, AnnounceID.TierceKingClub, AnnounceID.TierceKingHeart,
            AnnounceID.TierceQueenSpade, AnnounceID.TierceQueenDiamond, AnnounceID.TierceQueenClub, AnnounceID.TierceQueenHeart,
            AnnounceID.TierceJackSpade, AnnounceID.TierceJackDiamond, AnnounceID.TierceJackClub, AnnounceID.TierceJackHeart,
            AnnounceID.TierceTenSpade, AnnounceID.TierceTenDiamond, AnnounceID.TierceTenClub, AnnounceID.TierceTenHeart,
          ].includes(a)) ? false : (otherAnnounceIDs.some(a => [AnnounceID.TierceNineSpade, AnnounceID.TierceNineDiamond, AnnounceID.TierceNineClub].includes(a)) ? null : true);
      }
      // throw if a case has been forgotten
      throw new Error('a case has been forgotten');
  }
};
const transformPlayerAnnounceToSecretPlayerAnnounce = (playerAnnounce: PlayerAnnounce): SecretPlayerAnnounce => ({
  announce: playerAnnounce.isCardsDisplayable ? playerAnnounce.announce : undefined,
  announceGroup: playerAnnounce.isSaid ? playerAnnounce.announceGroup : undefined,
  isSaid: playerAnnounce.isSaid,
  isCardsDisplayable: playerAnnounce.isCardsDisplayable,
});

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
export const howManyCards = getCards().length;
export const isSameCard = (card: Card | undefined, otherCard: Card | undefined): boolean => {
  if (!card || !otherCard) {
    return false;
  }

  return card.color === otherCard.color && card.name === otherCard.name;
};
export const cardsContainCard = (cards: Card[], card: Card): boolean => cards.some(c => isSameCard(c, card));
export const isCardBeatingTheOtherCards = (card: Card, otherCards: Card[], trumpMode: TrumpMode, firstCardColor: CardColor): boolean => {
  if (!otherCards.length) {
    return true;
  }

  const cardColorAssociatedToTrumpMode = getCardColorAssociatedToTrumpMode(trumpMode);

  if (card.color === cardColorAssociatedToTrumpMode) {
    switch (card.name) {
      case CardName.Jack:
        return true;
      case CardName.Nine:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || name !== CardName.Jack);
      case CardName.Ace:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || ![CardName.Jack, CardName.Nine].includes(name));
      case CardName.Ten:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || ![CardName.Jack, CardName.Nine, CardName.Ace].includes(name));
      case CardName.King:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || ![CardName.Jack, CardName.Nine, CardName.Ace, CardName.Ten].includes(name));
      case CardName.Queen:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || ![CardName.Jack, CardName.Nine, CardName.Ace, CardName.Ten, CardName.King].includes(name));
      case CardName.Eight:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || ![CardName.Jack, CardName.Nine, CardName.Ace, CardName.Ten, CardName.King, CardName.Queen].includes(name));
      case CardName.Seven:
        return otherCards.every(({color}) => color !== cardColorAssociatedToTrumpMode);
    }
  }

  if (card.color !== firstCardColor) {
    return false;
  }

  switch (card.name) {
    case CardName.Ace:
      return otherCards.every(({ color }) => color !== cardColorAssociatedToTrumpMode);
    case CardName.Ten:
      return otherCards.every(({ color, name }) => {
        if (color === cardColorAssociatedToTrumpMode) {
          return false;
        }

        return !(color === firstCardColor && name === CardName.Ace);
      });
    case CardName.King:
      return otherCards.every(({ color, name }) => {
        if (color === cardColorAssociatedToTrumpMode) {
          return false;
        }

        return !(color === firstCardColor && [CardName.Ace, CardName.Ten].includes(name));
      });
    case CardName.Queen:
      return otherCards.every(({ color, name }) => {
        if (color === cardColorAssociatedToTrumpMode) {
          return false;
        }

        return !(color === firstCardColor && [CardName.Ace, CardName.Ten, CardName.King].includes(name));
      });
    case CardName.Jack:
      return otherCards.every(({ color, name }) => {
        if (color === cardColorAssociatedToTrumpMode) {
          return false;
        }

        return !(color === firstCardColor && [CardName.Ace, CardName.Ten, CardName.King, CardName.Queen].includes(name));
      });
    case CardName.Nine:
      return otherCards.every(({ color, name }) => {
        if (color === cardColorAssociatedToTrumpMode) {
          return false;
        }

        return !(color === firstCardColor && [CardName.Ace, CardName.Ten, CardName.King, CardName.Queen, CardName.Jack].includes(name));
      });
    case CardName.Eight:
      return otherCards.every(({ color, name }) => {
        if (color === cardColorAssociatedToTrumpMode) {
          return false;
        }

        return !(color === firstCardColor && [CardName.Ace, CardName.Ten, CardName.King, CardName.Queen, CardName.Jack, CardName.Nine].includes(name));
      });
    case CardName.Seven:
      return otherCards.every(({ color }) => {
        if (color === cardColorAssociatedToTrumpMode) {
          return false;
        }

        return !(color === firstCardColor);
      });
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
const getDefaultPlayersCardPlayedInCurrentTurn = () => ({
  [PlayerID.North]: undefined,
  [PlayerID.East]: undefined,
  [PlayerID.South]: undefined,
  [PlayerID.West]: undefined,
});
const getDefaultPlayersCardPlayedInPreviousTurn = () => undefined;
const getDefaultPlayersAnnouncesDisplayedInCurrentTurn = () => ({
  [PlayerID.North]: [],
  [PlayerID.East]: [],
  [PlayerID.South]: [],
  [PlayerID.West]: [],
});
const getDefaultPlayersSaid = () => ({
  [PlayerID.North]: undefined,
  [PlayerID.East]: undefined,
  [PlayerID.South]: undefined,
  [PlayerID.West]: undefined,
});
const getDefaultLastPlayersTakeSaid = () => ({
  [PlayerID.North]: undefined,
  [PlayerID.East]: undefined,
  [PlayerID.South]: undefined,
  [PlayerID.West]: undefined,
});

const resolve_shuffleCards = (ctx: Context<PlayerID, PhaseID>): GameState['__shuffleCards'] => {
  if (process.env.APP_shuffleCards === 'returnSame') {
    return (cards) => cards;
  }

  return ctx.random.Shuffle;
};
const resolve_howManyPointsATeamMustReachToEndTheGame = (ctx: Context<PlayerID, PhaseID>): GameState['howManyPointsATeamMustReachToEndTheGame'] => {
  const fromEnv = Number(process.env.APP_howManyPointsATeamMustReachToEndTheGame);
  if (fromEnv > 0) {
    return fromEnv;
  }

  return 2000;
};

export const getSetupGameState = (ctx: Context<PlayerID, PhaseID>): GameState => {
  const dealer = PlayerID.North;
  const nextDealer = dealer;
  const availableCards = getCards();
  const howManyCardsToDealToEachPlayerBeforeTalking = 6;
  const howManyCardsToDealToEachPlayerAfterTalking = Math.floor(howManyCards / howManyPlayers) - howManyCardsToDealToEachPlayerBeforeTalking;

  return {
    __isWaitingBeforeMovingToNextPhase: false,
    __canMoveToNextPhase: false,
    __shuffleCards: resolve_shuffleCards(ctx),
    howManyPointsATeamMustReachToEndTheGame: resolve_howManyPointsATeamMustReachToEndTheGame(ctx),
    howManyCardsToDealToEachPlayerBeforeTalking,
    howManyCardsToDealToEachPlayerAfterTalking,
    teamsPoints: { [TeamID.NorthSouth]: 0, [TeamID.EastWest]: 0 },
    history: { rounds: [] },
    availableCards,
    playersCards: getDefaultPlayersCards(),
    wonTeamsCards: getDefaultWonTeamsCards(),
    dealer,
    nextDealer,
    attackingTeam: TeamID.NorthSouth,
    defensingTeam: TeamID.EastWest,
    playersSaid: getDefaultPlayersSaid(),
    lastPlayersTakeSaid: getDefaultLastPlayersTakeSaid(),
    numberOfSuccessiveSkipSaid: 0,
    currentSayTake: undefined,
    belotAnnounce: undefined,
    playersAnnounces: getDefaultPlayersAnnounces(),
    firstPlayerInCurrentTurn: nextDealer,
    playersCardPlayedInCurrentTurn: getDefaultPlayersCardPlayedInCurrentTurn(),
    playersCardPlayedInPreviousTurn: getDefaultPlayersCardPlayedInPreviousTurn(),
    playersAnnouncesDisplayedInCurrentTurn: getDefaultPlayersAnnouncesDisplayedInCurrentTurn(),
  };
};
export const getTurnOrder = (firstPlayerID: PlayerID): PlayerID[] => {
  switch (firstPlayerID) {
    case PlayerID.North:
      return [PlayerID.North, PlayerID.West, PlayerID.South, PlayerID.East];
    case PlayerID.East:
      return [PlayerID.East, PlayerID.North, PlayerID.West, PlayerID.South];
    case PlayerID.South:
      return [PlayerID.South, PlayerID.East, PlayerID.North, PlayerID.West];
    case PlayerID.West:
      return [PlayerID.West, PlayerID.South, PlayerID.East, PlayerID.North];
    default:
      throw new Error(`Unsupported playerID [${firstPlayerID}]`);
  }
};
const mustMoveFromTalkPhaseToPlayCardsPhase = (currentSayTake: SayTake | undefined, numberOfSuccessiveSkipSaid: number): boolean => {
  return Boolean(
    currentSayTake
    && (
      // 3 successive skips
      numberOfSuccessiveSkipSaid >= (howManyPlayers - 1)
      // surcoinche
      || currentSayTake.sayCoincheLevel === 'surcoinche'
    ),
  );
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
export const game: GameConfig<GameState, GameStatePlayerView, Moves, PlayerID, PhaseID> = {
  name: GameName.Coinche,
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
      onBegin: (G) => {
        // set new dealer
        const dealer = G.nextDealer;
        const nextDealer = getTurnOrder(dealer)[1];

        // reset round state
        G.playersCards = getDefaultPlayersCards();
        G.wonTeamsCards = getDefaultWonTeamsCards();
        G.playersSaid = getDefaultPlayersSaid();
        G.lastPlayersTakeSaid = getDefaultLastPlayersTakeSaid();
        G.belotAnnounce = undefined;
        G.playersAnnounces = getDefaultPlayersAnnounces();
        G.numberOfSuccessiveSkipSaid = 0;
        G.currentSayTake = undefined;
        G.dealer = dealer;
        G.nextDealer = nextDealer;
        G.firstPlayerInCurrentTurn = nextDealer;
        G.playersCardPlayedInPreviousTurn = getDefaultPlayersCardPlayedInPreviousTurn();
        G.availableCards = G.__shuffleCards(getCards());

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
      moves: {
        endTurn,
        waitBeforeMovingToNextPhase,
        moveToNextPhase,
        saySkip,
        sayTake,
        sayCoinche,
      },
      endIf: (G) => {
        if (G.__canMoveToNextPhase && G.numberOfSuccessiveSkipSaid >= howManyPlayers) {
          return { next: PhaseID.Deal };
        }

        if (G.__canMoveToNextPhase && mustMoveFromTalkPhaseToPlayCardsPhase(G.currentSayTake, G.numberOfSuccessiveSkipSaid)) {
          return { next: PhaseID.PlayCards };
        }

        return false;
      },
      onEnd: (G) => {
        G.__canMoveToNextPhase = false;

        if (
          G.numberOfSuccessiveSkipSaid < howManyPlayers
          && mustMoveFromTalkPhaseToPlayCardsPhase(G.currentSayTake, G.numberOfSuccessiveSkipSaid)
        ) {
          getTurnOrder(G.nextDealer).forEach(playerID => {
            // deal remaining cards
            for (let i = 0; i < G.howManyCardsToDealToEachPlayerAfterTalking; i++) {
              const card = G.availableCards.pop();
              G.playersCards[playerID].push(card!);
            }
            // list available announces
            G.playersAnnounces[playerID] = getAnnouncesForCards(G.playersCards[playerID], G.currentSayTake!.trumpMode).map(announce => ({ player: playerID, announce, announceGroup: getAnnounceGroupByAnnounceID(announce.id), isCardsDisplayable: false, isSaid: false }));
          });

          // set belot announce if available
          const belotOwner = getBelotOwner(G.currentSayTake!.trumpMode, G.playersCards);
          if (belotOwner) {
            G.belotAnnounce = {id: 'Belot', owner: belotOwner, ownerHasChosen: false, isSaid: false};
          }

          // add round to history
          G.history.rounds.push({
            sayTake: G.currentSayTake!,
            turns: [],
            displayableAnnounces: [],
          });
        }
      },
    },
    [PhaseID.PlayCards]: {
      moves: {
        endTurn,
        waitBeforeMovingToNextPhase,
        moveToNextPhase,
        sayAnnounce,
        sayBelotOrNot,
        playCard,
      },
      turn: {
        ...defaultTurnConfig,
        onBegin: (G, ctx) => {
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
                G.currentSayTake!.trumpMode,
                G.playersCardPlayedInCurrentTurn,
                G.firstPlayerInCurrentTurn,
                playerPartner,
              ),
          }));
          G.playersCards = {
            [PlayerID.North]: setCardsPlayability(G.playersCards[PlayerID.North], PlayerID.North === player),
            [PlayerID.East]: setCardsPlayability(G.playersCards[PlayerID.East], PlayerID.East === player),
            [PlayerID.South]: setCardsPlayability(G.playersCards[PlayerID.South], PlayerID.South === player),
            [PlayerID.West]: setCardsPlayability(G.playersCards[PlayerID.West], PlayerID.West === player),
          };
        },
        onEnd: (G) => {
          // set said announces displayability
          const allSaidPlayerAnnounces = [...G.playersAnnounces[PlayerID.North], ...G.playersAnnounces[PlayerID.East], ...G.playersAnnounces[PlayerID.South], ...G.playersAnnounces[PlayerID.West]].filter(a => a.isSaid);
          if (
            allSaidPlayerAnnounces.length
            && allSaidPlayerAnnounces.every(a => !a.isCardsDisplayable)
            && G.playersCards[G.firstPlayerInCurrentTurn].length <= (G.currentSayTake!.trumpMode === TrumpMode.NoTrump ? 5 : 6)
          ) {
            const winningAnnounces = getWinningAnnounces(allSaidPlayerAnnounces, G.currentSayTake!.trumpMode);
            const bestAnnounceBelongsToNorthSouthTeam = winningAnnounces.some(a => [PlayerID.North, PlayerID.South].includes(a.player));
            const bestAnnounceBelongsToEastWestTeam = winningAnnounces.some(a => [PlayerID.East, PlayerID.West].includes(a.player));
            if (
              (bestAnnounceBelongsToNorthSouthTeam && !bestAnnounceBelongsToEastWestTeam)
              || (!bestAnnounceBelongsToNorthSouthTeam && bestAnnounceBelongsToEastWestTeam)
            ) {
              const northPlayerAnnounces = G.playersAnnounces[PlayerID.North].map(pa => ({ ...pa, isCardsDisplayable: pa.isSaid && bestAnnounceBelongsToNorthSouthTeam }));
              const eastPlayerAnnounces = G.playersAnnounces[PlayerID.East].map(pa => ({ ...pa, isCardsDisplayable: pa.isSaid && bestAnnounceBelongsToEastWestTeam }));
              const southPlayerAnnounces = G.playersAnnounces[PlayerID.South].map(pa => ({ ...pa, isCardsDisplayable: pa.isSaid && bestAnnounceBelongsToNorthSouthTeam }));
              const westPlayerAnnounces = G.playersAnnounces[PlayerID.West].map(pa => ({ ...pa, isCardsDisplayable: pa.isSaid && bestAnnounceBelongsToEastWestTeam }));
              G.playersAnnounces = {
                [PlayerID.North]: northPlayerAnnounces,
                [PlayerID.East]: eastPlayerAnnounces,
                [PlayerID.South]: southPlayerAnnounces,
                [PlayerID.West]: westPlayerAnnounces,
              };
              G.playersAnnouncesDisplayedInCurrentTurn = {
                [PlayerID.North]: [
                  ...G.playersAnnouncesDisplayedInCurrentTurn[PlayerID.North],
                  ...northPlayerAnnounces.filter(a => a.isCardsDisplayable).map(a => ({ id: a.announce.id })),
                ],
                [PlayerID.East]: [
                  ...G.playersAnnouncesDisplayedInCurrentTurn[PlayerID.East],
                  ...eastPlayerAnnounces.filter(a => a.isCardsDisplayable).map(a => ({ id: a.announce.id })),
                ],
                [PlayerID.South]: [
                  ...G.playersAnnouncesDisplayedInCurrentTurn[PlayerID.South],
                  ...southPlayerAnnounces.filter(a => a.isCardsDisplayable).map(a => ({ id: a.announce.id })),
                ],
                [PlayerID.West]: [
                  ...G.playersAnnouncesDisplayedInCurrentTurn[PlayerID.West],
                  ...westPlayerAnnounces.filter(a => a.isCardsDisplayable).map(a => ({ id: a.announce.id })),
                ],
              };
            }
          }
        },
      },
      endIf: (G) => {
        if (G.__canMoveToNextPhase && Object.values(G.playersCardPlayedInCurrentTurn).every(card => card !== undefined)) {
          return { next: PhaseID.CountPoints };
        }

        return false;
      },
      onEnd: (G) => {
        G.__canMoveToNextPhase = false;
      },
    },
    [PhaseID.CountPoints]: {
      onBegin: (G, ctx) => {
        if (!G.currentSayTake) {
          throw new Error();
        }

        // clear playersAnnouncesDisplayedInCurrentTurn
        G.playersAnnouncesDisplayedInCurrentTurn = getDefaultPlayersAnnouncesDisplayedInCurrentTurn();

        const playedCards = Object.values(G.playersCardPlayedInCurrentTurn).filter(c => c !== undefined) as Card[];
        const winningCard = getWinningCard(
          playedCards,
          G.currentSayTake.trumpMode,
          G.playersCardPlayedInCurrentTurn[G.firstPlayerInCurrentTurn]!.color,
        );
        const turnWinner = getTurnWinner(G.playersCardPlayedInCurrentTurn, winningCard);
        const turnWinnerTeam = getPlayerTeam(turnWinner);

        // add turn data to round history
        G.history.rounds[G.history.rounds.length - 1].turns.push({
          winningPlayer: turnWinner,
          winningTeam: turnWinnerTeam,
          playedCards,
        });

        // fill cards played in previous turn
        G.playersCardPlayedInPreviousTurn = {...G.playersCardPlayedInCurrentTurn} as Record<PlayerID, Card>; // cast because G.playersCardPlayedInCurrentTurn can't contain "undefined" values at this point

        // move played cards to turnWinner team cards
        playedCards.forEach(card => G.wonTeamsCards[turnWinnerTeam].push(card));
        G.playersCardPlayedInCurrentTurn = getDefaultPlayersCardPlayedInCurrentTurn();

        // turnWinner becomes next first player
        G.firstPlayerInCurrentTurn = turnWinner;

        // go to PlayCards phase if not all cards have been played
        if (Object.values(G.wonTeamsCards).reduce((acc, cards) => acc.concat(cards), []).length < howManyCards) {
          G.__forcedNextPhase = PhaseID.PlayCards;
          return;
        }

        const [roundWinningTeam, newAttackingTeamPoints, newDefensingTeamPoints] = getWinningTeamAndNewAttackingTeamPointsAndDefensingTeamPointsAfterEndOfRound(
          G.teamsPoints[G.attackingTeam],
          G.attackingTeam,
          G.wonTeamsCards[G.attackingTeam],
          G.teamsPoints[G.defensingTeam],
          G.defensingTeam,
          G.wonTeamsCards[G.defensingTeam],
          G.currentSayTake,
          turnWinnerTeam,
          [...G.playersAnnounces[PlayerID.North], ...G.playersAnnounces[PlayerID.South]].filter(a => a.isCardsDisplayable).map(a => a.announce),
          [...G.playersAnnounces[PlayerID.East], ...G.playersAnnounces[PlayerID.West]].filter(a => a.isCardsDisplayable).map(a => a.announce),
          G.belotAnnounce,
        );
        G.teamsPoints[G.attackingTeam] = newAttackingTeamPoints;
        G.teamsPoints[G.defensingTeam] = newDefensingTeamPoints;

        // add end of round data to history
        G.history.rounds[G.history.rounds.length - 1].winningTeam = roundWinningTeam;
        G.history.rounds[G.history.rounds.length - 1].teamPointsAtTheEndOfRound = {
          [TeamID.NorthSouth]: G.attackingTeam === TeamID.NorthSouth ? newAttackingTeamPoints : newDefensingTeamPoints,
          [TeamID.EastWest]: G.attackingTeam === TeamID.EastWest ? newAttackingTeamPoints : newDefensingTeamPoints,
        };
        G.history.rounds[G.history.rounds.length - 1].displayableAnnounces = [
          ...(Object.entries(G.playersAnnounces) as [PlayerID, PlayerAnnounce[]][]).reduce<GameHistory['rounds'][0]['displayableAnnounces']>((acc, [playerID, playerAnnounces]) => [
            ...acc,
            ...playerAnnounces.filter(a => a.isCardsDisplayable).map(a => ({
              id: a.announce.id,
              cards: a.announce.cards,
              owner: playerID,
              ownerTeam: getPlayerTeam(playerID),
            })),
          ], []),
          ...(G.belotAnnounce ? [{
            id: G.belotAnnounce.id,
            cards: getBelotCards(G.currentSayTake.trumpMode),
            owner: G.belotAnnounce.owner,
            ownerTeam: getPlayerTeam(G.belotAnnounce.owner),
          }] : []),
        ];

        // go to Deal phase if the end of the game has not been reached
        const gameWinnerTeam = getGameWinnerTeam(G.teamsPoints, G.howManyPointsATeamMustReachToEndTheGame, G.wonTeamsCards);
        if (gameWinnerTeam === undefined) {
          G.__forcedNextPhase = PhaseID.Deal;
          return;
        }

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
};
