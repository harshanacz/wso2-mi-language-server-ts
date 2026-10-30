// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/eip/Iterate.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";
import { Target } from "../../misc/targets/Target.js";

export class Iterate extends Mediator {
  static readonly __fields: string[] = ["target", "sequential", "continueParent", "expression", "preservePayload", "attachPath", "id", "description", "traceFilter"];

  target?: Target;

  sequential: boolean = false;

  continueParent: boolean = false;

  expression?: string;

  preservePayload: boolean = false;

  attachPath?: string;

  id?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Iterate");

  }

  getTarget(): Target {
    return this.target;

  }

  setTarget(target: Target): void {
    this.target = target;

  }

  isSequential(): boolean {
    return this.sequential;

  }

  setSequential(sequential: boolean): void {
    this.sequential = sequential;

  }

  isContinueParent(): boolean {
    return this.continueParent;

  }

  setContinueParent(continueParent: boolean): void {
    this.continueParent = continueParent;

  }

  getExpression(): string {
    return this.expression;

  }

  setExpression(expression: string): void {
    this.expression = expression;

  }

  isPreservePayload(): boolean {
    return this.preservePayload;

  }

  setPreservePayload(preservePayload: boolean): void {
    this.preservePayload = preservePayload;

  }

  getAttachPath(): string {
    return this.attachPath;

  }

  setAttachPath(attachPath: string): void {
    this.attachPath = attachPath;

  }

  getId(): string {
    return this.id;

  }

  setId(id: string): void {
    this.id = id;

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
