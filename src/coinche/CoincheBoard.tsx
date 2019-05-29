import React from 'react';
import {BoardProps} from 'boardgame.io/react';
import { CoincheGameState, CoincheGameMoves } from '../shared/coinche';

export const CoincheBoard: React.FC<BoardProps<CoincheGameState, CoincheGameMoves>> = ({ G, moves }) => {

  return (
    <div>
      <button onClick={() => moves.shuffle()}>shuffle</button>
      <button onClick={() => moves.distributeCard(0)}>distribute card</button>
    </div>
  );
};
