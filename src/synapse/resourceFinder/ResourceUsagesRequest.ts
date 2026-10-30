// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/ResourceUsagesRequest.java by the java2ts converter (see tools/java2ts).

export class ResourceUsagesRequest {
  static readonly __fields: string[] = ["resourceFilePath"];

  resourceFilePath?: string;

  constructor(resourceFilePath: string) {
    this.resourceFilePath = resourceFilePath;

  }

  getResourceFilePath(): string {
    return this.resourceFilePath;

  }
}
