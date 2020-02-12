import React, {useState} from 'react';
import {BoardProps} from 'boardgame.io/react';
import styles from './Board.module.css';
import {
  GameStatePlayerView,
  getPlayerPartner,
  Moves,
  PhaseID,
  PlayerID,
} from '../../shared/coinche';
import {TalkMenuComponent} from './TalkMenu';
import {MyCardsComponent} from './MyCards';
import {OtherPlayerCardsComponent} from './OtherPlayerCards';
import {PlayerSaidComponent} from './PlayerSaid';
import {PlayerTurnIndicatorComponent} from './PlayerTurnIndicator';
import {PreviousCardsPlayedMenuComponent} from './PreviousCardsPlayedMenu';
import {getPlayerIDForPosition} from '../service/getPlayerIDForPosition';
import {PlayedCardsComponent} from './PlayedCards';
import {SayAnnounceMenuComponent} from './SayAnnounceMenu';

export const BoardComponent: React.FunctionComponent<BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>> = ({
  G,
  ctx,
  moves,
  playerID,
}) => {
  const topPlayerID = getPlayerIDForPosition(playerID, 'top');
  const leftPlayerID = getPlayerIDForPosition(playerID, 'left');
  const rightPlayerID = getPlayerIDForPosition(playerID, 'right');
  const bottomPlayerID = playerID;

  const currentPlayerIsTopPlayer = topPlayerID === ctx.currentPlayer;
  const currentPlayerIsLeftPlayer = leftPlayerID === ctx.currentPlayer;
  const currentPlayerIsRightPlayer = rightPlayerID === ctx.currentPlayer;
  const currentPlayerIsBottomPlayer = bottomPlayerID === ctx.currentPlayer;

  const currentPhaseIsTalk = ctx.phase === PhaseID.Talk;
  const currentPhaseIsPlayCards = ctx.phase === PhaseID.PlayCards;
  const currentPhaseNeedsToWaitForAPlayerMove = currentPhaseIsTalk || currentPhaseIsPlayCards;

  const isNotFirstPlayCardTurn = G.playersCardsPlayedInPreviousTurn !== undefined;

  const [isDisplayedPreviousCardsPlayed, setIsDisplayedPreviousCardsPlayed] = useState(false);

  const playedCards = isDisplayedPreviousCardsPlayed ? G.playersCardsPlayedInPreviousTurn : G.playersCardPlayedInCurrentTurn;

  return (
    <div className={styles.board}>
      {/* Played cards area */}
      <div className={styles.playedCardsArea}>
        <PlayedCardsComponent playerID={playerID} playedCards={playedCards} />
        {currentPhaseIsPlayCards && isNotFirstPlayCardTurn && (
          <PreviousCardsPlayedMenuComponent isDisplayedPreviousCardsPlayed={isDisplayedPreviousCardsPlayed} toggleIsDisplayedPreviousCardsPlayed={() => setIsDisplayedPreviousCardsPlayed(!isDisplayedPreviousCardsPlayed)} />
        )}
      </div>

      {/* Players */}
      {!isDisplayedPreviousCardsPlayed && (
        <React.Fragment>
          <div className={`${styles.player} ${styles.top}`}>
            {currentPhaseNeedsToWaitForAPlayerMove && currentPlayerIsTopPlayer && (
              <PlayerTurnIndicatorComponent />
            )}
            {currentPhaseIsTalk && !currentPlayerIsTopPlayer && G.playersSaid[topPlayerID] && (
              <PlayerSaidComponent playerSaid={G.playersSaid[topPlayerID]}/>
            )}
            <OtherPlayerCardsComponent cards={G.playersCards[topPlayerID]} />
          </div>
          <div className={`${styles.player} ${styles.left}`}>
            {currentPhaseNeedsToWaitForAPlayerMove && currentPlayerIsLeftPlayer && (
              <PlayerTurnIndicatorComponent />
            )}
            {currentPhaseIsTalk && !currentPlayerIsLeftPlayer && G.playersSaid[leftPlayerID] && (
              <PlayerSaidComponent playerSaid={G.playersSaid[leftPlayerID]}/>
            )}
            <OtherPlayerCardsComponent cards={G.playersCards[leftPlayerID]} />
          </div>
          <div className={`${styles.player} ${styles.right}`}>
            {currentPhaseNeedsToWaitForAPlayerMove && currentPlayerIsRightPlayer && (
              <PlayerTurnIndicatorComponent />
            )}
            {currentPhaseIsTalk && !currentPlayerIsRightPlayer && G.playersSaid[rightPlayerID] && (
              <PlayerSaidComponent playerSaid={G.playersSaid[rightPlayerID]}/>
            )}
            <OtherPlayerCardsComponent cards={G.playersCards[rightPlayerID]} />
          </div>
          <div className={`${styles.player} ${styles.bottom}`}>
            {currentPhaseNeedsToWaitForAPlayerMove && currentPlayerIsBottomPlayer && (
              <PlayerTurnIndicatorComponent />
            )}
            {/* @TODO: let other players know that a player said an announce */}
            {currentPhaseIsTalk && !currentPlayerIsBottomPlayer && G.playersSaid[bottomPlayerID] && (
              <PlayerSaidComponent playerSaid={G.playersSaid[bottomPlayerID]}/>
            )}
            {currentPhaseIsTalk && currentPlayerIsBottomPlayer && (
              <TalkMenuComponent saySkip={moves.saySkip} sayTake={moves.sayTake} playersSaid={G.playersSaid} />
            )}
            {currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && currentPlayerIsBottomPlayer && (
              <SayAnnounceMenuComponent sayAnnounce={moves.sayAnnounce} availableAnnounces={G.playersAnnounces[bottomPlayerID].filter(a => !a.isSaid).map(a => a.announce)} />
            )}
            <MyCardsComponent
              cards={G.playerCards}
              isMyTurnToPlayACard={currentPhaseIsPlayCards && currentPlayerIsBottomPlayer}
              playCard={moves.playCard}
              trumpMode={G.trumpMode}
              playersCardPlayedInCurrentTurn={G.playersCardPlayedInCurrentTurn}
              firstPlayerInCurrentTurn={G.firstPlayerInCurrentTurn}
              playerPartner={getPlayerPartner(playerID)}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
