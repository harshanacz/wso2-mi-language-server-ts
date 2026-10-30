// @ts-nocheck
import { ConnectorHolder, Connection, Connections, ConnectionFinder } from "../../../connectorDeps.js";
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/ai/AIConnectorFactory.java by the java2ts converter (see tools/java2ts).
import { equals, contains, get, StringUtils } from "../../../javaCompat.js";
import { AIConnector } from "../../../pojo/connector/ai/AIConnector.js";
import { ConnectorFactory } from "../ConnectorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Utils } from "../../../utils.js";

export abstract class AIConnectorFactory extends ConnectorFactory {
  static readonly AI: string = "ai";

  populateConnectorConfigs(aiConnector: AIConnector, element: DOMElement): void {
    aiConnector.elementNode(element);
    let elementName = element.getNodeName();
    let connectorName = elementName.substring(0, elementName.indexOf(Constant.DOT));
    aiConnector.setConnectorName(connectorName);
    aiConnector.setMethod(elementName.substring(elementName.indexOf(Constant.DOT) + 1));
    this.populateAttributes(aiConnector, element);
    aiConnector.removeParameter("connections");

  }

  populateConnections(aiConnector: AIConnector, element: DOMElement, allowedConnectionTags: string[]): void {
    let connectionsElement = Utils.getChildNodeByName(element, Constant.CONNECTIONS);
    if (connectionsElement != null) {
        let connections = ConnectionFinder.findConnections(this.getProjectPath(), AIConnectorFactory.AI,
                undefined, false).getLeft();

        let connectionElements = connectionsElement.getChildren();
        for (let connectionElement of connectionElements) {
            let connectionType = connectionElement.getNodeName();
            let connectionName = Utils.getInlineString(connectionElement.getFirstChild());
            if (StringUtils.isNotEmpty(connectionName) && contains(allowedConnectionTags, connectionType)) {
                let connectionDisplayName = get(Constant.AI_CONNECTION_TO_DISPLAY_NAME_MAP, connectionType);
                aiConnector.addConnection(connectionDisplayName,
                        this.findConnection(connectionName, connectionDisplayName, connections));
            }

        }
    }

  }

  findConnection(connectionName: string, connectionType: string, connections: Connections): Connection {
    if (connections != null) {
        let connectionList = connections.getConnections();
        for (let connection of connectionList) {
            if (equals(connection.getName(), connectionName)) {
                return connection;
            }
        }
    }
    return new Connection(AIConnectorFactory.AI, connectionName, connectionType, null, null);

  }
}
