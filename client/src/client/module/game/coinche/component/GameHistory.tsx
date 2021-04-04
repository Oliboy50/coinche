import {useContext, useState} from 'react';
import {I18nContext} from '../../../../context';
import {
  GameHistory,
  PlayerID,
  TeamID,
  getPlayerTeam,
} from '../../../../../shared/coinche';
import {
  getPointsForAnnounce,
  getPointsForCard,
  getPointsForExpectedPoints,
} from '../../../../../shared/coinche/service/pointsCounter';

type ComponentProps = {
  gameHistory: GameHistory;
  getPlayerNameByID: (playerID: PlayerID) => string;
};
export const GameHistoryComponent: React.FunctionComponent<ComponentProps> = ({
  gameHistory,
  getPlayerNameByID,
}) => {
  const reversedRounds = [...gameHistory.rounds].reverse();

  const { game: i18n } = useContext(I18nContext);
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
        const goal = `${round.sayTake.expectedPoints} ${i18n.trumpMode[round.sayTake.trumpMode]}${round.sayTake.sayCoincheLevel === 'coinche' ? ` (${i18n.sayCoincheLevel.coinche})` : ''}${round.sayTake.sayCoincheLevel === 'surcoinche' ? ` (${i18n.sayCoincheLevel.surcoinche})` : ''}`;

        return <div key={roundIndex} className="round">
          <div className="roundTitle">{i18n.GameHistory.roundTitle(reversedRounds.length - roundIndex)}</div>
          <div>{`${i18n.GameHistory.attackingPlayer} ${getPlayerNameByID(round.sayTake.playerID)}`}</div>
          <div>{`${i18n.GameHistory.goal} ${goal}`}</div>

          {round.teamPointsAtTheEndOfRound && round.winningTeam && (
            <div className="roundSummary">
              <div className="teamPointsAtTheEndOfRound">
                <div className="sectionTitle">{i18n.GameHistory.teamPointsAtTheEndOfRoundTitle}</div>
                <div>{`${i18n.GameHistory.team(getTeamNameByID(TeamID.NorthSouth))} ${i18n.GameHistory.teamPointsAtTheEndOfRoundDetail(round.teamPointsAtTheEndOfRound[TeamID.NorthSouth], previousNorthSouthTeamPointsAtTheEndOfRound, round.teamPointsAtTheEndOfRound[TeamID.NorthSouth] - previousNorthSouthTeamPointsAtTheEndOfRound)}`}</div>
                <div>{`${i18n.GameHistory.team(getTeamNameByID(TeamID.EastWest))} ${i18n.GameHistory.teamPointsAtTheEndOfRoundDetail(round.teamPointsAtTheEndOfRound[TeamID.EastWest], previousEastWestTeamPointsAtTheEndOfRound, round.teamPointsAtTheEndOfRound[TeamID.EastWest] - previousEastWestTeamPointsAtTheEndOfRound)}`}</div>
              </div>

              <div className="roundPointsSummary">
                <div className="sectionTitle">{i18n.GameHistory.roundPointsSummaryTitle}</div>
                <div>{`${i18n.GameHistory.team(getTeamNameByID(TeamID.NorthSouth))} ${i18n.GameHistory.roundPointsSummaryDetail(getRoundCardsPointsForTeam(round, TeamID.NorthSouth) + getRoundEndPointsForTeam(round, TeamID.NorthSouth) + getRoundAnnouncesPointsForTeam(round, TeamID.NorthSouth), attackingTeam === TeamID.NorthSouth ? round.sayTake.expectedPoints : undefined)}`}</div>
                <div>{`${i18n.GameHistory.team(getTeamNameByID(TeamID.EastWest))} ${i18n.GameHistory.roundPointsSummaryDetail(getRoundCardsPointsForTeam(round, TeamID.EastWest) + getRoundEndPointsForTeam(round, TeamID.EastWest) + getRoundAnnouncesPointsForTeam(round, TeamID.EastWest), attackingTeam === TeamID.EastWest ? round.sayTake.expectedPoints : undefined)}`}</div>
              </div>

              <div className="roundDetailToggleButton">
                {displayedRoundDetail === roundIndex ? (
                  <button type="button" onClick={() => setDisplayedRoundDetail(undefined)} data-testid="button hideRoundDetail">{i18n.GameHistory.roundDetailToggleButtonHide}</button>
                ) : (
                  <button type="button" onClick={() => setDisplayedRoundDetail(roundIndex)} data-testid="button showRoundDetail">{i18n.GameHistory.roundDetailToggleButtonShow}</button>
                )}
              </div>

              {displayedRoundDetail === roundIndex && (
                <div className="roundDetail">
                  <div className="goalPoints">
                    <div className="sectionTitle">{i18n.GameHistory.goalPointsTitle}</div>
                    <div>{`${i18n.GameHistory.team(getTeamNameByID(TeamID.NorthSouth))} ${round.winningTeam === TeamID.NorthSouth ? i18n.GameHistory.goalPointsDetail(getPointsForExpectedPoints(round.sayTake), goal) : i18n.GameHistory.score(0)}`}</div>
                    <div>{`${i18n.GameHistory.team(getTeamNameByID(TeamID.EastWest))} ${round.winningTeam === TeamID.EastWest ? i18n.GameHistory.goalPointsDetail(getPointsForExpectedPoints(round.sayTake), goal) : i18n.GameHistory.score(0)}`}</div>
                  </div>

                  <div className="turnsPoints">
                    <div className="sectionTitle">{i18n.GameHistory.cardsPointsTitle}</div>
                    <div>{`${i18n.GameHistory.team(getTeamNameByID(TeamID.NorthSouth))} ${i18n.GameHistory.score(getRoundCardsPointsForTeam(round, TeamID.NorthSouth))}`}</div>
                    <div>{`${i18n.GameHistory.team(getTeamNameByID(TeamID.EastWest))} ${i18n.GameHistory.score(getRoundCardsPointsForTeam(round, TeamID.EastWest))}`}</div>
                  </div>

                  <div className="endOfRoundPoints">
                    <div className="sectionTitle">{i18n.GameHistory.endOfRoundPointsTitle}</div>
                    <div>{`${i18n.GameHistory.team(getTeamNameByID(TeamID.NorthSouth))} ${i18n.GameHistory.endOfRoundPointsDetail(getRoundEndPointsForTeam(round, TeamID.NorthSouth))}`}</div>
                    <div>{`${i18n.GameHistory.team(getTeamNameByID(TeamID.EastWest))} ${i18n.GameHistory.endOfRoundPointsDetail(getRoundEndPointsForTeam(round, TeamID.EastWest))}`}</div>
                  </div>

                  <div className="announcesPoints">
                    <div className="sectionTitle">{i18n.GameHistory.announcesPointsTitle}</div>
                    <div>{`${i18n.GameHistory.team(getTeamNameByID(TeamID.NorthSouth))} ${i18n.GameHistory.score(getRoundAnnouncesPointsForTeam(round, TeamID.NorthSouth))}`}</div>
                    <div>{`${i18n.GameHistory.team(getTeamNameByID(TeamID.EastWest))} ${i18n.GameHistory.score(getRoundAnnouncesPointsForTeam(round, TeamID.EastWest))}`}</div>
                  </div>

                  {round.turns.length > 0 && (
                    <div className="turnsDetail">
                      <div className="sectionTitle">{i18n.GameHistory.turnsDetailTitle}</div>
                      <ul className="turns">
                        {round.turns.map((turn, turnIndex) => {
                          return <li key={turnIndex} className="turn">
                            <div>{i18n.GameHistory.playedCards(turn.playedCards.map(card => i18n.card(card)))}</div>
                            <div>{i18n.GameHistory.playedCardsPointsForPlayer(turn.playedCards.reduce((acc, card) => acc + getPointsForCard(card, round.sayTake.trumpMode), 0), getPlayerNameByID(turn.winningPlayer))}</div>
                          </li>;
                        })}
                      </ul>
                    </div>
                  )}

                  {round.displayableAnnounces.length > 0 && (
                    <div className="announcesDetail">
                      <div className="sectionTitle">{i18n.GameHistory.announcesDetailTitle}</div>
                      <ul className="announces">
                        {round.displayableAnnounces.map(announce => {
                          return <li key={announce.id} className="announce">
                            <div>{i18n.GameHistory.announceDetail(i18n.announce.id[announce.id])}</div>
                            <div>{i18n.GameHistory.announcePointsForPlayer(getPointsForAnnounce(announce.id, round.sayTake.trumpMode), getPlayerNameByID(announce.owner))}</div>
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
