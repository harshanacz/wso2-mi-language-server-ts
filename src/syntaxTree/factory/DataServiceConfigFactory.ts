// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/DataServiceConfigFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, size, get, parseBoolean } from "../javaCompat.js";
import { AbstractFactory } from "./AbstractFactory.js";
import { Attribute } from "../pojo/dataservice/Attribute.js";
import { AuthorizationProvider } from "../pojo/dataservice/AuthorizationProvider.js";
import { AuthorizationProviderProperty } from "../pojo/dataservice/AuthorizationProviderProperty.js";
import { CallQuery } from "../pojo/dataservice/CallQuery.js";
import { CallQueryWithParam } from "../pojo/dataservice/CallQueryWithParam.js";
import { Config } from "../pojo/dataservice/Config.js";
import { Constant } from "../constant.js";
import { DOMElement } from "../dom/dom.js";
import { DOMNode } from "../dom/dom.js";
import { Data } from "../pojo/dataservice/Data.js";
import { DataPolicy } from "../pojo/dataservice/DataPolicy.js";
import { Element } from "../pojo/dataservice/Element.js";
import { EventTrigger } from "../pojo/dataservice/EventTrigger.js";
import { EventTriggerSubscriptions } from "../pojo/dataservice/EventTriggerSubscriptions.js";
import { Expression } from "../pojo/dataservice/Expression.js";
import { Operation } from "../pojo/dataservice/Operation.js";
import { Param } from "../pojo/dataservice/Param.js";
import { ParamElements } from "../pojo/dataservice/ParamElements.js";
import { ParamValidateCustom } from "../pojo/dataservice/ParamValidateCustom.js";
import { ParamValidateDoubleRange } from "../pojo/dataservice/ParamValidateDoubleRange.js";
import { ParamValidateLength } from "../pojo/dataservice/ParamValidateLength.js";
import { ParamValidateLongRange } from "../pojo/dataservice/ParamValidateLongRange.js";
import { ParamValidatePattern } from "../pojo/dataservice/ParamValidatePattern.js";
import { Property } from "../pojo/dataservice/Property.js";
import { PropertyConfiguration } from "../pojo/dataservice/PropertyConfiguration.js";
import { PropertyConfigurationEntry } from "../pojo/dataservice/PropertyConfigurationEntry.js";
import { PropertyProperty } from "../pojo/dataservice/PropertyProperty.js";
import { Query } from "../pojo/dataservice/Query.js";
import { QueryProperties } from "../pojo/dataservice/QueryProperties.js";
import { Resource } from "../pojo/dataservice/Resource.js";
import { Result } from "../pojo/dataservice/Result.js";
import { ResultElements } from "../pojo/dataservice/ResultElements.js";
import { STNode } from "../stNode.js";
import { Sparql } from "../pojo/dataservice/Sparql.js";
import { Sql } from "../pojo/dataservice/Sql.js";
import { Utils } from "../utils.js";

export class DataServiceConfigFactory extends AbstractFactory {
  static readonly SECRET_ALIAS_NS: string = "http://org.wso2.securevault/configuration";

