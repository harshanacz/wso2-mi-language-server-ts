// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/Event.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";

export class Event extends Mediator {
  topic?: string;

  expression?: string;

  description?: string;

  getTopic(): string {
    return this.topic;

  }

  setTopic(topic: string): void {
    this.topic = topic;

  }

  getExpression(): string {
    return this.expression;

  }

  setExpression(expression: string): void {
    this.expression = expression;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }
}
