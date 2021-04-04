import './PageMenu.css';
import {Fragment, useContext, useEffect} from 'react';
import {PageMenuButton, PageMenuContext} from '../context';

type ComponentProps = {
  extraButtons?: Omit<PageMenuButton, 'isOpened'>[];
};
export const PageMenuComponent: React.FunctionComponent<ComponentProps> = ({
  extraButtons,
}) => {
  const { state, dispatch } = useContext(PageMenuContext);
  useEffect(() => {
    if (extraButtons) {
      extraButtons.forEach((button) => {
        dispatch({ type: 'SET_EXTRA_BUTTON', payload: button });
      });
    } else {
      dispatch({ type: 'REMOVE_EXTRA_BUTTONS' });
    }
  }, [dispatch, extraButtons]);

  return (
    <div className={`pageMenu ${state.buttons.some(({isOpened}) => isOpened) ? 'opened': ''}`}>
      <div className="content">
        {state.buttons.filter(({isOpened}) => isOpened).map(b => {
          return <Fragment key={b.id}>{b.renderContent}</Fragment>;
        })}
      </div>
      <div className="toggleButtons">
        {state.buttons.map((b) => {
          return <div key={b.id} className={`toggleButton ${b.isOpened ? 'active': ''}`} onClick={() => dispatch({type: 'TOGGLE_IS_OPENED_BUTTON_BY_ID', payload: b.id})}>
            {b.renderButton}
          </div>;
        })}
      </div>
    </div>
  );
};
