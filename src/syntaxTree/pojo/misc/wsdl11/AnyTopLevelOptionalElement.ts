// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl11/AnyTopLevelOptionalElement.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";
import { TBinding } from "./TBinding.js";
import { TImport } from "./TImport.js";
import { TMessage } from "./TMessage.js";
import { TPortType } from "./TPortType.js";
import { TService } from "./TService.js";
import { TTypes } from "./TTypes.js";

export class AnyTopLevelOptionalElement extends STNode {
  _import?: TImport | undefined;

  types?: TTypes | undefined;

  message?: TMessage | undefined;

  portType?: TPortType | undefined;

  binding?: TBinding | undefined;

  service?: TService | undefined;

  get_import(): TImport | undefined {
    return this._import;

  }

  set_import(_import: TImport | undefined): void {
    this._import = _import;

  }

  getTypes(): TTypes | undefined {
    return this.types;

  }

  setTypes(types: TTypes | undefined): void {
    this.types = types;

  }

  getMessage(): TMessage | undefined {
    return this.message;

  }

  setMessage(message: TMessage | undefined): void {
    this.message = message;

  }

  getPortType(): TPortType | undefined {
    return this.portType;

  }

  setPortType(portType: TPortType | undefined): void {
    this.portType = portType;

  }

  getBinding(): TBinding | undefined {
    return this.binding;

  }

  setBinding(binding: TBinding | undefined): void {
    this.binding = binding;

  }

  getService(): TService | undefined {
    return this.service;

  }

  setService(service: TService | undefined): void {
    this.service = service;

  }
}
