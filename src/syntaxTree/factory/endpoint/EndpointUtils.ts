// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/endpoint/EndpointUtils.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean, getEnumFromValue } from "../../javaCompat.js";
import { Constant } from "../../constant.js";
import { DOMElement } from "../../dom/dom.js";
import { DOMNode } from "../../dom/dom.js";
import { EnableAddressingVersion } from "../../pojo/endpoint/common/EnableAddressingVersion.js";
import { EndpointEnableAddressing } from "../../pojo/endpoint/common/EndpointEnableAddressing.js";
import { EndpointEnableRM } from "../../pojo/endpoint/common/EndpointEnableRM.js";
import { EndpointEnableSec } from "../../pojo/endpoint/common/EndpointEnableSec.js";
import { EndpointHttpAuthenticationOauthRequestParameters } from "../../pojo/endpoint/http/EndpointHttpAuthenticationOauthRequestParameters.js";
import { EndpointMarkForSuspension } from "../../pojo/endpoint/common/EndpointMarkForSuspension.js";
import { EndpointRetryConfig } from "../../pojo/endpoint/common/EndpointRetryConfig.js";
import { EndpointSuspendOnFailure } from "../../pojo/endpoint/common/EndpointSuspendOnFailure.js";
import { EndpointTimeout } from "../../pojo/endpoint/common/EndpointTimeout.js";
import { STNode } from "../../stNode.js";
import { SyntaxTreeUtils } from "../../utils/SyntaxTreeUtils.js";

export class EndpointUtils {
  static createEnableSec(node: DOMNode): EndpointEnableSec {
    let enableSec = new EndpointEnableSec();
    enableSec.elementNode((node as DOMElement));

    let policy = node.getAttribute(Constant.POLICY);
    if (policy != null && !isEmpty(policy)) {
        enableSec.setPolicy(policy);
    }
    let inboundPolicy = node.getAttribute(Constant.INBOUND_POLICY);
    if (inboundPolicy != null && !isEmpty(inboundPolicy)) {
        enableSec.setInboundPolicy(inboundPolicy);
    }
    let outboundPolicy = node.getAttribute(Constant.OUTBOUND_POLICY);
    if (outboundPolicy != null && !isEmpty(outboundPolicy)) {
        enableSec.setOutboundPolicy(outboundPolicy);
    }
    return enableSec;

  }

  static createEnableRM(node: DOMNode): EndpointEnableRM {
    let enableRM = new EndpointEnableRM();
    enableRM.elementNode((node as DOMElement));
    let policy = node.getAttribute(Constant.POLICY);
    if (policy != null && !isEmpty(policy)) {
        enableRM.setPolicy(policy);
    }
    return enableRM;

  }

  static createEnableAddressing(node: DOMNode): EndpointEnableAddressing {
    let enableAddressing = new EndpointEnableAddressing();
    enableAddressing.elementNode((node as DOMElement));
    let version = node.getAttribute(Constant.VERSION);
    let versionEnum = getEnumFromValue(version, EnableAddressingVersion);
    if (versionEnum != null) {
        enableAddressing.setVersion(versionEnum);
    }
    let separateListener = node.getAttribute(Constant.SEPARATE_LISTENER);
    if (separateListener != null && !isEmpty(separateListener)) {
        enableAddressing.setSeparateListener(parseBoolean(separateListener));
    }
    return enableAddressing;

  }

  static createTimeout(node: DOMNode): EndpointTimeout {
    let timeout = new EndpointTimeout();
    timeout.elementNode((node as DOMElement));
    let children = node.getChildren();
    let elements = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (child instanceof DOMElement) {
                let content = new STNode();
                content.elementNode((child as DOMElement));
                if (equalsIgnoreCase("duration", child.getNodeName())) {
                    timeout.setDuration(content);
                } else if (equalsIgnoreCase("responseAction", child.getNodeName())) {
                    timeout.setResponseAction(content);
                }
                elements.push(content);
            }
        }
        timeout.setContent(elements);
    }
    return timeout;

  }

  static createSuspendOnFailure(node: DOMNode): EndpointSuspendOnFailure {
    let suspendOnFailure = new EndpointSuspendOnFailure();
    suspendOnFailure.elementNode((node as DOMElement));
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (!(child instanceof DOMElement)) {
                continue;
            }
            let stElement = new STNode();
            stElement.elementNode((child as DOMElement));
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, Constant.ERROR_CODES)) {
                suspendOnFailure.setErrorCodes(stElement);
            } else if (equalsIgnoreCase(name, Constant.INITIAL_DURATION)) {
                suspendOnFailure.setInitialDuration(stElement);
            } else if (equalsIgnoreCase(name, Constant.PROGRESSION_FACTOR)) {
                suspendOnFailure.setProgressionFactor(stElement);
            } else if (equalsIgnoreCase(name, Constant.MAXIMUM_DURATION)) {
                suspendOnFailure.setMaximumDuration(stElement);
            }
        }
    }
    return suspendOnFailure;

  }

  static createMarkForSuspension(node: DOMNode): EndpointMarkForSuspension {
    let markForSuspension = new EndpointMarkForSuspension();
    markForSuspension.elementNode((node as DOMElement));
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (!(child instanceof DOMElement)) {
                continue;
            }
            let name = child.getNodeName();
            let stElement = new STNode();
            stElement.elementNode((child as DOMElement));
            if (equalsIgnoreCase(name, Constant.ERROR_CODES)) {
                markForSuspension.setErrorCodes(stElement);
            } else if (equalsIgnoreCase(name, Constant.RETRIES_BEFORE_SUSPENSION)) {
                markForSuspension.setRetriesBeforeSuspension(stElement);
            } else if (equalsIgnoreCase(name, Constant.RETRY_DELAY)) {
                markForSuspension.setRetryDelay(stElement);
            }
        }
    }
    return markForSuspension;

  }

  static createOauthRequestParameters(node: DOMNode): EndpointHttpAuthenticationOauthRequestParameters {
    let requestParameters =
            new EndpointHttpAuthenticationOauthRequestParameters();
    requestParameters.elementNode((node as DOMElement));
    let children = node.getChildren();
    let parameters = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, Constant.PARAMETER)) {
                let parameter = SyntaxTreeUtils.createParameter(child);
                parameters.push(parameter);
            }
        }
        requestParameters.setParameter(parameters.slice());
    }
    return requestParameters;

  }

  static createRetryConfig(node: DOMNode): EndpointRetryConfig {
    let retryConfig = new EndpointRetryConfig();
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            let stNode = new STNode();
            stNode.elementNode((child as DOMElement));
            if (equalsIgnoreCase(Constant.ENABLED_ERROR_CODES, name)) {
                retryConfig.setEnabledErrorCodes(stNode);
            } else if (equalsIgnoreCase(Constant.DISABLED_ERROR_CODES, name)) {
                retryConfig.setDisabledErrorCodes(stNode);
            }
        }
    }
    return retryConfig;

  }
}
