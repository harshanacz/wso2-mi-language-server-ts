// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/Enqueue.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";

export class Enqueue extends Mediator {
  static readonly __fields: string[] = ["priority", "sequence", "executor", "description"];

  priority: number = 0;

  sequence?: string;

  executor?: string;

  description?: string;

  getPriority(): number {
    return this.priority;

  }

  setPriority(priority: number): void {
    this.priority = priority;

  }

  getSequence(): string {
    return this.sequence;

  }

  setSequence(sequence: string): void {
    this.sequence = sequence;

  }

  getExecutor(): string {
    return this.executor;

  }

  setExecutor(executor: string): void {
    this.executor = executor;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }
}
