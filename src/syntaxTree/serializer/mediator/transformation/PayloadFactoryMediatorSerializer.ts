// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/transformation/PayloadFactoryMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { equals, format } from "../../../javaCompat.js";
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { OMNode } from "../../../om/om.js";
import { PayloadFactory } from "../../../pojo/mediator/transformation/payload/PayloadFactory.js";
import { PayloadFactoryArgs } from "../../../pojo/mediator/transformation/payload/PayloadFactoryArgs.js";
import { PayloadFactoryArgsArg } from "../../../pojo/mediator/transformation/payload/PayloadFactoryArgsArg.js";
import { PayloadFactoryFormat } from "../../../pojo/mediator/transformation/payload/PayloadFactoryFormat.js";
import { SerializerUtils } from "../../SerializerUtils.js";
import { TemplateType } from "../../../pojo/mediator/transformation/payload/TemplateType.js";

export class PayloadFactoryMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let payloadFactory = (m as PayloadFactory);
    let payloadFactoryElt = AbstractMediatorSerializer.fac.createOMElement("payloadFactory", AbstractMediatorSerializer.synNS);

    if (payloadFactory.getMediaType() != null) {
        payloadFactoryElt.addAttribute("media-type", payloadFactory.getMediaType().name(), AbstractMediatorSerializer.nullNS);
    }

    let isFreemarkerTemplate = false;
    if (equals(TemplateType.FREE_MARKER, payloadFactory.getTemplateType())) {
        isFreemarkerTemplate = true;
        payloadFactoryElt.addAttribute("template-type", payloadFactory.getTemplateType().getValue(), AbstractMediatorSerializer.nullNS);
    }

    this.serializeFormat(payloadFactoryElt, payloadFactory.getFormat(), isFreemarkerTemplate);
    this.serializeArgs(payloadFactoryElt, payloadFactory.getArgs());

    if (payloadFactory.getDescription() != null) {
        payloadFactoryElt.addAttribute("description", payloadFactory.getDescription(), AbstractMediatorSerializer.nullNS);
    }
    return payloadFactoryElt;

  }

  serializeFormat(payloadFactoryElt: OMElement, format: PayloadFactoryFormat, isFreemarkerTemplate: boolean): void {
    if (format != null) {
        let formatElt = AbstractMediatorSerializer.fac.createOMElement("format", AbstractMediatorSerializer.synNS);
        if (format.getKey() != null) {
            formatElt.addAttribute("key", format.getKey(), AbstractMediatorSerializer.nullNS);
        } else if (format.getContent() != null) {
            let content = String(format.getContent());
            if (isFreemarkerTemplate) {
                let text = SerializerUtils.stringToCDATA(content);
                formatElt.addChild(text);
            } else {
                let inline: OMNode | undefined;
                if (content.startsWith("<") && content.endsWith(">")) {
                    inline = SerializerUtils.stringToOM(content);
                } else {
                    inline = AbstractMediatorSerializer.fac.createOMText(content);
                }
                if (inline != null) {
                    formatElt.addChild(inline);
                }
            }
        }
        payloadFactoryElt.addChild(formatElt);
    }

  }

  serializeArgs(payloadFactoryElt: OMElement, args: PayloadFactoryArgs): void {
    let argsElt = AbstractMediatorSerializer.fac.createOMElement("args", AbstractMediatorSerializer.synNS);
    if (args != null && args.getArg() != null) {
        let argsList = args.getArg();
        for (let arg of argsList) {
            let argElt = this.serializeArg(arg);
            if (argElt != null) {
                argsElt.addChild(argElt);
            }
        }
    }
    payloadFactoryElt.addChild(argsElt);

  }

  serializeArg(arg: PayloadFactoryArgsArg): OMElement {
    if (arg != null) {
        let argElt = AbstractMediatorSerializer.fac.createOMElement("arg", AbstractMediatorSerializer.synNS);
        if (arg.getValue() != null) {
            argElt.addAttribute("value", arg.getValue(), AbstractMediatorSerializer.nullNS);
        } else if (arg.getExpression() != null) {
            SerializerUtils.serializeExpression(arg.getExpression(), argElt, "expression", arg);
            if (arg.getEvaluator() != null) {
                argElt.addAttribute("evaluator", arg.getEvaluator().name(), AbstractMediatorSerializer.nullNS);
            }
        }
        if (arg.isLiteral()) {
            argElt.addAttribute("literal", "true", AbstractMediatorSerializer.nullNS);
        }
        return argElt;
    }
    return null;

  }

  getMediatorClassName(): string {
    return "PayloadFactory";

  }
}
