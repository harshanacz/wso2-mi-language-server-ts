// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/common/EndpointParameter.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class EndpointParameter extends STNode {
  static readonly __fields: string[] = ["name", "value", "paramNamespacePrefix"];

  name?: string;

  value?: string;

  paramNamespacePrefix?: string;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  getParamNamespacePrefix(): string {
    return this.paramNamespacePrefix;

  }

  setParamNamespacePrefix(paramNamespacePrefix: string): void {
    this.paramNamespacePrefix = paramNamespacePrefix;

  }
}
