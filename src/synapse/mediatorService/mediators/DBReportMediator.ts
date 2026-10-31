// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/DBReportMediator.java by the java2ts converter (see tools/java2ts).
import { ConnectionPoolPropertyName } from "../../../syntaxTree/pojo/mediator/advanced/DbMediator/ConnectionPoolPropertyName.js";
import { DbMediatorStatementResult } from "../../../syntaxTree/pojo/mediator/advanced/DbMediator/DbMediatorStatementResult.js";
import { DbMediatorStatementParameter } from "../../../syntaxTree/pojo/mediator/advanced/DbMediator/DbMediatorStatementParameter.js";
import { DbMediatorStatement } from "../../../syntaxTree/pojo/mediator/advanced/DbMediator/DbMediatorStatement.js";
import { DbMediatorConnectionPoolProperty } from "../../../syntaxTree/pojo/mediator/advanced/DbMediator/DbMediatorConnectionPoolProperty.js";
import { DbMediatorConnectionPool } from "../../../syntaxTree/pojo/mediator/advanced/DbMediator/DbMediatorConnectionPool.js";
import { DbMediatorConnection } from "../../../syntaxTree/pojo/mediator/advanced/DbMediator/DbMediatorConnection.js";
import { DbMediator } from "../../../syntaxTree/pojo/mediator/advanced/DbMediator/DbMediator.js";
import { mapPutAllIfAbsent } from "../../../syntaxTree/javaCompat.js";
import { equals, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { Pattern } from "../../host/regex.js";
import { Range } from "../../lsp.js";

export class DBReportMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, dbReport: DbMediator, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let isDbConnection = equals("DB_CONNECTION", get(data, "connectionType"));
    let isCarbonDs = equals("CARBON", get(data, "connectionType"));

    let properties = DBReportMediator.getProperties(data);

    if (Array.isArray(get(data, "sqlStatements"))) {
        let sqlStatements = (get(data, "sqlStatements") as any[]);
        let processedStatements = [];

        for (let statementObj of sqlStatements) {
            if (Array.isArray(statementObj)) {
                let statement = (statementObj as any[]);

                let queryString = (typeof get(statement, 0) === "string") ? (get(statement, 0) as string) : "";

                let parametersList = Array.isArray(get(statement, 1)) ?
                        (get(statement, 1) as any[]) : [];
                let parameters = [];
                for (let parameterObj of parametersList) {
                    if (Array.isArray(parameterObj)) {
                        let parameter = (parameterObj as any[]);
                        let parameterData = new Map();
                        parameterData.set("dataType", get(parameter, 0));
                        parameterData.set("valueLiteral", equals("LITERAL", get(parameter, 1)) ?
                                get(parameter, 2) : null);
                        parameterData.set("valueExpression", equals("EXPRESSION", get(parameter, 1)) &&
                                get(parameter, 3) instanceof Map ?get(((get(parameter, 3) as Map<any, any>)), "value") : null);
                        parameters.push(parameterData);
                    }
                }

                let resultsList = Array.isArray(get(statement, 2)) ?
                        (get(statement, 2) as any[]) : [];
                let results = [];
                for (let resultObj of resultsList) {
                    if (Array.isArray(resultObj)) {
                        let result = (resultObj as any[]);
                        let resultData = new Map();
                        resultData.set("propertyName", get(result, 0));
                        resultData.set("columnId", get(result, 1));
                        results.push(resultData);
                    }
                }

                let processedStatement = new Map();
                processedStatement.set("queryString", queryString);
                processedStatement.set("parameters", parameters);
                processedStatement.set("results", results);
                processedStatements.push(processedStatement);
            }
        }

        data.set("sqlStatements", processedStatements);
    }

    data.set("isDbConnection", isDbConnection);
    data.set("isCarbonDs", isCarbonDs);
    data.set("properties", properties);
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);


  }

  static getDataFromST430(node: DbMediator): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());

    let pool = node.getConnection() != null ? node.getConnection().getPool() : null;
    if (pool != null) {
        data.set("connectionDBType", DBReportMediator.findConnectionType(pool));

        let driver = pool.getDriver();
        if (driver != null && driver.getKey() != null) {
            data.set("isRegistryBasedDriverConfig", true);
            data.set("registryBasedConnectionDBDriver", driver.getKey());
        } else {
            data.set("isRegistryBasedDriverConfig", false);
            data.set("connectionDBDriver", driver != null ? driver.getTextNode() : null);
        }

        let url = pool.getUrl();
        if (url != null && url.getKey() != null) {
            data.set("isRegistryBasedURLConfig", true);
            data.set("registryBasedURLConfigKey", url.getKey());
        } else {
            data.set("isRegistryBasedURLConfig", false);
            data.set("connectionURL", url != null ? url.getTextNode() : null);
        }

        let user = pool.getUser();
        if (user != null && user.getKey() != null) {
            data.set("isRegistryBasedUserConfig", true);
            data.set("registryBasedUserConfigKey", user.getKey());
        } else {
            data.set("isRegistryBasedUserConfig", false);
            data.set("connectionUsername", user != null ? user.getTextNode() : null);
        }

        let password = pool.getPassword();
        if (password != null && password.getKey() != null) {
            data.set("isRegistryBasedPassConfig", true);
            data.set("registryBasedPassConfigKey", password.getKey());
        } else {
            data.set("isRegistryBasedPassConfig", false);
            data.set("connectionPassword", password != null ? password.getTextNode() : null);
        }

        data.set("connectionDSName", pool.getDsName() != null ? pool.getDsName().getTextNode() : null);
        data.set("connectionDSInitialContext", pool.getIcClass() != null ? pool.getIcClass().getTextNode() : null);

        if (get(data, "connectionDBDriver") != null || get(data, "registryBasedConnectionDBDriver") != null) {
            data.set("connectionType", "DB_CONNECTION");
        } else {
            data.set("connectionType", "DATA_SOURCE");
        }

        DBReportMediator.getPropertiesFromPool(pool.getProperty(), data);
    }

    let sqlStatements = [];
    for (let statement of node.getStatement()) {
        let sql = DBReportMediator.extractSql(statement.getSql());

        let parameters = [];
        for (let parameter of statement.getParameter()) {
            let paramData = [
                    parameter.getType() != null ? String(parameter.getType()) : "",
                    parameter.getValue() != null ? "LITERAL" : "EXPRESSION",
                    parameter.getValue() != null ? parameter.getValue() : "",
                    new Map<string, any>([["isExpression", true], ["value", parameter.getExpression() != null ?
                            parameter.getExpression() : ""]])
            ];
            parameters.push(paramData);
        }

        let results = [];
        for (let result of statement.getResult()) {
            results.push([result.getName() != null ? result.getName() : "", result.getColumn() != null ?
                    result.getColumn() : ""]);
        }

        sqlStatements.push([sql, parameters, results]);
    }
    data.set("sqlStatements", sqlStatements);
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }

  static getProperties(data: Map<string, any>): Map<string, any>[] {
    let properties = [];

    if (!equals("DEFAULT", get(data, "propertyAutocommit"))) {
        properties.push(new Map<string, any>([["propertyName", "autocommit"], ["propertyValue", get(data, "propertyAutocommit") != null ? get(data, "propertyAutocommit") : ""]]));
    }
    if (!equals("DEFAULT", get(data, "propertyIsolation"))) {
        properties.push(new Map<string, any>([["propertyName", "isolation"], ["propertyValue", get(data, "propertyIsolation") != null ? get(data, "propertyIsolation") : ""]]));
    }
    if (!equals("-1", get(data, "propertyMaxActive"))) {
        properties.push(new Map<string, any>([["propertyName", "maxactive"], ["propertyValue", get(data, "propertyMaxActive") != null ? get(data, "propertyMaxActive") : ""]]));
    }
    if (!equals("-1", get(data, "propertyMaxIdle"))) {
        properties.push(new Map<string, any>([["propertyName", "maxidle"], ["propertyValue", get(data, "propertyMaxIdle") != null ? get(data, "propertyMaxIdle") : ""]]));
    }
    if (!equals("-1", get(data, "propertyMaxOpenStatements"))) {
        properties.push(new Map<string, any>([["propertyName", "maxopenstatements"], ["propertyValue", get(data, "propertyMaxOpenStatements") != null ? get(data, "propertyMaxOpenStatements") : ""]]));
    }
    if (!equals("-1", get(data, "propertyMaxWait"))) {
        properties.push(new Map<string, any>([["propertyName", "maxwait"], ["propertyValue", get(data, "propertyMaxWait") != null ? get(data, "propertyMaxWait") : ""]]));
    }
    if (!equals("-1", get(data, "propertyMinIdle"))) {
        properties.push(new Map<string, any>([["propertyName", "minidle"], ["propertyValue", get(data, "propertyMinIdle") != null ? get(data, "propertyMinIdle") : ""]]));
    }
    if (!equals("DEFAULT", get(data, "propertyPoolStatements"))) {
        properties.push(new Map<string, any>([["propertyName", "poolstatements"], ["propertyValue", get(data, "propertyPoolStatements") != null ? get(data, "propertyPoolStatements") : ""]]));
    }
    if (!equals("DEFAULT", get(data, "propertyTestOnBorrow"))) {
        properties.push(new Map<string, any>([["propertyName", "testonborrow"], ["propertyValue", get(data, "propertyTestOnBorrow") != null ? get(data, "propertyTestOnBorrow") : ""]]));
    }
    if (!equals("DEFAULT", get(data, "propertyTestWhileIdle"))) {
        properties.push(new Map<string, any>([["propertyName", "testwhileidle"], ["propertyValue", get(data, "propertyTestWhileIdle") != null ? get(data, "propertyTestWhileIdle") : ""]]));
    }
    if (get(data, "propertyValidationQuery") != null) {
        properties.push(new Map<string, any>([["propertyName", "validationquery"], ["propertyValue", get(data, "propertyValidationQuery") != null ? get(data, "propertyValidationQuery") : ""]]));
    }
    if (!equals("-1", get(data, "propertyInitialSize"))) {
        properties.push(new Map<string, any>([["propertyName", "initialsize"], ["propertyValue", get(data, "propertyInitialSize") != null ? get(data, "propertyInitialSize") : ""]]));
    }

    return properties;

  }

  static getPropertiesFromPool(properties: DbMediatorConnectionPoolProperty[], data: Map<string, any>): void {
    let defaults = new Map<string, any>([["propertyAutocommit", "DEFAULT"], ["propertyIsolation", "DEFAULT"], ["propertyMaxActive", "-1"], ["propertyMaxIdle", "-1"], ["propertyMaxOpenStatements", "-1"], ["propertyMaxWait", "-1"], ["propertyMinIdle", "-1"], ["propertyPoolStatements", "DEFAULT"], ["propertyTestOnBorrow", "DEFAULT"], ["propertyTestWhileIdle", "DEFAULT"]]);

    if (properties != null) {
        for (let property of properties) {
            switch (property.getName()) {
                case ConnectionPoolPropertyName.autocommit:
                    data.set("propertyAutocommit", property.getValue());
                    break;
                case ConnectionPoolPropertyName.isolation:
                    data.set("propertyIsolation", property.getValue());
                    break;
                case ConnectionPoolPropertyName.maxactive:
                    data.set("propertyMaxActive", property.getValue());
                    break;
                case ConnectionPoolPropertyName.maxidle:
                    data.set("propertyMaxIdle", property.getValue());
                    break;
                case ConnectionPoolPropertyName.maxopenstatements:
                    data.set("propertyMaxOpenStatements", property.getValue());
                    break;
                case ConnectionPoolPropertyName.maxwait:
                    data.set("propertyMaxWait", property.getValue());
                    break;
                case ConnectionPoolPropertyName.minidle:
                    data.set("propertyMinIdle", property.getValue());
                    break;
                case ConnectionPoolPropertyName.poolstatements:
                    data.set("propertyPoolStatements", property.getValue());
                    break;
                case ConnectionPoolPropertyName.testonborrow:
                    data.set("propertyTestOnBorrow", property.getValue());
                    break;
                case ConnectionPoolPropertyName.testwhileidle:
                    data.set("propertyTestWhileIdle", property.getValue());
                    break;
                case ConnectionPoolPropertyName.validationquery:
                    data.set("propertyValidationQuery", property.getValue());
                    break;
                case ConnectionPoolPropertyName.initialsize:
                    data.set("propertyInitialSize", property.getValue());
                    break;
                default:
                    break;
            }
        }
    }

    mapPutAllIfAbsent(data, defaults);

  }

  static findConnectionType(pool: DbMediatorConnectionPool): string {
    let driver = pool.getDriver() != null ? pool.getDriver().getTextNode() : null;
    let url = pool.getUrl() != null ? pool.getUrl().getTextNode() : null;

    if (equals("com.mysql.jdbc.Driver", driver) && url != null && url.startsWith("jdbc:mysql://")) {
        return "MYSQL";
    } else if (equals("oracle.jdbc.OracleDriver", driver) && url != null && url.startsWith("jdbc:oracle:thin:")) {
        return "ORACLE";
    } else if (equals("com.microsoft.sqlserver.jdbc.SQLServerDriver", driver) && url != null && url.startsWith("jdbc:sqlserver://")) {
        return "MSSQL";
    } else if (equals("org.postgresql.Driver", driver) && url != null && url.startsWith("jdbc:postgresql://")) {
        return "POSTGRESQL";
    } else {
        return "OTHER";
    }

  }

  static extractSql(sql: string): string {
    if (sql != null) {
        let pattern = Pattern.compile("<!\\[CDATA\\[(.*?)]]>");
        let matcher = pattern.matcher(sql);
        if (matcher.find()) {
            return matcher.group(1);
        }
    }
    return "";

  }
}
