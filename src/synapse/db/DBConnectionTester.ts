import type { Connection } from "../host/sql.js";

export type ConnectionFactory = (url: string, username: string, password: string, className: string, driverPath?: string) => Connection | null;

/**
 * Hands out database connections. Java loads a JDBC driver jar here; this port has no drivers, so the host
 * registers a factory (or none, in which case no connection can be made and null is returned, as for a failed connect).
 */
export class DBConnectionTester {
  private static factory: ConnectionFactory | null = null;

  static setConnectionFactory(factory: ConnectionFactory | null): void {
    DBConnectionTester.factory = factory;
  }

  static getConnection(url: string, username: string, password: string, className: string, driverPath?: string): Connection | null {
    if (DBConnectionTester.factory === null) return null;
    try {
      return DBConnectionTester.factory(url, username, password, className, driverPath);
    } catch (e) {
      return null;
    }
  }
}
