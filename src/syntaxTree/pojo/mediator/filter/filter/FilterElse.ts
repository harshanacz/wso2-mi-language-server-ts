// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/filter/filter/FilterElse.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../Mediator.js";
import { STNode } from "../../../../stNode.js";

export class FilterElse extends STNode {
  static readonly __fields: string[] = ["mediatorList", "sequence"];

  mediatorList?: Mediator[];

  sequence?: string;

  constructor() {
    super();
    this.mediatorList = [];

  }

  addToMediatorList(mediator: Mediator): void {
    this.mediatorList.push(mediator);

  }

  getMediatorList(): Mediator[] {
    return this.mediatorList;

  }

  setMediatorList(mediatorList: Mediator[]): void {
    this.mediatorList = mediatorList;

  }

  getSequence(): string {
    return this.sequence;

  }

  setSequence(sequence: string): void {
    this.sequence = sequence;

  }
}
