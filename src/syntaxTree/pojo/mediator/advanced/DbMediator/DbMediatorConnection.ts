// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DbMediator/DbMediatorConnection.java by the java2ts converter (see tools/java2ts).
import { DbMediatorConnectionPool } from "./DbMediatorConnectionPool.js";
import { STNode } from "../../../../stNode.js";

export class DbMediatorConnection extends STNode {
  pool?: DbMediatorConnectionPool;

  getPool(): DbMediatorConnectionPool {
    return this.pool;

  }

  setPool(pool: DbMediatorConnectionPool): void {
    this.pool = pool;

  }
}
