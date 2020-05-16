import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  RouteProps,
} from 'react-router-dom';
import {LoginComponent} from './client/login/Login';
import {LobbyComponent} from './client/lobby/Lobby';

const App: React.FunctionComponent = () => {
  if (!process.env.REACT_APP_API_BASE_URL) {
    throw new Error('REACT_APP_API_BASE_URL env var must be set');
  }

  const jsonEncodedPlayerKeysByRoomID = localStorage.getItem('playerKeysByRoomID') || '{}';
  const playerKeysByRoomID = JSON.parse(jsonEncodedPlayerKeysByRoomID) || {};
  const playerName = localStorage.getItem('playerName') || undefined;

  const AuthenticatedRoute: React.FunctionComponent<RouteProps> = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          playerName ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginComponent defaultPlayerName={playerName} />
        </Route>
        <AuthenticatedRoute path="/">
          <LobbyComponent
            apiBaseUrl={process.env.REACT_APP_API_BASE_URL.endsWith('/') ? process.env.REACT_APP_API_BASE_URL.slice(0, -1) : process.env.REACT_APP_API_BASE_URL}
            playerName={playerName!}
            defaultPlayerKeysByRoomID={playerKeysByRoomID}
          />
        </AuthenticatedRoute>
      </Switch>
    </Router>
  );
};

export default App;
