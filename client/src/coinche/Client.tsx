import './Client.css';
import React, {useState} from 'react';
import {BoardProps} from 'boardgame.io/react';
import {
  Announce,
  BelotAnnounce,
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
} from '../shared/coinche';
import {PlayerScreenPosition, getPlayerIDForPosition} from './service/getPlayerIDForPosition';
import {getPlayerNameByID} from './service/getPlayerNameByID';
import {TalkMenuComponent} from './component/TalkMenu';
import {MyCardsComponent} from './component/MyCards';
import {OtherPlayerCardsComponent} from './component/OtherPlayerCards';
import {PlayerSaidComponent} from './component/PlayerSaid';
import {PreviousCardsPlayedMenuComponent} from './component/PreviousCardsPlayedMenu';
import {PlayedCardsComponent} from './component/PlayedCards';
import {SayAnnounceMenuComponent} from './component/SayAnnounceMenu';
import {PlayerSaidAnnounceGroupsComponent} from './component/PlayerSaidAnnounceGroups';
import {InfoComponent} from './component/Info';
import {HiddenStackedCardsComponent} from './component/HiddenStackedCards';

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

export const BoardComponent: React.FunctionComponent<BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>> = ({
  G,
  ctx,
  moves,
  playerID,
  gameMetadata,
}) => {
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

  const [isDisplayedPreviousCardsPlayed, setIsDisplayedPreviousCardsPlayed] = useState(false);
  const playedCards = isDisplayedPreviousCardsPlayed ? G.playersCardPlayedInPreviousTurn : G.playersCardPlayedInCurrentTurn;

  const lastBottomPlayerTakeSaid = G.lastPlayersTakeSaid[bottomPlayerID];

  const belotCards = G.currentSayTake ? getBelotCards(G.currentSayTake.trumpMode) : [];
  const displayableAnnouncesByPlayerID: Record<PlayerID, { playerName: string; announces: (Announce | BelotAnnounce)[] }> = {
    [PlayerID.North]: {
      playerName: getPlayerNameByID(gameMetadata, PlayerID.North),
      announces: G.playersAnnounces[PlayerID.North].filter(pa => pa.isCardsDisplayable).map(pa => pa.announce!),
    },
    [PlayerID.East]: {
      playerName: getPlayerNameByID(gameMetadata, PlayerID.East),
      announces: G.playersAnnounces[PlayerID.East].filter(pa => pa.isCardsDisplayable).map(pa => pa.announce!),
    },
    [PlayerID.South]: {
      playerName: getPlayerNameByID(gameMetadata, PlayerID.South),
      announces: G.playersAnnounces[PlayerID.South].filter(pa => pa.isCardsDisplayable).map(pa => pa.announce!),
    },
    [PlayerID.West]: {
      playerName: getPlayerNameByID(gameMetadata, PlayerID.West),
      announces: G.playersAnnounces[PlayerID.West].filter(pa => pa.isCardsDisplayable).map(pa => pa.announce!),
    },
  };
  if (G.belotAnnounce && G.belotAnnounce.isSaid) {
    displayableAnnouncesByPlayerID[G.belotAnnounce.owner].announces.push(G.belotAnnounce);
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

  return (
    <div className="board">
      <div className="info">
        <InfoComponent
          partnerTeamID={partnerTeamID}
          partnerTeamPoints={G.teamsPoints[partnerTeamID]}
          opponentTeamPoints={G.teamsPoints[opponentTeamID]}
          howManyPointsATeamMustReachToEndTheGame={G.howManyPointsATeamMustReachToEndTheGame}
          attackingTeamID={G.currentSayTake && G.attackingTeam}
          trumpMode={G.currentSayTake?.trumpMode}
          expectedPoints={G.currentSayTake?.expectedPoints}
          displayablePlayersAnnounces={displayableAnnouncesByPlayerID}
        />
      </div>

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
        <div className="playerName">{getPlayerNameByID(gameMetadata, topPlayerID)}</div>
        <div className="playerTalks">
          {currentPhaseIsTalk && (!currentPlayerIsTopPlayer || G.__isWaitingBeforeMovingToNextPhase) && G.playersSaid[topPlayerID] && (
            <PlayerSaidComponent playerSaid={G.playersSaid[topPlayerID]}/>
          )}
          {currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && topPlayerSaidAnnounces.length > 0 && (
            <PlayerSaidAnnounceGroupsComponent saidAnnounceGroups={topPlayerSaidAnnounces.map(a => a.announceGroup!)}/>
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
        <div className="playerName">{getPlayerNameByID(gameMetadata, leftPlayerID)}</div>
        <div className="playerTalks">
          {currentPhaseIsTalk && (!currentPlayerIsLeftPlayer || G.__isWaitingBeforeMovingToNextPhase) && G.playersSaid[leftPlayerID] && (
            <PlayerSaidComponent playerSaid={G.playersSaid[leftPlayerID]}/>
          )}
          {currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && leftPlayerSaidAnnounces.length > 0 && (
            <PlayerSaidAnnounceGroupsComponent saidAnnounceGroups={leftPlayerSaidAnnounces.map(a => a.announceGroup!)}/>
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
        <div className="playerName">{getPlayerNameByID(gameMetadata, rightPlayerID)}</div>
        <div className="playerTalks">
          {currentPhaseIsTalk && (!currentPlayerIsRightPlayer || G.__isWaitingBeforeMovingToNextPhase) && G.playersSaid[rightPlayerID] && (
            <PlayerSaidComponent playerSaid={G.playersSaid[rightPlayerID]}/>
          )}
          {currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && rightPlayerSaidAnnounces.length > 0 && (
            <PlayerSaidAnnounceGroupsComponent saidAnnounceGroups={rightPlayerSaidAnnounces.map(a => a.announceGroup!)}/>
          )}
        </div>
      </div>

      <div className="playedCardsArea">
        <PlayedCardsComponent bottomPlayerID={bottomPlayerID} playedCards={playedCards} />
      </div>

      <div className={`myPlayer player bottom ${getTurnIndicatorClassForPosition('bottom', currentPhaseNeedsToWaitForAPlayerMove, currentPlayerIsTopPlayer, currentPlayerIsLeftPlayer, currentPlayerIsRightPlayer, currentPlayerIsBottomPlayer)}`}>
        <div className="playerTalks">
          {currentPhaseIsTalk && (!currentPlayerIsBottomPlayer || G.__isWaitingBeforeMovingToNextPhase) && G.playersSaid[bottomPlayerID] && (
            <PlayerSaidComponent playerSaid={G.playersSaid[bottomPlayerID]}/>
          )}
          {currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && bottomPlayerSaidAnnounces.length > 0 && (
            <PlayerSaidAnnounceGroupsComponent saidAnnounceGroups={bottomPlayerSaidAnnounces.map(a => a.announceGroup!)}/>
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
              canSayTake={!(G.currentSayTake && G.currentSayTake.sayCoincheLevel === 'coinche' && G.currentSayTake.playerID === playerID)}
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
    </div>
  );
};
