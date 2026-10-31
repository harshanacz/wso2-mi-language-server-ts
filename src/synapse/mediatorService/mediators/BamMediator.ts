// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/BamMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Bam } from "../../../syntaxTree/pojo/mediator/other/bam/Bam.js";
import { Either } from "../../lsp.js";
import { Range } from "../../lsp.js";

export class BamMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, bam: Bam, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }
    return Either.forLeft(data);


  }

  static getDataFromST430(node: Bam): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    data.set("serverProfileName", node.getServerProfile().getName());
    data.set("streamName", node.getServerProfile().getStreamConfig().getName());
    data.set("streamVersion", node.getServerProfile().getStreamConfig().getVersion());
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }
}
