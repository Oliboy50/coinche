/* eslint-disable @typescript-eslint/no-explicit-any */

declare module 'boardgame.io/server' {
  export interface RunningServer {
    close(): void;
  }

  export interface RunningServers {
    appServer: RunningServer;
    apiServer?: RunningServer;
  }

  export interface ServerReturn {
    app: import('koa');
    db: import('boardgame.io/dist/types/src/server/db').InMemory;
    run(portOrConfig: any): Promise<RunningServers>;
    kill(servers: RunningServers): void;
  }

  export interface ServerConfig {
    games: any[];
  }

  export function Server(config: ServerConfig): ServerReturn;
}
