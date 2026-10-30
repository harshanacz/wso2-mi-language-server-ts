// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl11/TPart.java by the java2ts converter (see tools/java2ts).
import { TExtensibleAttributesDocumented } from "./TExtensibleAttributesDocumented.js";

export class TPart extends TExtensibleAttributesDocumented {
  name?: string;

  element?: string;

  type?: string;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getElement(): string {
    return this.element;

  }

  setElement(element: string): void {
    this.element = element;

  }

  getType(): string {
    return this.type;

  }

  setType(type: string): void {
    this.type = type;

  }
}
