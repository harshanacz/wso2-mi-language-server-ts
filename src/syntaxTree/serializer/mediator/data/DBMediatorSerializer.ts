// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/data/DBMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { DbMediator } from "../../../pojo/mediator/advanced/DbMediator/DbMediator.js";
import { DbMediatorConnection } from "../../../pojo/mediator/advanced/DbMediator/DbMediatorConnection.js";
import { DbMediatorConnectionPool } from "../../../pojo/mediator/advanced/DbMediator/DbMediatorConnectionPool.js";
import { DbMediatorConnectionPoolProperty } from "../../../pojo/mediator/advanced/DbMediator/DbMediatorConnectionPoolProperty.js";
import { DbMediatorStatement } from "../../../pojo/mediator/advanced/DbMediator/DbMediatorStatement.js";
import { DbMediatorStatementParameter } from "../../../pojo/mediator/advanced/DbMediator/DbMediatorStatementParameter.js";
import { DbMediatorStatementResult } from "../../../pojo/mediator/advanced/DbMediator/DbMediatorStatementResult.js";
import { OMElement } from "../../../om/om.js";
import { SerializerUtils } from "../../SerializerUtils.js";

export abstract class DBMediatorSerializer extends AbstractMediatorSerializer {
  serializeDBMediator(dbMediator: DbMediator): OMElement {
    let dbMediatorElt = AbstractMediatorSerializer.fac.createOMElement("db", AbstractMediatorSerializer.synNS);

    this.serializeAttributes(dbMediator, dbMediatorElt);
    this.serializeChildren(dbMediator, dbMediatorElt);
    return dbMediatorElt;

  }

  serializeAttributes(dbMediator: DbMediator, dbMediatorElt: OMElement): void {
    if (dbMediator.isUseTransaction()) {
        dbMediatorElt.addAttribute("useTransaction", "true", null);
    }
    if (dbMediator.getDescription() != null) {
        dbMediatorElt.addAttribute("description", dbMediator.getDescription(), null);
    }

  }

  serializeChildren(dbMediator: DbMediator, dbMediatorElt: OMElement): void {
    if (dbMediator.getConnection() != null) {
        this.serializeConnection(dbMediator.getConnection(), dbMediatorElt);
    }
    if (dbMediator.getStatement() != null) {
        this.serializeStatements(dbMediator.getStatement(), dbMediatorElt);
    }

  }

  serializeConnection(connection: DbMediatorConnection, dbMediatorElt: OMElement): void {
    let connectionElt = AbstractMediatorSerializer.fac.createOMElement("connection", AbstractMediatorSerializer.synNS);

    if (connection.getPool() != null) {
        let poolElt = AbstractMediatorSerializer.fac.createOMElement("pool", AbstractMediatorSerializer.synNS);
        this.serializeConnectionPool(connection.getPool(), poolElt);
        connectionElt.addChild(poolElt);
    } else {
        this.handleException("Connection pool is required for DB mediator");
    }

    dbMediatorElt.addChild(connectionElt);


  }

  serializeConnectionPool(pool: DbMediatorConnectionPool, connectionElt: OMElement): void {
    if (pool.getDsName() != null) {
        let dsNameElt = AbstractMediatorSerializer.fac.createOMElement("dsName", AbstractMediatorSerializer.synNS);
        if (pool.getDsName().getValue() != null) {
            dsNameElt.addAttribute("value", pool.getDsName().getValue(), null);
        } else {
            dsNameElt.setText(pool.getDsName().getTextNode());
        }
        connectionElt.addChild(dsNameElt);
    }

    if (pool.getIcClass() != null) {
        let icClassElt = AbstractMediatorSerializer.fac.createOMElement("icClass", AbstractMediatorSerializer.synNS);
        if (pool.getIcClass().getValue() != null) {
            icClassElt.addAttribute("value", pool.getIcClass().getValue(), null);
        } else {
            icClassElt.setText(pool.getIcClass().getTextNode());
        }
        connectionElt.addChild(icClassElt);
    }

    if (pool.getDriver() != null) {
        let driverElt = AbstractMediatorSerializer.fac.createOMElement("driver", AbstractMediatorSerializer.synNS);
        if (pool.getDriver().getValue() != null) {
            driverElt.addAttribute("value", pool.getDriver().getValue(), null);
        } else {
            driverElt.setText(pool.getDriver().getTextNode());
        }
        connectionElt.addChild(driverElt);
    }

    if (pool.getUrl() != null) {
        let urlElt = AbstractMediatorSerializer.fac.createOMElement("url", AbstractMediatorSerializer.synNS);
        if (pool.getUrl().getValue() != null) {
            urlElt.addAttribute("value", pool.getUrl().getValue(), null);
        } else {
            urlElt.setText(pool.getUrl().getTextNode());
        }
        connectionElt.addChild(urlElt);
    }

    if (pool.getUser() != null) {
        let userElt = AbstractMediatorSerializer.fac.createOMElement("user", AbstractMediatorSerializer.synNS);
        if (pool.getUser().getValue() != null) {
            userElt.addAttribute("value", pool.getUser().getValue(), null);
        } else {
            userElt.setText(pool.getUser().getTextNode());
        }
        connectionElt.addChild(userElt);
    }

    if (pool.getPassword() != null) {
        let passwordElt = AbstractMediatorSerializer.fac.createOMElement("password", AbstractMediatorSerializer.synNS);
        if (pool.getPassword().getValue() != null) {
            passwordElt.addAttribute("value", pool.getPassword().getValue(), null);
        } else {
            passwordElt.setText(pool.getPassword().getTextNode());
        }
        connectionElt.addChild(passwordElt);
    }

    if (pool.getProperty() != null) {
        this.serializeProperties(pool.getProperty(), connectionElt);
    }

  }

