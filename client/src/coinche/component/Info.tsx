import React, {useContext} from 'react';
import {I18nContext} from '../context/i18n';
import {Announce, BelotAnnounce, PlayerID, TeamID, TrumpMode} from '../../shared/coinche';

type ComponentProps = {
  partnerTeamID: TeamID;
  partnerTeamPoints: number;
  opponentTeamPoints: number;
  howManyPointsATeamMustReachToEndTheGame: number;
  attackingTeamID?: TeamID;
  trumpMode?: TrumpMode;
  expectedPoints?: number;
  displayablePlayersAnnounces: Record<PlayerID, { playerName: string; announces: (Announce | BelotAnnounce)[] }>;
};
export const InfoComponent: React.FunctionComponent<ComponentProps> = ({
  partnerTeamID,
  partnerTeamPoints,
  opponentTeamPoints,
  howManyPointsATeamMustReachToEndTheGame,
  attackingTeamID,
  trumpMode,
  expectedPoints,
  displayablePlayersAnnounces,
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
      {Object.entries(displayablePlayersAnnounces)
        .filter(([_, { announces }]) => announces.length > 0)
        .map(([playerID, { playerName, announces }]) => (
          <div key={playerID}>
            <span>{i18n.Info.announcesOf(playerName)}</span>
            {announces.map(a => (
              <div key={a.id}>{`- ${i18n.announce.id[a.id]}`}</div>
            ))}
          </div>
        ))
      }
    </React.Fragment>
  );
};
