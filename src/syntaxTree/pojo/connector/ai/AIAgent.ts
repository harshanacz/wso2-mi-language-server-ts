// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/connector/ai/AIAgent.java by the java2ts converter (see tools/java2ts).
import { AIConnector } from "./AIConnector.js";
import { AgentTools } from "./AgentTools.js";
import { MCPConnections } from "./MCPConnections.js";

export class AIAgent extends AIConnector {
  agentID?: string;

  mcpConnections?: MCPConnections;

  tools?: AgentTools;

  getAgentID(): string {
    return this.agentID;

  }

  setAgentID(agentID: string): void {
    this.agentID = agentID;

  }

  getTools(): AgentTools {
    return this.tools;

  }

  setTools(tools: AgentTools): void {
    this.tools = tools;

  }

  getMcpConnections(): MCPConnections {
    return this.mcpConnections;

  }

  setMcpConnections(mcpConnections: MCPConnections): void {
    this.mcpConnections = mcpConnections;

  }
}
