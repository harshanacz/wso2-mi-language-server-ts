// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/util/SchemaGeneratorForJSON.java by the java2ts converter (see tools/java2ts).
import { AbstractSchemaGenerator } from "./AbstractSchemaGenerator.js";
import { FileType } from "./FileType.js";
import { FileUtils } from "../../host/commonsIo.js";
import { SchemaBuilderWithNamepaces } from "./SchemaBuilderWithNamepaces.js";
import { JFile } from "../../host/JFile.js";

export class SchemaGeneratorForJSON extends AbstractSchemaGenerator {
  static readonly __fields: string[] = [];

  getSchemaResourcePath(filePath: string, type: FileType, delimiter: string): string {
    let entireFileText = FileUtils.readFileToString(new JFile(filePath));
    return  this.getSchemaContent(entireFileText, type, null);

  }

  getSchemaContent(fileText: string, type: FileType, delimiter: string): string {
    let sb = new SchemaBuilderWithNamepaces();
    let jsonSchema = sb.createSchema(fileText, type);
    return  jsonSchema;

  }
}
