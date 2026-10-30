// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/transformation/EnrichMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Enrich } from "../../../pojo/mediator/transformation/enrich/Enrich.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { SerializerUtils } from "../../SerializerUtils.js";
import { SourceEnrich } from "../../../pojo/mediator/transformation/enrich/SourceEnrich.js";
import { TargetEnrich } from "../../../pojo/mediator/transformation/enrich/TargetEnrich.js";

export class EnrichMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let enrichMediator = (m as Enrich);
    let enrichElt = AbstractMediatorSerializer.fac.createOMElement("enrich", AbstractMediatorSerializer.synNS);

    if (enrichMediator.getDescription() != null) {
        enrichElt.addAttribute("description", enrichMediator.getDescription(), null);
    }
    this.serializeSource(enrichMediator.getSource(), enrichElt);
    this.serializeTarget(enrichMediator.getTarget(), enrichElt);

    return enrichElt;

  }

  serializeSource(source: SourceEnrich, enrichElt: OMElement): void {
    if (source != null) {
        let sourceElt = AbstractMediatorSerializer.fac.createOMElement("source", AbstractMediatorSerializer.synNS);
        if (source.isClone()) {
            sourceElt.addAttribute("clone", "true", null);
        }
        if (source.getType() != null) {
            let type = source.getType().name();
            switch (type) {
                case "custom":
                    sourceElt.addAttribute("type", "custom", null);
                    SerializerUtils.serializeExpression(source.getXpath(), sourceElt, "xpath", source);
                    break;
                case "envelope":
                case "body":
                    sourceElt.addAttribute("type", type, null);
                    break;
                case "property":
                    sourceElt.addAttribute("type", "property", null);
                    sourceElt.addAttribute("property", source.getProperty(), null);
                    break;
                case "inline":
                    sourceElt.addAttribute("type", "inline", null);
                    if (source.getContent() != null) {
                        let inlineElt = SerializerUtils.stringToOM(String(source.getContent()));
                        sourceElt.addChild(inlineElt);
                    }

            }
        }
        enrichElt.addChild(sourceElt);
    }

  }

  serializeTarget(target: TargetEnrich, enrichElt: OMElement): void {
    if (target != null) {
        let targetElt = AbstractMediatorSerializer.fac.createOMElement("target", AbstractMediatorSerializer.synNS);
        if (target.getAction() != null) {
            targetElt.addAttribute("action", target.getAction().name(), null);
        }
        if (target.getType() != null || target.getXpath() != null) {
            let type: string | undefined;
            if (target.getType() == null) {
                type = "custom";
            } else {
                type = target.getType().name();
            }
            switch (type) {
                case "property":
                    targetElt.addAttribute("type", "property", null);
                    targetElt.addAttribute("property", target.getProperty(), null);
                    break;
                case "key":
                    targetElt.addAttribute("type", "key", null);
                case "custom":
                    SerializerUtils.serializeExpression(target.getXpath(), targetElt, "xpath", target);
                    break;
                case "envelope":
                case "body":
                    targetElt.addAttribute("type", type, null);
                    break;
            }

        }
        enrichElt.addChild(targetElt);
    }

  }

  getMediatorClassName(): string {
    return "Enrich";

  }
}
