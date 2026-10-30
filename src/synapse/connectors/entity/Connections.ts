// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/entity/Connections.java by the java2ts converter (see tools/java2ts).
import { Connection } from "./Connection.js";

export class Connections {
  static readonly __fields: string[] = ["connections"];

  connections?: Connection[];

  constructor() {
    this.connections = [];

  }

  addConnection(connection: Connection): void {
    this.connections.push(connection);

  }

  getConnections(): Connection[] {
    return this.connections;

  }
}
