// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/Registry.java by the java2ts converter (see tools/java2ts).
import { Parameter } from "./misc/common/Parameter.js";
import { STNode } from "../stNode.js";

export class Registry extends STNode {
  static readonly __fields: string[] = ["parameter", "provider"];

  parameter?: Parameter[];

  provider?: string;

  getParameter(): Parameter[] {
    return this.parameter;

  }

  setParameter(parameter: Parameter[]): void {
    this.parameter = parameter;

  }

  getProvider(): string {
    return this.provider;

  }

  setProvider(provider: string): void {
    this.provider = provider;

  }
}
