import React, {useContext} from 'react';
import {Card, SecretCard} from '../../../shared/coinche';
import {ThemeContext} from '../../context/theme';
import { UnicodeCardComponent } from './UnicodeCard';
import {StupidTypescript} from '../../../shared/errors';

type ComponentProps = {
  card: Card | SecretCard,
};
export const CardComponent: React.FunctionComponent<ComponentProps> = ({
  card,
}) => {
  const theme = useContext(ThemeContext);

  if (theme.cardDisplay === 'unicode') {
    return <UnicodeCardComponent card={card}/>;
  }

  throw new StupidTypescript();
};
