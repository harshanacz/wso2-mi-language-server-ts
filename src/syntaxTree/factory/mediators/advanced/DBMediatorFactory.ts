// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/advanced/DBMediatorFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, parseBoolean, getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { ConnectionPoolPropertyName } from "../../../pojo/mediator/advanced/DbMediator/ConnectionPoolPropertyName.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DbMediator } from "../../../pojo/mediator/advanced/DbMediator/DbMediator.js";
import { DbMediatorConnection } from "../../../pojo/mediator/advanced/DbMediator/DbMediatorConnection.js";
import { DbMediatorConnectionPool } from "../../../pojo/mediator/advanced/DbMediator/DbMediatorConnectionPool.js";
import { DbMediatorConnectionPoolProperty } from "../../../pojo/mediator/advanced/DbMediator/DbMediatorConnectionPoolProperty.js";
import { DbMediatorStatement } from "../../../pojo/mediator/advanced/DbMediator/DbMediatorStatement.js";
import { DbMediatorStatementParameter } from "../../../pojo/mediator/advanced/DbMediator/DbMediatorStatementParameter.js";
import { DbMediatorStatementResult } from "../../../pojo/mediator/advanced/DbMediator/DbMediatorStatementResult.js";
import { KeyAttribute } from "../../../pojo/mediator/advanced/KeyAttribute.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { StatementParameterType } from "../../../pojo/mediator/advanced/DbMediator/StatementParameterType.js";
import { Utils } from "../../../utils.js";

export abstract class DBMediatorFactory extends AbstractMediatorFactory {
  createSpecificMediator(element: DOMElement): Mediator {
    let dbMediator = new DbMediator();
    dbMediator.elementNode(element);
    this.populateAttributes(dbMediator, element);
    let children = element.getChildren();
    let dbMediatorStatementList = [];
    for (let node of children) {
        if (equalsIgnoreCase(node.getNodeName(), Constant.CONNECTION)) {
            let dbMediatorConnection = this.createDbMediatorConnection((node as DOMElement));
            dbMediator.setConnection(dbMediatorConnection);
        } else if (equalsIgnoreCase(node.getNodeName(), Constant.STATEMENT)) {
            let dbMediatorStatement = this.createDbMediatorStatement((node as DOMElement));
            dbMediatorStatementList.push(dbMediatorStatement);
        } else {

        }
    }
    dbMediator.setStatement(dbMediatorStatementList.slice());

    return dbMediator;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let dbMediator = (node as DbMediator);
    let useTransaction = element.getAttribute(Constant.USE_TRANSACTION);
    if (useTransaction != null) {
        dbMediator.setUseTransaction(parseBoolean(useTransaction));
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        dbMediator.setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        dbMediator.setTraceFilter(traceFilter);
    }

  }

  createDbMediatorConnection(element: DOMElement): DbMediatorConnection {
    let dbMediatorConnection = new DbMediatorConnection();
    dbMediatorConnection.elementNode(element);
    let children = element.getChildren();
    for (let node of children) {
        if (equalsIgnoreCase(node.getNodeName(), Constant.POOL)) {
            let dbMediatorPool = this.createDbMediatorPool((node as DOMElement));
            dbMediatorConnection.setPool(dbMediatorPool);
        } else {

        }
    }
    return dbMediatorConnection;

  }

  createDbMediatorPool(element: DOMElement): DbMediatorConnectionPool {
    let dbMediatorPool = new DbMediatorConnectionPool();
    dbMediatorPool.elementNode(element);
    let children = element.getChildren();
    let dbMediatorConnectionPoolPropertyList = [];
    for (let node of children) {
        if (equalsIgnoreCase(node.getNodeName(), Constant.DS_NAME)) {
            let dbMediatorDsName = this.createKeyAttribute((node as DOMElement));
            dbMediatorPool.setDsName(dbMediatorDsName);
        } else if (equalsIgnoreCase(node.getNodeName(), Constant.IC_CLASS)) {
            let dbMediatorIcClass = this.createKeyAttribute((node as DOMElement));
            dbMediatorPool.setIcClass(dbMediatorIcClass);
        } else if (equalsIgnoreCase(node.getNodeName(), Constant.DRIVER)) {
            let dbMediatorDriver = this.createKeyAttribute((node as DOMElement));
            dbMediatorPool.setDriver(dbMediatorDriver);
        } else if (equalsIgnoreCase(node.getNodeName(), Constant.URL)) {
            let dbMediatorUrl = this.createKeyAttribute((node as DOMElement));
            dbMediatorPool.setUrl(dbMediatorUrl);
        } else if (equalsIgnoreCase(node.getNodeName(), Constant.USER)) {
            let dbMediatorUser = this.createKeyAttribute((node as DOMElement));
            dbMediatorPool.setUser(dbMediatorUser);
        } else if (equalsIgnoreCase(node.getNodeName(), Constant.PASSWORD)) {
            let dbMediatorPassword = this.createKeyAttribute((node as DOMElement));
            dbMediatorPool.setPassword(dbMediatorPassword);
        } else if (equalsIgnoreCase(node.getNodeName(), Constant.PROPERTY)) {
            let dbMediatorProperty = this.createDbMediatorProperty((node as DOMElement));
            dbMediatorConnectionPoolPropertyList.push(dbMediatorProperty);
        } else {

        }
        dbMediatorPool.setProperty(dbMediatorConnectionPoolPropertyList.slice());
    }
    return dbMediatorPool;

  }

