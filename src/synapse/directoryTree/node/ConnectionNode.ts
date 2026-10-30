// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/node/ConnectionNode.java by the java2ts converter (see tools/java2ts).
import { Constant } from "../../../syntaxTree/constant.js";
import { Node } from "./Node.js";

export class ConnectionNode extends Node {
  static readonly __fields: string[] = ["connectorName", "connectionType"];

  connectorName?: string;

  connectionType?: string;

  constructor(name: string, path: string, connectorName: string, connectionType: string) {
    super(Constant.LOCAL_ENTRY, name, path);
    this.connectorName = connectorName;
    this.connectionType = connectionType;

  }
}
