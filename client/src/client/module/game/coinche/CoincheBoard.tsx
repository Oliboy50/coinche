import './CoincheBoard.css';
import React, {useState} from 'react';
import {BoardProps} from 'boardgame.io/react';
import {
  AnnounceID,
  Card,
  ExpectedPoints,
  GameStatePlayerView,
  Moves,
  PhaseID,
  PlayerID,
  SecretPlayerAnnounce,
  TeamID,
  TrumpMode,
  getBelotCards,
  getPlayerPartner,
  getPlayerTeam,
  isSameCard,
  isSayableExpectedPoints,
  howManyPlayers,
  validExpectedPoints,
} from '../../../../shared/coinche';
import {PlayerScreenPosition, getPlayerIDForPosition} from './service/getPlayerIDForPosition';
import {constructorForGetPlayerNameByID} from './service/getPlayerNameByID';
import {CardDisplay, CardDisplayContext, cardDisplayDefaultValue} from './context/cardDisplay';
import {findOption, persistOption} from './repository/optionsRepository';
import {TalkMenuComponent} from './component/TalkMenu';
import {MyCardsComponent} from './component/MyCards';
import {OtherPlayerCardsComponent} from './component/OtherPlayerCards';
import {PlayerSaidComponent} from './component/PlayerSaid';
import {PreviousCardsPlayedMenuComponent} from './component/PreviousCardsPlayedMenu';
import {PlayedCardsComponent} from './component/PlayedCards';
import {SayAnnounceMenuComponent} from './component/SayAnnounceMenu';
import {PlayerSaidAnnouncesComponent} from './component/PlayerSaidAnnounces';
import {CurrentInfoComponent} from './component/CurrentInfo';
import {HiddenStackedCardsComponent} from './component/HiddenStackedCards';
import {GameHistoryComponent} from './component/GameHistory';
import {GoBackToLobbyComponent} from './component/GoBackToLobby';
import {WinnersCongratulationComponent} from './component/WinnersCongratulation';
import {OptionsComponent} from './component/Options';

const getTurnIndicatorClassForPosition = (
  position: PlayerScreenPosition,
  currentPhaseNeedsToWaitForAPlayerMove: boolean,
  currentPlayerIsTopPlayer: boolean,
  currentPlayerIsLeftPlayer: boolean,
  currentPlayerIsRightPlayer: boolean,
  currentPlayerIsBottomPlayer: boolean,
): string => {
  if (!currentPhaseNeedsToWaitForAPlayerMove) {
    return '';
  }

  if ((currentPlayerIsTopPlayer && position === 'top')
    || (currentPlayerIsLeftPlayer && position === 'left')
    || (currentPlayerIsRightPlayer && position === 'right')
    || (currentPlayerIsBottomPlayer && position === 'bottom')) {
    return 'currentPlayer';
  }

  return '';
};

