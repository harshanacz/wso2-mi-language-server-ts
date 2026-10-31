// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/MediatorHandler.java by the java2ts converter (see tools/java2ts).
import { equals, equalsIgnoreCase, isEmpty, contains, size, get, jreplace, jsplit, format, Logger, Level, StringBuilder, entrySet, StringUtils } from "../../syntaxTree/javaCompat.js";
import { AIConnector } from "../../syntaxTree/pojo/connector/ai/AIConnector.js";
import { AIConnectorHandler } from "./AIConnectorHandler.js";
import { Connector } from "../../syntaxTree/pojo/connector/Connector.js";
import { ConnectorAction } from "../connectors/entity/ConnectorAction.js";
import { ConnectorHolder } from "../connectors/ConnectorHolder.js";
import { Constant } from "../../syntaxTree/constant.js";
import { DOMDocument } from "../../syntaxTree/dom/dom.js";
import { DOMElement } from "../../syntaxTree/dom/dom.js";
import { DOMNode } from "../../syntaxTree/dom/dom.js";
import { Files } from "../host/nio.js";
import { Gson } from "../gson.js";
import { InvalidMediator } from "../../syntaxTree/pojo/mediator/InvalidMediator.js";
import { JsonArray } from "../gson.js";
import { JsonElement } from "../gson.js";
import { JsonObject } from "../gson.js";
import { MediatorFactoryFinder } from "../../syntaxTree/factory/mediators/MediatorFactoryFinder.js";
import { Path } from "../host/nio.js";
import { Position } from "../lsp.js";
import { Range } from "../lsp.js";
import { STNode } from "../../syntaxTree/stNode.js";
import { SynapseConfigResponse } from "./pojo/SynapseConfigResponse.js";
import { TextDocumentIdentifier } from "../lsp.js";
import { TextEdit } from "../lsp.js";
import { UISchemaMapper } from "../utils/UISchemaMapper.js";
import { URI } from "../host/nio.js";
import { Utils } from "../../syntaxTree/utils.js";
import { JFile } from "../host/JFile.js";
import { IllegalArgumentException } from "../../syntaxTree/javaCompat.js";
import { MediatorUtils } from "./MediatorUtils.js";
import { Paths } from "../host/nio.js";
import { Mustache, StringWriter } from "../mustache/Mustache.js";
import { MEDIATOR_CLASSES, MEDIATOR_PROCESSORS } from "./MediatorRegistry.js";

export class MediatorHandler {
  static readonly __fields: string[] = ["mediatorList", "agentToolList", "uiSchemaMap", "templateMap", "connectorHolder", "_isInitialized", "gson", "miServerVersion", "aiConnectorHandler", "projectUri"];

  static readonly LOGGER: Logger = Logger.getLogger("MediatorHandler");

  static readonly MAX_DEPTH: number = 10;

  mediatorList?: JsonObject;

  agentToolList?: JsonObject;

  uiSchemaMap?: Map<string, JsonObject>;

  templateMap?: Map<string, Mustache>;

  connectorHolder?: ConnectorHolder;

  _isInitialized: boolean = false;

  gson?: Gson;

  miServerVersion?: string;

  aiConnectorHandler?: AIConnectorHandler;

  projectUri?: string;

  init(projectUri: string, projectServerVersion: string, connectorHolder: ConnectorHolder): void {
    try {
        this.miServerVersion = projectServerVersion;
        this.connectorHolder = connectorHolder;
        this.mediatorList = Utils.getMediatorList(projectServerVersion, connectorHolder);
        this.agentToolList = Utils.getAgentToolList(this.mediatorList, connectorHolder);
        this.gson = new Gson();
        this.aiConnectorHandler = new AIConnectorHandler(this, projectUri);
        this.projectUri = projectUri;
    } catch (e) {
        MediatorHandler.LOGGER.log(Level.SEVERE,
                format("Failed to load mediators for the MI server version: %s", projectServerVersion), e);
        MediatorHandler.LOGGER.warning(format("Falling back to default mediators (MI %s).", Constant.DEFAULT_MI_VERSION));
        try {
            this.mediatorList = Utils.getMediatorList(Constant.DEFAULT_MI_VERSION, connectorHolder);
        } catch (ex) {

        }
    }
    this.templateMap = Utils.getTemplateMap("org/eclipse/lemminx/mediators/"
            + jreplace(projectServerVersion, ".", "") + "/templates");
    this.uiSchemaMap = Utils.getUISchemaMap("org/eclipse/lemminx/mediators/"
            + jreplace(projectServerVersion, ".", "") + "/ui-schemas");
    this._isInitialized = true;

  }

