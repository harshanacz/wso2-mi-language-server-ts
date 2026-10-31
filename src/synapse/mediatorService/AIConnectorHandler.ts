// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/AIConnectorHandler.java by the java2ts converter (see tools/java2ts).
import { equals, equalsIgnoreCase, isEmpty, contains, get, isBlank, matches, jreplace, replaceAll, jsplit, format, Logger, Level, StringBuilder, removeFrom, entrySet, StringUtils } from "../../syntaxTree/javaCompat.js";
import { AIAgent } from "../../syntaxTree/pojo/connector/ai/AIAgent.js";
import { ConfigFinder } from "../utils/ConfigFinder.js";
import { Connection } from "../connectors/entity/Connection.js";
import { Connector } from "../../syntaxTree/pojo/connector/Connector.js";
import { ConnectorHolder } from "../connectors/ConnectorHolder.js";
import { Constant } from "../../syntaxTree/constant.js";
import { DOMDocument } from "../../syntaxTree/dom/dom.js";
import { DOMElement } from "../../syntaxTree/dom/dom.js";
import { DOMNode } from "../../syntaxTree/dom/dom.js";
import { DocumentTextEdit } from "./pojo/DocumentTextEdit.js";
import { Either } from "../lsp.js";
import { Files } from "../host/nio.js";
import { JsonArray } from "../gson.js";
import { JsonElement } from "../gson.js";
import { JsonObject } from "../gson.js";
import { JsonPrimitive } from "../gson.js";
import { MCPToolResponse } from "./pojo/MCPToolResponse.js";
import { Mediator } from "../../syntaxTree/pojo/mediator/Mediator.js";
import { MediatorHandler } from "./MediatorHandler.js";
import { NewProjectResourceFinder } from "../resourceFinder/NewProjectResourceFinder.js";
import { Path } from "../host/nio.js";
import { Position } from "../lsp.js";
import { Range } from "../lsp.js";
import { STNode } from "../../syntaxTree/stNode.js";
import { SynapseConfigResponse } from "./pojo/SynapseConfigResponse.js";
import { SyntaxTreeGenerator } from "../../syntaxTree/SyntaxTreeGenerator.js";
import { Template } from "../../syntaxTree/pojo/template/Template.js";
import { TextEdit } from "../lsp.js";
import { UISchemaMapper } from "../utils/UISchemaMapper.js";
import { URI } from "../host/nio.js";
import { Utils } from "../../syntaxTree/utils.js";
import { JFile } from "../host/JFile.js";
import { StringWriter } from "../mustache/Mustache.js";
import { IllegalArgumentException } from "../../syntaxTree/javaCompat.js";

function createRange(start: number, end: number, document: DOMDocument): Range {
  return new Range(document.positionAt(start), document.positionAt(end));
}

function elementChildren(node: DOMNode): DOMNode[] {
  return node.getChildren().filter((c) => c.isElement());
}

export class ExistingTool {
  static readonly __fields: string[] = ["name", "connection", "xml"];

  name?: string;

  connection?: string;

  xml?: string;

  constructor(name: string, connection: string, xml: string) {
    this.name = name;
    this.connection = connection;
    this.xml = xml;

  }
}

export class AIConnectorHandler {
  static readonly LOGGER: Logger = Logger.getLogger("AIConnectorHandler");

  static readonly AGENT_TOOL_TEMPLATE: string = "agentToolTemplate";

  static readonly TOOL_NAME: string = "toolName";

  static readonly TOOL_DESCRIPTION: string = "toolDescription";

  static readonly TOOL_RESULT_EXPRESSION: string = "toolResultExpression";

  static readonly RESULT_EXPRESSION: string = "resultExpression";

  static readonly SUPPORTS_AI_VALUES: string = "supportsAIValues";

  static readonly FUNCTION_PARAM_PREFIX: string = "${params.functionParams.";

  static readonly FROM_AI: string = "fromAI";

  static readonly AI_CONNECTOR_MUSTACHE_TEMPLATE_NAME: string = "AIConnector";

  static readonly MCP_MEDIATOR: string = "ai.mcpTools";

  static readonly MCP_CONNECTION: string = "mcpConnection";

  static readonly MCP_CONNECTIONS: string = "mcpConnections";

  static readonly CONNECTIONS: string = "connections";

  static readonly CONFIG_KEY: string = "configKey";

  static readonly MCP_TOOLS_SELECTION: string = "mcpToolsSelection";

  static readonly IS_MCP: string = "isMCP";

  static readonly ERROR: string = "error";

  static readonly SERVER_URL: string = "mcpServerUrl";

  static readonly ACCESS_TOKEN: string = "bearerToken";

  static readonly AUTHENTICATION_TYPE: string = "authenticationType";

  static readonly NONE: string = "None";

  static readonly TEMPLATE_FOLDER_PATH: Path = Path.of("src", "main", "wso2mi", "artifacts", "templates");

  TOOL_EDIT_FIELDS: Set<string> = new Set([AIConnectorHandler.TOOL_NAME, AIConnectorHandler.TOOL_DESCRIPTION, AIConnectorHandler.TOOL_RESULT_EXPRESSION, AIConnectorHandler.MCP_TOOLS_SELECTION]);

  mediatorHandler?: MediatorHandler;

  projectUri?: string;

  randomGenerator = { nextInt: (bound: number): number => Math.floor(Math.random() * bound) };

  static readonly CONNECTION_TYPES: string[] = [Constant.LLM_CONFIG_KEY, Constant.MEMORY_CONFIG_KEY, Constant.EMBEDDING_CONFIG_KEY,
                    Constant.VECTOR_STORE_CONFIG_KEY];

  constructor(mediatorHandler: MediatorHandler, projectUri: string) {
    this.mediatorHandler = mediatorHandler;
    this.projectUri = projectUri;

  }

