// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/extension/Bean.java by the java2ts converter (see tools/java2ts).
import { BeanAction } from "./BeanAction.js";
import { Mediator } from "../Mediator.js";

export class Bean extends Mediator {
  static readonly __fields: string[] = ["action", "var", "clazz", "property", "target", "value", "description"];

  action?: BeanAction;

  var?: string;

  clazz?: string;

  property?: string;

  target?: string;

  value?: string;

  description?: string;

  getAction(): BeanAction {
    return this.action;

  }

  setAction(action: BeanAction): void {
    this.action = action;

  }

  getVar(): string {
    return this.var;

  }

  setVar(var_: string): void {
    this.var = var_;

  }

  getClazz(): string {
    return this.clazz;

  }

  setClazz(clazz: string): void {
    this.clazz = clazz;

  }

  getProperty(): string {
    return this.property;

  }

  setProperty(property: string): void {
    this.property = property;

  }

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  getTarget(): string {
    return this.target;

  }

  setTarget(target: string): void {
    this.target = target;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }
}
