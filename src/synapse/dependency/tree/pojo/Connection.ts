// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/pojo/Connection.java by the java2ts converter (see tools/java2ts).
import { format } from "../../../../syntaxTree/javaCompat.js";

export class Connection {
  static readonly __fields: string[] = ["id", "name", "path"];

  id?: string;

  name?: string;

  path?: string;

  constructor(id: string, name: string, path: string) {
    this.id = id;
    this.name = name;
    this.path = path;

  }

  toString(): string {
    return format("{ \"id\": \"%s\", \"name\": \"%s\", \"path\": \"%s\" }", this.id, this.name, this.path);

  }
}