  getSupportedMediators(documentIdentifier: TextDocumentIdentifier, position: Position): JsonObject {
    try {
        if (this.isRequestedForAgentTool(documentIdentifier.getUri(), position)) {
            return this.agentToolList;
        }
        let document = Utils.getDOMDocument(new JFile(Paths.get(new URI(documentIdentifier.getUri())).toString()));
        let lastMediators = ["send", "drop", "loopback", "respond"];
        let iterateMediators = ["iterate", "foreach"];
        let offset = document.offsetAt(position);
        let currentNode = document.findNodeBefore(offset);
        let nextMediator = currentNode.getNextSibling();
        if (contains(lastMediators, currentNode.getNodeName())) {
            return new JsonObject();
        } else {
            if (this.isAddedAbove(currentNode, nextMediator, offset) || this.isIterateMediator(currentNode, iterateMediators)) {
                return this.removeMediators(this.mediatorList, lastMediators);
            }
            return this.mediatorList;
        }
    } catch (e) {
        MediatorHandler.LOGGER.log(Level.SEVERE, "Error occurred while retrieving supported mediators.", e);
    }
    return null;

  }

  generateSynapseConfig(documentUri: string, range: Range, mediator: string, data: Map<string, any>, dirtyFields: string[]): SynapseConfigResponse {
    try {
        let isUpdate = !equals(range.getEnd(), range.getStart());
        let node = null;
        if (StringUtils.isNotEmpty(documentUri) && Files.exists(Path.of(documentUri))) {
            node = this.getMediatorNodeAtPosition(Utils.getDOMDocument(new JFile(documentUri)), range.getStart(),
                    isUpdate);
        }
        if (this.isRequestedForAgentTool(documentUri, range.getStart())) {
            return this.aiConnectorHandler.generateAgentToolConfig(documentUri, range, mediator, data, dirtyFields,
                    isUpdate);
        } else if (this.isAIConnector(node, mediator)) {
            return this.aiConnectorHandler.generateAIConnectorConfig(node, mediator, data, range);
        } else if (this.isConnector(node, mediator)) {
            return this.generateConnectorSynapseConfig(node, mediator, data, range);
        } else {
            return this.generateMediatorSynapseConfig(node, mediator, data, dirtyFields, range);
        }

    } catch (e) {
        MediatorHandler.LOGGER.log(Level.SEVERE, "Error occurred while generating Synapse configuration.", e);
    }
    return null;

  }

  isAIConnector(node: STNode, mediator: string): boolean {
    return node instanceof AIConnector || (StringUtils.isNotEmpty(mediator) && mediator.startsWith("ai."));

  }

  isConnector(node: STNode, mediator: string): boolean {
    return node instanceof Connector || contains(mediator, ".");

  }

  generateConnectorSynapseConfig(node: STNode, mediator: string, data: Map<string, any>, range: Range): SynapseConfigResponse {
    let operation = this.getConnectorOperation(node, mediator);
    if (operation != null) {
        let parameters = operation.getParameters();
        let connectorData = new Map();
        connectorData.set(Constant.TAG, operation.getTag());
        connectorData.set(Constant.CONFIG_KEY, get(data, Constant.CONFIG_KEY));
        let parameterData = [];
        for (let parameter of parameters) {
            if (data.has(parameter.getName())) {
                let dataValue = this.processConnectorParameter(get(data, parameter.getName()));
                parameterData.push(new Map<string, any>([[Constant.NAME, parameter.getName()], [Constant.VALUE, dataValue]]));
            }
        }




        for (let entry of entrySet(data)) {
            if (entry.getKey().startsWith("dyn_param_") && !entry.getKey().startsWith("dyn_param_temp_")
                    && entry.getValue() != null && !isEmpty(String(entry.getValue()))) {
                let name = entry.getKey().substring(entry.getKey().lastIndexOf("_") + 1);
                let dataValue = this.processConnectorParameter(entry.getValue());
                parameterData.push(new Map<string, any>([[Constant.NAME, name], [Constant.VALUE, dataValue]]));
            }
        }

        connectorData.set(Constant.PARAMETERS, parameterData);
        let writer = new StringWriter();
        let edit = String(get(this.templateMap, Constant.CONNECTOR).execute(writer, connectorData));
        let textEdit = new TextEdit(range, edit);
        return new SynapseConfigResponse(textEdit);
    }
    return null;

  }

