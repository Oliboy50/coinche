import { Context } from 'boardgame.io/core';
import {
  GameState,
  PlayerID,
  PhaseID,
  Announce,
} from '../index';

export default function sayAnnounce (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
  announce: Announce,
): void {
  const saidAnnounce = G.playersAnnounces[ctx.currentPlayer].find(playerAnnounce => playerAnnounce.announce.id === announce.id);
  if (!saidAnnounce) {
    throw new Error(`Player can't say this announce`);
  }

  saidAnnounce.isSaid = true;
};
