// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/eip/aggregate/AggregateOnComplete.java by the java2ts converter (see tools/java2ts).
import { AggregateElementType } from "./AggregateElementType.js";
import { Mediator } from "../../Mediator.js";
import { STNode } from "../../../../stNode.js";

export class AggregateOnComplete extends STNode {
  static readonly __fields: string[] = ["mediatorList", "expression", "sequenceAttribute", "enclosingElementProperty", "aggregateElementType"];

  mediatorList?: Mediator[];

  expression?: string;

  sequenceAttribute?: string;

  enclosingElementProperty?: string;

  aggregateElementType?: AggregateElementType;

  constructor() {
    super();
    this.mediatorList = [];

  }

  getMediatorList(): Mediator[] {
    return this.mediatorList;

  }

  setMediatorList(mediatorList: Mediator[]): void {
    this.mediatorList = mediatorList;

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

  getEnclosingElementProperty(): string {
    return this.enclosingElementProperty;

  }

  setEnclosingElementProperty(enclosingElementProperty: string): void {
    this.enclosingElementProperty = enclosingElementProperty;

  }

  getAggregateElementType(): AggregateElementType {
    return this.aggregateElementType;

  }

  setAggregateElementType(aggregateElementType: AggregateElementType): void {
    this.aggregateElementType = aggregateElementType;

  }
}
