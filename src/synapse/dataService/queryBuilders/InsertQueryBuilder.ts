// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dataService/queryBuilders/InsertQueryBuilder.java by the java2ts converter (see tools/java2ts).
import { isEmpty, size, joinStr } from "../../../syntaxTree/javaCompat.js";

export class InsertQueryBuilder {
  static readonly __fields: string[] = ["tableName", "schema", "columns"];

  tableName?: string;

  schema?: string;

  columns?: string[];

  setTableName(tableName: string): InsertQueryBuilder {
    this.tableName = tableName;
    return this;

  }

  setSchema(schema: string): InsertQueryBuilder {
    this.schema = schema;
    return this;

  }

  setColumns(columns: string[]): InsertQueryBuilder {
    this.columns = columns;
    return this;

  }

  build(): string {
    return "INSERT INTO " +
            ((this.schema == null || isEmpty(this.schema.trim())) ? "" : (this.schema.trim() + ".")) + this.tableName.trim() +
            " (" + joinStr(",", this.columns) + ") VALUES (" +
            "?,".repeat(Math.max(0, size(this.columns) - 1)) + "?)";

  }
}
