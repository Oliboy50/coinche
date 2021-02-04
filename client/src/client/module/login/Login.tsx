import './Login.css';
import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {PageHeaderComponent} from '../../component/PageHeader';
import {PageMenuComponent} from '../../component/PageMenu';
import {LoginFormComponent} from './component/LoginForm';

type ComponentProps = {
  playerName: string;
  updatePlayerName: (playerName: string) => void;
};
export const LoginComponent: React.FunctionComponent<ComponentProps> = ({
  playerName,
  updatePlayerName,
}) => {
  const history = useHistory();
  const location = useLocation<{ referer: string }>();
  const { referer } = location.state || { referer: '/' };

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const newPlayerName = formData.get('name');
    if (typeof newPlayerName !== 'string') {
      return;
    }

    updatePlayerName(newPlayerName);
    history.replace((['/login', '/logout'].includes(referer)) ? '/' : referer );
  };

  return (
    <div className="login">
      <PageHeaderComponent />

      <LoginFormComponent playerName={playerName} onSubmit={login} />

      <PageMenuComponent extraButtons={[]}/>
    </div>
  );
};
