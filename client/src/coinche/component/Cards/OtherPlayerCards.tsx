import React from 'react';
import {Card, SecretCard} from '../../../shared/coinche';
import {CardComponent} from '../Card';
import styles from './OtherPlayerCards.module.css';

type ComponentProps = {
  cards: (Card | SecretCard)[],
};
export const OtherPlayerCardsComponent: React.FunctionComponent<ComponentProps> = ({
  cards,
}) => {
  return (
    <div className={styles.cards}>
      {cards.map((card, i) => {
        const cardKey = `${i}`;

        return <CardComponent key={cardKey} card={card}/>;
      })}
    </div>
  );
};
