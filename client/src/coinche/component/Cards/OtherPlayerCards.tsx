import React, {useContext} from 'react';
import {Card, SecretCard} from '../../../shared/coinche';
import {UnicodeCardComponent} from '../Card';
import {ThemeContext} from '../../context/theme';
import styles from './OtherPlayerCards.module.css';

type ComponentProps = {
  cards: (Card | SecretCard)[],
};
export const OtherPlayerCardsComponent: React.FunctionComponent<ComponentProps> = ({
  cards,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={styles.cards}>
      {cards.map((card, i) => {
        const cardKey = `${i}`;

        return theme.cardDisplay === 'unicode' && (
          <UnicodeCardComponent
            key={cardKey}
            card={card}
          />
        );
      })}
    </div>
  );
};
