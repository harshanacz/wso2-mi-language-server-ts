// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/filter/SwitchFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { Switch } from "../../../pojo/mediator/filter/switchMediator/Switch.js";
import { SwitchCase } from "../../../pojo/mediator/filter/switchMediator/SwitchCase.js";
import { SwitchDefault } from "../../../pojo/mediator/filter/switchMediator/SwitchDefault.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";

export class SwitchFactory extends AbstractMediatorFactory {
  static readonly SWITCH: string = "switch";

  createSpecificMediator(element: DOMElement): Mediator {
    let _switch = new Switch();
    _switch.elementNode(element);
    this.populateAttributes(_switch, element);
    let children = element.getChildren();
    let caseList = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.CASE)) {
                let switchCase = this.createSwitchCase(child);
                caseList.push(switchCase);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.DEFAULT)) {
                let switchDefault = this.createSwitchDefault(child);
                _switch.set_default(switchDefault);
            }
        }
        _switch.set_case(caseList.slice());
    }
    return _switch;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let source = element.getAttribute(Constant.SOURCE);
    if (source != null) {
        ((node as Switch)).setSource(source);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Switch)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Switch)).setTraceFilter(traceFilter);
    }

  }

  createSwitchCase(child: DOMNode): SwitchCase {
    let switchCase = new SwitchCase();
    switchCase.elementNode((child as DOMElement));
    let regex = child.getAttribute(Constant.REGEX);
    if (regex != null) {
        switchCase.setRegex(regex);
    }
    let children = child.getChildren();
    if (children != null && !isEmpty(children)) {
        let mediatorList = SyntaxTreeUtils.createMediators(children);
        switchCase.setMediatorList(mediatorList);
    }
    return switchCase;

  }

  createSwitchDefault(child: DOMNode): SwitchDefault {
    let switchDefault = new SwitchDefault();
    switchDefault.elementNode((child as DOMElement));
    let children = child.getChildren();
    if (children != null && !isEmpty(children)) {
        let mediatorList = SyntaxTreeUtils.createMediators(children);
        switchDefault.setMediatorList(mediatorList);
    }
    return switchDefault;

  }

  getTagName(): string {
    return SwitchFactory.SWITCH;

  }
}
