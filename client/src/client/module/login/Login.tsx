import './Login.css';
import React, {useContext} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {LanguageCode} from '../../../shared';
import {I18nContext} from '../../context/i18n';
import {CardDisplay} from '../../context/cardDisplay';
import {PageHeaderComponent} from '../../component/PageHeader';
import {buildOptionsButton, PageMenuComponent} from '../../component/PageMenu';

type ComponentProps = {
  playerName: string;
  updatePlayerName: (playerName: string) => void;
  updateLanguageCode: (lc: LanguageCode) => void;
  updateCardDisplay: (c: CardDisplay) => void;
};
export const LoginComponent: React.FunctionComponent<ComponentProps> = ({
  playerName,
  updatePlayerName,
  updateLanguageCode,
  updateCardDisplay,
}) => {
  const { login: i18n } = useContext(I18nContext);
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

      <form className="loginForm" onSubmit={login}>
        <input className="nameInput" type="text" name="name" placeholder={i18n.playerNamePlaceholder} defaultValue={playerName} data-testid="input name"/>
        <button className="submitButton" type="submit" data-testid="button submit">{i18n.submit}</button>
      </form>

      <PageMenuComponent buttons={[
        buildOptionsButton(
          updateLanguageCode,
          updateCardDisplay,
        ),
      ]} />
    </div>
  );
};
