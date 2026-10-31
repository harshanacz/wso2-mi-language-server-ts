// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/expression/pojo/ExpressionCompletionContext.java by the java2ts converter (see tools/java2ts).
import { size, removeFrom, unmodifiable } from "../../../syntaxTree/javaCompat.js";
import { ExpressionCompletionType } from "./ExpressionCompletionType.js";
import { Range } from "../../lsp.js";

export class ExpressionCompletionContext {
  static readonly __fields: string[] = ["parent", "segment", "range", "type", "needNext"];

  parent?: ExpressionCompletionContext;

  segment?: string[];

  range?: Range;

  type?: ExpressionCompletionType;

  needNext: boolean = false;

  constructor(parent: ExpressionCompletionContext);
  constructor(parent: ExpressionCompletionContext, type: ExpressionCompletionType);
  constructor();
  constructor(parent: ExpressionCompletionContext, segment: string[], range: Range);
  constructor(...args: any[]) {
    switch (args.length) {
      case 1: {
        const [parent] = args;


                this.parent = parent.deepCopy();
                this.segment = [];

        break;
      }
      case 2: {
        const [parent, type] = args;


                this.parent = parent;
                this.type = type;
                this.segment = [];

        break;
      }
      case 0: {
        this.segment = [];
        this.type = ExpressionCompletionType.ROOT_LEVEL;

        break;
      }
      case 3: {
        const [parent, segment, range] = args;


                this.parent = parent.deepCopy();
                this.segment = Array.from(segment);
                this.range = range;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  addSegment(segment: string): void {
    this.segment.push(segment);

  }

  setRange(range: Range): void {
    this.range = range;

  }

  getParent(): ExpressionCompletionContext {
    if (this.parent == null) {
        return null;
    }
    return this.parent.deepCopy();

  }

  getSegment(): string[] {
    return unmodifiable(this.segment);

  }

  getRange(): Range {
    return this.range;

  }

  getType(): ExpressionCompletionType {
    return this.type;

  }

  setType(type: ExpressionCompletionType): void {
    this.type = type;

  }

  isNeedNext(): boolean {
    return this.needNext;

  }

  setNeedNext(needNext: boolean): void {
    this.needNext = needNext;

  }

  pop(): void {
    removeFrom(this.segment, size(this.segment) - 1);

  }

  deepCopy(): ExpressionCompletionContext {
    let clone = new ExpressionCompletionContext();
    clone.segment = Array.from(this.segment);
    clone.range = this.range;
    clone.type = this.type;
    clone.needNext = this.needNext;
    if (this.parent != null) {
        clone.parent = this.parent.deepCopy();
    }
    return clone;

  }
}
