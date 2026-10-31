// @ts-nocheck
// Ported from org/eclipse/lemminx/customservice/synapse/dataService/QueryGenerator.java.
// Differences from the Java version:
//  - database access goes through the small interfaces in host/sql.ts; connections come from DBConnectionTester;
//  - loading a JDBC driver jar into a class loader has no equivalent here, so the driver class path functions
//    (isDriverAvailableInClassPath, add/remove/modifyDriverInClassPath) report "not available / not supported".
import { equalsIgnoreCase, isEmpty, contains, get, Logger, Level, entrySet, joinStr, StringUtils, JavaHashMap } from "../../syntaxTree/javaCompat.js";
import { CheckDBDriverResponseParams } from "./CheckDBDriverResponseParams.js";
import { DBConnectionTester } from "../db/DBConnectionTester.js";
import { DataServiceConstants } from "./DataServiceConstants.js";
import { DeleteQueryBuilder } from "./queryBuilders/DeleteQueryBuilder.js";
import { Files, Paths } from "../host/nio.js";
import { InsertQueryBuilder } from "./queryBuilders/InsertQueryBuilder.js";
import { MappingsGenRequestParams } from "./MappingsGenRequestParams.js";
import { QueryGenRequestParams } from "./QueryGenRequestParams.js";
import { QueryGenerateUtils } from "./QueryGenerateUtils.js";
import { SelectAllQueryBuilder } from "./queryBuilders/SelectAllQueryBuilder.js";
import { UpdateQueryBuilder } from "./queryBuilders/UpdateQueryBuilder.js";
import { XDocument, XElement } from "../host/xmlDom.js";
import { Connection, DatabaseMetaData, ResultSet, SQLException } from "../host/sql.js";

type Document = XDocument;
type Element = XElement;

export class QueryGenerator {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("QueryGenerator");

  /** Generate resources and queries for a data service based on a datasource. Returns "" on any failure. */
  static generateDSSQueries(requestParams: QueryGenRequestParams): string {
    let connection: Connection | null = null;
    try {
      connection = DBConnectionTester.getConnection(requestParams.url, requestParams.username,
          requestParams.password, requestParams.className);
      let doc = new XDocument();
      let dataElement = doc.createElement("data");

      let metadata = connection.getMetaData();

      // Jackson reads the JSON object into a LinkedHashMap
      let tableData = new Map<string, string>(Object.entries(JSON.parse(requestParams.tableData)));

      for (let entry of entrySet(tableData)) {
        let table = entry.getKey();
        let tableDetails = QueryGenerator.extractTableColumns(connection, metadata, table);
        let columnsList = tableDetails[0];
        let autoIncrementFields = tableDetails[1];
        let primaryKeys = QueryGenerator.extractTablePrimaryKeys(connection, metadata, table, columnsList, autoIncrementFields);
        let columnNamesCombined = joinStr(", ", [...columnsList.keys()]);

        let methods = entry.getValue();
        if (contains(methods, "GET")) {
          QueryGenerator.generateSelectAllDefinition(doc, dataElement, table, columnNamesCombined, columnsList,
              requestParams.datasourceName);
        }
        if (contains(methods, "POST")) {
          QueryGenerator.generateInsertDefinition(doc, dataElement, table, columnsList, requestParams.datasourceName);
        }
        if (contains(methods, "PUT")) {
          QueryGenerator.generateUpdateDefinition(doc, dataElement, table, columnsList, primaryKeys, requestParams.datasourceName);
        }
        if (contains(methods, "DELETE")) {
          QueryGenerator.generateDeleteDefinition(doc, dataElement, table, primaryKeys, requestParams.datasourceName);
        }
      }

      doc.appendChild(dataElement);
      return QueryGenerator.generateServiceFromDoc(doc);
    } catch (e) {
      QueryGenerator.LOGGER.log(Level.SEVERE, "Error occurred while generating the DBS file content.", e);
      return "";
    } finally {
      try {
        if (connection != null) connection.close();
      } catch (e) {
        // closing quietly, as try-with-resources would surface it only if nothing else failed
      }
    }
  }

