/* eslint-disable @typescript-eslint/no-explicit-any */

declare module 'boardgame.io/server' {
  import Application = require('koa');

  export interface AppServer {
    close(): void;
  }

  export interface ApiServer {
    close(): void;
  }

  export interface ServerConfig {
    games: any[];
    db?: { connect(): Promise<void> };
    transport?: { init(app: any, games: any[]): void };
  }

  export function Server(server: ServerConfig): {
    app: Application;
    db: any;
    run(portOrConfig: any, callback?: () => any): Promise<{ appServer: AppServer; apiServer?: ApiServer }>;
    kill(servers: { appServer: AppServer; apiServer?: ApiServer }): void;
  };
}
