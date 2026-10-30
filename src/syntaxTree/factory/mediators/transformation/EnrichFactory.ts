// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/transformation/EnrichFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean, getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Enrich } from "../../../pojo/mediator/transformation/enrich/Enrich.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SourceEnrich } from "../../../pojo/mediator/transformation/enrich/SourceEnrich.js";
import { SourceEnrichType } from "../../../pojo/mediator/transformation/enrich/SourceEnrichType.js";
import { TargetEnrich } from "../../../pojo/mediator/transformation/enrich/TargetEnrich.js";
import { TargetEnrichAction } from "../../../pojo/mediator/transformation/enrich/TargetEnrichAction.js";
import { TargetEnrichType } from "../../../pojo/mediator/transformation/enrich/TargetEnrichType.js";
import { Utils } from "../../../utils.js";

export class EnrichFactory extends AbstractMediatorFactory {
  static readonly ENRICH: string = "enrich";

  createSpecificMediator(element: DOMElement): Mediator {
    let enrich = new Enrich();
    enrich.elementNode(element);
    this.populateAttributes(enrich, element);
    let childNodes = element.getChildren();
    if (childNodes != null && !isEmpty(childNodes)) {
        for (let child of childNodes) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.SOURCE)) {
                let sourceEnrich = this.createSourceEnrich(child);
                enrich.setSource(sourceEnrich);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.TARGET)) {
                let targetEnrich = this.createTargetEnrich(child);
                enrich.setTarget(targetEnrich);
            }
        }
    }
    return enrich;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Enrich)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Enrich)).setTraceFilter(traceFilter);
    }

  }

  createSourceEnrich(element: DOMNode): SourceEnrich {
    let sourceEnrich = new SourceEnrich();
    sourceEnrich.elementNode((element as DOMElement));
    let clone = element.getAttribute(Constant.CLONE);
    if (clone != null) {
        sourceEnrich.setClone(parseBoolean(clone));
    }
    let xpath = element.getAttribute(Constant.XPATH);
    if (xpath != null) {
        sourceEnrich.setXpath(xpath);
    }
    let key = element.getAttribute(Constant.KEY);
    if (key != null) {
        sourceEnrich.setKey(key);
    }
    let type = element.getAttribute(Constant.TYPE);
    let enrichType = getEnumFromValue(type, SourceEnrichType);
    if (enrichType != null) {
        sourceEnrich.setType(enrichType);
    }
    let property = element.getAttribute(Constant.PROPERTY);
    if (property != null) {
        sourceEnrich.setProperty(property);
    }

    let inline = element.getFirstChild();
    if (inline != null) {
        let inlineString = Utils.getInlineString(inline);
        sourceEnrich.setContent(inlineString);
    }
    return sourceEnrich;

  }

  createTargetEnrich(element: DOMNode): TargetEnrich {
    let targetEnrich = new TargetEnrich();
    targetEnrich.elementNode((element as DOMElement));
    let action = element.getAttribute(Constant.ACTION);
    let actionEnum = getEnumFromValue(action, TargetEnrichAction);
    if (actionEnum != null) {
        targetEnrich.setAction(actionEnum);
    }
    let type = element.getAttribute(Constant.TYPE);
    let typeEnum = getEnumFromValue(type, TargetEnrichType);
    if (typeEnum != null) {
        targetEnrich.setType(typeEnum);
    }
    let xpath = element.getAttribute(Constant.XPATH);
    if (xpath != null) {
        targetEnrich.setXpath(xpath);
    }
    let property = element.getAttribute(Constant.PROPERTY);
    if (property != null) {
        targetEnrich.setProperty(property);
    }
    return targetEnrich;

  }

  getTagName(): string {
    return EnrichFactory.ENRICH;

  }
}
