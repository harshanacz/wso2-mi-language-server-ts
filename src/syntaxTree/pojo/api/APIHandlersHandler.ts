// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/api/APIHandlersHandler.java by the java2ts converter (see tools/java2ts).
import { APIHandlersHandlerProperty } from "./APIHandlersHandlerProperty.js";
import { STNode } from "../../stNode.js";

export class APIHandlersHandler extends STNode {
  property?: APIHandlersHandlerProperty[];

  clazz?: string;

  getProperty(): APIHandlersHandlerProperty[] {
    return this.property;

  }

  setProperty(property: APIHandlersHandlerProperty[]): void {
    this.property = property;

  }

  getClazz(): string {
    return this.clazz;

  }

  setClazz(clazz: string): void {
    this.clazz = clazz;

  }
}
