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
    PhaseID = DefaultPhaseID,
  > {
    numPlayers: number;
    turn: number;
    currentPlayer: PlayerID;
    currentPlayerMoves: number;
    random: {
      Shuffle: <A extends any[]>(array: A) => A;
    };
    actionPlayers: PlayerID[];
    playOrder: PlayerID[];
    playOrderPos: number;
    stats: {
      turn: {
        numMoves: Partial<Record<PlayerID, number>>;
        allPlayed: boolean;
      };
      phase: {
        numMoves: Partial<Record<PlayerID, number>>;
        allPlayed: boolean;
      };
    };
    allPlayed: boolean;
    phase: PhaseID;
    prevPhase?: PhaseID;
    playerID: PlayerID;
    events: {
      endGame: () => void;
      endPhase: () => void;
      setPhase: (phase: PhaseID) => void;
      endTurn: (options?: { next: PlayerID }) => void;
    };
  }

  export interface GamePhase<
    GameState = DefaultGameState,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    moves?: {
      [key in keyof Partial<Moves>]: (G: GameState, ctx: Context<PlayerID, PhaseID>, ...args: Parameters<Moves[key]>) => GameState | void;
    };
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
    name: string;
    minPlayers: number;
    maxPlayers: number;
    setup: (ctx: Context<PlayerID, PhaseID>) => GameState;
    moves?: {
      [key in keyof Partial<Moves>]: (G: GameState, ctx: Context<PlayerID, PhaseID>, ...args: Parameters<Moves[key]>) => GameState | void;
    };
    events: {
      endTurn?: boolean;
      endPhase?: boolean;
      setPhase?: boolean;
      endGame?: boolean;
    };
    turn: {
      onBegin?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => GameState | void;
      onEnd?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => GameState | void;
      endIf?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => boolean | { next: PlayerID };
      order?: object;
    };
    phases?: Record<PhaseID, GamePhase<GameState, Moves, PlayerID, PhaseID>>;
    endIf?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => any;
    playerView?: (G: GameState | GameStatePlayerView, ctx: Context<PlayerID, PhaseID>, playerID?: PlayerID) => GameStatePlayerView;
  }

  export const TurnOrder: {
    CUSTOM_FROM: <GameState = DefaultGameState>(gameStateKey: keyof GameState) => object;
  };
}
