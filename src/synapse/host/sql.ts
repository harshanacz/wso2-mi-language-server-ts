/**
 * The slice of java.sql that the data service query generator uses. A host that can reach a database (a desktop
 * shell with a JDBC bridge, a server) supplies the implementations through DBConnectionTester.setConnectionFactory.
 */
export class SQLException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "SQLException";
  }
}

export const Types = {
  BIT: -7,
  TINYINT: -6,
  SMALLINT: 5,
  INTEGER: 4,
  BIGINT: -5,
  FLOAT: 6,
  REAL: 7,
  DOUBLE: 8,
  NUMERIC: 2,
  DECIMAL: 3,
  CHAR: 1,
  VARCHAR: 12,
  DATE: 91,
  TIME: 92,
  TIMESTAMP: 93,
  BINARY: -2,
  VARBINARY: -3,
  LONGVARBINARY: -4,
  BLOB: 2004,
  CLOB: 2005,
  BOOLEAN: 16,
  NVARCHAR: -9,
} as const;

export interface ResultSetMetaData {
  getColumnCount(): number;
  getColumnLabel(column: number): string;
  getColumnType(column: number): number;
}

export interface ResultSet {
  next(): boolean;
  getString(column: string | number): string | null;
  getInt(column: string | number): number;
  getBoolean(column: string | number): boolean;
  getMetaData(): ResultSetMetaData;
  close(): void;
}

export interface PreparedStatement {
  setString(index: number, value: string): void;
  executeQuery(): ResultSet;
  getMetaData(): ResultSetMetaData;
  close(): void;
}

export interface DatabaseMetaData {
  getDatabaseProductName(): string;
  getColumns(catalog: string | null, schemaPattern: string | null, tableNamePattern: string | null, columnNamePattern: string | null): ResultSet;
  getPrimaryKeys(catalog: string | null, schema: string | null, table: string): ResultSet;
  getTables(catalog: string | null, schemaPattern: string | null, tableNamePattern: string | null, types: string[] | null): ResultSet;
  getSchemas(): ResultSet;
  isReadOnly(): boolean;
  getUserName(): string;
}

export interface Connection {
  getMetaData(): DatabaseMetaData;
  prepareStatement(sql: string): PreparedStatement;
  getCatalog(): string | null;
  getSchema(): string | null;
  close(): void;
}
