// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/extension/ClassMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";

export class ClassMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let classMediator: any = (m as any);
    let classElt = AbstractMediatorSerializer.fac.createOMElement("class", AbstractMediatorSerializer.synNS);

    if (classMediator.getName() != null) {
        classElt.addAttribute("name", classMediator.getName(), null);
    }
    if (classMediator.getDescription() != null) {
        classElt.addAttribute("description", classMediator.getDescription(), null);
    }

    this.serializeMediatorProperties(classElt, classMediator.getProperty());
    return classElt;

  }

  getMediatorClassName(): string {
    return "Class";

  }
}
