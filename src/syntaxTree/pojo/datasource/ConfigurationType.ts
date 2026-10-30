// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/datasource/ConfigurationType.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class ConfigurationType extends STNode {
  static readonly __fields: string[] = ["content"];

  content?: any[];

  getContent(): any[] {
    return this.content;

  }

  setContent(content: any[]): void {
    this.content = content;

  }
}
