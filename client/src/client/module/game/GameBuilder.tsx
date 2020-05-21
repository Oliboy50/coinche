import React, {useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import {Client} from 'boardgame.io/react';
import {SocketIO} from 'boardgame.io/multiplayer';
import {GameName, validGameNames} from '../../../shared';
import {GameStatePlayerView, Moves, PhaseID, PlayerID, validPlayerIDs, coincheGame} from '../../../shared/coinche';
import {getApiBaseUrl, isServerStillAlive, requestToLeaveRoom} from '../../service/serverRequester';
import {PlayerKeysByRoomID} from '../lobby/repository/playerKeyRepository';
import {buildCoincheBoardComponent} from './coinche/CoincheBoard';
import {useHistory} from 'react-router';

type ComponentProps = {
  playerKeysByRoomID: PlayerKeysByRoomID;
  updatePlayerKey: (roomID: string, playerKey: string | undefined) => void;
};
export const GameBuilderComponent: React.FunctionComponent<ComponentProps> = ({
  playerKeysByRoomID,
  updatePlayerKey,
}) => {
  // server liveness probe
  // => by calling it every 10min, server won't going idle even when using only websockets for a while
  //   => for example, this is useful when using Heroku free plan
  useEffect(() => {
    const livenessProbe = setInterval(() => {
      isServerStillAlive().then(isStillAlive => {
        if (!isStillAlive) {
          console.error(`Server connection has been lost`);
        }
      });
    }, 1000 * 60 * 10);

    return () => clearInterval(livenessProbe);
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
