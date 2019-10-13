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
  TalkMenu: {
    takeButton: 'Prendre',
    skipButton: 'Passer',
  },
};
