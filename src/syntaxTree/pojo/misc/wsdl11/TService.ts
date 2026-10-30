// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/misc/wsdl11/TService.java by the java2ts converter (see tools/java2ts).
import { TExtensibleDocumented } from "./TExtensibleDocumented.js";
import { TPort } from "./TPort.js";

export class TService extends TExtensibleDocumented {
  port?: TPort[];

  name?: string;

  getPort(): TPort[] {
    return this.port;

  }

  setPort(port: TPort[]): void {
    this.port = port;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }
}
