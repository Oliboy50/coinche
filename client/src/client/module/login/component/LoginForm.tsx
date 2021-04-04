import {useContext} from 'react';
import {I18nContext} from '../../../context';

type ComponentProps = {
  playerName: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
export const LoginFormComponent: React.FunctionComponent<ComponentProps> = ({
  playerName,
  onSubmit,
}) => {
  const { login: i18n } = useContext(I18nContext);

  return (
    <form className="loginForm" onSubmit={onSubmit}>
      <input className="nameInput" type="text" name="name" placeholder={i18n.playerNamePlaceholder} defaultValue={playerName} data-testid="input name"/>
      <button className="submitButton" type="submit" data-testid="button submit">{i18n.submit}</button>
    </form>
  );
};
