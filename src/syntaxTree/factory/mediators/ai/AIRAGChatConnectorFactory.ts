// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/ai/AIRAGChatConnectorFactory.java by the java2ts converter (see tools/java2ts).
import { Logger } from "../../../javaCompat.js";
import { AIChat } from "../../../pojo/connector/ai/AIChat.js";
import { AIChatConnectorFactory } from "./AIChatConnectorFactory.js";
import { DOMElement } from "../../../dom/dom.js";

export class AIRAGChatConnectorFactory extends AIChatConnectorFactory {
  static readonly LOGGER: Logger = Logger.getLogger("AIRAGChatConnectorFactory");

  static readonly AI_RAG_CHAT: string = "ai.ragChat";

  static readonly ALLOWED_CONNECTION_TAGS: string[] = ["llmConfigKey", "memoryConfigKey", "embeddingConfigKey", "vectorStoreConfigKey"];

  populateConnections(aiChat: AIChat, element: DOMElement, _allowed?: string[]): void {
    super.populateConnections(aiChat, element, AIRAGChatConnectorFactory.ALLOWED_CONNECTION_TAGS);

  }

  getTagName(): string {
    return AIRAGChatConnectorFactory.AI_RAG_CHAT;

  }
}
