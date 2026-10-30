// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/enrich/SourceEnrich.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";
import { SourceEnrichType } from "./SourceEnrichType.js";

export class SourceEnrich extends STNode {
  static readonly __fields: string[] = ["content", "clone", "xpath", "key", "type", "property"];

  content?: any;

  clone: boolean = false;

  xpath?: string;

  key?: string;

  type?: SourceEnrichType;

  property?: string;

  getContent(): any {
    return this.content;

  }

  setContent(content: any): void {
    this.content = content;

  }

  isClone(): boolean {
    return this.clone;

  }

  setClone(clone: boolean): void {
    this.clone = clone;

  }

  getXpath(): string {
    return this.xpath;

  }

  setXpath(xpath: string): void {
    this.xpath = xpath;

  }

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }

  getType(): SourceEnrichType {
    return this.type;

  }

  setType(type: SourceEnrichType): void {
    this.type = type;

  }

  getProperty(): string {
    return this.property;

  }

  setProperty(property: string): void {
    this.property = property;

  }
}
