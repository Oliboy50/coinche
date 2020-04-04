import {AnnounceGroup, AnnounceID, TrumpMode} from '../../shared/coinche';

export type I18n = {
  trumpMode: Record<TrumpMode, string>;
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
  },
  TalkMenu: {
    selectTrumpModePlaceholder: string;
    takeButton: string;
    skipButton: string;
    coincheButton: string;
    surcoincheButton: string;
  },
  PreviousCardsPlayedMenu: {
    displayPreviousCardsPlayed: string;
    doNotDisplayPreviousCardsPlayed: string;
  },
  PlayerSaid: {
    skip: string;
    coinche: string;
    surcoinche: string;
  },
  SayAnnounceMenu: {
    noAvailableAnnounce: string;
    sayAnnounceButton: string;
  },
};

export { fr } from './fr';
