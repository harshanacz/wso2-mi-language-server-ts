// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/TestProperties.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";
import { TestProperty } from "./TestProperty.js";

export class TestProperties extends STNode {
  static readonly __fields: string[] = ["properties"];

  properties?: TestProperty[];

  constructor() {
    super();
    this.properties = [];

  }

  addProperty(property: TestProperty): void {
    this.properties.push(property);

  }
}
