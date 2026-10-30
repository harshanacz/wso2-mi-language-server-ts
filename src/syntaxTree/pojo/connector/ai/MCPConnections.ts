// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/connector/ai/MCPConnections.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class MCPConnections extends STNode {
  static readonly __fields: string[] = ["mcpConnections"];

  mcpConnections?: string[];

  constructor() {
    super();
    this.mcpConnections = [];

  }

  getMcpConnections(): string[] {
    return this.mcpConnections;

  }

  setMcpConnections(mcpConnections: string[]): void {
    this.mcpConnections = mcpConnections;

  }

  addMcpConnection(mcpConnection: string): void {
    this.mcpConnections.push(mcpConnection);

  }
}
