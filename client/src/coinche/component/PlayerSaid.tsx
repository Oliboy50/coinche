import React, {useContext} from 'react';
import {BoardProps} from 'boardgame.io/react';
import {
  GameStatePlayerView,
  Moves,
  PhaseID,
  PlayerID,
} from '../../shared/coinche';
import {I18nContext} from '../context/i18n';
import {BubbleComponent} from './Bubble';

type ComponentProps = {
  playerSaid: BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>['G']['playersSaid'][PlayerID.North],
};
export const PlayerSaidComponent: React.FunctionComponent<ComponentProps> = ({
  playerSaid,
}) => {
  const i18n = useContext(I18nContext);

  if (!playerSaid) {
    return null;
  }

  return (
    <BubbleComponent type="PlayerSaid" content={
      playerSaid === 'skip' ? (
        i18n.PlayerSaid.skip
      ) : (
        `${playerSaid.expectedPoints} ${i18n.trumpMode[playerSaid.trumpMode]}`
      )
    } />
  );
};
