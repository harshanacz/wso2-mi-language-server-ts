// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/ConnectorFactory.java by the java2ts converter (see tools/java2ts).
import { isEmpty, removeFrom } from "../../javaCompat.js";
import { AbstractMediatorFactory } from "./AbstractMediatorFactory.js";
import { Connector } from "../../pojo/connector/Connector.js";
import { ConnectorParameter } from "../../pojo/connector/ConnectorParameter.js";
import { Constant } from "../../constant.js";
import { DOMElement } from "../../dom/dom.js";
import { Mediator } from "../../pojo/mediator/Mediator.js";
import { STNode } from "../../stNode.js";
import { Utils } from "../../utils.js";

export class ConnectorFactory extends AbstractMediatorFactory {
  static readonly CONNECTOR: string = "connector";

  static connectors: string[] = [];

  populateAttributes(node: STNode, element: DOMElement): void {
    let configKey = element.getAttribute("configKey");
    if (configKey != null) {
        ((node as Connector)).setConfigKey(configKey);
    }
    this.addConnectorParameters((node as Connector), element);

  }

  createSpecificMediator(element: DOMElement): Mediator {
    let connector = new Connector();
    connector.elementNode(element);
    let elementName = element.getNodeName();
    let connectorName = elementName.substring(0, elementName.indexOf(Constant.DOT));
    connector.setConnectorName(connectorName);
    connector.setMethod(elementName.substring(elementName.indexOf(Constant.DOT) + 1));
    this.populateAttributes(connector, element);
    return connector;

  }

  addConnectorParameters(connector: Connector, element: DOMElement): void {
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let parameters = [];
        for (let child of children) {
            if (child instanceof DOMElement) {
                let childElement = (child as DOMElement);
                let parameter = new ConnectorParameter();
                parameter.elementNode(childElement);
                parameter.setName(childElement.getNodeName());
                let inline = Utils.getInlineString(childElement.getFirstChild());
                let isExpression = this.isExpression(inline);
                parameter.setIsExpression(isExpression);
                if (isExpression) {
                    parameter.setExpression(inline);
                } else {
                    parameter.setValue(Utils.removeCDATATag(inline));
                }
                parameters.push(parameter);
            }
        }
        connector.setParameters(parameters);
    }

  }

  isExpression(inline: string): boolean {
    if (inline == null) {
        return false;
    }
    return inline.startsWith("{") && inline.endsWith("}");

  }

  static addConnector(connector: string): void {
    ConnectorFactory.connectors.push(connector);

  }

  static removeConnector(connector: string): void {
    removeFrom(ConnectorFactory.connectors, connector);

  }

  static getConnectors(): string[] {
    return ConnectorFactory.connectors;

  }

  getTagName(): string {
    return ConnectorFactory.CONNECTOR;

  }
}
