// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/core/CallOutFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Callout } from "../../../pojo/mediator/core/callout/Callout.js";
import { CalloutConfiguration } from "../../../pojo/mediator/core/callout/CalloutConfiguration.js";
import { CalloutEnableSec } from "../../../pojo/mediator/core/callout/CalloutEnableSec.js";
import { CalloutSource } from "../../../pojo/mediator/core/callout/CalloutSource.js";
import { CalloutTarget } from "../../../pojo/mediator/core/callout/CalloutTarget.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SourceOrTargetOrConfiguration } from "../../../pojo/mediator/core/callout/SourceOrTargetOrConfiguration.js";

export class CallOutFactory extends AbstractMediatorFactory {
  static readonly CALL_OUT: string = "CallOut";

  createSpecificMediator(element: DOMElement): Mediator {
    let callOut = new Callout();
    callOut.elementNode(element);
    this.populateAttributes(callOut, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let sourceOrTargetOrConfiguration = new SourceOrTargetOrConfiguration();
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, Constant.SOURCE)) {
                let source = this.createSource(child);
                sourceOrTargetOrConfiguration.setSource((source));
            } else if (equalsIgnoreCase(name, Constant.TARGET)) {
                let target = this.createTarget(child);
                sourceOrTargetOrConfiguration.setTarget((target));
            } else if (equalsIgnoreCase(name, Constant.ENABLE_SEC)) {
                let enableSec = this.createEnableSec(child);
                sourceOrTargetOrConfiguration.setEnableSec((enableSec));
            } else if (equalsIgnoreCase(name, Constant.CONFIGURATION)) {
                let configuration = this.createConfiguration(child);
                sourceOrTargetOrConfiguration.setConfiguration((configuration));
            }
        }
        callOut.setSourceOrTargetOrConfiguration(sourceOrTargetOrConfiguration);
    }
    return callOut;

  }

  createSource(child: DOMNode): CalloutSource {
    let source = new CalloutSource();
    source.elementNode((child as DOMElement));
    let xpath = child.getAttribute(Constant.XPATH);
    if (xpath != null) {
        source.setXpath(xpath);
    }
    let key = child.getAttribute(Constant.KEY);
    if (key != null) {
        source.setKey(key);
    }
    return source;

  }

  createTarget(child: DOMNode): CalloutTarget {
    let target = new CalloutTarget();
    target.elementNode((child as DOMElement));
    let xpath = child.getAttribute(Constant.XPATH);
    if (xpath != null) {
        target.setXpath(xpath);
    }
    let key = child.getAttribute(Constant.KEY);
    if (key != null) {
        target.setKey(key);
    }
    return target;

  }

  createEnableSec(child: DOMNode): CalloutEnableSec {
    let enableSec = new CalloutEnableSec();
    enableSec.elementNode((child as DOMElement));
    let policy = child.getAttribute(Constant.POLICY);
    if (policy != null) {
        enableSec.setPolicy(policy);
    }
    let outboundPolicy = child.getAttribute(Constant.OUTBOUND_POLICY);
    if (outboundPolicy != null) {
        enableSec.setOutboundPolicy(outboundPolicy);
    }
    let inboundPolicy = child.getAttribute(Constant.INBOUND_POLICY);
    if (inboundPolicy != null) {
        enableSec.setInboundPolicy(inboundPolicy);
    }
    return enableSec;

  }

  createConfiguration(child: DOMNode): CalloutConfiguration {
    let configuration = new CalloutConfiguration();
    configuration.elementNode((child as DOMElement));
    let axis2xml = child.getAttribute(Constant.AXIS2XML);
    if (axis2xml != null) {
        configuration.setAxis2Xml(axis2xml);
    }
    let repository = child.getAttribute(Constant.REPOSITORY);
    if (repository != null) {
        configuration.setRepository(repository);
    }
    return configuration;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let serviceURL = element.getAttribute(Constant.SERVICE_URL);
    if (serviceURL != null) {
        ((node as Callout)).setServiceURL(serviceURL);
    }
    let action = element.getAttribute(Constant.ACTION);
    if (action != null) {
        ((node as Callout)).setAction(action);
    }
    let initAxis2ClientOptions = element.getAttribute(Constant.INIT_AXIS2_CLIENT_OPTIONS);
    if (initAxis2ClientOptions != null) {
        ((node as Callout)).setInitAxis2ClientOptions(parseBoolean(initAxis2ClientOptions));
    }
    let endpointKey = element.getAttribute(Constant.ENDPOINT_KEY);
    if (endpointKey != null) {
        ((node as Callout)).setEndpointKey(endpointKey);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Callout)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Callout)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return CallOutFactory.CALL_OUT;

  }
}
