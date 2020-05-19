import React, {useContext} from 'react';
import {BoardProps} from 'boardgame.io/react';
import {
  GameStatePlayerView,
  Moves,
  PhaseID,
  PlayerID,
} from '../../../../../shared/coinche';
import {I18nContext} from '../context/i18n';

type ComponentProps = {
  playerSaid: BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>['G']['playersSaid'][PlayerID.North],
};
export const PlayerSaidComponent: React.FunctionComponent<ComponentProps> = ({
  playerSaid,
}) => {
  const rootElementClassName = 'playerSaid';

  const i18n = useContext(I18nContext);

  if (!playerSaid) {
    return null;
  }

  if (playerSaid === 'skip') {
    return <div className={rootElementClassName}>{i18n.PlayerSaid.skip}</div>;
  }

  if (playerSaid === 'coinche') {
    return <div className={rootElementClassName}>{i18n.PlayerSaid.coinche}</div>;
  }

  if (playerSaid === 'surcoinche') {
    return <div className={rootElementClassName}>{i18n.PlayerSaid.surcoinche}</div>;
  }

  return (
    <div className={rootElementClassName}>{`${playerSaid.expectedPoints} ${i18n.trumpMode[playerSaid.trumpMode]}`}</div>
  );
};
