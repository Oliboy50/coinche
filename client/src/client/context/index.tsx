import React, {useReducer} from 'react';
import {LanguageCode} from '../../shared';
import {findOption, persistOption} from '../repository/optionsRepository';
import {I18n} from '../i18n';
import {i18n, languageCodeDefaultValue} from './i18n';
import {CardDisplay, cardDisplayDefaultValue} from './cardDisplay';
import {OptionsComponent} from '../component/Options';

type OptionsState = {
  languageCode: LanguageCode;
  cardDisplay: CardDisplay;
};
const optionsInitialState: OptionsState = {
  languageCode: findOption('languageCode') || languageCodeDefaultValue,
  cardDisplay: findOption('cardDisplay') || cardDisplayDefaultValue,
};
type OptionsAction =
  | { type: 'SET_LANGUAGE_CODE', payload: LanguageCode }
  | { type: 'SET_CARD_DISPLAY', payload: CardDisplay }
;
const optionsReducer = (state: OptionsState, action: OptionsAction) => {
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
  state: OptionsState;
  dispatch: React.Dispatch<OptionsAction>;
}>({
  state: optionsInitialState,
  dispatch: () => null,
});

export const I18nContext = React.createContext<I18n>(i18n[optionsInitialState.languageCode]);

export interface PageMenuButton {
  id: string;
  renderContent: JSX.Element;
  renderButton: JSX.Element;
  isOpened: boolean;
}
type PageMenuState = {
  buttons: PageMenuButton[];
};
const pageMenuInitialState: PageMenuState = {
  buttons: [
    {
      id: 'options',
      renderContent: <OptionsComponent />,
      renderButton: <span role="img" aria-label="options" data-testid="button options">⚙️</span>,
      isOpened: false,
    },
  ],
};
type PageMenuAction =
  | { type: 'SET_EXTRA_BUTTON', payload: Omit<PageMenuButton, 'isOpened'> }
  | { type: 'REMOVE_EXTRA_BUTTONS' }
  | { type: 'TOGGLE_IS_OPENED_BUTTON_BY_ID', payload: string }
;
const pageMenuReducer = (state: PageMenuState, action: PageMenuAction) => {
  switch (action.type) {
    case 'SET_EXTRA_BUTTON':
      const buttonIndex = state.buttons.findIndex(({id}) => id === action.payload.id);
      if (buttonIndex === -1) {
        return {
          ...state,
          buttons: [{...action.payload, isOpened: false}, ...state.buttons],
        };
      }

      return {
        ...state,
        buttons: [
          ...state.buttons.slice(0, buttonIndex),
          {
            ...action.payload,
            isOpened: state.buttons[buttonIndex].isOpened,
          },
          ...state.buttons.slice(buttonIndex + 1),
        ],
      };
    case 'REMOVE_EXTRA_BUTTONS':
      return {
        ...state,
        buttons: state.buttons.filter(b => pageMenuInitialState.buttons.map(({id}) => id).includes(b.id)),
      };
    case 'TOGGLE_IS_OPENED_BUTTON_BY_ID':
      return {
        ...state,
        buttons: state.buttons.map(b => ({
          ...b,
          isOpened: (b.id === action.payload) ? !b.isOpened : false,
        })),
      };
  }
};
export const PageMenuContext = React.createContext<{
  state: PageMenuState;
  dispatch: React.Dispatch<PageMenuAction>;
}>({
  state: pageMenuInitialState,
  dispatch: () => null,
});

export const ContextProvider: React.FunctionComponent = ({ children }) => {
  const [optionsState, optionsDispatch] = useReducer(optionsReducer, optionsInitialState);
  const [pageMenuState, pageMenuDispatch] = useReducer(pageMenuReducer, pageMenuInitialState);

  return (
    <OptionsContext.Provider value={{state: optionsState, dispatch: optionsDispatch}}>
      <I18nContext.Provider value={i18n[optionsState.languageCode]}>
        <PageMenuContext.Provider value={{state: pageMenuState, dispatch: pageMenuDispatch}}>
          {children}
        </PageMenuContext.Provider>
      </I18nContext.Provider>
    </OptionsContext.Provider>
  );
};
