// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/extension/ScriptMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { Script } from "../../../pojo/mediator/extension/Script.js";
import { SerializerUtils } from "../../SerializerUtils.js";

export class ScriptMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let script = (m as Script);
    let scriptElt = AbstractMediatorSerializer.fac.createOMElement("script", AbstractMediatorSerializer.synNS);

    this.serializeAttributes(script, scriptElt);
    this.serializeChildren(script, scriptElt);

    return scriptElt;

  }

  serializeAttributes(script: Script, scriptElt: OMElement): void {
    if (script.getLanguage() != null) {
        scriptElt.addAttribute("language", script.getLanguage().name(), AbstractMediatorSerializer.nullNS);
    } else {
        this.handleException("Script mediator must have a language attribute");
    }
    if (script.getKey() != null) {
        scriptElt.addAttribute("key", script.getKey(), AbstractMediatorSerializer.nullNS);
    }
    if (script.getFunction() != null) {
        scriptElt.addAttribute("function", script.getFunction(), AbstractMediatorSerializer.nullNS);
    }
    if (script.getDescription() != null) {
        scriptElt.addAttribute("description", script.getDescription(), AbstractMediatorSerializer.nullNS);
    }

  }

  serializeChildren(script: Script, scriptElt: OMElement): void {
    this.serializeIncludes(script.getInclude(), scriptElt);
    this.serializeContent(script.getContent(), scriptElt);

  }

  serializeIncludes(includes: string[], scriptElt: OMElement): void {
    if (includes != null) {
        for (let include of includes) {
            let includeElt = AbstractMediatorSerializer.fac.createOMElement("include", AbstractMediatorSerializer.synNS);
            includeElt.addAttribute("key", include, AbstractMediatorSerializer.nullNS);
            scriptElt.addChild(includeElt);
        }
    }

  }

  serializeContent(contents: any[], scriptElt: OMElement): void {
    if (contents != null) {
        for (let content of contents) {
            if (String(content).startsWith("<![CDATA[")) {

                let cdata = SerializerUtils.stringToCDATA(String(content));
                if (cdata != null) {
                    scriptElt.addChild(cdata);
                }
            } else {
                let text = AbstractMediatorSerializer.fac.createOMText(String(content));
                scriptElt.addChild(text);
            }
        }
    }

  }

  getMediatorClassName(): string {
    return "Script";

  }
}