  processConnectorParameter(data: any): Map<string, any> {
    let dataValue = new Map();
    let isExpressionField = false;
    if ((typeof data === "string")) {
        let dataStr = (data as string);
        let trimmedDataStr = dataStr.trim();
        if (trimmedDataStr.startsWith("{") && trimmedDataStr.endsWith("}")) {
            dataValue.set(Constant.VALUE, format("'%s'", trimmedDataStr));
        } else {
            dataValue.set(Constant.VALUE, format("%s", data));
        }
    } else if ((typeof data === "boolean")) {
        dataValue.set(Constant.VALUE, data);
    } else if (data instanceof Map) {
        dataValue = (data as Map<any, any>);
        let isExpressionObj: any = get(dataValue, Constant.IS_EXPRESSION);
        let isExpression = isExpressionObj == null ? false : (isExpressionObj as boolean);
        if (isExpression) {
            isExpressionField = true;
            dataValue.set(Constant.VALUE, format("{%s}", get(dataValue, Constant.VALUE)));
            dataValue.set(Constant.IS_EXPRESSION, true);
        } else {
            if (String(get(dataValue, Constant.VALUE)).startsWith("{") &&
                    String(get(dataValue, Constant.VALUE)).endsWith("}")) {
                dataValue.set(Constant.VALUE, format("'%s'", get(dataValue, Constant.VALUE)));
            }
        }
    } else if (Array.isArray(data)) {
        let dataValueList = (data as any[]);
        let dataValueStr = new StringBuilder("[");
        let i = 0;
        for (let dataValueItem of dataValueList) {

            if (i > 0) {
                dataValueStr.append(",");
            }

            if (get(dataValueItem, Constant.PROPERTY_NAME) != null &&
                    get(dataValueItem, Constant.PROPERTY_VALUE) != null) {
                let propertyValue: any | undefined;
                if (get(dataValueItem, Constant.PROPERTY_VALUE) instanceof Map) {
                    let dataValueLinkedTree = (get(dataValueItem, Constant.PROPERTY_VALUE) as Map<any, any>);
                    propertyValue = get(dataValueLinkedTree, Constant.VALUE);
                } else {
                    propertyValue = get(dataValueItem, Constant.PROPERTY_VALUE);
                }
                dataValueStr.append(format("{\"%s\":\"%s\"}",
                        get(dataValueItem, Constant.PROPERTY_NAME), propertyValue));
            } else if (size(dataValueList) > 0) {




                dataValueStr.append("[");
                let itemKeys = [...dataValueItem.keys()];
                for (let keyIndex = 0; keyIndex < itemKeys.length; keyIndex++) {
                    let keepAsObject = false;
                    let key: any = itemKeys[keyIndex];
                    let propertyValue: any | undefined;
                    if (get(dataValueItem, key) instanceof Map) {
                        let dataValueLinkedTree = (get(dataValueItem, key) as Map<any, any>);
                        propertyValue = get(dataValueLinkedTree, Constant.VALUE);
                    } else {
                        propertyValue = get(dataValueItem, key);
                    }

                    if (Array.isArray(propertyValue)) {
                        keepAsObject = true;
                        propertyValue = this.buildNestedArray(propertyValue);
                    }

                    if (!keepAsObject) {

                        if ((typeof propertyValue === "string")) {
                            propertyValue =jreplace(((propertyValue as string)), "\"", "\\\"");
                        }

                        dataValueStr.append(format("\"%s\"", propertyValue));
                    } else {
                        dataValueStr.append(format("%s", propertyValue));
                    }


                    if (keyIndex < itemKeys.length - 1) {
                        dataValueStr.append(",");
                    }
                }
                dataValueStr.append("]");
            }
            i++;
        }
        dataValueStr.append(']');
        dataValue.set(Constant.VALUE, format("%s", dataValueStr));
    }

    if (get(dataValue, Constant.VALUE) != null && String(get(dataValue, Constant.VALUE)).startsWith("<![CDATA[")) {
        dataValue.set(Constant.IS_CDATA, true);
        let value = String(get(dataValue, Constant.VALUE)).substring(9); 
        if (value.endsWith("]]>")) {
            value = value.substring(0, value.length - 3); 
        }
        dataValue.set(Constant.VALUE, value);
    }
    if (!isExpressionField && this.hasSpecialXmlCharacter(get(dataValue, Constant.VALUE))) {
        dataValue.set(Constant.IS_CDATA, true);
    }
    return dataValue;

  }

