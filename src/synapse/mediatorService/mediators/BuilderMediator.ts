// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/BuilderMediator.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Builder } from "../../../syntaxTree/pojo/mediator/other/builder/Builder.js";
import { Either } from "../../lsp.js";
import { Range } from "../../lsp.js";

export class BuilderMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, builder: Builder, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let messageBuildersData = Array.isArray(get(data, "messageBuilders")) ?
            (get(data, "messageBuilders") as any[]) : [];
    let messageBuilders = [];

    for (let messageBuilderDataObj of messageBuildersData) {
        if (Array.isArray(messageBuilderDataObj)) {
            let messageBuilder = new Map();
            let messageBuilderData = (messageBuilderDataObj as any[]);
            messageBuilder.set("contentType", (typeof get(messageBuilderData, 0) === "string") ?
                    (get(messageBuilderData, 0) as string) : "");
            messageBuilder.set("builderClass", (typeof get(messageBuilderData, 1) === "string") ?
                    (get(messageBuilderData, 1) as string) : "");
            messageBuilder.set("formatterClass", (typeof get(messageBuilderData, 2) === "string") ?
                    (get(messageBuilderData, 2) as string) : "");
            messageBuilders.push(messageBuilder);
        }
    }
    data.set("messageBuilders", messageBuilders);
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    return Either.forLeft(data);

  }

  static getDataFromST430(node: Builder): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());

    let messageBuilders = [];
    for (let messageBuilder of node.getMessageBuilders()) {
        let messageBuilderData = [];
        messageBuilderData.push(messageBuilder.getContentType());
        messageBuilderData.push(messageBuilder.getClazz());
        messageBuilderData.push(messageBuilder.getFormatterClass());
        messageBuilders.push(messageBuilderData);
    }
    data.set("messageBuilders", messageBuilders);
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
