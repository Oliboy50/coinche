import React, {useContext} from 'react';
import {I18nContext} from '../context/i18n';
import {Announce, BelotAnnounce, ExpectedPoints, PlayerID, TeamID, TrumpMode} from '../../shared/coinche';

type ComponentProps = {
  partnerTeamID: TeamID;
  partnerTeamPoints: number;
  opponentTeamPoints: number;
  howManyPointsATeamMustReachToEndTheGame: number;
  attackingPlayerName?: string;
  trumpMode?: TrumpMode;
  expectedPoints?: ExpectedPoints;
  displayablePlayersAnnounces: Record<PlayerID, { playerName: string; announces: (Announce | BelotAnnounce)[] }>;
};
export const InfoComponent: React.FunctionComponent<ComponentProps> = ({
  partnerTeamID,
  partnerTeamPoints,
  opponentTeamPoints,
  howManyPointsATeamMustReachToEndTheGame,
  attackingPlayerName,
  trumpMode,
  expectedPoints,
  displayablePlayersAnnounces,
}) => {
  const i18n = useContext(I18nContext);

  return (
    <React.Fragment>
      <div className="teamPoints">
        <span>{i18n.Info.partnerTeam}</span>
        <span>{` ${partnerTeamPoints}/${howManyPointsATeamMustReachToEndTheGame}`}</span>
      </div>
      <div className="teamPoints">
        <span>{i18n.Info.opponentTeam}</span>
        <span>{` ${opponentTeamPoints}/${howManyPointsATeamMustReachToEndTheGame}`}</span>
      </div>
      {attackingPlayerName && trumpMode && expectedPoints && (
        <React.Fragment>
          <div className="attackingPlayer">
            <span>{i18n.Info.attackingPlayer}</span>
            <span>{` ${attackingPlayerName}`}</span>
          </div>
          <div className="goal">
            <span>{i18n.Info.goal}</span>
            <span>{` ${expectedPoints} ${i18n.trumpMode[trumpMode]}`}</span>
          </div>
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
