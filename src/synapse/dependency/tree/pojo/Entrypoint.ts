// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/pojo/Entrypoint.java by the java2ts converter (see tools/java2ts).
import { format } from "../../../../syntaxTree/javaCompat.js";

export class Entrypoint {
  static readonly __fields: string[] = ["id", "name", "type", "path", "dependencies", "connections"];

  id?: string;

  name?: string;

  type?: string;

  path?: string;

  dependencies?: string[];

  connections?: string[];

  constructor(id: string, name: string, type: string, path: string, dependencies: string[], connections: string[]) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.path = path;
    this.dependencies = dependencies;
    this.connections = connections;

  }

  toString(): string {
    let formattedConnections = this.connections.map(s => "\"" + s + "\"").join(", ", "[", "]");
    return format("{ \"id\": \"%s\", \"name\": \"%s\", \"type\": \"%s\", \"path\": \"%s\", \"dependencies\": %s, \"connections\": %s }",
            this.id, this.name, this.type, this.path, String(this.dependencies), formattedConnections);

  }
}
