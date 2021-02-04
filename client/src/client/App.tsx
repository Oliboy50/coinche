import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Redirect, Route, RouteProps} from 'react-router-dom';
import {findPlayerKeys, persistPlayerKeys} from './repository/playerKeyRepository';
import {findPlayerName, persistPlayerName} from './repository/playerNameRepository';
import {ContextProvider} from './context';
import {GameBuilderComponent} from './module/game/GameBuilder';
import {LobbyComponent} from './module/lobby/Lobby';
import {LoginComponent} from './module/login/Login';

const App: React.FunctionComponent = () => {
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
      render={({ location }) => !playerName ? <Redirect to={{ pathname: '/login', state: { referer: location.pathname } }} /> : children}
    />
  );

  return (
    <ContextProvider>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <LoginComponent playerName={playerName} updatePlayerName={updatePlayerName}/>
          </Route>

          <Route path="/logout" exact render={() => {
            updatePlayerName('');
            return <Redirect to={{ pathname: '/login', state: { referer: '/logout' } }}/>;
          }}/>

          <AuthenticatedRoute path="/:gameName/:roomID/:playerID" exact>
            <GameBuilderComponent playerKeysByRoomID={playerKeysByRoomID} updatePlayerKey={updatePlayerKey}/>
          </AuthenticatedRoute>

          <AuthenticatedRoute path="/" exact>
            <LobbyComponent playerName={playerName} playerKeysByRoomID={playerKeysByRoomID} updatePlayerKey={updatePlayerKey}/>
          </AuthenticatedRoute>

          <Route path="*" render={() => <Redirect to="/"/>}/>
        </Switch>
      </Router>
    </ContextProvider>
  );
};

export default App;
