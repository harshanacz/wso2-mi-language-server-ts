// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/ResourceFileScanner.java by the java2ts converter (see tools/java2ts).
import { equals, jreplace, replaceAll } from "../../syntaxTree/javaCompat.js";
import { Constant } from "../../syntaxTree/constant.js";
import { Path } from "../host/nio.js";
import { Pattern } from "../host/regex.js";
import { JFile } from "../host/JFile.js";

export class ResourceFileScanner {
  static readonly __fields: string[] = [];

  static scanResourceFiles(path: string): string[] {
    let resourcePath = ResourceFileScanner.getResourcePath(path);
    let folder = new JFile(resourcePath);
    let listOfFiles = folder.listFiles();
    let resourceFiles = [];
    if (listOfFiles != null) {
        ResourceFileScanner.traverseFiles(listOfFiles, resourceFiles);
    }
    return resourceFiles;

  }

  static traverseFiles(listOfFiles: JFile[], resourceFiles: string[]): void {
    for (let file of listOfFiles) {
        if (file.isFile() && !file.isHidden()) {
            let resourceFilePath = ResourceFileScanner.extractResourceFilePath(file);
            if (!ResourceFileScanner.isDedicatedArtifactXMLFile(resourceFilePath)) {
                resourceFiles.push(Constant.RESOURCES + ":" + resourceFilePath);
            }
        } else if (file.isDirectory()) {
            if (!equals(".meta", file.getName())) {
                ResourceFileScanner.traverseFiles(file.listFiles(), resourceFiles);
            }
        }
    }

  }

  static isDedicatedArtifactXMLFile(resourceFilePath: string): boolean {

    return equals(resourceFilePath, "registry/artifact.xml") || equals(resourceFilePath, "artifact.xml");

  }

  static extractResourceFilePath(file: JFile): string {
    let path = file.getAbsolutePath();
    let resourceFolderPath = String(Path.of("src", "main", "wso2mi", "resources"));
    resourceFolderPath = jreplace(resourceFolderPath, JFile.separator, Pattern.quote(JFile.separator));
    let pattern = Pattern.compile(resourceFolderPath + Pattern.quote(JFile.separator) + "(.*)");
    let matcher = pattern.matcher(path);
    if (matcher.find()) {
        return replaceAll(matcher.group(1), "\\\\", "/");
    }
    return "";

  }

  static getResourcePath(projectPath: string): string {
    if (projectPath != null) {
        let resourcePath = Path.of(projectPath, "src", "main", "wso2mi", "resources");
        return String(resourcePath);
    }
    return "";

  }
}
