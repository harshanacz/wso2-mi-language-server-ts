// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/Param.java by the java2ts converter (see tools/java2ts).
import { ParamElements } from "./ParamElements.js";
import { STNode } from "../../stNode.js";

export class Param extends STNode {
  static readonly __fields: string[] = ["paramElements", "name", "sqlType", "paramType", "type", "ordinal", "defaultValue", "optional", "structType"];

  paramElements?: ParamElements[];

  name?: string;

  sqlType?: string;

  paramType?: string;

  type?: string;

  ordinal: number = 0;

  defaultValue?: string;

  optional: boolean = false;

  structType?: string;

  getParamElements(): ParamElements[] {
    return this.paramElements;

  }

  setParamElements(paramElements: ParamElements[]): void {
    this.paramElements = paramElements;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getSqlType(): string {
    return this.sqlType;

  }

  setSqlType(sqlType: string): void {
    this.sqlType = sqlType;

  }

  getParamType(): string {
    return this.paramType;

  }

  setParamType(paramType: string): void {
    this.paramType = paramType;

  }

  getType(): string {
    return this.type;

  }

  setType(type: string): void {
    this.type = type;

  }

  getOrdinal(): number {
    return this.ordinal;

  }

  setOrdinal(ordinal: number): void {
    this.ordinal = ordinal;

  }

  getDefaultValue(): string {
    return this.defaultValue;

  }

  setDefaultValue(defaultValue: string): void {
    this.defaultValue = defaultValue;

  }

  isOptional(): boolean {
    return this.optional;

  }

  setOptional(optional: boolean): void {
    this.optional = optional;

  }

  getStructType(): string {
    return this.structType;

  }

  setStructType(structType: string): void {
    this.structType = structType;

  }
}
