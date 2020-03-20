import React, {useState} from 'react';
import {BoardProps} from 'boardgame.io/react';
import styles from './Board.module.css';
import {
  GameStatePlayerView,
  getPlayerPartner,
  Moves,
  PhaseID,
  PlayerID,
  SecretPlayerAnnounce,
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
import {PlayerSaidAnnounceGroupsComponent} from './PlayerSaidAnnounceGroups';

export const BoardComponent: React.FunctionComponent<BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>> = ({
  G,
  ctx,
  moves,
  playerID,
}) => {
  const bottomPlayerID = playerID;
  const topPlayerID = getPlayerIDForPosition(bottomPlayerID, 'top');
  const leftPlayerID = getPlayerIDForPosition(bottomPlayerID, 'left');
  const rightPlayerID = getPlayerIDForPosition(bottomPlayerID, 'right');

  const currentPlayerIsTopPlayer = topPlayerID === ctx.currentPlayer;
  const currentPlayerIsLeftPlayer = leftPlayerID === ctx.currentPlayer;
  const currentPlayerIsRightPlayer = rightPlayerID === ctx.currentPlayer;
  const currentPlayerIsBottomPlayer = bottomPlayerID === ctx.currentPlayer;

  const topPlayerSaidAnnounces = (G.playersAnnounces[topPlayerID] as SecretPlayerAnnounce[]).filter(a => a.isSaid);
  const leftPlayerSaidAnnounces = (G.playersAnnounces[leftPlayerID] as SecretPlayerAnnounce[]).filter(a => a.isSaid);
  const rightPlayerSaidAnnounces = (G.playersAnnounces[rightPlayerID] as SecretPlayerAnnounce[]).filter(a => a.isSaid);
  const bottomPlayerSaidAnnounces = G.playerAnnounces.filter(a => a.isSaid);

  const currentPhaseIsTalk = ctx.phase === PhaseID.Talk;
  const currentPhaseIsPlayCards = ctx.phase === PhaseID.PlayCards;
  const currentPhaseNeedsToWaitForAPlayerMove = currentPhaseIsTalk || currentPhaseIsPlayCards;

  const isNotFirstPlayCardTurn = G.playersCardPlayedInPreviousTurn !== undefined;

  const [isDisplayedPreviousCardsPlayed, setIsDisplayedPreviousCardsPlayed] = useState(false);

  const playedCards = isDisplayedPreviousCardsPlayed ? G.playersCardPlayedInPreviousTurn : G.playersCardPlayedInCurrentTurn;

  return (
    <div className={styles.board}>
      {/* Played cards area */}
      <div className={styles.playedCardsArea}>
        <PlayedCardsComponent bottomPlayerID={bottomPlayerID} playedCards={playedCards} />
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
            {currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && topPlayerSaidAnnounces.length > 0 && (
              <PlayerSaidAnnounceGroupsComponent saidAnnounceGroups={topPlayerSaidAnnounces.map(a => a.announceGroup!)}/>
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
            {currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && leftPlayerSaidAnnounces.length > 0 && (
              <PlayerSaidAnnounceGroupsComponent saidAnnounceGroups={leftPlayerSaidAnnounces.map(a => a.announceGroup!)}/>
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
            {currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && rightPlayerSaidAnnounces.length > 0 && (
              <PlayerSaidAnnounceGroupsComponent saidAnnounceGroups={rightPlayerSaidAnnounces.map(a => a.announceGroup!)}/>
            )}
            <OtherPlayerCardsComponent cards={G.playersCards[rightPlayerID]} />
          </div>
          <div className={`${styles.player} ${styles.bottom}`}>
            {currentPhaseNeedsToWaitForAPlayerMove && currentPlayerIsBottomPlayer && (
              <PlayerTurnIndicatorComponent />
            )}
            {currentPhaseIsTalk && !currentPlayerIsBottomPlayer && G.playersSaid[bottomPlayerID] && (
              <PlayerSaidComponent playerSaid={G.playersSaid[bottomPlayerID]}/>
            )}
            {currentPhaseIsTalk && currentPlayerIsBottomPlayer && (
              <TalkMenuComponent saySkip={moves.saySkip} sayTake={moves.sayTake} playersSaid={G.playersSaid} />
            )}
            {currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && bottomPlayerSaidAnnounces.length > 0 && (
              <PlayerSaidAnnounceGroupsComponent saidAnnounceGroups={bottomPlayerSaidAnnounces.map(a => a.announceGroup)}/>
            )}
            {currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && currentPlayerIsBottomPlayer && (
              <SayAnnounceMenuComponent sayAnnounce={moves.sayAnnounce} availableAnnounces={G.playerAnnounces.filter(a => !a.isSaid).map(a => a.announce)} />
            )}
            <MyCardsComponent
              cards={G.playerCards}
              isMyTurnToPlayACard={currentPhaseIsPlayCards && currentPlayerIsBottomPlayer}
              playCard={moves.playCard}
              trumpMode={G.trumpMode}
              playersCardPlayedInCurrentTurn={G.playersCardPlayedInCurrentTurn}
              firstPlayerInCurrentTurn={G.firstPlayerInCurrentTurn}
              playerPartner={getPlayerPartner(bottomPlayerID)}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
