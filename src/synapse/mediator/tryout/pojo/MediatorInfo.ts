// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/tryout/pojo/MediatorInfo.java by the java2ts converter (see tools/java2ts).
import { equals, removeFrom, StringUtils } from "../../../../syntaxTree/javaCompat.js";
import { JsonPrimitive } from "../../../gson.js";
import { Params } from "./Params.js";
import { Properties } from "./Properties.js";
import { Property } from "./Property.js";

export class MediatorInfo {
  static readonly __fields: string[] = ["payload", "variables", "headers", "properties", "params", "configs"];

  payload?: JsonPrimitive;

  variables?: Property[];

  headers?: Property[];

  properties?: Properties;

  params?: Params;

  configs?: Property[];

  constructor() {
    this.payload = new JsonPrimitive(StringUtils.EMPTY);
    this.variables = [];
    this.headers = [];
    this.properties = new Properties();
    this.params = new Params();
    this.configs = [];

  }

  addSynapseProperties(properties: Property[]): void {
    this.properties.addSynapseProperties(properties);

  }

  addAxis2Properties(properties: Property[]): void {
    this.properties.addAxis2Properties(properties);

  }

  addAxis2ClientProperties(properties: Property[]): void {
    this.properties.addAxis2ClientProperties(properties);

  }

  addAxis2TransportProperties(properties: Property[]): void {
    this.properties.addAxis2TransportProperties(properties);
    this.headers.push(...properties);

  }

  addAxis2OperationProperties(properties: Property[]): void {
    this.properties.addAxis2OperationProperties(properties);

  }

  addVariables(properties: Property[]): void {
    this.variables.push(...properties);

  }

  addSynapseProperty(property: Property): void {
    this.properties.addSynapseProperty(property);

  }

  addAxis2Property(property: Property): void {
    this.properties.addAxis2Property(property);

  }

  addAxis2ClientProperty(property: Property): void {
    this.properties.addAxis2ClientProperty(property);

  }

  addAxis2TransportProperty(property: Property): void {
    this.properties.addAxis2TransportProperty(property);
    this.headers.push(property);

  }

  addAxis2OperationProperty(property: Property): void {
    this.properties.addAxis2OperationProperty(property);

  }

  addVariable(property: Property): void {
    this.variables.push(property);

  }

  addHeader(key: string, value: string): void;
  addHeader(property: Property): void;
  addHeader(...args: any[]): any {
    switch (args.length) {
      case 2: {
        const [key, value] = args;


                this.headers.push(new Property(key, value));

        break;
      }
      case 1: {
        const [property] = args;


                this.headers.push(property);

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  addQueryParam(key: string, value: string): void {
    this.params.addQueryParam(new Property(key, value));

  }

  addUriParam(key: string, value: string): void {
    this.params.addPathParam(new Property(key, value));

  }

  addFunctionParam(key: string, value: string): void {
    this.params.addFunctionParam(new Property(key, value));

  }

  addConfig(config: Property): void {
    this.configs.push(config);

  }

  setPayload(payload: JsonPrimitive): void {
    this.payload = payload;

  }

  getPayload(): JsonPrimitive {
    return this.payload;

  }

  getSynapse(): Property[] {
    return this.properties.getSynapse();

  }

  getAxis2(): Property[] {
    return this.properties.getAxis2();

  }

  getAxis2Client(): Property[] {
    return this.properties.getAxis2Client();

  }

  getAxis2Transport(): Property[] {
    return this.properties.getAxis2Transport();

  }

  getAxis2Operation(): Property[] {
    return this.properties.getAxis2Operation();

  }

  getVariables(): Property[] {
    return this.variables;

  }

  getHeaders(): Property[] {
    return this.headers;

  }

  getProperties(): Properties {
    return this.properties;

  }

  getParams(): Params {
    return this.params;

  }

  setParams(params: Params): void {
    this.params = params;

  }

  setVariables(variables: Property[]): void {
    this.variables = variables;

  }

  setHeaders(headers: Property[]): void {
    this.headers = headers;

  }

  setProperties(properties: Properties): void {
    this.properties = properties;

  }

  getConfigs(): Property[] {
    return this.configs;

  }

  setConfigs(configs: Property[]): void {
    this.configs = configs;

  }

  deepCopy(): MediatorInfo {
    let mediatorInfo = new MediatorInfo();
    mediatorInfo.setPayload(this.payload.deepCopy());
    mediatorInfo.setVariables(Array.from(this.variables));
    mediatorInfo.setProperties(this.properties.deepCopy());
    mediatorInfo.setHeaders(Array.from(this.headers));
    mediatorInfo.setParams(this.params.deepCopy());
    mediatorInfo.setConfigs(Array.from(this.configs));
    return mediatorInfo;

  }

  addHeaders(headers: Property[]): void {
    this.headers.push(...headers);

  }

  removeHeader(name: string): void {
    if (this.headers == null) {
        return;
    }
    for (let header of this.headers) {
        if (equals(header.getKey(), name)) {
            removeFrom(this.headers, header);
            break;
        }
    }

  }

  removeVariable(name: string): void {
    if (this.variables == null) {
        return;
    }
    for (let variable of this.variables) {
        if (equals(variable.getKey(), name)) {
            removeFrom(this.variables, variable);
            break;
        }
    }

  }

  toString(): string {
    return "MediatorInfo{" +
            "payload=" + this.payload +
            ", variables=" + this.variables +
            ", headers=" + this.headers +
            ", properties=" + this.properties +
            ", params=" + this.params +
            '}';

  }
}
