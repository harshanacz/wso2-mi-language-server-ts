// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/DatamapperMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Datamapper } from "../../../syntaxTree/pojo/mediator/transformation/Datamapper.js";
import { Either } from "../../lsp.js";
import { Pattern } from "../../host/regex.js";
import { Range } from "../../lsp.js";

export class DatamapperMediator {
  static readonly __fields: string[] = [];

  static readonly NAME_REGEX: string = "(gov|resources):/?datamapper/(.*)";

  static readonly CONFIG_REGEX: string = "((gov|resources):/?datamapper/([^/]+))(?:/.*)?\\.dmc";

  static processData430(data: Map<string, any>, datamapper: Datamapper, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let pattern = Pattern.compile(DatamapperMediator.NAME_REGEX);
    let matcher = pattern.matcher((get(data, "name") as string));
    if (matcher.find()) {
        let datamapperName = matcher.group(2);
        if (datamapperName.endsWith(".dmc")) {

            let datamapperBaseName = String(get(data, "name"))
                    .substring(0, String(get(data, "name")).length - 4);
            let configurationLocalPath = datamapperBaseName + ".dmc";
            let inputSchemaLocalPath = datamapperBaseName + "_inputSchema.json";
            let outputSchemaLocalPath = datamapperBaseName + "_outputSchema.json";
            data.set("configurationLocalPath", configurationLocalPath);
            data.set("inputSchemaLocalPath", inputSchemaLocalPath);
            data.set("outputSchemaLocalPath", outputSchemaLocalPath);
        }  else {
            let configurationLocalPath = get(data, "name") + "/" + datamapperName + ".dmc";
            let inputSchemaLocalPath = get(data, "name") + "/" + datamapperName + "_inputSchema.json";
            let outputSchemaLocalPath = get(data, "name") + "/" + datamapperName + "_outputSchema.json";
            data.set("configurationLocalPath", configurationLocalPath);
            data.set("inputSchemaLocalPath", inputSchemaLocalPath);
            data.set("outputSchemaLocalPath", outputSchemaLocalPath);
        }
    }
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }
    return Either.forLeft(data);


  }

  static getDataFromST430(node: Datamapper): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    data.set("inputType", node.getInputType());
    data.set("outputType", node.getOutputType());
    let configPath = node.getConfig();
    if (configPath != null) {
        let pattern = Pattern.compile(DatamapperMediator.CONFIG_REGEX);
        let matcher = pattern.matcher(configPath);
        if (matcher.find()) {
            data.set("name", matcher.group(1));
        }
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
