// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/DistributionDirectoryTree.java by the java2ts converter (see tools/java2ts).
import { FileNode } from "./node/FileNode.js";
import { FolderNode } from "./node/FolderNode.js";

export class DistributionDirectoryTree {
  static readonly __fields: string[] = ["projectPath", "projectType", "files", "folders"];

  projectPath?: string;

  projectType?: string;

  files?: FileNode[];

  folders?: FolderNode[];

  constructor(projectPath: string, projectType: string) {
    this.files = [];
    this.folders = [];

    this.projectPath = projectPath;
    this.projectType = projectType;

  }

  setFiles(files: FileNode[]): void {
    this.files = files;

  }

  setFolders(folders: FolderNode[]): void {
    this.folders = folders;

  }

  setProject(project: FolderNode): void {

  }
}