  /** The tables of a datasource, each with [readOnly, hasPrimaryKey]. Null when the connection could not be used. */
  static getTableList(requestParams: QueryGenRequestParams): Map<string, boolean[]> {
    let connection: Connection | null = null;
    try {
      if (StringUtils.isBlank(requestParams.driverPath)) {
        connection = DBConnectionTester.getConnection(requestParams.url, requestParams.username,
            requestParams.password, requestParams.className);
      } else {
        connection = DBConnectionTester.getConnection(requestParams.url, requestParams.username,
            requestParams.password, requestParams.className, requestParams.driverPath);
      }

      let tablesMap = new JavaHashMap<string, boolean[]>();
      if (connection != null) {
        let mObject = connection.getMetaData();
        let tableNamesList: ResultSet | null = null;
        try {
          let schema = QueryGenerator.extractDatabaseSchema(mObject, connection);
          let dbProduct = mObject.getDatabaseProductName();
          let types = [DataServiceConstants.TABLE];
          if (equalsIgnoreCase(DataServiceConstants.ORACLE, dbProduct)) {
            types.push(DataServiceConstants.SYNONYM);
          }
          tableNamesList = mObject.getTables(connection.getCatalog(), schema, "%", types);
          while (tableNamesList.next()) {
            let tableName = tableNamesList.getString(DataServiceConstants.TABLE_NAME);
            let tableDetails = QueryGenerator.extractTableColumns(connection, mObject, tableName);
            let primaryKeys = QueryGenerator.extractTablePrimaryKeys(connection, mObject, tableName,
                tableDetails[0], tableDetails[1]);
            tablesMap.set(tableName, [mObject.isReadOnly(), !isEmpty(primaryKeys)]);
          }
        } finally {
          if (tableNamesList != null) {
            tableNamesList.close();
          }
        }
      }
      return tablesMap;
    } catch (e) {
      if (!(e instanceof SQLException)) throw e;
      QueryGenerator.LOGGER.log(Level.SEVERE, "Could not establish database connection.", e);
      return null;
    }
  }

  // The four functions below load JDBC driver jars into a JVM class loader; there is nothing equivalent to load
  // into here, so they report the driver as unavailable / the change as not made.

  static isDriverAvailableInClassPath(className: string, projectPath: string): CheckDBDriverResponseParams {
    QueryGenerator.LOGGER.log(Level.SEVERE, "Loading DB driver classes is not supported in this environment.");
    return new CheckDBDriverResponseParams(false, StringUtils.EMPTY, StringUtils.EMPTY);
  }

  static addDriverToClassPath(driverPath: string, className: string): boolean {
    if (!Files.exists(Paths.get(driverPath))) {
      QueryGenerator.LOGGER.log(Level.SEVERE, "Driver not found in the given folder path.");
      return false;
    }
    QueryGenerator.LOGGER.log(Level.SEVERE, "Loading DB driver classes is not supported in this environment.");
    return false;
  }

  static removeDriverFromClassPath(driverPath: string): boolean {
    if (!Files.exists(Paths.get(driverPath))) {
      QueryGenerator.LOGGER.log(Level.SEVERE, "Driver not found in the given folder path.");
      return false;
    }
    QueryGenerator.LOGGER.log(Level.SEVERE, "Unloading DB driver classes is not supported in this environment.");
    return false;
  }

  static modifyDriverInClassPath(addDriverPath: string, removeDriverPath: string, className: string): boolean {
    if (!(Files.exists(Paths.get(addDriverPath)) && Files.exists(Paths.get(removeDriverPath)))) {
      QueryGenerator.LOGGER.log(Level.SEVERE, "Driver not found in the given folder path.");
      return false;
    }
    return QueryGenerator.removeDriverFromClassPath(removeDriverPath) && QueryGenerator.addDriverToClassPath(addDriverPath, className);
  }

  static getInputMappings(query: string): any[][] {
    let columns = QueryGenerateUtils.getInputColumns(query);
    let mappingsList = [];
    for (let column of columns) {
      mappingsList.push([column, column, "SCALAR", "STRING", "", "IN", 0, []]);
    }
    return mappingsList;
  }

