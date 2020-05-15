import './Lobby.css';
import React, {useContext} from 'react';
import axios from 'axios';
import useSWR, {mutate as refetchSWR} from 'swr';
import {GameName} from '../../shared';
import {PlayerID} from '../../shared/coinche';
import {I18nContext} from './context/i18n';

let playerName = 'oliver';
let playerCredentials: string | undefined;

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
};
// @TODO refacto to support other types of game
export const LobbyComponent: React.FunctionComponent<ComponentProps> = ({
  apiBaseUrl,
}) => {
  const i18n = useContext(I18nContext);
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

    playerCredentials = response.data.playerCredentials;

    await refetchSWR(`${apiBaseUrl}/games/${gameName}`);
  };

  const leaveRoom = async (gameName: GameName, roomID: string, playerID: PlayerID) => {
    await axios.post(`${apiBaseUrl}/games/${gameName}/${roomID}/leave`, {
      playerID,
      credentials: playerCredentials,
    });

    playerCredentials = undefined;

    await refetchSWR(`${apiBaseUrl}/games/${gameName}`);
  };

  // const CoincheComponent = buildGameComponent(GameName.Coinche, apiBaseUrl);

  return (
    <div className="lobby">
      <button type="button" onClick={() => createRoom(GameName.Coinche)}>{i18n.createRoom}</button>
      {getCoincheRoomsResponse?.data.rooms.map(room => (
        <div className="room" key={room.gameID}>
          {room.players.map(player => {
            const seatKey = `${room.gameID}_${player.id}`;

            if (player.name && player.name === playerName) {
              return <button className="leaveRoomButton" key={seatKey} type="button" onClick={() => leaveRoom(GameName.Coinche, room.gameID, player.id)}>{i18n.leaveRoom}</button>;
            }

            if (player.name) {
              return <span className="otherPlayerSeat" key={seatKey}>{player.name}</span>;
            }

            if (room.players.find(p => p.name === playerName)) {
              return <span className="emptySeat" key={seatKey}>{i18n.waitingForPlayer}</span>;
            }

            return <button className="joinRoomButton" key={seatKey} type="button" onClick={() => joinRoom(GameName.Coinche, room.gameID, player.id)}>{i18n.joinRoom}</button>;
          })}
        </div>
      ))}
      {/*<CoincheComponent gameID="123" playerID={PlayerID.North} />*/}
    </div>
  );
};
