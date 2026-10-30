// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/ai/AIChatConnectorFactory.java by the java2ts converter (see tools/java2ts).
import { Logger } from "../../../javaCompat.js";
import { AIChat } from "../../../pojo/connector/ai/AIChat.js";
import { AIConnectorFactory } from "./AIConnectorFactory.js";
import { DOMElement } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";

export class AIChatConnectorFactory extends AIConnectorFactory {
  static readonly LOGGER: Logger = Logger.getLogger("AIChatConnectorFactory");

  static readonly AI_CHAT_AGENT: string = "ai.chat";

  static readonly ALLOWED_CONNECTION_TAGS: string[] = ["llmConfigKey", "memoryConfigKey"];

  createSpecificMediator(element: DOMElement): Mediator {
    let aiChat = new AIChat();
    this.populateConnectorConfigs(aiChat, element);
    this.populateConnections((aiChat as AIChat), element);
    return aiChat;

  }

  populateConnections(aiChat: AIChat, element: DOMElement, _allowed?: string[]): void {
    super.populateConnections(aiChat, element, AIChatConnectorFactory.ALLOWED_CONNECTION_TAGS);

  }

  getTagName(): string {
    return AIChatConnectorFactory.AI_CHAT_AGENT;

  }
}
