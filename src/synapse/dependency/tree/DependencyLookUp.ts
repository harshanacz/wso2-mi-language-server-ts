// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/DependencyLookUp.java by the java2ts converter (see tools/java2ts).
import { contains, get } from "../../../syntaxTree/javaCompat.js";
import { Dependency } from "./pojo/Dependency.js";

export class DependencyLookUp {
  static readonly __fields: string[] = ["cachedDependencyMap", "visitedPathSet"];

  cachedDependencyMap?: Map<string, Dependency>;

  visitedPathSet?: string[];

  constructor() {
    this.cachedDependencyMap = new Map();
    this.visitedPathSet = [];

  }

  addDependency(path: string, dependency: Dependency): void {
    if (path != null && dependency != null) {
        this.cachedDependencyMap.set(path, dependency);
    }

  }

  getDependency(path: string): Dependency {
    return get(this.cachedDependencyMap, path);

  }

  addToVisitedPaths(path: string): void {
    if (path != null) {
        this.visitedPathSet.push(path);
    }

  }

  isVisited(path: string): boolean {
    if (path == null) {
        return false;
    }
    return contains(this.visitedPathSet, path);

  }
}