  generateAIConnectorConfig(node: STNode, mediator: string, data: Map<string, any>, range: Range): SynapseConfigResponse {
    let operation = this.mediatorHandler.getConnectorOperation(node, mediator);
    if (operation != null) {
        let parameters = operation.getParameters();
        let connectorData = new Map();
        connectorData.set(Constant.TAG, operation.getTag());
        let connections = this.addConnectionsDataForXML(data);
        connectorData.set(Constant.CONNECTIONS, connections);
        connectorData.set("supportTools", node instanceof AIAgent || equals(Constant.AI_AGENT_TAG, mediator));
        let parameterData = [];
        for (let parameter of parameters) {
            if (data.has(parameter.getName())) {
                let dataValue =
                        this.mediatorHandler.processConnectorParameter(get(data, parameter.getName()));
                if (dataValue != null && dataValue.has(Constant.VALUE) &&
                        StringUtils.isNotEmpty(String(get(dataValue, Constant.VALUE)))) {
                    parameterData.push(new Map<string, any>([[Constant.NAME, parameter.getName()], [Constant.VALUE, dataValue]]));
                }
            }
        }
        connectorData.set(Constant.PARAMETERS, parameterData);
        if (node instanceof AIAgent) {
            let aiAgent = (node as AIAgent);
            if (aiAgent.getTools() != null) {
                let tools = [];
                for (let tool of ((node as AIAgent)).getTools().getTools()) {
                    let toolData = new Map();
                    toolData.set(Constant.NAME, tool.getName());
                    toolData.set(Constant.DESCRIPTION, tool.getDescription());
                    if (tool.getIsMcpTool()) {
                        toolData.set(AIConnectorHandler.IS_MCP, Constant.TRUE);
                        toolData.set(Constant.TYPE, Constant.MCP);
                        toolData.set(Constant.MCP_CONNECTION, tool.getMcpConnection());
                    } else {
                        toolData.set(Constant.TEMPLATE, tool.getTemplate());
                        toolData.set(Constant.RESULT_EXPRESSION, tool.getResultExpression());
                    }
                    tools.push(toolData);
                }
                connectorData.set(Constant.TOOLS, tools);
            }
            if (aiAgent.getMcpConnections() != null) {
                connectorData.set(AIConnectorHandler.MCP_CONNECTIONS, aiAgent.getMcpConnections().getMcpConnections());
            }
        }
        let writer = new StringWriter();
        let edit = String(this.mediatorHandler.getMustacheTemplate(AIConnectorHandler.AI_CONNECTOR_MUSTACHE_TEMPLATE_NAME)
                .execute(writer, connectorData));
        let textEdit = new TextEdit(range, edit);
        return new SynapseConfigResponse(textEdit);
    }
    return null;

  }

  addConnectionsDataForXML(data: Map<string, any>): Map<string, string>[] {
    let connections = [];
    for (let connectionType of AIConnectorHandler.CONNECTION_TYPES) {
        if (data.has(connectionType)) {
            connections.push(new Map<string, any>([[Constant.NAME, connectionType], [Constant.VALUE, String(get(data, connectionType))]]));
        }
    }
    return connections;

  }

  generateAgentToolConfig(documentUri: string, range: Range, mediator: string, data: Map<string, any>, dirtyFields: string[], isUpdate: boolean): SynapseConfigResponse {
    if (isUpdate) {
        return this.modifyAgentTool(documentUri, range, mediator, data, dirtyFields);
    } else {
        return this.addAIAgentTool(documentUri, range, mediator, data, dirtyFields);
    }

  }

  extractExistingTools(document: DOMDocument, toolsNode: DOMNode): ExistingTool[] {
    let existingTools = [];
    if (toolsNode == null) {
        return existingTools;
    }

    for (let child of elementChildren(toolsNode)) {
        if (!equals(Constant.TOOL, child.getNodeName())) {
            continue;
        }
        let toolElem = (child as DOMElement);

        let name = toolElem.getAttribute(Constant.NAME);
        let connection = toolElem.getAttribute(Constant.MCP_CONNECTION);

        let start = ((child as DOMNode)).getStart();
        let end = ((child as DOMNode)).getEnd();
        let xml = document.getText().substring(start, end);
        existingTools.push(new ExistingTool(name, connection, xml));
    }

    return existingTools;

  }

  getExistingToolsForConnection(toolsNode: DOMNode, connection: string): string[] {
    let toolNames = [];
    if (toolsNode == null) {
        AIConnectorHandler.LOGGER.log( Level.INFO, "No tools node found.");
        return toolNames;
    }
    if (!equals(Constant.TOOLS, toolsNode.getNodeName())) {
        AIConnectorHandler.LOGGER.log(Level.SEVERE,
                format("Invalid node for MCP tool fetching. Expected <tools> but found <%s>",
                        toolsNode.getNodeName()));
    }

    for (let child of elementChildren(toolsNode)) {
        if (!equals(Constant.TOOL, child.getNodeName())) {
            continue;
        }
        let toolElem = (child as DOMElement);
        let name = toolElem.getAttribute(Constant.NAME);
        let conn = toolElem.getAttribute(Constant.MCP_CONNECTION);
        if (StringUtils.isEmpty(name)) {
            continue;
        }
        if (!StringUtils.isEmpty(connection) && equals(connection, conn)) {
            toolNames.push(name);
        }
    }

    return toolNames;

  }

  createNewMCPToolXml(toolName: string, toolDescription: string, targetConnection: string): string {
    let toolData = new Map();
    toolData.set(AIConnectorHandler.TOOL_NAME, toolName);
    toolData.set(AIConnectorHandler.MCP_CONNECTION, targetConnection);
    toolData.set(AIConnectorHandler.TOOL_DESCRIPTION, toolDescription);
    return this.generateToolXml(toolData, null);

  }

