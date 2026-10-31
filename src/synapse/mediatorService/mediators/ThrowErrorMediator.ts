// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/ThrowErrorMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { ThrowError } from "../../../syntaxTree/pojo/mediator/core/ThrowError.js";

export class ThrowErrorMediator {
  static readonly __fields: string[] = [];

  static processData(data: Map<string, any>, throwError: ThrowError, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let errorMessageObj: any = get(data, "errorMessage");
    if (errorMessageObj instanceof Map) {
        let errorMessage = (errorMessageObj as Map<string, any>);
        if (equals(true, get(errorMessage, "isExpression"))) {
            errorMessage.set("value", "{" + get(errorMessage, "value") + "}");
        } else {
            errorMessage.set("value", get(errorMessage, "value"));
        }
    }
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);

  }

  static getDataFromST(throwError: ThrowError): Map<string, any> {
    let data = new Map();

    let isExpression = throwError.getErrorMessage() != null && throwError.getErrorMessage().startsWith("{") &&
            throwError.getErrorMessage().endsWith("}");
    let value = throwError.getErrorMessage();
    if (isExpression && value != null) {
        value = value.substring(1, value.length - 1);
    }

    let referringSequence = new Map();
    referringSequence.set("isExpression", isExpression);
    referringSequence.set("value", value);
    referringSequence.set("namespaces", MediatorUtils.transformNamespaces(throwError.getNamespaces()));
    data.set("description", throwError.getDescription());
    data.set("type", throwError.getType());
    data.set("errorMessage", referringSequence);
    data.set("traceFilter", equals("enable", throwError.getTraceFilter()));
    return data;

  }
}
