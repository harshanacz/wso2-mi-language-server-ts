// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dataService/QueryGenerateUtils.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, contains, get, jreplace, replaceAll, jsplit, Logger, Level, entrySet } from "../../syntaxTree/javaCompat.js";
import { Pattern } from "../host/regex.js";
import { XDocument, XElement } from "../host/xmlDom.js";
import { Connection, SQLException, Types } from "../host/sql.js";

type Document = XDocument;
type Element = XElement;
type Entry<K, V> = { getKey(): K; getValue(): V };

export class QueryGenerateUtils {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("QueryGenerateUtils");

  static definedTypeMap: Map<number, string> = new Map();

  static qnameTypeMap: Map<number, string> = new Map();

  static {
    QueryGenerateUtils.updateDataTypes();
    QueryGenerateUtils.updateQueryParamTypes();

  }

  static generateResourceElement(doc: Document, method: string, path: string, callQueryElement: Element): Element {
    let resourceEle = doc.createElement("resource");
    resourceEle.setAttribute("method", method);
    resourceEle.setAttribute("path", path);
    resourceEle.appendChild(callQueryElement);
    return resourceEle;

  }

  static generateParamElement(doc: Document, column: Entry<string, string>, ordinal: number): Element {
    let paramEle = doc.createElement("param");
    paramEle.setAttribute("name", column.getKey());
    paramEle.setAttribute("ordinal", "" + ordinal);
    paramEle.setAttribute("paramType", "SCALAR");
    paramEle.setAttribute("sqlType", column.getValue());
    paramEle.setAttribute("type", "IN");
    return paramEle;

  }

  static generateQueryElement(doc: Document, id: string, query: string, datasource: string): Element {
    let queryEle = doc.createElement("query");
    queryEle.setAttribute("id", id);
    queryEle.setAttribute("useConfig", datasource);
    let sqlEle = doc.createElement("sql");
    sqlEle.setTextContent(query);
    queryEle.appendChild(sqlEle);
    return queryEle;

  }

  static generateResultElement(doc: Document, table: string, columnsList: Map<string, string>): Element {
    let resultEle = doc.createElement("result");
    resultEle.setAttribute("element", table + "Collection");
    resultEle.setAttribute("rowName", table);

    for (let column of entrySet(columnsList)) {
        let columnEle = doc.createElement("element");
        columnEle.setAttribute("column", column.getKey());
        columnEle.setAttribute("name", column.getKey());
        columnEle.setAttribute("xsdType", "xs:" + column.getValue().toLowerCase());
        resultEle.appendChild(columnEle);
    }
    return resultEle;

  }

  static generateWithParamElement(doc: Document, column: Entry<string, string>): Element {
    let paramEle = doc.createElement("with-param");
    paramEle.setAttribute("name", column.getKey());
    paramEle.setAttribute("query-param", column.getKey());
    return paramEle;

  }

  static generateCallQueryElement(doc: Document, href: string): Element {
    let callQueryEle = doc.createElement("call-query");
    callQueryEle.setAttribute("href", href);
    return callQueryEle;

  }

  static getDefinedTypes(): Map<number, string> {
    return QueryGenerateUtils.definedTypeMap;

  }

  static updateDataTypes(): void {
    QueryGenerateUtils.definedTypeMap.set(Types.CHAR, "STRING");
    QueryGenerateUtils.definedTypeMap.set(Types.NUMERIC, "NUMERIC");
    QueryGenerateUtils.definedTypeMap.set(Types.DECIMAL, "DOUBLE");
    QueryGenerateUtils.definedTypeMap.set(Types.INTEGER, "INTEGER");
    QueryGenerateUtils.definedTypeMap.set(Types.SMALLINT, "SMALLINT");
    QueryGenerateUtils.definedTypeMap.set(Types.FLOAT, "DOUBLE");
    QueryGenerateUtils.definedTypeMap.set(Types.REAL, "FLOAT");
    QueryGenerateUtils.definedTypeMap.set(Types.DOUBLE, "DOUBLE");
    QueryGenerateUtils.definedTypeMap.set(Types.VARCHAR, "STRING");
    QueryGenerateUtils.definedTypeMap.set(Types.NVARCHAR, "STRING");
    QueryGenerateUtils.definedTypeMap.set(Types.CLOB, "STRING");
    QueryGenerateUtils.definedTypeMap.set(Types.BOOLEAN, "BOOLEAN");
    QueryGenerateUtils.definedTypeMap.set(Types.BIT, "BIT");
    QueryGenerateUtils.definedTypeMap.set(Types.TIME, "TIME");
    QueryGenerateUtils.definedTypeMap.set(Types.TINYINT, "TINYINT");
    QueryGenerateUtils.definedTypeMap.set(Types.BIGINT, "BIGINT");
    QueryGenerateUtils.definedTypeMap.set(Types.LONGVARBINARY, "BINARY");
    QueryGenerateUtils.definedTypeMap.set(Types.VARBINARY, "BINARY");
    QueryGenerateUtils.definedTypeMap.set(Types.BINARY, "BINARY");
    QueryGenerateUtils.definedTypeMap.set(Types.BLOB, "BINARY");
    QueryGenerateUtils.definedTypeMap.set(Types.DATE, "DATE");
    QueryGenerateUtils.definedTypeMap.set(Types.TIMESTAMP, "TIMESTAMP");

  }

