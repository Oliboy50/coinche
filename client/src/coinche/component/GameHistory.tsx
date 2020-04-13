import React, {useContext, useState} from 'react';
import {I18nContext} from '../context/i18n';
import {GameHistory, PlayerID, TeamID} from '../../shared/coinche';
import {
  getPointsForAnnounce,
  getPointsForCard,
  getPointsForExpectedPoints,
} from '../../shared/coinche/service/pointsCounter';

type ComponentProps = {
  gameHistory: GameHistory;
  getPlayerNameByID: (playerID: PlayerID) => string;
};
// @TODO: translate
export const GameHistoryComponent: React.FunctionComponent<ComponentProps> = ({
  gameHistory,
  getPlayerNameByID,
}) => {
  const i18n = useContext(I18nContext);
  const [displayedRoundDetail, setDisplayedRoundDetail] = useState(gameHistory.rounds.length > 0 ? gameHistory.rounds.length - 1 : undefined);

  const getTeamNameByID = (teamID: TeamID): string => teamID === TeamID.NorthSouth ? `[${getPlayerNameByID(PlayerID.North)}|${getPlayerNameByID(PlayerID.South)}]` : `[${getPlayerNameByID(PlayerID.East)}|${getPlayerNameByID(PlayerID.West)}]`;

  return (
    <div className="gameHistory">
      {gameHistory.rounds.map((round, roundIndex) => {
        const previousNorthSouthTeamPointsAtTheEndOfRound = roundIndex > 0 ? gameHistory.rounds[roundIndex - 1].teamPointsAtTheEndOfRound![TeamID.NorthSouth] : 0;
        const previousEastWestTeamPointsAtTheEndOfRound = roundIndex > 0 ? gameHistory.rounds[roundIndex - 1].teamPointsAtTheEndOfRound![TeamID.EastWest] : 0;

        return <div key={roundIndex} className="round">
          <div className="roundTitle">{`Détail de la jetée n°${roundIndex + 1}`}</div>
          <div>{`Attaquant : ${getPlayerNameByID(round.sayTake.playerID)}`}</div>
          <div>{`Objectif : ${round.sayTake.expectedPoints} ${i18n.trumpMode[round.sayTake.trumpMode]}${round.sayTake.sayCoincheLevel === 'coinche' ? ` (${i18n.sayCoincheLevel.coinche})` : ''}${round.sayTake.sayCoincheLevel === 'surcoinche' ? ` (${i18n.sayCoincheLevel.surcoinche})` : ''}`}</div>

          {round.teamPointsAtTheEndOfRound && round.winningTeam && (
            <div className="roundPointsSummary">
              <div className="teamPointsAtTheEndOfRound">
                <div className="sectionTitle">Récapitulatif des scores à la fin de la jetée</div>
                <div>{`Equipe ${getTeamNameByID(TeamID.NorthSouth)} : ${round.teamPointsAtTheEndOfRound[TeamID.NorthSouth]} (+ ${round.teamPointsAtTheEndOfRound[TeamID.NorthSouth] - previousNorthSouthTeamPointsAtTheEndOfRound}) points`}</div>
                <div>{`Equipe ${getTeamNameByID(TeamID.EastWest)} : ${round.teamPointsAtTheEndOfRound[TeamID.EastWest]} (+ ${round.teamPointsAtTheEndOfRound[TeamID.EastWest] - previousEastWestTeamPointsAtTheEndOfRound}) points`}</div>
              </div>

              <div className="roundDetailToggleButton">
                {displayedRoundDetail === roundIndex ? (
                  <button type="button" onClick={() => setDisplayedRoundDetail(undefined)}>Masquer le détail de la jetée</button>
                ) : (
                  <button type="button" onClick={() => setDisplayedRoundDetail(roundIndex)}>Afficher le détail de la jetée</button>
                )}
              </div>

              {displayedRoundDetail === roundIndex && (
                <div className="roundDetail">
                  <div className="goalPoints">
                    <div className="sectionTitle">Points de l'objectif</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.NorthSouth)} : ${round.winningTeam === TeamID.NorthSouth ? getPointsForExpectedPoints(round.sayTake) : 0} points`}</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.EastWest)} : ${round.winningTeam === TeamID.EastWest ? getPointsForExpectedPoints(round.sayTake) : 0} points`}</div>
                  </div>

                  <div className="endOfRoundPoints">
                    <div className="sectionTitle">Points de fin de jetée</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.NorthSouth)} : ${round.turns.every(turn => turn.winningTeam === TeamID.NorthSouth) ? 100 : (round.turns[round.turns.length - 1].winningTeam === TeamID.NorthSouth ? 10 : 0)} points`}</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.EastWest)} : ${round.turns.every(turn => turn.winningTeam === TeamID.EastWest) ? 100 : (round.turns[round.turns.length - 1].winningTeam === TeamID.EastWest ? 10 : 0)} points`}</div>
                  </div>

                  <div className="turnsPoints">
                    <div className="sectionTitle">Points des cartes</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.NorthSouth)} : ${round.turns.reduce((roundAcc, turn) => roundAcc + (turn.winningTeam === TeamID.NorthSouth ? turn.playedCards.reduce((turnAcc, card) => turnAcc + getPointsForCard(card, round.sayTake.trumpMode), 0) : 0), 0)} points`}</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.EastWest)} : ${round.turns.reduce((roundAcc, turn) => roundAcc + (turn.winningTeam === TeamID.EastWest ? turn.playedCards.reduce((turnAcc, card) => turnAcc + getPointsForCard(card, round.sayTake.trumpMode), 0) : 0), 0)} points`}</div>
                  </div>

                  <div className="announcesPoints">
                    <div className="sectionTitle">Points des annonces</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.NorthSouth)} : ${round.displayableAnnounces.reduce((acc, announce) => acc + ([PlayerID.North, PlayerID.South].includes(announce.owner) ? getPointsForAnnounce(announce.id, round.sayTake.trumpMode) : 0), 0)} points`}</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.EastWest)} : ${round.displayableAnnounces.reduce((acc, announce) => acc + ([PlayerID.East, PlayerID.West].includes(announce.owner) ? getPointsForAnnounce(announce.id, round.sayTake.trumpMode) : 0), 0)} points`}</div>
                  </div>

                  {round.turns.length > 0 && (
                    <div className="turnsDetail">
                      <div className="sectionTitle">Détail des plis</div>
                      <ul className="turns">
                        {round.turns.map((turn, turnIndex) => {
                          return <li key={turnIndex} className="turn">
                            <div>{`Cartes jouées : ${turn.playedCards.map(card => i18n.card(card)).join(', ')}`}</div>
                            <div>{`Valeur : ${turn.playedCards.reduce((acc, card) => acc + getPointsForCard(card, round.sayTake.trumpMode), 0)} points pour ${getPlayerNameByID(turn.winningPlayer)}`}</div>
                          </li>;
                        })}
                      </ul>
                    </div>
                  )}

                  {round.displayableAnnounces.length > 0 && (
                    <div className="announcesDetail">
                      <div className="sectionTitle">Détail des annonces</div>
                      <ul className="announces">
                        {round.displayableAnnounces.map(announce => {
                          return <li key={announce.id} className="announce">
                            <div>{`Annonce : ${i18n.announce.id[announce.id]}`}</div>
                            <div>{`Valeur : ${getPointsForAnnounce(announce.id, round.sayTake.trumpMode)} points pour ${getPlayerNameByID(announce.owner)}`}</div>
                          </li>;
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>;
      })}
    </div>
  );
};
