import React, {useContext} from 'react';
import styles from './PreviousCardsPlayedMenu.module.css';
import {I18nContext} from '../context/i18n';

type ComponentProps = {
  isDisplayedPreviousCardsPlayed: boolean;
  toggleIsDisplayedPreviousCardsPlayed: () => void;
};
export const PreviousCardsPlayedMenuComponent: React.FunctionComponent<ComponentProps> = ({
  isDisplayedPreviousCardsPlayed,
  toggleIsDisplayedPreviousCardsPlayed,
}) => {
  const i18n = useContext(I18nContext);

  return (
    <div className={styles.menu}>
      <div className={styles.toggleIsDisplayedPreviousCardsPlayed}>
        <button onClick={() => toggleIsDisplayedPreviousCardsPlayed()} data-testid="button toggleIsDisplayedPreviousCardsPlayed">{
          isDisplayedPreviousCardsPlayed ? i18n.PreviousCardsPlayedMenu.doNotDisplayPreviousCardsPlayed : i18n.PreviousCardsPlayedMenu.displayPreviousCardsPlayed
        }</button>
      </div>
    </div>
  );
};
