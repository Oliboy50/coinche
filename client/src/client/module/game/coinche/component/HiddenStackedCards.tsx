import {Card, secretCard, SecretCard} from '../../../../../shared/coinche';
import {CardComponent} from './Card';

type ComponentProps = {
  cards: (Card | SecretCard)[],
};
export const HiddenStackedCardsComponent: React.FunctionComponent<ComponentProps> = ({
  cards,
}) => {
  return (
    <div className="hiddenAdditionalCards">
      {cards.map((card, i) => {
        const key = `${i}`;

        return <CardComponent key={key} card={secretCard} />;
      })}
    </div>
  );
};
