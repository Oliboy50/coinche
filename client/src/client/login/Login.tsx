import './Login.css';
import React, {useContext} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import type {Location} from 'history';
import {I18nContext} from './context/i18n';
import {persistPlayerName} from './repository/playerNameRepository';

type ComponentProps = {
  playerName: string;
  setPlayerName: (playerName: string) => void;
};
export const LoginComponent: React.FunctionComponent<ComponentProps> = ({
  playerName,
  setPlayerName,
}) => {
  const i18n = useContext(I18nContext);
  const history = useHistory();
  const location = useLocation<{ referer: Location }>();
  const { referer } = location.state || { referer: { pathname: '/' } };

  const onChangePlayerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const login = () => {
    persistPlayerName(playerName);
    history.replace({...referer, state: { playerName }});
  };

  return (
    <div className="login">
      <form className="playerForm">
        <input type="text" placeholder={i18n.playerNamePlaceholder} value={playerName} onChange={onChangePlayerName}/>
        <button type="submit" onClick={() => login()}>{i18n.submit}</button>
      </form>
    </div>
  );
};
