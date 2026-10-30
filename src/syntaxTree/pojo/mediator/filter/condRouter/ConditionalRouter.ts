// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/filter/condRouter/ConditionalRouter.java by the java2ts converter (see tools/java2ts).
import { ConditionalRouterConditionalRoute } from "./ConditionalRouterConditionalRoute.js";
import { Mediator } from "../../Mediator.js";

export class ConditionalRouter extends Mediator {
  static readonly __fields: string[] = ["conditionalRoute", "continueAfter", "description"];

  conditionalRoute?: ConditionalRouterConditionalRoute[];

  continueAfter: boolean = false;

  description?: string;

  getConditionalRoute(): ConditionalRouterConditionalRoute[] {
    return this.conditionalRoute;

  }

  setConditionalRoute(conditionalRoute: ConditionalRouterConditionalRoute[]): void {
    this.conditionalRoute = conditionalRoute;

  }

  isContinueAfter(): boolean {
    return this.continueAfter;

  }

  setContinueAfter(continueAfter: boolean): void {
    this.continueAfter = continueAfter;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }
}
