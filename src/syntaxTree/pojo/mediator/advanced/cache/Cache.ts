// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/cache/Cache.java by the java2ts converter (see tools/java2ts).
import { CacheImplementation } from "./CacheImplementation.js";
import { CacheOnCacheHit } from "./CacheOnCacheHit.js";
import { CacheProtocol } from "./CacheProtocol.js";
import { CacheScope } from "./CacheScope.js";
import { Mediator } from "../../Mediator.js";

export class Cache extends Mediator {
  onCacheHit?: CacheOnCacheHit;

  protocol?: CacheProtocol;

  implementation?: CacheImplementation;

  id?: string;

  timeout: number = 0;

  collector: boolean = false;

  maxMessageSize: number = 0;

  scope?: CacheScope;

  hashGenerator?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Cache");

  }

  getId(): string {
    return this.id;

  }

  setId(id: string): void {
    this.id = id;

  }

  getOnCacheHit(): CacheOnCacheHit {
    return this.onCacheHit;

  }

  setOnCacheHit(onCacheHit: CacheOnCacheHit): void {
    this.onCacheHit = onCacheHit;

  }

  getProtocol(): CacheProtocol {
    return this.protocol;

  }

  setProtocol(protocol: CacheProtocol): void {
    this.protocol = protocol;

  }

  getImplementation(): CacheImplementation {
    return this.implementation;

  }

  setImplementation(implementation: CacheImplementation): void {
    this.implementation = implementation;

  }

  getTimeout(): number {
    return this.timeout;

  }

  setTimeout(timeout: number): void {
    this.timeout = timeout;

  }

  isCollector(): boolean {
    return this.collector;

  }

  setCollector(collector: boolean): void {
    this.collector = collector;

  }

  getMaxMessageSize(): number {
    return this.maxMessageSize;

  }

  setMaxMessageSize(maxMessageSize: number): void {
    this.maxMessageSize = maxMessageSize;

  }

  getScope(): CacheScope {
    return this.scope;

  }

  setScope(scope: CacheScope): void {
    this.scope = scope;

  }

  getHashGenerator(): string {
    return this.hashGenerator;

  }

  setHashGenerator(hashGenerator: string): void {
    this.hashGenerator = hashGenerator;

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
