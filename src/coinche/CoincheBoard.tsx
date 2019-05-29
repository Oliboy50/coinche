import React from 'react';
import {BoardProps} from 'boardgame.io/react';
import { CoincheGameState, CoincheGameMoves } from '../../core/game/coinche';

export const CoincheBoard: React.FC<BoardProps<CoincheGameState, CoincheGameMoves>> = ({ G, moves }) => (
  <div>
    <pre>{JSON.stringify(G, null, 2)}</pre>
    <button onClick={() => moves.shuffle()}>shuffle</button>
    <button onClick={() => moves.distributeCard(0)}>distribute card</button>
  </div>
);
