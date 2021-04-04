import { Context } from 'boardgame.io/core';
import {
  GameState,
  PlayerID,
  PhaseID,
} from '../index';

export default function endTurn (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
): void {
  ctx.events.endTurn();
};
