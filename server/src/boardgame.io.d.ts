declare module 'boardgame.io/server' {
  export type RunningServer = import('http').Server;

  export interface RunningServers {
    appServer: RunningServer;
    apiServer?: RunningServer;
  }

  export interface ServerReturn {
    app: import('koa');
    db: {
      listMatches: () => string[];
      wipe: (matchID: string) => void;
    };
    run(portOrConfig: number | string | { port?: number | string }): Promise<RunningServers>;
    kill(servers: RunningServers): void;
  }

  export interface ServerConfig {
    games: unknown[];
    origins?: true | string | string[] | ((origin: string) => boolean);
  }

  export function Server(config: ServerConfig): ServerReturn;
}
