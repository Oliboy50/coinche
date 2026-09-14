import './Login.css';
import {useNavigate, useLocation} from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();
  const referer = (location.state as { referer?: string } | null)?.referer ?? '/';

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const newPlayerName = formData.get('name');
    if (typeof newPlayerName !== 'string') {
      return;
    }

    updatePlayerName(newPlayerName);
    navigate((['/login', '/logout'].includes(referer)) ? '/' : referer, { replace: true });
  };

  return (
    <div className="login">
      <PageHeaderComponent />

      <LoginFormComponent playerName={playerName} onSubmit={login} />

      <PageMenuComponent />
    </div>
  );
};
