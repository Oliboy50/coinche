import './Options.css';
import React, {useContext} from 'react';
import {LanguageCode, validLanguageCodes} from '../../shared';
import {I18nContext} from '../context/i18n';
import {CardDisplay, CardDisplayContext, validCardDisplays} from '../context/cardDisplay';

type ComponentProps = {
  updateLanguageCode: (lc: LanguageCode) => void;
  updateCardDisplay: (c: CardDisplay) => void,
};
export const OptionsComponent: React.FunctionComponent<ComponentProps> = ({
  updateLanguageCode,
  updateCardDisplay,
}) => {
  const { common: i18n } = useContext(I18nContext);
  const onChangeLanguageCode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguageCode = event.target.value as LanguageCode;
    if (validLanguageCodes.includes(newLanguageCode)) {
      updateLanguageCode(newLanguageCode);
    }
  };

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
        <label htmlFor="selectLanguageCode">{i18n.Options.selectLanguageCode}</label>
        <select id="selectLanguageCode" value={i18n.languageCode} onChange={onChangeLanguageCode} data-testid="select languageCode">
          {validLanguageCodes.map(display => (
            <option value={display} key={`languageCode_${display}`}>
              {i18n.Options.languageCode[display]}
            </option>
          ))}
        </select>
      </div>
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
