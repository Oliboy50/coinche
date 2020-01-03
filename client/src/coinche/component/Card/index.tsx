import React, {useContext} from 'react';
import {Card, SecretCard} from '../../../shared/coinche';
import {ThemeContext} from '../../context/theme';
import {UnicodeCardComponent} from './UnicodeCard';
import {StupidTypescript} from '../../../shared/errors';

export type PlayCardState =
  | 'playable' // when the player must play a card and the card is playable
  | 'forbidden' // when the player must play a card and the card is not playable
;

export type CardComponentProps = {
  card: Card | SecretCard,
  playCardState?: PlayCardState,
};
export const CardComponent: React.FunctionComponent<CardComponentProps> = (props) => {
  const theme = useContext(ThemeContext);

  if (theme.cardDisplay === 'unicode') {
    return <UnicodeCardComponent {...props}/>;
  }

  throw new StupidTypescript();
};
