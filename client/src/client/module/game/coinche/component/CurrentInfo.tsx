import {Fragment, useContext} from 'react';
import {I18nContext, OptionsContext} from '../../../../context';
import type {
  AnnounceID,
  ExpectedPoints,
  PlayerID,
  SayCoincheLevel,
  TrumpMode,
} from '../../../../../shared/coinche';
import {
  getCardColorClassForTrump,
  getCardSymbolCharForTrump,
} from '../../../../service/getCardColorAndSymbol';

type ComponentProps = {
  partnerTeamPoints: number;
  opponentTeamPoints: number;
  howManyPointsATeamMustReachToEndTheGame: number;
  attackingPlayerName?: string;
  trumpMode?: TrumpMode;
  expectedPoints?: ExpectedPoints;
  sayCoincheLevel?: SayCoincheLevel;
  displayablePlayersAnnounces: Record<PlayerID, { playerName: string; announces: { id: AnnounceID | 'Belot' }[] }>;
};
export const CurrentInfoComponent: React.FunctionComponent<ComponentProps> = ({
  sayCoincheLevel,
  partnerTeamPoints,
  opponentTeamPoints,
  howManyPointsATeamMustReachToEndTheGame,
  attackingPlayerName,
  trumpMode,
  expectedPoints,
  displayablePlayersAnnounces,
}) => {
  const { game: i18n } = useContext(I18nContext);
  const { state: { cardColorDisplay } } = useContext(OptionsContext);

  return (
    <div className="currentInfo">
      <div className="teamPoints">
        <span className="label">{i18n.Info.partnerTeam}</span>
        <span className="data">{`${partnerTeamPoints}/${howManyPointsATeamMustReachToEndTheGame}`}</span>
      </div>
      <div className="teamPoints">
        <span className="label">{i18n.Info.opponentTeam}</span>
        <span className="data">{`${opponentTeamPoints}/${howManyPointsATeamMustReachToEndTheGame}`}</span>
      </div>
      {attackingPlayerName && trumpMode && expectedPoints && (
        <Fragment>
          <div className="attackingPlayer">
            <span className="label">{i18n.Info.attackingPlayer}</span>
            <span className="data">{attackingPlayerName}</span>
          </div>
          <div className="goal">
            <span className="label">{i18n.Info.goal}</span>
            <span className="data">{`${expectedPoints}`} <span className={getCardColorClassForTrump(cardColorDisplay, trumpMode)}>{getCardSymbolCharForTrump(trumpMode)}</span> {`${i18n.trumpMode[trumpMode]}${sayCoincheLevel === 'coinche' ? ` (${i18n.sayCoincheLevel.coinche})` : ''}${sayCoincheLevel === 'surcoinche' ? ` (${i18n.sayCoincheLevel.surcoinche})` : ''}`}</span>
          </div>
        </Fragment>
      )}
      {Object.entries(displayablePlayersAnnounces)
        .filter(([_, { announces }]) => announces.length > 0)
        .map(([playerID, { playerName, announces }]) => (
          <div key={playerID} className="playerAnnounces">
            <span>{i18n.Info.announcesOf(playerName)}</span>
            {announces.map(a => (
              <div key={a.id} className="announce">{`- ${i18n.announce.id[a.id]}`}</div>
            ))}
          </div>
        ))
      }
    </div>
  );
};
