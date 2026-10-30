// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/pojo/ArtifactResource.java by the java2ts converter (see tools/java2ts).
import { Resource } from "./Resource.js";

export class ArtifactResource extends Resource {
  static readonly __fields: string[] = ["artifactPath", "absolutePath", "_isLocalEntry"];

  artifactPath?: string;

  absolutePath?: string;

  _isLocalEntry: boolean = false;

  getArtifactPath(): string {
    return this.artifactPath;

  }

  setArtifactPath(artifactPath: string): void {
    this.artifactPath = artifactPath;

  }

  getAbsolutePath(): string {
    return this.absolutePath;

  }

  setAbsolutePath(absolutePath: string): void {
    this.absolutePath = absolutePath;

  }

  isLocalEntry(): boolean {
    return this._isLocalEntry;

  }

  setLocalEntry(localEntry: boolean): void {
    this._isLocalEntry = localEntry;

  }
}
