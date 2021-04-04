import {useContext} from 'react';
import {I18nContext} from '../../../context';

type ComponentProps = {
  onClick: () => void;
};
export const CreateRoomButtonComponent: React.FunctionComponent<ComponentProps> = ({
  onClick,
}) => {
  const { lobby: i18n } = useContext(I18nContext);

  return (
    <button className="createRoomButton" type="button" onClick={onClick} data-testid="button createRoom">{i18n.createRoom}</button>
  );
};
