// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/filter/ConditionalRouterFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { ConditionalRouter } from "../../../pojo/mediator/filter/condRouter/ConditionalRouter.js";
import { ConditionalRouterConditionalRoute } from "../../../pojo/mediator/filter/condRouter/ConditionalRouterConditionalRoute.js";
import { ConditionalRouterConditionalRouteCondition } from "../../../pojo/mediator/filter/condRouter/ConditionalRouterConditionalRouteCondition.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";

export class ConditionalRouterFactory extends AbstractMediatorFactory {
  static readonly CONDITIONAL_ROUTER: string = "conditionalRouter";

  createSpecificMediator(element: DOMElement): Mediator {
    let conditionalRouter = new ConditionalRouter();
    conditionalRouter.elementNode(element);
    this.populateAttributes(conditionalRouter, element);
    let children = element.getChildren();
    let routes = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.CONDITIONAL_ROUTE)) {
                let route = this.createRoute(child);
                routes.push(route);
            }
        }
        conditionalRouter.setConditionalRoute(routes.slice());
    }
    return conditionalRouter;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let continueAfter = element.getAttribute(Constant.CONTINUE_AFTER);
    if (continueAfter != null) {
        ((node as ConditionalRouter)).setContinueAfter(parseBoolean(continueAfter));
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as ConditionalRouter)).setDescription(description);
    }

  }

  createRoute(child: DOMNode): ConditionalRouterConditionalRoute {
    let route = new ConditionalRouterConditionalRoute();
    route.elementNode((child as DOMElement));
    let breakRoute = child.getAttribute(Constant.BREAK_ROUTE);
    if (breakRoute != null) {
        route.setBreakRoute(parseBoolean(breakRoute));
    }
    let children = child.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let childNode of children) {
            if (equalsIgnoreCase(childNode.getNodeName(), Constant.CONDITION)) {
                let condition =
                        this.createConditionalRouterConditionalRouteCondition(childNode);
                route.setCondition(condition);
            } else if (equalsIgnoreCase(childNode.getNodeName(), Constant.TARGET)) {
                let target = SyntaxTreeUtils.createTarget(childNode);
                route.setTarget(target);
            }
        }
    }
    return route;

  }

  createConditionalRouterConditionalRouteCondition(element: DOMNode): ConditionalRouterConditionalRouteCondition {
    let condition = new ConditionalRouterConditionalRouteCondition();
    condition.elementNode((element as DOMElement));
    let child = element.getFirstChild();
    if (child != null) {
        if (equalsIgnoreCase(child.getNodeName(), Constant.EQUAL)) {
            let equal = SyntaxTreeUtils.createEqual(child);
            condition.setEqual(equal);
        }
    }
    return condition;

  }

  getTagName(): string {
    return ConditionalRouterFactory.CONDITIONAL_ROUTER;

  }
}
