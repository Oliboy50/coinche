declare module 'boardgame.io/core' {
  /**
   * Default type arguments value
   */
  export type DefaultGameState = object;
  export type DefaultMoves = object;
  export type DefaultGameStatePlayerView = object;
  export type DefaultPlayerID = string;
  export type DefaultPhaseID = string;

  export interface Gameover<
    PlayerID = DefaultPlayerID,
  > {
    winners: PlayerID[];
  }

  export interface Context<
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    numPlayers: number;
    turn: number;
    currentPlayer: PlayerID;
    currentPlayerMoves: number;
    random: {
      Shuffle: <A extends any[]>(array: A) => A;
    };
    playOrder: PlayerID[];
    playOrderPos: number;
    phase: PhaseID;
    gameover: Gameover<PlayerID> | undefined;
    events: {
      endGame: (gameover: Gameover<PlayerID>) => void;
      endPhase: () => void;
      setPhase: (phase: PhaseID) => void;
      endTurn: (options?: { next: PlayerID }) => void;
      endStage: () => void;
      setStage: (stage: string) => void;
      setActivePlayers: (config: object) => void;
      pass: () => void;
    };
  }

  export interface TurnConfig<
    GameState = DefaultGameState,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    onBegin?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => GameState | void;
    onEnd?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => GameState | void;
    endIf?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => boolean | { next: PlayerID };
    order?: {
      playOrder?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => PlayerID[];
      first: (G: GameState, ctx: Context<PlayerID, PhaseID>) => number;
      next: (G: GameState, ctx: Context<PlayerID, PhaseID>) => number;
    };
  }

  export interface PhaseConfig<
    GameState = DefaultGameState,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    moves?: {
      [k in keyof Partial<Moves>]: (G: GameState, ctx: Context<PlayerID, PhaseID>, ...args: Parameters<Moves[k]>) => GameState | void;
    };
    turn?: TurnConfig<GameState, PlayerID, PhaseID>;
    endIf?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => boolean | { next: PhaseID };
    next?: PhaseID;
    onBegin?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => GameState | void;
    onEnd?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => GameState | void;
    start?: true;
  }

  export interface GameConfig<
    GameState = DefaultGameState,
    GameStatePlayerView = DefaultGameStatePlayerView,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    name?: string;
    minPlayers?: number;
    maxPlayers?: number;
    setup: (ctx: Context<PlayerID, PhaseID>) => GameState;
    moves?: {
      [k in keyof Partial<Moves>]: (G: GameState, ctx: Context<PlayerID, PhaseID>, ...args: Parameters<Moves[k]>) => GameState | void;
    };
    events?: {
      endStage?: boolean;
      endTurn?: boolean;
      endPhase?: boolean;
      endGame?: boolean;
      setStage?: boolean;
      setPhase?: boolean;
      setActivePlayers?: boolean;
      pass?: boolean;
    };
    turn?: TurnConfig<GameState, PlayerID, PhaseID>;
    phases?: Record<PhaseID, PhaseConfig<GameState, Moves, PlayerID, PhaseID>>;
    endIf?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => any;
    playerView?: (G: GameState | GameStatePlayerView, ctx: Context<PlayerID, PhaseID>, playerID?: PlayerID) => GameStatePlayerView;
  }
}
