import {
  Card,
  GameState,
  isPlayableCard,
  isSameCard,
  Moves,
  PlayerID,
  TrumpMode,
} from '../../../../../shared/coinche';
import {sortCards} from '../service/sortCards';
import {CardComponent} from './Card';

type ComponentProps = {
  cards: Card[],
  isMyTurnToPlayACard: boolean,
  playCard: (card: Card) => void,
  trumpMode: TrumpMode | undefined,
  playersCardPlayedInCurrentTurn: GameState['playersCardPlayedInCurrentTurn'],
  firstPlayerInCurrentTurn: PlayerID,
  playerPartner: PlayerID,
  sayBelotOrNot: Moves['sayBelotOrNot'],
  belotCards: Card[],
};
export const MyCardsComponent: React.FunctionComponent<ComponentProps> = ({
  cards,
  isMyTurnToPlayACard,
  playCard,
  trumpMode,
  playersCardPlayedInCurrentTurn,
  firstPlayerInCurrentTurn,
  playerPartner,
  sayBelotOrNot,
  belotCards,
}) => {
  return (
    <div className="myCards">
      {sortCards(cards).map(card => {
        const key = `${card.color}${card.name}`;
        const isBelotCard = belotCards.some(bc => isSameCard(bc, card));
        const playCardState = (isMyTurnToPlayACard && trumpMode)
          ? (isPlayableCard(card, cards, trumpMode, playersCardPlayedInCurrentTurn, firstPlayerInCurrentTurn, playerPartner) ? 'playable' : 'forbidden')
          : undefined;
        const onCardClick = (playCardState === 'playable' && !isBelotCard) ? () => playCard(card) : undefined;
        const onSayBelotClick = (playCardState === 'playable' && isBelotCard) ? () => {
          sayBelotOrNot(true);
          playCard(card);
        } : undefined;
        const onDontSayBelotClick = (playCardState === 'playable' && isBelotCard) ? () => {
          sayBelotOrNot(false);
          playCard(card);
        } : undefined;

        return <CardComponent
          key={key}
          card={card}
          playCardState={playCardState}
          onCardClick={onCardClick}
          onSayBelotClick={onSayBelotClick}
          onDontSayBelotClick={onDontSayBelotClick}
        />;
      })}
    </div>
  );
};
