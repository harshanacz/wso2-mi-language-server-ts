// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/builder/BuilderMessageBuilder.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class BuilderMessageBuilder extends STNode {
  contentType?: string;

  clazz?: string;

  formatterClass?: string;

  getContentType(): string {
    return this.contentType;

  }

  setContentType(contentType: string): void {
    this.contentType = contentType;

  }

  getClazz(): string {
    return this.clazz;

  }

  setClazz(clazz: string): void {
    this.clazz = clazz;

  }

  getFormatterClass(): string {
    return this.formatterClass;

  }

  setFormatterClass(formatterClass: string): void {
    this.formatterClass = formatterClass;

  }
}
