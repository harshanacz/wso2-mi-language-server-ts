// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/node/FolderNode.java by the java2ts converter (see tools/java2ts).
import { FileNode } from "./FileNode.js";
import { JFile } from "../../host/JFile.js";

export class FolderNode {
  static readonly __fields: string[] = ["name", "path", "files", "folders"];

  name?: string;

  path?: string;

  files?: FileNode[];

  folders?: FolderNode[];

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
    this.files = [];
    this.folders = [];

  }

  listFiles(): JFile[] {
    let file = new JFile(this.path);
    let files = file.listFiles();
    files.sort((f1, f2) => {
        if (f1.isDirectory() && !f2.isDirectory()) {
            return -1;
        } else if (!f1.isDirectory() && f2.isDirectory()) {
            return 1;
        } else {
            return f1.getName() < f2.getName() ? -1 : f1.getName() > f2.getName() ? 1 : 0;
        }
    });
    return files;

  }

  addFile(fileNode: FileNode): void {
    this.files.push(fileNode);

  }

  addFolder(folderNode: FolderNode): void {
    this.folders.push(folderNode);

  }

  getName(): string {
    return this.name;

  }

  getPath(): string {
    return this.path;

  }

  getFiles(): FileNode[] {
    return this.files;

  }

  getFolders(): FolderNode[] {
    return this.folders;

  }
}
