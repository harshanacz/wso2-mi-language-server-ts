// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/LocalEntry.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../stNode.js";

export class LocalEntry extends STNode {
  static readonly __fields: string[] = ["content", "key", "src", "subType"];

  content?: string;

  key?: string;

  src?: string;

  subType?: string;

  getContent(): string {
    return this.content;

  }

  setContent(content: string): void {
    this.content = content;

  }

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }

  getSrc(): string {
    return this.src;

  }

  setSrc(src: string): void {
    this.src = src;

  }

  getSubType(): string {
    return this.subType;

  }

  setSubType(subType: string): void {
    this.subType = subType;

  }
}
