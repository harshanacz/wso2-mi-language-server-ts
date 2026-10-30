// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/eip/ScatterGather.java by the java2ts converter (see tools/java2ts).
import { CloneTarget } from "../advanced/Clone/CloneTarget.js";
import { Mediator } from "../Mediator.js";
import { ScatterGatherAggregation } from "./aggregate/ScatterGatherAggregation.js";

export class ScatterGather extends Mediator {
  static readonly __fields: string[] = ["targets", "executeParallel", "resultTarget", "variableName", "contentType", "rootElement", "description", "scatterGatherAggregation", "traceFilter"];

  targets?: CloneTarget[];

  executeParallel: boolean = false;

  resultTarget?: string;

  variableName?: string;

  contentType?: string;

  rootElement?: string;

  description?: string;

  scatterGatherAggregation?: ScatterGatherAggregation;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Scatter-Gather");

  }

  getScatterGatherAggregation(): ScatterGatherAggregation {
    return this.scatterGatherAggregation;

  }

  setScatterGatherAggregation(scatterGatherAggregation: ScatterGatherAggregation): void {
    this.scatterGatherAggregation = scatterGatherAggregation;

  }

  getTargets(): CloneTarget[] {
    return this.targets;

  }

  addTarget(targets: CloneTarget[]): void {
    this.targets = targets;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  isExecuteParallel(): boolean {
    return this.executeParallel;

  }

  setExecuteParallel(executeParallel: boolean): void {
    this.executeParallel = executeParallel;

  }

  getResultTarget(): string {
    return this.resultTarget;

  }

  setResultTarget(resultTarget: string): void {
    this.resultTarget = resultTarget;

  }

  getContentType(): string {
    return this.contentType;

  }

  setContentType(contentType: string): void {
    this.contentType = contentType;

  }

  setTargets(targets: CloneTarget[]): void {
    this.targets = targets;

  }

  getRootElement(): string {
    return this.rootElement;

  }

  setRootElement(rootElement: string): void {
    this.rootElement = rootElement;

  }

  getVariableName(): string {
    return this.variableName;

  }

  setVariableName(variableName: string): void {
    this.variableName = variableName;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
