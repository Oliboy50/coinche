import React from 'react';
import {CardColor, CardName, secretCard} from '../../../shared/coinche';
import {CardComponentProps} from './index';
import styles from './UnicodeCard.module.css';

const getUnicode = (card: CardComponentProps['card']): string => {
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
  }
};

const getColorClass = (card: CardComponentProps['card']): string => {
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

const getPlayCardStateClass = (playCardState: CardComponentProps['playCardState']): string => {
  switch (playCardState) {
    case undefined:
      return '';
    case 'playable':
      return styles.playable;
    case 'forbidden':
      return styles.forbidden;
  }
};

export const UnicodeCardComponent: React.FunctionComponent<CardComponentProps> = ({
  card,
  playCardState,
}) => {
  return (
    <span className={`${styles.card} ${getColorClass(card)} ${getPlayCardStateClass(playCardState)}`}>{
      getUnicode(card)
    }</span>
  );
};
