// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl20/BindingOperationType.java by the java2ts converter (see tools/java2ts).
import { ExtensibleDocumentedType } from "./ExtensibleDocumentedType.js";

export class BindingOperationType extends ExtensibleDocumentedType {
  static readonly __fields: string[] = ["otherAttributes", "inputOrOutputOrInfault", "ref"];

  otherAttributes?: any;

  inputOrOutputOrInfault?: any[];

  ref?: string;

  getOtherAttributes(): any {
    return this.otherAttributes;

  }

  setOtherAttributes(otherAttributes: any): void {
    this.otherAttributes = otherAttributes;

  }

  getInputOrOutputOrInfault(): any[] {
    return this.inputOrOutputOrInfault;

  }

  setInputOrOutputOrInfault(inputOrOutputOrInfault: any[]): void {
    this.inputOrOutputOrInfault = inputOrOutputOrInfault;

  }

  getRef(): string {
    return this.ref;

  }

  setRef(ref: string): void {
    this.ref = ref;

  }
}
