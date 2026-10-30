// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/flowControl/AggregateMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { matches } from "../../../javaCompat.js";
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Aggregate } from "../../../pojo/mediator/eip/aggregate/Aggregate.js";
import { AggregateCompleteCondition } from "../../../pojo/mediator/eip/aggregate/AggregateCompleteCondition.js";
import { AggregateCorrelateOn } from "../../../pojo/mediator/eip/aggregate/AggregateCorrelateOn.js";
import { AggregateOnComplete } from "../../../pojo/mediator/eip/aggregate/AggregateOnComplete.js";
import { AnonymousSequenceSerializer } from "../../AnonymousSequenceSerializer.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";
import { SerializerUtils } from "../../SerializerUtils.js";

export class AggregateMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let aggregateMediator = (m as Aggregate);
    let aggregateElt = AbstractMediatorSerializer.fac.createOMElement("aggregate", AbstractMediatorSerializer.synNS);

    if (aggregateMediator.getId() != null) {
        aggregateElt.addAttribute("id", aggregateMediator.getId(), null);
    }
    if (aggregateMediator.getDescription() != null) {
        aggregateElt.addAttribute("description", aggregateMediator.getDescription(), null);
    }

    this.serializeChildren(aggregateElt, aggregateMediator);
    return aggregateElt;

  }

  serializeChildren(aggregateElt: OMElement, aggregateMediator: Aggregate): void {
    let children =
            aggregateMediator.getCorrelateOnOrCompleteConditionOrOnComplete();
    if (children != null) {
        if (children.getCorrelateOn() != null && (children.getCorrelateOn() != null)) {
            let correlateOnElt = this.serializeCorrelateOn(children.getCorrelateOn());
            aggregateElt.addChild(correlateOnElt);
        }
        if (children.getCompleteCondition() != null && (children.getCompleteCondition() != null)) {
            let completeConditionElt = this.serializeCompleteCondition(children.getCompleteCondition());
            aggregateElt.addChild(completeConditionElt);
        }
        if (children.getOnComplete() != null && (children.getOnComplete() != null)) {
            let onCompleteElt = this.serializeOnComplete(children.getOnComplete());
            aggregateElt.addChild(onCompleteElt);
        }
    }

  }

  serializeCorrelateOn(aggregateCorrelateOn: AggregateCorrelateOn): OMElement {
    let correlateOnElt = AbstractMediatorSerializer.fac.createOMElement("correlateOn", AbstractMediatorSerializer.synNS);
    if (aggregateCorrelateOn.getExpression() != null) {
        SerializerUtils.serializeExpression(aggregateCorrelateOn.getExpression(), correlateOnElt, "expression",
                aggregateCorrelateOn);
    }
    return correlateOnElt;

  }

  serializeCompleteCondition(aggregateCompleteCondition: AggregateCompleteCondition): OMElement {
    let completeConditionElt = AbstractMediatorSerializer.fac.createOMElement("completeCondition", AbstractMediatorSerializer.synNS);
    let timeout = String(aggregateCompleteCondition.getTimeout());
    if (timeout != null) {
        completeConditionElt.addAttribute("timeout", timeout, null);
    }
    if (aggregateCompleteCondition.getMessageCount() != null) {
        let messageCountElt = AbstractMediatorSerializer.fac.createOMElement("messageCount", AbstractMediatorSerializer.synNS);
        if (aggregateCompleteCondition.getMessageCount().getMin() != null) {
            let value = String(aggregateCompleteCondition.getMessageCount().getMin());
            if (matches(value, "^\\{.*}$")) {
                SerializerUtils.serializeExpression(value, messageCountElt, "min", aggregateCompleteCondition);
            } else {
                messageCountElt.addAttribute("min", value, null);
            }
        }
        if (aggregateCompleteCondition.getMessageCount().getMax() != null) {
            let value = String(aggregateCompleteCondition.getMessageCount().getMax());
            if (matches(value, "^\\{.*}$")) {
                SerializerUtils.serializeExpression(value, messageCountElt, "max", aggregateCompleteCondition);
            } else {
                messageCountElt.addAttribute("max", value, null);
            }
        }
        completeConditionElt.addChild(messageCountElt);
    }
    return completeConditionElt;

  }

  serializeOnComplete(aggregateOnComplete: AggregateOnComplete): OMElement {
    let onCompleteElt: OMElement | undefined;
    if (aggregateOnComplete.getSequenceAttribute() != null) {
        onCompleteElt = AbstractMediatorSerializer.fac.createOMElement("onComplete", AbstractMediatorSerializer.synNS);
        onCompleteElt.addAttribute("sequence", aggregateOnComplete.getSequenceAttribute(), null);
    } else {
        onCompleteElt = AnonymousSequenceSerializer.serializeAnonymousSequence(aggregateOnComplete.getMediatorList());
        onCompleteElt.setLocalName("onComplete");
    }
    if (aggregateOnComplete.getAggregateElementType() != null) {
        onCompleteElt.addAttribute("aggregateElementType", aggregateOnComplete.getAggregateElementType().name(),
                null);
    }
    if (aggregateOnComplete.getEnclosingElementProperty() != null) {
        onCompleteElt.addAttribute("enclosingElementProperty", aggregateOnComplete.getEnclosingElementProperty(),
                null);
    }
    if (aggregateOnComplete.getExpression() != null) {
        SerializerUtils.serializeExpression(aggregateOnComplete.getExpression(), onCompleteElt, "expression",
                aggregateOnComplete);
    }
    return onCompleteElt;

  }

  getMediatorClassName(): string {
    return "Aggregate";

  }
}
