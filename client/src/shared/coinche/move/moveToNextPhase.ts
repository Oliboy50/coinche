import type { Context } from 'boardgame.io/core';
import type {
  GameState,
  PlayerID,
  PhaseID,
} from '../index';

export default function moveToNextPhase (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
): void {
  G.__isWaitingBeforeMovingToNextPhase = false;
  G.__canMoveToNextPhase = true;
  ctx.events.endTurn();
};
