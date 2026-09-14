import './App.css';
import {useState} from 'react';
import {BrowserRouter as Router, Routes, Navigate, Route, useLocation} from 'react-router-dom';
import {findPlayerKeys, persistPlayerKeys} from './repository/playerKeyRepository';
import {findPlayerName, persistPlayerName} from './repository/playerNameRepository';
import {ContextProvider} from './context';
import {GameBuilderComponent} from './module/game/GameBuilder';
import {LobbyComponent} from './module/lobby/Lobby';
import {LoginComponent} from './module/login/Login';

const AuthenticatedRoute: React.FunctionComponent<{
  playerName: string;
  children: React.ReactNode;
}> = ({ playerName, children }) => {
  const location = useLocation();
  if (!playerName) {
    return <Navigate to="/login" state={{ referer: location.pathname }} />;
  }

  return children;
};

const LogoutRoute: React.FunctionComponent<{
  onLogout: () => void;
}> = ({ onLogout }) => {
  onLogout();
  return <Navigate to="/login" state={{ referer: '/logout' }} />;
};

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

  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={
            <LoginComponent playerName={playerName} updatePlayerName={updatePlayerName}/>
          } />

          <Route path="/logout" element={
            <LogoutRoute onLogout={() => updatePlayerName('')} />
          } />

          <Route path="/:gameName/:roomID/:playerID" element={
            <AuthenticatedRoute playerName={playerName}>
              <GameBuilderComponent playerKeysByRoomID={playerKeysByRoomID} updatePlayerKey={updatePlayerKey}/>
            </AuthenticatedRoute>
          } />

          <Route path="/" element={
            <AuthenticatedRoute playerName={playerName}>
              <LobbyComponent playerName={playerName} playerKeysByRoomID={playerKeysByRoomID} updatePlayerKey={updatePlayerKey}/>
            </AuthenticatedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
};

export default App;
