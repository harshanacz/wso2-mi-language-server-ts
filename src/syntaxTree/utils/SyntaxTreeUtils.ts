// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/utils/SyntaxTreeUtils.java by the java2ts converter (see tools/java2ts).
import { equals, equalsIgnoreCase, isEmpty, get, parseBoolean } from "../javaCompat.js";
import { And } from "../pojo/misc/evaluators/And.js";
import { Constant } from "../constant.js";
import { DOMElement } from "../dom/dom.js";
import { DOMNode } from "../dom/dom.js";
import { EndpointFactory } from "../factory/endpoint/EndpointFactory.js";
import { Equal } from "../pojo/misc/evaluators/Equal.js";
import { EvaluatorList } from "../pojo/misc/evaluators/EvaluatorList.js";
import { Mediator } from "../pojo/mediator/Mediator.js";
import { MediatorFactoryFinder } from "../factory/mediators/MediatorFactoryFinder.js";
import { MediatorProperty } from "../pojo/mediator/core/MediatorProperty.js";
import { NamedEndpoint } from "../pojo/endpoint/NamedEndpoint.js";
import { Not } from "../pojo/misc/evaluators/Not.js";
import { Or } from "../pojo/misc/evaluators/Or.js";
import { Parameter } from "../pojo/misc/common/Parameter.js";
import { Sequence } from "../pojo/misc/common/Sequence.js";
import { SequenceFactory } from "../factory/misc/SequenceFactory.js";
import { Target } from "../pojo/misc/targets/Target.js";
import { Utils } from "../utils.js";

export class SyntaxTreeUtils {
  static get mediatorFactory(): MediatorFactoryFinder {
    return MediatorFactoryFinder.getInstance();
  }

  static createSequence(node: DOMNode): Sequence {
    let sequenceFactory = new SequenceFactory();
    let sequence = (sequenceFactory.create((node as DOMElement)) as Sequence);
    return sequence;

  }

  static createMediators(children: DOMNode[]): Mediator[] {
    let mediatorsList = [];
    for (let node of children) {
        let mediator = SyntaxTreeUtils.createMediator(node);
        if (mediator != null) {
            mediatorsList.push(mediator);
        }
    }
    return mediatorsList;

  }

  static createMediator(node: DOMNode): Mediator {
    let mediators = SyntaxTreeUtils.mediatorFactory.getMediator(node);
    return mediators;

  }