  serializeProperties(properties: DbMediatorConnectionPoolProperty[], connectionElt: OMElement): void {
    for (let property of properties) {
        let propertyElt = this.serializeProperty(property);
        connectionElt.addChild(propertyElt);
    }

  }

  serializeProperty(property: DbMediatorConnectionPoolProperty): OMElement {
    let propertyElt = AbstractMediatorSerializer.fac.createOMElement("property", AbstractMediatorSerializer.synNS);
    if (property.getName() != null) {
        propertyElt.addAttribute("name", property.getName().name(), null);
    }
    if (property.getValue() != null) {
        propertyElt.addAttribute("value", property.getValue(), null);
    }
    return propertyElt;

  }

  serializeStatements(statement: DbMediatorStatement[], dbMediatorElt: OMElement): void {
    for (let stmt of statement) {
        let statementElt = this.serializeStatement(stmt);
        dbMediatorElt.addChild(statementElt);
    }

  }

  serializeStatement(stmt: DbMediatorStatement): OMElement {
    let statementElt = AbstractMediatorSerializer.fac.createOMElement("statement", AbstractMediatorSerializer.synNS);
    if (stmt.getSql() != null) {
        let sqlElt = AbstractMediatorSerializer.fac.createOMElement("sql", AbstractMediatorSerializer.synNS);
        let sql = stmt.getSql();
        if (sql.startsWith("<![CDATA[")) {
            let cdata = SerializerUtils.stringToCDATA(sql);
            sqlElt.addChild(cdata);
        } else {
            sqlElt.setText(stmt.getSql());
        }
        statementElt.addChild(sqlElt);
    }
    if (stmt.getParameter() != null) {
        this.serializeParameters(stmt.getParameter(), statementElt);
    }
    if (stmt.getResult() != null) {
        this.serializeResults(stmt.getResult(), statementElt);
    }

    return statementElt;

  }

  serializeParameters(parameter: DbMediatorStatementParameter[], statementElt: OMElement): void {
    for (let param of parameter) {
        let paramElt = this.serializeParameter(param);
        statementElt.addChild(paramElt);
    }

  }

  serializeParameter(param: DbMediatorStatementParameter): OMElement {
    let paramElt = AbstractMediatorSerializer.fac.createOMElement("parameter", AbstractMediatorSerializer.synNS);
    if (param.getType() != null) {
        paramElt.addAttribute("type", param.getType().name(), null);
    }
    if (param.getValue() != null) {
        paramElt.addAttribute("value", param.getValue(), null);
    } else if (param.getExpression() != null) {
        SerializerUtils.serializeExpression(param.getExpression(), paramElt, "expression", param);
    }
    return paramElt;

  }

  serializeResults(result: DbMediatorStatementResult[], statementElt: OMElement): void {
    for (let res of result) {
        let resultElt = this.serializeResult(res);
        statementElt.addChild(resultElt);
    }

  }

  serializeResult(res: DbMediatorStatementResult): OMElement {
    let resultElt = AbstractMediatorSerializer.fac.createOMElement("result", AbstractMediatorSerializer.synNS);
    if (res.getColumn() != null) {
        resultElt.addAttribute("column", res.getColumn(), null);
    }
    if (res.getName() != null) {
        resultElt.addAttribute("name", res.getName(), null);
    }
    return resultElt;

  }
}
