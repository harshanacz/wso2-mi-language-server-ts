// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/tryout/pojo/Params.java by the java2ts converter (see tools/java2ts).
import { Property } from "./Property.js";

export class Type {
  static readonly __fields: string[] = [];



  static readonly QUERY = new Type("QUERY", 0);
  static readonly PATH = new Type("PATH", 1);
  static readonly FUNC = new Type("FUNC", 2);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): Type[] { return [Type.QUERY, Type.PATH, Type.FUNC]; }
  static valueOf(name: string): Type {
    const v = Type.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}

export class Params {
  queryParams?: Property[];

  pathParams?: Property[];

  functionParams?: Property[];

  constructor() {
    this.queryParams = [];
    this.pathParams = [];
    this.functionParams = [];

  }

  getQueryParams(): Property[] {
    return this.queryParams;

  }

  setQueryParams(queryParams: Property[]): void {
    this.queryParams = queryParams;

  }

  getPathParams(): Property[] {
    return this.pathParams;

  }

  setPathParams(pathParams: Property[]): void {
    this.pathParams = pathParams;

  }

  getFunctionParams(): Property[] {
    return this.functionParams;

  }

  setFunctionParams(functionParams: Property[]): void {
    this.functionParams = functionParams;

  }

  addQueryParam(property: Property): void {
    this.queryParams.push(property);

  }

  addPathParam(property: Property): void {
    this.pathParams.push(property);

  }

  addFunctionParam(property: Property): void {
    this.functionParams.push(property);

  }

  addQueryParams(properties: Property[]): void {
    this.queryParams.push(...properties);

  }

  addPathParams(properties: Property[]): void {
    this.pathParams.push(...properties);

  }

  addFunctionParams(properties: Property[]): void {
    this.functionParams.push(...properties);

  }

  getPropertiesByType(key: Type): Property[] {
    if (key == null) {
        return [];
    }
    switch (key) {
        case Type.QUERY:
            return this.queryParams;
        case Type.PATH:
            return this.pathParams;
        case Type.FUNC:
            return this.functionParams;
        default:
            return [];
    }

  }

  deepCopy(): Params {
    let params = new Params();
    params.addQueryParams(Array.from(this.queryParams));
    params.addPathParams(Array.from(this.pathParams));
    params.addFunctionParams(Array.from(this.functionParams));
    return params;

  }

  toString(): string {
    return "Params{" +
            "queryParams=" + this.queryParams +
            ", uriParams=" + this.pathParams +
            ", functionParams=" + this.functionParams +
            '}';

  }
}
