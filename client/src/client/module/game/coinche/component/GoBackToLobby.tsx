import React, {useContext} from 'react';
import {I18nContext} from '../context/i18n';

type ComponentProps = {
  goBackToLobby: () => void;
};
export const GoBackToLobbyComponent: React.FunctionComponent<ComponentProps> = ({
  goBackToLobby,
}) => {
  const i18n = useContext(I18nContext);

  return (
    <div className="goBackToLobby">
      <span className="leaveButton" onClick={goBackToLobby} title={i18n.GoBackToLobby.leave} role="img" aria-label="leave" data-testid="button leave">{`🚪\u00A0🚶‍♀️`}</span>
    </div>
  );
};
