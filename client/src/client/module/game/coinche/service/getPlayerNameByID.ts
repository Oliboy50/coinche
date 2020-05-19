import {BoardProps} from 'boardgame.io/react';
import {GameStatePlayerView, Moves, PhaseID, PlayerID} from '../../../../../shared/coinche';

export const constructorForGetPlayerNameByID = (gameMetadata: BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>['gameMetadata']) => (ID: PlayerID): string => {
  const defaultPlayerName = '\u00A0';
  if (!gameMetadata) {
    return defaultPlayerName;
  }

  const playerMetadata = gameMetadata.find(m => (String(m.id) as PlayerID) === ID);
  if (!playerMetadata) {
    return defaultPlayerName;
  }

  return playerMetadata.name;
};
