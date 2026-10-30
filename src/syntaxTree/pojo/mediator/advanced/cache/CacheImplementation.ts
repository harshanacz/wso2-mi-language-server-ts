// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/cache/CacheImplementation.java by the java2ts converter (see tools/java2ts).
import { CacheImplementationType } from "./CacheImplementationType.js";
import { STNode } from "../../../../stNode.js";

export class CacheImplementation extends STNode {
  static readonly __fields: string[] = ["maxSize", "type"];

  maxSize: number = 0;

  type?: CacheImplementationType;

  getMaxSize(): number {
    return this.maxSize;

  }

  setMaxSize(maxSize: number): void {
    this.maxSize = maxSize;

  }

  getType(): CacheImplementationType {
    return this.type;

  }

  setType(type: CacheImplementationType): void {
    this.type = type;

  }
}
