import React, {useContext} from 'react';
import {Card, SecretCard} from '../../../../../shared/coinche';
import {ThemeContext} from '../../context/theme';
import {UnicodeCardComponent} from './UnicodeCard';

export type PlayCardState =
  | 'playable' // when the player must play a card and the card is playable
  | 'forbidden' // when the player must play a card and the card is not playable
;

export type CardComponentProps = {
  card: Card | SecretCard,
  playCardState?: PlayCardState,
  onCardClick?: () => void,
  onSayBelotClick?: () => void,
  onDontSayBelotClick?: () => void,
};
export const CardComponent: React.FunctionComponent<CardComponentProps> = (props) => {
  const theme = useContext(ThemeContext);

  switch (theme.cardDisplay) {
    case 'unicode':
      return <UnicodeCardComponent {...props}/>;
  }
};
