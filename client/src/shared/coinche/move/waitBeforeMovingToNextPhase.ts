import type { Context } from 'boardgame.io/core';
import type {
  GameState,
  PlayerID,
  PhaseID,
} from '../index';

export default function waitBeforeMovingToNextPhase (
  G: GameState,
  _: Context<PlayerID, PhaseID>,
): void {
  G.__isWaitingBeforeMovingToNextPhase = true;
};
