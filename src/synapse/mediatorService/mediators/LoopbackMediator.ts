// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/LoopbackMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { Loopback } from "../../../syntaxTree/pojo/mediator/core/Loopback.js";
import { Range } from "../../lsp.js";

export class LoopbackMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, loopback: Loopback, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }
    return Either.forLeft(data);


  }

  static getDataFromST430(node: Loopback): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
