import { Context } from 'boardgame.io/core';
import {
  GameState,
  PlayerID,
  PhaseID,
} from '../index';

export default (
  G: GameState,
  _: Context<PlayerID, PhaseID>,
): void => {
  G.__canMoveToNextPhase = true;
};
