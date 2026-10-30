// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/EventTriggerSubscriptions.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class EventTriggerSubscriptions extends STNode {
  static readonly __fields: string[] = ["subscription"];

  subscription?: STNode;

  getSubscription(): STNode {
    return this.subscription;

  }

  setSubscription(subscription: STNode): void {
    this.subscription = subscription;

  }
}
