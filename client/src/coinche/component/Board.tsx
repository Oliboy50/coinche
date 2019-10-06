import React from 'react';
import {BoardProps} from 'boardgame.io/react';
import styles from './Board.module.css';
import {
  GameStatePlayerView,
  Moves,
  PhaseID,
  PlayerID,
} from '../../shared/coinche';
import {TalkMenuComponent} from './TalkMenu';
import {MyCardsComponent} from './Cards';

export const BoardComponent: React.FunctionComponent<BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>> = ({
  G,
  ctx,
  moves,
}) => {
  return (
    <React.Fragment>
      <div className={styles.board}>
        <div className={styles.player}>top</div>
        <div className={styles.player}>left</div>
        <div className={styles.player}>right</div>
        <div className={styles.player}>
          <MyCardsComponent cards={G.playerCards} isPlayCardsPhase={ctx.phase === 'PlayCards'} playCard={moves.playCard} />
          {ctx.phase === PhaseID.Talk && (
            <TalkMenuComponent moves={moves} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
