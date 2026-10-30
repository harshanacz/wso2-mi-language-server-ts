// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl20/MessageRefFaultType.java by the java2ts converter (see tools/java2ts).
import { ExtensibleDocumentedType } from "./ExtensibleDocumentedType.js";

export class MessageRefFaultType extends ExtensibleDocumentedType {
  otherAttributes?: any;

  any?: any[];

  ref?: string;

  messageLabel?: string;

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

  getRef(): string {
    return this.ref;

  }

  setRef(ref: string): void {
    this.ref = ref;

  }

  getMessageLabel(): string {
    return this.messageLabel;

  }

  setMessageLabel(messageLabel: string): void {
    this.messageLabel = messageLabel;

  }
}
