// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/MessageProcessorSerializer.java by the java2ts converter (see tools/java2ts).
import { Constant } from "../constant.js";
import { MessageProcessor } from "../pojo/MessageProcessor.js";
import { OMAbstractFactory } from "../om/om.js";
import { OMElement } from "../om/om.js";
import { OMFactory } from "../om/om.js";
import { SerializerUtils } from "./SerializerUtils.js";

export class MessageProcessorSerializer {
  static readonly fac: OMFactory = OMAbstractFactory.getOMFactory();

  static serializeMessageProcessor(messageProcessor: MessageProcessor): string {
    let messageProcessorElt = MessageProcessorSerializer.fac.createOMElement("messageProcessor", Constant.SYNAPSE_OMNAMESPACE);

    MessageProcessorSerializer.serializeAttributes(messageProcessor, messageProcessorElt);
    SerializerUtils.serializeParameters(messageProcessor.getParameter(), messageProcessorElt);

    return String(messageProcessorElt);

  }

  static serializeAttributes(messageProcessor: MessageProcessor, messageProcessorElt: OMElement): void {
    if (messageProcessor.getName() != null) {
        messageProcessorElt.addAttribute("name", messageProcessor.getName(), null);
    }
    if (messageProcessor.getClazz() != null) {
        messageProcessorElt.addAttribute("class", messageProcessor.getClazz(), null);
    }
    if (messageProcessor.getMessageStore() != null) {
        messageProcessorElt.addAttribute("messageStore", messageProcessor.getMessageStore(), null);
    }
    if (messageProcessor.getTargetEndpoint() != null) {
        messageProcessorElt.addAttribute("targetEndpoint", messageProcessor.getTargetEndpoint(), null);
    }

  }
}
