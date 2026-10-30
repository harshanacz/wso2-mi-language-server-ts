// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/MessageProcessorFactory.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty } from "../javaCompat.js";
import { AbstractFactory } from "./AbstractFactory.js";
import { Constant } from "../constant.js";
import { DOMElement } from "../dom/dom.js";
import { MessageProcessor } from "../pojo/MessageProcessor.js";
import { MessageProcessorType } from "../pojo/MessageProcessorType.js";
import { STNode } from "../stNode.js";
import { SyntaxTreeUtils } from "../utils/SyntaxTreeUtils.js";

export class MessageProcessorFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let messageProcessor = new MessageProcessor();
    messageProcessor.elementNode(element);
    this.populateAttributes(messageProcessor, element);
    let children = element.getChildren();
    let parameters = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let name = node.getNodeName();
            if (equals(name, Constant.PARAMETER)) {
                let parameter = SyntaxTreeUtils.createParameter(node);
                parameters.push(parameter);
            }
        }
        messageProcessor.setParameter(parameters.slice());
    }
    this.setSubtype(messageProcessor);
    return messageProcessor;

  }

  setSubtype(messageProcessor: MessageProcessor): void {
    if (messageProcessor.getClazz() == null) {
        messageProcessor.setType(MessageProcessorType.CUSTOM);
    }
    switch (messageProcessor.getClazz()) {
        case "org.apache.synapse.message.processor.impl.sampler.SamplingProcessor":
            messageProcessor.setType(MessageProcessorType.MESSAGE_SAMPLING);
            break;
        case "org.apache.synapse.message.processor.impl.forwarder.ScheduledMessageForwardingProcessor":
            messageProcessor.setType(MessageProcessorType.SCHEDULED_MESSAGE_FORWARDING);
            break;
        case "org.apache.synapse.message.processor.impl.failover.FailoverScheduledMessageForwardingProcessor":
            messageProcessor.setType(MessageProcessorType.SCHEDULED_FAILOVER_MESSAGE_FORWARDING);
            break;
        default:
            messageProcessor.setType(MessageProcessorType.CUSTOM);
    }

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        ((node as MessageProcessor)).setName(name);
    }
    let clazz = element.getAttribute(Constant.CLASS);
    if (clazz != null) {
        ((node as MessageProcessor)).setClazz(clazz);
    }
    let messageStore = element.getAttribute(Constant.MESSAGE_STORE);
    if (messageStore != null) {
        ((node as MessageProcessor)).setMessageStore(messageStore);
    }
    let targetEndpoint = element.getAttribute(Constant.TARGET_ENDPOINT);
    if (targetEndpoint != null) {
        ((node as MessageProcessor)).setTargetEndpoint(targetEndpoint);
    }

  }
}
