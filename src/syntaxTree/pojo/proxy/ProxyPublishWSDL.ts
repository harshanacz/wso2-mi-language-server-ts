// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/proxy/ProxyPublishWSDL.java by the java2ts converter (see tools/java2ts).
import { DescriptionType } from "../misc/wsdl20/DescriptionType.js";
import { Resource } from "./Resource.js";
import { STNode } from "../../stNode.js";
import { TDefinitions } from "../misc/wsdl11/TDefinitions.js";

export class ProxyPublishWSDL extends STNode {
  static readonly __fields: string[] = ["definitions", "description", "inlineWsdl", "resource", "uri", "key", "endpoint", "preservePolicy"];

  definitions?: TDefinitions;

  description?: DescriptionType;

  inlineWsdl?: string;

  resource?: Resource[];

  uri?: string;

  key?: string;

  endpoint?: string;

  preservePolicy: boolean = false;

  getInlineWsdl(): string {
    return this.inlineWsdl;

  }

  setInlineWsdl(inlineWsdl: string): void {
    this.inlineWsdl = inlineWsdl;

  }

  getDefinitions(): TDefinitions {
    return this.definitions;

  }

  setDefinitions(definitions: TDefinitions): void {
    this.definitions = definitions;

  }

  getDescription(): DescriptionType {
    return this.description;

  }

  setDescription(description: DescriptionType): void {
    this.description = description;

  }

  getResource(): Resource[] {
    return this.resource;

  }

  setResource(resource: Resource[]): void {
    this.resource = resource;

  }

  getUri(): string {
    return this.uri;

  }

  setUri(uri: string): void {
    this.uri = uri;

  }

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }

  getEndpoint(): string {
    return this.endpoint;

  }

  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;

  }

  isPreservePolicy(): boolean {
    return this.preservePolicy;

  }

  setPreservePolicy(preservePolicy: boolean): void {
    this.preservePolicy = preservePolicy;

  }
}
