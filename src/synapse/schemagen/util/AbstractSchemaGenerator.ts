// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/util/AbstractSchemaGenerator.java by the java2ts converter (see tools/java2ts).
import { FileType } from "./FileType.js";
import { FileUtils } from "../../host/commonsIo.js";
import { JFile } from "../../host/JFile.js";

export class AbstractSchemaGenerator {
  static readonly __fields: string[] = [];

  getSchemaResourcePath(filePath: string, type: FileType, delimiter: string): string {
    let entireFileText = FileUtils.readFileToString(new JFile(filePath));


    return entireFileText;

  }

  getSchemaContent(fileText: string, type: FileType, delimiter: string): string {

    return fileText;

  }
}
