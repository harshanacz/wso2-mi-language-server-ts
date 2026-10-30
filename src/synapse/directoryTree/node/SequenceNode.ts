// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/node/SequenceNode.java by the java2ts converter (see tools/java2ts).
import { AdvancedNode } from "./AdvancedNode.js";
import { Node } from "./Node.js";

export class SequenceNode extends AdvancedNode {
  static readonly __fields: string[] = ["_isMainSequence"];

  _isMainSequence: boolean = false;

  constructor(component: Node) {
    super(component);

  }

  isMainSequence(): boolean {
    return this._isMainSequence;

  }

  setMainSequence(mainSequence: boolean): void {
    this._isMainSequence = mainSequence;

  }
}
