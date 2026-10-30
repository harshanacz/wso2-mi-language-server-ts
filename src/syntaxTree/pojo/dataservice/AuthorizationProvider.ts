// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/AuthorizationProvider.java by the java2ts converter (see tools/java2ts).
import { AuthorizationProviderProperty } from "./AuthorizationProviderProperty.js";
import { STNode } from "../../stNode.js";

export class AuthorizationProvider extends STNode {
  property?: AuthorizationProviderProperty[];

  clazz?: string;

  getProperty(): AuthorizationProviderProperty[] {
    return this.property;

  }

  setProperty(property: AuthorizationProviderProperty[]): void {
    this.property = property;

  }

  getClazz(): string {
    return this.clazz;

  }

  setClazz(clazz: string): void {
    this.clazz = clazz;

  }
}
