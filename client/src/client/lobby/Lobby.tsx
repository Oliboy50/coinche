import './Lobby.css';
import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import useSWR, {mutate as refetchSWR} from 'swr';
import {GameName} from '../../shared';
import {PlayerID} from '../../shared/coinche';
import {I18nContext} from './context/i18n';
import {PlayerKeysByRoomID} from './repository/playerKeyRepository';
import {SeatComponent} from './component/SeatComponent';

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
interface GetRoomsResponseRawData {
  rooms: {
    gameID: string;
    players: {
      id: number;
      name?: string;
    }[];
  }[];
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
  updatePlayerKey: (roomID: string, playerKey: string | undefined) => void;
};
export const LobbyComponent: React.FunctionComponent<ComponentProps> = ({
  apiBaseUrl,
  playerName,
  playerKeysByRoomID,
  updatePlayerKey,
}) => {
  const i18n = useContext(I18nContext);
  const history = useHistory();

  const { data: getCoincheRoomsResponse } = useSWR(`${apiBaseUrl}/games/${GameName.Coinche}`, (url) => {
    return axios.get<GetRoomsResponseRawData>(url).then(rawResponse => ({
      ...rawResponse,
      data: {
        rooms: rawResponse.data.rooms.map(room => ({
          ...room,
          players: room.players.map(player => ({
            ...player,
            id: player.id.toString(),
          })),
        })),
      },
    })) as Promise<GetRoomsResponse>;
  });

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

  const goToRoom = (gameName: GameName, roomID: string, playerID: PlayerID) => {
    history.push(`/${gameName}/${roomID}/${playerID}`);
  };

  return (
    <div className="lobby">
      <div className="title"><span role="img" aria-label="diamond">♠️</span> <span className="red" role="img" aria-label="diamond">♦️</span> Oliboy50/coinche <span className="red" role="img" aria-label="heart">♥️</span> <span role="img" aria-label="diamond">♣️</span></div>

      <div className="rooms">
        {getCoincheRoomsResponse && getCoincheRoomsResponse.data.rooms.length > 0
          ? getCoincheRoomsResponse.data.rooms.map(room => {
            const myPlayerInThisRoom = room.players.find(p => p.name === playerName);
            const topLeftPlayer = room.players.find(p => p.id === PlayerID.North)!;
            const bottomLeftPlayer = room.players.find(p => p.id === PlayerID.South)!;
            const topRightPlayer = room.players.find(p => p.id === PlayerID.East)!;
            const bottomRightPlayer = room.players.find(p => p.id === PlayerID.West)!;

            return <div className="room" key={room.gameID}>
              <div className="topLeftSeat">
                <SeatComponent seatedPlayer={topLeftPlayer} roomID={room.gameID} myPlayerName={playerName} myPlayerInThisRoom={myPlayerInThisRoom} leaveRoom={leaveRoom} joinRoom={joinRoom}/>
              </div>
              <div className="withLeft">et</div>
              <div className="bottomLeftSeat">
                <SeatComponent seatedPlayer={bottomLeftPlayer} roomID={room.gameID} myPlayerName={playerName} myPlayerInThisRoom={myPlayerInThisRoom} leaveRoom={leaveRoom} joinRoom={joinRoom}/>
              </div>

              <div className="versus">contre</div>

              <div className="topRightSeat">
                <SeatComponent seatedPlayer={topRightPlayer} roomID={room.gameID} myPlayerName={playerName} myPlayerInThisRoom={myPlayerInThisRoom} leaveRoom={leaveRoom} joinRoom={joinRoom}/>
              </div>
              <div className="withRight">et</div>
              <div className="bottomRightSeat">
                <SeatComponent seatedPlayer={bottomRightPlayer} roomID={room.gameID} myPlayerName={playerName} myPlayerInThisRoom={myPlayerInThisRoom} leaveRoom={leaveRoom} joinRoom={joinRoom}/>
              </div>

              {myPlayerInThisRoom && room.players.every(player => Boolean(player.name)) && (
                <button className="goToRoomButton" type="button" onClick={() => goToRoom(GameName.Coinche, room.gameID, myPlayerInThisRoom.id)}>{i18n.goToRoom}</button>
              )}
            </div>;
          })
          : (
            <div className="noRoom">{i18n.noAvailableRoom}</div>
          )
        }
      </div>

      <button className="createRoomButton" type="button" onClick={() => createRoom(GameName.Coinche)}>{i18n.createRoom}</button>
    </div>
  );
};
