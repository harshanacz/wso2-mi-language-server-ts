// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/Property.java by the java2ts converter (see tools/java2ts).
import { PropertyConfiguration } from "./PropertyConfiguration.js";
import { PropertyProperty } from "./PropertyProperty.js";
import { STNode } from "../../stNode.js";

export class Property extends STNode {
  static readonly __fields: string[] = ["configuration", "property", "name"];

  configuration?: PropertyConfiguration[];

  property?: PropertyProperty[];

  name?: string;

  getConfiguration(): PropertyConfiguration[] {
    return this.configuration;

  }

  setConfiguration(configuration: PropertyConfiguration[]): void {
    this.configuration = configuration;

  }

  getProperty(): PropertyProperty[] {
    return this.property;

  }

  setProperty(property: PropertyProperty[]): void {
    this.property = property;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }
}
