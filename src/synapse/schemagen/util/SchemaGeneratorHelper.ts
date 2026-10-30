// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/util/SchemaGeneratorHelper.java by the java2ts converter (see tools/java2ts).
import { FileType } from "./FileType.js";
import { SchemaGeneratorFactory } from "./SchemaGeneratorFactory.js";

export class SchemaGeneratorHelper {
  static readonly __fields: string[] = [];

  getSchemaContent(option: FileType, filePath: string, delimiter: string): string {
    let schemaGenFactory = new SchemaGeneratorFactory();
    let schemaGenerator = schemaGenFactory.getSchemaGenerator(option);

    try {
    	return schemaGenerator.getSchemaResourcePath(filePath, option, delimiter);
    } catch (e) {

    }

    return null;

  }

  getSchemaFromContent(option: FileType, fileContent: string, delimiter: string): string {
    let schemaGenFactory = new SchemaGeneratorFactory();
    let schemaGenerator = schemaGenFactory.getSchemaGenerator(option);

    try {
    	return schemaGenerator.getSchemaContent(fileContent, option, delimiter);
    } catch (e) {

    }

    return null;

  }
}
