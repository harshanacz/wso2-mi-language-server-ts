// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/Datamapper.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";
import { SchemaType } from "./SchemaType.js";

export class Datamapper extends Mediator {
  static readonly __fields: string[] = ["config", "inputSchema", "outputSchema", "inputType", "outputType", "xsltStyleSheet", "description", "traceFilter"];

  config?: string;

  inputSchema?: string;

  outputSchema?: string;

  inputType?: SchemaType;

  outputType?: SchemaType;

  xsltStyleSheet?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Data Mapper");

  }

  getConfig(): string {
    return this.config;

  }

  setConfig(config: string): void {
    this.config = config;

  }

  getInputSchema(): string {
    return this.inputSchema;

  }

  setInputSchema(inputSchema: string): void {
    this.inputSchema = inputSchema;

  }

  getOutputSchema(): string {
    return this.outputSchema;

  }

  setOutputSchema(outputSchema: string): void {
    this.outputSchema = outputSchema;

  }

  getInputType(): SchemaType {
    return this.inputType;

  }

  setInputType(inputType: SchemaType): void {
    this.inputType = inputType;

  }

  getOutputType(): SchemaType {
    return this.outputType;

  }

  setOutputType(outputType: SchemaType): void {
    this.outputType = outputType;

  }

  getXsltStyleSheet(): string {
    return this.xsltStyleSheet;

  }

  setXsltStyleSheet(xsltStyleSheet: string): void {
    this.xsltStyleSheet = xsltStyleSheet;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
