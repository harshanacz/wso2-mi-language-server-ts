// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/AnonymousSequenceSerializer.java by the java2ts converter (see tools/java2ts).
import { Constant } from "../constant.js";
import { Mediator } from "../pojo/mediator/Mediator.js";
import { MediatorSerializerFinder } from "./mediator/MediatorSerializerFinder.js";
import { OMAbstractFactory } from "../om/om.js";
import { OMElement } from "../om/om.js";
import { OMFactory } from "../om/om.js";
import { Sequence } from "../pojo/misc/common/Sequence.js";

export class AnonymousSequenceSerializer {
  static readonly fac: OMFactory = OMAbstractFactory.getOMFactory();

  static serializeAnonymousSequence(sequence: Sequence): OMElement;
  static serializeAnonymousSequence(mediatorList: Mediator[]): OMElement;
  static serializeAnonymousSequence(mediatorList: Mediator[], parentElt: OMElement): OMElement;
  static serializeAnonymousSequence(...args: any[]): any {
    switch (args.length) {
      case 1: {
        if (args[0] instanceof Sequence) {
          const [sequence] = args;


                  let mediatorList = null;
                  if (sequence != null) {
                      mediatorList = sequence.getMediatorList();
                  }
                  let sequenceElt = AnonymousSequenceSerializer.serializeAnonymousSequence(mediatorList);
                  return sequenceElt;

        } else if (Array.isArray(args[0])) {
          const [mediatorList] = args;


                  let sequenceElt = AnonymousSequenceSerializer.fac.createOMElement("sequence", Constant.SYNAPSE_OMNAMESPACE);

                  AnonymousSequenceSerializer.serializeAnonymousSequence(mediatorList, sequenceElt);
                  return sequenceElt;

        }
        break;
      }
      case 2: {
        const [mediatorList, parentElt] = args;


                if (mediatorList != null) {
                    for (let mediator of mediatorList) {
                        let serializer = MediatorSerializerFinder.getInstance().getSerializer(mediator);
                        if (serializer != null) {
                            serializer.serializeMediator(parentElt, mediator);
                        }
                    }
                }
                return parentElt;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }
}
