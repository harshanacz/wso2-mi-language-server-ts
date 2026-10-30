// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/cache/CacheProtocol.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class CacheProtocol extends STNode {
  static readonly __fields: string[] = ["methods", "headersToExcludeInHash", "headersToIncludeInHash", "responseCodes", "enableCacheControl", "includeAgeHeader", "hashGenerator", "type"];

  methods?: STNode;

  headersToExcludeInHash?: STNode;

  headersToIncludeInHash?: STNode;

  responseCodes?: STNode;

  enableCacheControl?: STNode;

  includeAgeHeader?: STNode;

  hashGenerator?: STNode;

  type?: string;

  getMethods(): STNode {
    return this.methods;

  }

  setMethods(methods: STNode): void {
    this.methods = methods;

  }

  getHeadersToExcludeInHash(): STNode {
    return this.headersToExcludeInHash;

  }

  setHeadersToExcludeInHash(headersToExcludeInHash: STNode): void {
    this.headersToExcludeInHash = headersToExcludeInHash;

  }

  getHeadersToIncludeInHash(): STNode {
    return this.headersToIncludeInHash;

  }

  setHeadersToIncludeInHash(headersToIncludeInHash: STNode): void {
    this.headersToIncludeInHash = headersToIncludeInHash;

  }

  getResponseCodes(): STNode {
    return this.responseCodes;

  }

  setResponseCodes(responseCodes: STNode): void {
    this.responseCodes = responseCodes;

  }

  getEnableCacheControl(): STNode {
    return this.enableCacheControl;

  }

  setEnableCacheControl(enableCacheControl: STNode): void {
    this.enableCacheControl = enableCacheControl;

  }

  getIncludeAgeHeader(): STNode {
    return this.includeAgeHeader;

  }

  setIncludeAgeHeader(includeAgeHeader: STNode): void {
    this.includeAgeHeader = includeAgeHeader;

  }

  getHashGenerator(): STNode {
    return this.hashGenerator;

  }

  setHashGenerator(hashGenerator: STNode): void {
    this.hashGenerator = hashGenerator;

  }

  getType(): string {
    return this.type;

  }

  setType(type: string): void {
    this.type = type;

  }
}
