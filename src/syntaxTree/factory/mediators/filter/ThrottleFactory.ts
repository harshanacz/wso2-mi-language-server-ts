// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/filter/ThrottleFactory.java by the java2ts converter (see tools/java2ts).
import { equals, equalsIgnoreCase, isEmpty } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { AccessType } from "../../../pojo/mediator/filter/throttle/AccessType.js";
import { AllowAccessType } from "../../../pojo/mediator/filter/throttle/AllowAccessType.js";
import { Constant } from "../../../constant.js";
import { ControlAccessType } from "../../../pojo/mediator/filter/throttle/ControlAccessType.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { DenyAccessType } from "../../../pojo/mediator/filter/throttle/DenyAccessType.js";
import { ID } from "../../../pojo/mediator/filter/throttle/ID.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";
import { Throttle } from "../../../pojo/mediator/filter/throttle/Throttle.js";
import { ThrottlePolicies } from "../../../pojo/mediator/filter/throttle/ThrottlePolicies.js";
import { ThrottlePolicy } from "../../../pojo/mediator/filter/throttle/ThrottlePolicy.js";
import { Utils } from "../../../utils.js";

export class ThrottleFactory extends AbstractMediatorFactory {
  static readonly THROTTLE: string = "throttle";

  createSpecificMediator(element: DOMElement): Mediator {
    let throttle = new Throttle();
    throttle.elementNode(element);
    this.populateAttributes(throttle, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.POLICY)) {
                let throttlePolicy = this.createThrottlePolicy(child);
                throttle.setPolicies(throttlePolicy);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.ON_ACCEPT)) {
                let onAccept = SyntaxTreeUtils.createSequence(child);
                throttle.setOnAccept(onAccept);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.ON_REJECT)) {
                let onReject = SyntaxTreeUtils.createSequence(child);
                throttle.setOnReject(onReject);
            }
        }
    }

    return throttle;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let id = element.getAttribute(Constant.ID);
    if (id != null) {
        ((node as Throttle)).setId(id);
    }
    let onAcceptAttribute = element.getAttribute(Constant.ON_ACCEPT);
    if (onAcceptAttribute != null) {
        ((node as Throttle)).setOnAcceptAttribute(onAcceptAttribute);
    }
    let onRejectAttribute = element.getAttribute(Constant.ON_REJECT);
    if (onRejectAttribute != null) {
        ((node as Throttle)).setOnRejectAttribute(onRejectAttribute);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Throttle)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Throttle)).setTraceFilter(traceFilter);
    }

  }

  createThrottlePolicy(node: DOMNode): ThrottlePolicies {
    let throttlePolicies = new ThrottlePolicies();
    throttlePolicies.elementNode((node as DOMElement));
    let key = node.getAttribute(Constant.KEY);
    if (key != null) {
        throttlePolicies.setKey(key);
    }
    let wspPolicy = Utils.getChildNodeByName(node, Constant.WSP_POLICY);
    if (wspPolicy == null) {
        return throttlePolicies;
    }
    let mediatorThrottleAssertion =
            Utils.getChildNodeByName(wspPolicy, Constant.THROTTLE_MEDIATOR_THROTTLE_ASSERTION);
    if (mediatorThrottleAssertion == null) {
        return throttlePolicies;
    }
    let mediatorThrottleAssertionChildren = mediatorThrottleAssertion.getChildren();
    if (mediatorThrottleAssertionChildren != null) {
        let policies = [];
        for (let mediatorThrottleAssertionChild of mediatorThrottleAssertionChildren) {
            if (equals(Constant.THROTTLE_MAXIMUM_CONCURRENT_ACCESS, mediatorThrottleAssertionChild.getNodeName())) {
                let maximumConcurrentAccessStr =
                        Utils.getInlineString(mediatorThrottleAssertionChild.getFirstChild());
                let maximumConcurrentAccess = Utils.parseInt(maximumConcurrentAccessStr);
                if (maximumConcurrentAccess != -1) {
                    throttlePolicies.setMaximumConcurrentAccess(maximumConcurrentAccess);
                }
            } else if (equals(Constant.WSP_POLICY, mediatorThrottleAssertionChild.getNodeName())) {
                let throttlePolicy = this.createPolicy(mediatorThrottleAssertionChild);
                policies.push(throttlePolicy);
            }
        }
        throttlePolicies.setPolicies(policies);
    }
    return throttlePolicies;

  }

  createPolicy(node: DOMNode): ThrottlePolicy {
    let policy = new ThrottlePolicy();
    policy.elementNode((node as DOMElement));
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equals(Constant.THROTTLE_ID, child.getNodeName())) {
                let id = this.createID(child);
                policy.setId(id);
            } else if (equals(Constant.WSP_POLICY, child.getNodeName())) {
                let policyChildren = child.getChildren();
                if (policyChildren != null && !isEmpty(policyChildren)) {
                    for (let policyChild of policyChildren) {
                        let accessType = null;
                        if (equals(Constant.THROTTLE_ALLOW, policyChild.getNodeName())) {
                            accessType = new AllowAccessType();
                        } else if (equals(Constant.THROTTLE_DENY, policyChild.getNodeName())) {
                            accessType = new DenyAccessType();
                        } else if (equals(Constant.THROTTLE_CONTROL, policyChild.getNodeName())) {
                            accessType = this.createControlAccessType(policyChild);
                        }
                        policy.setAccessType(accessType);
                    }
                }
            }
        }
    }
    return policy;

  }

  createControlAccessType(policy: DOMNode): AccessType {
    let controlAccessType = new ControlAccessType();
    let wspPolicy = Utils.getChildNodeByName(policy, Constant.WSP_POLICY);
    if (wspPolicy == null) {
        return controlAccessType;
    }
    let children = wspPolicy.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equals(Constant.THROTTLE_MAXIMUM_COUNT, child.getNodeName())) {
                let maximumCountStr = Utils.getInlineString(child.getFirstChild());
                let maximumCount = Utils.parseInt(maximumCountStr);
                if (maximumCount != -1) {
                    controlAccessType.setMaximumCount(maximumCount);
                }
            } else if (equals(Constant.THROTTLE_UNIT_TIME, child.getNodeName())) {
                let timeUnitStr = Utils.getInlineString(child.getFirstChild());
                let timeUnit = Utils.parseInt(timeUnitStr);
                if (timeUnit != -1) {
                    controlAccessType.setUnitTime(timeUnit);
                }
            } else if (equals(Constant.THROTTLE_PROHIBIT_TIME_PERIOD, child.getNodeName())) {
                let timePeriodStr = Utils.getInlineString(child.getFirstChild());
                let timePeriod = Utils.parseInt(timePeriodStr);
                if (timePeriod != -1) {
                    controlAccessType.setProhibitTimePeriod(timePeriod);
                }
            }
        }
    }
    return controlAccessType;

  }

  createID(node: DOMNode): ID {
    let id = new ID();
    id.elementNode((node as DOMElement));
    let type = node.getAttribute(Constant.THROTTLE_TYPE);
    if (type != null) {
        id.setType(type);
    }
    let valueNode = node.getFirstChild();
    let value = Utils.getInlineString(valueNode);
    if (value != null) {
        id.setValue(value);
    }
    return id;

  }

  getTagName(): string {
    return ThrottleFactory.THROTTLE;

  }
}
