// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/node/APINode.java by the java2ts converter (see tools/java2ts).
import { APIResource } from "./APIResource.js";
import { AdvancedNode } from "./AdvancedNode.js";
import { Node } from "./Node.js";

export class APINode extends AdvancedNode {
  static readonly __fields: string[] = ["context", "resources"];

  context?: string;

  resources: APIResource[] = [];

  constructor(type: string, name: string, path: string);
  constructor(component: Node);
  constructor(...args: any[]) {
    super(...(args as [any, any, any]));
  }

  getResources(): APIResource[] {
    return this.resources;

  }

  setResources(resources: APIResource[]): void {
    this.resources = resources;

  }

  addResource(resource: APIResource): void {
    this.resources.push(resource);

  }

  getContext(): string {
    return this.context;

  }

  setContext(context: string): void {
    this.context = context;

  }
}
