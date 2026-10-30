// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/eip/aggregate/AggregateCompleteCondition.java by the java2ts converter (see tools/java2ts).
import { AggregateCompleteConditionMessageCount } from "./AggregateCompleteConditionMessageCount.js";
import { STNode } from "../../../../stNode.js";

export class AggregateCompleteCondition extends STNode {
  static readonly __fields: string[] = ["messageCount", "timeout"];

  messageCount?: AggregateCompleteConditionMessageCount;

  timeout: number = 0;

  getMessageCount(): AggregateCompleteConditionMessageCount {
    return this.messageCount;

  }

  setMessageCount(messageCount: AggregateCompleteConditionMessageCount): void {
    this.messageCount = messageCount;

  }

  getTimeout(): number {
    return this.timeout;

  }

  setTimeout(timeout: number): void {
    this.timeout = timeout;

  }
}