  addAIAgentTool(documentUri: string, range: Range, mediator: string, data: Map<string, any>, dirtyFields: string[]): SynapseConfigResponse {
    if (StringUtils.isEmpty(mediator)) {
        return null;
    }
    let isMCP = equals(AIConnectorHandler.MCP_MEDIATOR, mediator);
    let sequenceTemplateName = null;
    let agentEditResponse = new SynapseConfigResponse();
    if (!isMCP) {
        let toolName = get(data, AIConnectorHandler.TOOL_NAME) != null ? String(get(data, AIConnectorHandler.TOOL_NAME)) : mediator;
        sequenceTemplateName = this.getSequenceTemplateName(toolName);

        let sequenceTemplatePath =
                String(Path.of(this.projectUri).resolve(AIConnectorHandler.TEMPLATE_FOLDER_PATH).resolve(sequenceTemplateName + ".xml"));
        let templateParameters = new Map();

        this.processAIValues(data, templateParameters);


        if (data.has(Constant.OVERWRITE_BODY)) data.set(Constant.OVERWRITE_BODY, false);


        let mediatorEdits =
                this.mediatorHandler.generateSynapseConfig(sequenceTemplatePath, range, mediator, data, dirtyFields);
        if (mediatorEdits == null || mediatorEdits.getTextEdits() == null || isEmpty(mediatorEdits.getTextEdits())) {
            AIConnectorHandler.LOGGER.log(Level.SEVERE, "Error while generating mediator edits for the tool, {0}", mediator);
            return null;
        }


        let templateXml = this.generateSequenceTemplate(mediatorEdits, templateParameters, sequenceTemplateName, data);
        let sequenceTemplateEdit = new DocumentTextEdit(range, templateXml, sequenceTemplatePath);
        sequenceTemplateEdit.setCreateNewFile(true);
        agentEditResponse.addTextEdit(sequenceTemplateEdit);
    }

    data.set(AIConnectorHandler.IS_MCP, isMCP);
    if (data.has(AIConnectorHandler.MCP_TOOLS_SELECTION) && Array.isArray(get(data, AIConnectorHandler.MCP_TOOLS_SELECTION))) {
        let connectionName = StringUtils.EMPTY;
        if (data.has(AIConnectorHandler.CONFIG_KEY) && (typeof get(data, AIConnectorHandler.CONFIG_KEY) === "string")) {
            connectionName = String(get(data, AIConnectorHandler.CONFIG_KEY));
        }

        let mcpToolsSelection = (get(data, AIConnectorHandler.MCP_TOOLS_SELECTION) as Map<string, any>[]);

        let document = Utils.getDOMDocument(new JFile(documentUri));

        let position = new Position(range.getStart().getLine(), range.getStart().getCharacter() + 1);
        let node = document.findNodeAt(document.offsetAt(position));
        let mcpMediatorNode = node.getParentNode();


        let updatedToolsXml = this.buildUpdatedToolsXml(document, node, connectionName, mcpToolsSelection);
        let edit = this.createToolsTextEdit(document, node, mcpMediatorNode, updatedToolsXml, documentUri);
        agentEditResponse.addTextEdit(edit);

        let textEdit = this.ensureMcpConnectionExists(document, mcpMediatorNode, connectionName, documentUri);
        agentEditResponse.addTextEdit(textEdit);
    } else {
        let toolXml = this.generateToolXml(data, sequenceTemplateName);
        let toolsEditTextEdit = new DocumentTextEdit(range, toolXml, documentUri);
        agentEditResponse.addTextEdit(toolsEditTextEdit);
    }
    return agentEditResponse;

  }

  createToolsTextEdit(document: DOMDocument, node: DOMNode, mcpMediatorNode: DOMNode, updatedToolsXml: string, documentUri: string): TextEdit {
    if (node != null) {

        let toolsRange = createRange(node.getStart(), node.getEnd(), document);
        return new DocumentTextEdit(toolsRange, updatedToolsXml, documentUri);
    } else {

        let insertOffset = mcpMediatorNode.getEnd() - 1;
        let insertRange = createRange(insertOffset, insertOffset, document);
        return new DocumentTextEdit(insertRange, updatedToolsXml, documentUri);
    }

  }

  processAIValues(data: Map<string, any>, templateParameters: Map<string, Map<string, string>>): void {
    for (let entry of entrySet(data)) {
        if (this.isExpectingAIValue(entry.getValue())) {
            let parameterName = entry.getKey();
            let parameterDescription = this.extractParameterDescriptionFromFormValues(entry.getValue());

            let parameter = new Map();
            parameter.set(Constant.DESCRIPTION, parameterDescription);
            let isMandatory = entry.getValue() instanceof Map &&((entry.getValue() as Map<any, any>)).has(Constant.IS_MANDATORY) &&
                    equals(true,get(((entry.getValue() as Map<any, any>)), Constant.IS_MANDATORY));
            parameter.set(Constant.IS_MANDATORY, String(isMandatory));
            templateParameters.set(parameterName, parameter);

            let expression = new Map();
            expression.set(Constant.VALUE, format("${params.functionParams.%s}", parameterName));
            expression.set(Constant.IS_EXPRESSION, true);
            data.set(parameterName, expression);
        }
    }

  }

  extractParameterDescriptionFromFormValues(data: any): string {
    if (!(data instanceof Map)) {
        return StringUtils.EMPTY;
    }
    let map = (data as Map<any, any>);
    if (!map.has(Constant.DESCRIPTION) || !(get(map, Constant.DESCRIPTION) instanceof Map)) {
        return StringUtils.EMPTY;
    }
    let description: any =get(((get(map, Constant.DESCRIPTION) as Map<any, any>)), Constant.CURRENT_VALUE);
    return (typeof description === "string") ? String(description) : StringUtils.EMPTY;

  }

  generateToolXml(data: Map<string, any>, sequenceTemplateName: string): string {
    let toolData = this.processToolData(data, sequenceTemplateName);
    let writer = new StringWriter();
    return String(this.mediatorHandler.getMustacheTemplate(Constant.TOOL).execute(writer, toolData));

  }

  generateToolsXmlFromStrings(renderedTools: string[]): string {
    let context = new Map();
    context.set(Constant.TOOLS, renderedTools);

    let writer = new StringWriter();

    return String(this.mediatorHandler
            .getMustacheTemplate(Constant.TOOLS)
            .execute(writer, context));

  }

  isExpectingAIValue(value: any): boolean {
    if (!(value instanceof Map)) {
        return false;
    }
    let map = (value as Map<any, any>);
    return map.has(AIConnectorHandler.FROM_AI) && equals(true, get(map, AIConnectorHandler.FROM_AI));

  }

  processToolData(data: Map<string, any>, sequenceTemplateName: string): Map<string, string> {
    let toolData = new Map();
    if (data.has(AIConnectorHandler.TOOL_NAME)) {
        toolData.set(Constant.NAME, String(get(data, AIConnectorHandler.TOOL_NAME)));
    }
    if (!StringUtils.isEmpty(sequenceTemplateName)) {
        toolData.set(Constant.TEMPLATE, sequenceTemplateName);
    }
    if (data.has(AIConnectorHandler.MCP_CONNECTION)) {
        toolData.set(AIConnectorHandler.MCP_CONNECTION, String(get(data, AIConnectorHandler.MCP_CONNECTION)));
        toolData.set(AIConnectorHandler.IS_MCP, Constant.TRUE);
    }
    if (data.has(AIConnectorHandler.TOOL_RESULT_EXPRESSION) && get(data, AIConnectorHandler.TOOL_RESULT_EXPRESSION) instanceof Map) {
        let expression = (get(data, AIConnectorHandler.TOOL_RESULT_EXPRESSION) as Map<any, any>);
        let value: any = get(expression, Constant.VALUE);
        if ((typeof value === "string") && StringUtils.isNotEmpty(String(value))) {
            toolData.set(AIConnectorHandler.RESULT_EXPRESSION, format("${%s}", value));
        }
    } else if (data.has(Constant.RESPONSE_VARIABLE)) {
        let variableName: string | undefined;
        if (get(data, Constant.RESPONSE_VARIABLE) instanceof Map) {
            variableName =String(get(((get(data, Constant.RESPONSE_VARIABLE) as Map<any, any>)), Constant.VALUE));
        } else {
            variableName = String(get(data, Constant.RESPONSE_VARIABLE));
        }
        let resultExpression = format("${vars.%s.payload}", variableName);
        toolData.set(AIConnectorHandler.RESULT_EXPRESSION, resultExpression);
    }
    if (data.has(AIConnectorHandler.TOOL_DESCRIPTION) && get(data, AIConnectorHandler.TOOL_DESCRIPTION) != null) {
        toolData.set(Constant.DESCRIPTION, String(get(data, AIConnectorHandler.TOOL_DESCRIPTION)));
    } else {
        toolData.set(Constant.DESCRIPTION, StringUtils.EMPTY);
    }
    return toolData;

  }

