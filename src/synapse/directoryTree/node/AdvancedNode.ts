// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/node/AdvancedNode.java by the java2ts converter (see tools/java2ts).
import { equals, Objects } from "../../../syntaxTree/javaCompat.js";
import { Node } from "./Node.js";

export class AdvancedNode extends Node {
  static readonly __fields: string[] = ["sequences", "endpoints"];

  sequences?: Node[];

  endpoints?: Node[];

  constructor(type: string, name: string, path: string);
  constructor(component: Node);
  constructor(...args: any[]) {
    switch (args.length) {
      case 3: {
        const [type, name, path] = args;


                super(type, name, path);
                this.sequences = [];
                this.endpoints = [];

        break;
      }
      case 1: {
        const [component] = args;


                super(component.getType(), component.getSubType(), component.getName(), component.getPath());
                this.sequences = [];
                this.endpoints = [];

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  addEndpoint(endpoint: Node): void {
    if (!this.alreadyExists(this.endpoints, endpoint)) {
        this.endpoints.push(endpoint);
    }

  }

  addSequence(sequence: Node): void {
    if (!this.alreadyExists(this.sequences, sequence)) {
        this.sequences.push(sequence);
    }

  }

  alreadyExists(components: Node[], component: Node): boolean {
    for (let c of components) {
        if (Objects.equals(c.name, component.getName())) {
            return true;
        }
    }
    return false;

  }
}
