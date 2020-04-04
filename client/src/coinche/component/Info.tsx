import React, {useContext} from 'react';
import {I18nContext} from '../context/i18n';
import {
  Announce,
  BelotAnnounce,
  ExpectedPoints,
  PlayerID,
  SayCoincheLevel,
  TrumpMode,
} from '../../shared/coinche';

type ComponentProps = {
  sayCoincheLevel?: SayCoincheLevel;
  partnerTeamPoints: number;
  opponentTeamPoints: number;
  howManyPointsATeamMustReachToEndTheGame: number;
  attackingPlayerName?: string;
  trumpMode?: TrumpMode;
  expectedPoints?: ExpectedPoints;
  displayablePlayersAnnounces: Record<PlayerID, { playerName: string; announces: (Announce | BelotAnnounce)[] }>;
};
export const InfoComponent: React.FunctionComponent<ComponentProps> = ({
  sayCoincheLevel,
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
        <span className="label">{i18n.Info.partnerTeam}</span>
        <span className="data">{`${partnerTeamPoints}/${howManyPointsATeamMustReachToEndTheGame}`}</span>
      </div>
      <div className="teamPoints">
        <span className="label">{i18n.Info.opponentTeam}</span>
        <span className="data">{`${opponentTeamPoints}/${howManyPointsATeamMustReachToEndTheGame}`}</span>
      </div>
      {attackingPlayerName && trumpMode && expectedPoints && (
        <React.Fragment>
          <div className="attackingPlayer">
            <span className="label">{i18n.Info.attackingPlayer}</span>
            <span className="data">{`${attackingPlayerName}`}</span>
          </div>
          <div className="goal">
            <span className="label">{i18n.Info.goal}</span>
            <span className="data">{`${expectedPoints} ${i18n.trumpMode[trumpMode]}${sayCoincheLevel === 'coinche' ? ` (${i18n.Info.coinched})` : ''}${sayCoincheLevel === 'surcoinche' ? ` (${i18n.Info.surcoinched})` : ''}`}</span>
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
