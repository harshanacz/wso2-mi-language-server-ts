// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/entity/debuginfo/ApiDebugInfo.java by the java2ts converter (see tools/java2ts).
import { DebugInfo } from "./DebugInfo.js";
import { JsonElement } from "../../../gson.js";
import { JsonObject } from "../../../gson.js";

export class ApiDebugInfo extends DebugInfo {
  static readonly __fields: string[] = ["apiKey", "method", "uriTemplate", "urlMapping", "sequenceType"];

  apiKey?: string;

  method?: string;

  uriTemplate?: string;

  urlMapping?: string;

  sequenceType?: string;

  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;

  }

  setMethod(method: string): void {
    this.method = method;

  }

  setSequenceType(sequenceType: string): void {
    this.sequenceType = sequenceType;

  }

  setUriTemplate(uriTemplate: string): void {
    this.uriTemplate = uriTemplate;

  }

  setUrlMapping(urlMapping: string): void {
    this.urlMapping = urlMapping;

  }

  getApiKey(): string {
    return this.apiKey;

  }

  getMethod(): string {
    return this.method;

  }

  getUriTemplate(): string {
    return this.uriTemplate;

  }

  getUrlMapping(): string {
    return this.urlMapping;

  }

  getSequenceType(): string {
    return this.sequenceType;

  }

  toJson(): JsonElement {
    let rootNode = new JsonObject();
    let sequence = new JsonObject();
    let api = new JsonObject();
    api.addProperty("api-key", this.apiKey);
    let resource = new JsonObject();
    resource.addProperty("method", this.method);
    if (this.uriTemplate != null) {
        resource.addProperty("uri-template", this.uriTemplate);
    } else {
        resource.addProperty("url-mapping", this.urlMapping);
    }
    api.add("resource", resource);
    api.addProperty("sequence-type", this.sequenceType);
    api.addProperty("mediator-position", this.mediatorPosition);
    sequence.add("api", api);
    rootNode.add("sequence", sequence);

    rootNode.addProperty("mediation-component", "sequence");
    return rootNode;

  }

  toString(): string {
    return "ApiDebugInfo{" +
            "apiKey='" + this.apiKey + '\'' +
            ", method='" + this.method + '\'' +
            ", uriTemplate='" + this.uriTemplate + '\'' +
            ", urlMapping='" + this.urlMapping + '\'' +
            ", sequenceType='" + this.sequenceType + '\'' +
            ", mediatorPosition='" + this.mediatorPosition + '\'' +
            ", isValid=" + this._isValid +
            ", error='" + this.error + '\'' +
            '}';

  }
}
