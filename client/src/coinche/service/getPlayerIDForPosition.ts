import {getTurnOrder, PlayerID} from '../../shared/coinche';

export const getPlayerIDForPosition = (bottomPlayerID: PlayerID, position: 'top' | 'left' | 'right' | 'bottom'): PlayerID => {
  if (position === 'bottom') {
    return bottomPlayerID;
  }

  const turnOrder = getTurnOrder(bottomPlayerID);
  switch (position) {
    case 'right':
      return turnOrder[1];
    case 'top':
      return turnOrder[2];
    case 'left':
      return turnOrder[3];
  }
};
