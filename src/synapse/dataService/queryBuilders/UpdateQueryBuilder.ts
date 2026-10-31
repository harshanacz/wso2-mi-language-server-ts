// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dataService/queryBuilders/UpdateQueryBuilder.java by the java2ts converter (see tools/java2ts).
import { isEmpty, contains, joinStr } from "../../../syntaxTree/javaCompat.js";

export class UpdateQueryBuilder {
  static readonly __fields: string[] = ["tableName", "schema", "columns", "primaryKeys"];

  tableName?: string;

  schema?: string;

  columns: string[] = [];

  primaryKeys: string[] = [];

  setTableName(tableName: string): UpdateQueryBuilder {
    this.tableName = tableName;
    return this;

  }

  setSchema(schema: string): UpdateQueryBuilder {
    this.schema = schema;
    return this;

  }

  setColumns(columns: string[]): UpdateQueryBuilder {
    this.columns = columns;
    return this;

  }

  setPrimaryKeys(primaryKeys: string[]): UpdateQueryBuilder {
    this.primaryKeys = primaryKeys;
    return this;

  }

  build(): string {
    let filteredColumns = this.columns.filter(column => !contains(this.primaryKeys, column));
    return "UPDATE " +
            ((this.schema == null || isEmpty(this.schema.trim())) ? "" : (this.schema.trim() + ".")) + this.tableName.trim() +
            " SET " +
            joinStr(", ", filteredColumns.map(column => column + "=?").slice()) +
            " WHERE " +
            joinStr(" AND ", this.primaryKeys.map(pKey => pKey + "=?").slice());

  }
}
