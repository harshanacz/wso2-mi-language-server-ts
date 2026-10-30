// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/ArtifactFileScanner.java by the java2ts converter (see tools/java2ts).
import { Path } from "../host/nio.js";
import { Pattern } from "../host/regex.js";
import { JFile } from "../host/JFile.js";

export class ArtifactFileScanner {
  static readonly __fields: string[] = [];

  static scanArtifactFiles(projectPath: string): string[];
  static scanArtifactFiles(projectPath: string, needFilePath: boolean): string[];
  static scanArtifactFiles(...args: any[]): any {
    switch (args.length) {
      case 1: {
        const [projectPath] = args;


                return ArtifactFileScanner.scanArtifactFiles(projectPath, false);

        break;
      }
      case 2: {
        const [projectPath, needFilePath] = args;


                let artifactFiles = [];
                if (projectPath != null) {
                    let artifactPath = String(Path.of(projectPath, "src", "main", "wso2mi", "artifacts"));
                    ArtifactFileScanner.traverseFiles(artifactPath, artifactFiles, needFilePath);
                }
                return artifactFiles;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  static traverseFiles(projectPath: string, artifactFiles: string[], needFilePath: boolean): void {
    let folder = new JFile(projectPath);
    let listOfFiles = folder.listFiles();
    if (listOfFiles != null) {
        for (let file of listOfFiles) {
            if (file.isFile() && !file.isHidden()) {
                if (needFilePath) {
                    artifactFiles.push(file.getAbsolutePath());
                } else {
                    let artifactFilePath = ArtifactFileScanner.extractArtifactFile(file);
                    artifactFiles.push(artifactFilePath);
                }
            } else if (file.isDirectory()) {
                ArtifactFileScanner.traverseFiles(file.getAbsolutePath(), artifactFiles, needFilePath);
            }
        }
    }

  }

  static extractArtifactFile(file: JFile): string {
    let artifactFilePath = file.getAbsolutePath();
    let pattern = Pattern.compile(".*" + Pattern.quote(JFile.separator) + "(.*)\\.(xml|dbs)");
    let matcher = pattern.matcher(artifactFilePath);
    if (matcher.find()) {
        artifactFilePath = matcher.group(1);
    } else {
        artifactFilePath = null;
    }
    return artifactFilePath;

  }
}