  static updateQueryParamTypes(): void {
    QueryGenerateUtils.qnameTypeMap.set(Types.CHAR, "string");
    QueryGenerateUtils.qnameTypeMap.set(Types.NUMERIC, "integer");
    QueryGenerateUtils.qnameTypeMap.set(Types.DECIMAL, "decimal");
    QueryGenerateUtils.qnameTypeMap.set(Types.INTEGER, "integer");
    QueryGenerateUtils.qnameTypeMap.set(Types.SMALLINT, "integer");
    QueryGenerateUtils.qnameTypeMap.set(Types.FLOAT, "float");
    QueryGenerateUtils.qnameTypeMap.set(Types.REAL, "float");
    QueryGenerateUtils.qnameTypeMap.set(Types.DOUBLE, "double");
    QueryGenerateUtils.qnameTypeMap.set(Types.VARCHAR, "string");
    QueryGenerateUtils.qnameTypeMap.set(Types.NVARCHAR, "string");
    QueryGenerateUtils.qnameTypeMap.set(Types.CLOB, "string");
    QueryGenerateUtils.qnameTypeMap.set(Types.BOOLEAN, "boolean");
    QueryGenerateUtils.qnameTypeMap.set(Types.TIMESTAMP, "dateTime");
    QueryGenerateUtils.qnameTypeMap.set(Types.BIT, "integer");
    QueryGenerateUtils.qnameTypeMap.set(Types.TIME, "time");
    QueryGenerateUtils.qnameTypeMap.set(Types.TINYINT, "integer");
    QueryGenerateUtils.qnameTypeMap.set(Types.BIGINT, "long");
    QueryGenerateUtils.qnameTypeMap.set(Types.LONGVARBINARY, "base64Binary");
    QueryGenerateUtils.qnameTypeMap.set(Types.VARBINARY, "base64Binary");
    QueryGenerateUtils.qnameTypeMap.set(Types.BINARY, "base64Binary");
    QueryGenerateUtils.qnameTypeMap.set(Types.BLOB, "base64Binary");
    QueryGenerateUtils.qnameTypeMap.set(Types.DATE, "date");

  }

  static getInputColumns(query: string): string[] {
    let columns = [];

    if (query == null || isEmpty(query.trim())) {
        return columns;
    }

    let lower = query.toLowerCase().trim();


    if (contains(lower, "select") && contains(lower, "from") && contains(lower, "where")) {
        let wherePart = query.substring(lower.lastIndexOf("where") + 5).trim();
        let conditions = jsplit(wherePart, "(?i)\\s+and\\s+|\\s+or\\s+");

        for (let cond of conditions) {
            if (contains(cond, "=")) {
                columns.push(jsplit(cond, "=")[0].trim());
            }
        }
    }


    else if (contains(lower, "insert") && contains(lower, "into") && contains(lower, "values")) {
        let pattern = Pattern.compile("\\(([^)]+)\\)");
        let matcher = pattern.matcher(query);

        if (matcher.find()) {
            let inside = matcher.group(1);
            inside = jreplace(inside, ":", "");
            let parts = jsplit(inside, ",");

            for (let part of parts) {
                columns.push(part.trim());
            }
        }
    }


    else if (contains(lower, "update") && contains(lower, "set")) {
        let setPart = query.substring(lower.indexOf("set") + 3);
        setPart = replaceAll(setPart, "(?i)where", ",");

        let parts = jsplit(setPart, ",");

        for (let part of parts) {
            if (contains(part, "=")) {
                columns.push(jsplit(part, "=")[0].trim());
            }
        }
    }


    else if (contains(lower, "delete") && contains(lower, "from") && contains(lower, "where")) {
        let wherePart = query.substring(lower.lastIndexOf("where") + 5);
        let conditions = jsplit(wherePart, "(?i)\\s+and\\s+|\\s+or\\s+");

        for (let cond of conditions) {
            if (contains(cond, "=")) {
                columns.push(jsplit(cond, "=")[0].trim());
            }
        }
    }

    return columns;

  }

  static getOutputColumns(query: string, connection: Connection): Map<string, string> {
           let columns = new Map();

           if (query == null || isEmpty(query.trim())) {
               return columns;
           }

           let lower = query.toLowerCase();


           if (!lower.startsWith("select")) {
               return columns;
           }

           if (contains(lower, "select") && contains(lower, "from")) {
               let selectIndex = lower.lastIndexOf("select") + 6;
               let fromIndex = lower.lastIndexOf("from");

               if (selectIndex < fromIndex) {
                   let mappingPart = query.substring(selectIndex, fromIndex).trim();
                   let parts = jsplit(mappingPart, ",");


                   if (parts.length == 1 && equals(parts[0].trim(), "*")) {
                       if (connection != null) {
                           try {
    let stmt = connection.prepareStatement(
                                   replaceAll(query, "(?i)\\s+where\\s+.*$", ""));
                               let meta = stmt.getMetaData();

                               let columnCount = meta.getColumnCount();
                               for (let i = 1; i <= columnCount; i++) {
                                   columns.set(meta.getColumnLabel(i), get(QueryGenerateUtils.qnameTypeMap, meta.getColumnType(i)));
                               }
                           } catch (e) {
                               QueryGenerateUtils.LOGGER.log(Level.SEVERE, "Error retrieving columns for the query." + e);
                               throw e;
                           }
                       } else {
                           QueryGenerateUtils.LOGGER.log(Level.SEVERE,"Connection is null, cannot retrieve columns for SELECT * query.");
                           throw new SQLException("Cannot execute select query as the connection is null.");
                       }
                   }

                   else {
                       for (let part of parts) {
                           columns.set(part.trim(), "string");
                       }
                   }
               }
           }
           return columns;

  }
}
