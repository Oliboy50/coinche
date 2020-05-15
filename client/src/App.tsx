import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {LobbyComponent} from './client/lobby/Lobby';

const App: React.FunctionComponent = () => {
  if (!process.env.REACT_APP_API_BASE_URL) {
    throw new Error('REACT_APP_API_BASE_URL env var must be set');
  }

  return (
    <Router>
      <Switch>
        <Route path="/">
          <LobbyComponent
            apiBaseUrl={process.env.REACT_APP_API_BASE_URL.endsWith('/') ? process.env.REACT_APP_API_BASE_URL.slice(0, -1) : process.env.REACT_APP_API_BASE_URL}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
