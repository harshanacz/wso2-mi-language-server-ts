// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/node/RegistryResource.java by the java2ts converter (see tools/java2ts).
import { FolderNode } from "./FolderNode.js";

export class RegistryResource {
  static readonly __fields: string[] = ["conf", "gov"];

  conf?: FolderNode;

  gov?: FolderNode;

  getConf(): FolderNode {
    return this.conf;

  }

  setConf(conf: FolderNode): void {
    this.conf = conf;

  }

  getGov(): FolderNode {
    return this.gov;

  }

  setGov(gov: FolderNode): void {
    this.gov = gov;

  }
}
