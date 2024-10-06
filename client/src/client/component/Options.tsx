import './Options.css';
import {useContext} from 'react';
import {LanguageCode, validLanguageCodes} from '../../shared';
import {OptionsContext, I18nContext} from '../context';
import {CardDisplay, validCardDisplays} from '../context/cardDisplay';
import {CardColorDisplay, validCardColorDisplays} from '../context/cardColor';

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

  const selectedCardColorDisplay = state.cardColorDisplay;
  const onChangeCardColorDisplay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCardColorDisplay = event.target.value as CardColorDisplay;
    if (validCardColorDisplays.includes(newCardColorDisplay)) {
      dispatch({type: 'SET_CARD_COLOR_DISPLAY', payload: newCardColorDisplay});
    }
  };

  return (
    <div className="options">
      <div className="option">
        <label htmlFor="selectLanguageCode">{i18n.Options.selectLanguageCode}</label>
        <select id="selectLanguageCode" value={selectedLanguageCode} onChange={onChangeLanguageCode} data-testid="select languageCode">
          {validLanguageCodes.map(lang => (
            <option value={lang} key={`languageCode_${lang}`}>
              {i18n.Options.languageCode[lang]}
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
      <div className="option">
        <label htmlFor="selectCardColorDisplay">{i18n.Options.selectCardColorDisplay}</label>
        <select id="selectCardColorDisplay" value={selectedCardColorDisplay} onChange={onChangeCardColorDisplay} data-testid="select cardColorDisplay">
          {validCardColorDisplays.map(color => (
            <option value={color} key={`cardColorDisplay_${color}`}>
              {i18n.Options.cardColorDisplay[color]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