  getSequenceTemplateName(toolName: string): string {
    let sequenceTemplateName = AIConnectorHandler.sanitizeToolName(toolName);
    let resourceFinder = new NewProjectResourceFinder();
    let response =
            resourceFinder.getAvailableResources(this.projectUri, Either.forLeft("sequenceTemplate"));
    if (response == null || response.getResources() == null) {
        return sequenceTemplateName + this.randomGenerator.nextInt(1000);
    }

    let i = 1;
    let existingNames =
            response.getResources().map((x) => x.getName());
    let newName = sequenceTemplateName;
    while (contains(existingNames, newName)) {
        newName = sequenceTemplateName + i;
        i++;
    }
    return newName;

  }

  static sanitizeToolName(input: string): string {
    if (input == null || isBlank(input)) {
        return Constant.TOOL;
    }

    let parts = jsplit(input.trim(), "[\\s_\\-]+");
    let result = new StringBuilder();

    for (let part of parts) {
        let cleaned = replaceAll(part, "[^a-zA-Z0-9]", "");
        if (!isEmpty(cleaned)) {
            result.append((cleaned.charAt(0)).toUpperCase());
            if (cleaned.length > 1) {
                result.append(cleaned.substring(1));
            }
        }
    }

    return String(result);

  }

  generateSequenceTemplate(mediatorEdits: SynapseConfigResponse, templateParameters: Map<string, Map<string, string>>, sequenceTemplateName: string, data: Map<string, any>): string {

    let edit = get(mediatorEdits.getTextEdits(), 0);
    let mediatorXml = edit.getNewText();
    let templateData = new Map();
    templateData.set(Constant.NAME, sequenceTemplateName);
    templateData.set(Constant.DESCRIPTION, get(data, AIConnectorHandler.TOOL_DESCRIPTION));
    let parameters = [];
    for (let entry of entrySet(templateParameters)) {
        let parameter = new Map();
        parameter.set(Constant.NAME, entry.getKey());
        parameter.set(Constant.IS_MANDATORY, get(entry.getValue(), Constant.IS_MANDATORY));
        parameter.set(Constant.DESCRIPTION, get(entry.getValue(), Constant.DESCRIPTION));
        parameters.push(parameter);
    }
    templateData.set(Constant.PARAMETERS, parameters);
    templateData.set("mediatorXml", mediatorXml);
    let writer = new StringWriter();
    return String(this.mediatorHandler.getMustacheTemplate(AIConnectorHandler.AGENT_TOOL_TEMPLATE).execute(writer, templateData));

  }

  getToolSchema(mediatorName: string): JsonObject {
    let isConnector = mediatorName != null && contains(mediatorName, ".");
    let schema = this.mediatorHandler.getUiSchema(mediatorName, null, null);
    if (schema != null && schema.has(Constant.OPERATION_NAME)) {
        let operationName = get(schema, Constant.OPERATION_NAME).getAsString();
        if (equals(Constant.MCP_TOOLS, operationName)) {
            return schema;
        }
    }

    let toolSchema = this.mediatorHandler.getUiSchema(Constant.TOOL, null, null).deepCopy() as JsonObject;
    let mediatorSchema = null;
    if (schema != null) {
        mediatorSchema = schema.deepCopy();
        let elements = mediatorSchema.getAsJsonArray(Constant.ELEMENTS);
        let newElements = new JsonArray();


        if (this.isResponseModelAvailable(mediatorName)) {
            this.removeResultExpressionField(toolSchema);
        }

        if (isConnector) {
            let operation = ConnectorHolder.getInstance().getConnectorAction(mediatorName);
            let operationName = operation.getName();
            let operationDescription = operation.getDescription();


            get(toolSchema.getAsJsonObject(Constant.VALUE).getAsJsonArray(Constant.ELEMENTS), 0).getAsJsonObject()
                    .getAsJsonObject(Constant.VALUE).addProperty(Constant.CURRENT_VALUE, operationName);
            get(toolSchema.getAsJsonObject(Constant.VALUE).getAsJsonArray(Constant.ELEMENTS), 1).getAsJsonObject()
                    .getAsJsonObject(Constant.VALUE).addProperty(Constant.CURRENT_VALUE, operationDescription);
        }
        newElements.add(toolSchema);

        this.markAIValueSupportedFields(elements, null);


        let wrappedMediatorSchema = this.wrapMediatorSchema(elements, isConnector);
        newElements.add(wrappedMediatorSchema);
        mediatorSchema.add(Constant.ELEMENTS, newElements); 
    }
    return mediatorSchema;

  }

  removeResultExpressionField(toolSchema: JsonObject): void {
    removeFrom(get(toolSchema, Constant.VALUE).getAsJsonObject().getAsJsonArray(Constant.ELEMENTS), 2); 

  }

  wrapMediatorSchema(elements: JsonArray, isConnector: boolean): JsonObject {
    let wrapMediatorSchema = new JsonObject();
    new JsonObject();
    wrapMediatorSchema.addProperty("type", "attributeGroup");
    let wrapMediatorValueObj = new JsonObject();
    wrapMediatorValueObj.addProperty("groupName", StringUtils.EMPTY);
    wrapMediatorValueObj.add(Constant.ELEMENTS, elements); 
    wrapMediatorSchema.add(Constant.VALUE, wrapMediatorValueObj);
    return wrapMediatorSchema;

  }

