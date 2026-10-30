// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/EventTrigger.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class EventTrigger extends STNode {
  eventTriggerElements?: STNode[];

  id?: string;

  language?: string;

  getEventTriggerElements(): STNode[] {
    return this.eventTriggerElements;

  }

  setEventTriggerElements(eventTriggerElements: STNode[]): void {
    this.eventTriggerElements = eventTriggerElements;

  }

  getId(): string {
    return this.id;

  }

  setId(id: string): void {
    this.id = id;

  }

  getLanguage(): string {
    return this.language;

  }

  setLanguage(language: string): void {
    this.language = language;

  }
}
