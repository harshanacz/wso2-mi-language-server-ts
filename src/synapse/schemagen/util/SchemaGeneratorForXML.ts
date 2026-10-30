// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/util/SchemaGeneratorForXML.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, size, entrySet, System } from "../../../syntaxTree/javaCompat.js";
import { FileType } from "./FileType.js";
import { FileUtils } from "../../host/commonsIo.js";
import { IOException } from "../../host/nio.js";
import { JSONObject } from "../json/JSONObject.js";
import { OMAbstractFactory } from "../../../syntaxTree/om/om.js";
import { OMAttribute } from "../../../syntaxTree/om/om.js";
import { OMElement } from "../../../syntaxTree/om/om.js";
import { OMFactory } from "../../../syntaxTree/om/om.js";
import { OMNamespace } from "../../../syntaxTree/om/om.js";
import { OMNode } from "../../../syntaxTree/om/om.js";
import { SchemaGeneratorForJSON } from "./SchemaGeneratorForJSON.js";
import { XML } from "../json/XML.js";
import { JFile } from "../../host/JFile.js";
import { parseOM } from "../../../syntaxTree/om/om.js";

export class SchemaGeneratorForXML extends SchemaGeneratorForJSON {
  static readonly __fields: string[] = [];

  static readonly TEMP_AVRO_GEN_LOCATION: string = "tempXSDGenLocation";

  static readonly JAVA_IO_TMPDIR: string = "java.io.tmpdir";

  static readonly TEMP_OUTPUT: string = System.getProperty(SchemaGeneratorForXML.JAVA_IO_TMPDIR) + JFile.separator
			+ SchemaGeneratorForXML.TEMP_AVRO_GEN_LOCATION;

  static readonly CONTENT_TAG: string = "#@content";

  static readonly AT_PREFIX: string = "@";

  static readonly DOLLLAR_AT_PREFIX: string = "$@";

  static readonly XSI_NAMESPACE_URI: string = "http://www.w3.org/2001/XMLSchema-instance";

  static readonly XSI_TYPE: string = "type";

  getSchemaContent(content: string, type: FileType, delimiter: string): string {
    let xmlJSONObj: JSONObject | undefined;
    try {
    	xmlJSONObj = XML.toJSONObject(content);
    } catch (e) {
    	throw new IOException(e.getMessage());
    }

    return super.getSchemaContent(String(xmlJSONObj), type, null);

  }

  getSchemaResourcePath(filePath: string, type: FileType, delimiter: string): string {
    let entireFileText = FileUtils.readFileToString(new JFile(filePath));
    entireFileText = this.replaceAttributesWithElements(entireFileText);
    return this.getSchemaContent(entireFileText, type, null);

  }

  replaceAttributesWithElements(entireFileText: string): string {
    try {
    	let element = parseOM(entireFileText);
    	let factory = OMAbstractFactory.getOMFactory();
    	let namespaces = new Map();
    	element = this.traverseChildrenAndReplaceAttributes(element, factory, namespaces);
    	for (let entry of entrySet(namespaces)) {
    		let prefix = entry.getKey();
    		let uri = entry.getValue();
    		element.declareNamespace(uri, prefix);
    	}

    	entireFileText = String(element);
    } catch (e) {
    	throw new IOException(e);
    }
    return entireFileText;

  }

  traverseChildrenAndReplaceAttributes(element: OMElement, factory: OMFactory, namespaces: Map<string, string>): OMElement {
    let attributeIterator = element.getAllAttributes();
    let removeList = [];
    let addList = [];
    let modifiedElementName = null;


    let elementText = element.getText();
    let trimedElementText = elementText.trim();


    if (!isEmpty(trimedElementText)) {
    	let elementIterators = element.getChildren();
    	while (elementIterators.hasNext()) {
    		let child = (elementIterators.next() as OMNode);


    		if (child instanceof OMElement) {

    			if (!equals(((child as OMElement)).getLocalName(), SchemaGeneratorForXML.CONTENT_TAG)
    					&& !((child as OMElement)).getLocalName().startsWith(SchemaGeneratorForXML.AT_PREFIX)) {
    				this.addContentToParent(element, factory, trimedElementText);
    				break;
    			}
    		}
    	}


    	let attributeIterators = element.getAllAttributes();
    	if (attributeIterator.hasNext()) {
    		this.addContentToParent(element, factory, trimedElementText);
    	}

    }

    while (attributeIterator.hasNext()) {
    	let atttrib = (attributeIterator.next() as OMAttribute);
    	let attributeElement = null;


    	if (atttrib.getNamespace() != null) {
    		let qName = atttrib.getQName();


    		if (equals(SchemaGeneratorForXML.XSI_NAMESPACE_URI, qName.getNamespaceURI()) && equals(SchemaGeneratorForXML.XSI_TYPE, qName.getLocalPart())) {
    			modifiedElementName = element.getQName().getLocalPart() + "_" + SchemaGeneratorForXML.DOLLLAR_AT_PREFIX
    					+ qName.getPrefix() + ":" + qName.getLocalPart() + "_" + atttrib.getAttributeValue();
    		}
    		let prefix = atttrib.getNamespace().getPrefix();
    		attributeElement = factory.createOMElement(SchemaGeneratorForXML.AT_PREFIX + prefix + ":" + atttrib.getLocalName(), null);
    	} else {



    		attributeElement = factory.createOMElement(SchemaGeneratorForXML.AT_PREFIX + atttrib.getLocalName(), null);
    	}

    	let attributeValue = factory.createOMText(atttrib.getAttributeValue());
    	attributeElement.addChild(attributeValue);

    	addList.push(attributeElement);
    	removeList.push(atttrib);
    }

    for (let arttribute of removeList) {
    	element.removeAttribute(arttribute);
    }

    if (size(addList) > 0) {
    	for (let attrElement of addList) {
    		element.addChild(attrElement);
    	}
    }

    let elementIterator = element.getChildren();
    while (elementIterator.hasNext()) {
    	let child = (elementIterator.next() as OMNode);
    	if (child instanceof OMElement) {
    		this.traverseChildrenAndReplaceAttributes((child as OMElement), factory, namespaces);
    	}
    }


    let iter = element.getAllDeclaredNamespaces();
    while (iter.hasNext()) {
    	let ns = (iter.next() as OMNamespace);
    	let prefix = ns.getPrefix();
    	let uri = ns.getNamespaceURI();
    	if (!namespaces.has(prefix)) {
    		namespaces.set(prefix, uri);
    	}
    }

    if (modifiedElementName != null) {
    	element.setLocalName(modifiedElementName);
    }

    return element;

  }

  addContentToParent(element: OMElement, factory: OMFactory, trimedElementText: string): void {
    element.setText("");

    let itr = element.getChildrenWithLocalName(SchemaGeneratorForXML.CONTENT_TAG);

    if (itr.hasNext()) {
    	return;
    } else {
    	let contentElement = factory.createOMElement(SchemaGeneratorForXML.CONTENT_TAG, null);
    	let contentValue = factory.createOMText(trimedElementText);
    	contentElement.addChild(contentValue);
    	element.addChild(contentElement);
    	return;
    }

  }
}
