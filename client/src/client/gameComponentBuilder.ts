import {Client} from 'boardgame.io/react';
import {SocketIO} from 'boardgame.io/multiplayer';
import {GameName} from '../shared';
import {game as coincheGame, GameStatePlayerView, Moves, PhaseID, PlayerID} from '../shared/coinche';
import {BoardComponent as coincheBoard} from './coinche/Client';

export const buildGameComponent = (_: GameName, apiBaseUrl: string) => {
  return Client<GameStatePlayerView, Moves, PlayerID, PhaseID>({
    game: coincheGame,
    board: coincheBoard,
    multiplayer: SocketIO({ server: apiBaseUrl }),
  });
};
