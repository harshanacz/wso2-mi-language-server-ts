// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/entity/OperationParameter.java by the java2ts converter (see tools/java2ts).

export class OperationParameter {
  static readonly __fields: string[] = ["name", "description", "required", "xsdType", "defaultValue"];

  name?: string;

  description?: string;

  required: boolean = false;

  xsdType: string = "xs:string";

  defaultValue?: string;

  constructor(name: string, description: string);
  constructor(name: string, description: string, required: boolean);
  constructor(...args: any[]) {
    dispatch: for (;;) {
    switch (args.length) {
      case 2: {
        const [name, description] = args;


                args = [name, description, false];


                continue dispatch;
        break dispatch;
      }
      case 3: {
        const [name, description, required] = args;


                this.name = name;
                this.description = description;
                this.required = required;

        break dispatch;
      }
      default: throw new Error('no matching overload');
    }
    }
  }

  getName(): string {
    return this.name;

  }

  getDescription(): string {
    return this.description;

  }

  isRequired(): boolean {
    return this.required;

  }

  setRequired(required: boolean): void {
    this.required = required;

  }

  getXsdType(): string {
    return this.xsdType;

  }

  setXsdType(xsdType: string): void {
    this.xsdType = xsdType;

  }

  getDefaultValue(): string {
    return this.defaultValue;

  }

  setDefaultValue(defaultValue: string): void {
    this.defaultValue = defaultValue;

  }
}
