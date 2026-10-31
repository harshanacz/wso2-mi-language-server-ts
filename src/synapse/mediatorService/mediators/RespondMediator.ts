// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/RespondMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { Range } from "../../lsp.js";
import { Respond } from "../../../syntaxTree/pojo/mediator/core/Respond.js";

export class RespondMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, respond: Respond, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }
    return Either.forLeft(data);


  }

  static getDataFromST430(node: Respond): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
