// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/enrich/Enrich.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../Mediator.js";
import { SourceEnrich } from "./SourceEnrich.js";
import { TargetEnrich } from "./TargetEnrich.js";

export class Enrich extends Mediator {
  static readonly __fields: string[] = ["source", "target", "description", "traceFilter"];

  source?: SourceEnrich;

  target?: TargetEnrich;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Enrich");

  }

  getSource(): SourceEnrich {
    return this.source;

  }

  setSource(source: SourceEnrich): void {
    this.source = source;

  }

  getTarget(): TargetEnrich {
    return this.target;

  }

  setTarget(target: TargetEnrich): void {
    this.target = target;

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
