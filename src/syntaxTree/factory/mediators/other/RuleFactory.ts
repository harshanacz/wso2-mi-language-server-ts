// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/other/RuleFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { Rule } from "../../../pojo/mediator/other/rule/Rule.js";
import { RuleChildMediators } from "../../../pojo/mediator/other/rule/RuleChildMediators.js";
import { RuleInput } from "../../../pojo/mediator/other/rule/RuleInput.js";
import { RuleInputFact } from "../../../pojo/mediator/other/rule/RuleInputFact.js";
import { RuleOutput } from "../../../pojo/mediator/other/rule/RuleOutput.js";
import { RuleOutputFact } from "../../../pojo/mediator/other/rule/RuleOutputFact.js";
import { RuleRuleSetProperties } from "../../../pojo/mediator/other/rule/RuleRuleSetProperties.js";
import { RuleRuleSetRule } from "../../../pojo/mediator/other/rule/RuleRuleSetRule.js";
import { RuleRuleset } from "../../../pojo/mediator/other/rule/RuleRuleset.js";
import { RuleSource } from "../../../pojo/mediator/other/rule/RuleSource.js";
import { RuleTarget } from "../../../pojo/mediator/other/rule/RuleTarget.js";
import { STNode } from "../../../stNode.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";
import { Utils } from "../../../utils.js";

export class RuleFactory extends AbstractMediatorFactory {
  static readonly RULE: string = "brs:rule";

