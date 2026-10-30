// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/entity/Breakpoint.java by the java2ts converter (see tools/java2ts).
import { equals, Objects } from "../../../syntaxTree/javaCompat.js";

export class Breakpoint {
  static readonly __fields: string[] = ["line", "column"];

  line: number = 0;

  column?: number;

  constructor(line: number);
  constructor(line: number, column: number);
  constructor(...args: any[]) {
    switch (args.length) {
      case 1: {
        const [line] = args;


                this.line = line;

        break;
      }
      case 2: {
        const [line, column] = args;


                this.line = line;
                this.column = column;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getLine(): number {
    return this.line;

  }

  setLine(line: number): void {
    this.line = line;

  }

  getColumn(): number {
    return this.column;

  }

  setColumn(column: number): void {
    this.column = column;

  }

  equals(o: any): boolean {
    if (this == o) return true;
    if (o == null || this.constructor !== o.constructor) return false;
    let that = (o as Breakpoint);
    return this.line == that.line && Objects.equals(this.column, that.column);

  }

  hashCode(): number {
    return (31 * (31 * 1 + (this.line ?? 0)) + (this.column ?? 0)) | 0;

  }

  toString(): string {
    return "Breakpoint{" +
            "line=" + this.line +
            ", column=" + this.column +
            '}';

  }
}
