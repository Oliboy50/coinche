declare module 'boardgame.io/core' {
  interface Random {
    Shuffle: (array: any[]) => any[];
  }

  interface GameContext {
    numPlayer: number;
    turn: number;
    currentPlayer: string;
    currentPlayerMoves: number;
    random: Random;
  }

  type Moves<GameState, GameMoves> = {
    [key in keyof GameMoves]: (G: GameState, ctx: GameContext, ...args: Parameters<GameMoves[key]>) => GameState;
  }

  interface GameFlowPhase<GameState> {
    name: string;
    allowedMoves: string[];
    endPhaseIf: (G: GameState, ctx: GameContext) => boolean;
  }

  interface GameFlowTrigger<GameState> {
    conditon: (G: GameState, ctx: GameContext) => boolean;
    action: (G: GameState, ctx: GameContext) => void;
  }

  interface GameFlow<GameState> {
    endGameIf: (G: GameState, ctx: GameContext) => boolean;
    movesPerTurn?: number;
    endTurnIf?: (G: GameState, ctx: GameContext) => boolean;
    onTurnEnd?: (G: GameState, ctx: GameContext) => void;
    triggers?: GameFlowTrigger<GameState>[];
    phases?: GameFlowPhase<GameState>[];
  }

  interface GameArgs<GameState, GameMoves> {
    setup: () => GameState;
    moves: Moves<GameState, GameMoves>;
    name?: string;
    playerView?: (G: GameState, ctx: GameContext, playerID: string) => any;
    flow?: GameFlow<GameState>;
  }

  export function Game<GameState, GameMoves>(gameArgs: GameArgs<GameState, GameMoves>): object;
}

declare module 'boardgame.io/react' {
  import React from 'react';
  import { GameContext } from 'boardgame.io/core';

  export interface BoardProps<GameState, GameMoves> {
    G: GameState;
    ctx: GameContext;
    moves: GameMoves;
    gameID: string;
    playerID: string;
    isActive: boolean;
    isMultiplayer: boolean;
    isConnected: boolean;
  }

  interface ClientArgs {
    game: object;
    numPlayer?: number;
    board?: React.ComponentType<BoardProps<GameState>>;
    multiplayer?: boolean | { server: string } | { local: boolean };
    debug?: boolean;
  }

  export function Client(clientArgs: ClientArgs): React.ComponentType;
}
