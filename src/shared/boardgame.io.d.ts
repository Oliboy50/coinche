declare module 'boardgame.io/core' {
  const TurnOrder: {
    CUSTOM_FROM: <GameState>(gameStateKey: keyof GameState) => object;
    CUSTOM: (order: string[]) => object;
    [key: string]: object;
  };

  const PlayerView: {
    STRIP_SECRETS: (G: object, ctx: Context, playerID: any) => Partial<typeof G>; // eslint-disable-line no-undef
  };

  export interface Context {
    numPlayer: number;
    turn: number;
    currentPlayer: string;
    currentPlayerMoves: number;
    random: {
      Shuffle: <A extends any[]>(array: A) => A;
    };
  }

  interface GameFlowTrigger<GameState> {
    conditon: (G: GameState, ctx: Context) => boolean;
    action: (G: GameState, ctx: Context) => void;
  }

  interface GameFlowPhase<GameState, Moves, PhaseID> {
    onPhaseBegin?: (G: GameState, ctx: Context) => GameState | void,
    allowedMoves?: (keyof Moves)[];
    endPhaseIf?: (G: GameState, ctx: Context) => boolean;
    next?: PhaseID;
    onPhaseEnd?: (G: GameState, ctx: Context) => GameState | void,
  }

  interface GameFlow<GameState, Moves, PhaseID> {
    turnOrder?: object;
    startingPhase?: PhaseID;
    phases?: Record<PhaseID, GameFlowPhase<GameState, Moves, PhaseID>>;
    endTurnIf?: (G: GameState, ctx: Context) => boolean;
    endGameIf?: (G: GameState, ctx: Context) => boolean;
    triggers?: GameFlowTrigger<GameState>[];
  }

  type GameMoves<GameState, Moves> = {
    [key in keyof Moves]: (G: GameState, ctx: Context, ...args: Parameters<Moves[key]>) => GameState | void;
  }

  interface GameArgs<GameState, Moves, PlayerID, PhaseID> {
    setup: (ctx: Context, setupData: object) => GameState;
    moves: GameMoves<GameState, Moves>;
    playerView?: (G: GameState, ctx: Context, playerID: PlayerID) => Partial<GameState>;
    flow?: GameFlow<GameState, Moves, PhaseID>;
  }

  function Game<GameState, Moves, PlayerID extends string, PhaseID extends string>(gameArgs: GameArgs<GameState, Moves, PlayerID, PhaseID>): object;

  export { Game, TurnOrder, PlayerView };
}

declare module 'boardgame.io/react' {
  import { ComponentType } from 'react';
  import { Context } from 'boardgame.io/core';

  export interface BoardProps<GameState, Moves, PlayerID> {
    G: GameState;
    ctx: Context;
    moves: Moves;
    gameID: string;
    playerID: PlayerID;
    isActive: boolean;
    isMultiplayer: boolean;
    isConnected: boolean;
  }

  interface ClientArgs<GameState, Moves, PlayerID> {
    game: object;
    numPlayers?: number;
    board?: ComponentType<BoardProps<GameState, Moves, PlayerID>>;
    multiplayer?: boolean | { server: string } | { local: boolean };
    debug?: boolean;
  }

  interface ClientProps<PlayerID> {
    gameID?: string;
    playerID?: PlayerID;
    debug?: boolean;
  }

  function Client<GameState, Moves, PlayerID extends string>(clientArgs: ClientArgs<GameState, Moves, PlayerID>): ComponentType<ClientProps<GameState, Moves, PlayerID>>;

  export { Client };
}
