import React, {useContext} from 'react';
import {I18nContext} from '../../../context';

type ComponentProps = {
  onClick: () => void;
};
export const GoButtonComponent: React.FunctionComponent<ComponentProps> = ({
  onClick,
}) => {
  const { lobby: i18n } = useContext(I18nContext);

  return (
    <div className="goButton">
      <span onClick={onClick} title={i18n.goToRoom} data-testid="button go">GO</span>
    </div>
  );
};