  isResponseModelAvailable(connectorTag: string): boolean {
    if (StringUtils.isEmpty(connectorTag) || !contains(connectorTag, ".")) {
        return false;
    }
    let operation = this.mediatorHandler.getConnectorOperation(null, connectorTag);
    if (operation != null) {
        return operation.isSupportsResponseModel();
    }
    return false;

  }

  markAIValueSupportedFields(elements: JsonArray, template: Template): void {
    let descriptionElements = new JsonArray();
    for (let element of elements) {
        let elementObj = this.getElementObject(element);
        if (elementObj == null) {
            continue;
        }
        if (equals(Constant.ATTRIBUTE, get(elementObj, Constant.TYPE).getAsString())) {
            let valueObj = elementObj.getAsJsonObject(Constant.VALUE);
            let inputType = get(valueObj, Constant.INPUT_TYPE).getAsString();
            let isExpression = matches(inputType, "^(?!.*combo.*)(?i).*expression$");
            let isExpressionTextArea = equals(Constant.EXPRESSION_TEXT_AREA, inputType);
            if (isExpression || isExpressionTextArea) {
                if (isExpressionTextArea) {

                    valueObj.addProperty(Constant.INPUT_TYPE, "stringOrExpression");
                }
                valueObj.addProperty(AIConnectorHandler.SUPPORTS_AI_VALUES, true);
                this.addParameterDescriptionField(valueObj, template);
            }
        } else if (equals(Constant.ATTRIBUTE_GROUP, get(elementObj, Constant.TYPE).getAsString())) {
            let elementObjValue = elementObj.getAsJsonObject(Constant.VALUE);
            if (equalsIgnoreCase(Constant.OUTPUT, get(elementObjValue, "groupName").getAsString())) {
                elementObjValue.addProperty("hidden", true);
                continue;
            }
            this.markAIValueSupportedFields(elementObjValue.getAsJsonArray(Constant.ELEMENTS), template);
        }
    }
    elements.push(...descriptionElements);

  }

  getElementObject(element: JsonElement): JsonObject {
    if (!element.isJsonObject()) {
        return null;
    }
    let elementObj = element.getAsJsonObject();
    if (!elementObj.has(Constant.TYPE) || !elementObj.has(Constant.VALUE)) {
        return null;
    }
    return elementObj;

  }

  getParameterDescriptionObject(template: Template, parameterName: string, helpTip: string): JsonObject {
    let description = new JsonObject();
    description.addProperty(Constant.DEFAULT_VALUE, helpTip);
    if (template != null && template.hasParameter(parameterName)) {
        let parameter = template.getParameter(parameterName);
        description.addProperty(Constant.CURRENT_VALUE, parameter.getDescription());
    } else {
        description.addProperty(Constant.CURRENT_VALUE, helpTip);
    }
    return description;

  }

  addParameterDescriptionField(valueObj: JsonObject, template: Template): void {
    let parameterName = get(valueObj, Constant.NAME).getAsString();
    let helpTip =
            valueObj.has(Constant.HELP_TIP) ? get(valueObj, Constant.HELP_TIP).getAsString() :
                    parameterName;
    let isRequired = valueObj.has(Constant.REQUIRED) && get(valueObj, Constant.REQUIRED).getAsBoolean();
    let descriptionElement = this.getParameterDescriptionObject(template, parameterName, helpTip);

    let currentValue = get(valueObj, Constant.CURRENT_VALUE);
    if (currentValue instanceof JsonObject) {
        ((currentValue as JsonObject)).add(Constant.DESCRIPTION, descriptionElement);
        ((currentValue as JsonObject)).addProperty(Constant.IS_MANDATORY, isRequired);
    } else if (!contains(get(valueObj, Constant.INPUT_TYPE).getAsString(), "boolean")) {
        valueObj.add(Constant.CURRENT_VALUE, this.createNewValueObjectForToolField(currentValue, valueObj, descriptionElement, isRequired));
    }

  }

  createNewValueObjectForToolField(currentValue: JsonElement, valueObj: JsonObject, descriptionElement: JsonObject, isRequired: boolean): JsonElement {
    let inputType = get(valueObj, Constant.INPUT_TYPE).getAsString();
    let value = this.getCurrentValueForToolField(currentValue, valueObj);
    let currentValueObj = new JsonObject();
    currentValueObj.add(Constant.VALUE, value);
    currentValueObj.addProperty(Constant.IS_EXPRESSION, equals(Constant.EXPRESSION, inputType));
    currentValueObj.addProperty(Constant.IS_MANDATORY, isRequired);
    currentValueObj.add(Constant.DESCRIPTION, descriptionElement);
    return currentValueObj;

  }

  getCurrentValueForToolField(currentValue: JsonElement, valueObj: JsonObject): JsonPrimitive {
    let value: JsonPrimitive | undefined;
    let defaultValue = get(valueObj, Constant.DEFAULT_VALUE);
    if (currentValue != null) {
        value = currentValue.getAsJsonPrimitive();
    } else if (defaultValue != null) {
        value = defaultValue.getAsJsonPrimitive();
    } else {
        value = new JsonPrimitive(StringUtils.EMPTY);
    }
    return value;

  }

  getToolSchemaWithValues(document: DOMDocument, position: Position): JsonObject {
    try {
        let toolPosition = new Position(position.getLine(), position.getCharacter() + 1);
        let offset = document.offsetAt(toolPosition);
        let node = document.findNodeAt(offset);
        if (node == null || !equals(Constant.TOOL, node.getNodeName())) {
            return null;
        }
        let template = this.getSequenceTemplateForTool(node);
        if (this.isValidTool(template)) {
            let mediator = get(template.getSequence().getMediatorList(), 0);
            let schema = this.mediatorHandler.getUISchemaForSTNode(mediator);
            this.markValueExpectedFromAI(schema, template);
            this.markAIValueSupportedFields(schema.getAsJsonArray(Constant.ELEMENTS), template);
            this.addToolConfigurations(schema, node, mediator);
            return schema;
        } else if (node.hasAttribute(Constant.TYPE)) {
            if (node instanceof DOMElement) {
                return this.buildMcpMediatorUiSchema((node as DOMElement));
            }
        }
    } catch (e) {
        AIConnectorHandler.LOGGER.log(Level.SEVERE, "Error while getting tool schema with values", e);
    }
    return null;

  }

