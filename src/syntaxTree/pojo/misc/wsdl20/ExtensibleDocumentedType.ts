// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl20/ExtensibleDocumentedType.java by the java2ts converter (see tools/java2ts).
import { DocumentedType } from "./DocumentedType.js";

export class ExtensibleDocumentedType extends DocumentedType {
  static readonly __fields: string[] = ["otherAttributes"];

  otherAttributes?: any;

  getOtherAttributes(): any {
    return this.otherAttributes;

  }

  setOtherAttributes(otherAttributes: any): void {
    this.otherAttributes = otherAttributes;

  }
}
