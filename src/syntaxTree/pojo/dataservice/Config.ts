// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/Config.java by the java2ts converter (see tools/java2ts).
import { Property } from "./Property.js";
import { STNode } from "../../stNode.js";

export class Config extends STNode {
  property?: Property[];

  id?: string;

  enableOData: boolean = false;

  getProperty(): Property[] {
    return this.property;

  }

  setProperty(property: Property[]): void {
    this.property = property;

  }

  getId(): string {
    return this.id;

  }

  setId(id: string): void {
    this.id = id;

  }

  isEnableOData(): boolean {
    return this.enableOData;

  }

  setEnableOData(enableOData: boolean): void {
    this.enableOData = enableOData;

  }
}