  buildMcpMediatorUiSchema(node: DOMElement): JsonObject {
    let uiSchema = this.mediatorHandler.getUiSchema(AIConnectorHandler.MCP_MEDIATOR);
    let jsonObject = new JsonObject();

    let currentConnection = node.getAttribute(Constant.MCP_CONNECTION);
    jsonObject.addProperty(Constant.CONFIG_REF, currentConnection);

    let toolsArray = this.extractToolsForConnection(node, currentConnection);
    jsonObject.add(AIConnectorHandler.MCP_TOOLS_SELECTION, toolsArray);
    return UISchemaMapper.mapInputToUISchema(jsonObject, uiSchema);

  }

  extractToolsForConnection(node: DOMElement, connectionName: string): JsonArray {
    let toolsArray = new JsonArray();
    let toolsNode = node.getParentNode();
    if (toolsNode == null || !toolsNode.isElement()) {
        return toolsArray;
    }
    for (let child of elementChildren(toolsNode)) {
        if (equals(Constant.TOOL, child.getNodeName())) {

            let toolElement = (child as DOMElement);
            if (equals(connectionName, toolElement.getAttribute(Constant.MCP_CONNECTION))) {
                let toolJson = new JsonObject();
                toolJson.addProperty(Constant.NAME, toolElement.getAttribute(Constant.NAME));
                toolJson.addProperty(Constant.DESCRIPTION, toolElement.getAttribute(Constant.DESCRIPTION));
                toolsArray.push(toolJson);
            }
        }
    }
    return toolsArray;

  }

  addToolConfigurations(schema: JsonObject, node: DOMNode, mediator: Mediator): void {
    let toolConfigSchema = this.mediatorHandler.getUiSchema(Constant.TOOL).deepCopy() as JsonObject;
    let toolData = new Map();
    toolData.set(AIConnectorHandler.TOOL_NAME, node.getAttribute(Constant.NAME));

    let expression = new JsonObject();
    expression.addProperty(Constant.IS_EXPRESSION, true);
    expression.addProperty(Constant.VALUE, node.getAttribute(AIConnectorHandler.RESULT_EXPRESSION));
    toolData.set(AIConnectorHandler.TOOL_RESULT_EXPRESSION, expression);

    toolData.set(AIConnectorHandler.TOOL_DESCRIPTION, node.getAttribute(Constant.DESCRIPTION));
    let elements = toolConfigSchema.getAsJsonObject(Constant.VALUE).getAsJsonArray(Constant.ELEMENTS);


    for (let element of elements) {
        let valueObj = element.getAsJsonObject().getAsJsonObject(Constant.VALUE);
        let currentValue: any = get(toolData, get(valueObj, Constant.NAME).getAsString());
        if (currentValue instanceof JsonObject) {
            valueObj.add(Constant.CURRENT_VALUE, (currentValue as JsonObject));
        } else {
            valueObj.addProperty(Constant.CURRENT_VALUE, String(currentValue));
        }
    }

    let processedElements = new JsonArray();
    let mediatorSchemaElements = schema.getAsJsonArray(Constant.ELEMENTS);

    let isConnector = mediator instanceof Connector;


    if (this.isResponseModelAvailable(mediator.getTag())) {
        this.removeResultExpressionField(toolConfigSchema);
    }
    processedElements.add(toolConfigSchema);

    let mediatorConfigurationSchema = this.wrapMediatorSchema(mediatorSchemaElements, isConnector);
    processedElements.add(mediatorConfigurationSchema);
    schema.add(Constant.ELEMENTS, processedElements);

  }

  markValueExpectedFromAI(schema: JsonObject, template: Template): void {
    let elements = get(schema, Constant.ELEMENTS);
    if (elements != null && elements.isJsonArray()) {
        let elementsArray = elements.getAsJsonArray();
        let parameterDescriptionElements = new JsonArray();
        for (let childElement of elementsArray) {
            if (equals(Constant.ATTRIBUTE_GROUP, get(childElement.getAsJsonObject(), Constant.TYPE).getAsString())) {
                this.markValueExpectedFromAI(
                        childElement.getAsJsonObject().getAsJsonObject(Constant.VALUE).getAsJsonObject(), template);
            } else if (equals(Constant.ATTRIBUTE, get(childElement.getAsJsonObject(), Constant.TYPE).getAsString())) {
                this.markAIValueForAttributeElement(childElement);
            }
        }
        elementsArray.push(...parameterDescriptionElements);
    }

  }

  markAIValueForAttributeElement(childElement: JsonElement): void {
    let valueObj = childElement.getAsJsonObject().getAsJsonObject(Constant.VALUE);



    if (get(valueObj, Constant.CURRENT_VALUE) instanceof JsonObject &&
            get(valueObj.getAsJsonObject(Constant.CURRENT_VALUE), Constant.VALUE).getAsString()
                    .startsWith(AIConnectorHandler.FUNCTION_PARAM_PREFIX)) {

        let currentValue = new JsonObject();
        currentValue.addProperty(Constant.VALUE, AIConnectorHandler.FROM_AI);
        currentValue.addProperty(AIConnectorHandler.FROM_AI, true);
        currentValue.addProperty(Constant.IS_EXPRESSION, false);
        valueObj.add(Constant.CURRENT_VALUE, currentValue);
    }

  }

  isValidTool(stnode: STNode): boolean {
    if (!(stnode instanceof Template)) {
        return false;
    }
    let template = (stnode as Template);
    return template.getSequence() != null && template.getSequence().getMediatorList() != null &&
            !isEmpty(template.getSequence().getMediatorList());

  }

  getSequenceTemplateForTool(node: DOMNode): Template {
    let templateName = node.getAttribute(Constant.TEMPLATE);
    if (StringUtils.isNotEmpty(templateName)) {
        let templatePath = ConfigFinder.getTemplatePath(templateName, this.projectUri);
        if (StringUtils.isNotEmpty(templatePath)) {
            let document = Utils.getDOMDocumentFromPath(templatePath);
            if (document != null) {
                return (SyntaxTreeGenerator.buildTree(document.getDocumentElement()) as Template);
            }
        }
    }
    return null;

  }

