// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/api/API.java by the java2ts converter (see tools/java2ts).
import { APIHandlers } from "./APIHandlers.js";
import { APIResource } from "./APIResource.js";
import { ApiVersionType } from "./ApiVersionType.js";
import { EnableDisable } from "./EnableDisable.js";
import { STNode } from "../../stNode.js";

export class API extends STNode {
  resource?: APIResource[];

  handlers?: APIHandlers;

  name?: string;

  context?: string;

  hostname?: string;

  port?: string;

  version?: string;

  versionType?: ApiVersionType;

  publishSwagger?: string;

  description?: string;

  statistics?: EnableDisable;

  trace?: EnableDisable;

  getResource(): APIResource[] {
    return this.resource;

  }

  setResource(resource: APIResource[]): void {
    this.resource = resource;

  }

  getHandlers(): APIHandlers {
    return this.handlers;

  }

  setHandlers(handlers: APIHandlers): void {
    this.handlers = handlers;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getContext(): string {
    return this.context;

  }

  setContext(context: string): void {
    this.context = context;

  }

  getHostname(): string {
    return this.hostname;

  }

  setHostname(hostname: string): void {
    this.hostname = hostname;

  }

  getPort(): string {
    return this.port;

  }

  setPort(port: string): void {
    this.port = port;

  }

  getVersion(): string {
    return this.version;

  }

  setVersion(version: string): void {
    this.version = version;

  }

  getVersionType(): ApiVersionType {
    return this.versionType;

  }

  setVersionType(versionType: ApiVersionType): void {
    this.versionType = versionType;

  }

  getPublishSwagger(): string {
    return this.publishSwagger;

  }

  setPublishSwagger(publishSwagger: string): void {
    this.publishSwagger = publishSwagger;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getStatistics(): EnableDisable {
    return this.statistics;

  }

  setStatistics(statistics: EnableDisable): void {
    this.statistics = statistics;

  }

  getTrace(): EnableDisable {
    return this.trace;

  }

  setTrace(trace: EnableDisable): void {
    this.trace = trace;

  }
}
