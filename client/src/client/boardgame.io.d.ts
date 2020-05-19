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
    ctx: Context<PlayerID, PhaseID>;
    moves: Moves;
    gameID: string;
    playerID: PlayerID | null;
    gameMetadata: {
      id: PlayerID;
      name: string;
    }[] | undefined;
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
    board: ComponentType<BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>>;
    numPlayers?: number;
    multiplayer?: false | (() => void);
    debug?: boolean;
  }

  export interface ClientProps<
    PlayerID = DefaultPlayerID,
  > {
    gameID?: string;
    playerID?: PlayerID;
    debug?: boolean;
    credentials?: string;
  }

  export function Client<
    GameStatePlayerView = DefaultGameStatePlayerView,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  >(config: ClientConfig<GameStatePlayerView, Moves, PlayerID, PhaseID>): ComponentType<ClientProps<PlayerID>>;
}
