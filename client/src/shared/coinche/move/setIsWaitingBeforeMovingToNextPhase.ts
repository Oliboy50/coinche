import { Context } from 'boardgame.io/core';
import {
  GameState,
  PlayerID,
  PhaseID,
} from '../index';

export default (
  G: GameState,
  _: Context<PlayerID, PhaseID>,
  isWaitingBeforeMovingToNextPhase: boolean,
): void => {
  G.__isWaitingBeforeMovingToNextPhase = isWaitingBeforeMovingToNextPhase;
};
