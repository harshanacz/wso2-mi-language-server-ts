// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/pojo/OverviewModel.java by the java2ts converter (see tools/java2ts).
import { format } from "../../../../syntaxTree/javaCompat.js";
import { Connection } from "./Connection.js";
import { Entrypoint } from "./Entrypoint.js";

export class OverviewModel {
  static readonly __fields: string[] = ["name", "entrypoints", "connections"];

  name?: string;

  entrypoints?: Entrypoint[];

  connections?: Connection[];

  constructor(name: string, entrypoints: Entrypoint[], connections: Connection[]) {
    this.name = name;
    this.entrypoints = entrypoints;
    this.connections = connections;

  }

  getName(): string {
    return this.name;

  }

  getEntrypoints(): Entrypoint[] {
    return this.entrypoints;

  }

  getConnections(): Connection[] {
    return this.connections;

  }

  toString(): string {
    return format("{ \"name\": \"%s\", \"entryPoints\": %s, \"connections\": %s }",
            this.name, String(this.entrypoints), String(this.connections));

  }
}
