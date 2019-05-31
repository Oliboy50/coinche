import React from 'react';
import { BoardProps } from 'boardgame.io/react';
import {
  CoincheGameStatePlayerView,
  CoincheMoves,
  CoincheTrumpMode,
  PlayerID,
} from '../shared/coinche';

export const CoincheBoard: React.FunctionComponent<BoardProps<CoincheGameStatePlayerView, CoincheMoves, PlayerID>> = ({
  moves,
}) => {
  return (
    <div>
      <button onClick={() => moves.talk_skip()}>Skip</button>
      <button onClick={() => moves.talk_take(250, CoincheTrumpMode.NoTrump)}>250 Sans Atout</button>
    </div>
  );
};
