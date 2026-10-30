// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/extension/command/PojoCommand.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../Mediator.js";
import { PojoCommandProperty } from "./PojoCommandProperty.js";

export class PojoCommand extends Mediator {
  property?: PojoCommandProperty[];

  name?: string;

  description?: string;

  getProperty(): PojoCommandProperty[] {
    return this.property;

  }

  setProperty(property: PojoCommandProperty[]): void {
    this.property = property;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }
}
