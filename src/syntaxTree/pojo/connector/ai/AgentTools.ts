// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/connector/ai/AgentTools.java by the java2ts converter (see tools/java2ts).
import { AgentTool } from "./AgentTool.js";
import { STNode } from "../../../stNode.js";

export class AgentTools extends STNode {
  static readonly __fields: string[] = ["tools"];

  tools?: AgentTool[];

  constructor() {
    super();
    this.tools = [];

  }

  getTools(): AgentTool[] {
    return this.tools;

  }

  setTools(tools: AgentTool[]): void {
    this.tools = tools;

  }

  addTool(tool: AgentTool): void {
    this.tools.push(tool);

  }
}
