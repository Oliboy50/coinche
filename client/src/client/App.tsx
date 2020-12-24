import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Redirect, Route, RouteProps} from 'react-router-dom';
import {LanguageCode} from '../shared';
import {findPlayerKeys, persistPlayerKeys} from './repository/playerKeyRepository';
import {findPlayerName, persistPlayerName} from './repository/playerNameRepository';
import {findOption, persistOption} from './repository/optionsRepository';
import {CardDisplay, CardDisplayContext, cardDisplayDefaultValue} from './context/cardDisplay';
import {i18n, I18nContext, languageCodeDefaultValue} from './context/i18n';
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

  const [cardDisplay, setCardDisplay] = useState(findOption('cardDisplay') || cardDisplayDefaultValue);
  const updateCardDisplay = (c: CardDisplay) => {
    setCardDisplay(c);
    persistOption('cardDisplay', c);
  };

  const [languageCode, setLanguageCode] = useState(findOption('languageCode') || languageCodeDefaultValue);
  const updateLanguageCode = (lc: LanguageCode) => {
    setLanguageCode(lc);
    persistOption('languageCode', lc);
  };

  const AuthenticatedRoute: React.FunctionComponent<RouteProps> = ({ children, ...rest }) => (
    <Route
      {...rest}
      render={({ location }) => !playerName ? <Redirect to={{ pathname: '/login', state: { referer: location.pathname } }} /> : children}
    />
  );

  return (
    <I18nContext.Provider value={i18n[languageCode]}>
      <CardDisplayContext.Provider value={cardDisplay}>
        <Router>
          <Switch>
            <Route path="/login" exact>
              <LoginComponent playerName={playerName} updatePlayerName={updatePlayerName} updateLanguageCode={updateLanguageCode} updateCardDisplay={updateCardDisplay}/>
            </Route>

            <Route path="/logout" exact render={() => {
              updatePlayerName('');
              return <Redirect to={{ pathname: '/login', state: { referer: '/logout' } }}/>;
            }}/>

            <AuthenticatedRoute path="/:gameName/:roomID/:playerID" exact>
              <GameBuilderComponent playerKeysByRoomID={playerKeysByRoomID} updatePlayerKey={updatePlayerKey} updateLanguageCode={updateLanguageCode} updateCardDisplay={updateCardDisplay}/>
            </AuthenticatedRoute>

            <AuthenticatedRoute path="/" exact>
              <LobbyComponent playerName={playerName} playerKeysByRoomID={playerKeysByRoomID} updatePlayerKey={updatePlayerKey} updateLanguageCode={updateLanguageCode} updateCardDisplay={updateCardDisplay}/>
            </AuthenticatedRoute>

            <Route path="*" render={() => <Redirect to="/"/>}/>
          </Switch>
        </Router>
      </CardDisplayContext.Provider>
    </I18nContext.Provider>
  );
};

export default App;
