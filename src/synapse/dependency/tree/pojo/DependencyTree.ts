// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/pojo/DependencyTree.java by the java2ts converter (see tools/java2ts).
import { contains } from "../../../../syntaxTree/javaCompat.js";
import { Dependency } from "./Dependency.js";

export class DependencyTree {
  static readonly __fields: string[] = ["name", "type", "path", "dependencyList"];

  name?: string;

  type?: string;

  path?: string;

  dependencyList?: Dependency[];

  constructor() {
    this.dependencyList = [];

  }

  getDependencyList(): Dependency[] {
    return this.dependencyList;

  }

  addDependency(dependency: Dependency): void {
    if (!contains(this.dependencyList, dependency)) {
        this.dependencyList.push(dependency);
    }

  }

  getName(): string {
    return this.name;

  }

  getPath(): string {
    return this.path;

  }

  getType(): string {
    return this.type;

  }

  setName(name: string): void {
    this.name = name;

  }

  setPath(path: string): void {
    this.path = path;

  }

  setType(type: string): void {
    this.type = type;

  }

  toString(): string {
    return "DependencyTree{" +
            "name='" + this.name + '\'' +
            ", path='" + this.path + '\'' +
            ", dependencyList=" + this.dependencyList +
            '}';

  }
}
