// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/ResultElements.java by the java2ts converter (see tools/java2ts).
import { Attribute } from "./Attribute.js";
import { CallQuery } from "./CallQuery.js";
import { Element } from "./Element.js";

export class ResultElements {
  static readonly __fields: string[] = ["element", "attribute", "call_query"];

  element?: Element | undefined;

  attribute?: Attribute | undefined;

  call_query?: CallQuery | undefined;

  getElement(): Element | undefined {
    return this.element;

  }

  setElement(element: Element | undefined): void {
    this.element = element;

  }

  getAttribute(): Attribute | undefined {
    return this.attribute;

  }

  setAttribute(attribute: Attribute | undefined): void {
    this.attribute = attribute;

  }

  getCall_query(): CallQuery | undefined {
    return this.call_query;

  }

  setCall_query(call_query: CallQuery | undefined): void {
    this.call_query = call_query;

  }
}
