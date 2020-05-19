import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Redirect, Route, RouteProps} from 'react-router-dom';
import {GameBuilderComponent} from './game/GameBuilder';
import {LobbyComponent} from './lobby/Lobby';
import {findPlayerKeys, persistPlayerKeys} from './lobby/repository/playerKeyRepository';
import {LoginComponent} from './login/Login';
import {findPlayerName, persistPlayerName} from './login/repository/playerNameRepository';

const App: React.FunctionComponent = () => {
  if (!process.env.REACT_APP_API_BASE_URL) {
    throw new Error('REACT_APP_API_BASE_URL env var must be set');
  }
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL.endsWith('/') ? process.env.REACT_APP_API_BASE_URL.slice(0, -1) : process.env.REACT_APP_API_BASE_URL;

  const [playerName, setPlayerName] = useState(findPlayerName());
  const updatePlayerName = (playerName: string) => {
    setPlayerName(playerName);
    persistPlayerName(playerName);
  };

  const [playerKeysByRoomID, setPlayerKeysByRoomID] = useState(findPlayerKeys(playerName));
  const updatePlayerKey = (roomID: string, playerKey: string | undefined) => {
    let newPlayerKeysByRoomID;
    if (!playerKey) {
      const {[roomID]: _, ...playerKeysByRoomIDWithoutThisOne} = playerKeysByRoomID;
      newPlayerKeysByRoomID = playerKeysByRoomIDWithoutThisOne;
    } else {
      newPlayerKeysByRoomID = { ...playerKeysByRoomID, [roomID]: playerKey };
    }

    setPlayerKeysByRoomID(newPlayerKeysByRoomID);
    persistPlayerKeys(playerName, newPlayerKeysByRoomID);
  };

  const AuthenticatedRoute: React.FunctionComponent<RouteProps> = ({ children, ...rest }) => (
    <Route
      {...rest}
      render={({ location }) => !playerName ? <Redirect to={{ pathname: '/login', state: { referer: location } }} /> : children}
    />
  );

  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <LoginComponent playerName={playerName} updatePlayerName={updatePlayerName}/>
        </Route>

        <Route path="/logout" exact render={() => {
          updatePlayerName('');
          return <Redirect to="/login"/>;
        }}/>

        <AuthenticatedRoute path="/:gameName/:roomID/:playerID" exact>
          <GameBuilderComponent apiBaseUrl={apiBaseUrl} playerKeysByRoomID={playerKeysByRoomID}/>
        </AuthenticatedRoute>

        <AuthenticatedRoute path="/" exact>
          <LobbyComponent apiBaseUrl={apiBaseUrl} playerName={playerName} playerKeysByRoomID={playerKeysByRoomID} updatePlayerKey={updatePlayerKey}/>
        </AuthenticatedRoute>

        <Route path="*" render={() => <Redirect to="/"/>}/>
      </Switch>
    </Router>
  );
};

export default App;
