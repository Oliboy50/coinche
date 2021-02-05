import './Options.css';
import React, {useContext} from 'react';
import {LanguageCode, validLanguageCodes} from '../../shared';
import {OptionsContext, I18nContext} from '../context';
import {CardDisplay, validCardDisplays} from '../context/cardDisplay';

export const OptionsComponent: React.FunctionComponent = () => {
  const { common: i18n } = useContext(I18nContext);
  const { state, dispatch } = useContext(OptionsContext);

  const selectedLanguageCode = state.languageCode;
  const onChangeLanguageCode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguageCode = event.target.value as LanguageCode;
    if (validLanguageCodes.includes(newLanguageCode)) {
      dispatch({type: 'SET_LANGUAGE_CODE', payload: newLanguageCode});
    }
  };

  const selectedCardDisplay = state.cardDisplay;
  const onChangeCardDisplay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCardDisplay = event.target.value as CardDisplay;
    if (validCardDisplays.includes(newCardDisplay)) {
      dispatch({type: 'SET_CARD_DISPLAY', payload: newCardDisplay});
    }
  };

  return (
    <div className="options">
      <div className="option">
        <label htmlFor="selectLanguageCode">{i18n.Options.selectLanguageCode}</label>
        <select id="selectLanguageCode" value={selectedLanguageCode} onChange={onChangeLanguageCode} data-testid="select languageCode">
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
