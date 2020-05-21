import {GameName} from '../../shared';
import {PlayerID} from '../../shared/coinche';

if (!process.env.REACT_APP_API_BASE_URL) {
  throw new Error('REACT_APP_API_BASE_URL env var must be set');
}
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL.endsWith('/') ? process.env.REACT_APP_API_BASE_URL.slice(0, -1) : process.env.REACT_APP_API_BASE_URL;

export const getApiBaseUrl = (): string => apiBaseUrl;

export const requestToGetRooms = async (gameName: GameName): Promise<{
  rooms: {
    roomID: string;
    players: {
      id: PlayerID;
      name?: string;
    }[];
  }[];
}> => {
  const response = await fetch(`${apiBaseUrl}/games/${gameName}`);
  const responseData: {
    rooms: {
      gameID: string;
      players: {
        id: number;
        name?: string;
      }[];
    }[];
  } = await response.json();

  return {
    rooms: responseData.rooms.map(room => ({
      roomID: room.gameID,
      players: room.players.map(player => ({
        ...player,
        id: player.id.toString() as PlayerID,
      })),
    })),
  };
};

export const requestToCreateRoom = async (gameName: GameName): Promise<{
  roomID: string;
}> => {
  const response = await fetch(`${apiBaseUrl}/games/${gameName}/create`, {
    method: 'POST',
    body: JSON.stringify({
      // @TODO: factorize howManyCoinchePlayers value
      numPlayers: 4,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  const responseData: {
    gameID: string;
  } = await response.json();

  return {
    roomID: responseData.gameID,
  };
};

export const requestToJoinRoom = async (gameName: GameName, roomID: string, playerID: PlayerID, playerName: string): Promise<{
  playerRoomKey: string;
}> => {
  const response = await fetch(`${apiBaseUrl}/games/${gameName}/${roomID}/join`, {
    method: 'POST',
    body: JSON.stringify({
      playerID,
      playerName,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  const responseData: {
    playerCredentials: string;
  } = await response.json();

  return {
    playerRoomKey: responseData.playerCredentials,
  };
};

export const requestToLeaveRoom = async (gameName: GameName, roomID: string, playerID: PlayerID, playerRoomKey: string): Promise<void> => {
  await fetch(`${apiBaseUrl}/games/${gameName}/${roomID}/leave`, {
    method: 'POST',
    body: JSON.stringify({
      playerID,
      credentials: playerRoomKey,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
};
