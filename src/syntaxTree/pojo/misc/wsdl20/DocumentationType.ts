// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl20/DocumentationType.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class DocumentationType extends STNode {
  static readonly __fields: string[] = ["otherAttributes", "content"];

  otherAttributes?: any;

  content?: any[];

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
}
