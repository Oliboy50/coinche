import React from 'react';
import {I18n, fr} from '../i18n';
import {LanguageCode} from '../../../../shared';

export const i18n: Record<LanguageCode, I18n> = {
  fr,
};

export const I18nContext = React.createContext(i18n.fr);
