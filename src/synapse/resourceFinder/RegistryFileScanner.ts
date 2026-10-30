// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/RegistryFileScanner.java by the java2ts converter (see tools/java2ts).
import { equals, contains, jreplace, replaceAll } from "../../syntaxTree/javaCompat.js";
import { Path } from "../host/nio.js";
import { Pattern } from "../host/regex.js";
import { JFile } from "../host/JFile.js";

export class RegistryFileScanner {
  static readonly __fields: string[] = [];

  static scanRegistryFiles(path: string): string[] {
    let registryPath = RegistryFileScanner.getRegistryPath(path);
    let folder = new JFile(registryPath);
    let listOfFiles = folder.listFiles();
    let registryFiles = [];
    if (listOfFiles != null) {
        RegistryFileScanner.traverseFiles(listOfFiles, registryFiles);
    }
    return registryFiles;

  }

  static traverseFiles(listOfFiles: JFile[], registryFiles: string[]): void {
    for (let file of listOfFiles) {
        if (file.isFile() && !file.isHidden()) {
            let regFilePath = RegistryFileScanner.extractRegistryFilePath(file);
            if (contains(regFilePath, "gov") || contains(regFilePath, "conf")) {
                registryFiles.push(regFilePath);
            }
        } else if (file.isDirectory()) {
            if (!equals(".meta", file.getName())) {
                RegistryFileScanner.traverseFiles(file.listFiles(), registryFiles);
            }
        }
    }

  }

  static extractRegistryFilePath(file: JFile): string {
    let path = file.getAbsolutePath();
    let regFolderPath = String(Path.of("src", "main", "wso2mi", "resources", "registry"));
    regFolderPath = jreplace(regFolderPath, JFile.separator, Pattern.quote(JFile.separator));
    let pattern = Pattern.compile(regFolderPath + Pattern.quote(JFile.separator) + "(.*)");
    let matcher = pattern.matcher(path);
    if (matcher.find()) {
        return replaceAll(matcher.group(1), "\\\\", "/");
    }
    return "";

  }

  static getRegistryPath(projectPath: string): string {
    if (projectPath != null) {
        let registryPath = Path.of(projectPath, "src", "main", "wso2mi", "resources", "registry");
        return String(registryPath);
    }
    return "";

  }
}
