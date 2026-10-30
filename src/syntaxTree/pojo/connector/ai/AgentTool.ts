// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/connector/ai/AgentTool.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../mediator/Mediator.js";
import { STNode } from "../../../stNode.js";

export class AgentTool extends STNode {
  name?: string;

  template?: string;

  description?: string;

  resultExpression?: string;

  mediator?: Mediator;

  templatePath?: string;

  mcpConnection?: string;

  isMcpTool: boolean = false;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getTemplate(): string {
    return this.template;

  }

  setTemplate(template: string): void {
    this.template = template;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getMediator(): Mediator {
    return this.mediator;

  }

  setMediator(mediator: Mediator): void {
    this.mediator = mediator;

  }

  getTemplatePath(): string {
    return this.templatePath;

  }

  setTemplatePath(templatePath: string): void {
    this.templatePath = templatePath;

  }

  getResultExpression(): string {
    return this.resultExpression;

  }

  setResultExpression(resultExpression: string): void {
    this.resultExpression = resultExpression;

  }

  setMcpConnection(mcpConnection: string): void {
    this.mcpConnection = mcpConnection;

  }

  getMcpConnection(): string {
    return this.mcpConnection;

  }

  getIsMcpTool(): boolean {
    return this.isMcpTool;

  }

  setMcpTool(mcpTool: boolean): void {
    this.isMcpTool = mcpTool;

  }
}
