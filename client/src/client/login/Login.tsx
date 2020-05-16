import './Login.css';
import React, {useContext, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import type {Location} from 'history';
import {I18nContext} from './context/i18n';

type ComponentProps = {
  defaultPlayerName: string | undefined;
};
export const LoginComponent: React.FunctionComponent<ComponentProps> = ({
  defaultPlayerName,
}) => {
  const i18n = useContext(I18nContext);
  const [playerName, setPlayerName] = useState(defaultPlayerName || '');
  const history = useHistory();
  const location = useLocation<{ from: Location }>();
  const { from } = location.state || { from: { pathname: '/' } };

  const onChangePlayerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const login = () => {
    localStorage.setItem('playerName', playerName);
    history.replace(from);
  };

  return (
    <div className="playerForm">
      <input type="text" placeholder={i18n.playerNamePlaceholder} value={playerName} onChange={onChangePlayerName}/>
      <button type="submit" onClick={() => login()}>{i18n.submit}</button>
    </div>
  );
};
