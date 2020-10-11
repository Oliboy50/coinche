export interface PlayerKeysByRoomID {
  [roomID: string]: string | undefined;
}

const LOCAL_STORAGE_KEY = 'coinche-pk';

const getPlayersKeysByPlayerName = (): {[playerName: string]: PlayerKeysByRoomID} => {
  const jsonEncodedPlayersKeysByPlayerName = localStorage.getItem(LOCAL_STORAGE_KEY) || '{}';

  return JSON.parse(jsonEncodedPlayersKeysByPlayerName) || {};
};

export const findPlayerKeys = (playerName: string): PlayerKeysByRoomID => getPlayersKeysByPlayerName()[playerName] || {};

export const persistPlayerKeys = (playerName: string, playerKeys: PlayerKeysByRoomID): void => {
  const playersKeysByPlayerName = getPlayersKeysByPlayerName();

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
    ...playersKeysByPlayerName,
    [playerName]: playerKeys,
  }));
};
