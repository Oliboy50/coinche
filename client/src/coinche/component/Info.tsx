import React, {useContext} from 'react';
import {I18nContext} from '../context/i18n';
import {TeamID, TrumpMode} from '../../shared/coinche';

type ComponentProps = {
  partnerTeamID: TeamID;
  partnerTeamPoints: number;
  opponentTeamPoints: number;
  howManyPointsATeamMustReachToEndTheGame: number;
  attackingTeamID?: TeamID;
  trumpMode?: TrumpMode;
  expectedPoints?: number;
};
export const InfoComponent: React.FunctionComponent<ComponentProps> = ({
  partnerTeamID,
  partnerTeamPoints,
  opponentTeamPoints,
  howManyPointsATeamMustReachToEndTheGame,
  attackingTeamID,
  trumpMode,
  expectedPoints,
}) => {
  const i18n = useContext(I18nContext);

  return (
    <React.Fragment>
      <div>{i18n.Info.currentTeamScore('partner', partnerTeamPoints, howManyPointsATeamMustReachToEndTheGame)}</div>
      <div>{i18n.Info.currentTeamScore('opponent', opponentTeamPoints, howManyPointsATeamMustReachToEndTheGame)}</div>
      {attackingTeamID && trumpMode && expectedPoints && (
        <React.Fragment>
          <div>{i18n.Info.currentAttackingTeam(attackingTeamID === partnerTeamID ? 'partner' : 'opponent')}</div>
          <div>{i18n.Info.currentGoal(trumpMode, expectedPoints)}</div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
