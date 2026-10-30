// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/ConnectorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "./AbstractMediatorSerializer.js";
import { Connector } from "../../pojo/connector/Connector.js";
import { ConnectorParameter } from "../../pojo/connector/ConnectorParameter.js";
import { Mediator } from "../../pojo/mediator/Mediator.js";
import { OMElement } from "../../om/om.js";
import { SerializerUtils } from "../SerializerUtils.js";

export class ConnectorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let connector = (m as Connector);
    let connectorName = connector.getConnectorName();
    let method = connector.getMethod();
    let tag = connectorName + "." + method;
    let connectorElt = AbstractMediatorSerializer.fac.createOMElement(tag, AbstractMediatorSerializer.synNS);

    if (connector.getConfigKey() != null) {
        connectorElt.addAttribute("configKey", connector.getConfigKey(), AbstractMediatorSerializer.nullNS);
    }
    this.serializeParameters(connector.getParameters(), connectorElt);

    return connectorElt;

  }

  serializeParameters(parameters: ConnectorParameter[], connectorElt: OMElement): void {
    if (parameters != null) {
        for (let parameter of parameters) {
            let parameterElt = this.serializeParameter(parameter);
            if (parameterElt != null) {
                connectorElt.addChild(parameterElt);
            }
        }
    }

  }

  serializeParameter(parameter: ConnectorParameter): OMElement {
    if (parameter != null && parameter.getName() != null) {
        let name = parameter.getName();
        let parameterElt = AbstractMediatorSerializer.fac.createOMElement(name, AbstractMediatorSerializer.synNS);
        if (parameter.getIsExpression()) {
            let expression = parameter.getExpression();
            let expressionElt = AbstractMediatorSerializer.fac.createOMText(expression);
            if (expressionElt != null) {
                parameterElt.addChild(expressionElt);
            }
            SerializerUtils.serializeNamespaces(parameter, parameterElt);
        } else {
            let value = parameter.getValue();
            if (value != null) {
                parameterElt.setText(value);
            }
        }
        return parameterElt;
    }
    return null;

  }

  getMediatorClassName(): string {
    return "Connector";

  }
}
