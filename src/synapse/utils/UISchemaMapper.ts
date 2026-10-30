// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/utils/UISchemaMapper.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, contains, size, get, matches, removeFrom, entrySet, StringUtils } from "../../syntaxTree/javaCompat.js";
import { AIConnector } from "../../syntaxTree/pojo/connector/ai/AIConnector.js";
import { Connector } from "../../syntaxTree/pojo/connector/Connector.js";
import { ConnectorParameter } from "../../syntaxTree/pojo/connector/ConnectorParameter.js";
import { Constant } from "../../syntaxTree/constant.js";
import { Gson } from "../gson.js";
import { InboundEndpoint } from "../../syntaxTree/pojo/inbound/InboundEndpoint.js";
import { JsonArray } from "../gson.js";
import { JsonObject } from "../gson.js";
import { JsonPrimitive } from "../gson.js";
import { MediatorUtils } from "../mediatorService/MediatorUtils.js";
import { Pattern } from "../host/regex.js";
import { Utils } from "../../syntaxTree/utils.js";

export class UISchemaMapper {
  static readonly __fields: string[] = [];

  static mapInputToUISchema(data: JsonObject, uiSchema: JsonObject): JsonObject {
    let elements = uiSchema.getAsJsonArray("elements");
    UISchemaMapper.processElements(data, elements);
    UISchemaMapper.updateSchemaForEventIntegrations(uiSchema);
    return uiSchema;

  }

  static processElements(data: JsonObject, elements: JsonArray): void {
    for (let element of elements) {
        let elementObj = element.getAsJsonObject();
        let elementType = get(elementObj, "type").getAsString();
        if (equals(elementType, "attributeGroup")) {
            let groupValue = elementObj.getAsJsonObject("value");
            let groupElements = groupValue.getAsJsonArray("elements");
            UISchemaMapper.processElements(data, groupElements);
        } else {
            UISchemaMapper.processElement(data, elementObj);
        }
    }

  }

  static processElement(elementData: JsonObject, elementObj: JsonObject): void {
    let value = elementObj.getAsJsonObject("value");
    if (equals(get(elementObj, "type").getAsString(), "table")) {
        let tableName = get(value, "name").getAsString();
        if (elementData.has(tableName)) {
            let tableData: JsonArray | undefined;
            if (get(elementData, tableName).isJsonArray()) {
                tableData = elementData.getAsJsonArray(tableName);
            } else {
                tableData = UISchemaMapper.generateTableDataForConnector(get(elementData, tableName).getAsString());
            }
            value.add("currentValue", tableData);
        }
    } else {
        if (value.has("name")) {
            let attributeName = get(value, "name").getAsString();
            if (elementData.has(attributeName)) {
                let currentValue = get(elementData, attributeName);
                if (currentValue.isJsonPrimitive() && currentValue.getAsString().startsWith("'{") && currentValue.getAsString().endsWith("}'")) {
                    currentValue = new JsonPrimitive(
                            currentValue.getAsString().substring(1, currentValue.getAsString().length - 1));
                } else if (UISchemaMapper.isCheckBox(value)) {
                    currentValue = new JsonPrimitive(currentValue.getAsBoolean());
                } else if (currentValue.isJsonPrimitive()) {
                    let sanitizedValue = Utils.removeCDATATag(currentValue.getAsString());
                    currentValue = new JsonPrimitive(sanitizedValue);
                }
                value.add("currentValue", currentValue);
            }
        }
    }

  }

  static isCheckBox(value: JsonObject): boolean {
    if (value.has(Constant.INPUT_TYPE)) {
        return equals(Constant.CHECK_BOX, get(value, Constant.INPUT_TYPE).getAsString());
    }
    return false;

  }

