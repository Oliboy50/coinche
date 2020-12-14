import React, {Suspense, useContext} from 'react';
import {Card, SecretCard} from '../../../../../../shared/coinche';
import {CardDisplay, CardDisplayContext} from '../../../../../context/cardDisplay';
import {UnicodeCardComponent} from './UnicodeCard';

const DejaVuFontCardComponent = React.lazy(() => import('./DejaVuFontCard').then(({ DejaVuFontCardComponent }) => ({ default: DejaVuFontCardComponent })));

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
  const cardDisplay = useContext(CardDisplayContext);

  switch (cardDisplay) {
    case CardDisplay.UnicodeNativeFont:
      return <UnicodeCardComponent {...props}/>;
    case CardDisplay.UnicodeDejaVuFont:
      return <Suspense fallback={<span />}>
        <DejaVuFontCardComponent {...props}/>
      </Suspense>;
  }
};
