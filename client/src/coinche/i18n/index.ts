import {AnnounceGroup, AnnounceId, TrumpMode} from '../../shared/coinche';

type TeamType = 'partner' | 'opponent';
export type I18n = {
  teamType: Record<TeamType, string>;
  trumpMode: Record<TrumpMode, string>;
  announce: {
    id: Record<AnnounceId, string>;
    group: Record<AnnounceGroup, string>;
  };
  Info: {
    currentTeamScore: (teamType: TeamType, teamPoints: number, howManyPointsATeamMustReachToEndTheGame: number) => string;
    currentAttackingTeam: (teamType: TeamType) => string;
    currentGoal: (trumpMode: TrumpMode, expectedPoints: number) => string;
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
