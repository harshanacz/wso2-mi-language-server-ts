// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/core/LogMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Log } from "../../../pojo/mediator/core/Log.js";
import { LogCategory } from "../../../pojo/mediator/core/LogCategory.js";
import { LogLevel } from "../../../pojo/mediator/core/LogLevel.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";

export class LogMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let log = (m as Log);
    let logElt = AbstractMediatorSerializer.fac.createOMElement("log", AbstractMediatorSerializer.synNS);
    if (log.getLevel() != null && log.getLevel() != LogLevel.simple) {
        logElt.addAttribute("level", log.getLevel().name(), AbstractMediatorSerializer.nullNS);
    }

    if (log.getCategory() != null && log.getCategory() != LogCategory.INFO) {
        logElt.addAttribute("category", log.getCategory().name(), AbstractMediatorSerializer.nullNS);
    }

    if (log.getSeparator() != null) {
        logElt.addAttribute("separator", log.getSeparator(), AbstractMediatorSerializer.nullNS);
    }

    if (log.getDescription() != null) {
        logElt.addAttribute("description", log.getDescription(), AbstractMediatorSerializer.nullNS);
    }

    this.serializeMediatorProperties(logElt, log.getProperty());

    return logElt;

  }

  getMediatorClassName(): string {
    return "Log";

  }
}
