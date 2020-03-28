import { Context } from 'boardgame.io/core';
import {
  GameState,
  PlayerID,
  PhaseID,
} from '../index';

export default (
  G: GameState,
  ctx: Context<PlayerID, PhaseID>,
): void => {
  G.__isWaitingBeforeMovingToNextPhase = false;
  G.__canMoveToNextPhase = true;
  ctx.events.endTurn();
};
