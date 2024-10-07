import {Fragment, useContext} from 'react';
import {CardColor, CardName, secretCard} from '../../../../../../shared/coinche';
import type {CardComponentProps} from './index';
import {CardColorDisplay} from '../../../../../context/cardColor';
import {getCardColorClassForCardColor} from '../../../../../service/getCardColorAndSymbol';
import {OptionsContext} from '../../../../../context';

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

const getColorClass = (cardColorDisplay: CardColorDisplay, card: CardComponentProps['card']): string => {
  if (card === secretCard) {
    return '';
  }

  return getCardColorClassForCardColor(cardColorDisplay, card.color);
};

const getPlayCardStateClass = (playCardState: CardComponentProps['playCardState']): string => {
  switch (playCardState) {
    case undefined:
      return '';
    case 'playable':
      return 'playable';
    case 'forbidden':
      return 'forbidden';
  }
};

export const UnicodeCardComponent: React.FunctionComponent<CardComponentProps & { extraClassName?: string }> = ({
  card,
  playCardState,
  onCardClick,
  onSayBelotClick,
  onDontSayBelotClick,
  extraClassName,
}) => {
  const { state: { cardColorDisplay } } = useContext(OptionsContext);

  return (
    <span className={`cardWrapper ${getPlayCardStateClass(playCardState)} ${extraClassName || ''}`}>
      <span className={`card ${getColorClass(cardColorDisplay, card)}`} onClick={onCardClick} data-testid={`card ${card === secretCard ? 'secretCard' : `${card.color}|${card.name}`}`}>{
        getUnicode(card)
      }</span>
      {onSayBelotClick && onDontSayBelotClick && (
        <Fragment>
          <span className="belotChooseButton say" onClick={onSayBelotClick} role="img" aria-label="say" data-testid="button sayBelot">🔈</span>
          <span className="belotChooseButton dontSay" onClick={onDontSayBelotClick} role="img" aria-label="mute" data-testid="button dontSayBelot">🔇</span>
        </Fragment>
      )}
    </span>
  );
};
