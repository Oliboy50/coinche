import React from 'react';
import {Card, CardColor, CardName, secretCard, SecretCard} from '../../../shared/coinche';
import {StupidTypescript} from '../../../shared/errors';
import styles from './UnicodeCard.module.css';

const getUnicodeForCard = (card: Card | SecretCard): string => {
  if (card === secretCard) {
    return '🂠';
  }

  switch (card.color) {
    case CardColor.Spade:
      switch (card.name) {
        case CardName.Ace:
          return '🂡';
        case CardName.Seven:
          return '🂧';
        case CardName.Eight:
          return '🂨';
        case CardName.Nine:
          return '🂩';
        case CardName.Ten:
          return '🂪';
        case CardName.Jack:
          return '🂫';
        case CardName.Queen:
          return '🂭';
        case CardName.King:
          return '🂮';
      }
      break;
    case CardColor.Diamond:
      switch (card.name) {
        case CardName.Ace:
          return '🃁';
        case CardName.Seven:
          return '🃇';
        case CardName.Eight:
          return '🃈';
        case CardName.Nine:
          return '🃉';
        case CardName.Ten:
          return '🃊';
        case CardName.Jack:
          return '🃋';
        case CardName.Queen:
          return '🃍';
        case CardName.King:
          return '🃎';
      }
      break;
    case CardColor.Heart:
      switch (card.name) {
        case CardName.Ace:
          return '🂱';
        case CardName.Seven:
          return '🂷';
        case CardName.Eight:
          return '🂸';
        case CardName.Nine:
          return '🂹';
        case CardName.Ten:
          return '🂺';
        case CardName.Jack:
          return '🂻';
        case CardName.Queen:
          return '🂽';
        case CardName.King:
          return '🂾';
      }
      break;
    case CardColor.Club:
      switch (card.name) {
        case CardName.Ace:
          return '🃑';
        case CardName.Seven:
          return '🃗';
        case CardName.Eight:
          return '🃘';
        case CardName.Nine:
          return '🃙';
        case CardName.Ten:
          return '🃚';
        case CardName.Jack:
          return '🃛';
        case CardName.Queen:
          return '🃝';
        case CardName.King:
          return '🃞';
      }
      break;
  }

  throw new StupidTypescript();
};

const getClassForCard = (card: Card | SecretCard): string => {
  if (card === secretCard) {
    return '';
  }

  switch (card.color) {
    case CardColor.Spade:
    case CardColor.Club:
      return styles.black;
    case CardColor.Diamond:
    case CardColor.Heart:
      return styles.red;
  }
};

type ComponentProps = {
  card: Card | SecretCard,
};
export const UnicodeCardComponent: React.FunctionComponent<ComponentProps> = ({
  card,
}) => {
  return (
      <span className={`${styles.card} ${getClassForCard(card)}`}>{getUnicodeForCard(card)}</span>
  );
};
