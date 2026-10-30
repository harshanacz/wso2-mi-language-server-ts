// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/common/Sequence.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../mediator/Mediator.js";
import { STNode } from "../../../stNode.js";

export class Sequence extends STNode {
  mediatorList?: Mediator[];

  constructor() {
    super();
    this.mediatorList = [];

  }

  addToMediatorList(mediator: Mediator): void {
    this.mediatorList.push(mediator);

  }

  setMediatorList(mediatorList: Mediator[]): void {
    this.mediatorList = mediatorList;

  }

  getMediatorList(): Mediator[] {
    return this.mediatorList;

  }
}
