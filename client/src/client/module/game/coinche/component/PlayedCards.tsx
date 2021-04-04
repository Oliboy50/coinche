import type {Card, PlayerID} from '../../../../../shared/coinche';
import {CardComponent} from './Card';
import {getPlayerIDForPosition} from '../service/getPlayerIDForPosition';

type ComponentProps = {
  bottomPlayerID: PlayerID,
  playedCards: Record<PlayerID, Card | undefined> | undefined,
};
export const PlayedCardsComponent: React.FunctionComponent<ComponentProps> = ({
  bottomPlayerID,
  playedCards,
}) => {

  const bottomPlayerCard = playedCards && playedCards[bottomPlayerID];
  const topPlayerCard = playedCards && playedCards[getPlayerIDForPosition(bottomPlayerID, 'top')];
  const leftPlayerCard = playedCards && playedCards[getPlayerIDForPosition(bottomPlayerID, 'left')];
  const rightPlayerCard = playedCards && playedCards[getPlayerIDForPosition(bottomPlayerID, 'right')];

  return (
    <div className="playedCards">
      <div className="playedCard top">
        {topPlayerCard && <CardComponent card={topPlayerCard} />}
      </div>
      <div className="playedCard left">
        {leftPlayerCard && <CardComponent card={leftPlayerCard} />}
      </div>
      <div className="playedCard right">
        {rightPlayerCard && <CardComponent card={rightPlayerCard} />}
      </div>
      <div className="playedCard bottom">
        {bottomPlayerCard && <CardComponent card={bottomPlayerCard} />}
      </div>
    </div>
  );
};
