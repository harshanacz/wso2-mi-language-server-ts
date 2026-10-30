// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DbMediator/DbMediatorConnectionPoolProperty.java by the java2ts converter (see tools/java2ts).
import { ConnectionPoolPropertyName } from "./ConnectionPoolPropertyName.js";
import { STNode } from "../../../../stNode.js";

export class DbMediatorConnectionPoolProperty extends STNode {
  name?: ConnectionPoolPropertyName;

  value?: string;

  getName(): ConnectionPoolPropertyName {
    return this.name;

  }

  setName(name: ConnectionPoolPropertyName): void {
    this.name = name;

  }

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }
}
