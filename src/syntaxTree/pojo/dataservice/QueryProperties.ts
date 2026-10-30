// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/QueryProperties.java by the java2ts converter (see tools/java2ts).
import { Property } from "./Property.js";
import { STNode } from "../../stNode.js";

export class QueryProperties extends STNode {
  static readonly __fields: string[] = ["property"];

  property?: Property[];

  getProperty(): Property[] {
    return this.property;

  }

  setProperty(property: Property[]): void {
    this.property = property;

  }
}