  static getOutputMappings(requestParams: MappingsGenRequestParams): any[][] {
    let connection: Connection | null = null;
    let mappingsList = [];

    if (StringUtils.isNotBlank(requestParams.className)) {
      try {
        connection = DBConnectionTester.getConnection(requestParams.url, requestParams.username,
            requestParams.password, requestParams.className);
      } catch (e) {
        QueryGenerator.LOGGER.log(Level.SEVERE, "Error occurred while creating DB connection.", e);
      }
    }
    try {
      let columns = QueryGenerateUtils.getOutputColumns(requestParams.query, connection);
      for (let column of entrySet(columns)) {
        mappingsList.push(["Element", "", [], "Column",
          column.getKey().substring(0, 1).toUpperCase() + column.getKey().substring(1), "", "",
          column.getKey(), "", "Scalar", "", column.getValue(), false, "", "", "Scalar", false, false]);
      }
      return mappingsList;
    } catch (e) {
      QueryGenerator.LOGGER.log(Level.SEVERE, "Error occurred while generating output mappings for query.", e);
      return null;
    } finally {
      if (connection != null) {
        try {
          connection.close();
        } catch (e) {
          QueryGenerator.LOGGER.log(Level.SEVERE, "Error while closing DB connection.", e);
        }
      }
    }
  }

  static generateSelectAllDefinition(doc: Document, dataElement: Element, table: string,
                                     columnNamesCombined: string, columnsList: Map<string, string>, datasource: string): void {
    let query = new SelectAllQueryBuilder()
        .setTableName(table)
        .setSchema("")
        .setColumnNames(columnNamesCombined)
        .build();
    let queryEle = QueryGenerateUtils.generateQueryElement(doc, "select_all_" + table + "_query", query, datasource);
    queryEle.appendChild(QueryGenerateUtils.generateResultElement(doc, table, columnsList));
    let callQueryEle = QueryGenerateUtils.generateCallQueryElement(doc, "select_all_" + table + "_query");
    dataElement.appendChild(queryEle);
    dataElement.appendChild(QueryGenerateUtils.generateResourceElement(doc, "GET", table, callQueryEle));
  }

  static generateInsertDefinition(doc: Document, dataElement: Element, table: string,
                                  columnsList: Map<string, string>, datasource: string): void {
    let query = new InsertQueryBuilder()
        .setTableName(table)
        .setSchema("")
        .setColumns([...columnsList.keys()])
        .build();
    let queryEle = QueryGenerateUtils.generateQueryElement(doc, "insert_" + table + "_query", query, datasource);
    let callQueryEle = QueryGenerateUtils.generateCallQueryElement(doc, "insert_" + table + "_query");
    let i = 1;
    for (let column of entrySet(columnsList)) {
      queryEle.appendChild(QueryGenerateUtils.generateParamElement(doc, column, i));
      callQueryEle.appendChild(QueryGenerateUtils.generateWithParamElement(doc, column));
      i++;
    }
    dataElement.appendChild(queryEle);
    dataElement.appendChild(QueryGenerateUtils.generateResourceElement(doc, "POST", table, callQueryEle));
  }

  static generateUpdateDefinition(doc: Document, dataElement: Element, table: string,
                                  columnsList: Map<string, string>, primaryKeys: Map<string, string>, datasource: string): void {
    let query = new UpdateQueryBuilder()
        .setTableName(table)
        .setSchema("")
        .setColumns([...columnsList.keys()])
        .setPrimaryKeys([...primaryKeys.keys()])
        .build();
    let queryEle = QueryGenerateUtils.generateQueryElement(doc, "update_" + table + "_query", query, datasource);
    let callQueryEle = QueryGenerateUtils.generateCallQueryElement(doc, "update_" + table + "_query");
    let i = 1;
    for (let column of entrySet(columnsList)) {
      if (primaryKeys.has(column.getKey())) {
        continue;
      }
      queryEle.appendChild(QueryGenerateUtils.generateParamElement(doc, column, i));
      callQueryEle.appendChild(QueryGenerateUtils.generateWithParamElement(doc, column));
      i++;
    }
    for (let primaryKey of entrySet(primaryKeys)) {
      queryEle.appendChild(QueryGenerateUtils.generateParamElement(doc, primaryKey, i));
      callQueryEle.appendChild(QueryGenerateUtils.generateWithParamElement(doc, primaryKey));
      i++;
    }
    dataElement.appendChild(queryEle);
    dataElement.appendChild(QueryGenerateUtils.generateResourceElement(doc, "PUT", table, callQueryEle));
  }

