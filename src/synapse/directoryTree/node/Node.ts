// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/node/Node.java by the java2ts converter (see tools/java2ts).
import { equals, Objects } from "../../../syntaxTree/javaCompat.js";

export class Node {
  static readonly __fields: string[] = ["type", "subType", "name", "path", "isFaulty"];

  type?: string;

  subType?: string;

  name?: string;

  path?: string;

  isFaulty: boolean = false;

  constructor(type: string, name: string, path: string);
  constructor(type: string, subType: string, name: string, path: string);
  constructor(...args: any[]) {
    switch (args.length) {
      case 3: {
        const [type, name, path] = args;


                this.type = type;
                this.name = name;
                this.path = path;

        break;
      }
      case 4: {
        const [type, subType, name, path] = args;


                this.type = type;
                this.subType = subType;
                this.name = name;
                this.path = path;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getType(): string {
    return this.type;

  }

  setType(type: string): void {
    this.type = type;

  }

  getSubType(): string {
    return this.subType;

  }

  setSubType(subType: string): void {
    this.subType = subType;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getPath(): string {
    return this.path;

  }

  setPath(path: string): void {
    this.path = path;

  }

  getFaulty(): boolean {
    return this.isFaulty;

  }

  setFaulty(faulty: boolean): void {
    this.isFaulty = faulty;

  }

  equals(component: Node): boolean {
    return Objects.equals(this.type, component.type) && Objects.equals(this.name, component.name) && Objects.equals(this.path, component.path);

  }
}
