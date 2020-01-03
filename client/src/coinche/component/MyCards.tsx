import React from 'react';
import {Card, CardColor, CardName, GameState, isPlayableCard, Moves, PlayerID, TrumpMode} from '../../shared/coinche';
import {CardComponent} from './Card';
import styles from './MyCards.module.css';

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
  switch (a.name) {
    case CardName.Ace:
      return -1;
    case CardName.King:
      switch (b.name) {
        case CardName.Ace:
          return 1;
        default:
          return -1;
      }
    case CardName.Queen:
      switch (b.name) {
        case CardName.Ace:
        case CardName.King:
          return 1;
        default:
          return -1;
      }
    case CardName.Jack:
      switch (b.name) {
        case CardName.Ace:
        case CardName.King:
        case CardName.Queen:
          return 1;
        default:
          return -1;
      }
    case CardName.Ten:
      switch (b.name) {
        case CardName.Nine:
        case CardName.Eight:
        case CardName.Seven:
          return -1;
        default:
          return 1;
      }
    case CardName.Nine:
      switch (b.name) {
        case CardName.Eight:
        case CardName.Seven:
          return -1;
        default:
          return 1;
      }
    case CardName.Eight:
      switch (b.name) {
        case CardName.Seven:
          return -1;
        default:
          return 1;
      }
    case CardName.Seven:
      return 1;
  }
};

type ComponentProps = {
  cards: Card[],
  isMyTurnToPlayACard: boolean,
  playCard: Moves['playCard'],
  trumpMode: TrumpMode,
  playersCardsPlayedInCurrentTurn: GameState['playersCardsPlayedInCurrentTurn'],
  firstPlayerInCurrentTurn: PlayerID,
  playerPartner: PlayerID,
};
export const MyCardsComponent: React.FunctionComponent<ComponentProps> = ({
  cards,
  isMyTurnToPlayACard,
  playCard,
  trumpMode,
  playersCardsPlayedInCurrentTurn,
  firstPlayerInCurrentTurn,
  playerPartner,
}) => {
  return (
    <div className={styles.cards}>
      {cards.sort(sortCardsFromSpadeToHeartAndFromAceToSeven).map(card => {
        const cardKey = `${card.color}${card.name}`;
        const playCardState = isMyTurnToPlayACard
          ? (isPlayableCard(card, cards, trumpMode, playersCardsPlayedInCurrentTurn, firstPlayerInCurrentTurn, playerPartner) ? 'playable' : 'forbidden')
          : undefined;
        const onCardClick = playCardState === 'playable' ? () => playCard(card) : undefined;

        return <span key={cardKey} onClick={onCardClick}>
          <CardComponent card={card} playCardState={playCardState} />
        </span>;
      })}
    </div>
  );
};
