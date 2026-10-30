// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/common/Parameter.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class Parameter extends STNode {
  otherAttributes?: any;

  content?: string;

  name?: string;

  key?: string;

  locked: boolean = false;

  getOtherAttributes(): any {
    return this.otherAttributes;

  }

  setOtherAttributes(otherAttributes: any): void {
    this.otherAttributes = otherAttributes;

  }

  getContent(): string {
    return this.content;

  }

  setContent(content: string): void {
    this.content = content;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }

  isLocked(): boolean {
    return this.locked;

  }

  setLocked(locked: boolean): void {
    this.locked = locked;

  }
}
