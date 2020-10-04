import React, {useEffect} from 'react';
import {useHistory} from 'react-router';
import {useParams, Redirect} from 'react-router-dom';
import {Client} from 'boardgame.io/react';
import {SocketIO} from 'boardgame.io/multiplayer';
import {GameName, validGameNames} from '../../../shared';
import {GameStatePlayerView, Moves, PhaseID, PlayerID, validPlayerIDs, coincheGame} from '../../../shared/coinche';
import {getApiBaseUrl, isServerStillAlive, requestToLeaveRoom} from '../../service/serverRequester';
import {PlayerKeysByRoomID} from '../lobby/repository/playerKeyRepository';
import {buildCoincheBoardComponent} from './coinche/CoincheBoard';

type ComponentProps = {
  playerKeysByRoomID: PlayerKeysByRoomID;
  updatePlayerKey: (roomID: string, playerKey: string | undefined) => void;
};
export const GameBuilderComponent: React.FunctionComponent<ComponentProps> = ({
  playerKeysByRoomID,
  updatePlayerKey,
}) => {
  // server liveliness probe
  // (when using Heroku free plan, it keeps the server alive during a long "only websockets" usage)
  useEffect(() => {
    const livelinessProbe = setInterval(() => {
      isServerStillAlive().then(isStillAlive => {
        if (!isStillAlive) {
          console.error(`Server connection has been lost`);
        }
      });
    }, 600000/* 10min */);

    return () => clearInterval(livelinessProbe);
  }, []);

  const history = useHistory();
  const { gameName, roomID, playerID } = useParams<{gameName: GameName; roomID: string; playerID: PlayerID}>();
  const playerRoomKey = playerKeysByRoomID[roomID];
  if (!validGameNames.includes(gameName) || !validPlayerIDs.includes(playerID) || !playerRoomKey) {
    return <Redirect to="/"/>;
  }

  const goBackToLobby = async () => {
    await requestToLeaveRoom(gameName, roomID, playerID, playerRoomKey);

    updatePlayerKey(roomID, undefined);

    history.replace('/');
  };

  const GameComponent = Client<GameStatePlayerView, Moves, PlayerID, PhaseID>({
    game: coincheGame,
    board: buildCoincheBoardComponent(goBackToLobby),
    multiplayer: SocketIO({ server: getApiBaseUrl() }),
    debug: false,
  });

  return (
    <GameComponent
      gameID={roomID}
      playerID={playerID}
      credentials={playerRoomKey}
    />
  );
};
