// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/extension/Spring.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";

export class Spring extends Mediator {
  static readonly __fields: string[] = ["bean", "key", "description"];

  bean?: string;

  key?: string;

  description?: string;

  getBean(): string {
    return this.bean;

  }

  setBean(bean: string): void {
    this.bean = bean;

  }

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }
}
