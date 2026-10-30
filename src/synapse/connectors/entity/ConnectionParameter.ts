// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/entity/ConnectionParameter.java by the java2ts converter (see tools/java2ts).

export class ConnectionParameter {
  static readonly __fields: string[] = ["name", "isExpression", "value", "expression"];

  name?: string;

  isExpression: boolean = false;

  value?: string;

  expression?: string;

  setName(name: string): void {
    this.name = name;

  }

  setExpression(expression: boolean): void;
  setExpression(expression: string): void;
  setExpression(...args: any[]): any {
    switch (args.length) {
      case 1: {
        if (typeof args[0] === 'boolean') {
          const [expression] = args;


                  this.isExpression = expression;

        } else if (typeof args[0] === 'string') {
          const [expression] = args;


                  this.expression = expression;

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  setValue(value: string): void {
    this.value = value;

  }

  getName(): string {
    return this.name;

  }

  getValue(): string {
    return this.value;

  }
}
