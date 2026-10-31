// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dataService/queryBuilders/DeleteQueryBuilder.java by the java2ts converter (see tools/java2ts).
import { isEmpty, joinStr } from "../../../syntaxTree/javaCompat.js";

export class DeleteQueryBuilder {
  static readonly __fields: string[] = ["tableName", "schema", "primaryKeys"];

  tableName?: string;

  schema?: string;

  primaryKeys?: string[];

  setTableName(tableName: string): DeleteQueryBuilder {
    this.tableName = tableName;
    return this;

  }

  setSchema(schema: string): DeleteQueryBuilder {
    this.schema = schema;
    return this;

  }

  setPrimaryKeys(primaryKeys: string[]): DeleteQueryBuilder {
    this.primaryKeys = primaryKeys;
    return this;

  }

  build(): string {
    return "DELETE FROM " +
            ((this.schema == null || isEmpty(this.schema.trim())) ? "" : (this.schema.trim() + ".")) + this.tableName.trim() +
            " WHERE " +
            joinStr(" AND ", this.primaryKeys.map(pKey => pKey + "=?"));

  }
}
