// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/util/SchemaGeneratorForXSD.java by the java2ts converter (see tools/java2ts).
import { FileType } from "./FileType.js";
import { FileUtils } from "../../host/commonsIo.js";
import { SchemaGeneratorForXML } from "./SchemaGeneratorForXML.js";
import { TypeProcessorFactory } from "../xsd/TypeProcessorFactory.js";
import { Utils } from "../xsd/Utils.js";
import { JFile } from "../../host/JFile.js";

export class SchemaGeneratorForXSD extends SchemaGeneratorForXML {
  static readonly __fields: string[] = [];

  static readonly SCHEMA_ID: string = "$schema";

  static readonly SCHEMA_URL: string = "http://wso2.org/json-schema/wso2-data-mapper-v5.0.0/schema#";

  static readonly ROOT_ID: string = "http://wso2jsonschema.org";

  getSchemaResourcePath(filePath: string, type: FileType, delimiter: string): string {
    let entireFileText = FileUtils.readFileToString(new JFile(filePath));
    return this.getSchemaContent(entireFileText, type, delimiter);

  }

  getSchemaContent(content: string, type: FileType, delimiter: string): string {
    return this.generateJsonSchemaFromXsd(content);

  }

  generateJsonSchemaFromXsd(xsdContent: string): string {
    let schemaLoader = new XMLSchemaLoader();
    let xsModel = schemaLoader.load(new DOMInputImpl(null, null, null, xsdContent, null));
    let jsonSchemaElements = this.convertXsModelToJsonSchemaElements(xsModel);

    let mapper = new ObjectMapper();
    return mapper.writeValueAsString(jsonSchemaElements);

  }

  convertXsModelToJsonSchemaElements(xsModel: XSModel): JsonNode {
    let rootNode = JsonNodeFactory.instance.objectNode();
    rootNode.set(SchemaGeneratorForXSD.SCHEMA_ID, SchemaGeneratorForXSD.SCHEMA_URL);

    let elements = xsModel.getComponents(XSConstants.ELEMENT_DECLARATION);
    if (elements.getLength() == 1) {
        let rootElement = (elements.item(0) as XSElementDeclaration);
        this.processRootElement(rootElement, rootNode);
    } else if (elements.getLength() > 1) {
        this.processMultipleRootElements(elements, rootNode);
    }
    return rootNode;

  }

  processRootElement(rootElement: XSElementDeclaration, rootNode: ObjectNode): void {
    let processor = TypeProcessorFactory.getTypeProcessor(rootElement);
    processor.processRootType(rootElement, rootNode, SchemaGeneratorForXSD.ROOT_ID, true);

  }

  processMultipleRootElements(elements: XSNamedMap, rootNode: ObjectNode): void {
    let oneOfArray = JsonNodeFactory.instance.arrayNode();
    for (let elementObj of elements.values()) {
        if (elementObj instanceof XSElementDeclaration) {
            let element = (elementObj as XSElementDeclaration);
            let elementNode = JsonNodeFactory.instance.objectNode();

            let processor = TypeProcessorFactory.getTypeProcessor(element);
            processor.processType(element, null, elementNode,
                    SchemaGeneratorForXSD.ROOT_ID + Utils.ID_VALUE_SEPERATOR + element.getName(), false);
            elementNode.set(Utils.TITLE, element.getName());
            oneOfArray.push(elementNode);
        }
    }
    rootNode.set(Utils.ONE_OF, oneOfArray);

  }
}
