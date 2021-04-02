import {BoardProps} from 'boardgame.io/react';
import {GameStatePlayerView, Moves, PhaseID, PlayerID} from '../../../../../shared/coinche';

export const constructorForGetPlayerNameByID = (matchData: BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>['matchData']) => (ID: PlayerID): string => {
  const defaultPlayerName = '\u00A0';
  if (!matchData) {
    return defaultPlayerName;
  }

  const playerMetadata = matchData.find(m => (String(m.id) as PlayerID) === ID);
  if (!playerMetadata) {
    return defaultPlayerName;
  }

  return playerMetadata.name;
};
