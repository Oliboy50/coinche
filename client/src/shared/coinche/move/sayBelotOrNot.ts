import type { Context } from 'boardgame.io/core';
import type {
  GameState,
  PlayerID,
  PhaseID,
} from '../index';

export default function sayBelotOrNot (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
  sayIt: boolean,
): void {
  if (
    !G.belotAnnounce
    || G.belotAnnounce.owner !== ctx.currentPlayer
    || G.belotAnnounce.ownerHasChosen
  ) {
    throw new Error(`Player can't choose to say belot`);
  }

  if (sayIt) {
    G.playersAnnouncesDisplayedInCurrentTurn[ctx.currentPlayer].push({ id: 'Belot' });
  }
  G.belotAnnounce = {
    ...G.belotAnnounce,
    ownerHasChosen: true,
    isSaid: sayIt,
  };
};
