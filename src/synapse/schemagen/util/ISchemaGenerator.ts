// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/util/ISchemaGenerator.java by the java2ts converter (see tools/java2ts).
import { FileType } from "./FileType.js";

export interface ISchemaGenerator {
  abstract getSchemaResourcePath(filePath: string, type: FileType, delimiter: string): string;

  abstract getSchemaContent(fileText: string, type: FileType, delimiter: string): string;
}