  modifyAgentTool(documentUri: string, range: Range, mediator: string, data: Map<string, any>, dirtyFields: string[]): SynapseConfigResponse {
    let agentEditResponse = new SynapseConfigResponse();

    let document = Utils.getDOMDocument(new JFile(documentUri));


    let position = new Position(range.getStart().getLine(), range.getStart().getCharacter() + 1);
    let node = document.findNodeAt(document.offsetAt(position));
    if (node == null || !equals(Constant.TOOL, node.getNodeName())) {
        return null;
    }

    let isMCP = equals(AIConnectorHandler.MCP_MEDIATOR, mediator);

    let templateName = node.getAttribute(Constant.TEMPLATE);
    if (!isMCP && StringUtils.isEmpty(templateName)) {
        return null;
    }


    let needToolEdit = dirtyFields.some((x) => this.TOOL_EDIT_FIELDS.has(x)) ||
            data.has(Constant.RESPONSE_VARIABLE);
    if (needToolEdit) {
        if (data.has(AIConnectorHandler.MCP_TOOLS_SELECTION) && Array.isArray(get(data, AIConnectorHandler.MCP_TOOLS_SELECTION))) {

            let toolsNode = (node.getParentNode() as DOMNode);
            let targetConnection = node.getAttribute(Constant.MCP_CONNECTION);
            let updatedTools = (get(data, AIConnectorHandler.MCP_TOOLS_SELECTION) as Map<string, any>[]);

            let updatedToolsXml = this.buildUpdatedToolsXml(document, toolsNode, targetConnection, updatedTools);


            let toolsRange = createRange(toolsNode.getStart(), toolsNode.getEnd(), document);
            let edit = new DocumentTextEdit(toolsRange, updatedToolsXml, documentUri);
            agentEditResponse.addTextEdit(edit);

            let agentNode = toolsNode.getParentNode();
            let mcpEdit = this.ensureMcpConnectionExists(document, agentNode, targetConnection, documentUri);
            if (mcpEdit != null) {
                agentEditResponse.addTextEdit(mcpEdit);
            }
        } else {
            let toolData = this.processToolData(data, templateName);
            let writer = new StringWriter();
            data.set(AIConnectorHandler.IS_MCP, isMCP);
            let toolsEdit = String(this.mediatorHandler.getMustacheTemplate(Constant.TOOL).execute(writer, toolData));
            let toolsEditTextEdit = new DocumentTextEdit(range, toolsEdit, documentUri);
            agentEditResponse.addTextEdit(toolsEditTextEdit);
        }
    }

    let needTemplateEdit = !isMCP && dirtyFields.some(field => !this.TOOL_EDIT_FIELDS.has(field));

    if (!needTemplateEdit) {
        return agentEditResponse;
    }


    let sequenceTemplatePath = ConfigFinder.getTemplatePath(templateName, this.projectUri);
    if (StringUtils.isEmpty(sequenceTemplatePath) && Files.notExists(Path.of(sequenceTemplatePath))) {
        return agentEditResponse;
    }
    let sequenceTemplateDocument = Utils.getDOMDocumentFromPath(sequenceTemplatePath);
    let stNode = SyntaxTreeGenerator.buildTree(sequenceTemplateDocument.getDocumentElement());
    this.modifySequenceTemplate(stNode, data, dirtyFields, mediator, sequenceTemplatePath, agentEditResponse);
    return agentEditResponse;

  }

  buildUpdatedToolsXml(document: DOMDocument, toolsNode: DOMNode, targetConnection: string, updatedTools: Map<string, any>[]): string {
    let existingTools = this.extractExistingTools(document, toolsNode);
    let finalXMLs = [];
    let remaining = new Set<Map<string, any>>(updatedTools);

    for (let tool of existingTools) {
        if (equals(targetConnection, tool.connection)) {
            let matchedTool = this.findMCPToolByName(remaining, tool.name);
            if (matchedTool != null) {
                finalXMLs.push(tool.xml); 
                removeFrom(remaining, matchedTool);
            }
        } else {
            finalXMLs.push(tool.xml);
        }
    }


    for (let newTool of remaining) {
        let toolName = (get(newTool, Constant.NAME) as string);
        let toolDescription = ((newTool.get(Constant.DESCRIPTION) ?? StringUtils.EMPTY) as string);
        if (StringUtils.isNotEmpty(toolName)) {
            let newToolXml = this.createNewMCPToolXml(toolName, toolDescription, targetConnection);
            finalXMLs.push(newToolXml.replace(/\s+$/, ""));
        }
    }
    return this.generateToolsXmlFromStrings(finalXMLs);

  }

  findMCPToolByName(tools: Iterable<Map<string, any>>, name: string): Map<string, any> {
    for (let tool of tools) {
        if (tool.has(Constant.NAME) && equals(name, get(tool, Constant.NAME))) {
            return tool;
        }
    }
    return null;

  }

  ensureMcpConnectionExists(document: DOMDocument, agentNode: DOMNode, connectionName: string, documentUri: string): TextEdit {
    let mcpConnectionsNode = Utils.getChildNodeByName(agentNode, AIConnectorHandler.MCP_CONNECTIONS);

    if (mcpConnectionsNode != null) {
        if (this.hasMCPConnection(mcpConnectionsNode, connectionName)) {
            return null;
        }
        return this.insertMCPConnection(document, mcpConnectionsNode, connectionName, documentUri);
    }
    return this.insertNewMCPConnectionsBlock(document, agentNode, connectionName, documentUri);

  }

  insertMCPConnection(document: DOMDocument, mcpConnectionsNode: DOMNode, connectionName: string, documentUri: string): TextEdit {
    let endOffset = mcpConnectionsNode.getEnd();
    let documentText = document.getText();
    let closingTagStart = documentText.lastIndexOf("</mcpConnections>", endOffset);
    let insertPos = document.positionAt(closingTagStart);
    let insertRange = new Range(insertPos, insertPos);
    return new DocumentTextEdit(insertRange, this.renderMcpConfigKey(connectionName), documentUri);

  }

  insertNewMCPConnectionsBlock(document: DOMDocument, agentNode: DOMNode, connectionName: string, documentUri: string): TextEdit {
    let connectionsNode = Utils.getChildNodeByName(agentNode, AIConnectorHandler.CONNECTIONS);
    let insertOffset: number | undefined;
    if (connectionsNode != null) {
        insertOffset = connectionsNode.getEnd();
    } else {
        let agentStart = agentNode.getStart();
        let docText = document.getText();
        let tagCloseOffset = docText.indexOf(">", agentStart);
        insertOffset = tagCloseOffset + 1;
    }
    let insertPos = document.positionAt(insertOffset);
    let insertRange = new Range(insertPos, insertPos);
    let keyXml = this.renderMcpConfigKey(connectionName);
    return new DocumentTextEdit(insertRange, this.renderMcpConnectionsBlock([keyXml]), documentUri);

  }

  hasMCPConnection(mcpConnectionsNode: DOMNode, connectionName: string): boolean {
    for (let child of mcpConnectionsNode.getChildren()) {
        if (equals("mcpConfigKey", child.getNodeName()) && !isEmpty(child.getChildren())) {
            let value = child.getChild(0).getTextContent();
            if (equals(connectionName, value != null ? value.trim() : null)) {
                return true;
            }
        }
    }
    return false;

  }

