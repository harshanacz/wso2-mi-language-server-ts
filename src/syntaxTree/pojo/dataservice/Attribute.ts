// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/Attribute.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class Attribute extends STNode {
  name?: string;

  column?: string;

  requiredRoles?: string;

  export?: string;

  exportType?: string;

  xsdType?: string;

  namespace?: string;

  optional: boolean = false;

  arrayName?: string;

  queryParam?: string;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getColumn(): string {
    return this.column;

  }

  setColumn(column: string): void {
    this.column = column;

  }

  getRequiredRoles(): string {
    return this.requiredRoles;

  }

  setRequiredRoles(requiredRoles: string): void {
    this.requiredRoles = requiredRoles;

  }

  getExport(): string {
    return this.export;

  }

  setExport(export_: string): void {
    this.export = export_;

  }

  getExportType(): string {
    return this.exportType;

  }

  setExportType(exportType: string): void {
    this.exportType = exportType;

  }

  getXsdType(): string {
    return this.xsdType;

  }

  setXsdType(xsdType: string): void {
    this.xsdType = xsdType;

  }

  getNamespace(): string {
    return this.namespace;

  }

  setNamespace(namespace: string): void {
    this.namespace = namespace;

  }

  isOptional(): boolean {
    return this.optional;

  }

  setOptional(optional: boolean): void {
    this.optional = optional;

  }

  getArrayName(): string {
    return this.arrayName;

  }

  setArrayName(arrayName: string): void {
    this.arrayName = arrayName;

  }

  getQueryParam(): string {
    return this.queryParam;

  }

  setQueryParam(queryParam: string): void {
    this.queryParam = queryParam;

  }
}
