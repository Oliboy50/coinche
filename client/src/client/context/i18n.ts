import React from 'react';
import {I18n, en, fr} from '../i18n';
import {LanguageCode, validLanguageCodes} from '../../shared';

export const i18n: Record<LanguageCode, I18n> = {
  [LanguageCode.EN]: en,
  [LanguageCode.FR]: fr,
};
export const languageCodeDefaultValue: LanguageCode = (validLanguageCodes.includes(process.env.REACT_APP_LANGUAGE_CODE as LanguageCode))
  ? process.env.REACT_APP_LANGUAGE_CODE as LanguageCode
  : LanguageCode.EN;

export const I18nContext = React.createContext<I18n>(i18n[languageCodeDefaultValue]);
