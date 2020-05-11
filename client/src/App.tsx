import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {LobbyComponent} from './lobby/Lobby';
import {game as coincheGame} from './shared/coinche';
import {BoardComponent as coincheBoard} from './coinche/Client';

const App: React.FunctionComponent = () => {
  if (!process.env.REACT_APP_API_BASE_URL) {
    throw new Error('REACT_APP_API_BASE_URL env var must be set');
  }

  return (
    <Router>
      <Switch>
        <Route path="/">
          <LobbyComponent
            gameServer={process.env.REACT_APP_API_BASE_URL}
            lobbyServer={process.env.REACT_APP_API_BASE_URL}
            gameComponents={[
              { game: coincheGame, board: coincheBoard },
            ]}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