  hasSpecialXmlCharacter(o: any): boolean {
    if (!((typeof o === "string"))) {
        return false;
    }
    let value = (o as string);
    return contains(value, "&") || contains(value, "<") || contains(value, ">");

  }

  getConnectorOperation(node: STNode, mediator: string): ConnectorAction {
    let connectorName: string | undefined;
    let operation: string | undefined;
    if (node instanceof Connector) {
        connectorName = ((node as Connector)).getConnectorName();
        operation = ((node as Connector)).getMethod();
    } else {
        connectorName = jsplit(mediator, "\\.")[0];
        operation = this.getConnectorOperationName(mediator, connectorName);
    }
    if (!this.connectorHolder.exists(connectorName)) {
        return null;
    }
    let connectorMetadata =
            this.connectorHolder.getConnector(connectorName);
    return connectorMetadata.getAction(operation);

  }

  generateMediatorSynapseConfig(node: STNode, mediator: string, data: Map<string, any>, dirtyFields: string[], range: Range): SynapseConfigResponse {
    for (let entry of entrySet(this.mediatorList)) {
        if (equalsIgnoreCase(Constant.AI, entry.getKey())) {
            // Skip AI mediators as that is handled by AIConnectorHandler
            continue;
        }
        let mediatorsArray = this.getMediatorsArrayForCategory(entry.getValue());
        for (let mediatorElement of mediatorsArray) {
            let mediatorObject = mediatorElement.getAsJsonObject();
            if (equals(mediator, mediatorObject.get(Constant.TAG).getAsString())) {
                let mediatorClass = mediatorObject.get(Constant.MEDIATOR_CLASS).getAsString();
                let processingClass = mediatorObject.get(Constant.PROCESSING_CLASS).getAsString();
                let processingMethod = mediatorObject.get(Constant.STORE_METHOD).getAsString();
                if (equals(mediator, Constant.DATA_MAPPER) && String(data.get(Constant.NAME)).includes("gov:datamapper")) {
                    let name = (data.get(Constant.NAME) as string);
                    let dmName = name.substring(name.lastIndexOf("/") + 1);
                    let dmcPath = String(Path.of(this.projectUri, Constant.SRC, Constant.MAIN, Constant.WSO2MI,
                            Constant.RESOURCES, Constant.REGISTRY, Constant.GOV,
                            Constant.DATA_MAPPER, dmName + ".dmc"));
                    if (Files.exists(Path.of(dmcPath))) {
                        data.set(Constant.NAME, data.get(Constant.NAME) + ".dmc");
                    }
                }
                let mediatorProcessor = MEDIATOR_PROCESSORS.get(processingClass);
                let nodeClass = MEDIATOR_CLASSES.get(mediatorClass);
                if (mediatorProcessor == null || nodeClass == null) {
                    throw new Error("ClassNotFoundException: " + (mediatorProcessor == null ? processingClass : mediatorClass));
                }
                if (!(node instanceof nodeClass)) {
                    node = null;
                }
                let processedData = mediatorProcessor[processingMethod](data, node, dirtyFields);
                if (processedData.isLeft()) {
                    let writer = new StringWriter();
                    let edit = String(get(this.templateMap, mediator).execute(writer, processedData.getLeft())).trim();
                    let textEdit = new TextEdit(range, edit);
                    return new SynapseConfigResponse(textEdit);
                } else {
                    let editsData = processedData.getRight();
                    let edits = new SynapseConfigResponse();
                    for (let entry1 of entrySet(editsData)) {
                        let writer = new StringWriter();
                        let edit = String(get(this.templateMap, mediator).execute(writer, entry1.getValue())).trim();
                        if (this.isBlankEdit(entry1.getKey(), edit)) {
                            continue;
                        }
                        let textEdit = new TextEdit(entry1.getKey(), edit);
                        edits.addTextEdit(textEdit);
                    }
                    return edits;
                }
            }
        }
    }
    return null;

  }

