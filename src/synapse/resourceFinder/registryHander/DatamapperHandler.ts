// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/registryHander/DatamapperHandler.java by the java2ts converter (see tools/java2ts).
import { contains, matches, jreplace, replaceAll } from "../../../syntaxTree/javaCompat.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { NonXMLRegistryHandler } from "./NonXMLRegistryHandler.js";
import { Resource } from "../pojo/Resource.js";
import { JFile } from "../../host/JFile.js";

export class DatamapperHandler extends NonXMLRegistryHandler {
  static readonly __fields: string[] = [];

  static readonly datamapperPaths: string[] = [
            String(Constant.RESOURCE_RELATIVE_PATH.resolve(Constant.DATA_MAPPER)),
            String(Constant.RESOURCE_RELATIVE_PATH.resolve(Constant.REGISTRY).resolve(Constant.GOV)
                    .resolve(Constant.DATA_MAPPER))];

  constructor(resources: Resource[]) {
    super(resources);

  }

  canHandle(file: JFile): boolean {
    if (file.getAbsolutePath().endsWith(".ts")) {
        return this.isDatamapperFile(file.getAbsolutePath());
    }
    return false;

  }

  formatKey(key: string): string {
    return key != null ? replaceAll(key, "/[^/]*.ts$", "") : null;

  }

  isDatamapperFile(path: string): boolean {
    if (path == null) {
        return false;
    }
    for (let datamapperPath of DatamapperHandler.datamapperPaths) {
        if (contains(path, datamapperPath) && !DatamapperHandler.isDMUtilsFile(path)) {
            return true;
        }
    }
    return false;

  }

  static isDMUtilsFile(path: string): boolean {
    let normalized = jreplace(path, "\\", "/");
    let regex = ".*/datamapper/.*?/dm-utils\\.ts$";
    return matches(normalized, regex);

  }
}
