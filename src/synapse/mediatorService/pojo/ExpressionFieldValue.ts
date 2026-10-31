// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/pojo/ExpressionFieldValue.java by the java2ts converter (see tools/java2ts).
import { Namespace } from "./Namespace.js";

export class ExpressionFieldValue {
  static readonly __fields: string[] = ["value", "_isExpression", "namespaces"];

  value?: string;

  _isExpression: boolean = false;

  namespaces?: Namespace[];

  constructor(value: string, isExpression: boolean, namespaces: Namespace[]) {
    this.value = value;
    this._isExpression = isExpression;
    this.namespaces = namespaces;

  }

  getValue(): string {
    return this.value;

  }

  isExpression(): boolean {
    return this._isExpression;

  }

  getNamespaces(): Namespace[] {
    return this.namespaces;

  }
}
