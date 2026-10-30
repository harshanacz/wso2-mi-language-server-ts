// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/NamedEndpoint.java by the java2ts converter (see tools/java2ts).
import { Endpoint } from "./Endpoint.js";

export class NamedEndpoint extends Endpoint {
  name?: string;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }
}
