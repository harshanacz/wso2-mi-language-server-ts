// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/call/CallSource.java by the java2ts converter (see tools/java2ts).
import { CallSourceType } from "./CallSourceType.js";
import { STNode } from "../../../../stNode.js";

export class CallSource extends STNode {
  content?: any;

  contentType?: string;

  type?: CallSourceType;

  getContent(): any {
    return this.content;

  }

  setContent(content: any): void {
    this.content = content;

  }

  getContentType(): string {
    return this.contentType;

  }

  setContentType(contentType: string): void {
    this.contentType = contentType;

  }

  getType(): CallSourceType {
    return this.type;

  }

  setType(type: CallSourceType): void {
    this.type = type;

  }
}
