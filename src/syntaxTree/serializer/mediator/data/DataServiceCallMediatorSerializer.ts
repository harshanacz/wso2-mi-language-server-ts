// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/data/DataServiceCallMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { DataServiceCall } from "../../../pojo/mediator/advanced/DataServiceCall/DataServiceCall.js";
import { DataServiceCallOperations } from "../../../pojo/mediator/advanced/DataServiceCall/DataServiceCallOperations.js";
import { DataServiceCallOperationsOperation } from "../../../pojo/mediator/advanced/DataServiceCall/DataServiceCallOperationsOperation.js";
import { DataServiceCallOperationsOperationParam } from "../../../pojo/mediator/advanced/DataServiceCall/DataServiceCallOperationsOperationParam.js";
import { DataServiceCallSource } from "../../../pojo/mediator/advanced/DataServiceCall/DataServiceCallSource.js";
import { DataServiceCallTarget } from "../../../pojo/mediator/advanced/DataServiceCall/DataServiceCallTarget.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";

export class DataServiceCallMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let dataServiceCall = (m as DataServiceCall);
    let dataServiceCallElt = AbstractMediatorSerializer.fac.createOMElement("dataServiceCall", AbstractMediatorSerializer.synNS);

    this.serializeAttributes(dataServiceCall, dataServiceCallElt);
    this.serializeChildren(dataServiceCall, dataServiceCallElt);

    return dataServiceCallElt;

  }

  serializeAttributes(dataServiceCall: DataServiceCall, dataServiceCallElt: OMElement): void {
    if (dataServiceCall.getServiceName() != null) {
        dataServiceCallElt.addAttribute("serviceName", dataServiceCall.getServiceName(), null);
    }
    if (dataServiceCall.getDescription() != null) {
        dataServiceCallElt.addAttribute("description", dataServiceCall.getDescription(), null);
    }

  }

  serializeChildren(dataServiceCall: DataServiceCall, dataServiceCallElt: OMElement): void {
    this.serializeSource(dataServiceCall.getSource(), dataServiceCallElt);
    this.serializeOperations(dataServiceCall.getOperations(), dataServiceCallElt);
    this.serializeTarget(dataServiceCall.getTarget(), dataServiceCallElt);

  }

  serializeSource(source: DataServiceCallSource, dataServiceCallElt: OMElement): void {
    if (source != null) {
        let sourceElt = AbstractMediatorSerializer.fac.createOMElement("source", AbstractMediatorSerializer.synNS);
        if (source.getType() != null) {
            sourceElt.addAttribute("type", source.getType().name(), AbstractMediatorSerializer.nullNS);
        }
        dataServiceCallElt.addChild(sourceElt);
    }

  }

  serializeOperations(operations: DataServiceCallOperations, dataServiceCallElt: OMElement): void {
    if (operations != null) {
        let operationsElt = AbstractMediatorSerializer.fac.createOMElement("operations", AbstractMediatorSerializer.synNS);
        if (operations.getType() != null) {
            operationsElt.addAttribute("type", operations.getType().getValue(), AbstractMediatorSerializer.nullNS);
        }
        if (operations.getOperation() != null) {
            for (let operation of operations.getOperation()) {
                let operationElt = this.serializeOperation(operation);
                operationsElt.addChild(operationElt);
            }
        }
        dataServiceCallElt.addChild(operationsElt);
    }

  }

  serializeOperation(operation: DataServiceCallOperationsOperation): OMElement {
    let operationElt = AbstractMediatorSerializer.fac.createOMElement("operation", AbstractMediatorSerializer.synNS);
    if (operation.getName() != null) {
        operationElt.addAttribute("name", operation.getName(), AbstractMediatorSerializer.nullNS);
    }
    if (operation.getParam() != null) {
        for (let param of operation.getParam()) {
            let paramElt = this.serializeParam(param);
            operationElt.addChild(paramElt);
        }
    }
    return operationElt;

  }

  serializeParam(param: DataServiceCallOperationsOperationParam): OMElement {
    let paramElt = AbstractMediatorSerializer.fac.createOMElement("param", AbstractMediatorSerializer.synNS);
    if (param.getName() != null) {
        paramElt.addAttribute("name", param.getName(), AbstractMediatorSerializer.nullNS);
    }
    if (param.getValue() != null) {
        paramElt.addAttribute("value", param.getValue(), AbstractMediatorSerializer.nullNS);
    } else if (param.getExpression() != null) {
        paramElt.addAttribute("expression", param.getExpression(), AbstractMediatorSerializer.nullNS);
        paramElt.addAttribute("evaluator", param.getEvaluator(), AbstractMediatorSerializer.nullNS);
    }
    return paramElt;

  }

  serializeTarget(target: DataServiceCallTarget, dataServiceCallElt: OMElement): void {
    if (target != null) {
        let targetElt = AbstractMediatorSerializer.fac.createOMElement("target", AbstractMediatorSerializer.synNS);
        if (target.getType() != null) {
            targetElt.addAttribute("type", target.getType().name(), AbstractMediatorSerializer.nullNS);
        }
        if (target.getName() != null) {
            targetElt.addAttribute("name", target.getName(), AbstractMediatorSerializer.nullNS);
        }
        dataServiceCallElt.addChild(targetElt);
    }

  }

  getMediatorClassName(): string {
    return "DataServiceCall";

  }
}
