// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/eip/aggregate/CorrelateOnOrCompleteConditionOrOnComplete.java by the java2ts converter (see tools/java2ts).
import { AggregateCompleteCondition } from "./AggregateCompleteCondition.js";
import { AggregateCorrelateOn } from "./AggregateCorrelateOn.js";
import { AggregateOnComplete } from "./AggregateOnComplete.js";
import { STNode } from "../../../../stNode.js";

export class CorrelateOnOrCompleteConditionOrOnComplete extends STNode {
  static readonly __fields: string[] = ["correlateOn", "completeCondition", "onComplete"];

  correlateOn?: AggregateCorrelateOn | undefined;

  completeCondition?: AggregateCompleteCondition | undefined;

  onComplete?: AggregateOnComplete | undefined;

  constructor() {
    super();
    this.correlateOn = undefined;
    this.completeCondition = undefined;
    this.onComplete = undefined;

  }

  getCorrelateOn(): AggregateCorrelateOn | undefined {
    return this.correlateOn;

  }

  setCorrelateOn(correlateOn: AggregateCorrelateOn | undefined): void {
    this.correlateOn = correlateOn;

  }

  getCompleteCondition(): AggregateCompleteCondition | undefined {
    return this.completeCondition;

  }

  setCompleteCondition(completeCondition: AggregateCompleteCondition | undefined): void {
    this.completeCondition = completeCondition;

  }

  getOnComplete(): AggregateOnComplete | undefined {
    return this.onComplete;

  }

  setOnComplete(onComplete: AggregateOnComplete | undefined): void {
    this.onComplete = onComplete;

  }
}