  createSpecificMediator(element: DOMElement): Mediator {
    let rule = new Rule();
    rule.elementNode(element);
    this.populateAttributes(rule, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.BRS_SOURCE)) {
                let ruleSource = this.createRuleSource(child);
                rule.setSource(ruleSource);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.BRS_TARGET)) {
                let ruleTarget = this.createRuleTarget(child);
                rule.setTarget(ruleTarget);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.BRS_RULE_SET)) {
                let ruleRuleset = this.createRuleSet(child);
                rule.setRuleSet(ruleRuleset);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.BRS_INPUT)) {
                let ruleFacts = this.createRuleInput(child);
                rule.setInput(ruleFacts);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.BRS_OUTPUT)) {
                let ruleResults = this.createRuleOutput(child);
                rule.setOutput(ruleResults);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.CHILD_MEDIATORS)) {
                let ruleChildMediators = this.createRuleChildMediators(child);
                rule.setChildMediators(ruleChildMediators);
            }
        }
    }
    return rule;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Rule)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Rule)).setTraceFilter(traceFilter);
    }

  }

  createRuleSource(node: DOMNode): RuleSource {
    let ruleSource = new RuleSource();
    ruleSource.elementNode((node as DOMElement));
    let xpath = node.getAttribute(Constant.XPATH);
    if (xpath != null) {
        ruleSource.setXpath(xpath);
    }
    let valueNode = node.getFirstChild();
    let value = Utils.getInlineString(valueNode);
    if (value != null && !isEmpty(value)) {
        ruleSource.setValue(value);
    }
    return ruleSource;

  }

  createRuleTarget(node: DOMNode): RuleTarget {
    let ruleTarget = new RuleTarget();
    ruleTarget.elementNode((node as DOMElement));
    let action = node.getAttribute(Constant.ACTION);
    if (action != null) {
        ruleTarget.setAction(action);
    }
    let resultXpath = node.getAttribute(Constant.RESULT_XPATH);
    if (resultXpath != null) {
        ruleTarget.setResultXpath(resultXpath);
    }
    let xpath = node.getAttribute(Constant.XPATH);
    if (xpath != null) {
        ruleTarget.setXpath(xpath);
    }
    let valueNode = node.getFirstChild();
    let value = Utils.getInlineString(valueNode);
    if (value != null && !isEmpty(value)) {
        ruleTarget.setValue(value);
    }
    return ruleTarget;

  }

  createRuleInput(node: DOMNode): RuleInput {
    let ruleInput = new RuleInput();
    ruleInput.elementNode((node as DOMElement));
    let namespace = node.getAttribute(Constant.NAMESPACE);
    if (namespace != null) {
        ruleInput.setNamespace(namespace);
    }
    let wrapperElementName = node.getAttribute(Constant.WRAPPER_ELEMENT_NAME);
    if (wrapperElementName != null) {
        ruleInput.setWrapperElementName(wrapperElementName);
    }
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        let facts = [];
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.BRS_FACT)) {
                let fact = this.createRuleInputFact(child);
                facts.push(fact);
            }
        }
        ruleInput.setFact(facts.slice());
    }
    return ruleInput;

  }

  createRuleInputFact(node: DOMNode): RuleInputFact {
    let fact = new RuleInputFact();
    fact.elementNode((node as DOMElement));
    let elementName = node.getAttribute(Constant.ELEMENT_NAME);
    if (elementName != null) {
        fact.setElementName(elementName);
    }
    let namespace = node.getAttribute(Constant.NAMESPACE);
    if (namespace != null) {
        fact.setNamespace(namespace);
    }
    let type = node.getAttribute(Constant.TYPE);
    if (type != null) {
        fact.setType(type);
    }
    let xpath = node.getAttribute(Constant.XPATH);
    if (xpath != null) {
        fact.setXpath(xpath);
    }
    return fact;

  }

  createRuleOutput(node: DOMNode): RuleOutput {
    let ruleOutput = new RuleOutput();
    ruleOutput.elementNode((node as DOMElement));
    let namespace = node.getAttribute(Constant.NAMESPACE);
    if (namespace != null) {
        ruleOutput.setNamespace(namespace);
    }
    let wrapperElementName = node.getAttribute(Constant.WRAPPER_ELEMENT_NAME);
    if (wrapperElementName != null) {
        ruleOutput.setWrapperElementName(wrapperElementName);
    }
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        let facts = [];
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.BRS_FACT)) {
                let fact = this.createRuleOutputFact(child);
                facts.push(fact);
            }
        }
        ruleOutput.setFact(facts.slice());
    }
    return ruleOutput;

  }

  createRuleOutputFact(child: DOMNode): RuleOutputFact {
    let fact = new RuleOutputFact();
    fact.elementNode((child as DOMElement));
    let elementName = child.getAttribute(Constant.ELEMENT_NAME);
    if (elementName != null) {
        fact.setElementName(elementName);
    }
    let namespace = child.getAttribute(Constant.NAMESPACE);
    if (namespace != null) {
        fact.setNamespace(namespace);
    }
    let type = child.getAttribute(Constant.TYPE);
    if (type != null) {
        fact.setType(type);
    }
    return fact;

  }

  createRuleSet(node: DOMNode): RuleRuleset {
    let ruleRuleset = new RuleRuleset();
    ruleRuleset.elementNode((node as DOMElement));
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, Constant.BRS_PROPERTIES)) {
                let properties = this.createRuleRuleSetProperties(child);
                ruleRuleset.setProperties(properties);
            } else if (equalsIgnoreCase(name, Constant.BRS_RULE)) {
                let rule = this.createRuleRuleSetRule(child);
                ruleRuleset.setRule(rule);
            }
        }
    }
    return ruleRuleset;

  }

  createRuleRuleSetProperties(node: DOMNode): RuleRuleSetProperties {
    let properties = new RuleRuleSetProperties();
    properties.elementNode((node as DOMElement));
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        let propertyList = [];
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.BRS_PROPERTY)) {
                let property = SyntaxTreeUtils.createMediatorProperty(child);
                propertyList.push(property);
            }
        }
        properties.setProperty(propertyList.slice());
    }
    return properties;

  }

  createRuleRuleSetRule(node: DOMNode): RuleRuleSetRule {
    let rule = new RuleRuleSetRule();
    rule.elementNode((node as DOMElement));
    let resourceType = node.getAttribute(Constant.RESOURCE_TYPE);
    if (resourceType != null) {
        rule.setResourceType(resourceType);
    }
    let sourceType = node.getAttribute(Constant.SOURCE_TYPE);
    if (sourceType != null) {
        rule.setSourceType(sourceType);
    }
    let valueNode = node.getFirstChild();
    let value = Utils.getInlineString(valueNode);
    if (value != null) {
        rule.setValue(value);
    }
    return rule;

  }

  createRuleChildMediators(child: DOMNode): RuleChildMediators {
    let ruleChildMediators = new RuleChildMediators();
    ruleChildMediators.elementNode((child as DOMElement));
    let children = child.getChildren();
    if (children != null && !isEmpty(children)) {
        let mediators = SyntaxTreeUtils.createMediators(children);
        ruleChildMediators.setMediatorList(mediators);
    }
    return ruleChildMediators;

  }

  getTagName(): string {
    return RuleFactory.RULE;

  }
}