  static createTarget(node: DOMNode): Target {
    let target = new Target();
    target.elementNode((node as DOMElement));
    SyntaxTreeUtils.populateTargetAttributes(target, node);
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            if (equals(name, Constant.SEQUENCE)) {
                let sequence = SyntaxTreeUtils.createSequence(child);
                target.setSequence(sequence);
            } else if (equals(name, Constant.ENDPOINT)) {
                let endpointFactory = new EndpointFactory();
                let namedEndpoint = (endpointFactory.create((child as DOMElement)) as NamedEndpoint);
                target.setEndpoint(namedEndpoint);
            }
        }
    }
    return target;

  }

  static populateTargetAttributes(target: Target, node: DOMNode): void {
    let sequence = node.getAttribute(Constant.SEQUENCE);
    if (sequence != null) {
        target.setSequenceAttribute(sequence);
    }
    let endpoint = node.getAttribute(Constant.ENDPOINT);
    if (endpoint != null) {
        target.setEndpointAttribute(endpoint);
    }
    let to = node.getAttribute(Constant.TO);
    if (to != null) {
        target.setTo(to);
    }
    let soapAction = node.getAttribute(Constant.SOAP_ACTION);
    if (soapAction != null) {
        target.setSoapAction(soapAction);
    }

  }

  static createMediatorProperty(element: DOMNode): MediatorProperty {
    let property = new MediatorProperty();
    property.elementNode((element as DOMElement));
    let name = element.getAttribute(Constant.NAME);
    if (name != null && !isEmpty(name)) {
        property.setName(name);
    }
    let value = element.getAttribute(Constant.VALUE);
    if (value != null && !isEmpty(value)) {
        property.setValue(value);
    }
    let expression = element.getAttribute(Constant.EXPRESSION);
    if (expression != null && !isEmpty(expression)) {
        property.setExpression(expression);
    }
    let children = element.getChildren();
    let contents = [];
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let content = Utils.getInlineString(child);
            contents.push(content);
        }
        property.setContent(contents.slice());
    }
    return property;

  }

  static createParameter(child: DOMNode): Parameter {
    let parameter = new Parameter();
    parameter.elementNode((child as DOMElement));
    let name = child.getAttribute(Constant.NAME);
    if (name != null && !isEmpty(name)) {
        parameter.setName(name);
    }
    let key = child.getAttribute(Constant.KEY);
    if (key != null && !isEmpty(key)) {
        parameter.setKey(key);
    }
    let locked = child.getAttribute(Constant.LOCKED);
    if (locked != null && !isEmpty(locked)) {
        parameter.setLocked(parseBoolean(locked));
    }
    let content = Utils.getInlineString(child.getFirstChild());
    if (content != null && !isEmpty(content)) {
        parameter.setContent(content);
    }
    return parameter;

  }

  static createNot(conditionChild: DOMNode): Not {
    let not = new Not();
    not.elementNode((conditionChild as DOMElement));
    let notChildren = conditionChild.getChildren();
    if (notChildren != null && !isEmpty(notChildren)) {
        for (let notChild of notChildren) {
            let name = notChild.getNodeName();
            if (equalsIgnoreCase(name, Constant.AND)) {
                let and = SyntaxTreeUtils.createAnd(notChild);
                not.setAnd(and);
            } else if (equalsIgnoreCase(name, Constant.OR)) {
                let or = SyntaxTreeUtils.createOr(notChild);
                not.setOr(or);
            } else if (equalsIgnoreCase(name, Constant.EQUAL)) {
                let equal = SyntaxTreeUtils.createEqual(notChild);
                not.setEqual(equal);
            } else if (equalsIgnoreCase(name, Constant.NOT)) {
                let notNested = SyntaxTreeUtils.createNot(notChild);
                not.setNot(notNested);
            }
        }
    }
    return not;

  }

  static createAnd(conditionChild: DOMNode): And {
    let and = new And();
    and.elementNode((conditionChild as DOMElement));
    let andChildren = conditionChild.getChildren();
    if (andChildren != null && !isEmpty(andChildren)) {
        for (let andChild of andChildren) {
            let name = andChild.getNodeName();
            if (equalsIgnoreCase(name, Constant.AND)) {
                let andNested = SyntaxTreeUtils.createAnd(andChild);
                and.setAnd(andNested);
            } else if (equalsIgnoreCase(name, Constant.OR)) {
                let or = SyntaxTreeUtils.createOr(andChild);
                and.setOr(or);
            } else if (equalsIgnoreCase(name, Constant.EQUAL)) {
                let equal = SyntaxTreeUtils.createEqual(andChild);
                and.setEqual(equal);
            } else if (equalsIgnoreCase(name, Constant.NOT)) {
                let not = SyntaxTreeUtils.createNot(andChild);
                and.setNot(not);
            }
        }
    }
    return and;

  }

  static createOr(conditionChild: DOMNode): Or {
    let or = new Or();
    or.elementNode((conditionChild as DOMElement));
    let orChildren = conditionChild.getChildren();
    if (orChildren != null && !isEmpty(orChildren)) {
        let evaluatorLists = [];
        for (let orChild of orChildren) {
            let name = orChild.getNodeName();
            let evaluatorList = new EvaluatorList();
            if (equalsIgnoreCase(name, Constant.AND)) {
                let and = SyntaxTreeUtils.createAnd(orChild);
                evaluatorList.setAnd((and));
                evaluatorLists.push(evaluatorList);
            } else if (equalsIgnoreCase(name, Constant.OR)) {
                let orNested = SyntaxTreeUtils.createOr(orChild);
                evaluatorList.setOr((orNested));
                evaluatorLists.push(evaluatorList);
            } else if (equalsIgnoreCase(name, Constant.EQUAL)) {
                let equal = SyntaxTreeUtils.createEqual(orChild);
                evaluatorList.setEqual((equal));
                evaluatorLists.push(evaluatorList);
            } else if (equalsIgnoreCase(name, Constant.NOT)) {
                let not = SyntaxTreeUtils.createNot(orChild);
                evaluatorList.setNot((not));
            }
        }
        or.setEvaluatorList(evaluatorLists.slice());
    }
    return or;

  }

  static createEqual(conditionChild: DOMNode): Equal {
    let equal = new Equal();
    equal.elementNode((conditionChild as DOMElement));
    let type = conditionChild.getAttribute(Constant.TYPE);
    if (type != null && !isEmpty(type)) {
        equal.setType(type);
    }
    let value = conditionChild.getAttribute(Constant.VALUE);
    if (value != null && !isEmpty(value)) {
        equal.setValue(value);
    }
    let source = conditionChild.getAttribute(Constant.SOURCE);
    if (source != null && !isEmpty(source)) {
        equal.setSource(source);
    }
    return equal;

  }
}
