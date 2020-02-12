import {AnnounceGroup, AnnounceId, TrumpMode} from '../../shared/coinche';

export type I18n = {
  trumpMode: Record<TrumpMode, string>;
  announce: {
    id: Record<AnnounceId, string>;
    group: Record<AnnounceGroup, string>;
  };
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
