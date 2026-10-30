// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/pojo/Dependency.java by the java2ts converter (see tools/java2ts).
import { equals, unmodifiable, Objects } from "../../../../syntaxTree/javaCompat.js";
import { ArtifactType } from "../ArtifactType.js";

export class Dependency {
  static readonly __fields: string[] = ["name", "type", "path", "dependencyList"];

  name?: string;

  type?: ArtifactType;

  path?: string;

  dependencyList?: Dependency[];

  constructor(name: string, type: ArtifactType, path: string);
  constructor(name: string, type: ArtifactType, path: string, dependencyList: Dependency[]);
  constructor(...args: any[]) {
    dispatch: for (;;) {
    switch (args.length) {
      case 3: {
        const [name, type, path] = args;


                args = [name, type, path, []];


                continue dispatch;
        break dispatch;
      }
      case 4: {
        const [name, type, path, dependencyList] = args;


                this.name = name;
                this.type = type;
                this.path = path;
                this.dependencyList = Array.from(dependencyList);

        break dispatch;
      }
      default: throw new Error('no matching overload');
    }
    }
  }

  getName(): string {
    return this.name;

  }

  getType(): ArtifactType {
    return this.type;

  }

  getPath(): string {
    return this.path;

  }

  getDependencyList(): Dependency[] {
    return unmodifiable(this.dependencyList);

  }

  addDependency(dependency: Dependency): void {
    this.dependencyList.push(dependency);

  }

  equals(obj: any): boolean {
    if (this == obj) {
        return true;
    }
    if (obj == null || getClass() != obj.constructor) {
        return false;
    }
    let that = (obj as Dependency);
    return this.equals(this.name, that.name) && this.type == that.type && this.path != null && this.equals(this.path, that.path);

  }

  hashCode(): number {
    return Objects.hash(this.name, this.type, this.path);

  }

  toString(): string {
    return "Dependency{" +
            "name='" + this.name + '\'' +
            ", type=" + this.type +
            ", path='" + this.path + '\'' +
            ", dependencyList=" + this.dependencyList +
            '}';

  }
}
