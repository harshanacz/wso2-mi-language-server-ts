// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/Result.java by the java2ts converter (see tools/java2ts).
import { Attribute } from "./Attribute.js";
import { CallQuery } from "./CallQuery.js";
import { Element } from "./Element.js";
import { STNode } from "../../stNode.js";

export class Result extends STNode {
  elements?: Element[];

  attributes?: Attribute[];

  callQueries?: CallQuery[];

  element?: string;

  rowName?: string;

  defaultNamespace?: string;

  useColumnNumbers?: boolean;

  escapeNonPrintableChar?: boolean;

  xsltPath?: string;

  rdfBaseURI?: string;

  outputType?: string;

  getElements(): Element[] {
    return this.elements;

  }

  setElements(elements: Element[]): void {
    this.elements = elements;

  }

  getAttributes(): Attribute[] {
    return this.attributes;

  }

  setAttributes(attributes: Attribute[]): void {
    this.attributes = attributes;

  }

  getCallQueries(): CallQuery[] {
    return this.callQueries;

  }

  setCallQueries(callQueries: CallQuery[]): void {
    this.callQueries = callQueries;

  }

  getElement(): string {
    return this.element;

  }

  setElement(element: string): void {
    this.element = element;

  }

  getRowName(): string {
    return this.rowName;

  }

  setRowName(rowName: string): void {
    this.rowName = rowName;

  }

  getDefaultNamespace(): string {
    return this.defaultNamespace;

  }

  setDefaultNamespace(defaultNamespace: string): void {
    this.defaultNamespace = defaultNamespace;

  }

  getUseColumnNumbers(): boolean {
    return this.useColumnNumbers;

  }

  setUseColumnNumbers(useColumnNumbers: boolean): void {
    this.useColumnNumbers = useColumnNumbers;

  }

  getEscapeNonPrintableChar(): boolean {
    return this.escapeNonPrintableChar;

  }

  setEscapeNonPrintableChar(escapeNonPrintableChar: boolean): void {
    this.escapeNonPrintableChar = escapeNonPrintableChar;

  }

  getXsltPath(): string {
    return this.xsltPath;

  }

  setXsltPath(xsltPath: string): void {
    this.xsltPath = xsltPath;

  }

  getRdfBaseURI(): string {
    return this.rdfBaseURI;

  }

  setRdfBaseURI(rdfBaseURI: string): void {
    this.rdfBaseURI = rdfBaseURI;

  }

  getOutputType(): string {
    return this.outputType;

  }

  setOutputType(outputType: string): void {
    this.outputType = outputType;

  }

  addElement(element: Element): void {
    if (this.elements == null) {
        this.elements = [];
    }
    this.elements.push(element);

  }

  addAttribute(attribute: Attribute): void {
    if (this.attributes == null) {
        this.attributes = [];
    }
    this.attributes.push(attribute);

  }

  addCallQuery(callQuery: CallQuery): void {
    if (this.callQueries == null) {
        this.callQueries = [];
    }
    this.callQueries.push(callQuery);

  }
}
