// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/filter/FilterFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, StringUtils } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Filter } from "../../../pojo/mediator/filter/filter/Filter.js";
import { FilterElse } from "../../../pojo/mediator/filter/filter/FilterElse.js";
import { FilterThen } from "../../../pojo/mediator/filter/filter/FilterThen.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";
import { Utils } from "../../../utils.js";

export class FilterFactory extends AbstractMediatorFactory {
  static readonly FILTER: string = "filter";

  createSpecificMediator(element: DOMElement): Mediator {
    let filter = new Filter();
    if (StringUtils.isNotEmpty(this.getMiVersion()) &&
            Utils.compareVersions(this.getMiVersion(), Constant.MI_440_VERSION) < 0) {
        filter.setDisplayName("Filter");
    }
    filter.elementNode(element);
    this.populateAttributes(filter, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.THEN)) {
                filter.setThen((this.createThenElse(child) as FilterThen));
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.ELSE)) {
                filter.setElse_((this.createThenElse(child) as FilterElse));
            }
        }
    }
    return filter;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let xpath = element.getAttribute(Constant.XPATH);
    if (xpath != null) {
        ((node as Filter)).setXpath(xpath);
    }
    let regex = element.getAttribute(Constant.REGEX);
    if (regex != null) {
        ((node as Filter)).setRegex(regex);
    }
    let source = element.getAttribute(Constant.SOURCE);
    if (source != null) {
        ((node as Filter)).setSource(source);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Filter)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Filter)).setTraceFilter(traceFilter);
    }

  }

  createThenElse(child: DOMNode): STNode {
    let then_else = null;
    if (equalsIgnoreCase(child.getNodeName(), Constant.THEN)) {
        then_else = new FilterThen();
    } else if (equalsIgnoreCase(child.getNodeName(), Constant.ELSE)) {
        then_else = new FilterElse();
    }
    then_else.elementNode((child as DOMElement));
    let sequence = child.getAttribute(Constant.SEQUENCE);
    let children = child.getChildren();
    let mediators = null;
    if (children != null && !isEmpty(children)) {
        mediators = SyntaxTreeUtils.createMediators(children);
    }
    if (then_else instanceof FilterThen) {
        ((then_else as FilterThen)).setMediatorList(mediators);
        ((then_else as FilterThen)).setSequence(sequence);
    } else {
        ((then_else as FilterElse)).setMediatorList(mediators);
        ((then_else as FilterElse)).setSequence(sequence);
    }
    return then_else;

  }

  getTagName(): string {
    return FilterFactory.FILTER;

  }
}
