// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/task/TaskTrigger.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class TaskTrigger extends STNode {
  interval?: string;

  count?: string;

  once: boolean = false;

  cron?: string;

  getInterval(): string {
    return this.interval;

  }

  setInterval(interval: string): void {
    this.interval = interval;

  }

  getCount(): string {
    return this.count;

  }

  setCount(count: string): void {
    this.count = count;

  }

  getOnce(): boolean {
    return this.once;

  }

  setOnce(once: boolean): void {
    this.once = once;

  }

  getCron(): string {
    return this.cron;

  }

  setCron(cron: string): void {
    this.cron = cron;

  }
}
