import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  RouteProps,
} from 'react-router-dom';
import {LobbyComponent} from './client/lobby/Lobby';
import {findPlayerKeys} from './client/lobby/repository/playerKeyRepository';
import {LoginComponent} from './client/login/Login';
import {findPlayerName} from './client/login/repository/playerNameRepository';

const ROUTE_PATH_LOGIN = '/login';

const App: React.FunctionComponent = () => {
  if (!process.env.REACT_APP_API_BASE_URL) {
    throw new Error('REACT_APP_API_BASE_URL env var must be set');
  }
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL.endsWith('/') ? process.env.REACT_APP_API_BASE_URL.slice(0, -1) : process.env.REACT_APP_API_BASE_URL;

  const [playerName, setPlayerName] = useState(findPlayerName());
  const [playerKeysByRoomID, setPlayerKeysByRoomID] = useState(findPlayerKeys());

  const AuthenticatedRoute: React.FunctionComponent<RouteProps> = ({ children, ...rest }) => (
    <Route
      {...rest}
      render={({ location }) =>
        !playerName ? (
          <Redirect
            to={{
              pathname: ROUTE_PATH_LOGIN,
              state: { referer: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );

  return (
    <Router>
      <Switch>
        <Route path={ROUTE_PATH_LOGIN}>
          <LoginComponent
            playerName={playerName}
            setPlayerName={setPlayerName}
          />
        </Route>
        <AuthenticatedRoute path="/">
          <LobbyComponent
            apiBaseUrl={apiBaseUrl}
            playerName={playerName}
            playerKeysByRoomID={playerKeysByRoomID}
            setPlayerKeysByRoomID={setPlayerKeysByRoomID}
          />
        </AuthenticatedRoute>
      </Switch>
    </Router>
  );
};

export default App;
