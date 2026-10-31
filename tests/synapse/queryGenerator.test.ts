import { fixture } from "./helpers.js";
import { describe, it, expect, afterEach } from "vitest";
import { readFileSync } from "node:fs";
import { QueryGenerator } from "../../src/synapse/dataService/QueryGenerator.js";
import { QueryGenRequestParams } from "../../src/synapse/dataService/QueryGenRequestParams.js";
import { MappingsGenRequestParams } from "../../src/synapse/dataService/MappingsGenRequestParams.js";
import { DBConnectionTester } from "../../src/synapse/db/DBConnectionTester.js";
import { JavaHashMap } from "../../src/syntaxTree/javaCompat.js";
import { XDocument } from "../../src/synapse/host/xmlDom.js";
import type { Connection, DatabaseMetaData, PreparedStatement, ResultSet, ResultSetMetaData } from "../../src/synapse/host/sql.js";

/** Port of the Java test's CustomResultSet. getInt answers 1 (CHAR) for "VARCHAR" and 2 (NUMERIC) otherwise. */
class CustomResultSet implements ResultSet {
  private i = 0;
  private current: Map<string, unknown> | null = null;
  constructor(private readonly data: Map<string, unknown>[], private readonly meta: ResultSetMetaData) {}
  next(): boolean {
    if (this.i < this.data.length) {
      this.current = this.data[this.i++];
      return true;
    }
    return false;
  }
  private label(column: string | number): string {
    return typeof column === "number" ? [...this.current!.keys()][column - 1] : column;
  }
  getString(column: string | number): string | null {
    if (this.current === null) throw new Error("Current row is null");
    return (this.current.get(this.label(column)) as string | undefined) ?? null;
  }
  getInt(column: string | number): number {
    if (this.current === null) throw new Error("Current row is null");
    return this.current.get(this.label(column)) === "VARCHAR" ? 1 : 2;
  }
  getBoolean(): boolean {
    return false;
  }
  getMetaData(): ResultSetMetaData {
    return this.meta;
  }
  close(): void {}
}

const row = (o: Record<string, string>): Map<string, unknown> => new Map(Object.entries(o));
/** Mockito's thenReturn(a).thenReturn(b): the successive answers, the last one repeating. */
function sequence<T>(...xs: T[]): () => T {
  let n = 0;
  return () => xs[Math.min(n++, xs.length - 1)];
}

function params(): QueryGenRequestParams {
  const p = new QueryGenRequestParams();
  p.setUrl("jdbc:test");
  p.setUsername("testUser");
  p.setPassword("testPassword");
  p.setClassName("com.mysql.jdbc.Driver");
  p.setDatasourceName("TestDS");
  p.setTableData('{"student":"GET,POST","teacher":"PUT,DELETE"}');
  return p;
}

function useConnection(c: Connection | null): void {
  DBConnectionTester.setConnectionFactory(() => c);
}

afterEach(() => DBConnectionTester.setConnectionFactory(null));

