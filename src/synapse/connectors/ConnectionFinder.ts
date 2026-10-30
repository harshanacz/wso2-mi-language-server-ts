// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/ConnectionFinder.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, contains, get, jsplit, Logger, Level } from "../../syntaxTree/javaCompat.js";
import { ArtifactResource } from "../resourceFinder/pojo/ArtifactResource.js";
import { Connection } from "./entity/Connection.js";
import { ConnectionParameter } from "./entity/ConnectionParameter.js";
import { Connections } from "./entity/Connections.js";
import { ConnectorHolder } from "./ConnectorHolder.js";
import { Constant } from "../../syntaxTree/constant.js";
import { DOMElement } from "../../syntaxTree/dom/dom.js";
import { Either } from "../lsp.js";
import { Resource } from "../resourceFinder/pojo/Resource.js";
import { ResourceFinderFactory } from "../resourceFinder/ResourceFinderFactory.js";
import { Utils } from "../../syntaxTree/utils.js";
import { JFile } from "../host/JFile.js";

export class ConnectionFinder {
  static readonly __fields: string[] = [];

  static readonly log: Logger = Logger.getLogger("ConnectionFinder");

  static findConnections(uri: string, name: string, connectorHolder: ConnectorHolder, isLegacyProject: boolean): Either<Connections, Map<string, Connections>> {
    if (uri != null) {
        let resourceFinder = ResourceFinderFactory.getResourceFinder(isLegacyProject);
        let response = resourceFinder.getAvailableResources(uri, Either.forLeft(Constant.LOCAL_ENTRY));
        if (response != null) {
            let resources = response.getResources();
            if (name != null) {
                let connections = ConnectionFinder.getConnections(resources, name);
                return Either.forLeft(connections);
            } else {
                let connections = new Map();
                ConnectionFinder.populateConnectors(connectorHolder, connections);
                ConnectionFinder.getConnections(connections, resources);
                return Either.forRight(connections);
            }
        }
    }
    return null;

  }

  static populateConnectors(connectors: ConnectorHolder, connections: Map<string, Connections>): void {
    if (connectors != null) {
        let connectorList = connectors.getConnectors();
        for (let connector of connectorList) {
            let connectorName = connector.getName();
            connections.set(connectorName, new Connections());
        }
    }

  }

  static getConnections(resources: Resource[], name: string): Connections;
  static getConnections(connections: Map<string, Connections>, resources: Resource[]): void;
  static getConnections(...args: any[]): any {
    switch (args.length) {
      case 2: {
        if (Array.isArray(args[0])) {
          const [resources, name] = args;


                  let connections = new Map();
                  connections.set(name, new Connections());
                  ConnectionFinder.getConnections(connections, resources);
                  return get(connections, name);

        } else if (args[0] instanceof Map) {
          const [connections, resources] = args;


                  for (let resource of resources) {
                      try {
                          let localEntryName = resource.getName();
                          let filePath = ((resource as ArtifactResource)).getAbsolutePath();
                          let file = new JFile(filePath);
                          let document = Utils.getDOMDocument(file);
                          let childElement = Utils.getFirstElement(document.getDocumentElement());
                          if (childElement != null) {
                              let nodeName = childElement.getNodeName();
                              let connectorName = ConnectionFinder.getConnectorName(nodeName);
                              let connectionType = ConnectionFinder.getConnectionType(childElement);
                              let parameters = ConnectionFinder.getParameters(childElement);
                              if (connectorName != null) {
                                  ConnectionFinder.addToConnections(connections, connectorName, localEntryName, connectionType, parameters,
                                          filePath);
                              }
                          }
                      } catch (e) {
                          ConnectionFinder.log.log(Level.SEVERE, "Error while reading local entry file", e);
                      }
                  }

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  static getParameters(element: DOMElement): ConnectionParameter[] {
    let parameters = [];
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (child instanceof DOMElement) {
                let childElement = (child as DOMElement);
                let parameter = new ConnectionParameter();
                parameter.setName(childElement.getNodeName());
                let inline = Utils.getInlineString(childElement.getFirstChild());
                let isExpression = ConnectionFinder.isExpression(inline);
                parameter.setExpression(isExpression);
                if (isExpression) {
                    parameter.setExpression(inline.substring(1, inline.length - 1));
                } else {
                    parameter.setValue(inline);
                }
                parameters.push(parameter);
            }
        }
    }
    return parameters;

  }

  static isExpression(inline: string): boolean {
    if (inline == null) {
        return false;
    }
    return inline.startsWith("{") && inline.endsWith("}");

  }

  static getConnectorName(nodeName: string): string {
    if (contains(nodeName, ".")) {
        let split = jsplit(nodeName, "\\.");
        return split[0];
    }
    return null;

  }

  static addToConnections(connections: Map<string, Connections>, connectorName: string, connectionName: string, connectionType: string, parameters: ConnectionParameter[], path: string): void {
    if (connections.has(connectorName)) {
        let connection = new Connection(connectorName, connectionName, connectionType, parameters, path);
        get(connections, connectorName).addConnection(connection);
    }

  }

  static getConnectionType(element: DOMElement): string {
    let children = element.getChildren();
    if (children != null) {
        for (let child of children) {
            let nodeName = child.getNodeName();
            if (equals("connectionType", nodeName)) {
                let connectionType = Utils.getInlineString(child.getFirstChild());
                return connectionType;
            }
        }
    }
    return null;

  }
}
