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
  const currentPhaseNeedsPlayerMove = currentPhaseIsTalk || currentPhaseIsPlayCards;

  const isFirstPlayCardTurn = G.playersCardsPlayedInPreviousTurn === undefined;

  // @TODO use isDisplayedPreviousCardsPlayed to display previous cards played (when we'll be able to show the current cards played, it will replace the current cards by the previous... maybe)
  const [isDisplayedPreviousCardsPlayed, setIsDisplayedPreviousCardsPlayed] = useState(false);

  const playedCards = isDisplayedPreviousCardsPlayed ? G.playersCardsPlayedInPreviousTurn : G.playersCardsPlayedInCurrentTurn;

  return (
    <div className={styles.board}>
      {/* Played cards area */}
      <div className={styles.playedCardsArea}>
        <PlayedCardsComponent playerID={playerID} playedCards={playedCards} />
        {currentPhaseIsPlayCards && !isFirstPlayCardTurn && (
          <PreviousCardsPlayedMenuComponent isDisplayedPreviousCardsPlayed={isDisplayedPreviousCardsPlayed} toggleIsDisplayedPreviousCardsPlayed={() => setIsDisplayedPreviousCardsPlayed(!isDisplayedPreviousCardsPlayed)} />
        )}
      </div>

      {/* Players */}
      {!isDisplayedPreviousCardsPlayed && (
        <React.Fragment>
          <div className={`${styles.player} ${styles.top}`}>
            {currentPhaseNeedsPlayerMove && currentPlayerIsTopPlayer && (
              <PlayerTurnIndicatorComponent />
            )}
            {currentPhaseIsTalk && !currentPlayerIsTopPlayer && G.playersSaid[topPlayerID] && (
              <PlayerSaidComponent playerSaid={G.playersSaid[topPlayerID]}/>
            )}
            <OtherPlayerCardsComponent cards={G.playersCards[topPlayerID]} />
          </div>
          <div className={`${styles.player} ${styles.left}`}>
            {currentPhaseNeedsPlayerMove && currentPlayerIsLeftPlayer && (
              <PlayerTurnIndicatorComponent />
            )}
            {currentPhaseIsTalk && !currentPlayerIsLeftPlayer && G.playersSaid[leftPlayerID] && (
              <PlayerSaidComponent playerSaid={G.playersSaid[leftPlayerID]}/>
            )}
            <OtherPlayerCardsComponent cards={G.playersCards[leftPlayerID]} />
          </div>
          <div className={`${styles.player} ${styles.right}`}>
            {currentPhaseNeedsPlayerMove && currentPlayerIsRightPlayer && (
              <PlayerTurnIndicatorComponent />
            )}
            {currentPhaseIsTalk && !currentPlayerIsRightPlayer && G.playersSaid[rightPlayerID] && (
              <PlayerSaidComponent playerSaid={G.playersSaid[rightPlayerID]}/>
            )}
            <OtherPlayerCardsComponent cards={G.playersCards[rightPlayerID]} />
          </div>
          <div className={`${styles.player} ${styles.bottom}`}>
            {currentPhaseNeedsPlayerMove && currentPlayerIsBottomPlayer && (
              <PlayerTurnIndicatorComponent />
            )}
            {currentPhaseIsTalk && !currentPlayerIsBottomPlayer && G.playersSaid[bottomPlayerID] && (
              <PlayerSaidComponent playerSaid={G.playersSaid[bottomPlayerID]}/>
            )}
            {currentPhaseIsTalk && currentPlayerIsBottomPlayer && (
              <TalkMenuComponent moves={moves} playersSaid={G.playersSaid} />
            )}
            <MyCardsComponent
              cards={G.playerCards}
              isMyTurnToPlayACard={currentPhaseIsPlayCards && currentPlayerIsBottomPlayer}
              playCard={moves.playCard}
              trumpMode={G.trumpMode}
              playersCardsPlayedInCurrentTurn={G.playersCardsPlayedInCurrentTurn}
              firstPlayerInCurrentTurn={G.firstPlayerInCurrentTurn}
              playerPartner={getPlayerPartner(playerID)}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
