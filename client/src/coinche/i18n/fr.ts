import {I18n} from './index';
import {TrumpMode} from '../../shared/coinche';

export const fr: I18n = {
  trumpMode: {
    [TrumpMode.TrumpSpade]: 'Pique',
    [TrumpMode.TrumpDiamond]: 'Carreau',
    [TrumpMode.TrumpClub]: 'Trèfle',
    [TrumpMode.TrumpHeart]: 'Coeur',
    [TrumpMode.NoTrump]: 'Sans Atout',
  },
  PreviousCardsPlayedMenu: {
    displayPreviousCardsPlayed: 'Voir les cartes jouées au tour précédent',
    doNotDisplayPreviousCardsPlayed: 'Ne plus voir les cartes jouées au tour précédent',
  },
  TalkMenu: {
    takeButton: 'Prendre',
    skipButton: 'Passer',
  },
  PlayerSaid: {
    skip: 'Je passe',
  },
};
