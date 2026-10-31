// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/PayloadFactoryMediator.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, size, get, parseBoolean, matches, replaceAll, IllegalStateException } from "../../../syntaxTree/javaCompat.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { PayloadFactory } from "../../../syntaxTree/pojo/mediator/transformation/payload/PayloadFactory.js";
import { Range } from "../../lsp.js";
import { TemplateType } from "../../../syntaxTree/pojo/mediator/transformation/payload/TemplateType.js";

export class PayloadFactoryMediator {
  static readonly __fields: string[] = [];

  static readonly CONTAIN_ARGS: string = "containArgs";

  static readonly TEMPLATE_TYPE: string = "templateType";

  static readonly MEDIA_TYPE: string = "mediaType";

  static processData430(data: Map<string, any>, payloadFactory: PayloadFactory, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    data.set("isInlined", equals("Inline", get(data, "payloadFormat")));
    data.set("isFreemarker", equals("Freemarker", get(data, PayloadFactoryMediator.TEMPLATE_TYPE)));


    PayloadFactoryMediator.processArgs(data);


    if ((typeof get(data, PayloadFactoryMediator.TEMPLATE_TYPE) === "string")) {
        data.set(PayloadFactoryMediator.TEMPLATE_TYPE, ((get(data, PayloadFactoryMediator.TEMPLATE_TYPE) as string)).toLowerCase());
    }


    return Either.forLeft(data);

  }

