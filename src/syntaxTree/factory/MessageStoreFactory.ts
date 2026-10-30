// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/MessageStoreFactory.java by the java2ts converter (see tools/java2ts).
import { equals, equalsIgnoreCase, isEmpty } from "../javaCompat.js";
import { AbstractFactory } from "./AbstractFactory.js";
import { Constant } from "../constant.js";
import { DOMElement } from "../dom/dom.js";
import { MessageStore } from "../pojo/MessageStore.js";
import { MessageStoreType } from "../pojo/MessageStoreType.js";
import { STNode } from "../stNode.js";
import { SyntaxTreeUtils } from "../utils/SyntaxTreeUtils.js";

export class MessageStoreFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let messageStore = new MessageStore();
    messageStore.elementNode(element);
    this.populateAttributes(messageStore, element);
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
        messageStore.setParameter(parameters.slice());
    }
    this.setSubType(messageStore);
    return messageStore;

  }

  setSubType(messageStore: MessageStore): void {
    if (messageStore.getClazz() == null) {
        messageStore.setType(MessageStoreType.CUSTOM);
        return;
    }
    switch (messageStore.getClazz()) {
        case "org.apache.synapse.message.store.impl.jms.JmsStore":
            if (this.isWSO2MB(messageStore)) {
                messageStore.setType(MessageStoreType.WSO2_MB);
            } else {
                messageStore.setType(MessageStoreType.JMS);
            }
            break;
        case "org.apache.synapse.message.store.impl.memory.InMemoryStore":
            messageStore.setType(MessageStoreType.IN_MEMORY);
            break;
        case "org.apache.synapse.message.store.impl.rabbitmq.RabbitMQStore":
            messageStore.setType(MessageStoreType.RABBITMQ);
            break;
        case "org.apache.synapse.message.store.impl.jdbc.JDBCMessageStore":
            messageStore.setType(MessageStoreType.JDBC);
            break;
        case "org.apache.synapse.message.store.impl.resequencer.ResequenceMessageStore":
            messageStore.setType(MessageStoreType.RESEQUENCE);
            break;
        default:
            messageStore.setType(MessageStoreType.CUSTOM);
    }

  }

  isWSO2MB(messageStore: MessageStore): boolean {
    let parameters = messageStore.getParameter();
    if (parameters != null) {
        for (let parameter of parameters) {
            if (equals(parameter.getName(), "java.naming.factory.initial")) {
                let value = parameter.getContent();
                if (equalsIgnoreCase("org.wso2.andes.jndi.PropertiesFileInitialContextFactory", value)) {
                    return true;
                }
            }
        }
    }
    return false;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        ((node as MessageStore)).setName(name);
    }
    let clazz = element.getAttribute(Constant.CLASS);
    if (clazz != null) {
        ((node as MessageStore)).setClazz(clazz);
    }

  }
}
