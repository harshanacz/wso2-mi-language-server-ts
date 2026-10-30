// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/Clone/Clone.java by the java2ts converter (see tools/java2ts).
import { CloneTarget } from "./CloneTarget.js";
import { Mediator } from "../../Mediator.js";

export class Clone extends Mediator {
  static readonly __fields: string[] = ["target", "id", "continueParent", "sequential", "description", "traceFilter"];

  target?: CloneTarget[];

  id?: string;

  continueParent: boolean = false;

  sequential: boolean = false;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Clone");

  }

  getTarget(): CloneTarget[] {
    return this.target;

  }

  setTarget(target: CloneTarget[]): void {
    this.target = target;

  }

  getId(): string {
    return this.id;

  }

  setId(id: string): void {
    this.id = id;

  }

  isContinueParent(): boolean {
    return this.continueParent;

  }

  setContinueParent(continueParent: boolean): void {
    this.continueParent = continueParent;

  }

  isSequential(): boolean {
    return this.sequential;

  }

  setSequential(sequential: boolean): void {
    this.sequential = sequential;

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
