// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/common/EndpointTimeout.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class EndpointTimeout extends STNode {
  static readonly __fields: string[] = ["duration", "responseAction", "content"];

  duration?: STNode;

  responseAction?: STNode;

  content?: any[];

  getContent(): any[] {
    return this.content;

  }

  setContent(content: any[]): void {
    this.content = content;

  }

  getDuration(): STNode {
    return this.duration;

  }

  setDuration(duration: STNode): void {
    this.duration = duration;

  }

  getResponseAction(): STNode {
    return this.responseAction;

  }

  setResponseAction(responseAction: STNode): void {
    this.responseAction = responseAction;

  }
}
