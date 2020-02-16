import React from 'react';
import {Card, PlayerID} from '../../shared/coinche';
import {CardComponent} from './Card';
import styles from './PlayedCards.module.css';
import {getPlayerIDForPosition} from '../service/getPlayerIDForPosition';

type ComponentProps = {
  bottomPlayerID: PlayerID,
  playedCards: Record<PlayerID, Card | undefined> | undefined,
};
export const PlayedCardsComponent: React.FunctionComponent<ComponentProps> = ({
  bottomPlayerID,
  playedCards,
}) => {

  const bottomPlayerCard = playedCards && playedCards[bottomPlayerID];
  const topPlayerCard = playedCards && playedCards[getPlayerIDForPosition(bottomPlayerID, 'top')];
  const leftPlayerCard = playedCards && playedCards[getPlayerIDForPosition(bottomPlayerID, 'left')];
  const rightPlayerCard = playedCards && playedCards[getPlayerIDForPosition(bottomPlayerID, 'right')];

  return (
    <React.Fragment>
      <div className={`${styles.card} ${styles.top}`}>
        {topPlayerCard && <CardComponent card={topPlayerCard} />}
      </div>
      <div className={`${styles.card} ${styles.left}`}>
        {leftPlayerCard && <CardComponent card={leftPlayerCard} />}
      </div>
      <div className={`${styles.card} ${styles.right}`}>
        {rightPlayerCard && <CardComponent card={rightPlayerCard} />}
      </div>
      <div className={`${styles.card} ${styles.bottom}`}>
        {bottomPlayerCard && <CardComponent card={bottomPlayerCard} />}
      </div>
    </React.Fragment>
  );
};
