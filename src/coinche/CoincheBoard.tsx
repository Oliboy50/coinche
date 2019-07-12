import React from 'react';
import {BoardProps} from 'boardgame.io/react';
import {GameStatePlayerView, Moves, PhaseID, PlayerID, TrumpMode} from '../shared/coinche';

export const CoincheBoard: React.FunctionComponent<BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>> = ({
  G,
  ctx,
  moves,
}) => {
  return (
    <div>
      {ctx.phase === PhaseID.Talk && (
        <React.Fragment>
          <button onClick={() => moves.saySkip()}>Skip</button>
          <button onClick={() => moves.sayTake(82, TrumpMode.NoTrump)}>82 Sans Atout</button>
        </React.Fragment>
      )}

      {ctx.phase === PhaseID.PlayCards && (
        <React.Fragment>
          {G.playersCards[ctx.currentPlayer].map(card => (
            <button key={`${card.color}${card.name}`} onClick={() => moves.playCard(card)}>Color {card.color} / Name {card.name}</button>
          ))}
        </React.Fragment>
      )}
    </div>
  );
};
