// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/Data.java by the java2ts converter (see tools/java2ts).
import { AuthorizationProvider } from "./AuthorizationProvider.js";
import { Config } from "./Config.js";
import { DataPolicy } from "./DataPolicy.js";
import { EventTrigger } from "./EventTrigger.js";
import { Operation } from "./Operation.js";
import { Query } from "./Query.js";
import { Resource } from "./Resource.js";
import { STNode } from "../../stNode.js";

export class Data extends STNode {
  description?: STNode;

  configs?: Config[];

  queries?: Query[];

  operations?: Operation[];

  resources?: Resource[];

  eventTriggers?: EventTrigger[];

  policy?: DataPolicy;

  enableSec?: STNode;

  authorizationProvider?: AuthorizationProvider;

  baseURI?: string;

  name?: string;

  enableBatchRequests: boolean = false;

  enableBoxcarring: boolean = false;

  disableLegacyBoxcarringMode: boolean = false;

  disableStreaming: boolean = false;

  txManagerJNDIName?: string;

  serviceNamespace?: string;

  serviceGroup?: string;

  publishSwagger?: string;

  transports?: string;

  serviceStatus?: string;

  getDescription(): STNode {
    return this.description;

  }

  setDescription(description: STNode): void {
    this.description = description;

  }

  getConfigs(): Config[] {
    return this.configs;

  }

  setConfigs(configs: Config[]): void {
    this.configs = configs;

  }

  getQueries(): Query[] {
    return this.queries;

  }

  setQueries(queries: Query[]): void {
    this.queries = queries;

  }

  getOperations(): Operation[] {
    return this.operations;

  }

  setOperations(operations: Operation[]): void {
    this.operations = operations;

  }

  getResources(): Resource[] {
    return this.resources;

  }

  setResources(resources: Resource[]): void {
    this.resources = resources;

  }

  getEventTriggers(): EventTrigger[] {
    return this.eventTriggers;

  }

  setEventTriggers(eventTriggers: EventTrigger[]): void {
    this.eventTriggers = eventTriggers;

  }

  getPolicy(): DataPolicy {
    return this.policy;

  }

  setPolicy(policy: DataPolicy): void {
    this.policy = policy;

  }

  getEnableSec(): STNode {
    return this.enableSec;

  }

  setEnableSec(enableSec: STNode): void {
    this.enableSec = enableSec;

  }

  getAuthorizationProvider(): AuthorizationProvider {
    return this.authorizationProvider;

  }

  setAuthorizationProvider(authorizationProvider: AuthorizationProvider): void {
    this.authorizationProvider = authorizationProvider;

  }

  getBaseURI(): string {
    return this.baseURI;

  }

  setBaseURI(baseURI: string): void {
    this.baseURI = baseURI;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  isEnableBatchRequests(): boolean {
    return this.enableBatchRequests;

  }

  setEnableBatchRequests(enableBatchRequests: boolean): void {
    this.enableBatchRequests = enableBatchRequests;

  }

  isEnableBoxcarring(): boolean {
    return this.enableBoxcarring;

  }

  setEnableBoxcarring(enableBoxcarring: boolean): void {
    this.enableBoxcarring = enableBoxcarring;

  }

  isDisableLegacyBoxcarringMode(): boolean {
    return this.disableLegacyBoxcarringMode;

  }

  setDisableLegacyBoxcarringMode(disableLegacyBoxcarringMode: boolean): void {
    this.disableLegacyBoxcarringMode = disableLegacyBoxcarringMode;

  }

  isDisableStreaming(): boolean {
    return this.disableStreaming;

  }

  setDisableStreaming(disableStreaming: boolean): void {
    this.disableStreaming = disableStreaming;

  }

  getTxManagerJNDIName(): string {
    return this.txManagerJNDIName;

  }

  setTxManagerJNDIName(txManagerJNDIName: string): void {
    this.txManagerJNDIName = txManagerJNDIName;

  }

  getServiceNamespace(): string {
    return this.serviceNamespace;

  }

  setServiceNamespace(serviceNamespace: string): void {
    this.serviceNamespace = serviceNamespace;

  }

  getServiceGroup(): string {
    return this.serviceGroup;

  }

  setServiceGroup(serviceGroup: string): void {
    this.serviceGroup = serviceGroup;

  }

  getPublishSwagger(): string {
    return this.publishSwagger;

  }

  setPublishSwagger(publishSwagger: string): void {
    this.publishSwagger = publishSwagger;

  }

  getTransports(): string {
    return this.transports;

  }

  setTransports(transports: string): void {
    this.transports = transports;

  }

  getServiceStatus(): string {
    return this.serviceStatus;

  }

  setServiceStatus(serviceStatus: string): void {
    this.serviceStatus = serviceStatus;

  }

  addConfig(config: Config): void {
    if (this.configs == null) {
        this.configs = [];
    }
    this.configs.push(config);

  }

  addQuery(query: Query): void {
    if (this.queries == null) {
        this.queries = [];
    }
    this.queries.push(query);

  }

  addOperation(operation: Operation): void {
    if (this.operations == null) {
        this.operations = [];
    }
    this.operations.push(operation);

  }

  addResource(resource: Resource): void {
    if (this.resources == null) {
        this.resources = [];
    }
    this.resources.push(resource);

  }

  addEventTrigger(eventTrigger: EventTrigger): void {
    if (this.eventTriggers == null) {
        this.eventTriggers = [];
    }
    this.eventTriggers.push(eventTrigger);

  }
}
