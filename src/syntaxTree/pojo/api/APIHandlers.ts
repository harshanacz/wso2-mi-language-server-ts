// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/api/APIHandlers.java by the java2ts converter (see tools/java2ts).
import { APIHandlersHandler } from "./APIHandlersHandler.js";
import { STNode } from "../../stNode.js";

export class APIHandlers extends STNode {
  handler?: APIHandlersHandler[];

  getHandler(): APIHandlersHandler[] {
    return this.handler;

  }

  setHandler(handler: APIHandlersHandler[]): void {
    this.handler = handler;

  }
}
