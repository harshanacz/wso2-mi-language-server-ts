// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl20/BindingType.java by the java2ts converter (see tools/java2ts).
import { ExtensibleDocumentedType } from "./ExtensibleDocumentedType.js";

export class BindingType extends ExtensibleDocumentedType {
  otherAttributes?: any;

  operationOrFaultOrAny?: any[];

  name?: string;

  type?: string;

  _interface?: string;

  getOtherAttributes(): any {
    return this.otherAttributes;

  }

  setOtherAttributes(otherAttributes: any): void {
    this.otherAttributes = otherAttributes;

  }

  getOperationOrFaultOrAny(): any[] {
    return this.operationOrFaultOrAny;

  }

  setOperationOrFaultOrAny(operationOrFaultOrAny: any[]): void {
    this.operationOrFaultOrAny = operationOrFaultOrAny;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getType(): string {
    return this.type;

  }

  setType(type: string): void {
    this.type = type;

  }

  get_interface(): string {
    return this._interface;

  }

  set_interface(_interface: string): void {
    this._interface = _interface;

  }
}
