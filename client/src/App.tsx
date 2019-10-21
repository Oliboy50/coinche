import React from 'react';
import {Lobby} from 'boardgame.io/react';
import {coincheBoard, CoincheClientComponent, coincheGame} from './coinche/CoincheClient';
import {PlayerID} from './shared/coinche';

const App: React.FunctionComponent = () => {
  // If no server is running, it probably means that we're in development mode, so we display a coinche client
  if (!process.env.REACT_APP_API_BASE_URL) {
    return <CoincheClientComponent playerID={PlayerID.North} debug={false} />;
  }

  return <Lobby
    gameServer={process.env.REACT_APP_API_BASE_URL}
    lobbyServer={process.env.REACT_APP_API_BASE_URL}
    gameComponents={[
      { game: coincheGame, board: coincheBoard },
    ]}
  />;
};

export default App;
