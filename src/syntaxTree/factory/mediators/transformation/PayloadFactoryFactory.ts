// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/transformation/PayloadFactoryFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean, format, getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { EvaluatorType } from "../../../pojo/mediator/transformation/payload/EvaluatorType.js";
import { MediaType } from "../../../pojo/mediator/transformation/payload/MediaType.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { PayloadFactory } from "../../../pojo/mediator/transformation/payload/PayloadFactory.js";
import { PayloadFactoryArgs } from "../../../pojo/mediator/transformation/payload/PayloadFactoryArgs.js";
import { PayloadFactoryArgsArg } from "../../../pojo/mediator/transformation/payload/PayloadFactoryArgsArg.js";
import { PayloadFactoryFormat } from "../../../pojo/mediator/transformation/payload/PayloadFactoryFormat.js";
import { STNode } from "../../../stNode.js";
import { TemplateType } from "../../../pojo/mediator/transformation/payload/TemplateType.js";
import { Utils } from "../../../utils.js";

export class PayloadFactoryFactory extends AbstractMediatorFactory {
  static readonly PAYLOAD_FACTORY: string = "payloadFactory";

  createSpecificMediator(element: DOMElement): Mediator {
    let payloadFactory = new PayloadFactory();
    payloadFactory.elementNode(element);
    this.populateAttributes(payloadFactory, element);
    let childNodes = element.getChildren();
    if (childNodes != null && !isEmpty(childNodes)) {
        for (let child of childNodes) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.ARGS)) {
                let args = this.createPayloadFactoryArgs(child);
                payloadFactory.setArgs(args);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.FORMAT)) {
                let format = this.createPayloadFactoryFormat(child);
                payloadFactory.setFormat(format);
            }
        }
    }
    return payloadFactory;

  }

  createPayloadFactoryArgs(child: DOMNode): PayloadFactoryArgs {
    let args = new PayloadFactoryArgs();
    args.elementNode((child as DOMElement));
    let argsChildren = child.getChildren();
    let argList = [];
    if (argsChildren != null && !isEmpty(argsChildren)) {
        for (let argsChild of argsChildren) {
            if (equalsIgnoreCase(argsChild.getNodeName(), Constant.ARG)) {
                let arg = this.createPayloadFactoryArg(argsChild);
                argList.push(arg);
            }
        }
        args.setArg(argList.slice());
    }
    return args;

  }

  createPayloadFactoryArg(element: DOMNode): PayloadFactoryArgsArg {
    let arg = new PayloadFactoryArgsArg();
    arg.elementNode((element as DOMElement));
    let value = element.getAttribute(Constant.VALUE);
    if (value != null) {
        arg.setValue(value);
    }
    let evaluator = element.getAttribute(Constant.EVALUATOR);
    let evaluatorEnum = getEnumFromValue(evaluator, EvaluatorType);
    if (evaluatorEnum != null) {
        arg.setEvaluator(evaluatorEnum);
    }
    let expression = element.getAttribute(Constant.EXPRESSION);
    if (expression != null) {
        arg.setExpression(expression);
    }
    let literal = element.getAttribute(Constant.LITERAL);
    if (literal != null) {
        arg.setLiteral(parseBoolean(literal));
    }
    return arg;

  }

  createPayloadFactoryFormat(element: DOMNode): PayloadFactoryFormat {
    let format = new PayloadFactoryFormat();
    format.elementNode((element as DOMElement));
    let key = element.getAttribute(Constant.KEY);
    if (key != null) {
        format.setKey(key);
    }
    let inline = element.getFirstChild();
    if (inline != null) {
        let inlineString = Utils.getInlineString(inline, false);
        format.setContent(inlineString);
    }
    return format;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let mediaType = element.getAttribute(Constant.MEDIA_TYPE);
    let mediaTypeEnum = getEnumFromValue(mediaType, MediaType);
    if (mediaTypeEnum != null) {
        ((node as PayloadFactory)).setMediaType(mediaTypeEnum);
    }
    let templateType = element.getAttribute(Constant.TEMPLATE_TYPE);
    let templateTypeEnum = getEnumFromValue(templateType, TemplateType);
    if (templateTypeEnum != null) {
        ((node as PayloadFactory)).setTemplateType(templateTypeEnum);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as PayloadFactory)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as PayloadFactory)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return PayloadFactoryFactory.PAYLOAD_FACTORY;

  }
}
