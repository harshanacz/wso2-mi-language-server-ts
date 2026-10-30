// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/eip/aggregate/Aggregate.java by the java2ts converter (see tools/java2ts).
import { CorrelateOnOrCompleteConditionOrOnComplete } from "./CorrelateOnOrCompleteConditionOrOnComplete.js";
import { Mediator } from "../../Mediator.js";

export class Aggregate extends Mediator {
  static readonly __fields: string[] = ["correlateOnOrCompleteConditionOrOnComplete", "description", "id", "traceFilter"];

  correlateOnOrCompleteConditionOrOnComplete?: CorrelateOnOrCompleteConditionOrOnComplete;

  description?: string;

  id?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Aggregate");

  }

  getCorrelateOnOrCompleteConditionOrOnComplete(): CorrelateOnOrCompleteConditionOrOnComplete {
    return this.correlateOnOrCompleteConditionOrOnComplete;

  }

  setCorrelateOnOrCompleteConditionOrOnComplete(correlateOnOrCompleteConditionOrOnComplete: CorrelateOnOrCompleteConditionOrOnComplete): void {
    this.correlateOnOrCompleteConditionOrOnComplete = correlateOnOrCompleteConditionOrOnComplete;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getId(): string {
    return this.id;

  }

  setId(id: string): void {
    this.id = id;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