  static getDataFromST430(node: PayloadFactory): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());

    if (node.getMediaType() != null) {
        data.set(PayloadFactoryMediator.MEDIA_TYPE, node.getMediaType());
    }

    if (node.getTemplateType() != null) {
        let templateType = node.getTemplateType().getValue();
        data.set(PayloadFactoryMediator.TEMPLATE_TYPE, templateType.substring(0, 1).toUpperCase() + templateType.substring(1));
    }

    if (node.getFormat() != null) {
        data.set("format", node.getFormat());
    }

    if (node.getArgs() != null) {
        data.set("args", node.getArgs());
    }

    if (node.getFormat() != null && node.getFormat().getContent() != null) {
        if (equals("Freemarker", get(data, PayloadFactoryMediator.TEMPLATE_TYPE))) {
            let content = (typeof node.getFormat().getContent() === "string")
                    ? (node.getFormat().getContent() as string)
                    : String(node.getFormat().getContent());
            let matchedContent = matches(content, "<!\\[CDATA\\[(.*?)]]>")
                    ? replaceAll(content, "<!\\[CDATA\\[(.*?)]]>", "$1")
                    : content;
            data.set("payload", matchedContent);
        } else {
            data.set("payload", node.getFormat().getContent());
        }
        data.set("payloadFormat", "Inline");
    } else {
        data.set("payloadFormat", "Registry Reference");
        data.set("payloadKey", node.getFormat() != null ? node.getFormat().getKey() : null);
    }


    if (node.getArgs() != null && node.getArgs().getArg() != null) {
        let args = [];
        for (let arg of node.getArgs().getArg()) {
            let isExpression = arg.getValue() == null;
            let argMap = new Map();
            argMap.set("isExpression", isExpression);
            argMap.set("value", arg.getValue() != null ? arg.getValue() : arg.getExpression());
            argMap.set("namespaces", MediatorUtils.transformNamespaces(arg.getNamespaces()));

            args.push([argMap,
                    arg.getEvaluator() != null ? String(arg.getEvaluator()) : "",
                    arg.isLiteral()]);
        }
        data.set("args", args);
    } else {
        data.set("args", []);
    }

    return data;

  }

  static processData440(data: Map<string, any>, payloadFactory: PayloadFactory, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("isLatest") && !parseBoolean((get(data, "isLatest") as string))) {
        data.set("isLatest", false);
    } else {
        data.set("isLatest", true);
    }

    let useTemplateResource = (get(data, "useTemplateResource") as boolean);
    if (useTemplateResource == null || !useTemplateResource) {
        data.set("isInlined", true);
    }

    PayloadFactoryMediator.processArgs(data);
    let templateType = (get(data, PayloadFactoryMediator.TEMPLATE_TYPE) as string);
    if (equals(TemplateType.FREE_MARKER.getValue(), templateType)) {
        data.set("isFreemarker", true);
    }
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }
    return Either.forLeft(data);

  }

  static getDataFromST440(payloadFactory: PayloadFactory): Map<string, any> {
    let data = new Map();
    data.set(Constant.DESCRIPTION, payloadFactory.getDescription());
    let templateType = payloadFactory.getTemplateType();
    if (templateType != null) {
        data.set(PayloadFactoryMediator.TEMPLATE_TYPE, templateType.getValue());
    }
    data.set(PayloadFactoryMediator.MEDIA_TYPE, payloadFactory.getMediaType());
    if (payloadFactory.getFormat().getKey() != null) {
        data.set("useTemplateResource", true);
        data.set("payloadKey", payloadFactory.getFormat().getKey());
    } else {
        let inlineContent = (payloadFactory.getFormat().getContent() as string);

        if (equals(TemplateType.FREE_MARKER, templateType)) {
            inlineContent = PayloadFactoryMediator.removeCDATAFromPayload(inlineContent);
        }
        data.set(Constant.PAYLOAD, inlineContent);
    }

    if (payloadFactory.getArgs() != null && payloadFactory.getArgs().getArg() != null) {
        let args = [];
        for (let arg of payloadFactory.getArgs().getArg()) {
            let isExpression = arg.getValue() == null;
            let argMap = new Map();
            argMap.set(Constant.IS_EXPRESSION, isExpression);
            argMap.set(Constant.VALUE, isExpression ? arg.getExpression() : arg.getValue());
            argMap.set(Constant.NAMESPACES, MediatorUtils.transformNamespaces(arg.getNamespaces()));
            args.push([argMap,
                    arg.getEvaluator() != null ? String(arg.getEvaluator()) : "",
                    arg.isLiteral()]);
        }
        data.set(Constant.ARGS, args);
        data.set(PayloadFactoryMediator.CONTAIN_ARGS, true);
        data.set(Constant.UI_SCHEMA_NAME, "payloadFactory_430");
    }
    data.set("traceFilter", equals("enable", payloadFactory.getTraceFilter()));
    return data;

  }

  static removeCDATAFromPayload(inputPayload: string): string {
    if (inputPayload.startsWith("<![CDATA[")) {
        inputPayload = inputPayload.substring(9);
        let i = inputPayload.lastIndexOf("]]>");
        if (i == -1)
            throw new IllegalStateException("Inline content starts with <![CDATA[ but cannot find pairing ]]>");
        inputPayload = inputPayload.substring(0, i);
    }
    return inputPayload;

  }

  static processArgs(data: Map<string, any>): void {
    let argsList = Array.isArray(get(data, Constant.ARGS)) ? (get(data, Constant.ARGS) as any[]) : [];
    data.set(PayloadFactoryMediator.CONTAIN_ARGS, !isEmpty(argsList));
    let args = [];
    for (let propertyObj of argsList) {
        if (Array.isArray(propertyObj)) {
            let property = (propertyObj as any[]);
            let argMap = new Map();
            if (get(property, 0) instanceof Map &&
                    !equals(true,get(((get(property, 0) as Map<any, any>)), Constant.IS_EXPRESSION))) {
                argMap.set(Constant.VALUE, get(((get(property, 0) as Map<any, any>)), Constant.VALUE));
                argMap.set(Constant.LITERAL, size(property) > 2 ? get(property, 2) : null);
            } else {
                argMap.set(Constant.EXPRESSION, get(property, 0));
                argMap.set(Constant.EVALUATOR, size(property) > 1 ? get(property, 1) : null);
                argMap.set(Constant.LITERAL, size(property) > 2 ? get(property, 2) : null);
            }
            args.push(argMap);
        }
    }
    data.set(Constant.ARGS, args);

  }
}
