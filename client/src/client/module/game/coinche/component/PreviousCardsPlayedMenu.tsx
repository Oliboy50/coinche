import {useContext} from 'react';
import {I18nContext} from '../../../../context';

type ComponentProps = {
  isDisplayedPreviousCardsPlayed: boolean;
  toggleIsDisplayedPreviousCardsPlayed: () => void;
};
export const PreviousCardsPlayedMenuComponent: React.FunctionComponent<ComponentProps> = ({
  isDisplayedPreviousCardsPlayed,
  toggleIsDisplayedPreviousCardsPlayed,
}) => {
  const { game: i18n } = useContext(I18nContext);

  return (
    <div className="toggleIsDisplayedPreviousCardsPlayed">
      <button type="button" onClick={() => toggleIsDisplayedPreviousCardsPlayed()} data-testid="button toggleIsDisplayedPreviousCardsPlayed">{
        isDisplayedPreviousCardsPlayed ? i18n.PreviousCardsPlayedMenu.doNotDisplayPreviousCardsPlayed : i18n.PreviousCardsPlayedMenu.displayPreviousCardsPlayed
      }</button>
    </div>
  );
};
