// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/extension/EjbFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Ejb } from "../../../pojo/mediator/extension/ejb/Ejb.js";
import { EjbArgs } from "../../../pojo/mediator/extension/ejb/EjbArgs.js";
import { EjbArgsArg } from "../../../pojo/mediator/extension/ejb/EjbArgsArg.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";

export class EjbFactory extends AbstractMediatorFactory {
  static readonly EJB: string = "ejb";

  createSpecificMediator(element: DOMElement): Mediator {
    let ejb = new Ejb();
    ejb.elementNode(element);
    this.populateAttributes(ejb, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.ARGS)) {
                let args = new EjbArgs();
                args.elementNode((child as DOMElement));
                let ejbArgsArgs = this.createEjbArgsArg((child as DOMElement));
                args.setArg(ejbArgsArgs.slice());
                ejb.setArgs(args);
            }
        }
    }
    return ejb;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let beanstalk = element.getAttribute(Constant.BEANSTALK);
    if (beanstalk != null) {
        ((node as Ejb)).setBeanstalk(beanstalk);
    }
    let clazz = element.getAttribute(Constant.CLASS);
    if (clazz != null) {
        ((node as Ejb)).setClazz(clazz);
    }
    let sessionId = element.getAttribute(Constant.SESSION_ID);
    if (sessionId != null) {
        ((node as Ejb)).setSessionId(sessionId);
    }
    let remove = element.getAttribute(Constant.REMOVE);
    if (remove != null) {
        ((node as Ejb)).setRemove(parseBoolean(remove));
    }
    let method = element.getAttribute(Constant.METHOD);
    if (method != null) {
        ((node as Ejb)).setMethod(method);
    }
    let target = element.getAttribute(Constant.TARGET);
    if (target != null) {
        ((node as Ejb)).setTarget(target);
    }
    let jndiName = element.getAttribute(Constant.JNDI_NAME);
    if (jndiName != null) {
        ((node as Ejb)).setJndiName(jndiName);
    }
    let id = element.getAttribute(Constant.ID);
    if (id != null) {
        ((node as Ejb)).setId(id);
    }
    let stateful = element.getAttribute(Constant.STATEFUL);
    if (stateful != null) {
        ((node as Ejb)).setStateful(parseBoolean(stateful));
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Ejb)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Ejb)).setTraceFilter(traceFilter);
    }

  }

  createEjbArgsArg(node: DOMElement): EjbArgsArg[] {
    let argsChildren = node.getChildren();
    let args = [];
    if (argsChildren != null && !isEmpty(argsChildren)) {
        for (let argsChild of argsChildren) {
            if (equalsIgnoreCase(argsChild.getNodeName(), Constant.ARG)) {
                let arg = new EjbArgsArg();
                arg.elementNode((argsChild as DOMElement));
                let value = argsChild.getAttribute(Constant.VALUE);
                if (value != null) {
                    arg.setValue(value);
                }
                args.push(arg);
            }
        }
    }
    return args;

  }

  getTagName(): string {
    return EjbFactory.EJB;

  }
}
