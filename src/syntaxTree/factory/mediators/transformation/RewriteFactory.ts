// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/transformation/RewriteFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { Rewrite } from "../../../pojo/mediator/transformation/rewrite/Rewrite.js";
import { RewriteRewriterule } from "../../../pojo/mediator/transformation/rewrite/RewriteRewriterule.js";
import { RewriteRewriteruleAction } from "../../../pojo/mediator/transformation/rewrite/RewriteRewriteruleAction.js";
import { RewriteRewriteruleCondition } from "../../../pojo/mediator/transformation/rewrite/RewriteRewriteruleCondition.js";
import { RewriteRuleActionFragment } from "../../../pojo/mediator/transformation/rewrite/RewriteRuleActionFragment.js";
import { RewriteRuleActionType } from "../../../pojo/mediator/transformation/rewrite/RewriteRuleActionType.js";
import { STNode } from "../../../stNode.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";
import { Utils } from "../../../utils.js";

export class RewriteFactory extends AbstractMediatorFactory {
  static readonly REWRITE: string = "rewrite";

  createSpecificMediator(element: DOMElement): Mediator {
    let rewrite = new Rewrite();
    rewrite.elementNode(element);
    this.populateAttributes(rewrite, element);
    let childNodes = element.getChildren();
    let rewriteruleList = [];
    if (childNodes != null && !isEmpty(childNodes)) {
        for (let child of childNodes) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.REWRITE_RULE)) {
                let rewriterule = this.createRewriteRewriterule(child);
                rewriteruleList.push(rewriterule);
            }
        }
        rewrite.setRewriterule(rewriteruleList.slice());
    }
    return rewrite;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let inProperty = element.getAttribute(Constant.IN_PROPERTY);
    if (inProperty != null) {
        ((node as Rewrite)).setInProperty(inProperty);
    }
    let outProperty = element.getAttribute(Constant.OUT_PROPERTY);
    if (outProperty != null) {
        ((node as Rewrite)).setOutProperty(outProperty);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Rewrite)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Rewrite)).setTraceFilter(traceFilter);
    }

  }

  createRewriteRewriterule(element: DOMNode): RewriteRewriterule {
    let rewriterule = new RewriteRewriterule();
    rewriterule.elementNode((element as DOMElement));
    let rewriteruleChildren = element.getChildren();
    let rewriteactionList = [];
    if (rewriteruleChildren != null && !isEmpty(rewriteruleChildren)) {
        for (let rewriteruleChild of rewriteruleChildren) {
            if (equalsIgnoreCase(rewriteruleChild.getNodeName(), Constant.CONDITION)) {
                let rewritecondition =
                        this.createRewriteRewriteruleRewritecondition(rewriteruleChild);
                rewriterule.setCondition(rewritecondition);
            } else if (equalsIgnoreCase(rewriteruleChild.getNodeName(), Constant.ACTION)) {
                let rewriteaction = this.createRewriteRewriteruleRewriteaction(rewriteruleChild);
                rewriteactionList.push(rewriteaction);
            }
        }
        rewriterule.setAction(rewriteactionList.slice());
    }
    return rewriterule;

  }

  createRewriteRewriteruleRewritecondition(element: DOMNode): RewriteRewriteruleCondition {
    let condition = new RewriteRewriteruleCondition();
    condition.elementNode((element as DOMElement));
    condition.setCondition(Utils.getInlineString(element.getFirstChild()));
    let conditionChildren = element.getChildren();
    if (conditionChildren != null && !isEmpty(conditionChildren)) {
        for (let conditionChild of conditionChildren) {
            if (equalsIgnoreCase(conditionChild.getNodeName(), Constant.AND)) {
                let and = SyntaxTreeUtils.createAnd(conditionChild);
                condition.setAnd(and);
            } else if (equalsIgnoreCase(conditionChild.getNodeName(), Constant.OR)) {
                let or = SyntaxTreeUtils.createOr(conditionChild);
                condition.setOr(or);
            } else if (equalsIgnoreCase(conditionChild.getNodeName(), Constant.EQUAL)) {
                let equal = SyntaxTreeUtils.createEqual(conditionChild);
                condition.setEqual(equal);
            } else if (equalsIgnoreCase(conditionChild.getNodeName(), Constant.NOT)) {
                let not = SyntaxTreeUtils.createNot(conditionChild);
                condition.setNot(not);
            }
        }
    }
    return condition;

  }

  createRewriteRewriteruleRewriteaction(element: DOMNode): RewriteRewriteruleAction {
    let rewriteaction = new RewriteRewriteruleAction();
    rewriteaction.elementNode((element as DOMElement));
    let xpath = element.getAttribute(Constant.XPATH);
    if (xpath != null) {
        rewriteaction.setXpath(xpath);
    }
    let regex = element.getAttribute(Constant.REGEX);
    if (regex != null) {
        rewriteaction.setRegex(regex);
    }
    let value = element.getAttribute(Constant.VALUE);
    if (value != null) {
        rewriteaction.setValue(value);
    }
    let type = element.getAttribute(Constant.TYPE);
    let typeEnum = getEnumFromValue(type, RewriteRuleActionType);
    if (typeEnum != null) {
        rewriteaction.setType(typeEnum);
    }
    let fragment = element.getAttribute(Constant.FRAGMENT);
    let fragmentEnum = getEnumFromValue(fragment, RewriteRuleActionFragment);
    if (fragmentEnum != null) {
        rewriteaction.setFragment(fragmentEnum);
    }
    return rewriteaction;

  }

  getTagName(): string {
    return RewriteFactory.REWRITE;

  }
}
