// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/pojo/ResourceResponse.java by the java2ts converter (see tools/java2ts).
import { Resource } from "./Resource.js";

export class ResourceResponse {
  static readonly __fields: string[] = ["resources", "registryResources"];

  resources?: Resource[];

  registryResources?: Resource[];

  getResources(): Resource[] {
    return this.resources;

  }

  setResources(resources: Resource[]): void {
    this.resources = resources;

  }

  getRegistryResources(): Resource[] {
    return this.registryResources;

  }

  setRegistryResources(registryResources: Resource[]): void {
    this.registryResources = registryResources;

  }
}
