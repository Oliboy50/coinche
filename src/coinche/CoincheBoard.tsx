import React from 'react';
import { BoardProps } from 'boardgame.io/react';
import {
  GameStatePlayerView,
  Moves,
  TrumpMode,
  PlayerID,
  PhaseID,
} from '../shared/coinche';

export const CoincheBoard: React.FunctionComponent<BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>> = ({
  moves,
}) => {
  return (
    <div>
      <button onClick={() => moves.saySkip()}>Skip</button>
      <button onClick={() => moves.sayTake(250, TrumpMode.NoTrump)}>250 Sans Atout</button>
    </div>
  );
};
