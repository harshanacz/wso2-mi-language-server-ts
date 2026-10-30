// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/tryout/pojo/MediatorTryoutInfo.java by the java2ts converter (see tools/java2ts).
import { JsonPrimitive } from "../../../gson.js";
import { MediatorInfo } from "./MediatorInfo.js";
import { Params } from "./Params.js";
import { Property } from "./Property.js";

export class MediatorTryoutInfo {
  static readonly __fields: string[] = ["id", "input", "output", "error"];

  id?: string;

  input?: MediatorInfo;

  output?: MediatorInfo;

  error?: string;

  constructor();
  constructor(id: string, input: MediatorInfo, output: MediatorInfo);
  constructor(id: string, input: MediatorInfo, error: string);
  constructor(input: MediatorInfo, output: MediatorInfo);
  constructor(error: string);
  constructor(...args: any[]) {
    switch (args.length) {
      case 0: {
        this.input = new MediatorInfo();
        this.output = new MediatorInfo();

        break;
      }
      case 3: {
        if (args[2] instanceof MediatorInfo) {
          const [id, input, output] = args;


                  this.input = input;
                  this.output = output;
                  this.id = id;

        } else if (typeof args[2] === 'string') {
          const [id, input, error] = args;


                  this.id = id;
                  this.input = input;
                  this.error = error;

        }
        break;
      }
      case 2: {
        const [input, output] = args;


                this.input = input;
                this.output = output;

        break;
      }
      case 1: {
        const [error] = args;


                this.error = error;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getId(): string {
    return this.id;

  }

  setId(id: string): void {
    this.id = id;

  }

  getInput(): MediatorInfo {
    if (this.input != null) {
        return this.input.deepCopy();
    }
    return null;

  }

  getOutput(): MediatorInfo {
    if (this.output != null) {
        return this.output.deepCopy();
    }
    return null;

  }

  setError(error: string): void {
    this.error = error;

  }

  getError(): string {
    return this.error;

  }

  setInputPayload(jsonPrimitive: JsonPrimitive): void {
    this.input.setPayload(jsonPrimitive);

  }

  addInputSynapseProperties(property: Property): void {
    this.input.addSynapseProperty(property);

  }

  addInputAxis2Properties(property: Property): void {
    this.input.addAxis2Property(property);

  }

  addInputAxis2ClientProperties(property: Property): void {
    this.input.addAxis2ClientProperty(property);

  }

  addInputAxis2TransportProperties(property: Property): void {
    this.input.addAxis2TransportProperty(property);

  }

  addInputAxis2OperationProperties(property: Property): void {
    this.input.addAxis2OperationProperty(property);

  }

  setOutputPayload(jsonPrimitive: JsonPrimitive): void {
    this.output.setPayload(jsonPrimitive);

  }

  addOutputSynapseProperties(property: Property): void {
    this.output.addSynapseProperty(property);

  }

  addOutputAxis2Properties(property: Property): void {
    this.output.addAxis2Property(property);

  }

  addOutputAxis2ClientProperties(property: Property): void {
    this.output.addAxis2ClientProperty(property);

  }

  addOutputAxis2TransportProperties(property: Property): void {
    this.output.addAxis2TransportProperty(property);

  }

  addOutputAxis2OperationProperties(property: Property): void {
    this.output.addAxis2OperationProperty(property);

  }

  addOutputVariable(property: Property): void;
  addOutputVariable(name: string, value: string): void;
  addOutputVariable(...args: any[]): any {
    switch (args.length) {
      case 1: {
        const [property] = args;


                this.output.addVariable(property);

        break;
      }
      case 2: {
        const [name, value] = args;


                this.output.addVariable(new Property(name, value));

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  setInputConfigs(configs: Property[]): void {
    this.input.setConfigs(configs);

  }

  setOutputConfigs(configs: Property[]): void {
    this.output.setConfigs(configs);

  }

  removeOutputVariable(name: string): void {
    this.output.removeVariable(name);

  }

  addOutputHeader(property: Property): void {
    this.output.addHeader(property);

  }

  removeOutputHeader(name: string): void {
    this.output.removeHeader(name);

  }

  setInputParams(params: Params): void {
    this.input.setParams(params);

  }

  setOutputParams(params: Params): void {
    this.output.setParams(params);

  }

  replaceInputWithOutput(): void {
    this.input = this.output.deepCopy();

  }

  toString(): string {
    return "MediatorTryoutInfo{" +
            "id='" + this.id + '\'' +
            ", input=" + this.input +
            ", output=" + this.output +
            ", error='" + this.error + '\'' +
            '}';

  }
}
