// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/FaultMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean, jsplit, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { Makefault } from "../../../syntaxTree/pojo/mediator/transformation/fault/Makefault.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";

export class FaultMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, makefault: Makefault, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("detail") && get(data, "detail") instanceof Map) {
        let detail = (get(data, "detail") as Map<string, any>);
        if (equals(true, get(detail, "isExpression"))) {
            data.set("detailExpression", detail);
        } else {
            data.set("detailValue", get(detail, "value"));
        }
    }


    if (data.has("reason") && get(data, "reason") instanceof Map) {
        let reason = (get(data, "reason") as Map<string, any>);
        if (equals(true, get(reason, "isExpression"))) {
            data.set("reasonExpression", reason);
        } else {
            data.set("reasonValue", get(reason, "value"));
        }
    }
    data.set("hasReason", data.has("reasonValue") || data.has("reasonExpression"));


    if (data.has("soapVersion") && (typeof get(data, "soapVersion") === "string")) {
        let soapVersion = ((get(data, "soapVersion") as string)).toLowerCase();
        data.set("soapVersion", soapVersion);

        switch (soapVersion) {
            case "soap11":
                data.set("soapUri", "http://schemas.xmlsoap.org/soap/envelope/");
                data.set("code", get(data, "soap11"));
                removeFrom(data, "Role");
                removeFrom(data, "node");
                break;
            case "soap12":
                data.set("soapUri", "http://www.w3.org/2003/05/soap-envelope");
                data.set("code", get(data, "soap12"));
                removeFrom(data, "actor");
                break;
            case "pox":
                removeFrom(data, "actor");
                removeFrom(data, "node");
                removeFrom(data, "Role");
                data.set("isPox", true);
                break;
            default:
                break;
        }
    }

    if (equals(true, get(data, "serializeResponse")) && !equals(true, get(data, "markAsResponse"))) {
        data.set("markAsResponse", false);
    } else if (equals(false, get(data, "serializeResponse"))) {
        removeFrom(data, "markAsResponse");
    }

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);


  }

  static getDataFromST430(node: Makefault): Map<string, any> {
    let data = new Map();
    if (node.getDetail() != null && node.getDetail().getExpression() != null) {
        data.set("detail", new Map<string, any>([["isExpression", true], ["value", node.getDetail().getExpression() != null ? node.getDetail().getExpression() : ""], ["namespaces", MediatorUtils.transformNamespaces(node.getDetail().getNamespaces())]]));
    } else {
        data.set("detail", new Map<string, any>([["isExpression", false], ["value", node.getDetail() != null ? node.getDetail().getTextNode() : ""]]));
    }


    if (node.getReason() != null && node.getReason().getExpression() != null) {
        data.set("reason", new Map<string, any>([["isExpression", true], ["value", node.getReason().getExpression() != null ? node.getReason().getExpression() : ""], ["namespaces", MediatorUtils.transformNamespaces(node.getReason().getNamespaces())]]));
    } else {
        data.set("reason", new Map<string, any>([["isExpression", false], ["value", node.getReason() != null ? node.getReason().getValue() : ""]]));
    }


    data.set("soapVersion", String(node.getVersion()));


    data.set("description", node.getDescription());


    data.set("node", node.getNode() != null ? node.getNode().getTextNode() : null);
    data.set("Role", node.getRole() != null ? node.getRole().getTextNode() : null);
    data.set("actor", node.getRole() != null ? node.getRole().getTextNode() : null);


    if (node.getCode() != null && node.getCode().getValue() != null) {
        let codeValue = jsplit(node.getCode().getValue(), "Env:");
        if (equals("soap11", get(data, "soapVersion"))) {
            data.set("soap11", codeValue.length > 1 ? codeValue[1] : null);
        } else {
            data.set("soap12", codeValue.length > 1 ? codeValue[1] : null);
        }
    }


    data.set("serializeResponse", false);
    if (node.isResponse() != null) {
        data.set("serializeResponse", true);
        data.set("markAsResponse", node.isResponse());
    }

    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
