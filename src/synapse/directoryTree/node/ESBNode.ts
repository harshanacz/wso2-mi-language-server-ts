// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/node/ESBNode.java by the java2ts converter (see tools/java2ts).
import { get } from "../../../syntaxTree/javaCompat.js";
import { Node } from "./Node.js";

export class ESBNode extends Node {
  static readonly __fields: string[] = ["esbConfigs"];

  esbConfigs?: Map<string, Node[]>;

  constructor(type: string, name: string, path: string) {
    super(type, name, path);
    this.esbConfigs = new Map();
    let esbKeys = Array.from([
            "api", "endpoints", "inbound-endpoints", "message-processors",
            "local-entries", "message-stores", "proxy-services", "sequences",
            "tasks", "templates"
    ]);
    for (let key of esbKeys) {
        this.esbConfigs.set(key, []);
    }

  }

  addEsbConfig(type: string, component: Node): void {
    get(this.esbConfigs, type).push(component);

  }
}
