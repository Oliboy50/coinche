import React from 'react';
import {BoardProps} from 'boardgame.io/react';
import styles from './Board.module.css';
import {
  GameStatePlayerView, getTurnOrder,
  Moves,
  PhaseID,
  PlayerID,
} from '../../shared/coinche';
import {TalkMenuComponent} from './TalkMenu';
import {MyCardsComponent} from './Cards';
import {OtherPlayerCardsComponent} from './Cards/OtherPlayerCards';
import {StupidTypescript} from '../../shared/errors';

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
  return (
    <React.Fragment>
      <div className={styles.board}>
        <div className={`${styles.player} ${styles.top}`}>
          <OtherPlayerCardsComponent cards={G.playersCards[getPlayerIDForPosition(playerID, 'top')]} />
        </div>
        <div className={`${styles.player} ${styles.left}`}>
          <OtherPlayerCardsComponent cards={G.playersCards[getPlayerIDForPosition(playerID, 'left')]} />
        </div>
        <div className={`${styles.player} ${styles.right}`}>
          <OtherPlayerCardsComponent cards={G.playersCards[getPlayerIDForPosition(playerID, 'right')]} />
        </div>
        <div className={`${styles.player} ${styles.bottom}`}>
          {ctx.phase === PhaseID.Talk && playerID === ctx.currentPlayer && (
            <TalkMenuComponent moves={moves} playersSaid={G.playersSaid} />
          )}
          <MyCardsComponent cards={G.playerCards} isPlayCardsPhase={ctx.phase === 'PlayCards'} playCard={moves.playCard} />
        </div>
      </div>
    </React.Fragment>
  );
};
