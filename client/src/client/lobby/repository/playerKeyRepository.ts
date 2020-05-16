export interface PlayerKeysByRoomID {
  [roomID: string]: string | undefined;
}

const LOCAL_STORAGE_KEY = 'coinche-pk';

export const findPlayerKeys = (): PlayerKeysByRoomID => {
  const jsonEncodedPlayerKeys = localStorage.getItem(LOCAL_STORAGE_KEY) || '{}';

  return JSON.parse(jsonEncodedPlayerKeys) || {};
};

export const persistPlayerKeys = (playerKeys: PlayerKeysByRoomID): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(playerKeys));
};
