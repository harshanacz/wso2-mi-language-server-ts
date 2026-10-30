// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/filter/switchMediator/SwitchCase.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../Mediator.js";
import { STNode } from "../../../../stNode.js";

export class SwitchCase extends STNode {
  static readonly __fields: string[] = ["mediatorList", "regex"];

  mediatorList?: Mediator[];

  regex?: string;

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

  getRegex(): string {
    return this.regex;

  }

  setRegex(regex: string): void {
    this.regex = regex;

  }
}
