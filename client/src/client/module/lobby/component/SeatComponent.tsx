import React, {useContext} from 'react';
import {I18nContext} from '../context/i18n';

type ComponentProps = {
  seatedPlayerName: string | undefined;
  myPlayerName: string;
  myPlayerIsSeatedInThisRoom: boolean;
  joinRoom: () => void;
  leaveRoom: () => void;
};
export const SeatComponent: React.FunctionComponent<ComponentProps> = ({
  seatedPlayerName,
  myPlayerName,
  myPlayerIsSeatedInThisRoom,
  joinRoom,
  leaveRoom,
}) => {
  const i18n = useContext(I18nContext);

  return (
    <div className={`seat ${seatedPlayerName === myPlayerName ? 'mySeat' : 'otherSeat'}`}>
      <span className="playerName">{seatedPlayerName || '\u00A0'}</span>
      <div className="seatButton">
        {!seatedPlayerName && (
          <button type="button" disabled={myPlayerIsSeatedInThisRoom} onClick={myPlayerIsSeatedInThisRoom ? undefined : joinRoom}>{i18n.joinRoom}</button>
        )}
        {seatedPlayerName === myPlayerName && (
          <button type="button" onClick={leaveRoom}>{i18n.leaveRoom}</button>
        )}
      </div>
    </div>
  );
};
