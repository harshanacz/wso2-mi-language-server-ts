// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/filter/condRouter/ConditionalRouterConditionalRoute.java by the java2ts converter (see tools/java2ts).
import { ConditionalRouterConditionalRouteCondition } from "./ConditionalRouterConditionalRouteCondition.js";
import { STNode } from "../../../../stNode.js";
import { Target } from "../../../misc/targets/Target.js";

export class ConditionalRouterConditionalRoute extends STNode {
  condition?: ConditionalRouterConditionalRouteCondition;

  target?: Target;

  asynchronous: boolean = false;

  breakRoute: boolean = false;

  getCondition(): ConditionalRouterConditionalRouteCondition {
    return this.condition;

  }

  setCondition(condition: ConditionalRouterConditionalRouteCondition): void {
    this.condition = condition;

  }

  getTarget(): Target {
    return this.target;

  }

  setTarget(target: Target): void {
    this.target = target;

  }

  isAsynchronous(): boolean {
    return this.asynchronous;

  }

  setAsynchronous(asynchronous: boolean): void {
    this.asynchronous = asynchronous;

  }

  isBreakRoute(): boolean {
    return this.breakRoute;

  }

  setBreakRoute(breakRoute: boolean): void {
    this.breakRoute = breakRoute;

  }
}
