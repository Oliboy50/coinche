import React from 'react';
import {useParams, Redirect} from 'react-router-dom';
import {Client} from 'boardgame.io/react';
import {SocketIO} from 'boardgame.io/multiplayer';
import {GameName, validGameNames} from '../../../shared';
import {GameStatePlayerView, Moves, PhaseID, PlayerID, validPlayerIDs, coincheGame} from '../../../shared/coinche';
import {PlayerKeysByRoomID} from '../lobby/repository/playerKeyRepository';
import {CoincheBoardComponent} from './coinche/CoincheBoard';

type ComponentProps = {
  apiBaseUrl: string;
  playerKeysByRoomID: PlayerKeysByRoomID;
};
export const GameBuilderComponent: React.FunctionComponent<ComponentProps> = ({
  apiBaseUrl,
  playerKeysByRoomID,
}) => {
  const { gameName, roomID, playerID } = useParams<{gameName: GameName; roomID: string; playerID: PlayerID}>();
  if (!validGameNames.includes(gameName) || !validPlayerIDs.includes(playerID)) {
    return <Redirect to="/"/>;
  }

  const GameComponent = Client<GameStatePlayerView, Moves, PlayerID, PhaseID>({
    game: coincheGame,
    board: CoincheBoardComponent,
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