  static generateDeleteDefinition(doc: Document, dataElement: Element, table: string,
                                  primaryKeys: Map<string, string>, datasource: string): void {
    let query = new DeleteQueryBuilder()
        .setTableName(table)
        .setSchema("")
        .setPrimaryKeys([...primaryKeys.keys()])
        .build();
    let queryEle = QueryGenerateUtils.generateQueryElement(doc, "delete_" + table + "_query", query, datasource);
    let callQueryEle = QueryGenerateUtils.generateCallQueryElement(doc, "delete_" + table + "_query");
    let i = 1;
    for (let column of entrySet(primaryKeys)) {
      queryEle.appendChild(QueryGenerateUtils.generateParamElement(doc, column, i));
      callQueryEle.appendChild(QueryGenerateUtils.generateWithParamElement(doc, column));
      i++;
    }
    dataElement.appendChild(queryEle);
    dataElement.appendChild(QueryGenerateUtils.generateResourceElement(doc, "DELETE", table, callQueryEle));
  }

  static generateServiceFromDoc(doc: Document): string {
    try {
      let templateContent = doc.serialize(4);
      templateContent = templateContent.split("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>").join("");
      templateContent = templateContent.replace(/<data>([\s\S]*)<\/data>/, "$1").trim();
      return templateContent;
    } catch (e) {
      QueryGenerator.LOGGER.log(Level.SEVERE, "Error occurred while generating the DBS file content.", e);
      return "";
    }
  }

  static extractTableColumns(connection: Connection, metadata: DatabaseMetaData, table: string): Map<string, string>[] {
    let columnsList = new JavaHashMap<string, string>();
    let autoIncrementFields = new JavaHashMap<string, string>();

    let resolvedOwner: string | null = null;
    let resolvedTable = table;

    if (equalsIgnoreCase(DataServiceConstants.ORACLE, metadata.getDatabaseProductName())) {
      let synonymQuery = "SELECT TABLE_OWNER, TABLE_NAME FROM ALL_SYNONYMS WHERE SYNONYM_NAME = ?";
      let ps = connection.prepareStatement(synonymQuery);
      try {
        ps.setString(1, table.toUpperCase());
        let rs = ps.executeQuery();
        try {
          if (rs.next()) {
            resolvedOwner = rs.getString(DataServiceConstants.TABLE_OWNER);
            resolvedTable = rs.getString(DataServiceConstants.TABLE_NAME);
          }
        } finally {
          rs.close();
        }
      } finally {
        ps.close();
      }
    }

    let rs = metadata.getColumns(null, resolvedOwner, resolvedTable, null);
    try {
      while (rs.next()) {
        let name = rs.getString(DataServiceConstants.COLUMN_NAME);
        let type = rs.getInt(DataServiceConstants.DATA_TYPE);
        let sqlType = QueryGenerator.getSQLType(type);
        if (QueryGenerator.isAutoIncrementField(rs)) {
          autoIncrementFields.set(name, sqlType);
          continue;
        }
        columnsList.set(name, sqlType);
      }
    } finally {
      rs.close();
    }
    return [columnsList, autoIncrementFields];
  }

