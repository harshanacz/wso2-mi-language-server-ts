// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/ai/KnowledgeBaseConnectorFactory.java by the java2ts converter (see tools/java2ts).
import { AIConnectorFactory } from "./AIConnectorFactory.js";
import { DOMElement } from "../../../dom/dom.js";
import { KnowledgeBase } from "../../../pojo/connector/ai/KnowledgeBase.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";

export abstract class KnowledgeBaseConnectorFactory extends AIConnectorFactory {
  static readonly ALLOWED_CONNECTION_TAGS: string[] = ["embeddingConfigKey", "vectorStoreConfigKey"];

  createSpecificMediator(element: DOMElement): Mediator {
    let knowledgeBase = new KnowledgeBase();
    this.populateConnectorConfigs(knowledgeBase, element);
    this.populateConnections(knowledgeBase, element, KnowledgeBaseConnectorFactory.ALLOWED_CONNECTION_TAGS);
    return knowledgeBase;

  }
}
