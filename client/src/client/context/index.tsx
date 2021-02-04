import React, {useReducer} from 'react';
import {LanguageCode} from '../../shared';
import {findOption, persistOption} from '../repository/optionsRepository';
import {I18n} from '../i18n';
import {i18n, languageCodeDefaultValue} from './i18n';
import {CardDisplay, cardDisplayDefaultValue} from './cardDisplay';

type State = {
  languageCode: LanguageCode;
  cardDisplay: CardDisplay;
}
const initialState: State = {
  languageCode: findOption('languageCode') || languageCodeDefaultValue,
  cardDisplay: findOption('cardDisplay') || cardDisplayDefaultValue,
};

type Action =
  | { type: 'SET_LANGUAGE_CODE', payload: LanguageCode }
  | { type: 'SET_CARD_DISPLAY', payload: CardDisplay }
export const optionsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_LANGUAGE_CODE':
      persistOption('languageCode', action.payload);

      return {
        ...state,
        languageCode: action.payload,
      };
    case 'SET_CARD_DISPLAY':
      persistOption('cardDisplay', action.payload);

      return {
        ...state,
        cardDisplay: action.payload,
      };
  }
};

export const OptionsContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const I18nContext = React.createContext<I18n>(i18n[initialState.languageCode]);

export const ContextProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(optionsReducer, initialState);

  return (
    <OptionsContext.Provider value={{state, dispatch}}>
      <I18nContext.Provider value={i18n[state.languageCode]}>
        {children}
      </I18nContext.Provider>
    </OptionsContext.Provider>
  );
};
