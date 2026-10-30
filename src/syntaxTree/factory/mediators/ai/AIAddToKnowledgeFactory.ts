// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/ai/AIAddToKnowledgeFactory.java by the java2ts converter (see tools/java2ts).
import { KnowledgeBaseConnectorFactory } from "./KnowledgeBaseConnectorFactory.js";

export class AIAddToKnowledgeFactory extends KnowledgeBaseConnectorFactory {
  static readonly ADD_TO_STORE: string = "ai.addToKnowledge";

  getTagName(): string {
    return AIAddToKnowledgeFactory.ADD_TO_STORE;

  }
}
