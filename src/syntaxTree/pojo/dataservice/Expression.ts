// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/Expression.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class Expression extends STNode {
  value?: string;

  dialect?: string;

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  getDialect(): string {
    return this.dialect;

  }

  setDialect(dialect: string): void {
    this.dialect = dialect;

  }
}