  renderMcpConfigKey(connectionName: string): string {
    let context = new Map();
    context.set(AIConnectorHandler.MCP_CONNECTION, connectionName);
    let writer = new StringWriter();
    return String(this.mediatorHandler
            .getMustacheTemplate(AIConnectorHandler.MCP_CONNECTION)
            .execute(writer, context));

  }

  renderMcpConnectionsBlock(renderedKeys: string[]): string {
    let context = new Map();
    context.set(AIConnectorHandler.MCP_CONNECTIONS, renderedKeys);
    let writer = new StringWriter();
    return String(this.mediatorHandler
            .getMustacheTemplate(AIConnectorHandler.MCP_CONNECTIONS)
            .execute(writer, context));

  }

  modifySequenceTemplate(stNode: STNode, data: Map<string, any>, dirtyFields: string[], mediator: string, sequenceTemplatePath: string, agentEditResponse: SynapseConfigResponse): void {
    if (!this.isValidTool(stNode)) {
        return;
    }
    let template = (stNode as Template);
    let toolMediator = get(template.getSequence().getMediatorList(), 0);
    let toolMediatorRange = this.getSTNodeRange(toolMediator);

    let templateParameters = new Map();

    this.processAIValues(data, templateParameters);


    if (data.has(Constant.OVERWRITE_BODY)) data.set(Constant.OVERWRITE_BODY, false);

    let mediatorEdits =
            this.mediatorHandler.generateSynapseConfig(sequenceTemplatePath, toolMediatorRange, mediator, data,
                    dirtyFields);
    let templateXml = this.generateSequenceTemplate(mediatorEdits, templateParameters, template.getName(), data);

    let range = this.getSTNodeRange(template);
    range.setStart(new Position(0, 0));
    let sequenceTemplateEdit = new DocumentTextEdit(range, templateXml, sequenceTemplatePath);
    agentEditResponse.addTextEdit(sequenceTemplateEdit);


  }

  getSTNodeRange(stNode: STNode): Range {
    let startTagRange = stNode.getRange().startTagRange;
    let endTagRange = stNode.getRange().endTagRange;
    let start = startTagRange.start;
    let end = endTagRange != null ? endTagRange.end : startTagRange.end;
    return new Range(start, end);

  }

  async fetchMcpTools(documentUri: string, range: Range, connections: Connection[], connectionName: string): Promise<MCPToolResponse> {
       AIConnectorHandler.LOGGER.log(Level.INFO, "Fetching MCP tools for connection: " + connectionName);
       let response = new MCPToolResponse();
       try {
           let node = Utils.getDOMNode(documentUri, range.getStart());
           let existingToolsForConnection = this.getExistingToolsForConnection(node, connectionName);

           let connection = connections.find(c => equals(connectionName, c.name));
           if (connection === undefined) {
               throw new IllegalArgumentException("Connection not found: " + connectionName);
           }

           let serverUrl = null;
           let accessToken = null;
           let authenticationType = null;
           for (let param of connection.getParameters()) {
               if (equals(AIConnectorHandler.SERVER_URL, param.getName())) {
                   serverUrl = param.getValue();
               } else if (equals(AIConnectorHandler.ACCESS_TOKEN, param.getName())) {
                   accessToken = param.getValue();
               } else if (equals(AIConnectorHandler.AUTHENTICATION_TYPE, param.getName())) {
                   authenticationType = param.getValue();
               }
           }
           if (serverUrl == null) {
               response.error = "ServerUrl cannot be fetched from the connection parameters";
               return response;
           }
           if (!equalsIgnoreCase(AIConnectorHandler.NONE, authenticationType) && accessToken == null) {
               response.error = "AccessToken cannot be fetched from the connection parameters";
               return response;
           }

           let headers: Record<string, string> = {
               "Accept": "*/*",
               "Content-Type": "application/json",
           };
           if (!equalsIgnoreCase(AIConnectorHandler.NONE, authenticationType)) {
               headers["Authorization"] = "Bearer " + accessToken;
           }
           let httpResponse = await fetch(serverUrl, {
               method: "POST",
               headers,
               body: "{"
                       + "\"jsonrpc\":\"2.0\","
                       + "\"id\":1,"
                       + "\"method\":\"tools/list\""
                       + "}",
           });
           if (httpResponse.status != 200) {
               response.error = "Failed to fetch MCP tools. HTTP " + httpResponse.status;
               return response;
           }
           let body = await httpResponse.text();

           let dataBuffer = new StringBuilder();
           for (let line of body.split(/\r\n|\n|\r/)) {
               if (line.length == 0) {
                   break;
               }
               if (line.startsWith("data:")) {
                   dataBuffer.append(line.substring(5).trim());
               }
           }

           let responseJson = String(dataBuffer);
           // Jackson's readTree("") yields a missing node, which answers false to every has(...)
           let dataJson: any = responseJson.length == 0 ? {} : JSON.parse(responseJson);
           const has = (o: any, k: string): boolean => o !== null && typeof o === "object" && Object.prototype.hasOwnProperty.call(o, k);

           // Jackson JsonNode.asText(): the text of a value node, "" for containers
           const asText = (v: any): string => (v !== null && typeof v === "object") ? "" : String(v);
           if (has(dataJson, Constant.RESULT) && has(dataJson[Constant.RESULT], Constant.TOOLS)) {
               let tools = new Map();
               let toolsNode = dataJson[Constant.RESULT][Constant.TOOLS];
               if (!Array.isArray(toolsNode)) {
                   response.error = "Invalid MCP response: tools is not an array";
                   return response;
               }

               for (let toolNode of toolsNode) {
                   let toolName = has(toolNode, Constant.NAME) ? asText(toolNode[Constant.NAME]) : null;
                   if (toolName == null) {
                       continue;
                   }

                   let description = has(toolNode, Constant.DESCRIPTION)
                           ? asText(toolNode[Constant.DESCRIPTION])
                           : StringUtils.EMPTY;

                   tools.set(toolName, description);
               }

               response.tools = tools;

           } else if (has(dataJson, AIConnectorHandler.ERROR)) {
               response.error = JSON.stringify(dataJson[AIConnectorHandler.ERROR]);
           } else {
               response.error = "Unexpected MCP response";
           }
           response.selectedTools = existingToolsForConnection;
       } catch (e) {
           response.error = "Error occurred while connecting to the MCP Server";
       }

       return response;

  }
}
