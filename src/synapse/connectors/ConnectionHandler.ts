// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/ConnectionHandler.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, contains, get, Logger } from "../../syntaxTree/javaCompat.js";
import { ConnectionUIParam } from "./entity/ConnectionUIParam.js";
import { Connector } from "./entity/Connector.js";
import { ConnectorFactory } from "../../syntaxTree/factory/mediators/ConnectorFactory.js";
import { ConnectorHolder } from "./ConnectorHolder.js";
import { Connector as STConnector } from "../../syntaxTree/pojo/connector/Connector.js";
import { ConnectorParameter } from "../../syntaxTree/pojo/connector/ConnectorParameter.js";
import { Constant } from "../../syntaxTree/constant.js";
import { DOMElement } from "../../syntaxTree/dom/dom.js";
import { JsonObject } from "../gson.js";
import { UISchemaMapper } from "../utils/UISchemaMapper.js";
import { Utils } from "../../syntaxTree/utils.js";
import { JFile } from "../host/JFile.js";

export class ConnectionHandler {
  static readonly __fields: string[] = ["connectorHolder"];

  static readonly LOGGER: Logger = Logger.getLogger("ConnectionHandler");

  connectorHolder?: ConnectorHolder;

  init(connectorHolder: ConnectorHolder): void {
    this.connectorHolder = connectorHolder;

  }

  getConnectionUISchema(param: ConnectionUIParam): JsonObject {
    try {
        if (param.getDocumentUri() != null) {
            return this.getConnectionUiSchema(param.getDocumentUri());
        } else {
            return this.getConnectionUiSchema(param.getConnectorName(), param.getConnectionType());
        }
    } catch (e) {
        ConnectionHandler.LOGGER.severe("Error while getting connection UI schema: " + e.getMessage());
    }
    return null;

  }

  getConnectionUiSchema(connectorName: string, connectionType: string): JsonObject;
  getConnectionUiSchema(documentUri: string): JsonObject;
  getConnectionUiSchema(...args: any[]): any {
    switch (args.length) {
      case 2: {
        const [connectorName, connectionType] = args;


                let connector = this.connectorHolder.getConnector(connectorName);
                if (connector != null) {
                    let connectionSchemas = connector.getConnectionUiSchema();
                    if (connectionSchemas != null) {
                        let path = get(connectionSchemas, connectionType.toUpperCase());
                        if (path != null) {
                            let file = new JFile(path);
                            if (file.exists()) {
                                let uiSchemaString = Utils.readFile(file);
                                return Utils.getJsonObject(uiSchemaString);
                            }
                        }
                    }
                }
                return null;

        break;
      }
      case 1: {
        const [documentUri] = args;


                let documentPath = Utils.getAbsolutePath(documentUri);
                let file = new JFile(documentPath);
                if (file.exists()) {
                    let document = Utils.getDOMDocument(file);
                    if (document != null) {
                        let rootElement = document.getDocumentElement();
                        if (equalsIgnoreCase(Constant.LOCAL_ENTRY, rootElement.getNodeName()) && rootElement.hasChildNodes()) {
                            let connectionElement = Utils.getFirstElement(rootElement);
                            if (connectionElement != null && contains(connectionElement.getNodeName(), ".")) {
                                return this.getUISchema(this.getConnector(connectionElement));
                            }
                        }
                    }
                }
                return null;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getUISchema(connector: STConnector): JsonObject {
    if (connector != null) {
        let connectorName = connector.getConnectorName();
        let connectionType = connector.getParameter(Constant.CONNECTION_TYPE).getValue();
        let uiSchemaJson = this.getConnectionUiSchema(connectorName, connectionType);
        if (uiSchemaJson != null) {
            connector.addParameter(new ConnectorParameter(Constant.CONNECTION_NAME,
                    connector.getParameter(Constant.NAME).getValue()));
            return UISchemaMapper.mapInputToUISchemaForConnector(connector, uiSchemaJson);
        }
    }
    return null;

  }

  getConnector(connectionElement: DOMElement): STConnector {
    let connectorFactory = new ConnectorFactory();
    let connectorNode = connectorFactory.create(connectionElement);
    if (connectorNode instanceof STConnector) {
        let connector = connectorNode as STConnector;
        return connector;

    }
    return null;

  }
}
