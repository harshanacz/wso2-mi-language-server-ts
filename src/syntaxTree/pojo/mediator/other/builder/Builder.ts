// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/builder/Builder.java by the java2ts converter (see tools/java2ts).
import { BuilderMessageBuilder } from "./BuilderMessageBuilder.js";
import { Mediator } from "../../Mediator.js";

export class Builder extends Mediator {
  messageBuilders?: BuilderMessageBuilder[];

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Builder");

  }

  getMessageBuilders(): BuilderMessageBuilder[] {
    return this.messageBuilders;

  }

  setMessageBuilders(messageBuilders: BuilderMessageBuilder[]): void {
    this.messageBuilders = messageBuilders;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
