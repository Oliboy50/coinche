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
      endPhase: (options?: { next: PhaseID }) => void;
      endTurn: (options?: { next: PlayerID }) => void;
    };
  }

  export interface GameFlowPhase<
    GameState = DefaultGameState,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    endPhaseIf?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => boolean | { next: PhaseID };
    next?: PhaseID;
    endTurnIf?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => boolean | { next: PlayerID };
    endGameIf?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => boolean;
    onTurnBegin?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => GameState | void;
    onTurnEnd?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => GameState | void;
    onMove?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => GameState | void;
    onPhaseBegin?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => GameState | void;
    onPhaseEnd?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => GameState | void;
    allowedMoves?: (keyof Moves)[];
  }

  export interface GameFlow<
    GameState = DefaultGameState,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    endTurn?: boolean;
    endPhase?: boolean;
    endGame?: boolean;
    turnOrder?: object;
    startingPhase?: PhaseID;
    phases?: Record<PhaseID, GameFlowPhase<GameState, Moves, PlayerID, PhaseID>>;
    endTurnIf?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => boolean | { next: PlayerID };
    endGameIf?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => any;
    onTurnBegin?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => GameState | void;
    onTurnEnd?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => GameState | void;
    onMove?: (G: GameState, ctx: Context<PlayerID, PhaseID>) => GameState | void;
  }

  export interface GameConfig<
    GameState = DefaultGameState,
    GameStatePlayerView = DefaultGameStatePlayerView,
    Moves = DefaultMoves,
    PlayerID = DefaultPlayerID,
    PhaseID = DefaultPhaseID,
  > {
    setup: (ctx: Context<PlayerID, PhaseID>, setupData: object) => GameState;
    moves: {
      [key in keyof Moves]: (G: GameState, ctx: Context<PlayerID, PhaseID>, ...args: Parameters<Moves[key]>) => GameState | void;
    };
    flow?: GameFlow<GameState, Moves, PlayerID, PhaseID>;
    playerView?: (G: GameState | GameStatePlayerView, ctx: Context<PlayerID, PhaseID>, playerID: PlayerID) => GameStatePlayerView;
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
