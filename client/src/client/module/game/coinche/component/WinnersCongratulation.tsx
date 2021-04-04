import {useContext} from 'react';
import {I18nContext} from '../../../../context';
import type {PlayerID} from '../../../../../shared/coinche';

type ComponentProps = {
  getPlayerNameByID: (playerID: PlayerID) => string;
  winners: PlayerID[];
};
export const WinnersCongratulationComponent: React.FunctionComponent<ComponentProps> = ({
  getPlayerNameByID,
  winners,
}) => {
  const { game: i18n } = useContext(I18nContext);

  return (
    <div className="winnersTeamCongratulation">
      {winners.length > 0 ? (
        <div>{i18n.WinningTeamCongratulation.congratsTo(winners.map(getPlayerNameByID))}</div>
      ) : (
        <div>{i18n.WinningTeamCongratulation.draw}</div>
      )}
    </div>
  );
};
