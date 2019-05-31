declare module 'boardgame.io/core' {
  /**
   * Default type arguments value
   */
  export type DefaultGameState = object;
  export type DefaultMoves = object;
  export type DefaultGameStatePlayerView = object;
  export type DefaultPlayerID = string;
  export type DefaultPhaseID = string;

  export interface Context<
    PlayerID = DefaultPlayerID,
  > {
    numPlayer: number;
    turn: number;
    currentPlayer: PlayerID;
    currentPlayerMoves: number;
    random: {
      Shuffle: <A extends Array>(array: A) => A;
    };
  }

  export interface GameFlowPhase<
    GameState = DefaultGameState,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    onPhaseBegin?: (G: GameState, ctx: Context<PlayerID>) => GameState | void,
    allowedMoves?: (keyof Moves)[];
    endPhaseIf?: (G: GameState, ctx: Context<PlayerID>) => boolean;
    next?: PhaseID;
    onPhaseEnd?: (G: GameState, ctx: Context<PlayerID>) => GameState | void,
  }

  export interface GameFlow<
    GameState = DefaultGameState,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    turnOrder?: object;
    startingPhase?: PhaseID;
    phases?: Record<PhaseID, GameFlowPhase<GameState, Moves, PlayerID, PhaseID>>;
    endTurnIf?: (G: GameState, ctx: Context<PlayerID>) => boolean;
    endGameIf?: (G: GameState, ctx: Context<PlayerID>) => boolean;
  }

  export interface GameConfig<
    GameState = DefaultGameState,
    GameStatePlayerView = DefaultGameStatePlayerView,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    setup: (ctx: Context<PlayerID>, setupData: object) => GameState;
    moves: {
      [key in keyof Moves]: (G: GameState, ctx: Context<PlayerID>, ...args: Parameters<Moves[key]>) => GameState | void;
    };
    flow?: GameFlow<GameState, Moves, PlayerID, PhaseID>;
    playerView?: (G: GameState, ctx: Context<PlayerID>, playerID: PlayerID) => GameStatePlayerView;
  }

  export function Game<
    GameState = DefaultGameState,
    GameStatePlayerView = DefaultGameStatePlayerView,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  >(game: GameConfig<GameState, GameStatePlayerView, Moves, PlayerID, PhaseID>): object;

  export const TurnOrder: {
    CUSTOM_FROM: <GameState = DefaultGameState>(gameStateKey: keyof GameState) => object;
  };

  export const PlayerView: {
    STRIP_SECRETS: Required<GameConfig>['playerView'];
  };
}

declare module 'boardgame.io/react' {
  import { ComponentType } from 'react';
  import { Context, DefaultGameStatePlayerView, DefaultMoves, DefaultPlayerID } from 'boardgame.io/core';

  export interface BoardProps<
    GameStatePlayerView = DefaultGameStatePlayerView,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
  > {
    G: GameStatePlayerView;
    ctx: Context<PlayerID>;
    moves: Moves;
    gameID: string;
    playerID: PlayerID;
    isActive: boolean;
    isMultiplayer: boolean;
    isConnected: boolean;
  }

  export interface Client<
    GameStatePlayerView = DefaultGameStatePlayerView,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
  > {
    game: object;
    numPlayers?: number;
    board?: ComponentType<BoardProps<GameStatePlayerView, Moves, PlayerID>>;
    multiplayer?: boolean | { server: string } | { local: boolean };
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
  >(client: Client<GameStatePlayerView, Moves, PlayerID>): ComponentType<ClientProps<PlayerID>>;
}
