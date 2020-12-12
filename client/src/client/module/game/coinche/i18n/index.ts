import {
  AnnounceGroup,
  AnnounceID,
  Card,
  ExpectedPoints,
  SayCoincheLevel,
  TrumpMode,
} from '../../../../../shared/coinche';
import {CardDisplay} from '../context/cardDisplay';

export interface I18n {
  trumpMode: Record<TrumpMode, string>;
  sayCoincheLevel: Record<SayCoincheLevel, string>;
  cardDisplay: Record<CardDisplay, string>;
  card: (card: Card) => string;
  announce: {
    id: Record<AnnounceID | 'Belot', string>;
    group: Record<AnnounceGroup, string>;
  };
  Info: {
    partnerTeam: string;
    opponentTeam: string;
    attackingPlayer: string;
    goal: string;
    announcesOf: (playerName: string) => string;
  };
  TalkMenu: {
    selectTrumpModePlaceholder: string;
    takeButton: string;
    skipButton: string;
    coincheButton: string;
    surcoincheButton: string;
  };
  PreviousCardsPlayedMenu: {
    displayPreviousCardsPlayed: string;
    doNotDisplayPreviousCardsPlayed: string;
  };
  PlayerSaid: {
    skip: string;
    coinche: string;
    surcoinche: string;
  };
  SayAnnounceMenu: {
    noAvailableAnnounce: string;
    sayAnnounceButton: string;
  };
  GoBackToLobby: {
    leave: string;
  };
  WinningTeamCongratulation: {
    congratsTo: (winners: string[]) => string;
    draw: string;
  };
  Options: {
    selectCardDisplay: string;
  };
  GameHistory: {
    attackingPlayer: string;
    goal: string;
    team: (teamName: string) => string;
    score: (points: number) => string;
    roundTitle: (roundNumber: number) => string;
    teamPointsAtTheEndOfRoundTitle: string;
    teamPointsAtTheEndOfRoundDetail: (currentTeamPointsAtTheEndOfRound: number, previousTeamPointsAtTheEndOfRound: number, currentTeamPointsMinusPreviousTeamPoints: number) => string;
    roundPointsSummaryTitle: string;
    roundPointsSummaryDetail: (currentPoints: number, expectedPoints: ExpectedPoints|undefined) => string;
    roundDetailToggleButtonHide: string;
    roundDetailToggleButtonShow: string;
    goalPointsTitle: string;
    goalPointsDetail: (pointsForExpectedPoints: number, goal: string) => string;
    cardsPointsTitle: string;
    endOfRoundPointsTitle: string;
    endOfRoundPointsDetail: (roundEndPoints: 0|10|100) => string;
    announcesPointsTitle: string;
    turnsDetailTitle: string;
    playedCards: (cardsName: string[]) => string;
    playedCardsPointsForPlayer: (points: number, playerName: string) => string;
    announcesDetailTitle: string;
    announceDetail: (announceName: string) => string;
    announcePointsForPlayer: (points: number, playerName: string) => string;
  };
}

export { fr } from './fr';
