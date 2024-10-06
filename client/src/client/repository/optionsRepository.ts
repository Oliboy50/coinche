import type {LanguageCode} from '../../shared';
import type {CardDisplay} from '../context/cardDisplay';
import type {CardColorDisplay} from '../context/cardColor';

interface Options {
  languageCode: LanguageCode;
  cardDisplay: CardDisplay;
  cardColorDisplay: CardColorDisplay;
}

const LOCAL_STORAGE_KEY = 'coinche-opt';

const findOptions = (): Options => {
  const jsonEncodedOptions = localStorage.getItem(LOCAL_STORAGE_KEY) || '{}';

  return JSON.parse(jsonEncodedOptions) || {};
};

export const findOption = <T extends keyof Options>(key: T): Options[T] | undefined => findOptions()[key] || undefined;

export const persistOption = <T extends keyof Options>(key: T, value: Options[T]): void => {
  const options = findOptions();

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
    ...options,
    [key]: value,
  }));
};