  isBlankEdit(range: Range, edit: string): boolean {
    if (range.getStart().getLine() == range.getEnd().getLine()) {
        return range.getStart().getCharacter() == range.getEnd().getCharacter() && isEmpty(edit.trim());
    }
    return false;

  }

  getMediatorsArrayForCategory(value: JsonElement): JsonArray {
    let listElements = get(value.getAsJsonObject(), Constant.ITEMS);
    let mediatorsArray: JsonArray | undefined;
    if (listElements.isJsonArray()) {
        mediatorsArray = listElements.getAsJsonArray();
    } else {

        mediatorsArray = new JsonArray();
        [...listElements.getAsJsonObject().keys()].forEach(key => {
            mediatorsArray.push(...listElements.getAsJsonObject().getAsJsonArray(key));
        });
    }
    return mediatorsArray;

  }

  getUISchemaWithValues(documentIdentifier: TextDocumentIdentifier, position: Position): JsonObject {
    try {
        let document = Utils.getDOMDocumentFromPath(documentIdentifier.getUri());
        if (this.isRequestedForAgentTool(documentIdentifier.getUri(), position)) {
            return this.aiConnectorHandler.getToolSchemaWithValues(document, position);
        }
        let node = this.getMediatorNodeAtPosition(document, position, true);
        return this.getUISchemaForSTNode(node);
    } catch (e) {
        MediatorHandler.LOGGER.log(Level.SEVERE, "Error occurred while updating UI schema with existing values.", e);
    }
    return null;

  }

  getUISchemaForSTNode(node: STNode): JsonObject {
    if (node != null) {
        if (node instanceof Connector) {
            return this.getUISchemaWithValuesForConnector(node);
        }
        return this.getUISchemaWithValuesForMediator(node);
    }
    return null;

  }

  getUISchemaWithValuesForConnector(node: STNode): JsonObject {
    let connector = (node as Connector);
    let uiSchema = this.getConnectorUiSchema(connector.getTag(), null, null);
    return UISchemaMapper.mapInputToUISchemaForConnector(connector, uiSchema);

  }

  getUISchemaWithValuesForMediator(node: STNode): JsonObject {
    let mediatorName = node.getTag();
    for (let entry of entrySet(this.mediatorList)) {
        if (equalsIgnoreCase(Constant.AI, entry.getKey())) {
            // Skip AI mediators as that is handled by AIConnectorHandler
            continue;
        }
        let mediatorsArray = this.getMediatorsArrayForCategory(entry.getValue());
        for (let mediatorElement of mediatorsArray) {
            let mediator = mediatorElement.getAsJsonObject();
            if (equals(mediatorName, mediator.get(Constant.TAG).getAsString())) {
                let mediatorClass = mediator.get(Constant.MEDIATOR_CLASS).getAsString();
                let processingClass = mediator.get(Constant.PROCESSING_CLASS).getAsString();
                let processingMethod = mediator.get(Constant.RETRIEVE_METHOD).getAsString();
                let mediatorProcessor = MEDIATOR_PROCESSORS.get(processingClass);
                if (mediatorProcessor == null || !MEDIATOR_CLASSES.has(mediatorClass)) {
                    throw new Error("ClassNotFoundException: " + (mediatorProcessor == null ? processingClass : mediatorClass));
                }
                let data = mediatorProcessor[processingMethod](node);
                let dataJson = this.gson.toJsonTree(data).getAsJsonObject();
                return UISchemaMapper.mapInputToUISchema(dataJson,
                        this.findUISchema(mediatorName, dataJson.get(Constant.UI_SCHEMA_NAME)));
            }
        }
    }
    return get(this.uiSchemaMap, mediatorName);

  }

  findUISchema(mediatorName: string, uiSchemaName: JsonElement): JsonObject {
    if (uiSchemaName != null) {


        let uiSchemaNameValue = jreplace(uiSchemaName.getAsString(), "_", ":");
        if (this.uiSchemaMap.has(uiSchemaNameValue)) {
            return get(this.uiSchemaMap, uiSchemaNameValue).deepCopy();
        }
    }
    return get(this.uiSchemaMap, mediatorName).deepCopy();

  }

