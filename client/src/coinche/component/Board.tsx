import React from 'react';
import {BoardProps} from 'boardgame.io/react';
import styles from './Board.module.css';
import {
  GameStatePlayerView,
  getTurnOrder,
  Moves,
  PhaseID,
  PlayerID,
} from '../../shared/coinche';
import {TalkMenuComponent} from './TalkMenu';
import {MyCardsComponent} from './Cards';
import {OtherPlayerCardsComponent} from './Cards/OtherPlayerCards';
import {StupidTypescript} from '../../shared/errors';
import {PlayerSaidComponent} from './PlayerSaid';

const getPlayerIDForPosition = (bottomPlayerID: PlayerID, position: 'top' | 'left' | 'right' | 'bottom'): PlayerID => {
  if (position === 'bottom') {
    return bottomPlayerID;
  }

  const turnOrder = getTurnOrder(bottomPlayerID);
  if (position === 'right') {
    return turnOrder[1];
  }
  if (position === 'top') {
    return turnOrder[2];
  }
  if (position === 'left') {
    return turnOrder[3];
  }

  throw new StupidTypescript();
};

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

  return (
    <React.Fragment>
      <div className={styles.board}>
        <div className={`${styles.player} ${styles.top}`}>
          {ctx.phase === PhaseID.Talk && G.playersSaid[topPlayerID] && (
            <PlayerSaidComponent playerSaid={G.playersSaid[topPlayerID]}/>
          )}
          <OtherPlayerCardsComponent cards={G.playersCards[topPlayerID]} />
        </div>
        <div className={`${styles.player} ${styles.left}`}>
          {ctx.phase === PhaseID.Talk && G.playersSaid[leftPlayerID] && (
            <PlayerSaidComponent playerSaid={G.playersSaid[leftPlayerID]}/>
          )}
          <OtherPlayerCardsComponent cards={G.playersCards[leftPlayerID]} />
        </div>
        <div className={`${styles.player} ${styles.right}`}>
          {ctx.phase === PhaseID.Talk && G.playersSaid[rightPlayerID] && (
            <PlayerSaidComponent playerSaid={G.playersSaid[rightPlayerID]}/>
          )}
          <OtherPlayerCardsComponent cards={G.playersCards[rightPlayerID]} />
        </div>
        <div className={`${styles.player} ${styles.bottom}`}>
          {ctx.phase === PhaseID.Talk && bottomPlayerID === ctx.currentPlayer && (
            <TalkMenuComponent moves={moves} playersSaid={G.playersSaid} />
          )}
          {ctx.phase === PhaseID.Talk && bottomPlayerID !== ctx.currentPlayer && G.playersSaid[bottomPlayerID] && (
            <PlayerSaidComponent playerSaid={G.playersSaid[bottomPlayerID]}/>
          )}
          <MyCardsComponent cards={G.playerCards} isPlayCardsPhase={ctx.phase === 'PlayCards'} playCard={moves.playCard} />
        </div>
      </div>
    </React.Fragment>
  );
};
