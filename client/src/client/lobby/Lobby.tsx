import './Lobby.css';
import React, {useContext} from 'react';
import axios from 'axios';
import useSWR, {mutate as refetchSWR} from 'swr';
import {GameName} from '../../shared';
import {PlayerID} from '../../shared/coinche';
import {I18nContext} from './context/i18n';
import {persistPlayerKeys, PlayerKeysByRoomID} from './repository/playerKeyRepository';

interface GetRoomsResponse {
  data: {
    rooms: {
      gameID: string;
      players: {
        id: PlayerID;
        name?: string;
      }[];
    }[];
  };
}

interface CreateRoomResponse {
  data: {
    gameID: string;
  };
}

interface JoinRoomResponse {
  data: {
    playerCredentials: string;
  };
}

type ComponentProps = {
  apiBaseUrl: string;
  playerName: string;
  playerKeysByRoomID: PlayerKeysByRoomID;
  setPlayerKeysByRoomID: (playerKeysByRoomID: PlayerKeysByRoomID) => void;
};
export const LobbyComponent: React.FunctionComponent<ComponentProps> = ({
  apiBaseUrl,
  playerName,
  playerKeysByRoomID,
  setPlayerKeysByRoomID,
}) => {
  const i18n = useContext(I18nContext);

  const updatePlayerKey = (roomID: string, playerKey: string | undefined) => {
    let newPlayerKeysByRoomID;
    if (!playerKey) {
      const {[roomID]: _, ...playerKeysByRoomIDWithoutThisOne} = playerKeysByRoomID;
      newPlayerKeysByRoomID = playerKeysByRoomIDWithoutThisOne;
    } else {
      newPlayerKeysByRoomID = { ...playerKeysByRoomID, [roomID]: playerKey };
    }

    setPlayerKeysByRoomID(newPlayerKeysByRoomID);
    persistPlayerKeys(newPlayerKeysByRoomID);
  };

  const { data: getCoincheRoomsResponse } = useSWR<GetRoomsResponse>(`${apiBaseUrl}/games/${GameName.Coinche}`, (url) => axios.get(url));

  const createRoom = async (gameName: GameName) => {
    const response: CreateRoomResponse = await axios.post(`${apiBaseUrl}/games/${gameName}/create`, {
      // @TODO: factorize howManyCoinchePlayers value
      numPlayers: 4,
    });

    // automatically join the created room
    await joinRoom(gameName, response.data.gameID, PlayerID.North);

    await refetchSWR(`${apiBaseUrl}/games/${gameName}`);
  };

  const joinRoom = async (gameName: GameName, roomID: string, playerID: PlayerID) => {
    const response: JoinRoomResponse = await axios.post(`${apiBaseUrl}/games/${gameName}/${roomID}/join`, {
      playerID,
      playerName,
    });

    updatePlayerKey(roomID, response.data.playerCredentials);

    await refetchSWR(`${apiBaseUrl}/games/${gameName}`);
  };

  const leaveRoom = async (gameName: GameName, roomID: string, playerID: PlayerID) => {
    await axios.post(`${apiBaseUrl}/games/${gameName}/${roomID}/leave`, {
      playerID,
      credentials: playerKeysByRoomID[roomID],
    });

    updatePlayerKey(roomID, undefined);

    await refetchSWR(`${apiBaseUrl}/games/${gameName}`);
  };

  // const CoincheComponent = buildGameComponent(GameName.Coinche, apiBaseUrl);

  return (
    <div className="lobby">
      <button type="button" onClick={() => createRoom(GameName.Coinche)}>{i18n.createRoom}</button>
      {getCoincheRoomsResponse?.data.rooms.map(room => {
        const playerHasAlreadyJoined = room.players.some(p => p.name === playerName);

        return <div className="room" key={room.gameID}>
          {room.players.map(player => {
            const seatKey = `${room.gameID}_${player.id}`;

            if (player.name && player.name === playerName) {
              return <button className="leaveRoomButton" key={seatKey} type="button" onClick={() => leaveRoom(GameName.Coinche, room.gameID, player.id)}>{i18n.leaveRoom}</button>;
            }

            if (player.name) {
              return <span className="otherPlayerSeat" key={seatKey}>{player.name}</span>;
            }

            return <button className="joinRoomButton" key={seatKey} type="button" disabled={playerHasAlreadyJoined} onClick={playerHasAlreadyJoined ? undefined : () => joinRoom(GameName.Coinche, room.gameID, player.id)}>{i18n.joinRoom}</button>;
          })}
        </div>;
      })}
      {/*<CoincheComponent gameID="123" playerID={PlayerID.North} />*/}
    </div>
  );
};
