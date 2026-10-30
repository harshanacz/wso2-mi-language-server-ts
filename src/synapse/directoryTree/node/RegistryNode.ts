// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/node/RegistryNode.java by the java2ts converter (see tools/java2ts).
import { Node } from "./Node.js";

export class RegistryNode extends Node {
  static readonly __fields: string[] = ["isRegistryResource", "registryPath"];

  isRegistryResource: boolean = true;

  registryPath?: string;

  constructor(node: Node, registryPath: string) {
    super(node.getType(), node.getName(), node.getPath());
    this.subType = node.getSubType();
    this.registryPath = registryPath;

  }

  getRegistryPath(): string {
    return this.registryPath;

  }

  setRegistryPath(registryPath: string): void {
    this.registryPath = registryPath;

  }
}
