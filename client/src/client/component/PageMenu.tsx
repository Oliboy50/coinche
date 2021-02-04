import './PageMenu.css';
import React, {useEffect, useState} from 'react';
import {OptionsComponent} from './Options';

interface PageMenuButtonProp {
  id: string;
  renderContent: JSX.Element;
  renderButton: JSX.Element;
}

const defaultButtons = [
  {
    id: 'options',
    renderContent: <OptionsComponent />,
    renderButton: <span role="img" aria-label="options" data-testid="button options">⚙️</span>,
  },
];

type ComponentProps = {
  extraButtons: PageMenuButtonProp[];
};
export const PageMenuComponent: React.FunctionComponent<ComponentProps> = ({
  extraButtons,
}) => {
  const [buttonsState, setButtonsState] = useState<(PageMenuButtonProp & { isOpened: boolean; })[]>([]);
  useEffect(() => {
    setButtonsState([...extraButtons, ...defaultButtons].map(b => ({
      ...b,
      isOpened: false,
    })));
  }, [extraButtons]);

  const onClickModalButton = (modalId: string) => {
    setButtonsState(buttonsState.map(b => ({
      ...b,
      isOpened: (b.id === modalId) ? !b.isOpened : false,
    })));
  };

  return (
    <div className={`modal ${buttonsState.some(({isOpened}) => isOpened) ? 'opened': ''}`}>
      <div className="content">
        {buttonsState.filter(({isOpened}) => isOpened).map(b => {
          return <React.Fragment key={b.id}>{b.renderContent}</React.Fragment>;
        })}
      </div>
      <div className="toggleButtons">
        {buttonsState.map((b) => {
          return <div key={b.id} className={`toggleButton ${b.isOpened ? 'active': ''}`} onClick={() => onClickModalButton(b.id)}>
            {b.renderButton}
          </div>;
        })}
      </div>
    </div>
  );
};
