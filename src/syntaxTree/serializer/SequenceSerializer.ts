// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/SequenceSerializer.java by the java2ts converter (see tools/java2ts).
import { Logger, Level } from "../javaCompat.js";
import { AnonymousSequenceSerializer } from "./AnonymousSequenceSerializer.js";
import { Constant } from "../constant.js";
import { InvalidConfigurationException } from "../om/errors.js";
import { Mediator } from "../pojo/mediator/Mediator.js";
import { NamedSequence } from "../pojo/NamedSequence.js";
import { OMAbstractFactory } from "../om/om.js";
import { OMElement } from "../om/om.js";
import { OMFactory } from "../om/om.js";

export class SequenceSerializer {
  static log: Logger = Logger.getLogger("SequenceSerializer");

  static readonly fac: OMFactory = OMAbstractFactory.getOMFactory();

  static serializeSequence(sequence: NamedSequence): string {
    let sequenceElt = SequenceSerializer.serializeMediators(sequence.getMediatorList());
    if (sequenceElt == null) {
        sequenceElt = SequenceSerializer.fac.createOMElement("sequence", Constant.SYNAPSE_OMNAMESPACE);
    }

    if (sequence.getName() != null) {
        sequenceElt.addAttribute("name", sequence.getName(), null);
    } else {
        SequenceSerializer.handleException("Sequence name is required");
    }
    if (sequence.getOnError() != null) {
        sequenceElt.addAttribute("onError", sequence.getOnError(), null);
    }
    if (sequence.getStatistics() != null) {
        sequenceElt.addAttribute("statistics", sequence.getStatistics().name(), null);
    }
    if (sequence.getTrace() != null) {
        sequenceElt.addAttribute("trace", sequence.getTrace().name(), null);
    }
    if (sequence.getDescription() != null) {
        sequenceElt.addAttribute("description", sequence.getDescription(), null);
    }
    return String(sequenceElt);


  }

  static serializeMediators(mediators: Mediator[]): OMElement {
    if (mediators != null) {
        let sequenceElt = AnonymousSequenceSerializer.serializeAnonymousSequence(mediators);
        return sequenceElt;
    }
    return null;

  }

  static handleException(s: string): void {
    SequenceSerializer.log.log(Level.SEVERE, s);
    throw new InvalidConfigurationException(s);

  }
}