  create(element: DOMElement): STNode {
    let dataService = new Data();
    dataService.elementNode(element);
    this.populateAttributes(dataService, element);

    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.DESCRIPTION, childName)) {
                let description = new STNode();
                description.elementNode((child as DOMElement));
                dataService.setDescription(description);
            } else if (equalsIgnoreCase(Constant.CONFIG, childName)) {
                let config = this.createConfig(child);
                dataService.addConfig(config);
            } else if (equalsIgnoreCase(Constant.QUERY, childName)) {
                let query = this.createQuery(child);
                dataService.addQuery(query);
            } else if (equalsIgnoreCase(Constant.OPERATION, childName)) {
                let operation = this.createOperation(child);
                dataService.addOperation(operation);
            } else if (equalsIgnoreCase(Constant.RESOURCE, childName)) {
                let resource = this.createResource(child);
                dataService.addResource(resource);
            } else if (equalsIgnoreCase(Constant.POLICY, childName)) {
                let policy = this.createPolicy(child);
                dataService.setPolicy(policy);
            } else if (equalsIgnoreCase(Constant.EVENT_TRIGGER, childName)) {
                let eventTrigger = this.createEventTrigger(child);
                dataService.addEventTrigger(eventTrigger);
            } else if (equalsIgnoreCase(Constant.ENABLE_SEC, childName)) {
                let enableSec = new STNode();
                enableSec.elementNode((child as DOMElement));
                dataService.setEnableSec(enableSec);
            } else if (equalsIgnoreCase(Constant.AUTHORIZATION_PROVIDER, childName)) {
                let authorizationProvider = this.createAuthorizationProvider(child);
                dataService.setAuthorizationProvider(authorizationProvider);
            }
        }
    }
    return dataService;

  }

  createConfig(element: DOMNode): Config {
    let config = new Config();
    config.elementNode((element as DOMElement));
    let id = element.getAttribute(Constant.ID);
    if (id != null) {
        config.setId(id);
    }
    let enableOData = element.getAttribute(Constant.ENABLE_ODATA);
    if (enableOData != null) {
        config.setEnableOData(parseBoolean(enableOData));
    }
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let propertyList = [];
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.PROPERTY, childName)) {
                let property = this.createProperty(child);
                propertyList.push(property);
            }
        }
        config.setProperty(propertyList.slice());
    }
    return config;

  }

  createQuery(element: DOMNode): Query {
    let query = new Query();
    query.elementNode((element as DOMElement));
    let id = element.getAttribute(Constant.ID);
    if (id != null) {
        query.setId(id);
    }
    let useConfig = element.getAttribute(Constant.USE_CONFIG);
    if (useConfig != null) {
        query.setUseConfig(useConfig);
    }
    let returnGeneratedKeys = element.getAttribute(Constant.RETURN_GENERATED_KEYS);
    if (returnGeneratedKeys != null) {
        query.setReturnGeneratedKeys(parseBoolean(returnGeneratedKeys));
    }
    let inputEventTrigger = element.getAttribute(Constant.INPUT_EVENT_TRIGGER);
    if (inputEventTrigger != null) {
        query.setInputEventTrigger(inputEventTrigger);
    }
    let keyColumns = element.getAttribute(Constant.KEY_COLUMNS);
    if (keyColumns != null) {
        query.setKeyColumns(keyColumns);
    }
    let returnUpdatedRowCount = element.getAttribute(Constant.RETURN_UPDATED_ROW_COUNT);
    if (returnUpdatedRowCount != null) {
        query.setReturnUpdatedRowCount(returnUpdatedRowCount);
    }

    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let queryParamList = [];
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.SQL, childName)) {
                let sql = this.createSql(child);
                query.setSql(sql);
            } else if (equalsIgnoreCase(Constant.EXPRESSION, childName)) {
                let expression = this.createExpression(child);
                query.setExpression(expression);
            } else if (equalsIgnoreCase(Constant.SPARQL, childName)) {
                let sparql = this.createSparql(child);
                query.setSparql(sparql);
            } else if (equalsIgnoreCase(Constant.PROPERTIES, childName)) {
                let properties = this.createQueryProperties(child);
                query.setProperties(properties);
            } else if (equalsIgnoreCase(Constant.RESULT, childName)) {
                let queryResult = this.createQueryResult(child);
                query.setResult(queryResult);
            } else if (equalsIgnoreCase(Constant.PARAM, childName)) {
                let param = this.createParam(child);
                queryParamList.push(param);
            }
        }
        query.setParams(queryParamList.slice());
    }
    return query;

  }

  createSql(element: DOMNode): Sql {
    let sql = new Sql();
    sql.elementNode((element as DOMElement));
    let dialect = element.getAttribute(Constant.DIALECT);
    if (dialect != null) {
        sql.setDialect(dialect);
    }
    let child = element.getFirstChild();
    let value = Utils.getInlineString(child);
    if (value != null) {
        sql.setValue(value);
    }
    return sql;

  }

  createExpression(element: DOMNode): Expression {
    let expression = new Expression();
    expression.elementNode((element as DOMElement));
    let dialect = element.getAttribute(Constant.DIALECT);
    if (dialect != null) {
        expression.setDialect(dialect);
    }
    let child = element.getFirstChild();
    let value = Utils.getInlineString(child);
    if (value != null) {
        expression.setValue(value);
    }
    return expression;

  }

  createSparql(element: DOMNode): Sparql {
    let sparql = new Sparql();
    sparql.elementNode((element as DOMElement));
    let child = element.getFirstChild();
    let value = Utils.getInlineString(child);
    if (value != null) {
        sparql.setValue(value);
    }
    return sparql;

  }

  createQueryProperties(element: DOMNode): QueryProperties {
    let properties = new QueryProperties();
    properties.elementNode((element as DOMElement));
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let propertyList = [];
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.PROPERTY, childName)) {
                let property = this.createProperty(child);
                property.elementNode((child as DOMElement));
                propertyList.push(property);
            }
        }
        properties.setProperty(propertyList.slice());
    }
    return properties;

  }

  createProperty(element: DOMNode): Property {
    let property = new Property();
    property.elementNode((element as DOMElement));
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        property.setName(name);
    }
    if (((element as DOMElement)).hasAttributeNS(DataServiceConfigFactory.SECRET_ALIAS_NS, "secretAlias")) {
        let secretAlias = ((element as DOMElement)).getAttributeNS(DataServiceConfigFactory.SECRET_ALIAS_NS, "secretAlias");
        property.setTextNode(secretAlias);
    }
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let propertyList = [];
        let configurationList = [];
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.CONFIGURATION, childName)) {
                let configuration = this.createPropertyConfiguration(child);
                configurationList.push(configuration);
            } else if (equalsIgnoreCase(Constant.PROPERTY, childName)) {
                let propertyProperty = this.createPropertyProperty(child);
                propertyList.push(propertyProperty);
            }
        }
        property.setProperty(propertyList.slice());
        property.setConfiguration(configurationList.slice());
    }
    return property;

  }

  createPropertyConfiguration(element: DOMNode): PropertyConfiguration {
    let configuration = new PropertyConfiguration();
    configuration.elementNode((element as DOMElement));

    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let entryList = [];
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.ENTRY, childName)) {
                let entry = this.createPropertyConfigurationEntry(child);
                entryList.push(entry);
            }
        }
        configuration.setEntry(entryList.slice());
    }
    return configuration;

  }

  createPropertyConfigurationEntry(element: DOMNode): PropertyConfigurationEntry {
    let entry = new PropertyConfigurationEntry();
    entry.elementNode((element as DOMElement));
    let request = element.getAttribute(Constant.REQUEST);
    if (request != null) {
        entry.setRequest(request);
    }
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.USERNAME, childName)) {
                let username = new STNode();
                username.elementNode((child as DOMElement));
                entry.setUsername(username);
            } else if (equalsIgnoreCase(Constant.PASSWORD, childName)) {
                let password = new STNode();
                password.elementNode((child as DOMElement));
                entry.setPassword(password);
            }
        }
    }
    return entry;

  }

  createPropertyProperty(element: DOMNode): PropertyProperty {
    let propertyProperty = new PropertyProperty();
    propertyProperty.elementNode((element as DOMElement));
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        propertyProperty.setName(name);
    }
    let child = element.getFirstChild();
    let value = Utils.getInlineString(child);
    if (value != null) {
        propertyProperty.setValue(value);
    }
    return propertyProperty;

  }

  createQueryResult(node: DOMNode): Result {
    let result = new Result();
    result.elementNode((node as DOMElement));

    let elementName = node.getAttribute(Constant.ELEMENT);
    if (elementName != null) {
        result.setElement(elementName);
    }
    let rowName = node.getAttribute(Constant.ROW_NAME);
    if (rowName != null) {
        result.setRowName(rowName);
    }
    let defaultNamespace = node.getAttribute(Constant.DEFAULT_NAMESPACE);
    if (defaultNamespace != null) {
        result.setDefaultNamespace(defaultNamespace);
    }

    let useColumnNumbers = node.getAttribute(Constant.USE_COLUMN_NUMBERS);
    if (useColumnNumbers != null) {
        result.setUseColumnNumbers(parseBoolean(useColumnNumbers));
    }

    let escapeNonPrintableChar = node.getAttribute(Constant.ESCAPE_NON_PRINTABLE_CHAR);
    if (escapeNonPrintableChar != null) {
        result.setEscapeNonPrintableChar(parseBoolean(escapeNonPrintableChar));
    }

    let xsltPath = node.getAttribute(Constant.XSLT_PATH);
    if (xsltPath != null) {
        result.setXsltPath(xsltPath);
    }

    let rdfBaseURI = node.getAttribute(Constant.RDF_BASE_URI);
    if (rdfBaseURI != null) {
        result.setRdfBaseURI(rdfBaseURI);
    }

    let outputType = node.getAttribute(Constant.OUTPUT_TYPE);
    if (outputType != null) {
        result.setOutputType(outputType);
    }

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.ELEMENT, childName)) {
                let element = this.createElement(child);
                result.addElement(element);
            } else if (equalsIgnoreCase(Constant.ATTRIBUTE, childName)) {
                let attribute = this.createAttribute(child);
                result.addAttribute(attribute);
            } else if (equalsIgnoreCase(Constant.CALL_QUERY, childName)) {
                let callQuery = this.createCallQuery(child);
                result.addCallQuery(callQuery);
            }
        }
    }

    return result;

  }

  createResultElements(node: DOMNode): ResultElements[] {
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        let resultElements = [];
        for (let child of children) {
            let resultElement = new ResultElements();
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.ELEMENT, childName)) {
                let element = this.createElement(child);
                resultElement.setElement((element));
            } else if (equalsIgnoreCase(Constant.ATTRIBUTE, childName)) {
                let attribute = this.createAttribute(child);
                resultElement.setAttribute((attribute));
            } else if (equalsIgnoreCase(Constant.CALL_QUERY, childName)) {
                let callQuery = this.createCallQuery(child);
                resultElement.setCall_query((callQuery));
            }
            resultElements.push(resultElement);
        }
        return resultElements;
    }
    return null;

  }

  createElement(node: DOMNode): Element {
    let element = new Element();
    element.elementNode((node as DOMElement));

    this.populateElementAttributes(element, node);

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        let inlineXml = "";
        for (let i = 0; i < size(children); i++) {
            let child = get(children, i);
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.ELEMENT, childName)) {
                let resultElement = this.createElement(child);
                element.addElement(resultElement);
            } else if (equalsIgnoreCase(Constant.ATTRIBUTE, childName)) {
                let attribute = this.createAttribute(child);
                element.addAttribute(attribute);
            } else if (equalsIgnoreCase(Constant.CALL_QUERY, childName)) {
                let callQuery = this.createCallQuery(child);
                element.addCallQuery(callQuery);
            }
            inlineXml += Utils.getInlineString(child, false);
            if (i != size(children) - 1) {
                inlineXml += "\n";
            }
        }
        element.setInlineXml(inlineXml);
    }
    return element;

  }

  populateElementAttributes(element: Element, node: DOMNode): void {
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        element.setName(name);
    }
    let column = node.getAttribute(Constant.COLUMN);
    if (column != null) {
        element.setColumn(column);
    }
    let requiredRoles = node.getAttribute(Constant.REQUIRED_ROLES);
    if (requiredRoles != null) {
        element.setRequiredRoles(requiredRoles);
    }
    let export_ = node.getAttribute(Constant.EXPORT);
    if (export_ != null) {
        element.setExport(export_);
    }
    let exportType = node.getAttribute(Constant.EXPORT_TYPE);
    if (exportType != null) {
        element.setExportType(exportType);
    }
    let xsdType = node.getAttribute(Constant.XSD_TYPE);
    if (xsdType != null) {
        element.setXsdType(xsdType);
    }
    let namespace = node.getAttribute(Constant.NAMESPACE);
    if (namespace != null) {
        element.setNamespace(namespace);
    }
    let optional = node.getAttribute(Constant.OPTIONAL);
    if (optional != null) {
        element.setOptional(parseBoolean(optional));
    }
    let arrayName = node.getAttribute(Constant.ARRAY_NAME);
    if (arrayName != null) {
        element.setArrayName(arrayName);
    }
    let queryParam = node.getAttribute(Constant.QUERY_PARAM);
    if (queryParam != null) {
        element.setQueryParam(queryParam);
    }

  }

  createAttribute(node: DOMNode): Attribute {
    let attribute = new Attribute();
    attribute.elementNode((node as DOMElement));
    this.populateAttributeAttributes(attribute, node);
    return attribute;

  }

  populateAttributeAttributes(attribute: Attribute, node: DOMNode): void {
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        attribute.setName(name);
    }
    let column = node.getAttribute(Constant.COLUMN);
    if (column != null) {
        attribute.setColumn(column);
    }
    let requiredRoles = node.getAttribute(Constant.REQUIRED_ROLES);
    if (requiredRoles != null) {
        attribute.setRequiredRoles(requiredRoles);
    }
    let export_ = node.getAttribute(Constant.EXPORT);
    if (export_ != null) {
        attribute.setExport(export_);
    }
    let exportType = node.getAttribute(Constant.EXPORT_TYPE);
    if (exportType != null) {
        attribute.setExportType(exportType);
    }
    let xsdType = node.getAttribute(Constant.XSD_TYPE);
    if (xsdType != null) {
        attribute.setXsdType(xsdType);
    }
    let namespace = node.getAttribute(Constant.NAMESPACE);
    if (namespace != null) {
        attribute.setNamespace(namespace);
    }
    let optional = node.getAttribute(Constant.OPTIONAL);
    if (optional != null) {
        attribute.setOptional(parseBoolean(optional));
    }
    let arrayName = node.getAttribute(Constant.ARRAY_NAME);
    if (arrayName != null) {
        attribute.setArrayName(arrayName);
    }
    let queryParam = node.getAttribute(Constant.QUERY_PARAM);
    if (queryParam != null) {
        attribute.setQueryParam(queryParam);
    }

  }

  createParam(element: DOMNode): Param {
    let param = new Param();
    param.elementNode((element as DOMElement));
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        param.setName(name);
    }
    let sqlType = element.getAttribute(Constant.SQL_TYPE);
    if (sqlType != null) {
        param.setSqlType(sqlType);
    }
    let paramType = element.getAttribute(Constant.PARAM_TYPE);
    if (paramType != null) {
        param.setParamType(paramType);
    }
    let type = element.getAttribute(Constant.TYPE);
    if (type != null) {
        param.setType(type);
    }
    let ordinal = element.getAttribute(Constant.ORDINAL);
    if (ordinal != null) {
        param.setOrdinal(Utils.parseInt(ordinal));
    }
    let defaultValue = element.getAttribute(Constant.DEFAULT_VALUE);
    if (defaultValue != null) {
        param.setDefaultValue(defaultValue);
    }
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let elementList = [];
        for (let child of children) {
            let childName = child.getNodeName();
            let paramElements = new ParamElements();
            if (equalsIgnoreCase(Constant.VALIDATE_CUSTOM, childName)) {
                let validateCustom = this.createParamValidateCustom(child);
                paramElements.setValidateCustom((validateCustom));
            } else if (equalsIgnoreCase(Constant.VALIDATE_LENGTH, childName)) {
                let validateLength = this.createParamValidateLength(child);
                paramElements.setValidateLength((validateLength));
            } else if (equalsIgnoreCase(Constant.VALIDATE_PATTERN, childName)) {
                let validatePattern = this.createParamValidatePattern(child);
                paramElements.setValidatePattern((validatePattern));
            } else if (equalsIgnoreCase(Constant.VALIDATE_LONG_RANGE, childName)) {
                let validateLongRange = this.createParamValidateLongRange(child);
                paramElements.setValidateLongRange((validateLongRange));
            } else if (equalsIgnoreCase(Constant.VALIDATE_DOUBLE_RANGE, childName)) {
                let validateDoubleRange = this.createParamValidateDoubleRange(child);
                paramElements.setValidateDoubleRange((validateDoubleRange));
            }
            elementList.push(paramElements);
        }
        param.setParamElements(elementList.slice());
    }
    return param;

  }

  createParamValidateCustom(element: DOMNode): ParamValidateCustom {
    let validateCustom = new ParamValidateCustom();
    validateCustom.elementNode((element as DOMElement));
    let className = element.getAttribute(Constant.CLASS);
    if (className != null) {
        validateCustom.setClazz(className);
    }
    return validateCustom;

  }

  createParamValidateLength(element: DOMNode): ParamValidateLength {
    let validateLength = new ParamValidateLength();
    validateLength.elementNode((element as DOMElement));
    let minimum = element.getAttribute(Constant.MINIMUM);
    if (minimum != null) {
        validateLength.setMinimum(Utils.parseInt(minimum));
    }
    let maximum = element.getAttribute(Constant.MAXIMUM);
    if (maximum != null) {
        validateLength.setMaximum(Utils.parseInt(maximum));
    }
    return validateLength;

  }

  createParamValidatePattern(element: DOMNode): ParamValidatePattern {
    let validatePattern = new ParamValidatePattern();
    validatePattern.elementNode((element as DOMElement));
    let pattern = element.getAttribute(Constant.PATTERN);
    if (pattern != null) {
        validatePattern.setPattern(pattern);
    }
    return validatePattern;

  }

  createParamValidateLongRange(element: DOMNode): ParamValidateLongRange {
    let validateLongRange = new ParamValidateLongRange();
    validateLongRange.elementNode((element as DOMElement));
    let minimum = element.getAttribute(Constant.MINIMUM);
    if (minimum != null) {
        validateLongRange.setMinimum(Utils.parseInt(minimum));
    }
    let maximum = element.getAttribute(Constant.MAXIMUM);
    if (maximum != null) {
        validateLongRange.setMaximum(Utils.parseInt(maximum));
    }
    return validateLongRange;

  }

  createParamValidateDoubleRange(element: DOMNode): ParamValidateDoubleRange {
    let validateDoubleRange = new ParamValidateDoubleRange();
    validateDoubleRange.elementNode((element as DOMElement));
    let minimum = element.getAttribute(Constant.MINIMUM);
    if (minimum != null) {
        validateDoubleRange.setMinimum(Utils.parseInt(minimum));
    }
    let maximum = element.getAttribute(Constant.MAXIMUM);
    if (maximum != null) {
        validateDoubleRange.setMaximum(Utils.parseInt(maximum));
    }
    return validateDoubleRange;

  }

  createOperation(element: DOMNode): Operation {
    let operation = new Operation();
    operation.elementNode((element as DOMElement));
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        operation.setName(name);
    }
    let disableStreaming = element.getAttribute(Constant.DISABLE_STREAMING);
    if (disableStreaming != null) {
        operation.setDisableStreaming(parseBoolean(disableStreaming));
    }
    let returnRequestStatus = element.getAttribute(Constant.RETURN_REQUEST_STATUS);
    if (returnRequestStatus != null) {
        operation.setReturnRequestStatus(parseBoolean(returnRequestStatus));
    }
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.DESCRIPTION, childName)) {
                let description = new STNode();
                description.elementNode((child as DOMElement));
                operation.setDescription(description);
            } else if (equalsIgnoreCase(Constant.CALL_QUERY, childName)) {
                let callQuery = this.createCallQuery(child);
                operation.setCallQuery(callQuery);
            }
        }
    }
    return operation;

  }

  createResource(element: DOMNode): Resource {
    let resource = new Resource();
    resource.elementNode((element as DOMElement));
    let path = element.getAttribute(Constant.PATH);
    if (path != null) {
        resource.setPath(path);
    }
    let method = element.getAttribute(Constant.METHOD);
    if (method != null) {
        resource.setMethod(method);
    }
    let disableStreaming = element.getAttribute(Constant.DISABLE_STREAMING);
    if (disableStreaming != null) {
        resource.setDisableStreaming(parseBoolean(disableStreaming));
    }
    let returnRequestStatus = element.getAttribute(Constant.RETURN_REQUEST_STATUS);
    if (returnRequestStatus != null) {
        resource.setReturnRequestStatus(parseBoolean(returnRequestStatus));
    }
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.DESCRIPTION, childName)) {
                let description = new STNode();
                description.elementNode((child as DOMElement));
                resource.setDescription(description);
            } else if (equalsIgnoreCase(Constant.CALL_QUERY, childName)) {
                let callQuery = this.createCallQuery(child);
                resource.setCallQuery(callQuery);
            }
        }
    }
    return resource;

  }

  createCallQuery(element: DOMNode): CallQuery {
    let callQuery = new CallQuery();
    callQuery.elementNode((element as DOMElement));
    let href = element.getAttribute(Constant.HREF);
    if (href != null) {
        callQuery.setHref(href);
    }
    let requiredRoles = element.getAttribute(Constant.REQUIRED_ROLES);
    if (requiredRoles != null) {
        callQuery.setRequiredRoles(requiredRoles);
    }
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let withParamList = [];
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.WITH_PARAM, childName)) {
                let withParam = this.createCallQueryWithParam(child);
                withParamList.push(withParam);
            }
        }
        callQuery.setWithParam(withParamList.slice());
    }
    return callQuery;

  }

  createCallQueryWithParam(element: DOMNode): CallQueryWithParam {
    let withParam = new CallQueryWithParam();
    withParam.elementNode((element as DOMElement));
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        withParam.setName(name);
    }
    let query_param = element.getAttribute(Constant.QUERY_PARAM);
    if (query_param != null) {
        withParam.setQueryParam(query_param);
    }
    let column = element.getAttribute(Constant.COLUMN);
    if (column != null) {
        withParam.setColumn(column);
    }
    let param = element.getAttribute(Constant.PARAM);
    if (param != null) {
        withParam.setParam(param);
    }
    return withParam;

  }

  createPolicy(element: DOMNode): DataPolicy {
    let policy = new DataPolicy();
    policy.elementNode((element as DOMElement));
    let key = element.getAttribute(Constant.KEY);
    if (key != null) {
        policy.setKey(key);
    }
    return policy;

  }

  createEventTrigger(element: DOMNode): EventTrigger {
    let eventTrigger = new EventTrigger();
    eventTrigger.elementNode((element as DOMElement));
    let id = element.getAttribute(Constant.ID);
    if (id != null) {
        eventTrigger.setId(id);
    }
    let language = element.getAttribute(Constant.LANGUAGE);
    if (language != null) {
        eventTrigger.setLanguage(language);
    }
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let eventTriggerElements = [];
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.EXPRESSION, childName)) {
                let expression = new STNode();
                expression.elementNode((child as DOMElement));
                eventTriggerElements.push(expression);
            } else if (equalsIgnoreCase(Constant.TARGET_TOPIC, childName)) {
                let targetTopic = new STNode();
                targetTopic.elementNode((child as DOMElement));
                eventTriggerElements.push(targetTopic);
            } else if (equalsIgnoreCase(Constant.SUBSCRIPTIONS, childName)) {
                let subscriptions = this.createEventTriggerSubscriptions(child);
                eventTriggerElements.push(subscriptions);
            }
        }
        eventTrigger.setEventTriggerElements(eventTriggerElements);
    }
    return eventTrigger;

  }

  createEventTriggerSubscriptions(element: DOMNode): EventTriggerSubscriptions {
    let subscriptions = new EventTriggerSubscriptions();
    subscriptions.elementNode((element as DOMElement));
    let child = element.getFirstChild();
    if (child != null && child instanceof DOMElement) {
        let subscription = new STNode();
        subscription.elementNode((child as DOMElement));
        subscriptions.setSubscription(subscription);
    }
    return subscriptions;

  }

  createAuthorizationProvider(element: DOMNode): AuthorizationProvider {
    let authorizationProvider = new AuthorizationProvider();
    authorizationProvider.elementNode((element as DOMElement));
    let clazz = element.getAttribute(Constant.CLASS);
    if (clazz != null) {
        authorizationProvider.setClazz(clazz);
    }
    let children = element.getChildren();
    if (children != null) {
        let properties = [];
        for (let child of children) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.PROPERTY, childName)) {
                let property = this.createAuthorizationProviderProperty(child);
                properties.push(property);
            }
        }
        authorizationProvider.setProperty(properties.slice());
    }
    return authorizationProvider;

  }

  createAuthorizationProviderProperty(element: DOMNode): AuthorizationProviderProperty {
    let property = new AuthorizationProviderProperty();
    property.elementNode((element as DOMElement));
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        property.setName(name);
    }
    let child = element.getFirstChild();
    let value = Utils.getInlineString(child);
    if (value != null) {
        property.setValue(value);
    }
    return property;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let baseURI = element.getAttribute(Constant.BASE_URI);
    if (baseURI != null) {
        ((node as Data)).setBaseURI(baseURI);
    }
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        ((node as Data)).setName(name);
    }
    let enableBatchRequests = element.getAttribute(Constant.ENABLE_BATCH_REQUESTS);
    if (enableBatchRequests != null) {
        ((node as Data)).setEnableBatchRequests(parseBoolean(enableBatchRequests));
    }
    let enableBoxcarring = element.getAttribute(Constant.ENABLE_BOXCARRING);
    if (enableBoxcarring != null) {
        ((node as Data)).setEnableBoxcarring(parseBoolean(enableBoxcarring));
    }
    let disableLegacyBoxcarringMode = element.getAttribute(Constant.DISABLE_LEGACY_BOXCARRING_MODE);
    if (disableLegacyBoxcarringMode != null) {
        ((node as Data)).setDisableLegacyBoxcarringMode(parseBoolean(disableLegacyBoxcarringMode));
    }
    let disableStreaming = element.getAttribute(Constant.DISABLE_STREAMING);
    if (disableStreaming != null) {
        ((node as Data)).setDisableStreaming(parseBoolean(disableStreaming));
    }
    let txManagerJNDIName = element.getAttribute(Constant.TX_MANAGER_JNDI_NAME);
    if (txManagerJNDIName != null) {
        ((node as Data)).setTxManagerJNDIName(txManagerJNDIName);
    }
    let serviceNamespace = element.getAttribute(Constant.SERVICE_NAMESPACE);
    if (serviceNamespace != null) {
        ((node as Data)).setServiceNamespace(serviceNamespace);
    }
    let serviceGroup = element.getAttribute(Constant.SERVICE_GROUP);
    if (serviceGroup != null) {
        ((node as Data)).setServiceGroup(serviceGroup);
    }
    let publishSwagger = element.getAttribute(Constant.PUBLISH_SWAGGER);
    if (publishSwagger != null) {
        ((node as Data)).setPublishSwagger(publishSwagger);
    }
    let transports = element.getAttribute(Constant.TRANSPORTS);
    if (transports != null) {
        ((node as Data)).setTransports(transports);
    }
    let serviceStatus = element.getAttribute(Constant.SERVICE_STATUS);
    if (serviceStatus != null) {
        ((node as Data)).setServiceStatus(serviceStatus);
    }

  }
}