export const buildCoincheBoardComponent = (
  goBackToLobby: () => Promise<void>,
): React.FunctionComponent<BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>> => ({
  G,
  ctx,
  moves,
  playerID,
  gameMetadata,
}) => {
  const getPlayerNameByID = constructorForGetPlayerNameByID(gameMetadata);

  const bottomPlayerID = playerID !== null ? playerID : PlayerID.South;
  const topPlayerID = getPlayerIDForPosition(bottomPlayerID, 'top');
  const leftPlayerID = getPlayerIDForPosition(bottomPlayerID, 'left');
  const rightPlayerID = getPlayerIDForPosition(bottomPlayerID, 'right');

  const bottomPlayerSaidAnnounces = (G.playersAnnounces[bottomPlayerID] as SecretPlayerAnnounce[]).filter(a => a.isSaid);
  const topPlayerSaidAnnounces = (G.playersAnnounces[topPlayerID] as SecretPlayerAnnounce[]).filter(a => a.isSaid);
  const leftPlayerSaidAnnounces = (G.playersAnnounces[leftPlayerID] as SecretPlayerAnnounce[]).filter(a => a.isSaid);
  const rightPlayerSaidAnnounces = (G.playersAnnounces[rightPlayerID] as SecretPlayerAnnounce[]).filter(a => a.isSaid);

  const partnerTeamID = getPlayerTeam(bottomPlayerID);
  const opponentTeamID = partnerTeamID === TeamID.NorthSouth ? TeamID.EastWest : TeamID.NorthSouth;

  const currentPlayerIsBottomPlayer = bottomPlayerID === ctx.currentPlayer;
  const currentPlayerIsTopPlayer = topPlayerID === ctx.currentPlayer;
  const currentPlayerIsLeftPlayer = leftPlayerID === ctx.currentPlayer;
  const currentPlayerIsRightPlayer = rightPlayerID === ctx.currentPlayer;

  const currentPhaseIsTalk = ctx.phase === PhaseID.Talk;
  const currentPhaseIsPlayCards = ctx.phase === PhaseID.PlayCards;
  const currentPhaseNeedsToWaitForAPlayerMove = currentPhaseIsTalk || currentPhaseIsPlayCards;

  const isNotFirstPlayCardTurn = G.playersCardPlayedInPreviousTurn !== undefined;

  const [cardDisplay, setCardDisplay] = useState(findOption('cardDisplay') || cardDisplayDefaultValue);
  const updateCardDisplay = (c: CardDisplay) => {
    setCardDisplay(c);
    persistOption('cardDisplay', c);
  };

  const [isDisplayedGameHistory, setIsDisplayedGameHistory] = useState(false);
  const [isDisplayedOptions, setIsDisplayedOptions] = useState(false);

  const [isDisplayedPreviousCardsPlayed, setIsDisplayedPreviousCardsPlayed] = useState(false);
  const playedCards = isDisplayedPreviousCardsPlayed ? G.playersCardPlayedInPreviousTurn : G.playersCardPlayedInCurrentTurn;

  const lastBottomPlayerTakeSaid = G.lastPlayersTakeSaid[bottomPlayerID];

  const belotCards = G.currentSayTake ? getBelotCards(G.currentSayTake.trumpMode) : [];
  const displayableAnnouncesByPlayerID: Record<PlayerID, { playerName: string; announces: { id: AnnounceID | 'Belot' }[] }> = {
    [PlayerID.North]: {
      playerName: getPlayerNameByID(PlayerID.North),
      announces: G.playersAnnounces[PlayerID.North].filter(pa => pa.isCardsDisplayable).map(pa => pa.announce!),
    },
    [PlayerID.East]: {
      playerName: getPlayerNameByID(PlayerID.East),
      announces: G.playersAnnounces[PlayerID.East].filter(pa => pa.isCardsDisplayable).map(pa => pa.announce!),
    },
    [PlayerID.South]: {
      playerName: getPlayerNameByID(PlayerID.South),
      announces: G.playersAnnounces[PlayerID.South].filter(pa => pa.isCardsDisplayable).map(pa => pa.announce!),
    },
    [PlayerID.West]: {
      playerName: getPlayerNameByID(PlayerID.West),
      announces: G.playersAnnounces[PlayerID.West].filter(pa => pa.isCardsDisplayable).map(pa => pa.announce!),
    },
  };
  if (G.belotAnnounce && G.belotAnnounce.isSaid) {
    displayableAnnouncesByPlayerID[G.belotAnnounce.owner].announces.push({ id: G.belotAnnounce.id });
  }

  const sayTake = (selectedExpectedPoint: ExpectedPoints, selectedTrumpMode: TrumpMode) => {
    moves.sayTake(selectedExpectedPoint, selectedTrumpMode);
    moves.endTurn();
  };
  const sayCoinche = () => {
    const isCurrentSayTakeCoinchedBeforeSayingCoinche = Boolean(G.currentSayTake && G.currentSayTake.sayCoincheLevel === 'coinche');
    moves.sayCoinche();

    if (isCurrentSayTakeCoinchedBeforeSayingCoinche) {
      moves.waitBeforeMovingToNextPhase();
      setTimeout(() => {
        moves.moveToNextPhase();
      }, 1000);
    } else {
      moves.endTurn();
    }
  };
  const saySkip = () => {
    const numberOfSuccessiveSkipSaidBeforeSayingThisSkip = G.numberOfSuccessiveSkipSaid;
    moves.saySkip();

    if (
      numberOfSuccessiveSkipSaidBeforeSayingThisSkip >= (howManyPlayers - 1)
      || (G.currentSayTake && numberOfSuccessiveSkipSaidBeforeSayingThisSkip >= (howManyPlayers - 2))
    ) {
      moves.waitBeforeMovingToNextPhase();
      setTimeout(() => {
        moves.moveToNextPhase();
      }, 1000);
    } else {
      moves.endTurn();
    }
  };
  const playCard = (card: Card) => {
    const numberOfCardsPlayedBeforePlayingThisCard = Object.values(G.playersCardPlayedInCurrentTurn).filter(card => card !== undefined).length;
    moves.playCard(card);

    if (numberOfCardsPlayedBeforePlayingThisCard >= (howManyPlayers - 1)) {
      moves.waitBeforeMovingToNextPhase();
      setTimeout(() => {
        moves.moveToNextPhase();
      }, 2000);
    } else {
      moves.endTurn();
    }
  };

  const onClickModalButton = (modalType: 'GameHistory'|'Options') => {
    switch (modalType) {
      case 'GameHistory':
        setIsDisplayedOptions(false);
        setIsDisplayedGameHistory(!isDisplayedGameHistory);
        return;
      case 'Options':
        setIsDisplayedGameHistory(false);
        setIsDisplayedOptions(!isDisplayedOptions);
        return;
    }
  };

  return (
    <CardDisplayContext.Provider value={cardDisplay}>
      <div className="coincheBoard">
        <CurrentInfoComponent
          sayCoincheLevel={G.currentSayTake?.sayCoincheLevel}
          partnerTeamPoints={G.teamsPoints[partnerTeamID]}
          opponentTeamPoints={G.teamsPoints[opponentTeamID]}
          howManyPointsATeamMustReachToEndTheGame={G.howManyPointsATeamMustReachToEndTheGame}
          attackingPlayerName={G.currentSayTake && getPlayerNameByID(G.currentSayTake.playerID)}
          trumpMode={G.currentSayTake?.trumpMode}
          expectedPoints={G.currentSayTake?.expectedPoints}
          displayablePlayersAnnounces={displayableAnnouncesByPlayerID}
        />

        <div className={`otherPlayer player top ${getTurnIndicatorClassForPosition('top', currentPhaseNeedsToWaitForAPlayerMove, currentPlayerIsTopPlayer, currentPlayerIsLeftPlayer, currentPlayerIsRightPlayer, currentPlayerIsBottomPlayer)}`}>
          <OtherPlayerCardsComponent cards={G.playersCards[topPlayerID]} />
          <div className="additionalCards">
            {currentPhaseIsTalk && G.dealer === topPlayerID && (
              <HiddenStackedCardsComponent cards={G.availableCards} />
            )}
            {currentPhaseIsPlayCards && (
              <HiddenStackedCardsComponent cards={G.wonTeamsCards[partnerTeamID]} />
            )}
          </div>
          <div className="playerName">{getPlayerNameByID(topPlayerID)}</div>
          <div className="playerTalks">
            {currentPhaseIsTalk && (!currentPlayerIsTopPlayer || G.__isWaitingBeforeMovingToNextPhase) && G.playersSaid[topPlayerID] && (
              <PlayerSaidComponent playerSaid={G.playersSaid[topPlayerID]}/>
            )}
            {currentPhaseIsPlayCards && (
              <PlayerSaidAnnouncesComponent
                saidAnnounceGroups={!isNotFirstPlayCardTurn ? topPlayerSaidAnnounces.map(a => a.announceGroup!) : []}
                saidAnnounces={G.playersAnnouncesDisplayedInCurrentTurn[topPlayerID]}
              />
            )}
          </div>
        </div>

        <div className={`otherPlayer player left ${getTurnIndicatorClassForPosition('left', currentPhaseNeedsToWaitForAPlayerMove, currentPlayerIsTopPlayer, currentPlayerIsLeftPlayer, currentPlayerIsRightPlayer, currentPlayerIsBottomPlayer)}`}>
          <OtherPlayerCardsComponent cards={G.playersCards[leftPlayerID]} />
          <div className="additionalCards">
            {currentPhaseIsTalk && G.dealer === leftPlayerID && (
              <HiddenStackedCardsComponent cards={G.availableCards} />
            )}
            {currentPhaseIsPlayCards && (
              <HiddenStackedCardsComponent cards={G.wonTeamsCards[opponentTeamID]} />
            )}
          </div>
          <div className="playerName">{getPlayerNameByID(leftPlayerID)}</div>
          <div className="playerTalks">
            {currentPhaseIsTalk && (!currentPlayerIsLeftPlayer || G.__isWaitingBeforeMovingToNextPhase) && G.playersSaid[leftPlayerID] && (
              <PlayerSaidComponent playerSaid={G.playersSaid[leftPlayerID]}/>
            )}
            {currentPhaseIsPlayCards && (
              <PlayerSaidAnnouncesComponent
                saidAnnounceGroups={!isNotFirstPlayCardTurn ? leftPlayerSaidAnnounces.map(a => a.announceGroup!) : []}
                saidAnnounces={G.playersAnnouncesDisplayedInCurrentTurn[leftPlayerID]}
              />
            )}
          </div>
        </div>

        <div className={`otherPlayer player right ${getTurnIndicatorClassForPosition('right', currentPhaseNeedsToWaitForAPlayerMove, currentPlayerIsTopPlayer, currentPlayerIsLeftPlayer, currentPlayerIsRightPlayer, currentPlayerIsBottomPlayer)}`}>
          <OtherPlayerCardsComponent cards={G.playersCards[rightPlayerID]} />
          <div className="additionalCards">
            {currentPhaseIsTalk && G.dealer === rightPlayerID && (
              <HiddenStackedCardsComponent cards={G.availableCards} />
            )}
          </div>
          <div className="playerName">{getPlayerNameByID(rightPlayerID)}</div>
          <div className="playerTalks">
            {currentPhaseIsTalk && (!currentPlayerIsRightPlayer || G.__isWaitingBeforeMovingToNextPhase) && G.playersSaid[rightPlayerID] && (
              <PlayerSaidComponent playerSaid={G.playersSaid[rightPlayerID]}/>
            )}
            {currentPhaseIsPlayCards && (
              <PlayerSaidAnnouncesComponent
                saidAnnounceGroups={!isNotFirstPlayCardTurn ? rightPlayerSaidAnnounces.map(a => a.announceGroup!) : []}
                saidAnnounces={G.playersAnnouncesDisplayedInCurrentTurn[rightPlayerID]}
              />
            )}
          </div>
        </div>

        {ctx.gameover ? (
          <React.Fragment>
            <GoBackToLobbyComponent
              goBackToLobby={goBackToLobby}
            />

            <WinnersCongratulationComponent
              winners={ctx.gameover!.winners}
              getPlayerNameByID={getPlayerNameByID}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="playedCardsArea">
              <PlayedCardsComponent bottomPlayerID={bottomPlayerID} playedCards={playedCards} />
            </div>

            <div className={`myPlayer player bottom ${getTurnIndicatorClassForPosition('bottom', currentPhaseNeedsToWaitForAPlayerMove, currentPlayerIsTopPlayer, currentPlayerIsLeftPlayer, currentPlayerIsRightPlayer, currentPlayerIsBottomPlayer)}`}>
              <div className="playerTalks">
                {currentPhaseIsTalk && (!currentPlayerIsBottomPlayer || G.__isWaitingBeforeMovingToNextPhase) && G.playersSaid[bottomPlayerID] && (
                  <PlayerSaidComponent playerSaid={G.playersSaid[bottomPlayerID]}/>
                )}
                {currentPhaseIsPlayCards && (
                  <PlayerSaidAnnouncesComponent
                    saidAnnounceGroups={!isNotFirstPlayCardTurn ? bottomPlayerSaidAnnounces.map(a => a.announceGroup!) : []}
                    saidAnnounces={G.playersAnnouncesDisplayedInCurrentTurn[bottomPlayerID]}
                  />
                )}
              </div>
              <div className="menu">
                {!G.__isWaitingBeforeMovingToNextPhase && currentPhaseIsPlayCards && isNotFirstPlayCardTurn && (
                  <PreviousCardsPlayedMenuComponent
                    isDisplayedPreviousCardsPlayed={isDisplayedPreviousCardsPlayed}
                    toggleIsDisplayedPreviousCardsPlayed={() => setIsDisplayedPreviousCardsPlayed(!isDisplayedPreviousCardsPlayed)}
                  />
                )}
                {!G.__isWaitingBeforeMovingToNextPhase && !isDisplayedPreviousCardsPlayed && currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && currentPlayerIsBottomPlayer && (
                  <SayAnnounceMenuComponent sayAnnounce={moves.sayAnnounce} availableAnnounces={G.playerAnnounces.filter(a => !a.isSaid).map(a => a.announce)} />
                )}
                {!G.__isWaitingBeforeMovingToNextPhase && !isDisplayedPreviousCardsPlayed && currentPhaseIsTalk && currentPlayerIsBottomPlayer && (
                  <TalkMenuComponent
                    saySkip={saySkip}
                    canSayTake={!(G.currentSayTake && G.currentSayTake.sayCoincheLevel === 'coinche' && G.currentSayTake.playerID === bottomPlayerID)}
                    sayTake={sayTake}
                    sayCoinche={sayCoinche}
                    canSayCoinche={Boolean(G.currentSayTake && G.attackingTeam === opponentTeamID && G.currentSayTake.sayCoincheLevel !== 'coinche')}
                    canSaySurcoinche={Boolean(G.currentSayTake && G.attackingTeam === partnerTeamID && G.currentSayTake.sayCoincheLevel === 'coinche')}
                    selectedTrumpModeDefaultValue={lastBottomPlayerTakeSaid ? lastBottomPlayerTakeSaid.trumpMode : undefined}
                    sayableExpectedPoints={validExpectedPoints.filter(expectedPoint => isSayableExpectedPoints(expectedPoint, G.currentSayTake?.expectedPoints))}
                  />
                )}
              </div>
              <div className="currentPlayerIndicator" />
              {!isDisplayedPreviousCardsPlayed && (
                <MyCardsComponent
                  cards={G.playerCards}
                  isMyTurnToPlayACard={!G.__isWaitingBeforeMovingToNextPhase && currentPhaseIsPlayCards && currentPlayerIsBottomPlayer}
                  playCard={playCard}
                  trumpMode={G.currentSayTake?.trumpMode}
                  playersCardPlayedInCurrentTurn={G.playersCardPlayedInCurrentTurn}
                  firstPlayerInCurrentTurn={G.firstPlayerInCurrentTurn}
                  playerPartner={getPlayerPartner(bottomPlayerID)}
                  sayBelotOrNot={moves.sayBelotOrNot}
                  belotCards={(belotCards.length && belotCards.every(bc => G.playerCards.some(pc => isSameCard(bc, pc)))) ? belotCards : []}
                />
              )}
              <div className="additionalCards">
                {!isDisplayedPreviousCardsPlayed && currentPhaseIsTalk && G.dealer === bottomPlayerID && (
                  <HiddenStackedCardsComponent cards={G.availableCards} />
                )}
              </div>
            </div>
          </React.Fragment>
        )}

        {G.history.rounds.length > 0 && (
          <div className={`modal ${(isDisplayedGameHistory || isDisplayedOptions) ? 'opened': ''}`}>
            <div className="content">
              {isDisplayedOptions && (
                <OptionsComponent updateCardDisplay={updateCardDisplay} />
              )}
              {isDisplayedGameHistory && (
                <GameHistoryComponent gameHistory={G.history} getPlayerNameByID={getPlayerNameByID} />
              )}
            </div>
            <div className="toggleButtons">
              <div className={`toggleButton toggleOptions ${isDisplayedOptions ? 'active': ''}`} onClick={() => onClickModalButton('Options')}>
                <span role="img" aria-label="options" data-testid="button toggleOptions">⚙️</span>
              </div>
              <div className={`toggleButton toggleGameHistory ${isDisplayedGameHistory ? 'active': ''}`} onClick={() => onClickModalButton('GameHistory')}>
                <span role="img" aria-label="notebook" data-testid="button toggleGameHistory">📝</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CardDisplayContext.Provider>
  );
};
