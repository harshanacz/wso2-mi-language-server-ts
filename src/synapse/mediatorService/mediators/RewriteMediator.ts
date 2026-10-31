// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/RewriteMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, size, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { Rewrite } from "../../../syntaxTree/pojo/mediator/transformation/rewrite/Rewrite.js";

export class RewriteMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, rewrite: Rewrite, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("urlRewriteRules") && Array.isArray(get(data, "urlRewriteRules"))) {
        let urlRewriteRulesList = (get(data, "urlRewriteRules") as any[]);
        let processedRules = [];

        for (let ruleObj of urlRewriteRulesList) {
            if (Array.isArray(ruleObj)) {
                let rewriteRule = (ruleObj as any[]);

                let processedRule = new Map();
                if (size(rewriteRule) > 1 &&
                        (typeof get(rewriteRule, 1) === "string") &&
                        !isEmpty(String(get(rewriteRule, 1)))) {
                    processedRule.set("condition", get(rewriteRule, 1));
                }

                if (Array.isArray(get(rewriteRule, 0))) {
                    let ruleActions = (get(rewriteRule, 0) as any[]);
                    let processedActions = [];

                    for (let actionObj of ruleActions) {
                        if (Array.isArray(actionObj)) {
                            let action = (actionObj as any[]);

                            let actionMap = new Map();
                            actionMap.set("ruleAction", get(action, 0) != null ?
                                    ((get(action, 0) as string)).toLowerCase() : null);
                            actionMap.set("ruleFragment", size(action) > 1 ? get(action, 1) : null);
                            actionMap.set("actionValue", size(action) > 2 &&
                                    equals("Literal", get(action, 2)) ? get(action, 3) : null);
                            actionMap.set("actionExpression", size(action) > 2 && equals("Expression", get(action, 2))
                                    ?get(((get(action, 4) as Map<any, any>)), "value") : null);
                            actionMap.set("namespaces", size(action) > 2 && equals("Expression", get(action, 2))
                                    ?get(((get(action, 4) as Map<any, any>)), "namespaces") : null);
                            actionMap.set("actionRegex", size(action) > 5 ? get(action, 5) : null);

                            processedActions.push(actionMap);
                        }
                    }

                    processedRule.set("rewriteRuleAction", processedActions);
                }

                processedRules.push(processedRule);
            }
        }

        data.set("urlRewriteRules", processedRules);
    }
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }
    return Either.forLeft(data);


  }

  static getDataFromST430(node: Rewrite): Map<string, any> {
    let data = new Map();
    data.set("inProperty", node.getInProperty());
    data.set("outProperty", node.getOutProperty());
    data.set("description", node.getDescription());

    let urlRewriteRules = [];
    for (let rewriteRule of node.getRewriterule()) {
        let actions = [];

        for (let action of rewriteRule.getAction()) {
            let namespaces = MediatorUtils.transformNamespaces(action.getNamespaces());

            let ruleAction = [
                    action.getType() != null ? String(action.getType()) : "",
                    action.getFragment() != null ? String(action.getFragment()) : "",
                    action.getValue() != null ? "Literal" : "Expression",
                    action.getValue() != null ? action.getValue() : "",
                    new Map<string, any>([["isExpression", true], ["value", action.getXpath() != null ? action.getXpath() : ""], ["namespaces", namespaces]]),
                    action.getRegex() != null ? action.getRegex() : ""
            ];
            actions.push(ruleAction);
        }

        urlRewriteRules.push([actions, rewriteRule.getCondition() != null ?
                rewriteRule.getCondition().getCondition() : ""]);
    }

    data.set("urlRewriteRules", urlRewriteRules);
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