describe("query generator", () => {
  it("generates the data service queries and resources", () => {
    const resultMeta = { getColumnCount: () => 2, getColumnLabel: () => null as any, getColumnType: () => 0 };
    const columnData = [row({ COLUMN_NAME: "id", DATA_TYPE: "INTEGER" }), row({ COLUMN_NAME: "name", DATA_TYPE: "VARCHAR" })];
    const pkData = [row({ COLUMN_NAME: "id", DATA_TYPE: "INTEGER" })];
    const columns = sequence<ResultSet>(new CustomResultSet(columnData, resultMeta), new CustomResultSet(columnData, resultMeta));
    const primary = sequence<ResultSet>(new CustomResultSet(pkData, resultMeta), new CustomResultSet(pkData, resultMeta));
    const metadata = {
      getDatabaseProductName: () => "MySQL",
      getColumns: () => columns(),
      getPrimaryKeys: () => primary(),
    } as unknown as DatabaseMetaData;
    useConnection({ getMetaData: () => metadata, close() {} } as unknown as Connection);
    const expected = readFileSync(fixture("synapse/query.generator/generated-configuration.txt"), "utf8");
    expect(QueryGenerator.generateDSSQueries(params())).toBe(expected);
  });

  it("returns an empty string when no connection can be made", () => {
    useConnection(null);
    expect(QueryGenerator.generateDSSQueries(params())).toBe("");
  });

  it("lists the tables with their read-only flag and primary key presence", () => {
    const resultMeta = { getColumnCount: () => 2, getColumnLabel: () => null as any, getColumnType: () => 0 };
    const tables = new CustomResultSet([row({ TABLE_NAME: "student" }), row({ TABLE_NAME: "teacher" })], resultMeta);
    const primary = new CustomResultSet([row({ COLUMN_NAME: "id", DATA_TYPE: "INTEGER" })], resultMeta);
    const columnData = [row({ COLUMN_NAME: "id", DATA_TYPE: "INTEGER" }), row({ COLUMN_NAME: "name", DATA_TYPE: "VARCHAR" })];
    const columns = sequence<ResultSet>(new CustomResultSet(columnData, resultMeta), new CustomResultSet(columnData, resultMeta));
    const metadata = {
      getDatabaseProductName: () => "MySQL",
      getTables: () => tables,
      getColumns: () => columns(),
      isReadOnly: () => false,
      getPrimaryKeys: () => primary,
    } as unknown as DatabaseMetaData;
    useConnection({ getMetaData: () => metadata, getCatalog: () => null, close() {} } as unknown as Connection);
    const result = QueryGenerator.getTableList(params())!;
    expect(result.size).toBe(2);
    expect(result.has("student")).toBe(true);
    expect(result.has("teacher")).toBe(true);
    expect(result.get("student")).toEqual([false, true]);
  });

  it("lists no tables without a connection", () => {
    useConnection(null);
    expect(QueryGenerator.getTableList(params())!.size).toBe(0);
  });

  const mapping = (column: string, type: string): unknown[] => [
    "Element", "", [], "Column", column.substring(0, 1).toUpperCase() + column.substring(1), "", "", column, "", "Scalar", "", type,
    false, "", "", "Scalar", false, false,
  ];
  const input = (column: string): unknown[] => [column, column, "SCALAR", "STRING", "", "IN", 0, []];

  it("reads input columns from insert, select, update and delete queries", () => {
    expect(QueryGenerator.getInputMappings("INSERT INTO student (name, school, grade) VALUES (:name, :school, :grade)"))
      .toEqual(["name", "school", "grade"].map(input));
    expect(QueryGenerator.getInputMappings("SELECT name, school FROM student WHERE id = :id AND grade = :grade"))
      .toEqual(["id", "grade"].map(input));
    expect(QueryGenerator.getInputMappings("UPDATE student SET name = :name, school = :school, grade = :grade WHERE id = :id"))
      .toEqual(["name", "school", "grade", "id"].map(input));
    expect(QueryGenerator.getInputMappings("DELETE FROM student WHERE name = :name and grade = :grade"))
      .toEqual(["name", "grade"].map(input));
  });

  it("reads output columns from the select list without a connection", () => {
    const p = new MappingsGenRequestParams();
    p.query = "SELECT name, school from student WHERE id = :id";
    expect(QueryGenerator.getOutputMappings(p)).toEqual([mapping("name", "string"), mapping("school", "string")]);
  });

  it("reads output columns of select * through the connection metadata", () => {
    const meta = {
      getColumnCount: () => 3,
      getColumnLabel: (i: number) => ["id", "name", "school"][i - 1],
      getColumnType: (i: number) => [2, 1, 1][i - 1],
    };
    const stmt = { getMetaData: () => meta, close() {} } as unknown as PreparedStatement;
    useConnection({ prepareStatement: () => stmt, close() {} } as unknown as Connection);
    const p = new MappingsGenRequestParams();
    p.query = "SELECT * from student WHERE id = :id";
    p.className = "com.mysql.jdbc.Driver";
    expect(QueryGenerator.getOutputMappings(p)).toEqual([mapping("id", "integer"), mapping("name", "string"), mapping("school", "string")]);
  });
});

describe("JavaHashMap", () => {
  it("iterates in java.util.HashMap order", () => {
    // verified against the JDK: "name" lands in bucket 8 and "id" in bucket 11 of a 16 slot table
    const m = new JavaHashMap<string, number>();
    m.set("id", 1);
    m.set("name", 2);
    expect([...m.keys()]).toEqual(["name", "id"]);
    const many = new JavaHashMap<string, number>();
    for (const k of ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"]) many.set(k, 0);
    // single letters hash to their code point; 14 entries grow the table to 32 slots, so buckets are code - 97 + 1
    expect([...many.keys()].join("")).toBe("abcdefghijklmn");
    const wrap = new JavaHashMap<string, number>();
    wrap.set("A", 0);
    wrap.set("a", 0);
    expect([...wrap.keys()]).toEqual(["A", "a"]);
  });
});

describe("XDocument", () => {
  it("prints like the JDK identity transformer with indent-amount 4", () => {
    const doc = new XDocument();
    const data = doc.createElement("data");
    const q = doc.createElement("query");
    q.setAttribute("useConfig", 'a"b<c>&d');
    q.setAttribute("id", "x");
    const sql = doc.createElement("sql");
    sql.setTextContent("SELECT a<b AND c>d & 'q' \"z\" FROM t");
    q.appendChild(sql);
    const e = doc.createElement("empty");
    e.setAttribute("z", "1");
    e.setAttribute("a", "2");
    q.appendChild(e);
    const r = doc.createElement("r");
    const inn = doc.createElement("in");
    inn.appendChild(doc.createElement("leaf"));
    r.appendChild(inn);
    q.appendChild(r);
    const blank = doc.createElement("blank");
    blank.setTextContent("");
    data.appendChild(blank);
    data.appendChild(q);
    doc.appendChild(data);
    // captured from JDK 21: new Transformer with INDENT=yes and indent-amount=4 over the same DOM
    const jdk = [
      "<data>",
      "    <blank/>",
      '    <query id="x" useConfig="a&quot;b&lt;c&gt;&amp;d">',
      "        <sql>SELECT a&lt;b AND c&gt;d &amp; 'q' \"z\" FROM t</sql>",
      '        <empty a="2" z="1"/>',
      "        <r>",
      "            <in>",
      "                <leaf/>",
      "            </in>",
      "        </r>",
      "    </query>",
      "</data>",
    ].join("\n");
    expect(doc.serialize(4)).toBe('<?xml version="1.0" encoding="UTF-8" standalone="no"?>' + jdk);
  });
});
