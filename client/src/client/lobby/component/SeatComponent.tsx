import React, {useContext} from 'react';
import {GameName} from '../../../shared';
import {PlayerID} from '../../../shared/coinche';
import {I18nContext} from '../context/i18n';

type ComponentProps = {
  seatedPlayer: {
    id: PlayerID;
    name?: string;
  };
  roomID: string;
  myPlayerName: string;
  myPlayerInThisRoom: {
    id: PlayerID;
    name?: string;
  } | undefined;
  joinRoom: (gameName: GameName, roomID: string, playerID: PlayerID) => Promise<void>;
  leaveRoom: (gameName: GameName, roomID: string, playerID: PlayerID) => Promise<void>;
};
export const SeatComponent: React.FunctionComponent<ComponentProps> = ({
  seatedPlayer,
  roomID,
  myPlayerInThisRoom,
  myPlayerName,
  joinRoom,
  leaveRoom,
}) => {
  const i18n = useContext(I18nContext);

  if (seatedPlayer.name === myPlayerName) {
    return <button className="leaveRoomButton" type="button" onClick={() => leaveRoom(GameName.Coinche, roomID, seatedPlayer.id)}>{i18n.leaveRoom}</button>;
  }

  if (seatedPlayer.name) {
    return <span className="otherPlayerSeat">{seatedPlayer.name}</span>;
  }

  return <button className="joinRoomButton" type="button" disabled={Boolean(myPlayerInThisRoom)} onClick={myPlayerInThisRoom ? undefined : () => joinRoom(GameName.Coinche, roomID, seatedPlayer.id)}>{i18n.joinRoom}</button>;
};