  static generateTableDataForConnector(tableFieldCDATA: string): JsonArray {
    let tableFieldValue = Utils.removeCDATATag(tableFieldCDATA);
    let result = new JsonArray();
    let tableValues = Utils.getJsonArray(tableFieldValue);
    for (let tableValue of tableValues) {
        let fieldName = "";
        let fieldValue = "";
        if (tableValue instanceof JsonObject) {
            let entries =entrySet(((tableValue as JsonObject)));
            let entry = entries[0];
            fieldName = entry.getKey();
            let fieldValueElement = entry.getValue();
            if (fieldValueElement.isJsonPrimitive() && fieldValueElement.getAsJsonPrimitive().isString()) {
                fieldValue = fieldValueElement.getAsString();
            }
        } else if (tableValue instanceof JsonArray) {
            let tableValueArray = (tableValue as JsonArray);

            if (size(tableValueArray) == 2 && get(tableValueArray, 1).isJsonArray()) {

                let tableValueElement = get(tableValueArray, 0);
                fieldName = (tableValueElement != null && tableValueElement.isJsonPrimitive()) ?
                        tableValueElement.getAsString() : "";

                let nestedArray = get(tableValueArray, 1).getAsJsonArray();
                let transformedArray = UISchemaMapper.transformNestedArray(nestedArray);

                let tableDataRow = new JsonArray();
                tableDataRow.add(fieldName);
                tableDataRow.add(transformedArray);

                result.add(tableDataRow);
                continue;
            }

            if (size(tableValueArray) == 2) {
                fieldName = get(tableValueArray, 0).getAsString();
                fieldValue = get(tableValueArray, 1).getAsString();
            } else {

                let tableDataRow = new JsonArray();
                let rowInfo: JsonObject | undefined;

                for (let j = 0; j < size(tableValueArray); j++) {
                    fieldName = get(tableValueArray, j).getAsString();
                    if (j == 0) {
                        tableDataRow.add(fieldName);
                    } else {
                        rowInfo = new JsonObject();
                        fieldValue = get(tableValueArray, j).getAsString().trim();
                        rowInfo.add("isExpression", new JsonPrimitive(Utils.isExpression(fieldValue)));
                        rowInfo.add("value", new JsonPrimitive(fieldValue));
                        rowInfo.add("namespaces", new JsonArray());
                        tableDataRow.add(rowInfo);
                    }
                }
                result.add(tableDataRow);
                continue;
            }
        }
        if (StringUtils.isNotEmpty(fieldName)) {
            let tableDataRow = new JsonArray();
            let rowInfo = new JsonObject();

            rowInfo.add("isExpression", new JsonPrimitive(Utils.isExpression(fieldValue)));
            rowInfo.add("value", new JsonPrimitive(fieldValue));
            rowInfo.add("namespaces", new JsonArray());

            tableDataRow.push(fieldName);
            tableDataRow.push(rowInfo);
            tableDataRow.push(rowInfo);
            result.push(tableDataRow);
        }
    }
    return result;

  }

  static mapInputToUISchemaForConnector(connector: Connector, uiSchema: JsonObject): JsonObject {
    let data = new JsonObject();
    connector.getParameters().forEach(parameter => {
        let name = parameter.getName();
        if (parameter.getIsExpression()) {
            let expression = UISchemaMapper.getConnectorExpressionParam(parameter);
            data.add(name, expression);
        } else {
            data.addProperty(name, parameter.getValue());
        }
    });
    if (connector instanceof AIConnector) {
        UISchemaMapper.addAIConnectionsData(data, (connector as AIConnector));
    } else {
        data.addProperty(Constant.CONFIG_REF, connector.getConfigKey());
    }
    return UISchemaMapper.mapInputToUISchema(data, uiSchema);

  }

  static addAIConnectionsData(data: JsonObject, connector: AIConnector): void {
    let connectionMap = connector.getConnections();
    if (connectionMap == null && isEmpty(connectionMap)) {
        return;
    }
    for (let entry of entrySet(connectionMap)) {
        let fieldKey = get(new Map([...Constant.AI_CONNECTION_TO_DISPLAY_NAME_MAP].map(([k, v]) => [v, k])), entry.getKey());
        let connection = entry.getValue();
        if (fieldKey != null && connection != null) {
            data.addProperty(fieldKey, connection.getName());
        }
    }

  }

