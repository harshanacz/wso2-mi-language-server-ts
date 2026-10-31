// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/NtlmMediator.java by the java2ts converter (see tools/java2ts).
import { equals, contains, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { Ntlm } from "../../../syntaxTree/pojo/mediator/other/ntlm/Ntlm.js";
import { Range } from "../../lsp.js";

export class NtlmMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, ntlm: Ntlm, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {

    if (data.has("username") && get(data, "username") instanceof Map) {
        let usernameMap = (get(data, "username") as Map<string, any>);
        data.set("username", equals(true, get(usernameMap, "isExpression"))
                ? "{" + get(usernameMap, "value") + "}"
                : get(usernameMap, "value"));
    }


    if (data.has("password") && get(data, "password") instanceof Map) {
        let passwordMap = (get(data, "password") as Map<string, any>);
        data.set("password", equals(true, get(passwordMap, "isExpression"))
                ? "{" + get(passwordMap, "value") + "}"
                : get(passwordMap, "value"));
    }


    if (data.has("host") && get(data, "host") instanceof Map) {
        let hostMap = (get(data, "host") as Map<string, any>);
        data.set("host", equals(true, get(hostMap, "isExpression"))
                ? "{" + get(hostMap, "value") + "}"
                : get(hostMap, "value"));
    }


    if (data.has("domain") && get(data, "domain") instanceof Map) {
        let domainMap = (get(data, "domain") as Map<string, any>);
        data.set("domain", equals(true, get(domainMap, "isExpression"))
                ? "{" + get(domainMap, "value") + "}"
                : get(domainMap, "value"));
    }


    if (data.has("ntlmVersion") && get(data, "ntlmVersion") instanceof Map) {
        let ntlmVersionMap = (get(data, "ntlmVersion") as Map<string, any>);
        data.set("ntlmVersion", equals(true, get(ntlmVersionMap, "isExpression"))
                ? "{" + get(ntlmVersionMap, "value") + "}"
                : get(ntlmVersionMap, "value"));
    }

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);


  }

  static getDataFromST430(node: Ntlm): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    if (contains(node.getUsername(), "{")) {
        let username = node.getUsername().substring(1, node.getUsername().length - 1);
        data.set("username", new Map<string, any>([["isExpression", true], ["value", username]]));
    } else {
        data.set("username", new Map<string, any>([["isExpression", false], ["value", node.getUsername() != null ? node.getUsername() : ""]]));
    }


    if (contains(node.getPassword(), "{")) {
        let password = node.getPassword().substring(1, node.getPassword().length - 1);
        data.set("password", new Map<string, any>([["isExpression", true], ["value", password]]));
    } else {
        data.set("password", new Map<string, any>([["isExpression", false], ["value", node.getPassword() != null ? node.getPassword() : ""]]));
    }


    if (contains(node.getHost(), "{")) {
        let host = node.getHost().substring(1, node.getHost().length - 1);
        data.set("host", new Map<string, any>([["isExpression", true], ["value", host]]));
    } else {
        data.set("host", new Map<string, any>([["isExpression", false], ["value", node.getHost() != null ? node.getHost() : ""]]));
    }


    if (contains(node.getDomain(), "{")) {
        let domain = node.getDomain().substring(1, node.getDomain().length - 1);
        data.set("domain", new Map<string, any>([["isExpression", true], ["value", domain]]));
    } else {
        data.set("domain", new Map<string, any>([["isExpression", false], ["value", node.getDomain() != null ? node.getDomain() : ""]]));
    }


    if (contains(node.getNtlmVersion(), "{")) {
        let ntlmVersion = node.getNtlmVersion().substring(1, node.getNtlmVersion().length - 1);
        data.set("ntlmVersion", new Map<string, any>([["isExpression", true], ["value", ntlmVersion]]));
    } else {
        data.set("ntlmVersion", new Map<string, any>([["isExpression", false], ["value", node.getNtlmVersion() != null ? node.getNtlmVersion() : ""]]));
    }

    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
