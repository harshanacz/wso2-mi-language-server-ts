// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/connector/ConnectorParameter.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class ConnectorParameter extends STNode {
  name?: string;

  isExpression: boolean = false;

  value?: string;

  expression?: string;

  constructor();
  constructor(name: string, value: string);
  constructor(...args: any[]) {
    super();
    switch (args.length) {
      case 0: {

        break;
      }
      case 2: {
        const [name, value] = args;


                this.name = name;
                this.value = value;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getIsExpression(): boolean {
    return this.isExpression;

  }

  setIsExpression(isExpression: boolean): void {
    this.isExpression = isExpression;

  }

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  getExpression(): string {
    return this.expression;

  }

  setExpression(expression: string): void {
    this.expression = expression;

  }
}
