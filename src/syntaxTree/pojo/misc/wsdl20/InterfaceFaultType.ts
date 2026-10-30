// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl20/InterfaceFaultType.java by the java2ts converter (see tools/java2ts).
import { ExtensibleDocumentedType } from "./ExtensibleDocumentedType.js";

export class InterfaceFaultType extends ExtensibleDocumentedType {
  static readonly __fields: string[] = ["otherAttributes", "any", "name", "element"];

  otherAttributes?: any;

  any?: any[];

  name?: string;

  element?: string;

  getOtherAttributes(): any {
    return this.otherAttributes;

  }

  setOtherAttributes(otherAttributes: any): void {
    this.otherAttributes = otherAttributes;

  }

  getAny(): any[] {
    return this.any;

  }

  setAny(any: any[]): void {
    this.any = any;

  }

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
}
