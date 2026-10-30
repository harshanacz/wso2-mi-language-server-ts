// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/core/ThrowErrorFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { ThrowError } from "../../../pojo/mediator/core/ThrowError.js";

export class ThrowErrorFactory extends AbstractMediatorFactory {
  static readonly THROW_ERROR: string = "throwError";

  createSpecificMediator(element: DOMElement): Mediator {
    let throwError = new ThrowError();
    throwError.elementNode(element);
    this.populateAttributes(throwError, element);
    return throwError;

  }

  getTagName(): string {
    return ThrowErrorFactory.THROW_ERROR;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let throwError = (node as ThrowError);
    let type = element.getAttribute(Constant.TYPE);
    if (type != null) {
        throwError.setType(type);
    }
    let errorMessage = element.getAttribute(Constant.ERROR_MESSAGE);
    if (errorMessage != null) {
        throwError.setErrorMessage(errorMessage);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        throwError.setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        throwError.setTraceFilter(traceFilter);
    }

  }
}
