import './Lobby.css';
import {useHistory} from 'react-router-dom';
import useSWR, {mutate as updateRequestCache} from 'swr';
import {GameName} from '../../../shared';
import {PlayerID} from '../../../shared/coinche';
import {requestToCreateRoom, requestToGetRooms, requestToJoinRoom, requestToLeaveRoom} from '../../service/serverRequester';
import type {PlayerKeysByRoomID} from '../../repository/playerKeyRepository';
import {PageHeaderComponent} from '../../component/PageHeader';
import {PageMenuComponent} from '../../component/PageMenu';
import {RoomSeatComponent} from './component/RoomSeat';
import {GoButtonComponent} from './component/GoButton';
import {CreateRoomButtonComponent} from './component/CreateRoomButton';

const getCacheKeyForGetRoomsRequest = (gameName: GameName) => `/games/${gameName}`;

type ComponentProps = {
  playerName: string;
  playerKeysByRoomID: PlayerKeysByRoomID;
  updatePlayerKey: (roomID: string, playerKey: string | undefined) => void;
};
export const LobbyComponent: React.FunctionComponent<ComponentProps> = ({
  playerName,
  playerKeysByRoomID,
  updatePlayerKey,
}) => {
  const history = useHistory();

  const { data: getCoincheRoomsResponse } = useSWR(getCacheKeyForGetRoomsRequest(GameName.Coinche), {
    refreshInterval: 2000,
    fetcher: () => requestToGetRooms(GameName.Coinche),
  });

  const createRoom = async (gameName: GameName) => {
    const response = await requestToCreateRoom(gameName);

    // automatically join the created room
    await joinRoom(gameName, response.roomID, PlayerID.North);

    await updateRequestCache(getCacheKeyForGetRoomsRequest(gameName));
  };

  const joinRoom = async (gameName: GameName, roomID: string, playerID: PlayerID) => {
    const { playerRoomKey } = await requestToJoinRoom(gameName, roomID, playerID, playerName);

    updatePlayerKey(roomID, playerRoomKey);

    await updateRequestCache(getCacheKeyForGetRoomsRequest(gameName));
  };

  const leaveRoom = async (gameName: GameName, roomID: string, playerID: PlayerID) => {
    const playerRoomKey = playerKeysByRoomID[roomID];
    if (!playerRoomKey) {
      // @TODO: find a way to remove the player from the room anyway
      //    OR: tell user that he should create a new room because he won't be able to leave this room
      throw new Error('User does not have key for this room');
    }
    await requestToLeaveRoom(gameName, roomID, playerID, playerRoomKey);

    updatePlayerKey(roomID, undefined);

    await updateRequestCache(getCacheKeyForGetRoomsRequest(gameName));
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

          return <div className="room" key={room.roomID}>
            <div className="topLeftSeat">
              <RoomSeatComponent seatedPlayerName={topLeftPlayer.name} myPlayerName={playerName} myPlayerIsSeatedInThisRoom={myPlayerIsSeatedInThisRoom} leaveRoom={() => leaveRoom(GameName.Coinche, room.roomID, topLeftPlayer.id)} joinRoom={() => joinRoom(GameName.Coinche, room.roomID, topLeftPlayer.id)}/>
            </div>
            <span className="teamWith left" role="img" aria-label="handshake">🤝</span>
            <div className="bottomLeftSeat">
              <RoomSeatComponent seatedPlayerName={bottomLeftPlayer.name} myPlayerName={playerName} myPlayerIsSeatedInThisRoom={myPlayerIsSeatedInThisRoom} leaveRoom={() => leaveRoom(GameName.Coinche, room.roomID, bottomLeftPlayer.id)} joinRoom={() => joinRoom(GameName.Coinche, room.roomID, bottomLeftPlayer.id)}/>
            </div>

            {myPlayerSeat && room.players.every(player => Boolean(player.name)) ? (
              <GoButtonComponent onClick={() => goToRoom(GameName.Coinche, room.roomID, myPlayerSeat.id)} />
            ) : (
              <div className="versus">VS</div>
            )}

            <div className="topRightSeat">
              <RoomSeatComponent seatedPlayerName={topRightPlayer.name} myPlayerName={playerName} myPlayerIsSeatedInThisRoom={myPlayerIsSeatedInThisRoom} leaveRoom={() => leaveRoom(GameName.Coinche, room.roomID, topRightPlayer.id)} joinRoom={() => joinRoom(GameName.Coinche, room.roomID, topRightPlayer.id)}/>
            </div>
            <span className="teamWith right" role="img" aria-label="handshake">🤝</span>
            <div className="bottomRightSeat">
              <RoomSeatComponent seatedPlayerName={bottomRightPlayer.name} myPlayerName={playerName} myPlayerIsSeatedInThisRoom={myPlayerIsSeatedInThisRoom} leaveRoom={() => leaveRoom(GameName.Coinche, room.roomID, bottomRightPlayer.id)} joinRoom={() => joinRoom(GameName.Coinche, room.roomID, bottomRightPlayer.id)}/>
            </div>
          </div>;
        })
        }
      </div>

      <CreateRoomButtonComponent onClick={() => createRoom(GameName.Coinche)} />

      <PageMenuComponent />
    </div>
  );
};
