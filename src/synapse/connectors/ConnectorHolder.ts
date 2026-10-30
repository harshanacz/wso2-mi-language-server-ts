// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/ConnectorHolder.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, contains, jsplit, removeFrom, clear, unmodifiable, StringUtils } from "../../syntaxTree/javaCompat.js";
import { Connector } from "./entity/Connector.js";
import { ConnectorAction } from "./entity/ConnectorAction.js";
import { JFile } from "../host/JFile.js";

export class ConnectorHolder {
  static readonly __fields: string[] = ["connectorZips"];

  static connectors: Connector[] = [];

  connectorZips?: JFile[];

  static instance?: ConnectorHolder;

  constructor() {
    ConnectorHolder.connectors = [];

  }

  static getInstance(): ConnectorHolder {
    if (ConnectorHolder.instance == null) {
        ConnectorHolder.instance = new ConnectorHolder();
    }
    return ConnectorHolder.instance;

  }

  addConnector(connector: Connector): void {
    ConnectorHolder.connectors.push(connector);

  }

  exists(connectorName: string): boolean {
    for (let connector of ConnectorHolder.connectors) {
        if (equalsIgnoreCase(connector.getName(), connectorName)) {
            return true;
        }
    }
    return false;

  }

  getConnectors(): Connector[] {
    return unmodifiable(ConnectorHolder.connectors);

  }

  getConnector(name: string): Connector {
    for (let connector of ConnectorHolder.connectors) {
        if (this.isConnectorMatched(name, connector)) {
            return connector;
        }
    }
    return null;

  }

  getConnectorAction(operationTag: string): ConnectorAction {
    if (StringUtils.isEmpty(operationTag) || !contains(operationTag, ".")) {
        return null;
    }
    let connectorName = jsplit(operationTag, "\\.")[0];
    let actionName = jsplit(operationTag, "\\.")[1];
    let connector = this.getConnector(connectorName);
    if (connector == null) {
        return null;
    }
    return connector.getAction(actionName);

  }

  isConnectorMatched(name: string, connector: Connector): boolean {
    return equalsIgnoreCase(connector.getName(), name) ||
            (connector.getDisplayName() != null && equalsIgnoreCase(connector.getDisplayName(), name));

  }

  static isValidConnector(name: string): boolean {
    let connectorName = jsplit(name, "\\.")[0];
    for (let connector of ConnectorHolder.connectors) {
        if (equalsIgnoreCase(connector.getName(), connectorName)) {
            for (let action of connector.getActions()) {
                let tag = action.getTag();
                if (tag != null && equalsIgnoreCase(tag, name)) {
                    return true;
                }
            }
        }
    }
    return false;

  }

  removeConnector(connectorName: string): void {
    if (connectorName != null) {
        for (let connector of ConnectorHolder.connectors) {
            if (equalsIgnoreCase(connector.getName(), connectorName)) {
                removeFrom(ConnectorHolder.connectors, connector);
                break;
            }
        }
    }

  }

  getConnectorZips(): JFile[] {
    return this.connectorZips;

  }

  setConnectorZips(connectorZips: JFile[]): void {
    this.connectorZips = connectorZips;

  }

  clearConnectors(): void {
    clear(ConnectorHolder.connectors);

  }
}
