import React from 'react';
import {
  Card,
  CardColor,
  CardName,
  GameState,
  isPlayableCard,
  isSameCard,
  Moves,
  PlayerID,
  TrumpMode,
} from '../../shared/coinche';
import {CardComponent} from './Card';

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
  playersCardPlayedInCurrentTurn: GameState['playersCardPlayedInCurrentTurn'],
  firstPlayerInCurrentTurn: PlayerID,
  playerPartner: PlayerID,
  sayBelotOrNot: Moves['sayBelotOrNot'],
  belotCards: Card[],
};
export const MyCardsComponent: React.FunctionComponent<ComponentProps> = ({
  cards,
  isMyTurnToPlayACard,
  playCard,
  trumpMode,
  playersCardPlayedInCurrentTurn,
  firstPlayerInCurrentTurn,
  playerPartner,
  sayBelotOrNot,
  belotCards,
}) => {
  return (
    <div className="myCards">
      {cards.sort(sortCardsFromSpadeToHeartAndFromAceToSeven).map(card => {
        const cardKey = `${card.color}${card.name}`;
        const isBelotCard = belotCards.some(bc => isSameCard(bc, card));
        const playCardState = isMyTurnToPlayACard
          ? (isPlayableCard(card, cards, trumpMode, playersCardPlayedInCurrentTurn, firstPlayerInCurrentTurn, playerPartner) ? 'playable' : 'forbidden')
          : undefined;
        const onCardClick = (playCardState === 'playable' && !isBelotCard) ? () => playCard(card) : undefined;
        const onSayBelotClick = (playCardState === 'playable' && isBelotCard) ? () => {
          sayBelotOrNot(true);
          playCard(card);
        } : undefined;
        const onDontSayBelotClick = (playCardState === 'playable' && isBelotCard) ? () => {
          sayBelotOrNot(false);
          playCard(card);
        } : undefined;

        return <React.Fragment key={cardKey}>
          <CardComponent
            card={card}
            playCardState={playCardState}
            onCardClick={onCardClick}
            onSayBelotClick={onSayBelotClick}
            onDontSayBelotClick={onDontSayBelotClick}
          />
        </React.Fragment>;
      })}
    </div>
  );
};
