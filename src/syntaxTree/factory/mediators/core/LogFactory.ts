// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/core/LogFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, parseBoolean, enumValueOf } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Log } from "../../../pojo/mediator/core/Log.js";
import { LogCategory } from "../../../pojo/mediator/core/LogCategory.js";
import { LogLevel } from "../../../pojo/mediator/core/LogLevel.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";
import { Utils } from "../../../utils.js";

export class LogFactory extends AbstractMediatorFactory {
  static readonly LOG: string = "log";

  createSpecificMediator(element: DOMElement): Mediator {
    let log = new Log();
    log.elementNode(element);
    this.populateAttributes(log, element);
    let children = element.getChildren();
    let properties = [];
    for (let node of children) {
        if (equalsIgnoreCase(node.getNodeName(), Constant.PROPERTY)) {
            let property = SyntaxTreeUtils.createMediatorProperty(node);
            properties.push(property);
        } else if (equalsIgnoreCase(node.getNodeName(), Constant.MESSAGE)) {
            log.setMessage(Utils.getInlineString(node.getFirstChild()));
        }
    }
    log.setProperty(properties.slice());
    return log;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    try {
        let level = element.getAttribute(Constant.LEVEL);
        if (level != null) {
            ((node as Log)).setLevel(enumValueOf(LogLevel, level));
        }
        let separator = element.getAttribute(Constant.SEPARATOR);
        if (separator != null) {
            ((node as Log)).setSeparator(separator);
        }
        let category = element.getAttribute(Constant.CATEGORY);
        if (category != null) {
            ((node as Log)).setCategory(enumValueOf(LogCategory, category));
        }
        let description = element.getAttribute(Constant.DESCRIPTION);
        if (description != null) {
            ((node as Log)).setDescription(description);
        }
        let logMessageIDAttr = element.getAttribute(Constant.LOG_MESSAGE_ID);
        if (logMessageIDAttr != null) {
            ((node as Log)).setLogMessageID(parseBoolean(logMessageIDAttr));
        } else {
            ((node as Log)).setLogMessageID(false);
        }
        let logFullPayloadAttr = element.getAttribute(Constant.LOG_FULL_PAYLOAD);
        if (logFullPayloadAttr != null) {
            ((node as Log)).setLogFullPayload(parseBoolean(logFullPayloadAttr));
        } else {
            ((node as Log)).setLogFullPayload(false);
        }
        let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
        if (traceFilter != null) {
            ((node as Log)).setTraceFilter(traceFilter);
        }
    } catch (e) {

    }

  }

  getTagName(): string {
    return LogFactory.LOG;

  }
}
