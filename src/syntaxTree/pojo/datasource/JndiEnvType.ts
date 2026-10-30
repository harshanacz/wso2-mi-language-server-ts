// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/datasource/JndiEnvType.java by the java2ts converter (see tools/java2ts).
import { PropertyType } from "./PropertyType.js";
import { STNode } from "../../stNode.js";

export class JndiEnvType extends STNode {
  static readonly __fields: string[] = ["property"];

  property?: PropertyType[];

  getProperty(): PropertyType[] {
    return this.property;

  }

  setProperty(property: PropertyType[]): void {
    this.property = property;

  }
}
