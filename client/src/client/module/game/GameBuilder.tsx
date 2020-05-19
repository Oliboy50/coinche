import React from 'react';
import {useParams, Redirect} from 'react-router-dom';
import {Client} from 'boardgame.io/react';
import {SocketIO} from 'boardgame.io/multiplayer';
import {GameName, validGameNames} from '../../../shared';
import {GameStatePlayerView, Moves, PhaseID, PlayerID, validPlayerIDs, coincheGame} from '../../../shared/coinche';
import {PlayerKeysByRoomID} from '../lobby/repository/playerKeyRepository';
import {buildCoincheBoardComponent} from './coinche/CoincheBoard';
import {useHistory} from 'react-router';

type ComponentProps = {
  apiBaseUrl: string;
  playerKeysByRoomID: PlayerKeysByRoomID;
  updatePlayerKey: (roomID: string, playerKey: string | undefined) => void;
};
export const GameBuilderComponent: React.FunctionComponent<ComponentProps> = ({
  apiBaseUrl,
  playerKeysByRoomID,
  updatePlayerKey,
}) => {
  const history = useHistory();
  const { gameName, roomID, playerID } = useParams<{gameName: GameName; roomID: string; playerID: PlayerID}>();
  if (!validGameNames.includes(gameName) || !validPlayerIDs.includes(playerID)) {
    return <Redirect to="/"/>;
  }

  const goBackToLobby = async () => {
    await fetch(`${apiBaseUrl}/games/${gameName}/${roomID}/leave`, {
      method: 'POST',
      body: JSON.stringify({ playerID, credentials: playerKeysByRoomID[roomID] }),
      headers: { 'Content-Type': 'application/json' },
    });

    updatePlayerKey(roomID, undefined);

    history.replace('/');
  };

  const GameComponent = Client<GameStatePlayerView, Moves, PlayerID, PhaseID>({
    game: coincheGame,
    board: buildCoincheBoardComponent(goBackToLobby),
    multiplayer: SocketIO({ server: apiBaseUrl }),
    debug: false,
  });

  return (
    <GameComponent
      gameID={roomID}
      playerID={playerID}
      credentials={playerKeysByRoomID[roomID]}
    />
  );
};
