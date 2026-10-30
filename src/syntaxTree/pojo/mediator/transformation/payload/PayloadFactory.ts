// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/payload/PayloadFactory.java by the java2ts converter (see tools/java2ts).
import { format } from "../../../../javaCompat.js";
import { MediaType } from "./MediaType.js";
import { Mediator } from "../../Mediator.js";
import { PayloadFactoryArgs } from "./PayloadFactoryArgs.js";
import { PayloadFactoryFormat } from "./PayloadFactoryFormat.js";
import { TemplateType } from "./TemplateType.js";

export class PayloadFactory extends Mediator {
  format?: PayloadFactoryFormat;

  args?: PayloadFactoryArgs;

  mediaType?: MediaType;

  templateType?: TemplateType;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Payload");

  }

  getFormat(): PayloadFactoryFormat {
    return this.format;

  }

  setFormat(format: PayloadFactoryFormat): void {
    this.format = format;

  }

  getArgs(): PayloadFactoryArgs {
    return this.args;

  }

  setArgs(args: PayloadFactoryArgs): void {
    this.args = args;

  }

  getMediaType(): MediaType {
    return this.mediaType;

  }

  setMediaType(mediaType: MediaType): void {
    this.mediaType = mediaType;

  }

  getTemplateType(): TemplateType {
    return this.templateType;

  }

  setTemplateType(templateType: TemplateType): void {
    this.templateType = templateType;

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
