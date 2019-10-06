import React, {useContext} from 'react';
import {Card, CardColor, CardName, Moves} from '../../../shared/coinche';
import {UnicodeCardComponent} from '../Card';
import {ThemeContext} from '../../context/theme';
import styles from './MyCards.module.css';
import {StupidTypescript} from '../../../shared/errors';

const sortCardsFromSpadeToHeartAndFromAceToSeven = (a: Card, b: Card): number => {
  // sort by color
  if (a.color === CardColor.Spade && b.color !== CardColor.Spade) {
    return -1;
  }
  if (a.color === CardColor.Diamond) {
    switch (b.color) {
      case CardColor.Heart:
      case CardColor.Club:
        return -1;
      case CardColor.Spade:
        return 1;
    }
  }
  if (a.color === CardColor.Club) {
    switch (b.color) {
      case CardColor.Heart:
        return -1;
      case CardColor.Spade:
      case CardColor.Diamond:
        return 1;
    }
  }
  if (a.color === CardColor.Heart && b.color !== CardColor.Heart) {
    return 1;
  }
  // both cards have the same color

  // sort by name
  if (a.name === CardName.Ace) {
    return -1;
  }
  if (a.name === CardName.King) {
    switch (b.name) {
      case CardName.Ace:
        return 1;
      default:
        return -1;
    }
  }
  if (a.name === CardName.Queen) {
    switch (b.name) {
      case CardName.Ace:
      case CardName.King:
        return 1;
      default:
        return -1;
    }
  }
  if (a.name === CardName.Jack) {
    switch (b.name) {
      case CardName.Ace:
      case CardName.King:
      case CardName.Queen:
        return 1;
      default:
        return -1;
    }
  }
  if (a.name === CardName.Ten) {
    switch (b.name) {
      case CardName.Nine:
      case CardName.Eight:
      case CardName.Seven:
        return -1;
      default:
        return 1;
    }
  }
  if (a.name === CardName.Nine) {
    switch (b.name) {
      case CardName.Eight:
      case CardName.Seven:
        return -1;
      default:
        return 1;
    }
  }
  if (a.name === CardName.Eight) {
    switch (b.name) {
      case CardName.Seven:
        return -1;
      default:
        return 1;
    }
  }
  if (a.name === CardName.Seven) {
    return 1;
  }

  throw new StupidTypescript();
};

type ComponentProps = {
  cards: Card[],
  isPlayCardsPhase: boolean,
  playCard: Moves['playCard'],
};
export const MyCardsComponent: React.FunctionComponent<ComponentProps> = ({
  cards,
  isPlayCardsPhase,
  playCard,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={styles.cards}>
      {cards.sort(sortCardsFromSpadeToHeartAndFromAceToSeven).map(card => {
        const cardKey = `${card.color}${card.name}`;
        const isPlayableCard = isPlayCardsPhase && !card.isNotPlayable;

        return theme.cardDisplay === 'unicode' && (
          <UnicodeCardComponent
            key={cardKey}
            card={card}
            {...(isPlayableCard && {
              onClick: () => playCard(card),
            })}
          />
        );
      })}
    </div>
  );
};
