// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/transformation/DataMapperFactory.java by the java2ts converter (see tools/java2ts).
import { getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { Datamapper } from "../../../pojo/mediator/transformation/Datamapper.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SchemaType } from "../../../pojo/mediator/transformation/SchemaType.js";

export class DataMapperFactory extends AbstractMediatorFactory {
  static readonly DATA_MAPPER: string = "datamapper";

  createSpecificMediator(element: DOMElement): Mediator {
    let datamapper = new Datamapper();
    datamapper.elementNode(element);
    this.populateAttributes(datamapper, element);
    return datamapper;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let config = element.getAttribute(Constant.CONFIG);
    if (config != null) {
        ((node as Datamapper)).setConfig(config);
    }
    let inputSchema = element.getAttribute(Constant.INPUT_SCHEMA);
    if (inputSchema != null) {
        ((node as Datamapper)).setInputSchema(inputSchema);
    }
    let outputSchema = element.getAttribute(Constant.OUTPUT_SCHEMA);
    if (outputSchema != null) {
        ((node as Datamapper)).setOutputSchema(outputSchema);
    }
    let inputType = element.getAttribute(Constant.INPUT_TYPE);
    let inputTypeEnum = getEnumFromValue(inputType, SchemaType);
    if (inputTypeEnum != null) {
        ((node as Datamapper)).setInputType(inputTypeEnum);
    }
    let outputType = element.getAttribute(Constant.OUTPUT_TYPE);
    let outputTypeEnum = getEnumFromValue(outputType, SchemaType);
    if (outputTypeEnum != null) {
        ((node as Datamapper)).setOutputType(outputTypeEnum);
    }
    let xsltStyleSheet = element.getAttribute(Constant.XSLT_STYLE_SHEET);
    if (xsltStyleSheet != null) {
        ((node as Datamapper)).setXsltStyleSheet(xsltStyleSheet);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Datamapper)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Datamapper)).setTraceFilter(traceFilter);
    }

  }

  getTagName(): string {
    return DataMapperFactory.DATA_MAPPER;

  }
}
