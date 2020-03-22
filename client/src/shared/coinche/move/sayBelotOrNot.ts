import { Context } from 'boardgame.io/core';
import {
  GameState,
  PlayerID,
  PhaseID,
} from '../index';

export default (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
  sayIt: boolean,
): void => {
  if (
    !G.belotAnnounce
    || G.belotAnnounce.owner !== ctx.currentPlayer
    || G.belotAnnounce.ownerHasChosen
  ) {
    throw new Error(`Player can't choose to say belot`);
  }

  G.belotAnnounce = {
    ...G.belotAnnounce,
    ownerHasChosen: true,
    isSaid: sayIt,
  };
};
