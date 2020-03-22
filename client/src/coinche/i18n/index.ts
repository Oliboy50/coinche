import {AnnounceGroup, AnnounceID, TrumpMode} from '../../shared/coinche';

type TeamType = 'partner' | 'opponent';
export type I18n = {
  teamType: Record<TeamType, string>;
  trumpMode: Record<TrumpMode, string>;
  announce: {
    id: Record<AnnounceID | 'Belot', string>;
    group: Record<AnnounceGroup, string>;
  };
  Info: {
    currentTeamScore: (teamType: TeamType, teamPoints: number, howManyPointsATeamMustReachToEndTheGame: number) => string;
    currentAttackingTeam: (teamType: TeamType) => string;
    currentGoal: (trumpMode: TrumpMode, expectedPoints: number) => string;
    announcesOf: (playerName: string) => string;
  },
  TalkMenu: {
    takeButton: string;
    skipButton: string;
  },
  PreviousCardsPlayedMenu: {
    displayPreviousCardsPlayed: string;
    doNotDisplayPreviousCardsPlayed: string;
  },
  PlayerSaid: {
    skip: string;
  },
  SayAnnounceMenu: {
    noAvailableAnnounce: string;
    sayAnnounceButton: string;
  },
};

export { fr } from './fr';
