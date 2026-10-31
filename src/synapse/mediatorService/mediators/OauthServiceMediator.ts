// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/OauthServiceMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { OauthService } from "../../../syntaxTree/pojo/mediator/other/OauthService.js";
import { Range } from "../../lsp.js";

export class OauthServiceMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, oauthService: OauthService, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("remoteServiceURL") && (typeof get(data, "remoteServiceURL") === "string")) {
        let remoteServiceURL = (get(data, "remoteServiceURL") as string);
        if (!remoteServiceURL.endsWith("/")) {
            data.set("remoteServiceURL", remoteServiceURL + "/");
        }
    }
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }
    return Either.forLeft(data);


  }

  static getDataFromST430(node: OauthService): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    data.set("password", node.getPassword());
    data.set("username", node.getUsername());
    data.set("remoteServiceURL", node.getRemoteServiceUrl());
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }
}