  createDbMediatorProperty(node: DOMElement): DbMediatorConnectionPoolProperty {
    let dbMediatorProperty = new DbMediatorConnectionPoolProperty();
    dbMediatorProperty.elementNode(node);
    let name = node.getAttribute(Constant.NAME);
    let nameEnum = getEnumFromValue(name, ConnectionPoolPropertyName);
    if (nameEnum != null) {
        dbMediatorProperty.setName(nameEnum);
    }
    let value = node.getAttribute(Constant.VALUE);
    if (value != null) {
        dbMediatorProperty.setValue(value);
    }
    return dbMediatorProperty;

  }

  createKeyAttribute(node: DOMElement): KeyAttribute {
    let keyAttribute = new KeyAttribute();
    keyAttribute.elementNode(node);
    let key = node.getAttribute(Constant.KEY);
    if (key != null) {
        keyAttribute.setKey(key);
    }
    let value = node.getNodeValue();
    keyAttribute.setValue(value);
    return keyAttribute;

  }

  createDbMediatorStatement(element: DOMElement): DbMediatorStatement {
    let dbMediatorStatement = new DbMediatorStatement();
    dbMediatorStatement.elementNode(element);
    let children = element.getChildren();
    let dbMediatorStatementParameterList = [];
    let dbMediatorStatementResultList = [];
    for (let node of children) {
        if (equalsIgnoreCase(node.getNodeName(), Constant.SQL)) {
            let sql = Utils.getInlineString(node.getFirstChild());
            dbMediatorStatement.setSql(sql);
        } else if (equalsIgnoreCase(node.getNodeName(), Constant.PARAMETER)) {
            let dbMediatorStatementParameter =
                    this.createDbMediatorStatementParameter((node as DOMElement));
            dbMediatorStatementParameterList.push(dbMediatorStatementParameter);
        } else if (equalsIgnoreCase(node.getNodeName(), Constant.RESULT)) {
            let dbMediatorStatementResult =
                    this.createDbMediatorStatementResult((node as DOMElement));
            dbMediatorStatementResultList.push(dbMediatorStatementResult);
        } else {

        }
    }
    dbMediatorStatement.setParameter(dbMediatorStatementParameterList.slice());
    dbMediatorStatement.setResult(dbMediatorStatementResultList.slice());
    return dbMediatorStatement;

  }

  createDbMediatorStatementParameter(node: DOMElement): DbMediatorStatementParameter {
    let dbMediatorStatementParameter = new DbMediatorStatementParameter();
    dbMediatorStatementParameter.elementNode(node);
    let type = node.getAttribute(Constant.TYPE);
    let typeEnum = getEnumFromValue(type, StatementParameterType);
    if (typeEnum != null) {
        dbMediatorStatementParameter.setType(typeEnum);
    }
    let value = node.getAttribute(Constant.VALUE);
    if (value != null) {
        dbMediatorStatementParameter.setValue(value);
    }
    let expression = node.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        dbMediatorStatementParameter.setExpression(expression);
    }
    return dbMediatorStatementParameter;

  }

  createDbMediatorStatementResult(node: DOMElement): DbMediatorStatementResult {
    let dbMediatorStatementResult = new DbMediatorStatementResult();
    dbMediatorStatementResult.elementNode(node);
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        dbMediatorStatementResult.setName(name);
    }
    let column = node.getAttribute(Constant.COLUMN);
    if (column != null) {
        dbMediatorStatementResult.setColumn(column);
    }
    return dbMediatorStatementResult;

  }
}