  getMediatorNodeAtPosition(document: DOMDocument, position: Position, isUpdate: boolean): STNode {
    position = new Position(position.getLine(), position.getCharacter() + (isUpdate ? 1 : 0));
    let offset = document.offsetAt(position);
    let node = document.findNodeAt(offset);
    if (node == null || (node instanceof DOMElement && ((node as DOMElement)).getEndTagOpenOffset() == offset)) {
        return null;
    }

    let mediator = MediatorFactoryFinder.getInstance().getMediator(node);
    if (mediator != null && !(mediator instanceof InvalidMediator)) {
        return mediator;
    }

    return null;

  }

  removeMediators(mediatorList: JsonObject, mediatorsToRemove: string[]): JsonObject {
    let filteredMediators = new JsonObject();
    for (let key of mediatorList.keySet()) {
        let mediatorObject = mediatorList.getAsJsonObject(key);
        if (mediatorObject.has(Constant.IS_CONNECTOR) && get(mediatorObject, Constant.IS_CONNECTOR).getAsBoolean()) {
            filteredMediators.add(key, mediatorObject);
        } else {
            let mediatorsArray = mediatorObject.getAsJsonArray(Constant.ITEMS);
            let filteredArray = new JsonArray();
            for (let element of mediatorsArray) {
                let mediator = element.getAsJsonObject();
                let tag = get(mediator, Constant.TAG).getAsString();
                if (!contains(mediatorsToRemove, tag)) {
                    filteredArray.add(mediator);
                }
            }
            let items = new JsonObject();
            items.add(Constant.ITEMS, filteredArray);
            filteredMediators.add(key, items);
        }
    }
    return filteredMediators;

  }

  isIterateMediator(currentNode: DOMNode, iterateMediators: string[]): boolean {
    if (currentNode != null && iterateMediators != null) {
        let node = equals(currentNode.getNodeName(), "#text") ? currentNode.getParentNode() : currentNode;
        if (node != null) {
            let parentNode = node.getParentNode();
            if (parentNode != null && contains(iterateMediators, parentNode.getNodeName())) {
                return true;
            } else {
                let grandParentNode = parentNode != null ? parentNode.getParentNode() : null;
                if (grandParentNode != null && contains(iterateMediators, grandParentNode.getNodeName())) {
                    return true;
                } else {
                    let greatGrandParentNode = grandParentNode != null ? grandParentNode.getParentNode() : null;
                    return greatGrandParentNode != null && contains(iterateMediators, greatGrandParentNode.getNodeName());
                }

            }
        }
    }
    return false;

  }

  isAddedAbove(currentNode: DOMNode, nextNode: DOMNode, offset: number): boolean {
    if (currentNode instanceof DOMElement) {
        let tagElement = (currentNode as DOMElement);
        if (!tagElement.isSelfClosed() && (offset > tagElement.getStartTagCloseOffset() && offset <= tagElement.getEndTagOpenOffset())) {
            return currentNode.hasChildNodes();
        } else {
            return nextNode != null;
        }
    }
    return false;

  }

