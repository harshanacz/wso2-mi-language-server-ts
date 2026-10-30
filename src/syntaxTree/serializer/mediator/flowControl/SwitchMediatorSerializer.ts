// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/flowControl/SwitchMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { AnonymousSequenceSerializer } from "../../AnonymousSequenceSerializer.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { SerializerUtils } from "../../SerializerUtils.js";
import { Switch } from "../../../pojo/mediator/filter/switchMediator/Switch.js";

export class SwitchMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let switchMediator = (m as Switch);
    let switchElt = AbstractMediatorSerializer.fac.createOMElement("switch", AbstractMediatorSerializer.synNS);

    if (switchMediator.getSource() != null) {
        SerializerUtils.serializeExpression(switchMediator.getSource(), switchElt, "source", switchMediator);
    } else {
        this.handleException("Invalid switch mediator. " +
                "Should have a 'source' ");
    }

    this.serializeCases(switchElt, switchMediator);
    this.serializeDefault(switchElt, switchMediator);
    return switchElt;

  }

  serializeCases(switchElt: OMElement, switchMediator: Switch): void {
    let cases = switchMediator.get_case();
    if (cases != null) {
        for (let aCase of cases) {
            let caseElt = AnonymousSequenceSerializer.serializeAnonymousSequence(aCase.getMediatorList());
            caseElt.setLocalName("case");
            caseElt.addAttribute("regex", aCase.getRegex(), null);
            switchElt.addChild(caseElt);
        }
    }

  }

  serializeDefault(switchElt: OMElement, switchMediator: Switch): void {
    let defaultCase = switchMediator.get_default();
    if (defaultCase != null) {
        let defaultElt = AnonymousSequenceSerializer.serializeAnonymousSequence(defaultCase.getMediatorList());
        defaultElt.setLocalName("default");
        switchElt.addChild(defaultElt);
    }

  }

  getMediatorClassName(): string {
    return "Switch";

  }
}
