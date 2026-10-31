// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/pojo/MCPToolRequest.java by the java2ts converter (see tools/java2ts).
import { Range } from "../../lsp.js";

export class MCPToolRequest {
  static readonly __fields: string[] = ["documentUri", "range", "connectionName"];

  documentUri?: string;

  range?: Range;

  connectionName?: string;
}
