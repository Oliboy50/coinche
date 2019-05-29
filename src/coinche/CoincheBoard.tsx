import React from 'react';
import {BoardProps} from 'boardgame.io/react';
import { CoincheGameState, CoincheGameMoves, PlayerID } from '../shared/coinche';

export const CoincheBoard: React.FC<BoardProps<CoincheGameState, CoincheGameMoves, PlayerID>> = ({
  moves,
}) => {
  return (
    <div>
      <button onClick={() => moves.shuffle()}>shuffle</button>
    </div>
  );
};
