// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl20/InterfaceType.java by the java2ts converter (see tools/java2ts).
import { ExtensibleDocumentedType } from "./ExtensibleDocumentedType.js";

export class InterfaceType extends ExtensibleDocumentedType {
  otherAttributes?: any;

  operationOrFaultOrAny?: any[];

  name?: string;

  _extends?: any;

  styleDefault?: any;

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

  get_extends(): any {
    return this._extends;

  }

  set_extends(_extends: any): void {
    this._extends = _extends;

  }

  getStyleDefault(): any {
    return this.styleDefault;

  }

  setStyleDefault(styleDefault: any): void {
    this.styleDefault = styleDefault;

  }
}
