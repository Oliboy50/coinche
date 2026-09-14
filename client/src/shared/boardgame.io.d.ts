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
      Shuffle: <A extends unknown[]>(array: A) => A;
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

  export interface FnContext<
    GameState = DefaultGameState,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    G: GameState;
    ctx: Context<PlayerID, PhaseID>;
    events: Context<PlayerID, PhaseID>['events'];
    random: Context<PlayerID, PhaseID>['random'];
  }

  export interface TurnConfig<
    GameState = DefaultGameState,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    onBegin?: (context: FnContext<GameState, PlayerID, PhaseID>) => GameState | void;
    onEnd?: (context: FnContext<GameState, PlayerID, PhaseID>) => GameState | void;
    endIf?: (context: FnContext<GameState, PlayerID, PhaseID>) => boolean | { next: PlayerID };
    order?: {
      playOrder?: (context: FnContext<GameState, PlayerID, PhaseID>) => PlayerID[];
      first: (context: FnContext<GameState, PlayerID, PhaseID>) => number;
      next: (context: FnContext<GameState, PlayerID, PhaseID>) => number;
    };
  }

  export interface PhaseConfig<
    GameState = DefaultGameState,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    moves?: {
      [k in keyof Partial<Moves>]: (context: FnContext<GameState, PlayerID, PhaseID>, ...args: Parameters<Moves[k]>) => GameState | void;
    };
    turn?: TurnConfig<GameState, PlayerID, PhaseID>;
    endIf?: (context: FnContext<GameState, PlayerID, PhaseID>) => boolean | { next: PhaseID };
    next?: PhaseID;
    onBegin?: (context: FnContext<GameState, PlayerID, PhaseID>) => GameState | void;
    onEnd?: (context: FnContext<GameState, PlayerID, PhaseID>) => GameState | void;
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
    setup: (context: FnContext<GameState, PlayerID, PhaseID>) => GameState;
    moves?: {
      [k in keyof Partial<Moves>]: (context: FnContext<GameState, PlayerID, PhaseID>, ...args: Parameters<Moves[k]>) => GameState | void;
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
    endIf?: (context: FnContext<GameState, PlayerID, PhaseID>) => unknown;
    playerView?: (context: { G: GameState | GameStatePlayerView; ctx: Context<PlayerID, PhaseID>; playerID?: PlayerID | null }) => GameStatePlayerView;
  }
}
