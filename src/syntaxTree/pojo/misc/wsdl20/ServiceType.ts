// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl20/ServiceType.java by the java2ts converter (see tools/java2ts).
import { EndpointType } from "./EndpointType.js";
import { ExtensibleDocumentedType } from "./ExtensibleDocumentedType.js";

export class ServiceType extends ExtensibleDocumentedType {
  otherAttributes?: any;

  endpointOrAny?: EndpointType[];

  name?: string;

  _interface?: string;

  getOtherAttributes(): any {
    return this.otherAttributes;

  }

  setOtherAttributes(otherAttributes: any): void {
    this.otherAttributes = otherAttributes;

  }

  getEndpointOrAny(): EndpointType[] {
    return this.endpointOrAny;

  }

  setEndpointOrAny(endpointOrAny: EndpointType[]): void {
    this.endpointOrAny = endpointOrAny;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  get_interface(): string {
    return this._interface;

  }

  set_interface(_interface: string): void {
    this._interface = _interface;

  }
}
