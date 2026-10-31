// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dataService/queryBuilders/SelectByKeyQueryBuilder.java by the java2ts converter (see tools/java2ts).
import { isEmpty } from "../../../syntaxTree/javaCompat.js";

export class SelectByKeyQueryBuilder {
  static readonly __fields: string[] = ["tableName", "schema", "primaryKey", "columnNames"];

  tableName?: string;

  schema?: string;

  primaryKey?: string;

  columnNames?: string;

  setTableName(tableName: string): SelectByKeyQueryBuilder {
    this.tableName = tableName;
    return this;

  }

  setSchema(schema: string): SelectByKeyQueryBuilder {
    this.schema = schema;
    return this;

  }

  setPrimaryKey(primaryKey: string): SelectByKeyQueryBuilder {
    this.primaryKey = primaryKey;
    return this;

  }

  setColumnNames(columnNames: string): SelectByKeyQueryBuilder {
    this.columnNames = columnNames;
    return this;

  }

  build(): string {
    return "SELECT " + this.columnNames.trim() + " FROM " +
            ((this.schema == null || isEmpty(this.schema.trim())) ? "" : (this.schema.trim() + ".")) + this.tableName.trim() +
            " WHERE " + this.primaryKey.trim() + "=?";

  }
}
