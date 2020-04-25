import React, {useContext, useState} from 'react';
import {I18nContext} from '../context/i18n';
import {
  GameHistory,
  PlayerID,
  TeamID,
  TrumpMode,
  getPlayerTeam,
} from '../../shared/coinche';
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
  const reversedRounds = [...gameHistory.rounds].reverse();

  const i18n = useContext(I18nContext);
  const [displayedRoundDetail, setDisplayedRoundDetail] = useState<number | undefined>(undefined);

  const getTeamNameByID = (teamID: TeamID): string => teamID === TeamID.NorthSouth ? `[${getPlayerNameByID(PlayerID.North)}|${getPlayerNameByID(PlayerID.South)}]` : `[${getPlayerNameByID(PlayerID.East)}|${getPlayerNameByID(PlayerID.West)}]`;
  const getRoundCardsPointsForTeam = (round: GameHistory['rounds'][0], teamID: TeamID): number => round.turns.reduce((roundAcc, turn) => roundAcc + (turn.winningTeam === teamID ? turn.playedCards.reduce((turnAcc, card) => turnAcc + getPointsForCard(card, round.sayTake.trumpMode), 0) : 0), 0);
  const getRoundEndPointsForTeam = (round: GameHistory['rounds'][0], teamID: TeamID): 0|10|100 => round.turns.every(turn => turn.winningTeam === teamID) ? 100 : (round.turns[round.turns.length - 1].winningTeam === teamID ? 10 : 0);
  const getRoundAnnouncesPointsForTeam = (round: GameHistory['rounds'][0], teamID: TeamID): number => round.displayableAnnounces.reduce((acc, announce) => acc + (getPlayerTeam(announce.owner) === teamID ? getPointsForAnnounce(announce.id, round.sayTake.trumpMode) : 0), 0);

  return (
    <div className="gameHistory">
      {reversedRounds.map((round, roundIndex) => {
        const previousNorthSouthTeamPointsAtTheEndOfRound = roundIndex < (reversedRounds.length - 1) ? reversedRounds[roundIndex + 1].teamPointsAtTheEndOfRound![TeamID.NorthSouth] : 0;
        const previousEastWestTeamPointsAtTheEndOfRound = roundIndex < (reversedRounds.length - 1) ? reversedRounds[roundIndex + 1].teamPointsAtTheEndOfRound![TeamID.EastWest] : 0;

        const attackingTeam = [PlayerID.North, PlayerID.South].includes(round.sayTake.playerID) ? TeamID.NorthSouth : TeamID.EastWest;
        const goalPointsDetail = `${getPointsForExpectedPoints(round.sayTake)} points (${round.sayTake.expectedPoints}${round.sayTake.trumpMode === TrumpMode.NoTrump ? ' sans atout' : ''}${round.sayTake.sayCoincheLevel === 'coinche' ? ' coinché' : ''}${round.sayTake.sayCoincheLevel === 'surcoinche' ? ' surcoinché' : ''})`;

        return <div key={roundIndex} className="round">
          <div className="roundTitle">{`Détail de la jetée n°${reversedRounds.length - roundIndex}`}</div>
          <div>{`Attaquant : ${getPlayerNameByID(round.sayTake.playerID)}`}</div>
          <div>{`Objectif : ${round.sayTake.expectedPoints} ${i18n.trumpMode[round.sayTake.trumpMode]}${round.sayTake.sayCoincheLevel === 'coinche' ? ` (${i18n.sayCoincheLevel.coinche})` : ''}${round.sayTake.sayCoincheLevel === 'surcoinche' ? ` (${i18n.sayCoincheLevel.surcoinche})` : ''}`}</div>

          {round.teamPointsAtTheEndOfRound && round.winningTeam && (
            <div className="roundSummary">
              <div className="teamPointsAtTheEndOfRound">
                <div className="sectionTitle">Récapitulatif des scores à la fin de la jetée</div>
                <div>{`Equipe ${getTeamNameByID(TeamID.NorthSouth)} : ${round.teamPointsAtTheEndOfRound[TeamID.NorthSouth]} (${previousNorthSouthTeamPointsAtTheEndOfRound} + ${round.teamPointsAtTheEndOfRound[TeamID.NorthSouth] - previousNorthSouthTeamPointsAtTheEndOfRound}) points`}</div>
                <div>{`Equipe ${getTeamNameByID(TeamID.EastWest)} : ${round.teamPointsAtTheEndOfRound[TeamID.EastWest]} (${previousEastWestTeamPointsAtTheEndOfRound} + ${round.teamPointsAtTheEndOfRound[TeamID.EastWest] - previousEastWestTeamPointsAtTheEndOfRound}) points`}</div>
              </div>

              <div className="roundPointsSummary">
                <div className="sectionTitle">Résumé des points de la jetée</div>
                <div>{`Equipe ${getTeamNameByID(TeamID.NorthSouth)} : ${getRoundCardsPointsForTeam(round, TeamID.NorthSouth) + getRoundEndPointsForTeam(round, TeamID.NorthSouth) + getRoundAnnouncesPointsForTeam(round, TeamID.NorthSouth)} points${attackingTeam === TeamID.NorthSouth ? ` pour ${round.sayTake.expectedPoints} points demandés` : ''}`}</div>
                <div>{`Equipe ${getTeamNameByID(TeamID.EastWest)} : ${getRoundCardsPointsForTeam(round, TeamID.EastWest) + getRoundEndPointsForTeam(round, TeamID.EastWest) + getRoundAnnouncesPointsForTeam(round, TeamID.EastWest)} points${attackingTeam === TeamID.EastWest ? ` pour ${round.sayTake.expectedPoints} points demandés` : ''}`}</div>
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
                    <div className="sectionTitle">Points des enchères</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.NorthSouth)} : ${round.winningTeam === TeamID.NorthSouth ? goalPointsDetail : '0 points'}`}</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.EastWest)} : ${round.winningTeam === TeamID.EastWest ? goalPointsDetail : '0 points'}`}</div>
                  </div>

                  <div className="turnsPoints">
                    <div className="sectionTitle">Points des cartes</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.NorthSouth)} : ${getRoundCardsPointsForTeam(round, TeamID.NorthSouth)} points`}</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.EastWest)} : ${getRoundCardsPointsForTeam(round, TeamID.EastWest)} points`}</div>
                  </div>

                  <div className="endOfRoundPoints">
                    <div className="sectionTitle">Points de fin de jetée</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.NorthSouth)} : ${getRoundEndPointsForTeam(round, TeamID.NorthSouth) === 100 ? `100 points (capot)` : (getRoundEndPointsForTeam(round, TeamID.NorthSouth) === 10 ? `10 points (dernier pli)` : `0 points`)}`}</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.EastWest)} : ${getRoundEndPointsForTeam(round, TeamID.EastWest) === 100 ? `100 points (capot)` : (getRoundEndPointsForTeam(round, TeamID.EastWest) === 10 ? `10 points (dernier pli)` : `0 points`)}`}</div>
                  </div>

                  <div className="announcesPoints">
                    <div className="sectionTitle">Points des annonces</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.NorthSouth)} : ${getRoundAnnouncesPointsForTeam(round, TeamID.NorthSouth)} points`}</div>
                    <div>{`Equipe ${getTeamNameByID(TeamID.EastWest)} : ${getRoundAnnouncesPointsForTeam(round, TeamID.EastWest)} points`}</div>
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
