// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/Node.java by the java2ts converter (see tools/java2ts).
import { Either } from "../lsp.js";
import { Range } from "../lsp.js";

export class Node {
  static readonly __fields: string[] = ["range", "value", "key", "displayValue"];

  range?: Either<Range, Range[]>;

  value?: string;

  key?: string;

  displayValue?: string;

  constructor();
  constructor(value: string, range: Either<Range, Range[]>);
  constructor(key: string, value: string, range: Either<Range, Range[]>);
  constructor(...args: any[]) {
    switch (args.length) {
      case 0: {

        break;
      }
      case 2: {
        const [value, range] = args;


                this.range = range;
                this.value = value;

        break;
      }
      case 3: {
        const [key, value, range] = args;


                this.range = range;
                this.key = key;
                this.value = value;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getValue(): string {
    return this.value;

  }

  getKey(): string {
    return this.key;

  }

  setRange(range: Either<Range, Range[]>): void {
    this.range = range;

  }

  setValue(value: string): void {
    this.value = value;

  }

  setDisplayValue(displayValue: string): void {
    this.displayValue = displayValue;

  }

  getDisplayValue(): string {
    return this.displayValue;

  }

  getRange(): Either<Range, Range[]> {
    return this.range;

  }
}
