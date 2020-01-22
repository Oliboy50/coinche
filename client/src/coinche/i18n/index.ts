import {TrumpMode} from '../../shared/coinche';

export type I18n = {
  trumpMode: Record<TrumpMode, string>;
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
};

export { fr } from './fr';
