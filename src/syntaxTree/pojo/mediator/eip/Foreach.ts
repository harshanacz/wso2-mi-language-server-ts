// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/eip/Foreach.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";
import { Sequence } from "../../misc/common/Sequence.js";

export class Foreach extends Mediator {
  static readonly __fields: string[] = ["sequence", "expression", "sequenceAttribute", "id", "description", "executeParallel", "updateOriginal", "variableName", "resultType", "enclosingElement", "collection", "counterVariableName", "continueWithoutAggregation", "traceFilter"];

  sequence?: Sequence;

  expression?: string;

  sequenceAttribute?: string;

  id?: string;

  description?: string;

  executeParallel: boolean = false;

  updateOriginal: boolean = false;

  variableName?: string;

  resultType?: string;

  enclosingElement?: string;

  collection?: string;

  counterVariableName?: string;

  continueWithoutAggregation: boolean = false;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Foreach");

  }

  getSequence(): Sequence {
    return this.sequence;

  }

  setSequence(sequence: Sequence): void {
    this.sequence = sequence;

  }

  getExpression(): string {
    return this.expression;

  }

  setExpression(expression: string): void {
    this.expression = expression;

  }

  getSequenceAttribute(): string {
    return this.sequenceAttribute;

  }

  setSequenceAttribute(sequenceAttribute: string): void {
    this.sequenceAttribute = sequenceAttribute;

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

  isExecuteParallel(): boolean {
    return this.executeParallel;

  }

  setExecuteParallel(executeParallel: boolean): void {
    this.executeParallel = executeParallel;

  }

  isUpdateOriginal(): boolean {
    return this.updateOriginal;

  }

  setUpdateOriginal(updateOriginal: boolean): void {
    this.updateOriginal = updateOriginal;

  }

  getVariableName(): string {
    return this.variableName;

  }

  setVariableName(variableName: string): void {
    this.variableName = variableName;

  }

  getResultType(): string {
    return this.resultType;

  }

  setResultType(resultType: string): void {
    this.resultType = resultType;

  }

  getCollection(): string {
    return this.collection;

  }

  setCollection(collection: string): void {
    this.collection = collection;

  }

  getCounterVariableName(): string {
    return this.counterVariableName;

  }

  setCounterVariableName(counterVariableName: string): void {
    this.counterVariableName = counterVariableName;

  }

  isContinueWithoutAggregation(): boolean {
    return this.continueWithoutAggregation;

  }

  setContinueWithoutAggregation(continueWithoutAggregation: boolean): void {
    this.continueWithoutAggregation = continueWithoutAggregation;

  }

  getEnclosingElement(): string {
    return this.enclosingElement;

  }

  setEnclosingElement(enclosingElement: string): void {
    this.enclosingElement = enclosingElement;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
