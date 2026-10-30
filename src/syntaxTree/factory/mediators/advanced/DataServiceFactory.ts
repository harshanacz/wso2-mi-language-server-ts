// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/advanced/DataServiceFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DataServiceCall } from "../../../pojo/mediator/advanced/DataServiceCall/DataServiceCall.js";
import { DataServiceCallOperations } from "../../../pojo/mediator/advanced/DataServiceCall/DataServiceCallOperations.js";
import { DataServiceCallOperationsOperation } from "../../../pojo/mediator/advanced/DataServiceCall/DataServiceCallOperationsOperation.js";
import { DataServiceCallOperationsOperationParam } from "../../../pojo/mediator/advanced/DataServiceCall/DataServiceCallOperationsOperationParam.js";
import { DataServiceCallOperationsType } from "../../../pojo/mediator/advanced/DataServiceCall/DataServiceCallOperationsType.js";
import { DataServiceCallSource } from "../../../pojo/mediator/advanced/DataServiceCall/DataServiceCallSource.js";
import { DataServiceCallSourceType } from "../../../pojo/mediator/advanced/DataServiceCall/DataServiceCallSourceType.js";
import { DataServiceCallTarget } from "../../../pojo/mediator/advanced/DataServiceCall/DataServiceCallTarget.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { TargetType } from "../../../pojo/misc/TargetType.js";

export class DataServiceFactory extends AbstractMediatorFactory {
  static readonly DATA_SERVICE_MEDIATOR: string = "dataservicecall";

  createSpecificMediator(element: DOMElement): Mediator {
    let dataServiceCall = new DataServiceCall();
    dataServiceCall.elementNode(element);
    this.populateAttributes(dataServiceCall, element);
    let children = element.getChildren();
    for (let node of children) {
        if (equalsIgnoreCase(node.getNodeName(), Constant.SOURCE)) {
            let dataServiceCallSource = this.createDataServiceCallSource((node as DOMElement));
            dataServiceCall.setSource(dataServiceCallSource);
        } else if (equalsIgnoreCase(node.getNodeName(), Constant.OPERATIONS)) {
            let dataServiceCallOperations =
                    this.createDataServiceCallOperations((node as DOMElement));
            dataServiceCall.setOperations(dataServiceCallOperations);
        } else if (equalsIgnoreCase(node.getNodeName(), Constant.TARGET)) {
            let dataServiceCallTarget = this.createDataServiceCallTarget((node as DOMElement));
            dataServiceCall.setTarget(dataServiceCallTarget);
        } else {

        }
    }
    return dataServiceCall;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let dataServiceCall = (node as DataServiceCall);
    let serviceName = element.getAttribute(Constant.SERVICE_NAME);
    if (serviceName != null) {
        dataServiceCall.setServiceName(serviceName);
    }

    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        dataServiceCall.setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        dataServiceCall.setTraceFilter(traceFilter);
    }

  }

  createDataServiceCallSource(element: DOMElement): DataServiceCallSource {
    let dataServiceCallSource = new DataServiceCallSource();
    dataServiceCallSource.elementNode(element);
    let type = element.getAttribute(Constant.TYPE);
    let typeEnum = getEnumFromValue(type, DataServiceCallSourceType);
    if (typeEnum != null) {
        dataServiceCallSource.setType(typeEnum);
    }
    return dataServiceCallSource;

  }

  createDataServiceCallOperations(element: DOMElement): DataServiceCallOperations {
    let dataServiceCallOperations = new DataServiceCallOperations();
    dataServiceCallOperations.elementNode(element);
    let type = element.getAttribute(Constant.TYPE);
    let typeEnum = getEnumFromValue(type, DataServiceCallOperationsType);
    if (typeEnum != null) {
        dataServiceCallOperations.setType(typeEnum);
    }
    let children = element.getChildren();
    let operationsOperationList = [];
    for (let node of children) {
        if (equalsIgnoreCase(node.getNodeName(), Constant.OPERATION)) {
            let dataServiceCallOperationsOperation =
                    this.createDataServiceCallOperationsOperation((node as DOMElement));
            operationsOperationList.push(dataServiceCallOperationsOperation);
        } else {

        }
    }
    dataServiceCallOperations.setOperation(operationsOperationList.slice());
    return dataServiceCallOperations;

  }

  createDataServiceCallOperationsOperation(element: DOMElement): DataServiceCallOperationsOperation {
    let dataServiceCallOperationsOperation =
            new DataServiceCallOperationsOperation();
    dataServiceCallOperationsOperation.elementNode(element);
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        dataServiceCallOperationsOperation.setName(name);
    }
    let children = element.getChildren();
    let dataServiceCallOperationsOperationParamList = [];
    for (let node of children) {
        if (equalsIgnoreCase(node.getNodeName(), Constant.PARAM)) {
            let dataServiceCallOperationsOperationParam =
                    this.createDataServiceCallOperationsOperationParam((node as DOMElement));
            dataServiceCallOperationsOperationParamList.push(dataServiceCallOperationsOperationParam);
        } else {

        }
    }
    dataServiceCallOperationsOperation.setParam(dataServiceCallOperationsOperationParamList.slice());
    return dataServiceCallOperationsOperation;

  }

  createDataServiceCallOperationsOperationParam(element: DOMElement): DataServiceCallOperationsOperationParam {
    let dataServiceCallOperationsOperationParam =
            new DataServiceCallOperationsOperationParam();
    dataServiceCallOperationsOperationParam.elementNode(element);
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        dataServiceCallOperationsOperationParam.setName(name);
    }
    let value = element.getAttribute(Constant.VALUE);
    if (value != null) {
        dataServiceCallOperationsOperationParam.setValue(value);
    }
    let expression = element.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        dataServiceCallOperationsOperationParam.setExpression(expression);
    }
    let evaluator = element.getAttribute(Constant.EVALUATOR);
    if (evaluator != null) {
        dataServiceCallOperationsOperationParam.setEvaluator(evaluator);
    }
    return dataServiceCallOperationsOperationParam;

  }

  createDataServiceCallTarget(element: DOMElement): DataServiceCallTarget {
    let dataServiceCallTarget = new DataServiceCallTarget();
    dataServiceCallTarget.elementNode(element);
    let type = element.getAttribute(Constant.TYPE);
    let typeEnum = getEnumFromValue(type, TargetType);
    if (typeEnum != null) {
        dataServiceCallTarget.setType(typeEnum);
    }
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        dataServiceCallTarget.setName(name);
    }
    return dataServiceCallTarget;

  }

  getTagName(): string {
    return DataServiceFactory.DATA_SERVICE_MEDIATOR;

  }
}
