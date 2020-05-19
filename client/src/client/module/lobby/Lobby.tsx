import './Lobby.css';
import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import useSWR, {mutate as refetchSWR} from 'swr';
import {GameName} from '../../../shared';
import {PlayerID} from '../../../shared/coinche';
import {PageHeaderComponent} from '../../component/PageHeader';
import {I18nContext} from './context/i18n';
import {PlayerKeysByRoomID} from './repository/playerKeyRepository';
import {SeatComponent} from './component/SeatComponent';

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

  const { data: getCoincheRoomsResponse } = useSWR(`${apiBaseUrl}/games/${GameName.Coinche}`, {
    refreshInterval: 2000,
    fetcher: (url) => fetch(url)
      .then(res => res.json() as Promise<{ rooms: { gameID: string; players: { id: number; name?: string }[] }[] }>)
      .then(rawData => ({
        ...rawData,
        rooms: rawData.rooms.map(room => ({
          ...room,
          players: room.players.map(player => ({
            ...player,
            id: player.id.toString(),
          })),
        })),
      })) as Promise<{ rooms: { gameID: string; players: { id: PlayerID; name?: string }[] }[] }>,
  });

  const createRoom = async (gameName: GameName) => {
    const res = await fetch(`${apiBaseUrl}/games/${gameName}/create`, {
      method: 'POST',
      body: JSON.stringify({
        // @TODO: factorize howManyCoinchePlayers value
        numPlayers: 4,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const createRoomResponse: { gameID: string } = await res.json();

    // automatically join the created room
    await joinRoom(gameName, createRoomResponse.gameID, PlayerID.North);

    await refetchSWR(`${apiBaseUrl}/games/${gameName}`);
  };

  const joinRoom = async (gameName: GameName, roomID: string, playerID: PlayerID) => {
    const res = await fetch(`${apiBaseUrl}/games/${gameName}/${roomID}/join`, {
      method: 'POST',
      body: JSON.stringify({
        playerID,
        playerName,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const joinRoomResponse: { playerCredentials: string } = await res.json();

    updatePlayerKey(roomID, joinRoomResponse.playerCredentials);

    await refetchSWR(`${apiBaseUrl}/games/${gameName}`);
  };

  const leaveRoom = async (gameName: GameName, roomID: string, playerID: PlayerID) => {
    await fetch(`${apiBaseUrl}/games/${gameName}/${roomID}/leave`, {
      method: 'POST',
      body: JSON.stringify({
        playerID,
        credentials: playerKeysByRoomID[roomID],
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    updatePlayerKey(roomID, undefined);

    await refetchSWR(`${apiBaseUrl}/games/${gameName}`);
  };

  const goToRoom = (gameName: GameName, roomID: string, playerID: PlayerID) => {
    history.push(`/${gameName}/${roomID}/${playerID}`);
  };

  return (
    <div className="lobby">
      <PageHeaderComponent />

      <div className="rooms">
        {getCoincheRoomsResponse && getCoincheRoomsResponse.rooms.length > 0 && getCoincheRoomsResponse.rooms.map(room => {
          const topLeftPlayer = room.players.find(p => p.id === PlayerID.North)!;
          const bottomLeftPlayer = room.players.find(p => p.id === PlayerID.South)!;
          const topRightPlayer = room.players.find(p => p.id === PlayerID.East)!;
          const bottomRightPlayer = room.players.find(p => p.id === PlayerID.West)!;

          const myPlayerSeat = room.players.find(p => p.name === playerName);
          const myPlayerIsSeatedInThisRoom = Boolean(myPlayerSeat);

          return <div className="room" key={room.gameID}>
            <div className="topLeftSeat">
              <SeatComponent seatedPlayerName={topLeftPlayer.name} myPlayerName={playerName} myPlayerIsSeatedInThisRoom={myPlayerIsSeatedInThisRoom} leaveRoom={() => leaveRoom(GameName.Coinche, room.gameID, topLeftPlayer.id)} joinRoom={() => joinRoom(GameName.Coinche, room.gameID, topLeftPlayer.id)}/>
            </div>
            <span className="teamWith left" role="img" aria-label="handshake">🤝</span>
            <div className="bottomLeftSeat">
              <SeatComponent seatedPlayerName={bottomLeftPlayer.name} myPlayerName={playerName} myPlayerIsSeatedInThisRoom={myPlayerIsSeatedInThisRoom} leaveRoom={() => leaveRoom(GameName.Coinche, room.gameID, bottomLeftPlayer.id)} joinRoom={() => joinRoom(GameName.Coinche, room.gameID, bottomLeftPlayer.id)}/>
            </div>

            {myPlayerSeat && room.players.every(player => Boolean(player.name)) ? (
              <div className="goButtonWrapper">
                <span className="goButton" onClick={() => goToRoom(GameName.Coinche, room.gameID, myPlayerSeat.id)} title={i18n.goToRoom}>GO</span>
              </div>
            ) : (
              <div className="versus">VS</div>
            )}

            <div className="topRightSeat">
              <SeatComponent seatedPlayerName={topRightPlayer.name} myPlayerName={playerName} myPlayerIsSeatedInThisRoom={myPlayerIsSeatedInThisRoom} leaveRoom={() => leaveRoom(GameName.Coinche, room.gameID, topRightPlayer.id)} joinRoom={() => joinRoom(GameName.Coinche, room.gameID, topRightPlayer.id)}/>
            </div>
            <span className="teamWith right" role="img" aria-label="handshake">🤝</span>
            <div className="bottomRightSeat">
              <SeatComponent seatedPlayerName={bottomRightPlayer.name} myPlayerName={playerName} myPlayerIsSeatedInThisRoom={myPlayerIsSeatedInThisRoom} leaveRoom={() => leaveRoom(GameName.Coinche, room.gameID, bottomRightPlayer.id)} joinRoom={() => joinRoom(GameName.Coinche, room.gameID, bottomRightPlayer.id)}/>
            </div>
          </div>;
        })
        }
      </div>

      <button className="createRoomButton" type="button" onClick={() => createRoom(GameName.Coinche)}>{i18n.createRoom}</button>
    </div>
  );
};
