// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/TestRegistryResource.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class TestRegistryResource extends STNode {
  static readonly __fields: string[] = ["fileName", "artifact", "registryPath", "mediaType"];

  fileName?: STNode;

  artifact?: STNode;

  registryPath?: STNode;

  mediaType?: STNode;

  getFileName(): STNode {
    return this.fileName;

  }

  setFileName(fileName: STNode): void {
    this.fileName = fileName;

  }

  getArtifact(): STNode {
    return this.artifact;

  }

  setArtifact(artifact: STNode): void {
    this.artifact = artifact;

  }

  getRegistryPath(): STNode {
    return this.registryPath;

  }

  setRegistryPath(registryPath: STNode): void {
    this.registryPath = registryPath;

  }

  getMediaType(): STNode {
    return this.mediaType;

  }

  setMediaType(mediaType: STNode): void {
    this.mediaType = mediaType;

  }
}
