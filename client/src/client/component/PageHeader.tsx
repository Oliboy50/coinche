import {useContext} from 'react';
import {OptionsContext} from '../context';
import {getCardColorClassForCardColor, getCardSymbolCharForCardColor} from '../service/getCardColorAndSymbol';
import {CardColor} from '../../shared/coinche';

export const PageHeaderComponent: React.FunctionComponent = () => {
  const { state: { cardColorDisplay } } = useContext(OptionsContext);

  return (
    <div className="pageHeader" style={{ fontSize: '40px', textAlign: 'center' }}>
      <span className={getCardColorClassForCardColor(cardColorDisplay, CardColor.Spade)} role="img" aria-label="spade">{getCardSymbolCharForCardColor(CardColor.Spade)}</span>
      {'\u00A0'}<span className={getCardColorClassForCardColor(cardColorDisplay, CardColor.Diamond)} role="img" aria-label="diamond">{getCardSymbolCharForCardColor(CardColor.Diamond)}</span>
      {'\u00A0'}coinche
      {'\u00A0'}<span className={getCardColorClassForCardColor(cardColorDisplay, CardColor.Heart)} role="img" aria-label="heart">{getCardSymbolCharForCardColor(CardColor.Heart)}</span>
      {'\u00A0'}<span className={getCardColorClassForCardColor(cardColorDisplay, CardColor.Club)} role="img" aria-label="club">{getCardSymbolCharForCardColor(CardColor.Club)}</span>
    </div>
  );
};
