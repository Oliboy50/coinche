import './PageMenu.css';
import React, {useState} from 'react';

type ComponentProps = {
  buttons: {
    id: string;
    renderContent: () => JSX.Element|undefined;
    renderButton: () => JSX.Element|undefined;
  }[];
};
export const PageMenuComponent: React.FunctionComponent<ComponentProps> = ({
  buttons,
}) => {
  const [buttonsState, setButtonsState] = useState(buttons.map(b => ({
    id: b.id,
    isOpened: false,
    renderContent: b.renderContent,
    renderButton: b.renderButton,
  })));

  const onClickModalButton = (modalId: string) => {
    setButtonsState(buttonsState.map(b => ({
      id: b.id,
      isOpened: (b.id === modalId) ? !b.isOpened : false,
      renderContent: b.renderContent,
      renderButton: b.renderButton,
    })));
  };

  return (
    <div className={`modal ${buttonsState.some(({isOpened}) => isOpened) ? 'opened': ''}`}>
      <div className="content">
        {buttonsState.filter(({isOpened}) => isOpened).map(b => {
          return <React.Fragment key={b.id}>{b.renderContent()}</React.Fragment>;
        })}
      </div>
      <div className="toggleButtons">
        {buttonsState.map((b) => {
          return <div key={b.id} className={`toggleButton ${b.id} ${b.isOpened ? 'active': ''}`} onClick={() => onClickModalButton(b.id)}>
            {b.renderButton()}
          </div>;
        })}
      </div>
    </div>
  );
};
