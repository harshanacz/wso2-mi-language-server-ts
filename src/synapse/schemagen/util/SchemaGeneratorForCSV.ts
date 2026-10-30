// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/util/SchemaGeneratorForCSV.java by the java2ts converter (see tools/java2ts).
import { isEmpty } from "../../../syntaxTree/javaCompat.js";
import { AbstractSchemaGenerator } from "./AbstractSchemaGenerator.js";
import { CsvMapper, CsvSchema } from "../../jacksonCsv.js";
import { ObjectMapper } from "../../jackson.js";
import { FileType } from "./FileType.js";
import { FileUtils } from "../../host/commonsIo.js";
import { SchemaBuilderWithNamepaces } from "./SchemaBuilderWithNamepaces.js";
import { JFile } from "../../host/JFile.js";

export class SchemaGeneratorForCSV extends AbstractSchemaGenerator {
  static readonly __fields: string[] = [];

  getSchemaResourcePath(filePath: string, type: FileType, delimiter: string): string {
    let entireFileText = FileUtils.readFileToString(new JFile(filePath));
    return this.getSchemaContent(entireFileText, type, delimiter);

  }

  getSchemaContent(fileText: string, type: FileType, delimiter: string): string {
    let data = this.readObjectsFromCsv(fileText, delimiter);
    let value = this.writeAsJson(data);
    let sb = new SchemaBuilderWithNamepaces();
    let jsonSchema = sb.createSchema(value, type);
    return jsonSchema;

  }

  readObjectsFromCsv(content: string, delimiter: string): Map<string, string>[] {
    let mapper = new CsvMapper();
    let delimiterChar =',';
    if (!isEmpty(delimiter)) {
    	delimiterChar = delimiter.charAt(0);
    }
    let schema = CsvSchema.emptySchema().withHeader().withColumnSeparator(delimiterChar);
    let it = mapper.readerFor(Map).with(schema).readValues(content);
    return it.readAll();

  }

  writeAsJson(data: Map<string, string>[]): string {
    let value = null;
    let mapper = new ObjectMapper();
    if(data != null){
    value = mapper.writeValueAsString(data);
    }
    return value;


  }
}