  static extractTablePrimaryKeys(connection: Connection, metadata: DatabaseMetaData, table: string,
                                 columnsList: Map<string, string>, autoIncrementFields: Map<string, string>): Map<string, string> {
    let primaryKeys = new JavaHashMap<string, string>();
    let pkRs = metadata.getPrimaryKeys(null, null, table);
    try {
      while (pkRs.next()) {
        let name = pkRs.getString(DataServiceConstants.COLUMN_NAME);
        let sqlType = columnsList.get(name);
        if (sqlType == null) {
          sqlType = autoIncrementFields.get(name);
        }
        primaryKeys.set(name, sqlType);
      }
    } finally {
      pkRs.close();
    }
    if (equalsIgnoreCase(DataServiceConstants.ORACLE, metadata.getDatabaseProductName()) && isEmpty(primaryKeys)) {
      let baseOwner: string | null = null;
      let baseTable: string | null = null;

      let synonymQuery = "SELECT TABLE_OWNER, TABLE_NAME " +
          "FROM ALL_SYNONYMS WHERE SYNONYM_NAME = ? AND OWNER = ?";
      let stmt = connection.prepareStatement(synonymQuery);
      try {
        stmt.setString(1, table.toUpperCase());
        stmt.setString(2, connection.getMetaData().getUserName().toUpperCase());
        let rs = stmt.executeQuery();
        try {
          if (rs.next()) {
            baseOwner = rs.getString(DataServiceConstants.TABLE_OWNER);
            baseTable = rs.getString(DataServiceConstants.TABLE_NAME);
          }
        } finally {
          rs.close();
        }
      } finally {
        stmt.close();
      }

      if (baseOwner != null && baseTable != null) {
        let pkQuery = "SELECT cols.COLUMN_NAME " +
            "FROM ALL_CONSTRAINTS cons " +
            "JOIN ALL_CONS_COLUMNS cols ON cons.CONSTRAINT_NAME = cols.CONSTRAINT_NAME " +
            "WHERE cons.CONSTRAINT_TYPE = 'P' " +
            "AND cons.OWNER = ? " +
            "AND cons.TABLE_NAME = ?";
        let stmt2 = connection.prepareStatement(pkQuery);
        try {
          stmt2.setString(1, baseOwner);
          stmt2.setString(2, baseTable);
          let rs = stmt2.executeQuery();
          try {
            while (rs.next()) {
              let name = rs.getString(DataServiceConstants.COLUMN_NAME);
              let sqlType = columnsList.get(name) ?? autoIncrementFields.get(name);
              primaryKeys.set(name, sqlType);
            }
          } finally {
            rs.close();
          }
        } finally {
          stmt2.close();
        }
      }
    }
    return primaryKeys;
  }

  static extractDatabaseSchema(metadata: DatabaseMetaData, connection: Connection): string | null {
    let dbType = metadata.getDatabaseProductName();
    let schema: string | null = null;
    if (equalsIgnoreCase("Oracle", dbType)) {
      schema = connection.getSchema();
    } else if (equalsIgnoreCase("PostgreSQL", dbType)) {
      let schemas = metadata.getSchemas();
      while (schemas.next()) {
        schema = schemas.getString("TABLE_SCHEM");
      }
    }
    return schema;
  }

  static isAutoIncrementField(columnNames: ResultSet): boolean {
    try {
      let autoIncrString = columnNames.getString(DataServiceConstants.AUTOINCREMENT_COLUMN);
      if (equalsIgnoreCase(DataServiceConstants.IS_AUTOINCREMENT, autoIncrString)) {
        return true;
      }
      let metaData = columnNames.getMetaData();
      let hasIdentityColumn = false;
      for (let i = 1; i <= metaData.getColumnCount(); i++) {
        if (equalsIgnoreCase(DataServiceConstants.IDENTITY_COLUMN, metaData.getColumnLabel(i))) {
          hasIdentityColumn = true;
          break;
        }
      }
      if (hasIdentityColumn) {
        return columnNames.getBoolean(DataServiceConstants.IDENTITY_COLUMN);
      }
    } catch (e) {
      if (!(e instanceof SQLException)) throw e;
      QueryGenerator.LOGGER.log(Level.SEVERE, "Error occurred while retrieving DB column details.", e);
    }
    return false;
  }

  static getSQLType(type: number): string {
    let charTypes = [-1, -15, -16, 2009, 1111];
    if (contains(charTypes, type)) {
      type = 1;
    }
    return get(QueryGenerateUtils.getDefinedTypes(), type);
  }
}
