// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/publishEvent/PublishEventAttributesArbitraryAttribute.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class PublishEventAttributesArbitraryAttribute extends STNode {
  static readonly __fields: string[] = ["name", "dataType", "_default", "value"];

  name?: string;

  dataType?: string;

  _default?: string;

  value?: string;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getDataType(): string {
    return this.dataType;

  }

  setDataType(dataType: string): void {
    this.dataType = dataType;

  }

  get_default(): string {
    return this._default;

  }

  set_default(_default: string): void {
    this._default = _default;

  }

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }
}
