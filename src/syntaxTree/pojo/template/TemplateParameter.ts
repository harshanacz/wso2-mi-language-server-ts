// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/template/TemplateParameter.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class TemplateParameter extends STNode {
  static readonly __fields: string[] = ["otherAttributes", "content", "name", "isMandatory", "defaultValue", "paramNamespacePrefix", "description"];

  otherAttributes?: any;

  content?: any[];

  name?: string;

  isMandatory: boolean = false;

  defaultValue?: string;

  paramNamespacePrefix?: string;

  description?: string;

  getOtherAttributes(): any {
    return this.otherAttributes;

  }

  setOtherAttributes(otherAttributes: any): void {
    this.otherAttributes = otherAttributes;

  }

  getContent(): any[] {
    return this.content;

  }

  setContent(content: any[]): void {
    this.content = content;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getIsMandatory(): boolean {
    return this.isMandatory;

  }

  setMandatory(mandatory: boolean): void {
    this.isMandatory = mandatory;

  }

  getDefaultValue(): string {
    return this.defaultValue;

  }

  setDefaultValue(defaultValue: string): void {
    this.defaultValue = defaultValue;

  }

  getParamNamespacePrefix(): string {
    return this.paramNamespacePrefix;

  }

  setParamNamespacePrefix(paramNamespacePrefix: string): void {
    this.paramNamespacePrefix = paramNamespacePrefix;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }
}
