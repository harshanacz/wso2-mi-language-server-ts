// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dataService/queryBuilders/SelectAllQueryBuilder.java by the java2ts converter (see tools/java2ts).
import { isEmpty } from "../../../syntaxTree/javaCompat.js";

export class SelectAllQueryBuilder {
  static readonly __fields: string[] = ["tableName", "schema", "columnNames"];

  tableName?: string;

  schema?: string;

  columnNames?: string;

  setTableName(tableName: string): SelectAllQueryBuilder {
    this.tableName = tableName;
    return this;

  }

  setSchema(schema: string): SelectAllQueryBuilder {
    this.schema = schema;
    return this;

  }

  setColumnNames(columnNames: string): SelectAllQueryBuilder {
    this.columnNames = columnNames;
    return this;

  }

  build(): string {
    return "SELECT " + this.columnNames.trim() + " FROM " +
            ((this.schema == null || isEmpty(this.schema.trim())) ? "" : (this.schema + ".")) + this.tableName.trim();

  }
}
