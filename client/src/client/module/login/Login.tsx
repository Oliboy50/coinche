import './Login.css';
import React, {useContext} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import type {Location} from 'history';
import {PageHeaderComponent} from '../../component/PageHeader';
import {I18nContext} from './context/i18n';

type ComponentProps = {
  playerName: string;
  updatePlayerName: (playerName: string) => void;
};
export const LoginComponent: React.FunctionComponent<ComponentProps> = ({
  playerName,
  updatePlayerName,
}) => {
  const i18n = useContext(I18nContext);
  const history = useHistory();
  const location = useLocation<{ referer: Location }>();
  const { referer } = location.state || { referer: { pathname: '/' } };

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const newPlayerName = formData.get('name');
    if (typeof newPlayerName !== 'string') {
      return;
    }

    updatePlayerName(newPlayerName);
    history.replace(referer);
  };

  return (
    <div className="login">
      <PageHeaderComponent />

      <form className="loginForm" onSubmit={login}>
        <input className="nameInput" type="text" name="name" placeholder={i18n.playerNamePlaceholder} defaultValue={playerName}/>
        <button className="sumbitButton" type="submit">{i18n.submit}</button>
      </form>
    </div>
  );
};
