// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/pojo/RegistryResource.java by the java2ts converter (see tools/java2ts).
import { Resource } from "./Resource.js";

export class RegistryResource extends Resource {
  static readonly __fields: string[] = ["registryPath", "registryKey"];

  registryPath?: string;

  registryKey?: string;

  getRegistryPath(): string {
    return this.registryPath;

  }

  setRegistryPath(registryPath: string): void {
    this.registryPath = registryPath;

  }

  getRegistryKey(): string {
    return this.registryKey;

  }

  setRegistryKey(registryKey: string): void {
    this.registryKey = registryKey;

  }
}
