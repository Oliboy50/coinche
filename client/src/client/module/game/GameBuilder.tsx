import {useEffect} from 'react';
import {useNavigate, useParams, Navigate} from 'react-router-dom';
import {Client} from 'boardgame.io/react';
import {SocketIO} from 'boardgame.io/multiplayer';
import {GameName, validGameNames} from '../../../shared';
import {GameStatePlayerView, Moves, PhaseID, PlayerID, validPlayerIDs, coincheGame} from '../../../shared/coinche';
import {getApiBaseUrl, isServerStillAlive, requestToLeaveRoom} from '../../service/serverRequester';
import {PlayerKeysByRoomID} from '../../repository/playerKeyRepository';
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

  const navigate = useNavigate();
  const { gameName, roomID, playerID } = useParams();
  const typedGameName = gameName as GameName;
  const typedPlayerID = playerID as PlayerID;
  const playerRoomKey = roomID ? playerKeysByRoomID[roomID] : undefined;
  if (!gameName || !roomID || !playerID || !validGameNames.includes(typedGameName) || !validPlayerIDs.includes(typedPlayerID) || !playerRoomKey) {
    return <Navigate to="/"/>;
  }

  const goBackToLobby = async () => {
    await requestToLeaveRoom(typedGameName, roomID, typedPlayerID, playerRoomKey);

    updatePlayerKey(roomID, undefined);

    navigate('/', { replace: true });
  };

  const GameComponent = Client<GameStatePlayerView, Moves, PlayerID, PhaseID>({
    game: coincheGame,
    board: buildCoincheBoardComponent(goBackToLobby),
    multiplayer: SocketIO({ server: getApiBaseUrl() }),
    debug: false,
  });

  return (
    <GameComponent
      matchID={roomID}
      playerID={typedPlayerID}
      credentials={playerRoomKey}
    />
  );
};
