import {lazy, Suspense, useContext} from 'react';
import type {Card, SecretCard} from '../../../../../../shared/coinche';
import {OptionsContext} from '../../../../../context';
import {CardDisplay} from '../../../../../context/cardDisplay';
import {UnicodeCardComponent} from './UnicodeCard';

const DejaVuFontCardComponent = lazy(() => import('./DejaVuFontCard').then(({ DejaVuFontCardComponent }) => ({ default: DejaVuFontCardComponent })));

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
  const { state: { cardDisplay, cardColorDisplay } } = useContext(OptionsContext);

  switch (cardDisplay) {
    case CardDisplay.UnicodeNativeFont:
      return <UnicodeCardComponent cardColorDisplay={cardColorDisplay} {...props}/>;
    case CardDisplay.UnicodeDejaVuFont:
      return <Suspense fallback={<span />}>
        <DejaVuFontCardComponent cardColorDisplay={cardColorDisplay} {...props}/>
      </Suspense>;
  }
};
