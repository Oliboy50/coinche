import React from 'react';
import {Card, SecretCard} from '../../shared/coinche';
import {CardComponent} from './Card';

type ComponentProps = {
  cards: (Card | SecretCard)[],
};
export const OtherPlayerCardsComponent: React.FunctionComponent<ComponentProps> = ({
  cards,
}) => {
  return (
    <div className="otherPlayerCards">
      {cards.map((card, i) => {
        const cardKey = `${i}`;

        return <CardComponent key={cardKey} card={card} />;
      })}
    </div>
  );
};
