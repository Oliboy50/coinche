declare module 'boardgame.io/server' {
  export interface ServerConfig {
    games: any[];
    db?: { connect(): Promise<void> };
    transport?: { init(app: any, games: any[]): void };
  }

  export function Server(server: ServerConfig): {
    app: any,
    db: any,
    run(portOrConfig: any, callback?: () => any): Promise<{ appServer: { close(): void }; apiServer?: { close(): void } }>,
    kill(servers: { appServer: { close(): void }; apiServer?: { close(): void } }): void,
  };
}
