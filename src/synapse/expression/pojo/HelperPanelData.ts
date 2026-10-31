// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/expression/pojo/HelperPanelData.java by the java2ts converter (see tools/java2ts).
import { CompletionItem } from "../../lsp.js";
import { unmodifiable } from "../../../syntaxTree/javaCompat.js";
import { Functions } from "./Functions.js";

export class HelperPanelData {
  static readonly __fields: string[] = ["payload", "variables", "properties", "params", "headers", "configs", "functions"];

  payload?: CompletionItem[];

  variables?: CompletionItem[];

  properties?: CompletionItem[];

  params?: CompletionItem[];

  headers?: CompletionItem[];

  configs?: CompletionItem[];

  functions?: Map<string, Functions>;

  getPayload(): CompletionItem[] {
    return unmodifiable(this.payload);

  }

  setPayload(payload: CompletionItem[]): void {
    this.payload = payload;

  }

  getVariables(): CompletionItem[] {
    return unmodifiable(this.variables);

  }

  setVariables(variables: CompletionItem[]): void {
    this.variables = variables;

  }

  getProperties(): CompletionItem[] {
    return unmodifiable(this.properties);

  }

  setProperties(properties: CompletionItem[]): void {
    this.properties = properties;

  }

  getParams(): CompletionItem[] {
    return this.params;

  }

  setParams(params: CompletionItem[]): void {
    this.params = params;

  }

  getHeaders(): CompletionItem[] {
    return this.headers;

  }

  setHeaders(headers: CompletionItem[]): void {
    this.headers = headers;

  }

  getConfigs(): CompletionItem[] {
    return this.configs;

  }

  setConfigs(configs: CompletionItem[]): void {
    this.configs = configs;

  }

  getFunctions(): Map<string, Functions> {
    return unmodifiable(this.functions);

  }

  setFunctions(functions: Map<string, Functions>): void {
    this.functions = functions;

  }

  toString(): string {
    return "HelperPanelData{" +
            "payload=" + this.payload +
            ", variables=" + this.variables +
            ", properties=" + this.properties +
            ", params=" + this.params +
            ", headers=" + this.headers +
            ", functions=" + this.functions +
            '}';

  }
}
