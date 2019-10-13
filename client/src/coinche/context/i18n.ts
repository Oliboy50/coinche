import React from 'react';
import {I18n, fr} from '../i18n';

export type LanguageCode = 'fr';

export const i18n: Record<LanguageCode, I18n> = {
  fr,
};

// @TODO: add env var to set the default language code
export const I18nContext = React.createContext(i18n.fr);
