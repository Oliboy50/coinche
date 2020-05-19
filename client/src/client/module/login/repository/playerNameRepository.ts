const LOCAL_STORAGE_KEY = 'coinche-pn';

export const findPlayerName = (): string => localStorage.getItem(LOCAL_STORAGE_KEY) || '';

export const persistPlayerName = (playerName: string): void => localStorage.setItem(LOCAL_STORAGE_KEY, playerName);
