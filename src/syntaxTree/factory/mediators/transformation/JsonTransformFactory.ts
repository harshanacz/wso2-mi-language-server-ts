// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/transformation/JsonTransformFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Jsontransform } from "../../../pojo/mediator/transformation/Jsontransform.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";

export class JsonTransformFactory extends AbstractMediatorFactory {
  static readonly JSON_TRANSFORM: string = "jsontransform";

  createSpecificMediator(element: DOMElement): Mediator {
    let jsontransform = new Jsontransform();
    jsontransform.elementNode(element);
    this.populateAttributes(jsontransform, element);
    let childNodes = element.getChildren();
    let properties = [];
    if (childNodes != null && !isEmpty(childNodes)) {
        for (let child of childNodes) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.PROPERTY)) {
                let property = SyntaxTreeUtils.createMediatorProperty(child);
                properties.push(property);
            }
        }
        jsontransform.setProperty(properties.slice());
    }
    return jsontransform;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let schema = element.getAttribute(Constant.SCHEMA);
    if (schema != null) {
        ((node as Jsontransform)).setSchema(schema);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Jsontransform)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Jsontransform)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return JsonTransformFactory.JSON_TRANSFORM;

  }
}
