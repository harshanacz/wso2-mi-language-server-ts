// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/DataSourceConfigFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, parseBoolean } from "../javaCompat.js";
import { AbstractFactory } from "./AbstractFactory.js";
import { ConfigurationType } from "../pojo/datasource/ConfigurationType.js";
import { Constant } from "../constant.js";
import { DOMElement } from "../dom/dom.js";
import { DOMNode } from "../dom/dom.js";
import { DatasourceType } from "../pojo/datasource/DatasourceType.js";
import { DefinitionType } from "../pojo/datasource/DefinitionType.js";
import { JndiConfigType } from "../pojo/datasource/JndiConfigType.js";
import { JndiEnvType } from "../pojo/datasource/JndiEnvType.js";
import { PropertyType } from "../pojo/datasource/PropertyType.js";
import { STNode } from "../stNode.js";
import { Utils } from "../utils.js";

export class DataSourceConfigFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let datasource = new DatasourceType();
    datasource.elementNode(element);
    let childNodes = element.getChildren();
    if (childNodes != null && !isEmpty(childNodes)) {
        for (let child of childNodes) {
            let childName = child.getNodeName();
            if (equalsIgnoreCase(Constant.NAME, childName)) {
                let name = new STNode();
                name.elementNode((child as DOMElement));
                datasource.setName(name);
            } else if (equalsIgnoreCase(Constant.DESCRIPTION, childName)) {
                let description = new STNode();
                description.elementNode((child as DOMElement));
                datasource.setDescription(description);
            } else if (equalsIgnoreCase(Constant.JNDI_CONFIG, childName)) {
                let jindiConfig = this.createJndiConfig(child);
                datasource.setJndiConfig(jindiConfig);
            } else if (equalsIgnoreCase(Constant.DEFINITION, childName)) {
                let definition = this.createDefinition(child);
                datasource.setDefinition(definition);
            }
        }
    }
    return datasource;

  }

  createJndiConfig(element: DOMNode): JndiConfigType {
    let jndiConfig = new JndiConfigType();
    jndiConfig.elementNode((element as DOMElement));
    let useDataSourceFactory = element.getAttribute(Constant.USE_DATA_SOURCE_FACTORY);
    if (useDataSourceFactory != null) {
        jndiConfig.setUseDataSourceFactory(parseBoolean(useDataSourceFactory));
    }
    let childNodes = element.getChildren();
    if (childNodes != null && !isEmpty(childNodes)) {
        for (let childNode of childNodes) {
            let childName = childNode.getNodeName();
            if (equalsIgnoreCase(Constant.NAME, childName)) {
                let name = new STNode();
                name.elementNode((childNode as DOMElement));
                jndiConfig.setName(name);
            } else if (equalsIgnoreCase(Constant.ENVIRONMENT, childName)) {
                let environment = this.createEnvironment(childNode);
                jndiConfig.setEnvironment(environment);
            }
        }
    }
    return jndiConfig;

  }

  createEnvironment(element: DOMNode): JndiEnvType {
    let environment = new JndiEnvType();
    environment.elementNode((element as DOMElement));
    let childNodes = element.getChildren();
    if (childNodes != null && !isEmpty(childNodes)) {
        let properties = [];
        for (let child of childNodes) {
            let property = this.createProperty(child);
            properties.push(property);
        }
        environment.setProperty(properties.slice());
    }
    return environment;

  }

  createProperty(element: DOMNode): PropertyType {
    let property = new PropertyType();
    property.elementNode((element as DOMElement));
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        property.setName(name);
    }

    let firstChild = element.getFirstChild();
    let value = Utils.getInlineString(firstChild);
    if (value != null) {
        property.setValue(value);
    }

    return property;


  }

  createDefinition(element: DOMNode): DefinitionType {
    let definition = new DefinitionType();
    definition.elementNode((element as DOMElement));
    let type = element.getAttribute(Constant.TYPE);
    if (type != null) {
        definition.setType(type);
    }
    let childNodes = element.getChildren();
    if (childNodes != null && !isEmpty(childNodes)) {
        for (let child of childNodes) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(Constant.CONFIGURATION, name)) {
                let configuration = this.createDefinitionConfiguration(child);
                definition.setConfiguration(configuration);
            }
        }
    }
    return definition;

  }

  createDefinitionConfiguration(element: DOMNode): ConfigurationType {
    let configuration = new ConfigurationType();
    configuration.elementNode((element as DOMElement));

    let childNodes = element.getChildren();
    if (childNodes != null && !isEmpty(childNodes)) {
        let contents = [];
        for (let child of childNodes) {
            if (child instanceof DOMElement) {
                let content = new STNode();
                content.elementNode((child as DOMElement));
                contents.push(content);
            }
        }
        configuration.setContent(contents.slice());
    }
    return configuration;

  }

  populateAttributes(node: STNode, element: DOMElement): void {

  }
}
