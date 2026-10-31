// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/expression/pojo/ExpressionParam.java by the java2ts converter (see tools/java2ts).
import { Position } from "../../lsp.js";

export class ExpressionParam {
  static readonly __fields: string[] = ["documentUri", "position", "expression", "offset", "needLastMediator"];

  documentUri?: string;

  position?: Position;

  expression?: string;

  offset: number = 0;

  needLastMediator: boolean = false;

  constructor(expression: string, offset: number);
  constructor(documentUri: string, position: Position, expression: string, offset: number);
  constructor(documentUri: string, position: Position);
  constructor(documentUri: string, position: Position, needLastMediator: boolean);
  constructor(...args: any[]) {
    switch (args.length) {
      case 2: {
        if (typeof args[1] === 'number') {
          const [expression, offset] = args;


                  this.expression = expression;
                  this.offset = offset;

        } else if (args[1] instanceof Position) {
          const [documentUri, position] = args;


                  this.documentUri = documentUri;
                  this.position = position;

        }
        break;
      }
      case 4: {
        const [documentUri, position, expression, offset] = args;


                this.documentUri = documentUri;
                this.position = position;
                this.expression = expression;
                this.offset = offset;

        break;
      }
      case 3: {
        const [documentUri, position, needLastMediator] = args;


                this.documentUri = documentUri;
                this.position = position;
                this.needLastMediator = needLastMediator;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getDocumentUri(): string {
    return this.documentUri;

  }

  getPosition(): Position {
    return this.position;

  }

  getExpression(): string {
    return this.expression;

  }

  getOffset(): number {
    return this.offset;

  }

  getNeedLastMediator(): boolean {
    return this.needLastMediator;

  }
}
