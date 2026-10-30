// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/node/Resource.java by the java2ts converter (see tools/java2ts).
import { FolderNode } from "./FolderNode.js";
import { Node } from "./Node.js";
import { RegistryResource } from "./RegistryResource.js";

export class Resource {
  static readonly __fields: string[] = ["registry", "connectors", "metadata", "newResources"];

  registry?: RegistryResource;

  connectors?: Node[];

  metadata?: Node[];

  newResources?: FolderNode;

  constructor() {
    this.registry = new RegistryResource();
    this.connectors = [];
    this.metadata = [];

  }

  getNewResources(): FolderNode {
    return this.newResources;

  }

  setNewResources(newResources: FolderNode): void {
    this.newResources = newResources;

  }

  addConnector(connector: Node): void {
    this.connectors.push(connector);

  }

  addMetadata(meta: Node): void {
    this.metadata.push(meta);

  }

  getRegistry(): RegistryResource {
    return this.registry;

  }
}
