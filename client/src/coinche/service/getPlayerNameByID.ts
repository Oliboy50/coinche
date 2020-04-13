import {BoardProps} from 'boardgame.io/react';
import {GameStatePlayerView, Moves, PhaseID, PlayerID} from '../../shared/coinche';

export const constructorForGetPlayerNameByID = (gameMetadata: BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>['gameMetadata']) => (ID: PlayerID): string => {
  const playerMetadata = gameMetadata.find(m => (String(m.id) as PlayerID) === ID);
  if (!playerMetadata) {
    throw new Error(`No game metadata for player [${ID}]`);
  }

  return playerMetadata.name;
};
