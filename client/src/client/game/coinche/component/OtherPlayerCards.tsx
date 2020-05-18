import React from 'react';
import {Card, SecretCard} from '../../../../shared/coinche';
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
        const key = `${i}`;

        return <CardComponent key={key} card={card} />;
      })}
    </div>
  );
};
