// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl20/MessageRefType.java by the java2ts converter (see tools/java2ts).
import { ExtensibleDocumentedType } from "./ExtensibleDocumentedType.js";

export class MessageRefType extends ExtensibleDocumentedType {
  static readonly __fields: string[] = ["otherAttributes", "any", "messageLabel", "element"];

  otherAttributes?: any;

  any?: any[];

  messageLabel?: string;

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

  getMessageLabel(): string {
    return this.messageLabel;

  }

  setMessageLabel(messageLabel: string): void {
    this.messageLabel = messageLabel;

  }

  getElement(): string {
    return this.element;

  }

  setElement(element: string): void {
    this.element = element;

  }
}