  static getConnectorExpressionParam(parameter: ConnectorParameter): JsonObject {
    let namespaces = MediatorUtils.transformNamespaces(parameter.getNamespaces());
    let namespacesJson = new Gson().toJsonTree(namespaces).getAsJsonArray();
    let expression = new JsonObject();
    let expressionValue = parameter.getExpression();
    let pattern = Pattern.compile("\\{.*}");
    if (expressionValue != null && pattern.matcher(expressionValue).matches()) {
        expressionValue = expressionValue.substring(1, expressionValue.length - 1);
    }
    expression.addProperty(Constant.VALUE, expressionValue);
    expression.add(Constant.NAMESPACES, namespacesJson);
    expression.addProperty(Constant.IS_EXPRESSION, true);
    return expression;

  }

  static mapInputToUISchemaForInboundEndpoint(ib: InboundEndpoint, uiSchema: JsonObject): JsonObject {
    let data = new JsonObject();
    data.addProperty(Constant.NAME, ib.getName());
    data.addProperty(Constant.SEQUENCE, ib.getSequence());
    data.addProperty(Constant.PROTOCOL, ib.getProtocol());
    data.addProperty(Constant.CLASS, ib.getClazz());
    data.addProperty(Constant.ON_ERROR, ib.getOnError());
    data.addProperty(Constant.SUSPEND, ib.isSuspend());
    data.addProperty(Constant.STATISTICS, ib.getStatistics() != null ? String(ib.getStatistics()) : null);
    data.addProperty(Constant.TRACE, ib.getTrace() != null ? String(ib.getTrace()) : null);
    let parametersList = ib.getParameters();
    if (parametersList != null) {
        let parameters = parametersList[0];
        if (parameters != null) {
            let parametersArray = parameters.getParameter();
            if (parametersArray != null) {
                for (let i = 0; i < parametersArray.length; i++) {
                    let parameter = parametersArray[i];
                    data.addProperty(parameter.getName(), parameter.getContent());
                }
            }
        }
    }
    return UISchemaMapper.mapInputToUISchema(data, uiSchema);

  }

  static updateSchemaForEventIntegrations(schema: JsonObject): void {
    let inboundEndpointTypes = [Constant.INBUILT_INBOUND_ENDPOINT, Constant.EVENT_INTEGRATION];
    if (!schema.has(Constant.TYPE) || !contains(inboundEndpointTypes, get(schema, Constant.TYPE).getAsString())) {
        return;
    }

    let groups = schema.getAsJsonArray(Constant.ELEMENTS);

    for (let groupElem of groups) {
        let groupObj = groupElem.getAsJsonObject();
        let groupValue = groupObj.getAsJsonObject(Constant.VALUE);
        if (!equals(Constant.GENERIC, get(groupValue, Constant.GROUP_NAME).getAsString())) {
            continue;
        }

        let attributes = groupValue.getAsJsonArray(Constant.ELEMENTS);
        for (let attrElem of attributes) {
            let attrObj = attrElem.getAsJsonObject();
            if (!equals(Constant.ATTRIBUTE, get(attrObj, Constant.TYPE).getAsString())) {
                continue;
            }

            let value = attrObj.getAsJsonObject(Constant.VALUE);
            if (equals(Constant.SEQUENCE, get(value, Constant.NAME).getAsString())) {
                removeFrom(value, Constant.ENABLE_CONDITION);
            }
            if (equals(Constant.ON_ERROR, get(value, Constant.NAME).getAsString())) {
                removeFrom(value, Constant.ENABLE_CONDITION);
            }
            if (equals(Constant.GENERATE_SEQUENCES, get(value, Constant.NAME).getAsString())) {
                value.addProperty(Constant.CURRENT_VALUE, false);
                value.addProperty(Constant.HIDDEN, true);
            }
        }
    }

  }

  static transformNestedArray(array: JsonArray): JsonArray {
    let transformed = new JsonArray();

    for (let element of array) {
        if (element == null || element.isJsonNull()) {
            transformed.push(new JsonArray());
            continue;
        }

        if (element.isJsonArray()) {
            transformed.push(UISchemaMapper.transformNestedArray(element.getAsJsonArray()));
        } else {
            let singleValueArray = new JsonArray();
            singleValueArray.push(element.isJsonPrimitive() ? element.getAsString() : String(element));
            transformed.push(singleValueArray);
        }
    }
    return transformed;

  }
}
