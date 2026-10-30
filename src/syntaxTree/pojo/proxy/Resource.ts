// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/proxy/Resource.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class Resource extends STNode {
  location?: string;

  key?: string;

  getLocation(): string {
    return this.location;

  }

  setLocation(location: string): void {
    this.location = location;

  }

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }
}
