// @ts-nocheck
import { Connection } from "../../../connectorDeps.js";
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/connector/ai/AIConnector.java by the java2ts converter (see tools/java2ts).
import { Connector } from "../Connector.js";

export abstract class AIConnector extends Connector {
  connections?: Map<string, Connection>;

  constructor() {
    super();
    this.connections = new Map();

  }

  getConnections(): Map<string, Connection> {
    return this.connections;

  }

  addConnection(name: string, connection: Connection): void {
    this.connections.set(name, connection);

  }
}
