import './Lobby.css';
import React, {ComponentType} from 'react';
import {Client} from 'boardgame.io/react';
import {SocketIO} from 'boardgame.io/multiplayer';
import {GameStatePlayerView, Moves, PhaseID, PlayerID} from '../shared/coinche';

type ComponentProps = {
  gameServer: string;
  lobbyServer: string;
  gameComponents: {
    game: object;
    board: ComponentType<any>;
  }[];
};
export const LobbyComponent: React.FunctionComponent<ComponentProps> = ({
  gameServer,
  lobbyServer,
  gameComponents,
}) => {
  const CoincheInstance = Client<GameStatePlayerView, Moves, PlayerID, PhaseID>({
    game: gameComponents[0].game,
    board: gameComponents[0].board,
    multiplayer: SocketIO({
      server: gameServer,
      // @TODO: use websocket instead of long polling
      // socketOpts,
    }),
  });

  return (
    <div className="lobby">
      <CoincheInstance gameID="123" playerID={PlayerID.North} />
    </div>
  );
};
