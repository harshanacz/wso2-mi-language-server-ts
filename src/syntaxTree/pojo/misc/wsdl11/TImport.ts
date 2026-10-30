// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl11/TImport.java by the java2ts converter (see tools/java2ts).
import { TExtensibleAttributesDocumented } from "./TExtensibleAttributesDocumented.js";

export class TImport extends TExtensibleAttributesDocumented {
  namespace?: string;

  location?: string;

  getNamespace(): string {
    return this.namespace;

  }

  setNamespace(namespace: string): void {
    this.namespace = namespace;

  }

  getLocation(): string {
    return this.location;

  }

  setLocation(location: string): void {
    this.location = location;

  }
}