  getUiSchema(mediatorName: string, documentIdentifier: TextDocumentIdentifier, position: Position): JsonObject;
  getUiSchema(mediatorName: string): JsonObject;
  getUiSchema(...args: any[]): any {
    switch (args.length) {
      case 3: {
        const [mediatorName, documentIdentifier, position] = args;


                if (documentIdentifier != null && this.isRequestedForAgentTool(documentIdentifier.getUri(), position)) {
                    return this.aiConnectorHandler.getToolSchema(mediatorName);
                } else if (this.uiSchemaMap.has(mediatorName)) {
                    return get(this.uiSchemaMap, mediatorName);
                } else if (contains(mediatorName, ".")) {
                    return this.getConnectorUiSchema(mediatorName, documentIdentifier, position);
                }
                return null;

        break;
      }
      case 1: {
        const [mediatorName] = args;


                return this.getUiSchema(mediatorName, null, null);

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  isRequestedForAgentTool(documentUri: string, position: Position): boolean {
    if (documentUri == null || position == null) {
        return false;
    }
    try {
        let documentPath = Utils.getAbsolutePath(documentUri);
        if (StringUtils.isEmpty(documentPath) || Files.notExists(Path.of(documentPath))) {
            return false;
        }
        let document = Utils.getDOMDocument(new JFile(documentPath));
        let offset = document.offsetAt(position);
        let currentNode = document.findNodeAt(offset);
        if (this.isInsideAiAgent(currentNode)) {
            return true;
        }
    } catch (e) {
        MediatorHandler.LOGGER.log(Level.SEVERE, "Error occurred while checking if the tool schema is requested.", e);
    }
    return false;

  }

  isInsideAiAgent(currentNode: DOMNode): boolean {

    if (currentNode == null || currentNode.getParentNode() == null) {
        return true;
    }


    if (equals(Constant.AI_AGENT_TAG, currentNode.getParentNode().getNodeName())) {
        return true;
    }


    return currentNode.getParentNode().getParentNode() != null &&
            equals(Constant.AI_AGENT_TAG, currentNode.getParentNode().getParentNode().getNodeName());

  }

  getConnectorUiSchema(mediatorName: string, documentIdentifier: TextDocumentIdentifier, position: Position): JsonObject {
    let connectorName = jsplit(mediatorName, "\\.")[0];
    let operationName = this.getConnectorOperationName(mediatorName, connectorName);
    if (this.connectorHolder.exists(connectorName)) {
        let connector = this.connectorHolder.getConnector(connectorName);
        let operation = connector.getAction(operationName);
        if (operation != null) {
            let uiSchemaPath = operation.getUiSchemaPath();
            try {
                let uiSchemaObject = Utils.getJsonObject(Utils.readFile(new JFile(uiSchemaPath)));
                let isTryoutSupported = Utils.compareVersions(this.miServerVersion, Constant.MI_430_VERSION) > 0;
                uiSchemaObject.addProperty(Constant.CAN_TRY_OUT, isTryoutSupported);
                let resultObject = new JsonObject();
                if (isTryoutSupported && documentIdentifier != null && position != null) {
                    resultObject.addProperty(Constant.RESPONSE_VARIABLE, MediatorUtils.generateResponseVariableDefaultValue(documentIdentifier, position, connectorName, operationName));
                }
                return UISchemaMapper.mapInputToUISchema(resultObject, uiSchemaObject);
            } catch (e) {
                MediatorHandler.LOGGER.log(Level.SEVERE, "Error occurred while retrieving UI schema for connector operation.", e);
            }
        }

    }
    return null;

  }

  isInitialized(): boolean {
    return this._isInitialized;

  }

  reloadMediatorList(projectServerVersion: string): void {
    try {
        this.mediatorList = Utils.getMediatorList(projectServerVersion, this.connectorHolder);
        this.agentToolList = Utils.getAgentToolList(this.mediatorList, this.connectorHolder);
    } catch (e) {
        MediatorHandler.LOGGER.log(Level.SEVERE, "Failed to reload mediators.", e);
    }

  }

  getMustacheTemplate(key: string): Mustache {
    return get(this.templateMap, key);

  }

  buildNestedArray(value: any): string;
  buildNestedArray(value: any, depth: number): string;
  buildNestedArray(...args: any[]): any {
    switch (args.length) {
      case 1: {
        const [value] = args;


                return this.buildNestedArray(value, 0);

        break;
      }
      case 2: {
        let [value, depth] = args;


                if (depth > MediatorHandler.MAX_DEPTH) {
                    throw new IllegalArgumentException("Maximum JSON nesting depth exceeded");
                }


                while (value instanceof Map) {
                    let map = (value as Map<any, any>);
                    if (get(map, Constant.VALUE) != null) {
                        value = get(map, Constant.VALUE);
                    } else {
                        break;
                    }
                }

                if (Array.isArray(value)) {
                    let list = (value as any[]);
                    let sb = new StringBuilder("[");
                    for (let i = 0; i < size(list); i++) {
                        sb.append(this.buildNestedArray(get(list, i)));
                        if (i < size(list) - 1) {
                            sb.append(",");
                        }
                    }
                    sb.append("]");
                    return String(sb);
                }

                if ((typeof value === "string")) {
                    return "\"" +jreplace(((value as string)), "\"", "\\\"") + "\"";
                }

                return String(value);

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getConnectorOperationName(mediatorName: string, connectorName: string): string {
    let mediatorNameParts = jsplit(mediatorName, "\\.");

          return (equalsIgnoreCase(Constant.UTILITY, connectorName) && mediatorNameParts.length == 3) ? 
    	mediatorNameParts[1] + Constant.DOT + mediatorNameParts[2]: mediatorNameParts[1];

  }
}
