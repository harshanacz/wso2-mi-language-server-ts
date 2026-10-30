// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl20/EndpointType.java by the java2ts converter (see tools/java2ts).
import { ExtensibleDocumentedType } from "./ExtensibleDocumentedType.js";

export class EndpointType extends ExtensibleDocumentedType {
  otherAttributes?: any;

  any?: any[];

  name?: string;

  binding?: string;

  address?: string;

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

  getBinding(): string {
    return this.binding;

  }

  setBinding(binding: string): void {
    this.binding = binding;

  }

  getAddress(): string {
    return this.address;

  }

  setAddress(address: string): void {
    this.address = address;

  }
}
