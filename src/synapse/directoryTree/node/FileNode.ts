// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/node/FileNode.java by the java2ts converter (see tools/java2ts).

export class FileNode {
  static readonly __fields: string[] = ["name", "path"];

  name?: string;

  path?: string;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;

  }

  getName(): string {
    return this.name;

  }

  getPath(): string {
    return this.path;

  }
}
