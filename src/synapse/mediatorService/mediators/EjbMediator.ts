// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/EjbMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { Ejb } from "../../../syntaxTree/pojo/mediator/extension/ejb/Ejb.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Pattern } from "../../host/regex.js";
import { Range } from "../../lsp.js";

export class EjbMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, ejb: Ejb, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (equals("EXPRESSION", get(data, "sessionIdType"))) {
        let sessionIdExpression = get(data, "sessionIdExpression") instanceof Map
                ? (get(data, "sessionIdExpression") as Map<string, any>)
                : null;

        if (sessionIdExpression != null) {
            data.set("namespaces", get(sessionIdExpression, "namespaces"));
            data.set("sessionIdExpression", "{" + get(sessionIdExpression, "value") + "}");
        }
        removeFrom(data, "sessionIdLiteral");
    } else {
        removeFrom(data, "sessionIdExpression");
    }

    let argsAvailable = false;
    let methodArguments = [];
    if (Array.isArray(get(data, "methodArguments"))) {
        let arguments_ = (get(data, "methodArguments") as any[]);
        for (let argumentObj of arguments_) {
            if (Array.isArray(argumentObj)) {
                let argument = (argumentObj as any[]);
                argsAvailable = true;

                let argumentData = new Map();
                argumentData.set("value", equals("EXPRESSION", get(argument, 1))
                        ? "{" + (get(((get(argument, 3) as Map<any, any>)), "value")) + "}"
                        : get(argument, 2));
                methodArguments.push(argumentData);
            }
        }
    }

    data.set("methodArguments", methodArguments);
    data.set("argsAvailable", argsAvailable);

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);


  }

  static getDataFromST430(node: Ejb): Map<string, any> {
    let data = new Map();

    let regex = Pattern.compile("\\{([^}]*)}");
    data.set("beanstalk", node.getBeanstalk());
    data.set("class", node.getClazz());
    data.set("target", node.getTarget());
    data.set("jndiName", node.getJndiName());
    data.set("description", node.getDescription());
    data.set("remove", node.isRemove());
    data.set("method", node.getMethod());

    if (node.getArgs() != null && node.getArgs().getArg() != null) {
        let methodArguments = [];

        for (let arg of node.getArgs().getArg()) {
            let valueMatch = regex.matcher(arg.getValue());
            let value = "";
            let expression = new Map();

            if (valueMatch.find()) {
                expression = new Map<string, any>([["isExpression", true], ["value", valueMatch.group(1)]]);
            } else {
                value = arg.getValue();
            }
            value = value == null ? "" : value;

            methodArguments.push([
                    "",
                    arg.getValue().startsWith("{") ? "EXPRESSION" : "LITERAL",
                    value,
                    expression
            ]);
        }

        data.set("methodArguments", methodArguments);
    }


    if (node.getId() != null) {
        let sessionIdMatch = regex.matcher(node.getId());
        if (sessionIdMatch.find()) {
            data.set("sessionIdType", "EXPRESSION");
            data.set("sessionIdExpression", new Map<string, any>([["isExpression", true], ["value", sessionIdMatch.group(1)], ["namespaces", MediatorUtils.transformNamespaces(node.getNamespaces())]]));
        } else {
            data.set("sessionIdType", "LITERAL");
            removeFrom(data, "sessionIdExpression");
            data.set("sessionIdLiteral", node.getId());
        }
    }

    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
