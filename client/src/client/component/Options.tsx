import './Options.css';
import React, {useContext} from 'react';
import {I18nContext} from '../context/i18n';
import {CardDisplay, CardDisplayContext, validCardDisplays} from '../context/cardDisplay';

type ComponentProps = {
  updateCardDisplay: (c: CardDisplay) => void,
};
export const OptionsComponent: React.FunctionComponent<ComponentProps> = ({
  updateCardDisplay,
}) => {
  const { common: i18n } = useContext(I18nContext);
  const selectedCardDisplay = useContext(CardDisplayContext);

  const onChangeCardDisplay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCardDisplay = event.target.value as CardDisplay;
    if (validCardDisplays.includes(newCardDisplay)) {
      updateCardDisplay(newCardDisplay);
    }
  };

  return (
    <div className="options">
      <div className="option">
        <label htmlFor="selectCardDisplay">{i18n.Options.selectCardDisplay}</label>
        <select id="selectCardDisplay" value={selectedCardDisplay} onChange={onChangeCardDisplay} data-testid="select cardDisplay">
          {validCardDisplays.map(display => (
            <option value={display} key={`cardDisplay_${display}`}>
              {i18n.Options.cardDisplay[display]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
