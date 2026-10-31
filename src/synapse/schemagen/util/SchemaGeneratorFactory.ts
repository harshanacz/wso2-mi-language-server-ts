// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/util/SchemaGeneratorFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractSchemaGenerator } from "./AbstractSchemaGenerator.js";
import { FileType } from "./FileType.js";
import { ISchemaGenerator } from "./ISchemaGenerator.js";
import { SchemaGeneratorForCSV } from "./SchemaGeneratorForCSV.js";
import { SchemaGeneratorForJSON } from "./SchemaGeneratorForJSON.js";
import { SchemaGeneratorForXML } from "./SchemaGeneratorForXML.js";
import { SchemaGeneratorForXSD } from "./SchemaGeneratorForXSD.js";

export class SchemaGeneratorFactory {
  static readonly __fields: string[] = [];

  getSchemaGenerator(fileType: FileType): ISchemaGenerator {
    	switch(fileType) {
    	case FileType.JSONSCHEMA:
    		return new AbstractSchemaGenerator();
    	case FileType.XSD:
    		return new SchemaGeneratorForXSD();
    	case FileType.XML:
    		return new SchemaGeneratorForXML();
    	case FileType.JSON:
    		return new SchemaGeneratorForJSON();
    	case FileType.CSV:
    		return new SchemaGeneratorForCSV();

    }
    	return null;


  }
}
