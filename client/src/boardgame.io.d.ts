declare module 'boardgame.io/react' {
  import { ComponentType } from 'react';
  import { Context, DefaultGameStatePlayerView, DefaultMoves, DefaultPlayerID, DefaultPhaseID } from 'boardgame.io/core';

  export interface BoardProps<
    GameStatePlayerView = DefaultGameStatePlayerView,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    G: GameStatePlayerView;
    ctx: Omit<Context<PlayerID, PhaseID>, 'playerID'>;
    moves: Moves;
    gameID: string;
    playerID: PlayerID;
    isActive: boolean;
    isMultiplayer: boolean;
    isConnected: boolean;
  }

  export interface ClientConfig<
    GameStatePlayerView = DefaultGameStatePlayerView,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    game: object;
    numPlayers?: number;
    board?: ComponentType<BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>>;
    multiplayer?: false | (() => void);
    debug?: boolean;
  }

  export interface ClientProps<
    PlayerID = DefaultPlayerID,
  > {
    gameID?: string;
    playerID?: PlayerID;
    debug?: boolean;
  }

  export function Client<
    GameStatePlayerView = DefaultGameStatePlayerView,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  >(config: ClientConfig<GameStatePlayerView, Moves, PlayerID, PhaseID>): ComponentType<ClientProps<PlayerID>>;

  export const Lobby: ComponentType<{gameServer: string; lobbyServer: string; gameComponents: { game: any; board: any }[]}>;
}
